from django.urls import path

from . import views

app_name = "ping"

urlpatterns = [
    path("", views.PingAPIView.as_view(), name="index"),
]
