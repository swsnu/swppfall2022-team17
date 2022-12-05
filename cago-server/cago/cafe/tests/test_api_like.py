from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from ..models import Cafe, CafeMenu, ManagedCafe
from ..utils import parse_coordinate

User = get_user_model()

user_data = {
    "email": "test1@test.com",
    "password": "qwer1234",
}

cafe_data = {
    "name": "이상한 카페",
    "phone_number": "+821012345678",
    "location": parse_coordinate("127.000304 37.475322"),
    "address": "서울특별시 서초구 방배로 21",
    "registration_number": 1234567890,
    "owner": None,
}


class CafeLikeAPITestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(**user_data)
        cls.cafe_data = cafe_data.copy()
        cls.cafe_data["owner"] = cls.user
        cls.cafe = ManagedCafe.objects.create(**cls.cafe_data)

    def setUp(self):
        self.client.force_authenticate(self.user)

    def test_like_create_success(self):
        response = self.client.post(reverse("like"), {"cafe": self.cafe.id})
        self.assertContains(response, "", status_code=status.HTTP_201_CREATED)

    def test_like_delete_success(self):
        response = self.client.delete(reverse("like"), {"cafe": self.cafe.id})
        self.assertContains(response, "", status_code=status.HTTP_204_NO_CONTENT)

    def test_like_create_no_cafe_id(self):
        response = self.client.post(reverse("like"), {})
        self.assertContains(
            response, "invalid", status_code=status.HTTP_400_BAD_REQUEST
        )

    def test_like_delete_no_cafe_id(self):
        response = self.client.delete(reverse("like"), {})
        self.assertContains(
            response, "invalid", status_code=status.HTTP_400_BAD_REQUEST
        )
