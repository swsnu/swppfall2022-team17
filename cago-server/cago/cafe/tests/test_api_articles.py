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


class ArticleCreateAPITestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(**user_data)
        cls.cafe = ManagedCafe.objects.create(**(cafe_data | {"owner": cls.user}))
        cls.article_data = article_data | {"cafe": cls.cafe.id}

    def setUp(self):
        self.client.force_authenticate(self.user)

    def test_article_create_success(self):
        response = self.client.post(reverse("article-list"), self.article_data)
        self.assertContains(
            response, self.article_data["content"], status_code=status.HTTP_201_CREATED
        )

    def test_article_create_not_manager(self):
        self.client.force_authenticate(
            User.objects.create(**(user_data | {"email": "test2@test.com"}))
        )
        response = self.client.post(reverse("article-list"), self.article_data)
        self.assertContains(
            response, "permission", status_code=status.HTTP_403_FORBIDDEN
        )


class ArticleUpdateAPITestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(**user_data)
        cls.cafe = ManagedCafe.objects.create(**(cafe_data | {"owner": cls.user}))
        cls.article = BoardArticle.objects.create(**(article_data | {"cafe": cls.cafe}))

    def setUp(self):
        self.client.force_authenticate(self.user)

    def test_article_update_success(self):
        response = self.client.patch(
            reverse("article-detail", args=[self.article.id]),
            {"content": "new content"},
        )
        self.assertContains(response, "new content")
