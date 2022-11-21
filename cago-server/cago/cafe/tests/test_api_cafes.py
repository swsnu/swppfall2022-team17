from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from ..models import Cafe, ManagedCafe
from ..utils import parse_coordinate

User = get_user_model()

user_data = {
    "email": "test1@test.com",
    "password": "qwer1234",
}

managed_cafe_data = {
    "name": "이상한 카페",
    "phone_number": "+821012345678",
    "location": "127.000304 37.475322",
    "address": "서울특별시 서초구 방배로 21",
    "registration_number": 1234567890,
}

unmanaged_cafe_data = {
    "name": "야생의 카페",
    "location": "-122.1589 37.4461",
    "address": "팔로알토",
}


class CafeCreateAPITestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(**user_data)
        cls.cafe_data = managed_cafe_data.copy()
        cls.point = parse_coordinate(managed_cafe_data["location"])

    def setUp(self):
        self.client.force_authenticate(self.user)

    def test_cafe_create_success(self):
        response = self.client.post(reverse("cafe-list"), self.cafe_data)
        self.assertContains(
            response, self.cafe_data["name"], status_code=status.HTTP_201_CREATED
        )
        self.assertEqual(response.json()["owner"], self.user.pk)

    def test_cafe_create_replace_unmanaged_cafe(self):
        data = self.cafe_data.copy()
        data.pop("registration_number")
        data.update({"location": self.point})
        cafe = Cafe.objects.create(**data)
        response = self.client.post(reverse("cafe-list"), self.cafe_data)
        self.assertContains(
            response, self.cafe_data["name"], status_code=status.HTTP_201_CREATED
        )
        managed_cafe = ManagedCafe.objects.first()
        self.assertEqual(cafe, managed_cafe.cafe_ptr)
        self.assertEqual(cafe.managedcafe, managed_cafe)

    def test_cafe_create_not_logged_in(self):
        self.client.logout()
        response = self.client.post(reverse("cafe-list"), self.cafe_data)
        self.assertContains(
            response, "not_authenticated", status_code=status.HTTP_401_UNAUTHORIZED
        )

    def test_cafe_create_existing_managed_cafe(self):
        data = self.cafe_data.copy()
        data.update({"location": self.point, "owner": self.user})
        ManagedCafe.objects.create(**data)
        response = self.client.post(reverse("cafe-list"), self.cafe_data)
        self.assertContains(response, "unique", status_code=status.HTTP_400_BAD_REQUEST)

    def test_cafe_create_invalid_location(self):
        data = self.cafe_data.copy()
        data["location"] = "12700030437475322"
        response = self.client.post(reverse("cafe-list"), data)
        self.assertContains(
            response, "invalid", status_code=status.HTTP_400_BAD_REQUEST
        )


class CafeRetrieveAPITestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        data = managed_cafe_data.copy()
        data["location"] = parse_coordinate(managed_cafe_data["location"])
        data["owner"] = User.objects.create(**user_data)
        cls.managed_cafe = ManagedCafe.objects.create(**data)

        data = unmanaged_cafe_data.copy()
        data["location"] = parse_coordinate(unmanaged_cafe_data["location"])
        cls.unmanaged_cafe = Cafe.objects.create(**data)

    def test_cafe_retrieve_success(self):
        response = self.client.get(reverse("cafe-detail", args=[self.managed_cafe.pk]))
        self.assertContains(
            response,
            self.managed_cafe.registration_number,
            status_code=status.HTTP_200_OK,
        )

        response = self.client.get(
            reverse("cafe-detail", args=[self.unmanaged_cafe.pk])
        )
        self.assertContains(
            response, self.unmanaged_cafe.name, status_code=status.HTTP_200_OK
        )

    def test_cafe_retrieve_not_found(self):
        response = self.client.get(reverse("cafe-detail", args=[99]))
        self.assertContains(
            response, "not_found", status_code=status.HTTP_404_NOT_FOUND
        )


class CafeListAPITestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create(**user_data)

        data = managed_cafe_data.copy()
        data["location"] = parse_coordinate(managed_cafe_data["location"])
        data["owner"] = cls.user
        cls.managed_cafe = ManagedCafe.objects.create(**data)
        cls.managed_cafe.managers.add(cls.user)
        cls.managed_cafe_location = managed_cafe_data["location"]

        data = unmanaged_cafe_data.copy()
        data["location"] = parse_coordinate(unmanaged_cafe_data["location"])
        cls.unmanaged_cafe = Cafe.objects.create(**data)

    def test_cafe_list_success(self):
        response = self.client.get(reverse("cafe-list"))
        self.assertContains(
            response, self.managed_cafe.name, status_code=status.HTTP_200_OK
        )
        self.assertEqual(len(response.json()), 2)

    def test_cafe_list_location(self):
        response = self.client.get(
            reverse("cafe-list"), {"location": self.managed_cafe_location}
        )
        self.assertContains(
            response, self.managed_cafe.name, status_code=status.HTTP_200_OK
        )
        self.assertEqual(len(response.json()), 1)

    def test_cafe_list_manager(self):
        response = self.client.get(reverse("cafe-list"), {"manager": self.user.pk})
        self.assertContains(
            response, self.managed_cafe.name, status_code=status.HTTP_200_OK
        )
        self.assertEqual(len(response.json()), 1)

    def test_cafe_list_invalid_location(self):
        response = self.client.get(reverse("cafe-list"), {"location": "999999"})
        self.assertContains(response, "", status_code=status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 0)


class CafeUpdateAPITestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create(**user_data)
        cls.user2 = User.objects.create(email="test2@test.com", password="qwer1234")

        data = managed_cafe_data.copy()
        data["location"] = parse_coordinate(managed_cafe_data["location"])
        data["owner"] = cls.user
        cls.cafe = ManagedCafe.objects.create(**data)
        cls.cafe.managers.add(cls.user)
        cls.location = managed_cafe_data["location"]
        cls.name = "이상한 이름"

    def setUp(self):
        self.client.force_authenticate(self.user)

    def test_cafe_update_success(self):
        response = self.client.patch(
            reverse("cafe-detail", args=[self.cafe.id]), {"name": self.name}
        )
        self.assertContains(response, self.name, status_code=status.HTTP_200_OK)

    def test_cafe_update_manager(self):
        self.cafe.managers.add(self.user2)
        self.client.force_authenticate(self.user2)
        response = self.client.patch(
            reverse("cafe-detail", args=[self.cafe.id]), {"name": self.name}
        )
        self.assertContains(response, self.name, status_code=status.HTTP_200_OK)

    def test_cafe_update_not_manager(self):
        self.client.force_authenticate(self.user2)
        response = self.client.patch(
            reverse("cafe-detail", args=[self.cafe.id]), {"name": self.name}
        )
        self.assertContains(
            response, "permission_denied", status_code=status.HTTP_403_FORBIDDEN
        )

    def test_cafe_update_duplicate_location(self):
        data = unmanaged_cafe_data.copy()
        location = data["location"]
        data.update({"location": parse_coordinate(location)})
        Cafe.objects.create(**data)
        response = self.client.patch(
            reverse("cafe-detail", args=[self.cafe.id]),
            {"location": location},
        )
        self.assertContains(response, "unique", status_code=status.HTTP_400_BAD_REQUEST)
