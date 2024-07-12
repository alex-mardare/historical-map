from django.db import IntegrityError
from rest_framework import serializers

from .models import EventCategory, HistoricalEvent, HistoricalFigure, HistoricalState, PresentCountry


#region EVENT CATEGORY SERIALIZERS
class EventCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = EventCategory
        fields = ['id', 'name']
#endregion


#region PRESENT COUNTRY SERIALIZERS
class PresentCountryGetAllSerializer(serializers.ModelSerializer):
    class Meta:
        model = PresentCountry
        fields = ['code', 'id', 'name']

class PresentCountryPropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = PresentCountry
        fields = ['id', 'name']
#endregion


#region HISTORICAL STATE SERIALIZERS
class HistoricalStateDeletePostUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoricalState
        exclude = ['createdAt', 'updatedAt']

class HistoricalStateGetSerializer(serializers.ModelSerializer):
    presentCountries = PresentCountryPropertySerializer(many=True)

    class Meta:
        model = HistoricalState
        exclude = ['createdAt', 'updatedAt']

class HistoricalStatePropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoricalState
        fields = ['id', 'name']
#endregion


#region HISTORICAL EVENT SERIALIZERS
class HistoricalEventDeletePostUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoricalEvent
        exclude=['createdAt', 'updatedAt']

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
    eventCategory = EventCategorySerializer(many=False, source='eventCategoryId')
    historicalState = HistoricalStatePropertySerializer(many=False, source='historicalStateId')
    presentCountry = PresentCountryPropertySerializer(many=False, source='presentCountryId')

    class Meta:
        model = HistoricalEvent
        fields = ['approximateRealLocation', 'date', 'description', 'eventCategory', 'historicalState', 'id', 'latitude', 'longitude', 'name', 'presentCountry', 'time']
#endregion


#region HISTORICAL FIGURE SERIALIZERS
class HistoricalFigureDeletePostUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoricalFigure
        fields = ['birthDate', 'birthHistoricalStateId', 'birthPresentCountryId', 'deathDate', 'deathHistoricalStateId', 'deathPresentCountryId', 'name']

class HistoricalFigureGetSerializer(serializers.ModelSerializer):
    birthHistoricalState = HistoricalStatePropertySerializer(many=False, source='birthHistoricalStateId')
    birthPresentCountry = PresentCountryPropertySerializer(many=False, source='birthPresentCountryId')
    deathHistoricalState = HistoricalStatePropertySerializer(many=False, source='deathHistoricalStateId')
    deathPresentCountry = PresentCountryPropertySerializer(many=False, source='deathPresentCountryId')

    class Meta:
        model = HistoricalFigure
        fields = ['birthDate', 'birthHistoricalState', 'birthPresentCountry', 'deathDate', 'deathHistoricalState', 'deathPresentCountry', 'id', 'name']
#endregion