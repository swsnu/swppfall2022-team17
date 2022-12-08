from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from ..models import BoardArticle, ManagedCafe
from ..utils import parse_coordinate

User = get_user_model()

user_data = {"email": "test1@test.com", "password": "qwer1234"}
cafe_data = {
    "name": "이상한 카페",
    "phone_number": "+821012345678",
    "location": parse_coordinate("127.000304 37.475322"),
    "address": "서울특별시 서초구 방배로 21",
    "registration_number": 1234567890,
    "owner": None,
}
article_data = {
    "cafe": None,
    "title": "article title",
    "content": "article content",
}
comment_data = {
    "article": None,
    "content": "comment content",
}


class ArticleCreateAPITestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(**user_data)
        cls.cafe = ManagedCafe.objects.create(**(cafe_data | {"owner": cls.user}))
        cls.article = BoardArticle.objects.create(**(article_data | {"cafe": cls.cafe}))
        cls.comment_data = comment_data | {"article": cls.article.id}

    def setUp(self):
        self.client.force_authenticate(self.user)

    def test_comment_create_success(self):
        response = self.client.post(reverse("comment-list"), self.comment_data)
        self.assertContains(
            response, self.comment_data["content"], status_code=status.HTTP_201_CREATED
        )

    def test_comment_no_profile_customer(self):
        self.client.force_authenticate(
            User.objects.create(**(user_data | {"email": "test2@test.com"}))
        )
        response = self.client.post(reverse("comment-list"), self.comment_data)
        self.assertContains(
            response, "invalid", status_code=status.HTTP_400_BAD_REQUEST
        )
