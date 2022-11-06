from django.db import models
from user.models import User

class Cafe(models.Model):
    pass
class ManagerProfile(models.Model):
    user = models.ForeignKey(User, related_name="manager_profile", on_delete=models.CASCADE)
    cafe = models.ForeignKey('Cafe', related_name="manager_profile", on_delete=models.CASCADE)
    display_name = models.CharField(max_length=10)
    image = models.ImageField(blank=True, upload_to="media/images/%Y/%m")
    
    class Meta:
        db_table = 'ManagerProfile'
