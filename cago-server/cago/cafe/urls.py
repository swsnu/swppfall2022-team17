from rest_framework import routers

from cago.cafe.views import CustomerProfileViewset

cafe_router = routers.SimpleRouter()
cafe_router.register(r"customer-profiles", CustomerProfileViewset, "customer-profile")
# Keep adding viewsets here...

urlpatterns = cafe_router.urls
