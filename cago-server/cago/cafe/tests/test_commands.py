import os
from io import StringIO
from unittest import mock

from django.contrib.gis.measure import D
from django.core.management import call_command
from django.core.management.base import CommandError
from django.test import TestCase

from ..models import Cafe


def mocked_requests_get(*args, **kwargs):
    """
    Mocks Kakao maps place search.
    """

    class MockResponse:
        def __init__(self, json_data, status_code):
            self.json_data = json_data
            self.status_code = status_code

        def json(self):
            return self.json_data

    return MockResponse(
        {
            "documents": [
                {
                    "place_name": "이상한 카페",
                    "phone": "02-123-1234",
                    "x": "126.9523",
                    "y": "37.4487",
                    "address_name": "서울",
                },
                {
                    "place_name": "님폰없",
                    "phone": "",
                    "x": "126.9523",
                    "y": "37.4487",
                    "address_name": "서울",
                },
            ],
            "meta": {"is_end": True},
        },
        200,
    )


class CollectCafesTestCase(TestCase):
    @mock.patch("requests.get", side_effect=mocked_requests_get)
    def test_collect_cafes_success(self, *args):
        self.assertEqual(Cafe.objects.all().count(), 0)
        out = StringIO()
        with mock.patch.dict(os.environ, {"KAKAO_ADMIN_KEY": "qwer1234"}):
            call_command("collectcafes", stdout=out)
        self.assertIn("cafes found", out.getvalue())
        self.assertGreater(Cafe.objects.all().count(), 0)

    @mock.patch("requests.get", side_effect=mocked_requests_get)
    def test_collect_cafes_no_admin_key(self, *args):
        with mock.patch.dict(os.environ, {"KAKAO_ADMIN_KEY": ""}):
            with self.assertRaises(CommandError):
                call_command("collectcafes")

    @mock.patch("requests.get", side_effect=mocked_requests_get)
    def test_collect_cafes_verbose(self, *args):
        out = StringIO()
        with mock.patch.dict(os.environ, {"KAKAO_ADMIN_KEY": "qwer1234"}):
            call_command("collectcafes", verbosity=2, stdout=out)
        self.assertIn("created", out.getvalue())
        self.assertIn("already exists", out.getvalue())
