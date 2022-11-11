from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from ..models import CustomerProfile

User = get_user_model()


class CustomerProfileCreateAPITestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(email="test1@test.com", password="qwer1234")
        cls.display_name = "test1"

    def setUp(self):
        self.client.force_authenticate(self.user)

    def test_customer_profile_create_success(self):
        response = self.client.post(
            reverse("customer-profile-list"), {"display_name": self.display_name}
        )
        self.assertContains(
            response, "display_name", status_code=status.HTTP_201_CREATED
        )

    def test_customer_profile_create_not_logged_in(self):
        self.client.logout()
        response = self.client.post(
            reverse("customer-profile-list"), {"display_name": self.display_name}
        )
        self.assertContains(
            response, "not_authenticated", status_code=status.HTTP_401_UNAUTHORIZED
        )

    def test_customer_profile_create_already_exists(self):
        CustomerProfile.objects.create(user=self.user, display_name=self.display_name)
        response = self.client.post(
            reverse("customer-profile-list"), {"display_name": self.display_name}
        )
        self.assertContains(response, "unique", status_code=status.HTTP_400_BAD_REQUEST)


class CustomerProfileMeAPITestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(email="test1@test.com", password="qwer1234")
        cls.display_name = "test1"
        cls.customer_profile = CustomerProfile.objects.create(
            user=cls.user, display_name=cls.display_name
        )

    def setUp(self):
        self.client.force_authenticate(self.user)

    def test_customer_profile_me_success(self):
        response = self.client.get(reverse("customer-profile-me"))
        self.assertContains(response, self.display_name)

    def test_customer_profile_me_not_logged_in(self):
        self.client.logout()
        response = self.client.get(reverse("customer-profile-me"))
        self.assertContains(
            response, "not_authenticated", status_code=status.HTTP_401_UNAUTHORIZED
        )

    def test_customer_profile_me_not_found(self):
        user2 = User.objects.create_user(email="test2@test.com", password="qwer1234")
        self.client.force_authenticate(user2)
        response = self.client.get(reverse("customer-profile-me"))
        self.assertContains(
            response, "not_found", status_code=status.HTTP_404_NOT_FOUND
        )
