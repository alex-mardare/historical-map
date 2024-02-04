from django.db import IntegrityError
from rest_framework import serializers

from .models import EventCategory, HistoricalEvent, HistoricalFigure, HistoricalState, PresentCountry


#region EVENT CATEGORY SERIALIZERS
class EventCategoryGetAllSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventCategory
        fields = ['id', 'name']
#endregion


#region HISTORICAL STATE SERIALIZERS
class HistoricalStateGetAllSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoricalState
        fields = ['id', 'dateFrom', 'dateTo', 'name']

class HistoricalStatePropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoricalState
        fields = ['id', 'name']
#endregion


#region PRESENT COUNTRY SERIALIZERS
class PresentCountryGetAllSerializer(serializers.ModelSerializer):
    class Meta:
        model = PresentCountry
        fields = ['id', 'name', 'code', 'flagUrl']

class PresentCountryPropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = PresentCountry
        fields = ['id', 'name']
#endregion


#region HISTORICAL EVENT SERIALIZERS
class HistoricalEventDeletePostUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoricalEvent
        fields = '__all__'

    def create(self, data):
        try:
            historicalEvent = HistoricalEvent.objects.create(**data)
            if historicalEvent.latitude and historicalEvent.longitude:
                historicalEvent.approximateRealLocation = True
            historicalEvent.save()

            return historicalEvent
        except IntegrityError as e:
            raise serializers.ValidationError(e)
        
class HistoricalEventGetSerializer(serializers.ModelSerializer):
    eventCategory = EventCategoryGetAllSerializer(many=False, source='eventCategoryId')
    historicalState = HistoricalStatePropertySerializer(many=False, source='historicalStateId')
    presentCountry = PresentCountryPropertySerializer(many=False, source='presentCountryId')

    class Meta:
        model = HistoricalEvent
        fields = ['id', 'name', 'description', 'date', 'time', 'latitude', 'longitude', 'approximateRealLocation', 'eventCategory', 'presentCountry', 'historicalState']
#endregion


#region HISTORICAL FIGURE SERIALIZERS
class HistoricalFigureDeletePostUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoricalFigure
        fields = ['name', 'birthDate', 'deathDate', 'birthHistoricalStateId', 'birthPresentCountryId', 'deathHistoricalStateId', 'deathPresentCountryId']

class HistoricalFigureGetSerializer(serializers.ModelSerializer):
    birthHistoricalState = HistoricalStatePropertySerializer(many=False, source='birthHistoricalStateId')
    birthPresentCountry = PresentCountryPropertySerializer(many=False, source='birthPresentCountryId')
    deathHistoricalState = HistoricalStatePropertySerializer(many=False, source='deathHistoricalStateId')
    deathPresentCountry = PresentCountryPropertySerializer(many=False, source='deathPresentCountryId')

    class Meta:
        model = HistoricalFigure
        fields = ['id', 'name', 'birthDate', 'deathDate', 'birthHistoricalState', 'birthPresentCountry', 'deathHistoricalState', 'deathPresentCountry']
#endregion