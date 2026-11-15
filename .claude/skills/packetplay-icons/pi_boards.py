"""Raspberry Pi icons: raspberry-pi (a full size board) and raspberry-pi-zero-2.
Run: python3 pi_boards.py <out_dir>.  No logos, only the boards' shapes."""
import os, sys
from isogen import *

GREEN, GREEN_L, GREEN_R, TRACE = "#2FA866", "#1D7A47", "#16623A", "#8BE3B0"
GOLD, GOLD_D = YELLOW, "#C99A00"
T = 0.7


def board(i, L, W):
    i.shadow(-0.6, L + 2.2, -0.6, W + 2.2)
    i.box(0, L, 0, W, 0, T, GREEN, GREEN_L, GREEN_R)


def mount_holes(i, pts):
    for u, v in pts:
        i.poly([P(a, b, T) for a, b in circle(u, v, 0.5, 12)], GOLD, False)
        i.poly([P(a, b, T) for a, b in circle(u, v, 0.22, 10)], BLACK, False)


def gpio(i, u0, pairs, v=0.4):
    """A 2 x N pin header along the back edge."""
    n = pairs
    i.box(u0, u0 + n * 0.5, v, v + 1.0, T, T + 0.55, "#4A4F59", BLACK, BLACK)
    for k in range(n):
        for r in (0, 1):
            a, b = u0 + 0.11 + k * 0.5, v + 0.1 + r * 0.5
            i.top(T + 0.55, a, a + 0.28, b, b + 0.28, GOLD)


def soc(i, u0, u1, v0, v1, h=0.8):
    i.box(u0, u1, v0, v1, T, T + h, TOP, SIDE_L, SIDE_R)
    i.top(T + h, u0 + 0.35, u1 - 0.35, v0 + 0.35, v1 - 0.35, WHITE, True)


def port_u(i, u0, u1, v0, v1, h, holes, color=(TOP, SIDE_L, SIDE_R)):
    """A connector sticking out of the u=L end; holes = [(w0, w1, fill)] on its +u face."""
    i.box(u0, u1, v0, v1, T, T + h, *color)
    for w0, w1, fill in holes:
        i.face_u(u1, v0 + 0.3, v1 - 0.3, T + w0, T + w1, fill)


def port_v(i, u0, u1, v0, v1, h, hole=True, color=(TOP, SIDE_L, SIDE_R)):
    """A connector sticking out of the v=W edge."""
    i.box(u0, u1, v0, v1, T, T + h, *color)
    if hole:
        i.face_v(v1, u0 + 0.25, u1 - 0.25, T + 0.18, T + h - 0.18, BLACK)


def pi():
    L, W = 17.0, 11.2
    i = Icon()
    board(i, L, W)
    mount_holes(i, [(0.7, 0.7), (0.7, 0.7 + 9.8), (0.7 + 11.6, 0.7), (0.7 + 11.6, 0.7 + 9.8)])
    gpio(i, 3.0, 20)
    for k in range(3):                                       # a trace or two
        i.top(T, 1.6, 4.4, 2.6 + k * 0.5, 2.78 + k * 0.5, TRACE)
    soc(i, 5.6, 9.0, 3.6, 7.0)                               # the processor under its metal lid
    i.box(9.6, 12.0, 4.2, 6.6, T, T + 0.5, "#4A4F59", BLACK, BLACK)   # memory
    # ports on the front edge: USB-C power, two micro HDMI, audio jack
    port_v(i, 1.8, 3.6, W - 1.6, W + 0.3, 0.8)
    port_v(i, 4.4, 6.0, W - 1.6, W + 0.3, 0.7)
    port_v(i, 6.6, 8.2, W - 1.6, W + 0.3, 0.7)
    i.box(10.4, 12.0, W - 1.8, W + 0.3, T, T + 1.2, "#4A4F59", BLACK, BLACK)
    i.face_v(W + 0.3, 10.7, 11.7, T + 0.35, T + 0.85, "#8FB8F0")
    # ports on the right end: Ethernet, then two USB stacks
    ue = L + 0.3
    port_u(i, L - 3.4, ue, 0.9, 4.1, 2.8, [(0.5, 1.9, BLACK), (0.5, 0.8, GOLD)])
    port_u(i, L - 3.4, ue, 4.6, 7.2, 3.0, [(0.4, 1.25, BLACK), (1.9, 2.75, BLACK), (0.4, 0.55, BLUE)])
    port_u(i, L - 3.4, ue, 7.7, 10.3, 3.0, [(0.4, 1.25, BLACK), (1.9, 2.75, BLACK)])
    return i


def pi_zero_2():
    L, W = 13.0, 6.0
    i = Icon()
    board(i, L, W)
    # microSD card poking out of the back-left end
    i.box(-1.0, 1.6, 2.0, 4.0, T, T + 0.3, DARK_BLUE, "#3A5877", "#2D4663")
    for k in range(4):
        i.top(T + 0.3, 0.2 + k * 0.3, 0.4 + k * 0.3, 2.3, 3.7, GOLD)
    mount_holes(i, [(0.7, 0.7), (0.7, W - 0.7), (L - 0.7, 0.7), (L - 0.7, W - 0.7)])
    gpio(i, 1.4, 20)
    soc(i, 5.0, 7.6, 2.0, 4.6, 0.7)                          # the processor under its shield
    for k in range(3):                                       # the printed antenna
        a = 9.0 + k * 0.8
        i.top(T, a, a + 0.25, 2.2, 4.4, TRACE)
        i.top(T, a, a + 1.05, 2.2 if k % 2 else 4.15, (2.45 if k % 2 else 4.4), TRACE)
    port_v(i, 1.4, 3.6, W - 1.0, W + 0.3, 0.6)               # mini HDMI
    port_v(i, 7.4, 9.0, W - 1.0, W + 0.3, 0.55)              # micro USB, data
    port_v(i, 10.4, 12.0, W - 1.0, W + 0.3, 0.55)            # micro USB, power
    i.box(L - 1.2, L - 0.2, 1.4, 4.6, T, T + 0.4, WHITE, SIDE_L, SIDE_R)   # camera connector
    i.face_u(L - 0.2, 1.7, 4.3, T + 0.1, T + 0.3, BLACK)
    return i


if __name__ == "__main__":
    out = sys.argv[1]
    pi().save(os.path.join(out, "raspberry-pi.svg"))
    set_scale(30)          # the Zero is a small board: draw it bigger so the canvas matches the others
    pi_zero_2().save(os.path.join(out, "raspberry-pi-zero-2.svg"))
