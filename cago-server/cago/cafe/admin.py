from django.contrib import admin

from .models import Cafe, CafeImage, CafeMenu, CafeReview, CustomerProfile, ManagedCafe

admin.site.register(Cafe)
admin.site.register(CafeImage)
admin.site.register(CafeMenu)
admin.site.register(CafeReview)
admin.site.register(CustomerProfile)
admin.site.register(ManagedCafe)
