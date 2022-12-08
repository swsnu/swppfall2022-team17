from django.contrib.auth import get_user_model
from django.contrib.gis.measure import D
from django.db import IntegrityError
from django.shortcuts import get_object_or_404
from django_filters import rest_framework as filters
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.mixins import (
    CreateModelMixin,
    DestroyModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
)
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.views import APIView, Response
from rest_framework.viewsets import GenericViewSet, ModelViewSet

from cago.cafe.permissions import BaseEditOwnerOnly
from cago.cafe.serializers import (
    CafeArticleSerializer,
    CafeCommentSerializer,
    CafeImageSerialzier,
    CafeMenuSerializer,
    CafeReadOnlySerializer,
    CafeReviewSerializer,
    CustomerProfileSerializer,
    ManagedCafeSerializer,
)
from cago.cafe.utils import parse_coordinate

from .models import (
    BoardArticle,
    BoardComment,
    Cafe,
    CafeImage,
    CafeMenu,
    CafeReview,
    CustomerProfile,
    ManagedCafe,
)

User = get_user_model()


class CustomerProfileViewSet(CreateModelMixin, UpdateModelMixin, GenericViewSet):
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


class CafeViewSet(
    CreateModelMixin,
    RetrieveModelMixin,
    ListModelMixin,
    UpdateModelMixin,
    GenericViewSet,
):
    class EditOwnerOnly(BaseEditOwnerOnly):
        owner_field = "owner"
        owners_field = "managers"

    class CafeFilter(filters.FilterSet):
        location = filters.CharFilter(
            field_name="location",
            method="get_cafes_near",
            label="Location to search the cafes within 3km",
        )
        manager = filters.ModelChoiceFilter(
            field_name="managedcafe__managers",
            queryset=User.objects.all(),
            label="Manager",
        )

        def get_cafes_near(self, queryset, field_name, value):
            try:
                point = parse_coordinate(value)
                return queryset.filter(location__distance_lte=(point, D(km=3)))
            except ValueError:
                return queryset.none()

        class Meta:
            model = Cafe
            fields = ["location", "manager"]

    permission_classes = [
        EditOwnerOnly,
        IsAuthenticatedOrReadOnly,
    ]
    filterset_class = CafeFilter
    ordering_fields = ["id"]
    ordering = ["id"]

    def get_queryset(self):
        if self.request.method in ["GET"]:
            return Cafe.objects.all()
        else:
            return ManagedCafe.objects.all()

    def get_serializer_class(self):
        if self.request.method in ["GET"]:
            return CafeReadOnlySerializer
        else:
            return ManagedCafeSerializer

    def perform_create(self, serializer):
        # Set owner to the requesting user.
        # Also override the duplicated unmanaged cafe, if exists.
        instance = serializer.save(
            owner=self.request.user, cafe_ptr=serializer.context.get("cafe_dup")
        )
        # Initially add the owner to the managers.
        instance.managers.add(self.request.user)


class CafeMenuViewSet(
    CreateModelMixin,
    ListModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
    GenericViewSet,
):
    class EditOwnerOnly(BaseEditOwnerOnly):
        owner_field = "owner"
        owners_field = "managers"

        def has_object_permission(self, request, view, obj):
            # obj is cafe, not the menu
            # On creation, permissions are checked in validation stage.
            obj = obj.cafe
            return super().has_object_permission(request, view, obj)

    queryset = CafeMenu.objects.all()
    serializer_class = CafeMenuSerializer
    permission_classes = [EditOwnerOnly, IsAuthenticatedOrReadOnly]
    filterset_fields = ["cafe_id"]
    ordering_fields = ["id", "is_main", "category"]
    ordering = ["category", "-is_main", "id"]


class CafeLikeAPIView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def post(self, request, **kwargs):
        cafe_id = request.data.get("cafe", None) or request.data.get("cafe_id", None)
        if cafe_id is None:
            raise ValidationError("should provide cafe id", "invalid")
        cafe = get_object_or_404(ManagedCafe, id=cafe_id)
        cafe.liked_users.add(request.user)
        return Response(status=201)

    def delete(self, request, **kwargs):
        cafe_id = request.data.get("cafe", None) or request.data.get("cafe_id", None)
        if cafe_id is None:
            raise ValidationError("should provide cafe id", "invalid")
        cafe = get_object_or_404(ManagedCafe, id=cafe_id)
        cafe.liked_users.remove(request.user)
        return Response(status=204)


class CafeImageViewSet(
    CreateModelMixin,
    ListModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
    GenericViewSet,
):
    class EditOwnerOnly(BaseEditOwnerOnly):
        owner_field = "owner"
        owners_field = "managers"

        def has_object_permission(self, request, view, obj):
            # obj is cafe, not the image.
            # On creation, permissions are checked in validation stage.
            obj = obj.cafe
            return super().has_object_permission(request, view, obj)

    queryset = CafeImage.objects.all()
    serializer_class = CafeImageSerialzier
    permission_classess = [EditOwnerOnly, IsAuthenticatedOrReadOnly]
    filterset_fields = ["cafe_id"]
    ordering_fields = ["id", "is_main"]
    ordering = ["-is_main", "id"]


class CafeArticleViewSet(ModelViewSet):
    class EditOwnerOnly(BaseEditOwnerOnly):
        owner_field = "owner"
        owners_field = "managers"

        def has_object_permission(self, request, view, obj):
            # obj is cafe, not the article.
            # On creation, permissions are checked in validation stage.
            obj = obj.cafe
            return super().has_object_permission(request, view, obj)

    queryset = BoardArticle.objects.all()
    serializer_class = CafeArticleSerializer
    permission_classes = [EditOwnerOnly, IsAuthenticatedOrReadOnly]
    filterset_fields = ["cafe_id"]
    ordering_fields = ["created_at", "updated_at"]
    ordering = ["-created_at"]


class CafeCommentViewSet(
    CreateModelMixin,
    ListModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
    GenericViewSet,
):
    class EditOwnerOnly(BaseEditOwnerOnly):
        owner_field = "author"

    queryset = BoardComment.objects.all()
    serializer_class = CafeCommentSerializer
    permission_classes = [EditOwnerOnly, IsAuthenticatedOrReadOnly]
    filterset_fields = ["article_id"]
    ordering_fields = ["id", "created_at", "updated_at"]
    ordering = ["created_at"]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class CafeReviewViewSet(
    CreateModelMixin,
    ListModelMixin,
    DestroyModelMixin,
    GenericViewSet,
):
    class EditOwnerOnly(BaseEditOwnerOnly):
        owner_field = "author"

    queryset = CafeReview.objects.all()
    serializer_class = CafeReviewSerializer
    permission_classes = [EditOwnerOnly, IsAuthenticatedOrReadOnly]
    filterset_fields = ["cafe_id"]
    ordering_fields = ["id", "created_at"]
    ordering = ["-created_at"]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
