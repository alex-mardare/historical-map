from django.contrib.auth.models import User
from django.core.validators import ValidationError
from django.db import models
from django.db.models import Q

from .fields import CoordinateField, CustomDateField
from .middleware import get_current_user
from .validators import dateFormatter


class AuditableModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, related_name='%(class)s_created_by', on_delete=models.PROTECT)
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey(User, related_name='%(class)s_updated_by', on_delete=models.PROTECT)

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        user = get_current_user()
        if user and user.is_active:
            if not self.pk:
                self.created_by = user
            self.updated_by = user
        super().save(*args, **kwargs)

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username

class EventCategory(AuditableModel):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["name"]
        verbose_name_plural = "event categories"


class HistoricalState(AuditableModel):
    name = models.CharField(max_length=255)
    start_date = CustomDateField(blank_value=True, null_value=True)
    end_date = CustomDateField(blank_value=True, null_value=True)
    flag_url = models.CharField(blank=True, max_length=255, null=True)
    present_countries = models.ManyToManyField('events.PresentCountry', related_name='present_countries', through='events.HistoricalStatePresentCountryPeriod')

    def __str__(self):
        displayName = self.name
        if self.end_date:
            displayName += " (" + dateFormatter(self.start_date) + " -> " + dateFormatter(self.end_date) + ')'
        return displayName
    
    def get_present_countries(self):
        return self.present_countries.all()

    class Meta:
        ordering = ["name"]


class PresentCountry(AuditableModel):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=5)
    flag_url = models.CharField(blank=True, max_length=255, null=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["name"]
        verbose_name_plural = "present countries"

class HistoricalStatePresentCountryPeriod(AuditableModel):
    historical_state = models.ForeignKey(HistoricalState, on_delete=models.CASCADE)
    present_country = models.ForeignKey(PresentCountry, on_delete=models.CASCADE)
    start_date = CustomDateField(blank_value=True, null_value=True)
    end_date = CustomDateField(blank_value=True, null_value=True)

    class Meta:
        constraints = [models.UniqueConstraint(fields=['historical_state', 'present_country', 'start_date', 'end_date'], 
                                               name='unique_historical_state_present_country_period')]

    def save(self, *args, **kwargs):
        if not self.start_date and not self.end_date:
            raise ValidationError('At least one fo the dates must be specified.')

        if self.start_date and self.end_date and self.start_date > self.end_date:
            raise ValidationError('Starting date must be before the end date.')

        relatedEntries = HistoricalStatePresentCountryPeriod.objects.filter(
            Q(historical_state=self.historical_state) & Q(present_country=self.present_country) & Q(start_date__lt=self.end_date) & Q(end_date__gt=self.start_date)
        )
        if self.pk:
            relatedEntries = relatedEntries.exclude(pk=self.pk)
        if relatedEntries.exists():
            raise ValidationError(f'There is an overlapping entry for {self.historical_state.name} and {self.present_country.name} ' + 
                                  f'for the period {self.start_date} - {self.end_date}.')

        super().save(*args, **kwargs)


class HistoricalFigure(AuditableModel):
    name = models.CharField(max_length=255)
    birth_historical_state = models.ForeignKey(HistoricalState, on_delete=models.PROTECT, related_name='birth_historical_state')
    birth_present_country = models.ForeignKey(PresentCountry, on_delete=models.PROTECT, related_name='birth_present_country')
    birth_date = CustomDateField()
    death_date = CustomDateField(blank_value=True, null_value=True)
    death_historical_state = models.ForeignKey(HistoricalState, blank=True, null=True, on_delete=models.PROTECT, related_name='death_historical_state')
    death_present_country = models.ForeignKey(PresentCountry, blank=True, null=True, on_delete=models.PROTECT, related_name='death_present_country')

    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ["name"]


class HistoricalFigureRole(AuditableModel):
    name = models.CharField(max_length=255)
    description = models.CharField(blank=True, max_length=1000, null=True)

    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ["name"]


class HistoricalEvent(AuditableModel):
    name = models.CharField(max_length=255)
    date = CustomDateField()
    time = models.TimeField(null=True, blank=True)
    description = models.CharField(max_length=1000)
    latitude = CoordinateField()
    longitude = CoordinateField()
    event_category = models.ForeignKey(EventCategory, on_delete=models.PROTECT)
    present_country = models.ForeignKey(PresentCountry, on_delete=models.PROTECT)
    approximate_location = models.BooleanField(default=False, editable=False)
    historical_state = models.ForeignKey(HistoricalState, on_delete=models.PROTECT)

    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ["name"]


class EventFigureRole(AuditableModel):
    historical_event = models.ForeignKey(HistoricalEvent, on_delete=models.CASCADE)
    historical_figure = models.ForeignKey(HistoricalFigure, on_delete=models.CASCADE)
    historical_figure_role = models.ForeignKey(HistoricalFigureRole, on_delete=models.CASCADE)

    class Meta:
        constraints = [models.UniqueConstraint(fields=['historical_event', 'historical_figure', 'historical_figure_role'], name='unique_event_figure_role')]