from django.contrib.auth.hashers import check_password
from django.test import TestCase

from ..models import User


class UserModelTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user_email = "test1@test.com"
        cls.user_password = "qwer1234"

    def test_create_user_success(self):
        user = User.objects.create_user(
            email=self.user_email, password=self.user_password
        )
        self.assertEqual(user.email, self.user_email)
        self.assertTrue(check_password(self.user_password, user.password))

    def test_create_user_no_email(self):
        with self.assertRaises(ValueError) as cm:
            User.objects.create_user(email=None, password=self.user_password)
        self.assertIn("email", str(cm.exception))

    def test_create_superuser_success(self):
        user = User.objects.create_superuser(
            email=self.user_email, password=self.user_password
        )
        self.assertEqual(user.email, self.user_email)
        self.assertTrue(check_password(self.user_password, user.password))
        self.assertTrue(user.is_staff)
        self.assertTrue(user.is_superuser)

    def test_create_superuser_invalid_fields(self):
        with self.assertRaises(ValueError) as cm:
            User.objects.create_superuser(
                email=self.user_email, password=self.user_password, is_staff=False
            )
        self.assertIn("is_staff", str(cm.exception))

        with self.assertRaises(ValueError) as cm:
            User.objects.create_superuser(
                email=self.user_email, password=self.user_password, is_superuser=False
            )
        self.assertIn("is_superuser", str(cm.exception))

    def test_clean(self):
        email_denorm = self.user_email[:-3] + self.user_email[-3:].upper()
        user = User.objects.create_user(email=email_denorm, password=self.user_password)
        user.clean()
        self.assertEqual(user.email, self.user_email)
