from django.contrib.auth import get_user_model
from django.db import models


class Cafe(models.Model):
    name = models.CharField(max_length=128)
    is_opened = models.BooleanField(
        "opened",
        default=True,
    )
    crowdedness = models.IntegerField()
    day_off = models.CharField(max_length=64)
    bussiness_hour = models.CharField(max_length=64)
    representative_name = models.CharField(max_length=16)
    registration_number = models.CharField()
    location = models.CharField(max_length=64)
    address = models.CharField(max_length=64)
    phone_number = models.CharField(max_length=16)
    managers = models.ManyToManyField(
        get_user_model(),
        through="ManagerProfile",
        through_fields=("group", "person"),
    )


class ManagerProfile(models.Model):
    user = models.ForeignKey(
        get_user_model(), related_name="manager_profiles", on_delete=models.CASCADE
    )
    cafe = models.ForeignKey(Cafe, related_name="manager_profiles", on_delete=models.CASCADE)
    display_name = models.CharField(max_length=64)
    avatar = models.URLField(max_length=200)

    class Meta:
        verbose_name = "manager_profile"
        verbose_name_plural = "manager_profiles"
