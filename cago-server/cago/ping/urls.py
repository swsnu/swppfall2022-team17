from django.urls import path

from . import views

urlpatterns = [
    path("", views.PingAPIView.as_view(), name="ping"),
]
