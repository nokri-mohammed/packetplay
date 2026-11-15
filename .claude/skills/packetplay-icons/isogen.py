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
