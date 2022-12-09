from django.contrib.auth import get_user_model
from django.contrib.gis.db.models import PointField
from django.contrib.gis.geos import Point
from django.core.validators import MaxValueValidator
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

User = get_user_model()

default_avatar = "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678099-profile-filled-512.png"
default_menu_image = (
    "https://cdn4.iconfinder.com/data/icons/sketchy-basic-icons/94/coffee-512.png"
)


class CustomerProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="customer_profile"
    )
    display_name = models.CharField(max_length=64)
    avatar = models.URLField(max_length=256, default=default_avatar)

    class Meta:
        verbose_name = "customer_profile"
        verbose_name_plural = "customer_profiles"


class Cafe(models.Model):
    name = models.CharField(max_length=128)  # auto-created name by parsing
    phone_number = PhoneNumberField(blank=True, null=True)
    location = PointField(blank=False, null=False, default=Point(0, 0))
    address = models.CharField(max_length=256)

    class Meta:
        verbose_name = "cafe"
        verbose_name_plural = "cafes"

    @property
    def is_managed(self):
        if hasattr(self, "managedcafe"):
            return True


class ManagedCafe(Cafe):
    class Crowdedness(models.IntegerChoices):
        UNKNOWN = 0
        LOW = 1
        MIDDLE = 2
        HIGH = 3

    registration_number = models.PositiveBigIntegerField(
        validators=[MaxValueValidator(9999999999)]
    )
    owner = models.ForeignKey(
        User, related_name="owned_cafes", on_delete=models.CASCADE
    )
    managers = models.ManyToManyField(User, related_name="managed_cafes")
    introduction = models.TextField(blank=True, null=True)
    avatar = models.URLField(max_length=256, default=default_avatar)
    force_closed = models.BooleanField(default=False)
    crowdedness = models.IntegerField(
        choices=Crowdedness.choices, default=Crowdedness.UNKNOWN
    )
    liked_users = models.ManyToManyField(User, related_name="liked_cafes")

    class Meta:
        verbose_name = "managed_cafe"
        verbose_name_plural = "managed_cafes"


class CafeImage(models.Model):
    cafe = models.ForeignKey(
        ManagedCafe, related_name="images", on_delete=models.CASCADE
    )
    url = models.URLField(max_length=256)
    is_main = models.BooleanField(default=False)

    class Meta:
        verbose_name = "cafe_image"
        verbose_name_plural = "cafe_images"

        constraints = [
            models.UniqueConstraint(
                fields=["cafe", "is_main"],
                condition=models.Q(is_main=True),
                name="unique_main_image",
            )
        ]


class CafeMenu(models.Model):
    cafe = models.ForeignKey(
        ManagedCafe, related_name="menus", on_delete=models.CASCADE
    )
    name = models.CharField(max_length=64)
    is_main = models.BooleanField(default=False)
    category = models.CharField(max_length=64)
    price = models.PositiveIntegerField()
    image = models.URLField(max_length=256, default=default_menu_image)

    class Meta:
        verbose_name = "cafe_menu"
        verbose_name_plural = "cafe_menu"


class CafeReview(models.Model):
    class Strength(models.TextChoices):
        TASTE = "Taste"
        SERVICE = "Service"
        MOOD = "Mood"

    class Rating(models.IntegerChoices):
        ONE = 1
        TWO = 2
        THREE = 3
        FOUR = 4
        FIVE = 5

    cafe = models.ForeignKey(
        ManagedCafe, related_name="reviews", on_delete=models.CASCADE
    )
    author = models.ForeignKey(User, related_name="reviews", on_delete=models.CASCADE)
    content = models.TextField()
    rating = models.PositiveSmallIntegerField(
        choices=Rating.choices, default=Rating.FIVE
    )
    strength = models.CharField(
        max_length=16, choices=Strength.choices, default=Strength.TASTE
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "cafe_review"
        verbose_name_plural = "cafe_reviews"

        constraints = [
            models.UniqueConstraint(
                fields=["cafe", "author"],
                name="unique_review_cafe_author",
            )
        ]


class BoardArticle(models.Model):
    cafe = models.ForeignKey(
        ManagedCafe, related_name="articles", on_delete=models.CASCADE
    )
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "cafe_board_article"
        verbose_name_plural = "cafe_board_articles"


class BoardComment(models.Model):
    article = models.ForeignKey(
        BoardArticle, related_name="comments", on_delete=models.CASCADE
    )
    author = models.ForeignKey(User, related_name="comments", on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "cafe_board_comment"
        verbose_name_plural = "cafe_board_comments"
