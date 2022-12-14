# Generated by Django 4.1.2 on 2022-11-08 22:18

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import phonenumber_field.modelfields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Cafe",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("business_name", models.CharField(max_length=128)),
                ("slug", models.SlugField(max_length=128, unique=True)),
                (
                    "phone_number",
                    phonenumber_field.modelfields.PhoneNumberField(
                        max_length=128, region=None
                    ),
                ),
            ],
            options={
                "verbose_name": "cafe",
                "verbose_name_plural": "cafes",
            },
        ),
        migrations.CreateModel(
            name="CustomerProfile",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("display_name", models.CharField(max_length=64)),
                (
                    "avatar",
                    models.URLField(
                        default="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678099-profile-filled-512.png",
                        max_length=256,
                    ),
                ),
                (
                    "user",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="customer_profile",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "verbose_name": "customer_profile",
                "verbose_name_plural": "customer_profiles",
            },
        ),
        migrations.CreateModel(
            name="CafeMenu",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=64)),
                ("price", models.PositiveIntegerField()),
                (
                    "image",
                    models.URLField(
                        default="https://cdn4.iconfinder.com/data/icons/sketchy-basic-icons/94/coffee-512.png",
                        max_length=256,
                    ),
                ),
                (
                    "cafe",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="menus",
                        to="cafe.cafe",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="CafeImage",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("url", models.URLField(max_length=256)),
                ("is_main", models.BooleanField(default=False)),
                (
                    "cafe",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="images",
                        to="cafe.cafe",
                    ),
                ),
            ],
            options={
                "verbose_name": "cafe_image",
                "verbose_name_plural": "cafe_images",
            },
        ),
        migrations.CreateModel(
            name="ManagedCafe",
            fields=[
                (
                    "cafe_ptr",
                    models.OneToOneField(
                        auto_created=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        parent_link=True,
                        primary_key=True,
                        serialize=False,
                        to="cafe.cafe",
                    ),
                ),
                (
                    "registration_number",
                    models.PositiveBigIntegerField(
                        validators=[
                            django.core.validators.MaxValueValidator(9999999999)
                        ]
                    ),
                ),
                ("display_name", models.CharField(max_length=64)),
                (
                    "avatar",
                    models.URLField(
                        default="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678099-profile-filled-512.png",
                        max_length=256,
                    ),
                ),
                ("force_closed", models.BooleanField(default=False)),
                (
                    "crowdedness",
                    models.IntegerField(
                        choices=[
                            (0, "Unknown"),
                            (1, "Low"),
                            (2, "Middle"),
                            (3, "High"),
                        ],
                        default=0,
                    ),
                ),
                (
                    "managers",
                    models.ManyToManyField(
                        related_name="managed_cafes", to=settings.AUTH_USER_MODEL
                    ),
                ),
                (
                    "representative",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="owned_cafes",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "verbose_name": "managed_cafe",
                "verbose_name_plural": "managed_cafes",
            },
            bases=("cafe.cafe",),
        ),
        migrations.AddConstraint(
            model_name="cafeimage",
            constraint=models.UniqueConstraint(
                condition=models.Q(("is_main", True)),
                fields=("cafe", "is_main"),
                name="unique_main_image",
            ),
        ),
    ]
