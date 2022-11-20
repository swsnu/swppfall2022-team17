from rest_framework import routers

from cago.cafe.views import CafeViewSet, CustomerProfileViewSet

cafe_router = routers.SimpleRouter()
cafe_router.register(r"customer-profiles", CustomerProfileViewSet, "customer-profile")
cafe_router.register(r"cafes", CafeViewSet, "cafe")

urlpatterns = cafe_router.urls
