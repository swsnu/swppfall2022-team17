from django.contrib.auth import get_user_model
from django.http import SimpleCookie
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken

User = get_user_model()


class LoginAPITestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user_email = "test1@test.com"
        cls.user_password = "qwer1234"
        cls.user = User.objects.create_user(
            email=cls.user_email, password=cls.user_password
        )

    def test_login_success(self):
        response = self.client.post(
            reverse("auth:login"),
            {"email": self.user_email, "password": self.user_password},
        )
        self.assertContains(response, "access")

        data = response.json()
        access_token = AccessToken(data.get("access"))
        refresh_token = RefreshToken(response.cookies.get("refresh_token").value)
        self.assertEqual(access_token.get("user_id"), self.user.id)
        self.assertEqual(refresh_token.get("user_id"), self.user.id)

    def test_after_login(self):
        access_token = AccessToken.for_user(self.user)
        response = self.client.get(
            reverse("ping:index"), HTTP_AUTHORIZATION="Bearer " + str(access_token)
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_login_invalid_credentials(self):
        response = self.client.post(
            reverse("auth:login"),
            {"email": self.user_email, "password": self.user_password + "0"},
        )
        self.assertContains(
            response, "no_active_account", status_code=status.HTTP_401_UNAUTHORIZED
        )


class LogoutAPITestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(email="test1@test.com", password="qwer1234")
        cls.refresh_token = RefreshToken.for_user(cls.user)

    def test_logout_success(self):
        self.client.cookies = SimpleCookie({"refresh_token": str(self.refresh_token)})
        response = self.client.get(reverse("auth:logout"))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.cookies.get("refresh_token").value, "")


class SignUpAPITestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user_email = "test1@test.com"
        cls.user_password = "qwer1234"

    def test_signup_success(self):
        response = self.client.post(
            reverse("auth:signup"),
            {
                "email": self.user_email,
                "password": self.user_password,
                "password_confirm": self.user_password,
            },
        )
        self.assertContains(
            response, self.user_email, status_code=status.HTTP_201_CREATED
        )

    def test_signup_invalid_password_confirm(self):
        response = self.client.post(
            reverse("auth:signup"),
            {
                "email": self.user_email,
                "password": self.user_password,
                "password_confirm": self.user_password + "0",
            },
        )
        self.assertContains(
            response, "password_confirm", status_code=status.HTTP_400_BAD_REQUEST
        )

    def test_signup_duplciate_email(self):
        User.objects.create_user(email=self.user_email, password=self.user_password)
        response = self.client.post(
            reverse("auth:signup"),
            {
                "email": self.user_email,
                "password": self.user_password,
                "password_confirm": self.user_password,
            },
        )
        self.assertContains(response, "email", status_code=status.HTTP_400_BAD_REQUEST)


class RefreshAPITestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(email="test1@test.com", password="qwer1234")
        cls.refresh_token = RefreshToken.for_user(cls.user)

    def test_refresh_success(self):
        self.client.cookies = SimpleCookie({"refresh_token": str(self.refresh_token)})
        response = self.client.post(reverse("auth:refresh"), None)
        self.assertContains(response, "access")

    def test_refresh_invalid_token(self):
        self.client.cookies = SimpleCookie(
            {"refresh_token": str(self.refresh_token) + "0"}
        )
        response = self.client.post(reverse("auth:refresh"), None)
        self.assertContains(
            response, "token_not_valid", status_code=status.HTTP_401_UNAUTHORIZED
        )


class VerifyAPITestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(email="test1@test.com", password="qwer1234")
        cls.access_token = AccessToken.for_user(cls.user)
        cls.refresh_token = RefreshToken.for_user(cls.user)

    def test_verify_access_success(self):
        response = self.client.post(
            reverse("auth:verify"), {"token": str(self.access_token)}
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_verify_refresh_success(self):
        self.client.cookies = SimpleCookie({"refresh_token": str(self.refresh_token)})
        response = self.client.post(reverse("auth:verify"), None)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_verify_invalid_token(self):
        response = self.client.post(
            reverse("auth:verify"), {"token": str(self.access_token) + "0"}
        )
        self.assertContains(
            response, "token_not_valid", status_code=status.HTTP_401_UNAUTHORIZED
        )
