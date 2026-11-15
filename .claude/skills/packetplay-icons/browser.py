"""Browser window icon. Run: python3 browser.py <out.svg>"""
import sys
from isogen import *

i = Icon()
U, XW, H = 1.3, 18.0, 10.6   # thickness, width (screen-left to right), height
FRAME = SIDE_L
# face_u() runs along v, which grows to the screen LEFT. fx() maps screen-left-to-right x to v.
def fx(a, b): return XW - b, XW - a
def rect(x0, x1, w0, w1, fill, stroke=False):
    v0, v1 = fx(x0, x1)
    i.face_u(U, v0, v1, w0, w1, fill, stroke)

i.shadow(-1.0, U + 3.5, -1.0, XW + 1.0)
i.box(0, U, 0, XW, 0, H, TOP, SIDE_R, FRAME)       # slab; its +u face is the window
rect(0.7, XW - 0.7, 0.7, H - 0.7, WHITE)             # page area
rect(0.7, XW - 0.7, H - 2.3, H - 0.7, DARK_BLUE)     # title bar
for n, c in enumerate((WHITE, YELLOW, "#8FB8F0")):   # three window dots
    rect(1.3 + n * 1.2, 1.9 + n * 1.2, H - 1.8, H - 1.2, c)
rect(5.6, XW - 1.3, H - 1.95, H - 1.35, WHITE)       # address bar
rect(5.6, 6.2, H - 1.95, H - 1.35, YELLOW)           # lock
rect(1.3, XW - 1.3, 4.9, 7.6, BLUE)                 # hero image
rect(1.9, 7.0, 5.7, 6.8, WHITE)                      # hero title text
rect(1.3, XW - 1.3, 3.5, 4.2, SIDE_L)                # text lines
rect(1.3, XW - 4.0, 2.4, 3.1, SIDE_L)
rect(1.3, XW - 7.0, 1.3, 2.0, SIDE_L)
# mouse pointer
pts = [(11.8, 4.6), (11.8, 1.2), (12.7, 2.1), (13.4, 0.6), (14.1, 0.9), (13.4, 2.4), (14.6, 2.4)]
i.poly([P(U, XW - x, w) for x, w in pts], BLACK, False)
i.save(sys.argv[1])
