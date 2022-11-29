import re

from django.contrib.gis.measure import D
from rest_framework import serializers

from cago.cafe.utils import parse_coordinate

from .models import Cafe, CustomerProfile, ManagedCafe


class ReadOnlyModelSerializer(serializers.ModelSerializer):
    """
    ModelSerializer but all the fields are read-only.
    """

    def get_fields(self):
        fields = super().get_fields()
        for field in fields.values():
            field.read_only = True
        return fields


class CustomerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerProfile
        fields = ["id", "user", "display_name", "avatar"]
        read_only_fields = ["user"]


class ManagedCafeReadOnlySerializer(ReadOnlyModelSerializer):
    num_likes = serializers.IntegerField(read_only=True)
    num_reviews = serializers.IntegerField(read_only=True)
    num_taste = serializers.IntegerField(read_only=True)
    num_service = serializers.IntegerField(read_only=True)
    num_mood = serializers.IntegerField(read_only=True)

    class Meta:
        model = ManagedCafe
        fields = [  # Exclude liked_users
            "id",
            "name",
            "phone_number",
            "location",
            "address",
            "registration_number",
            "owner",
            "managers",
            "introduction",
            "avatar",
            "force_closed",
            "crowdedness",
            "num_likes",
            "num_reviews",
            "num_taste",
            "num_service",
            "num_mood",
        ]


class CafeReadOnlySerializer(ReadOnlyModelSerializer):
    """
    Read-only ModelSerializer for Cafe. If the cafe is managed, its ManagedCafe will be represented instead.
    """

    is_managed = serializers.ReadOnlyField()
    managed_cafe = ManagedCafeReadOnlySerializer(source="managedcafe")

    class Meta:
        model = Cafe
        fields = "__all__"

    def to_representation(self, instance):
        ret = super().to_representation(instance)

        # Move fields from managed_cafe to cafe representation.
        ret.update(ret.pop("managed_cafe", None) or {})

        # Convert location string to coordinate list.
        coord = re.findall(
            r"POINT\s*\((\-?\d*\.?\d+)\s*\,?\s*(\-?\d*\.?\d+)\)", ret["location"]
        )
        ret["location"] = coord[0]

        return ret


class ManagedCafeSerializer(serializers.ModelSerializer):
    num_likes = serializers.IntegerField(read_only=True)
    num_reviews = serializers.IntegerField(read_only=True)
    num_taste = serializers.IntegerField(read_only=True)
    num_service = serializers.IntegerField(read_only=True)
    num_mood = serializers.IntegerField(read_only=True)

    class Meta:
        model = ManagedCafe
        fields = [  # Exclude liked_users
            "id",
            "name",
            "phone_number",
            "location",
            "address",
            "registration_number",
            "owner",
            "managers",
            "introduction",
            "avatar",
            "force_closed",
            "crowdedness",
            "num_likes",
            "num_reviews",
            "num_taste",
            "num_service",
            "num_mood",
        ]
        read_only_fields = ["owner", "managers"]
        extra_kwargs = {"location": {"required": True}}

    def to_representation(self, instance):
        ret = super().to_representation(instance)

        # Convert location string to coordinate list.
        coord = re.findall(
            r"POINT\s*\((\-?\d*\.?\d+)\s*\,?\s*(\-?\d*\.?\d+)\)", ret["location"]
        )
        ret["location"] = coord[0]

        return ret

    def validate_location(self, value):
        try:
            point = parse_coordinate(value)
        except ValueError:
            raise serializers.ValidationError("invalid point format", "invalid")

        # Check distance contraint.
        cafe_dup = Cafe.objects.filter(location__distance_lte=(point, D(m=3))).first()
        if cafe_dup is not None:
            # Save the duplicated cafe for the later use.
            self.context["cafe_dup"] = cafe_dup

            # The duplicated cafe is managed on creation, or is a different cafe on update.
            if (self.instance is None and cafe_dup.is_managed) or (
                self.instance and self.instance.cafe_ptr != cafe_dup
            ):
                raise serializers.ValidationError(
                    "cafe in the same location exists", "unique"
                )

        return point
