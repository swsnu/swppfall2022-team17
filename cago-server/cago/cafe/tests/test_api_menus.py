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

menu_data_1 = {
    "name": "아메리카노",
    "category": "coffee",
    "cafe": None,
    "is_main": True,
    "price": "9999",
    "image": "https://cdn4.iconfinder.com/data/icons/sketchy-basic-icons/94/coffee-512.png",
}

menu_data_2 = {
    "name": "마카롱",
    "category": "dessert",
    "cafe": None,
    "is_main": False,
    "price": "9999",
    "image": "https://cdn4.iconfinder.com/data/icons/sketchy-basic-icons/94/coffee-512.png",
}


class MenuCreateAPITestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(**user_data)
        cls.cafe_data = cafe_data.copy()
        cls.cafe_data["owner"] = cls.user
        cls.cafe = ManagedCafe.objects.create(**cls.cafe_data)
        cls.menu_data = menu_data_1.copy()
        cls.menu_data["cafe"] = cls.cafe.id

    def setUp(self):
        self.client.force_authenticate(self.user)

    def test_menu_create_success(self):
        response = self.client.post(reverse("menu-list"), self.menu_data)
        self.assertContains(
            response, self.menu_data["name"], status_code=status.HTTP_201_CREATED
        )

    def test_menu_create_not_manager(self):
        user2 = User.objects.create_user(email="test2@test.com", password="qwer1234")
        self.client.logout()
        self.client.force_authenticate(user2)
        response = self.client.post(reverse("menu-list"), self.menu_data)
        self.assertContains(
            response, "permission", status_code=status.HTTP_403_FORBIDDEN
        )


class MenuUpdateAPITestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(**user_data)
        cls.cafe_data = cafe_data.copy()
        cls.cafe_data["owner"] = cls.user
        cls.cafe = ManagedCafe.objects.create(**cls.cafe_data)
        cls.menu_data = menu_data_1.copy()
        cls.menu_data["cafe"] = cls.cafe
        cls.menu = CafeMenu.objects.create(**cls.menu_data)

    def setUp(self):
        self.client.force_authenticate(self.user)

    def test_menu_update_success(self):
        response = self.client.patch(
            reverse("menu-detail", args=[self.menu.id]), {"name": "아메"}
        )
        self.assertContains(response, "아메")

    def test_menu_update_not_manager(self):
        user2 = User.objects.create_user(email="test2@test.com", password="qwer1234")
        self.client.logout()
        self.client.force_authenticate(user2)
        response = self.client.patch(
            reverse("menu-detail", args=[self.menu.id]), {"name": "아메"}
        )
        self.assertContains(
            response, "permission", status_code=status.HTTP_403_FORBIDDEN
        )
