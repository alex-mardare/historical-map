from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(EventCategory)
admin.site.register(PresentCountry)
admin.site.register(HistoricalEvent)
admin.site.register(HistoricalFigure)
admin.site.register(HistoricalState)