from django.conf import settings
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

from cago.user.serializers import SignUpSerializer


class LoginView(TokenObtainPairView):
    def finalize_response(self, request, response, *args, **kwargs):
        if response.data.get("refresh") is not None:
            refresh = RefreshToken(response.data.get("refresh"))
            max_age = refresh.get("exp") - refresh.get("iat")
            response.set_cookie(
                "refresh_token",
                str(refresh),
                max_age=max_age,
                httponly=True,
                secure=settings.SECURE_COOKIE,
            )
            del response.data["refresh"]

        return super().finalize_response(request, response, *args, **kwargs)


class SignUpView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = SignUpSerializer

    def get_queryset(self):
        return None


class CookieTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        request.data["refresh"] = request.COOKIES.get("refresh_token")

        return super().post(request, *args, **kwargs)


class CookieTokenVerifyView(TokenVerifyView):
    def post(self, request, *args, **kwargs):
        if request.data.get("token") is None:
            request.data["token"] = request.COOKIES.get("refresh_token")

        return super().post(request, *args, **kwargs)
