from django.db import IntegrityError
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.views import Response
from rest_framework.viewsets import ModelViewSet

from cago.cafe.permissions import BaseEditOwnerOnly
from cago.cafe.serializers import CustomerProfileSerializer

from .models import CustomerProfile


class CustomerProfileViewset(ModelViewSet):
    class EditOwnerOnly(BaseEditOwnerOnly):
        owner_field = "user"

    queryset = CustomerProfile.objects.all()
    serializer_class = CustomerProfileSerializer
    permission_classes = [EditOwnerOnly, IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        try:
            serializer.save(user=self.request.user)
        except IntegrityError:
            raise ValidationError("customer profile already exists", "unique")

    @action(detail=False, permission_classes=[IsAuthenticated])
    def me(self, request):
        customer_profile = get_object_or_404(CustomerProfile, user=request.user)
        serializer = self.get_serializer(customer_profile)

        return Response(serializer.data)
