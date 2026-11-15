"""CPU and FPGA icons. Run: python3 chips.py <out_dir>   (writes cpu.svg and fpga.svg)"""
import os, sys
from isogen import *

N = 14.5
SUB_T, SUB_L, SUB_R = "#3A5877", "#2D4663", "#223650"
GOLD, GOLD_D = YELLOW, "#C99A00"


def cpu():
    """A processor package: dark substrate, gold contact pads, a metal lid with four cores."""
    i = Icon()
    i.shadow(-0.8, N + 1.8, -0.8, N + 1.8)
    i.box(0, N, 0, N, 0, 0.9, SUB_T, SUB_L, SUB_R)
    for k in range(9):                                      # gold contact pads on the substrate rim
        c = 1.4 + k * 1.3
        for a, b in ((0.35, c), (N - 1.0, c), (c, 0.35), (c, N - 1.0)):
            i.top(0.9, a, a + 0.65, b, b + 0.65, GOLD)
    lid0, lid1, lw = 1.7, N - 1.7, 2.5
    i.box(lid0, lid1, lid0, lid1, 0.9, lw, TOP, SIDE_L, SIDE_R)
    i.top(lw, lid0 + 1.2, lid1 - 1.2, lid0 + 1.2, lid1 - 1.2, WHITE, True)
    mid = (lid0 + lid1) / 2
    for du in (-1, 1):                                       # 2 x 2 cores
        for dv in (-1, 1):
            cu, cv = mid + du * 1.45, mid + dv * 1.45
            i.top(lw, cu - 1.1, cu + 1.1, cv - 1.1, cv + 1.1, BLUE)
    return i


def fpga():
    """An FPGA: dark package with leads, a die window showing a grid of logic blocks and routing."""
    i = Icon()
    i.shadow(-0.8, N + 2.4, -0.8, N + 2.4)
    for k in range(12):                                      # thin leads on the two visible edges
        c = 1.0 + k * 1.1
        i.box(N, N + 1.0, c, c + 0.4, 0.2, 0.7, TOP, SIDE_L, SIDE_R, False)
        i.box(c, c + 0.4, N, N + 1.0, 0.2, 0.7, TOP, SIDE_L, SIDE_R, False)
    i.box(0, N, 0, N, 0, 1.6, SUB_T, SUB_L, SUB_R)
    w = 1.6
    i.top(w, 1.5, N - 1.5, 1.5, N - 1.5, WHITE, True)        # die window
    t, g, o = 2.3, 0.7, 1.5 + 0.3
    pat = ("LBLY", "BLYL", "LYLB", "YLBL")
    col = {"L": SIDE_L, "B": BLUE, "Y": YELLOW}
    for r in range(4):
        for c in range(4):
            u, v = o + r * (t + g), o + c * (t + g)
            i.top(w, u, u + t, v, v + t, col[pat[r][c]])
    for r in range(3):                                       # routing lines in the gaps
        line = o + t + r * (t + g) + g / 2 - 0.1
        i.top(w, o, o + 4 * t + 3 * g, line, line + 0.2, "#8FB8F0")
        i.top(w, line, line + 0.2, o, o + 4 * t + 3 * g, "#8FB8F0")
    return i


def diode(i, w, u, v0, v1, half, toward_v_plus, fill):
    """A diode symbol lying flat on plane w: centre line at u, from v0 to v1, triangle plus bar.
    Screen-left is +v, so toward_v_plus=True points the diode to the left."""
    mid, ln = (v0 + v1) / 2, 0.95 * half                    # half the triangle length
    a, b = (mid - ln, mid + ln) if toward_v_plus else (mid + ln, mid - ln)           # base, apex
    i.top(w, u - 0.25, u + 0.25, v0, v1, BLACK)                                       # leads
    i.poly([P(u - half, a, w), P(u + half, a, w), P(u, b, w)], fill, True)            # triangle
    bar = b + (0.6 if toward_v_plus else -0.6)
    i.top(w, u - half - 0.2, u + half + 0.2, min(b, bar), max(b, bar), BLACK)        # bar


def fpga_diode():
    """The FPGA with two diode symbols on the die: one in the middle pointing left, one at the front
    pointing the opposite way (right)."""
    i = Icon()
    i.shadow(-0.8, N + 2.4, -0.8, N + 2.4)
    for k in range(12):
        c = 1.0 + k * 1.1
        i.box(N, N + 1.0, c, c + 0.4, 0.2, 0.7, TOP, SIDE_L, SIDE_R, False)
        i.box(c, c + 0.4, N, N + 1.0, 0.2, 0.7, TOP, SIDE_L, SIDE_R, False)
    i.box(0, N, 0, N, 0, 1.6, SUB_T, SUB_L, SUB_R)
    w = 1.6
    i.top(w, 1.5, N - 1.5, 1.5, N - 1.5, WHITE, True)
    t, g, o = 2.3, 0.7, 1.8
    col = {"L": SIDE_L, "B": BLUE, "Y": YELLOW}
    for c, ch in enumerate("LBLY"):                          # back row of logic blocks only
        v = o + c * (t + g)
        i.top(w, o, o + t, v, v + t, col[ch])
    diode(i, w, 7.2, 2.3, 12.2, 1.9, True, "#8FB8F0")       # middle, points left
    diode(i, w, 11.7, 2.3, 12.2, 1.2, False, YELLOW)        # front, points right
    return i


if __name__ == "__main__":
    out = sys.argv[1]
    cpu().save(os.path.join(out, "cpu.svg"))
    fpga().save(os.path.join(out, "fpga.svg"))
    fpga_diode().save(os.path.join(out, "fpga-diode.svg"))
