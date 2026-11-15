"""Worked example: the network card icon. Run: python3 example_nic.py <out.svg>"""
import sys
from isogen import *

i = Icon()
L, W, T = 17, 9.5, 0.7
GREEN, GREEN_L, GREEN_R, TRACE = "#2FA866", "#1D7A47", "#16623A", "#8BE3B0"
i.shadow(-0.5, L + 3, -0.5, W + 2.5)
# gold edge connector tab, then the board
i.box(2.5, 13.5, W, W + 1.1, 0, T, YELLOW, "#C99A00", "#C99A00")
for n in range(11):
    u = 2.9 + n
    i.top(T, u + 0.55, u + 0.7, W + 0.05, W + 1.1, BLACK)
i.box(0, L, 0, W, 0, T, GREEN, GREEN_L, GREEN_R)
for v in (1.6, 2.4):
    i.top(T, 1.0, 4.6, v, v + 0.18, TRACE)
i.top(T, 6.0, 10.0, 7.4, 7.58, TRACE)
for u, v in ((2.0, 4.4), (2.0, 5.4), (3.2, 4.9)):
    i.box(u, u + 0.8, v, v + 0.5, T, T + 0.4, BLACK, BLACK, BLACK, False)
i.box(5.2, 10.0, 2.4, 6.4, T, T + 1.5, TOP, SIDE_L, SIDE_R)
i.top(T + 1.5, 5.9, 9.3, 3.3, 5.5, WHITE, True)
i.box(10.8, 13.2, 6.0, 8.4, T, T + 0.9, TOP, SIDE_L, SIDE_R)
# metal bracket, antenna connector, LEDs
b0, b1 = L, L + 0.6
i.box(b0, b1, -0.3, W + 0.3, -0.3, 4.8, TOP, SIDE_L, SIDE_R)
i.face_u(b1, 1.3, 2.1, 3.3, 3.9, YELLOW, True)
i.face_u(b1, 7.4, 8.2, 3.3, 3.9, BLUE, True)
i.box(b1, b1 + 0.5, 4.2, 5.3, 1.3, 2.4, YELLOW, "#C99A00", "#C99A00")
# antenna: a black base and a rod standing on the bracket
ac = 4.75
i.box(b0 + 0.05, b0 + 0.55, ac - 0.4, ac + 0.4, 4.8, 5.6, "#4A4F59", BLACK, BLACK)
i.box(b0 + 0.15, b0 + 0.45, ac - 0.15, ac + 0.15, 5.6, 11.0, "#4A4F59", BLACK, BLACK)
i.save(sys.argv[1])
