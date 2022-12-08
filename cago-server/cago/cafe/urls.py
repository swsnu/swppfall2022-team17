from django.urls import path
from rest_framework import routers

from cago.cafe.views import (
    CafeArticleViewSet,
    CafeCommentViewSet,
    CafeImageViewSet,
    CafeLikeAPIView,
    CafeMenuViewSet,
    CafeReviewViewSet,
    CafeViewSet,
    CustomerProfileViewSet,
)

cafe_router = routers.SimpleRouter()
cafe_router.register(r"customer-profiles", CustomerProfileViewSet, "customer-profile")
cafe_router.register(r"cafes", CafeViewSet, "cafe")
cafe_router.register(r"menus", CafeMenuViewSet, "menu")
cafe_router.register(r"board", CafeArticleViewSet, "article")
cafe_router.register(r"comments", CafeCommentViewSet, "comment")
cafe_router.register(r"cafe-images", CafeImageViewSet, "image")
cafe_router.register(r"reviews", CafeReviewViewSet, "review")

urlpatterns = cafe_router.urls + [path("like/", CafeLikeAPIView.as_view(), name="like")]
