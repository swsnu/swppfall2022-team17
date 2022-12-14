# Generated by Django 4.1.2 on 2022-11-20 12:45

import django.contrib.gis.db.models.fields
import django.contrib.gis.geos.point
from django.db import migrations, models
import phonenumber_field.modelfields


class Migration(migrations.Migration):

    dependencies = [
        ("cafe", "0002_rename_business_name_cafe_name_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="cafe",
            name="address",
            field=models.CharField(default="TMP_ADDRESS", max_length=256),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="cafe",
            name="location",
            field=django.contrib.gis.db.models.fields.PointField(
                default=django.contrib.gis.geos.point.Point(0, 0), srid=4326
            ),
        ),
        migrations.AddField(
            model_name="managedcafe",
            name="introduction",
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name="cafe",
            name="phone_number",
            field=phonenumber_field.modelfields.PhoneNumberField(
                blank=True, max_length=128, null=True, region=None
            ),
        ),
    ]
