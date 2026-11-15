"""Two kernel layer icons on a shared kernel chip base.
Run: python3 kernel_layers.py <out_dir>   (writes kernel-ip.svg and kernel-tcp.svg)"""
import os, sys
from isogen import *

K_TOP, K_L, K_R = "#4B6E98", "#3A5877", "#2D4663"
N = 14.5
BASE_W = 1.2


def chip_base(i):
    """A kernel chip: dark blue slab with gold pins on the two visible edges."""
    i.shadow(-0.8, N + 2.8, -0.8, N + 2.8)
    i.box(0, N, 0, N, 0, BASE_W, K_TOP, K_L, K_R)
    for k in range(7):
        c = 1.5 + k * 1.9
        i.box(N, N + 0.7, c, c + 0.8, 0.15, 0.95, YELLOW, "#C99A00", "#C99A00", False)
        i.box(c, c + 0.8, N, N + 0.7, 0.15, 0.95, YELLOW, "#C99A00", "#C99A00", False)


def kernel_ip():
    """Network layer: a routing hub (yellow) linked to four nodes."""
    i = Icon()
    chip_base(i)
    m, w = N / 2, BASE_W
    for a, b in (((m, 1.9), (m, m)), ((m, m), (m, N - 1.9)), ((1.9, m), (m, m)), ((m, m), (N - 1.9, m))):
        (u0, v0), (u1, v1) = a, b
        i.top(w, min(u0, u1) - 0.3, max(u0, u1) + 0.3, min(v0, v1) - 0.3, max(v0, v1) + 0.3, "#0070D9")
    for u, v in ((m, 1.9), (1.9, m), (N - 1.9, m), (m, N - 1.9)):
        i.box(u - 0.9, u + 0.9, v - 0.9, v + 0.9, w, w + 1.8, TOP, SIDE_L, SIDE_R)
    i.box(m - 1.5, m + 1.5, m - 1.5, m + 1.5, w, w + 2.6, YELLOW, "#D9A400", "#A87F00")
    return i


def kernel_tcp():
    """Transport layer: ordered, numbered segments (a staircase) and an acknowledgement arrow pair."""
    i = Icon()
    chip_base(i)
    w = BASE_W
    for k in range(4):
        u = 1.3 + k * 3.0
        i.box(u, u + 2.6, 2.0, 6.2, w, w + 1.0 + k * 1.0, TOP, SIDE_L, SIDE_R)
        i.top(w + 1.0 + k * 1.0, u + 0.5, u + 2.1, 3.0, 5.2, BLUE)   # a coloured label on each segment
    i.arrow(w, 2.0, N - 2.0, 9.4, 0.8, "#0070D9")
    i.arrow(w, N - 2.0, 2.0, 12.2, 0.8, YELLOW)
    return i


if __name__ == "__main__":
    out = sys.argv[1]
    kernel_ip().save(os.path.join(out, "kernel-ip.svg"))
    kernel_tcp().save(os.path.join(out, "kernel-tcp.svg"))
