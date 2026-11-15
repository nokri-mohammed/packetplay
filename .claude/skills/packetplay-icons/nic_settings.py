"""Network card with a gear beside it (settings / driver). Run: python3 nic_settings.py <out.svg>"""
import sys
from isogen import *
from example_nic import draw_nic

i = Icon()
cu, cv = 7.0, 17.0
i.poly([P(u, v, -0.2) for u, v in circle(cu, cv, 4.6)], "#000000", False, 0.15)  # gear shadow, under everything
draw_nic(i)
# a yellow gear lying on the floor in front of the card
GEAR, GEAR_L, GEAR_R = YELLOW, "#D9A400", "#A87F00"
i.prism(gear(cu, cv, 3.0, 3.9), 0, 1.4, GEAR, GEAR_L, GEAR_R, hole=circle(cu, cv, 1.15))
i.save(sys.argv[1])
