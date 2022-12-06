from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from ..models import CafeImage, ManagedCafe
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

image_data_1 = {"cafe": None, "is_main": True, "url": "https://somesite.com/image.png"}
image_data_2 = {"cafe": None, "is_main": False, "url": "https://somesite.com/image.png"}


class MenuCreateAPITestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(**user_data)
        cls.cafe_data = cafe_data.copy()
        cls.cafe_data["owner"] = cls.user
        cls.cafe = ManagedCafe.objects.create(**cls.cafe_data)
        cls.image_data = image_data_1.copy()
        cls.image_data["cafe"] = cls.cafe.id

    def setUp(self):
        self.client.force_authenticate(self.user)

    def test_image_create_success(self):
        response = self.client.post(reverse("image-list"), self.image_data)
        self.assertContains(
            response, self.image_data["url"], status_code=status.HTTP_201_CREATED
        )

    def test_image_switch_main(self):
        org_image_data = self.image_data.copy()
        org_image_data["cafe"] = self.cafe
        org_image = CafeImage.objects.create(**org_image_data)
        new_image_data = image_data_2.copy()
        new_image_data["cafe"] = self.cafe.id
        new_image_data["is_main"] = True
        response = self.client.post(reverse("image-list"), new_image_data)
        self.assertContains(
            response, new_image_data["url"], status_code=status.HTTP_201_CREATED
        )
        org_image.refresh_from_db()
        self.assertFalse(org_image.is_main)

    def test_image_create_not_manager(self):
        user2 = User.objects.create_user(email="test2@test.com", password="qwer1234")
        self.client.logout()
        self.client.force_authenticate(user2)
        response = self.client.post(reverse("image-list"), self.image_data)
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
        cls.image_data = image_data_1.copy()
        cls.image_data["cafe"] = cls.cafe
        cls.image = CafeImage.objects.create(**cls.image_data)

    def setUp(self):
        self.client.force_authenticate(self.user)

    def test_image_update_success(self):
        new_url = "https://anothersite.com/image.png"
        response = self.client.patch(
            reverse("image-detail", args=[self.image.id]),
            {"url": new_url},
        )
        self.assertContains(response, new_url)

    def test_image_update_switch_main(self):
        new_image_data = image_data_2.copy()
        new_image_data["cafe"] = self.cafe
        new_image_data["is_main"] = False
        new_image = CafeImage.objects.create(**new_image_data)
        self.client.patch(
            reverse("image-detail", args=[new_image.id]), {"is_main": True}
        )
        new_image.refresh_from_db()
        self.assertTrue(new_image.is_main)
        self.image.refresh_from_db()
        self.assertFalse(self.image.is_main)
