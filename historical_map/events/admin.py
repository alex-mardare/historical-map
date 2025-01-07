from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *

#region USER PROFILES
class ProfileInline(admin.StackedInline):
    can_delete = False
    model = UserProfile
    verbose_name_plural = 'User Profiles'

class UserAdmin(UserAdmin):
    inlines = (ProfileInline, )
#endregion

#region HISTORICAL STATES
class HistoricalStateCountryPeriodInline(admin.StackedInline):
    extra = 1
    model = HistoricalStatePresentCountryPeriod

@admin.register(HistoricalState)
class HistoricalStateAdmin(admin.ModelAdmin):
    inlines = [HistoricalStateCountryPeriodInline]
    list_display = ['name', 'start_date', 'end_date']
    search_fields = ['name']
#endregion

# Register your models here.
admin.site.unregister(User)
admin.site.register(User, UserAdmin)

admin.site.register(EventCategory)
admin.site.register(EventFigureRole)
admin.site.register(PresentCountry)
admin.site.register(HistoricalEvent)
admin.site.register(HistoricalFigure)
admin.site.register(HistoricalFigureRole)