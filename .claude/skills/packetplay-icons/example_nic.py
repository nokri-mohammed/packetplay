"""Worked example: the network card icon. Run: python3 example_nic.py <out.svg>"""
import sys
from isogen import *

i = Icon()
L, W, T = 17, 9.5, 0.7
GREEN, GREEN_L, GREEN_R, TRACE = "#1F7A45", "#145A32", "#0E4727", "#5DBB84"
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
# metal bracket with an ethernet port, two LEDs and an antenna on the front panel
b0, b1 = L, L + 0.6
i.box(b0, b1, -0.3, W + 0.3, -0.3, 4.8, TOP, SIDE_L, SIDE_R)
i.face_u(b1, 1.0, 5.4, 0.9, 3.0, BLACK, True)
i.face_u(b1, 1.5, 4.9, 1.2, 1.9, YELLOW)
i.face_u(b1, 1.5, 4.9, 1.9, 2.2, SIDE_R)
i.face_u(b1, 1.3, 2.0, 3.6, 4.2, YELLOW, True)
i.face_u(b1, 3.7, 4.4, 3.6, 4.2, BLUE, True)
# antenna: gold connector on the panel, black rod standing up from it
av = 7.6
i.box(b1, b1 + 0.7, av - 0.4, av + 0.4, 1.6, 2.5, YELLOW, "#C99A00", "#C99A00")
i.box(b1 + 0.2, b1 + 0.5, av - 0.15, av + 0.15, 2.5, 10.6, "#4A4F59", BLACK, BLACK)
i.save(sys.argv[1])
