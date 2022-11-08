from rest_framework import serializers

from .models import CustomerProfile


class CustomerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerProfile
        fields = ["id", "user", "display_name", "avatar"]
        read_only_fields = ["user"]
