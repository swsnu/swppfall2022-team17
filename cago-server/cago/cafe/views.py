from django.contrib.auth import get_user_model
from django.contrib.gis.measure import D
from django.db import IntegrityError, models
from django.db.models import Q
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
from rest_framework_extensions.cache.decorators import cache_response
from rest_framework_extensions.cache.mixins import CacheResponseMixin

from cago.cafe.cache import (
    CAFE_ARTICLE_PREFIX,
    CAFE_COMMENT_PREFIX,
    CAFE_IMAGE_PREFIX,
    CAFE_MENU_PREFIX,
    CAFE_PREFIX,
    CAFE_REVIEW_PREFIX,
    PROFILE_PREFIX,
    PrefixedKeyConstructor,
    UserKeyConstructor,
)
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


class CustomerProfileViewSet(
    CacheResponseMixin, CreateModelMixin, UpdateModelMixin, GenericViewSet
):
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
    @cache_response(key_func=UserKeyConstructor(PROFILE_PREFIX))
    def me(self, request):
        customer_profile = get_object_or_404(CustomerProfile, user=request.user)
        serializer = self.get_serializer(customer_profile)

        return Response(serializer.data)


class CafeViewSet(
    CacheResponseMixin,
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
    object_cache_key_func = UserKeyConstructor(CAFE_PREFIX)
    list_cache_key_func = UserKeyConstructor(CAFE_PREFIX)

    def get_queryset(self):
        if self.request.method in ["GET"]:
            # Managed cafe queryset with the annotated fields.
            managecafe_qs = ManagedCafe.objects.annotate(
                is_liked=models.Exists(
                    ManagedCafe.objects.filter(
                        pk=models.OuterRef("pk"),
                        liked_users=self.request.user.id,
                    )
                ),
                num_likes=models.Count("liked_users", distinct=True),
                num_reviews=models.Count("reviews", distinct=True),
                num_taste=models.Count(
                    "reviews", filter=models.Q(reviews__strength="Taste"), distinct=True
                ),
                num_service=models.Count(
                    "reviews",
                    filter=models.Q(reviews__strength="Service"),
                    distinct=True,
                ),
                num_mood=models.Count(
                    "reviews", filter=models.Q(reviews__strength="Mood"), distinct=True
                ),
                average_rating=models.Avg("reviews__rating"),
            ).prefetch_related("managers")

            return Cafe.objects.all().prefetch_related(
                models.Prefetch("managedcafe", managecafe_qs)
            )
        # No need to show annotated fields on create or update.
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
    CacheResponseMixin,
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
    object_cache_key_func = PrefixedKeyConstructor(CAFE_MENU_PREFIX)
    list_cache_key_func = PrefixedKeyConstructor(CAFE_MENU_PREFIX)


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
    CacheResponseMixin,
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
    object_cache_key_func = PrefixedKeyConstructor(CAFE_IMAGE_PREFIX)
    list_cache_key_func = PrefixedKeyConstructor(CAFE_IMAGE_PREFIX)


class CafeArticleViewSet(CacheResponseMixin, ModelViewSet):
    class EditOwnerOnly(BaseEditOwnerOnly):
        owner_field = "owner"
        owners_field = "managers"

        def has_object_permission(self, request, view, obj):
            # obj is cafe, not the article.
            # On creation, permissions are checked in validation stage.
            obj = obj.cafe
            return super().has_object_permission(request, view, obj)

    serializer_class = CafeArticleSerializer
    permission_classes = [EditOwnerOnly, IsAuthenticatedOrReadOnly]
    filterset_fields = ["cafe_id"]
    ordering_fields = ["created_at", "updated_at"]
    ordering = ["-created_at"]
    object_cache_key_func = PrefixedKeyConstructor(CAFE_ARTICLE_PREFIX)
    list_cache_key_func = PrefixedKeyConstructor(CAFE_ARTICLE_PREFIX)

    def get_queryset(self):
        comments_qs = (
            BoardComment.objects.all()
            .select_related("author__customer_profile", "article__cafe")
            .annotate(
                is_customer=models.Exists(
                    BoardComment.objects.filter(
                        ~Q(article__cafe__managers=models.OuterRef("author"))
                        & ~Q(article__cafe__owner=models.OuterRef("author")),
                        pk=models.OuterRef("pk"),
                    )
                )
            )
        )

        return BoardArticle.objects.all().prefetch_related(
            models.Prefetch("comments", comments_qs)
        )


class CafeCommentViewSet(
    CacheResponseMixin,
    CreateModelMixin,
    ListModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
    GenericViewSet,
):
    class EditOwnerOnly(BaseEditOwnerOnly):
        owner_field = "author"

    queryset = (
        BoardComment.objects.all()
        .select_related("author__customer_profile", "article__cafe")
        .annotate(
            is_customer=models.Exists(
                BoardComment.objects.filter(
                    ~Q(article__cafe__managers=models.OuterRef("author"))
                    & ~Q(article__cafe__owner=models.OuterRef("author")),
                    pk=models.OuterRef("pk"),
                )
            )
        )
    )
    serializer_class = CafeCommentSerializer
    permission_classes = [EditOwnerOnly, IsAuthenticatedOrReadOnly]
    filterset_fields = ["article_id"]
    ordering_fields = ["id", "created_at", "updated_at"]
    ordering = ["created_at"]
    object_cache_key_func = PrefixedKeyConstructor(CAFE_COMMENT_PREFIX)
    list_cache_key_func = PrefixedKeyConstructor(CAFE_COMMENT_PREFIX)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class CafeReviewViewSet(
    CacheResponseMixin,
    CreateModelMixin,
    ListModelMixin,
    DestroyModelMixin,
    GenericViewSet,
):
    class EditOwnerOnly(BaseEditOwnerOnly):
        owner_field = "author"

    queryset = CafeReview.objects.all().select_related("author__customer_profile")
    serializer_class = CafeReviewSerializer
    permission_classes = [EditOwnerOnly, IsAuthenticatedOrReadOnly]
    filterset_fields = ["cafe_id"]
    ordering_fields = ["id", "created_at"]
    ordering = ["-created_at"]
    object_cache_key_func = PrefixedKeyConstructor(CAFE_REVIEW_PREFIX)
    list_cache_key_func = PrefixedKeyConstructor(CAFE_REVIEW_PREFIX)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
