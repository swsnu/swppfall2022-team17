import re

from django.contrib.gis.geos import Point


def parse_coordinate(coord):
    coord = re.findall(r"\-?\d*\.?\d+", coord)
    coord = list(map(float, coord))

    if len(coord) != 2:
        raise ValueError("invalid coordinate format")

    return Point(coord)
