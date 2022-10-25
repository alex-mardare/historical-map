from django.db import models

# Create your models here.
class HistoricalEvent(models.Model):
    name = models.CharField(max_length=255)
    date = models.DateField()
    time = models.TimeField(null=True, blank=True)
    description = models.CharField(max_length=1000)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name