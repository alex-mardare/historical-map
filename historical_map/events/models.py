from django.core.validators import MaxValueValidator, MinValueValidator, RegexValidator
from django.db import models

class EventCategory(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["name"]
        verbose_name_plural = "event categories"


class HistoricalState(models.Model):
    name = models.CharField(max_length=255)
    dateFrom = models.CharField(max_length=15, blank=True, 
        validators=[RegexValidator('^-?\d{1,4}$|^-?\d{1,4}-\d{2}$|^-?\d{1,4}-\d{2}-\d{2}$', 
            message="The date must have one of the following formats: YYYY, YYYY-MM, YYYY-MM-DD. Negative years are allowed.")])
    dateTo = models.CharField(max_length=15, blank=True,
        validators=[RegexValidator('^-?\d{1,4}$|^-?\d{1,4}-\d{2}$|^-?\d{1,4}-\d{2}-\d{2}$', 
            message="The date must have one of the following formats: YYYY, YYYY-MM, YYYY-MM-DD. Negative years are allowed.")])

    def __str__(self):
        displayName = self.name
        if self.dateTo:
            displayName += " (" + self.dateFrom.replace('-', '/') + " - " + self.dateTo.replace('-', '/') + ")"
        return displayName

    class Meta:
        ordering = ["name"]


class PresentCountry(models.Model):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=5)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["name"]
        verbose_name_plural = "present countries"


class HistoricalEvent(models.Model):
    name = models.CharField(max_length=255)
    date = models.DateField()
    time = models.TimeField(null=True, blank=True)
    description = models.CharField(max_length=1000)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True, validators=[MinValueValidator(-180), MaxValueValidator(180)])
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True, validators=[MinValueValidator(-180), MaxValueValidator(180)])
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    eventCategoryId = models.ForeignKey(EventCategory, on_delete=models.CASCADE)
    presentCountryId = models.ForeignKey(PresentCountry, on_delete=models.CASCADE)
    approximateRealLocation = models.BooleanField(default=False, editable=False)
    historicalStateId = models.ForeignKey(HistoricalState, on_delete=models.CASCADE)

    def __str__(self):
        return self.name