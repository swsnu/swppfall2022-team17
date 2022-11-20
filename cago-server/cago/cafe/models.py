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

        return False


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

    class Meta:
        verbose_name = "managed_cafe"
        verbose_name_plural = "managed_cafes"


class CafeImage(models.Model):
    cafe = models.ForeignKey(Cafe, related_name="images", on_delete=models.CASCADE)
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
    cafe = models.ForeignKey(Cafe, related_name="menus", on_delete=models.CASCADE)
    name = models.CharField(max_length=64)
    price = models.PositiveIntegerField()
    image = models.URLField(max_length=256, default=default_menu_image)
