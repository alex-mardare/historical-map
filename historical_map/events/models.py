from django.core.validators import MaxValueValidator, MinValueValidator, RegexValidator
from django.db import models

from .validators import dateFormatter, regexDateValidator

class EventCategory(models.Model):
    name = models.CharField(max_length=255)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["name"]
        verbose_name_plural = "event categories"


class HistoricalState(models.Model):
    name = models.CharField(max_length=255)
    dateFrom = models.CharField(blank=True, max_length=15, null=True, validators=[RegexValidator(regexDateValidator()[0], message=regexDateValidator()[1])])
    dateTo = models.CharField(blank=True, max_length=15, null=True, validators=[RegexValidator(regexDateValidator()[0], message=regexDateValidator()[1])])
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    flagUrl = models.CharField(blank=True, max_length=255, null=True)
    presentCountries = models.ManyToManyField('events.PresentCountry', related_name='presentCountries')

    def __str__(self):
        displayName = self.name
        if self.dateTo:
            displayName += " (" + dateFormatter(self.dateFrom) + " -> " + dateFormatter(self.dateTo) + ')'
        return displayName
    
    def get_present_countries(self):
        return self.presentCountries.all()

    class Meta:
        ordering = ["name"]


class PresentCountry(models.Model):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=5)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    flagUrl = models.CharField(blank=True, max_length=255, null=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["name"]
        verbose_name_plural = "present countries"


class HistoricalFigure(models.Model):
    name = models.CharField(max_length=255)
    birthHistoricalStateId = models.ForeignKey(HistoricalState, on_delete=models.CASCADE, related_name='birthHistoricalState')
    birthPresentCountryId = models.ForeignKey(PresentCountry, on_delete=models.CASCADE, related_name='birthPresentCountry')
    birthDate = models.CharField(max_length=15, validators=[RegexValidator(regexDateValidator()[0], message=regexDateValidator()[1])])
    deathDate = models.CharField(blank=True, max_length=15, null=True, validators=[RegexValidator(regexDateValidator()[0], message=regexDateValidator()[1])])
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    deathHistoricalStateId = models.ForeignKey(HistoricalState, blank=True, null=True, on_delete=models.CASCADE, related_name='deathHistoricalState')
    deathPresentCountryId = models.ForeignKey(PresentCountry, blank=True, null=True, on_delete=models.CASCADE, related_name='deathPresentCountry')

    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ["name"]


class HistoricalFigureRole(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(blank=True, max_length=1000, null=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ["name"]


class HistoricalEvent(models.Model):
    name = models.CharField(max_length=255)
    date = models.CharField(max_length=15, validators=[RegexValidator(regexDateValidator()[0], message=regexDateValidator()[1])])
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


class EventFigureRole(models.Model):
    historicalEventId = models.ForeignKey(HistoricalEvent, on_delete=models.CASCADE)
    historicalFigureId = models.ForeignKey(HistoricalFigure, on_delete=models.CASCADE)
    historicalFigureRoleId = models.ForeignKey(HistoricalFigureRole, on_delete=models.CASCADE)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [models.UniqueConstraint(fields=['historicalEventId', 'historicalFigureId', 'historicalFigureRoleId'], name='unique_event_figure_role')]