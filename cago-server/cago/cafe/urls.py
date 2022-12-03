from rest_framework import routers

from cago.cafe.views import CafeMenuViewSet, CafeViewSet, CustomerProfileViewSet

cafe_router = routers.SimpleRouter()
cafe_router.register(r"customer-profiles", CustomerProfileViewSet, "customer-profile")
cafe_router.register(r"cafes", CafeViewSet, "cafe")
cafe_router.register(r"menus", CafeMenuViewSet, "menu")

urlpatterns = cafe_router.urls
