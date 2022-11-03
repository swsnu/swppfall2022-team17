from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class SignUpSerializer(serializers.ModelSerializer):
    password_confirm = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["id", "email", "password", "password_confirm"]
        extra_kwargs = {"password": {"write_only": True}}

    def validate_password_confirm(self, password_confirm):
        password = self.get_initial().get("password")
        if password != password_confirm:
            raise serializers.ValidationError("Password does not match")

        return password_confirm

    def create(self, validated_data):
        validated_data.pop("password_confirm", None)
        user = User.objects.create_user(**validated_data)

        return user
