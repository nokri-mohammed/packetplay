"""display-small, camera-small and daemon icons. Run: python3 devices.py <out_dir>"""
import math, os, sys
import isogen
from isogen import *

GREEN, GREEN_L, GREEN_R = "#2FA866", "#1D7A47", "#16623A"
GOLD, GOLD_D = YELLOW, "#C99A00"
K_TOP, K_L, K_R = "#4B6E98", "#3A5877", "#2D4663"


def display_small():
    """A small OLED style display module standing on its four pins."""
    set_scale(36)
    U, XW, H, FOOT = 0.8, 13.0, 7.4, 1.2
    i = Icon()
    fx = lambda a, b: (XW - b, XW - a)
    def rect(x0, x1, w0, w1, fill, stroke=False):
        v0, v1 = fx(x0, x1)
        i.face_u(U, v0, v1, w0 + FOOT, w1 + FOOT, fill, stroke)
    i.shadow(-1.0, U + 3.0, -1.0, XW + 1.0)
    for k in range(4):                                       # the four pins under the board
        a = 4.7 + k * 1.2
        v0, v1 = fx(a, a + 0.5)
        i.box(0.15, 0.65, v0, v1, 0, FOOT + 0.2, GOLD, GOLD_D, GOLD_D, False)
    i.box(0, U, 0, XW, FOOT, FOOT + H, BLUE, "#004E9A", "#0A5FBF")        # the module board
    rect(0.9, XW - 0.9, 1.2, H - 0.6, BLACK, True)                          # the glass
    rect(1.5, XW - 1.5, 5.3, 5.8, "#8FB8F0")                                # title line
    rect(1.5, 7.5, 4.3, 4.7, WHITE)                                          # two text lines
    rect(1.5, 6.0, 3.6, 4.0, WHITE)
    for k, h in enumerate((0.8, 1.3, 1.9, 1.5, 2.1)):                       # a small bar chart
        rect(1.5 + k * 1.1, 2.3 + k * 1.1, 1.5, 1.5 + h, YELLOW if k == 4 else "#8FB8F0")
    for x, w in ((0.45, 0.45), (XW - 0.45, 0.45)):                           # mounting dots
        for ww in (0.35, H - 0.25):
            rect(x - 0.12, x + 0.12, ww - 0.12, ww + 0.12, BLACK)
    return i


def camera_small():
    """A small camera module (board, lens, flat cable)."""
    set_scale(40)
    L = W = 5.0
    T = 0.5
    i = Icon()
    i.shadow(-0.6, L + 6.6, -0.6, W + 0.8)
    i.box(L - 0.2, L + 5.8, 1.7, W - 1.7, 0, 0.18, GOLD, GOLD_D, GOLD_D)               # the flat cable
    i.box(0, L, 0, W, 0, T, GREEN, GREEN_L, GREEN_R)                                    # the board
    i.box(L - 1.0, L - 0.2, 1.3, W - 1.3, T, T + 0.5, BLACK, BLACK, BLACK)              # cable connector
    for u, v in ((0.55, 0.55), (0.55, W - 0.55), (L - 0.55, 0.55), (L - 0.55, W - 0.55)):
        i.poly([P(a, b, T) for a, b in circle(u, v, 0.3, 10)], GOLD, False)
    c = W / 2
    i.box(c - 1.5, c + 1.5, c - 1.5, c + 1.5, T, T + 1.0, "#4A4F59", BLACK, BLACK)       # sensor housing
    i.prism(circle(c, c, 1.15, 18), T + 1.0, T + 2.1, "#4A4F59", BLACK, BLACK)            # lens barrel
    i.poly([P(a, b, T + 2.1) for a, b in circle(c, c, 0.8, 16)], BLUE, False)             # glass
    i.poly([P(a, b, T + 2.1) for a, b in circle(c - 0.22, c - 0.22, 0.22, 8)], WHITE, False)
    return i


def daemon():
    """A process daemon: a console block with a gear on top, inside a loop arrow that never ends."""
    set_scale(26)
    S = 6.0
    i = Icon()
    cu = cv = S / 2
    i.shadow(-3.6, S + 3.6, -3.6, S + 3.6)
    i.ring_arrow(0.02, cu, cv, 5.5, 6.5, math.radians(140), math.radians(440), BLUE)
    i.box(0, S, 0, S, 0, 4.0, K_TOP, K_L, K_R)
    fx = lambda x: S - x                                                                  # screen x to v
    for x1, w0 in ((4.6, 2.9), (3.6, 2.2)):                                                # two lines of text
        i.face_u(S, fx(x1), fx(1.0), w0, w0 + 0.3, WHITE)
    i.face_u(S, fx(1.8), fx(1.0), 1.3, 1.8, "#2DCB6B")                                     # a block cursor
    i.prism(gear(cu, cv, 1.7, 2.3), 4.0, 5.0, YELLOW, "#D9A400", "#A87F00", hole=circle(cu, cv, 0.6, 12))
    return i


if __name__ == "__main__":
    out = sys.argv[1]
    for name, fn in (("display-small", display_small), ("camera-small", camera_small), ("daemon", daemon)):
        isogen.set_scale(22)
        fn().save(os.path.join(out, name + ".svg"))
