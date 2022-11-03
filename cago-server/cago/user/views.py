from rest_framework import generics
from rest_framework.permissions import AllowAny

from cago.user.serializers import SignUpSerializer


class SignUpView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = SignUpSerializer

    def get_queryset(self):
        return None
