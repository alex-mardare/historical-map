from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator, RegexValidator, ValidationError
from django.db import models
from django.db.models import Q

from .middleware import get_current_user
from .validators import dateFormatter, regexDateValidator


class AuditableModel(models.Model):
    createdAt = models.DateTimeField(auto_now_add=True)
    createdBy = models.ForeignKey(User, related_name='%(class)s_created_by', on_delete=models.PROTECT)
    updatedAt = models.DateTimeField(auto_now=True)
    updatedBy = models.ForeignKey(User, related_name='%(class)s_updated_by', on_delete=models.PROTECT)

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        user = get_current_user()
        if user and user.is_active:
            if not self.pk:
                self.createdBy = user
            self.updatedBy = user
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
    dateFrom = models.CharField(blank=True, max_length=15, null=True, validators=[RegexValidator(regexDateValidator()[0], message=regexDateValidator()[1])])
    dateTo = models.CharField(blank=True, max_length=15, null=True, validators=[RegexValidator(regexDateValidator()[0], message=regexDateValidator()[1])])
    flagUrl = models.CharField(blank=True, max_length=255, null=True)
    presentCountries = models.ManyToManyField('events.PresentCountry', related_name='presentCountries', through='events.HistoricalStatePresentCountryPeriod')

    def __str__(self):
        displayName = self.name
        if self.dateTo:
            displayName += " (" + dateFormatter(self.dateFrom) + " -> " + dateFormatter(self.dateTo) + ')'
        return displayName
    
    def get_present_countries(self):
        return self.presentCountries.all()

    class Meta:
        ordering = ["name"]


class PresentCountry(AuditableModel):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=5)
    flagUrl = models.CharField(blank=True, max_length=255, null=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["name"]
        verbose_name_plural = "present countries"

class HistoricalStatePresentCountryPeriod(AuditableModel):
    historicalState = models.ForeignKey(HistoricalState, on_delete=models.CASCADE)
    presentCountry = models.ForeignKey(PresentCountry, on_delete=models.CASCADE)
    dateFrom = models.CharField(blank=True, max_length=15, null=True, validators=[RegexValidator(regexDateValidator()[0], message=regexDateValidator()[1])])
    dateTo = models.CharField(blank=True, max_length=15, null=True, validators=[RegexValidator(regexDateValidator()[0], message=regexDateValidator()[1])])

    class Meta:
        constraints = [models.UniqueConstraint(fields=['historicalState', 'presentCountry', 'dateFrom', 'dateTo'], 
                                               name='unique_historical_state_present_country_period')]

    def save(self, *args, **kwargs):
        if not self.dateFrom and not self.dateTo:
            raise ValidationError('At least one fo the dates must be specified.')

        if self.dateFrom and self.dateTo and self.dateFrom > self.dateTo:
            raise ValidationError('Starting date must be before the end date.')

        relatedEntries = HistoricalStatePresentCountryPeriod.objects.filter(
            Q(historicalState=self.historicalState) & Q(presentCountry=self.presentCountry) & Q(dateFrom__lt=self.dateTo) & Q(dateTo__gt=self.dateFrom)
        )
        if self.pk:
            relatedEntries = relatedEntries.exclude(pk=self.pk)
        if relatedEntries.exists():
            raise ValidationError(f'There is an overlapping entry for {self.historicalState.name} and {self.presentCountry.name} ' + 
                                  f'for the period {self.dateFrom} - {self.dateTo}.')

        super().save(*args, **kwargs)


class HistoricalFigure(AuditableModel):
    name = models.CharField(max_length=255)
    birthHistoricalStateId = models.ForeignKey(HistoricalState, on_delete=models.PROTECT, related_name='birthHistoricalState')
    birthPresentCountryId = models.ForeignKey(PresentCountry, on_delete=models.PROTECT, related_name='birthPresentCountry')
    birthDate = models.CharField(max_length=15, validators=[RegexValidator(regexDateValidator()[0], message=regexDateValidator()[1])])
    deathDate = models.CharField(blank=True, max_length=15, null=True, validators=[RegexValidator(regexDateValidator()[0], message=regexDateValidator()[1])])
    deathHistoricalStateId = models.ForeignKey(HistoricalState, blank=True, null=True, on_delete=models.PROTECT, related_name='deathHistoricalState')
    deathPresentCountryId = models.ForeignKey(PresentCountry, blank=True, null=True, on_delete=models.PROTECT, related_name='deathPresentCountry')

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
    date = models.CharField(max_length=15, validators=[RegexValidator(regexDateValidator()[0], message=regexDateValidator()[1])])
    time = models.TimeField(null=True, blank=True)
    description = models.CharField(max_length=1000)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True, validators=[MinValueValidator(-180), MaxValueValidator(180)])
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True, validators=[MinValueValidator(-180), MaxValueValidator(180)])
    eventCategoryId = models.ForeignKey(EventCategory, on_delete=models.PROTECT)
    presentCountryId = models.ForeignKey(PresentCountry, on_delete=models.PROTECT)
    approximateRealLocation = models.BooleanField(default=False, editable=False)
    historicalStateId = models.ForeignKey(HistoricalState, on_delete=models.PROTECT)

    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ["name"]


class EventFigureRole(AuditableModel):
    historicalEventId = models.ForeignKey(HistoricalEvent, on_delete=models.CASCADE)
    historicalFigureId = models.ForeignKey(HistoricalFigure, on_delete=models.CASCADE)
    historicalFigureRoleId = models.ForeignKey(HistoricalFigureRole, on_delete=models.CASCADE)

    class Meta:
        constraints = [models.UniqueConstraint(fields=['historicalEventId', 'historicalFigureId', 'historicalFigureRoleId'], name='unique_event_figure_role')]