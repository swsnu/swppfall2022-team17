from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from ..models import CafeReview, ManagedCafe
from ..utils import parse_coordinate

User = get_user_model()

user_data = {"email": "test1@test.com", "password": "qwer1234"}
owner_data = {"email": "test2@test.com", "password": "qwer1234"}
cafe_data = {
    "name": "이상한 카페",
    "phone_number": "+821012345678",
    "location": parse_coordinate("127.000304 37.475322"),
    "address": "서울특별시 서초구 방배로 21",
    "registration_number": 1234567890,
    "owner": None,
}
review_data = {
    "cafe": None,
    "content": "review 1",
    "rating": 4,
    "strength": "Taste",
}


class ReviewCreateAPITestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(**user_data)
        cls.owner = User.objects.create_user(**owner_data)
        cls.cafe_data = cafe_data | {"owner": cls.owner}
        cls.cafe = ManagedCafe.objects.create(**cls.cafe_data)
        cls.review_data = review_data | {"cafe": cls.cafe.id}

    def setUp(self):
        self.client.force_authenticate(self.user)

    def test_review_create_success(self):
        response = self.client.post(reverse("review-list"), self.review_data)
        self.assertContains(
            response, self.review_data["content"], status_code=status.HTTP_201_CREATED
        )

    def test_review_by_owner(self):
        self.client.force_authenticate(self.owner)
        response = self.client.post(reverse("review-list"), self.review_data)
        self.assertContains(
            response, "permission", status_code=status.HTTP_403_FORBIDDEN
        )

    def test_review_unique(self):
        CafeReview.objects.create(
            **(review_data | {"cafe": self.cafe, "author": self.user})
        )
        response = self.client.post(reverse("review-list"), self.review_data)
        self.assertContains(response, "unique", status_code=status.HTTP_400_BAD_REQUEST)
