from rest_framework import routers

from cago.cafe.views import CustomerProfileViewSet

cafe_router = routers.SimpleRouter()
cafe_router.register(r"customer-profiles", CustomerProfileViewSet, "customer-profile")
# Keep adding viewsets here...

urlpatterns = cafe_router.urls
