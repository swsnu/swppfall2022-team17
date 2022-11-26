import requests
from decouple import UndefinedValueError, config
from django.contrib.gis.geos import Point
from django.contrib.gis.measure import D
from django.core.management.base import BaseCommand, CommandError

from cago.cafe.models import Cafe


def parse_phone_number(phone_number: str):
    if phone_number == "":
        return None

    res = phone_number.replace("-", "")
    if res.startswith("0"):
        res = res[1:]
    res = "+82" + res

    return res


def parse_location(x: str, y: str):
    x, y = float(x), float(y)
    res = Point(x, y)

    return res


class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument(
            "-x",
            "--long",
            type=float,
            help="Longitude of the center. Default: 126.9523",
            default=126.9523,
        )
        parser.add_argument(
            "-y",
            "--lat",
            type=float,
            help="Latitude of the center. Default: 37.4487",
            default=37.4487,
        )
        parser.add_argument(
            "-r",
            "--radius",
            type=int,
            help="Search radius by meter. Max 20000.",
            default=20000,
        )

    def handle(self, *args, **options):
        admin_key = config("KAKAO_ADMIN_KEY", default="")
        if not admin_key:
            raise CommandError(
                "Environment variable KAKAO_ADMIN_KEY should be set. Visit https://developers.kakao.com/ for more information."
            )

        x, y = options["long"], options["lat"]
        radius = options["radius"]

        url = "http://dapi.kakao.com/v2/local/search/category"
        page, is_end = 1, False  # pagination
        cafes = []

        while not is_end:
            res = requests.get(
                url,
                {
                    "x": x,
                    "y": y,
                    "category_group_code": "CE7",
                    "radius": radius,
                    "page": page,
                },
                headers={"Authorization": f"KakaoAK {admin_key}"},
            )

            data = res.json()
            page += 1
            is_end = data["meta"]["is_end"]
            docs = data["documents"]

            for cafe in docs:
                cafes.append(
                    {
                        "name": cafe["place_name"],
                        "phone_number": parse_phone_number(cafe["phone"]),
                        "location": parse_location(cafe["x"], cafe["y"]),
                        "address": cafe["address_name"],
                    }
                )

        total = len(cafes)
        dup = 0
        verbosity = options["verbosity"]  # Defult: 1

        # Add the cafes to the database.
        for cafe in cafes:
            name = cafe["name"]
            if Cafe.objects.filter(
                location__distance_lte=(cafe["location"], D(m=3))
            ).exists():
                if verbosity >= 2:
                    self.stdout.write(self.style.NOTICE(f"[{name}] already exists."))
                dup += 1
                continue
            Cafe.objects.create(**cafe)
            if verbosity >= 2:
                self.stdout.write(f"[{name}] created.")
        if verbosity >= 2:
            self.stdout.write("")

        # Print the result.
        if verbosity >= 1:
            self.stdout.write(
                self.style.SUCCESS(
                    f"Total {total} cafes found: {total - dup} added, {dup} skipped due to the duplication."
                )
            )
