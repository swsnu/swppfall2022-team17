from django.contrib.auth import get_user_model
from django.contrib.gis.db.models import PointField
from django.db import models


class CustomerProfile(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    display_name = models.CharField(max_length=64)
    avatar_customer = models.URLField(
        max_length=200,
        default="https://www.nicepng.com/png/detail/73-730154_open-default-profile-picture-png.png",
    )

    class Meta:
        verbose_name = "customer_profile"
        verbose_name_plural = "customer_profiles"


class Cafe(models.Model):
    display_name = models.CharField(max_length=128)
    business_name = models.CharField(max_length=128, unique=True)
    registration_number = models.CharField(max_length=16, unique=True)
    managers = models.ManyToManyField(get_user_model(), related_name="managed_cafes")
    representative = models.ForeignKey(
        get_user_model(), related_name="owned_cafes", blank=True, null=True
    )
    representative_name = models.CharField(max_length=64)
    is_opened = models.BooleanField(default=True)
    # crowdedness = models.ChoiceField(label="crowdedness", choices='crowdedness_choices', required=True)
    # crowdedness_choices = [(),(),(),(),()]
    location = PointField()
    address = models.CharField(max_length=128)
    phone_number = models.CharField(max_length=16)
    avatar_cafe = models.URLField(
        max_length=200,
        default="https://cdn.traveltimes.co.kr/news/photo/202109/113022_11185_1829.jpg",
    )
    slug = models.SlugField(unique=True)

    class Meta:
        verbose_name = "cafe"
        verbose_name_plural = "cafes"
        constraints = [
            models.UniqueConstraint(
                fields=["business_name", "registration_number"],
                name="unique registration number for each cafe",
            ),
        ]
