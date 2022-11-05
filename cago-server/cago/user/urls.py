from django.urls import path

from . import views

app_name = "user"

urlpatterns = [
    path("login/", views.LoginView.as_view(), name="login"),
    path("logout/", views.LogoutView.as_view(), name="logout"),
    path("signup/", views.SignUpView.as_view(), name="signup"),
    path("refresh/", views.CookieTokenRefreshView.as_view(), name="refresh"),
    path("verify/", views.CookieTokenVerifyView.as_view(), name="verify"),
]
