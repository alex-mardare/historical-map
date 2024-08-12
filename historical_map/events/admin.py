from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *

class ProfileInline(admin.StackedInline):
    can_delete = False
    model = UserProfile
    verbose_name_plural = 'User Profiles'

class UserAdmin(UserAdmin):
    inlines = (ProfileInline, )

# Register your models here.
admin.site.unregister(User)
admin.site.register(User, UserAdmin)

admin.site.register(EventCategory)
admin.site.register(EventFigureRole)
admin.site.register(PresentCountry)
admin.site.register(HistoricalEvent)
admin.site.register(HistoricalFigure)
admin.site.register(HistoricalFigureRole)
admin.site.register(HistoricalState)