"""Tiny isometric SVG builder for packetplay icons in the isoflow style.

Axes: u runs right-down, v runs left-down, w runs up. One unit is SCALE px.
Painter's order: draw things in the order they should stack (back to front).
"""
import math, sys

SCALE = 22.0
OUTLINE = "#231F20"
# isoflow palette (light, mid, dark of the metal/grey family, plus accents)
WHITE, TOP, SIDE_L, SIDE_R = "#FFFFFF", "#CDD9EE", "#B5C5DC", "#6885A9"
DARK_BLUE, BLUE, YELLOW, BLACK = "#4B6E98", "#0070D9", "#FFC600", "#231F20"
_C = math.cos(math.radians(30)) * SCALE
_H = math.sin(math.radians(30)) * SCALE


def P(u, v, w):
    return ((u - v) * _C, (u + v) * _H - w * SCALE)


def _mix(a, b):
    x = [int(a[k:k + 2], 16) for k in (1, 3, 5)]
    y = [int(b[k:k + 2], 16) for k in (1, 3, 5)]
    return "#" + "".join(f"{(p + q) // 2:02X}" for p, q in zip(x, y))


def circle(cu, cv, r, n=18):
    return [(cu + r * math.cos(2 * math.pi * k / n), cv + r * math.sin(2 * math.pi * k / n)) for k in range(n)]


def gear(cu, cv, r_root, r_tip, teeth=10):
    """Footprint of a gear: [(u, v), ...]."""
    pitch = 2 * math.pi / teeth
    out = []
    for k in range(teeth):
        a = k * pitch
        for da, r in ((-0.30, r_root), (-0.17, r_tip), (0.17, r_tip), (0.30, r_root), (0.5, r_root)):
            ang = a + da * pitch
            out.append((cu + r * math.cos(ang), cv + r * math.sin(ang)))
    return out


class Icon:
    def __init__(self):
        self.polys = []

    def poly(self, pts, fill, stroke=True, opacity=None):
        self.polys.append((pts, fill, stroke, opacity))

    def box(self, u0, u1, v0, v1, w0, w1, top, left, right, stroke=True):
        """Left face is v=v1, right face is u=u1, top is w=w1."""
        self.poly([P(u0, v1, w1), P(u1, v1, w1), P(u1, v1, w0), P(u0, v1, w0)], left, stroke)
        self.poly([P(u1, v0, w1), P(u1, v1, w1), P(u1, v1, w0), P(u1, v0, w0)], right, stroke)
        self.poly([P(u0, v0, w1), P(u1, v0, w1), P(u1, v1, w1), P(u0, v1, w1)], top, stroke)

    def top(self, w, u0, u1, v0, v1, fill, stroke=False):
        self.poly([P(u0, v0, w), P(u1, v0, w), P(u1, v1, w), P(u0, v1, w)], fill, stroke)

    def face_u(self, u, v0, v1, w0, w1, fill, stroke=False):
        """A flat shape on a u=const face (the right-hand face)."""
        self.poly([P(u, v0, w1), P(u, v1, w1), P(u, v1, w0), P(u, v0, w0)], fill, stroke)

    def prism(self, pts, w0, w1, top, left, right, stroke=True, hole=None):
        """Extrude a footprint [(u, v), ...] from w0 to w1. Visible sides are shaded left/mid/right
        by the direction they face. `hole` is an optional footprint drawn as a dark opening on top."""
        n = len(pts)
        area = sum(pts[k][0] * pts[(k + 1) % n][1] - pts[(k + 1) % n][0] * pts[k][1] for k in range(n))
        sign = 1 if area > 0 else -1
        mid = _mix(left, right)
        sides = []
        for k in range(n):
            (ua, va), (ub, vb) = pts[k], pts[(k + 1) % n]
            nu, nv = (vb - va) * sign, -(ub - ua) * sign
            if nu + nv <= 1e-9:
                continue
            t = nu / (nu + nv)
            sides.append(((ua + ub + va + vb), (ua, va, ub, vb), left if t < 0.34 else mid if t < 0.66 else right))
        for _, (ua, va, ub, vb), col in sorted(sides):
            self.poly([P(ua, va, w1), P(ub, vb, w1), P(ub, vb, w0), P(ua, va, w0)], col, stroke)
        self.poly([P(u, v, w1) for u, v in pts], top, stroke)
        if hole:
            self.poly([P(u, v, w1) for u, v in hole], BLACK, False)

    def shadow(self, u0, u1, v0, v1, w=-0.2):
        self.poly([P(u0, v0, w), P(u1, v0, w), P(u1, v1, w), P(u0, v1, w)], "#000000", False, 0.15)

    def save(self, path, pad=12):
        pts = [p for q, _, _, _ in self.polys for p in q]
        x0, y0 = min(p[0] for p in pts), min(p[1] for p in pts)
        x1, y1 = max(p[0] for p in pts), max(p[1] for p in pts)
        ox, oy = pad - x0, pad - y0
        w, h = x1 - x0 + 2 * pad, y1 - y0 + 2 * pad
        out = ['<?xml version="1.0" encoding="utf-8"?>',
               f'<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"\n'
               f'\t width="{w:.1f}px" height="{h:.1f}px" viewBox="0 0 {w:.1f} {h:.1f}" xml:space="preserve">']
        for q, fill, stroke, op in self.polys:
            s = " ".join(f"{x + ox:.1f},{y + oy:.1f}" for x, y in q)
            a = f'<polygon fill="{fill}"'
            if op:
                a += f' opacity="{op}"'
            if stroke:
                a += f' stroke="{OUTLINE}" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10"'
            out.append(f"\t{a} points=\"{s}\"/>")
        out.append("</svg>")
        with open(path, "w") as f:
            f.write("\n".join(out) + "\n")
        print(f"wrote {path} ({w:.0f} x {h:.0f})", file=sys.stderr)
