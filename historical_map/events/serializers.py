from django.db import IntegrityError
from rest_framework import serializers

from .models import EventCategory, HistoricalEvent, HistoricalFigure, HistoricalFigureRole, HistoricalState, HistoricalStatePresentCountryPeriod, PresentCountry


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
        fields = ['code', 'flagUrl', 'id', 'name']

class PresentCountryPropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = PresentCountry
        fields = ['id', 'name']
#endregion


#region HISTORICAL STATE PRESENT COUNTRY PERIOD SERIALIZERS
class HistoricalStatePresentCountryPeriodGetSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='presentCountry.id', read_only=True)
    name = serializers.CharField(source='presentCountry.name', read_only=True)

    class Meta:
        model = HistoricalStatePresentCountryPeriod
        fields = ['dateFrom', 'dateTo', 'id', 'name']

class HistoricalStatePresentCountryPeriodDeletePostUpdateSerializer(serializers.ModelSerializer):
    presentCountry = serializers.PrimaryKeyRelatedField(queryset=PresentCountry.objects.all())

    class Meta:
        model = HistoricalStatePresentCountryPeriod
        fields = ['dateFrom', 'dateTo', 'presentCountry']
#endregion


#region HISTORICAL STATE SERIALIZERS
class HistoricalStateDeletePostUpdateSerializer(serializers.ModelSerializer):
    presentCountries = HistoricalStatePresentCountryPeriodDeletePostUpdateSerializer(many=True, source='historicalstatepresentcountryperiod_set')

    class Meta:
        model = HistoricalState
        exclude = ['createdAt', 'createdBy', 'updatedAt', 'updatedBy']

    def create(self, validated_data):
        present_countries = validated_data.pop('historicalstatepresentcountryperiod_set')
        historical_state = HistoricalState.objects.create(**validated_data)

        for present_country in present_countries:
            HistoricalStatePresentCountryPeriod.objects.create(historicalState=historical_state, presentCountry=present_country['presentCountry'], 
                                                               dateFrom=present_country['dateFrom'], dateTo=present_country['dateTo'])

        return historical_state
    
    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.dateFrom = validated_data.get('dateFrom', instance.dateFrom)
        instance.dateTo = validated_data.get('dateTo', instance.dateTo)
        instance.flagUrl = validated_data.get('flagUrl', instance.flagUrl)

        present_countries = validated_data.pop('historicalstatepresentcountryperiod_set')

        for present_country in present_countries:
            present_country_instance = instance.historicalstatepresentcountryperiod_set.filter(presentCountry=present_country['presentCountry']).first()
            if present_country_instance is None:
                HistoricalStatePresentCountryPeriod.objects.create(historicalState=instance, presentCountry=present_country['presentCountry'], 
                                                               dateFrom=present_country['dateFrom'], dateTo=present_country['dateTo'])
            else:
                present_country_instance.dateFrom = present_country['dateFrom']
                present_country_instance.dateTo = present_country['dateTo']
                present_country_instance.save()        
       
        instance.save()
        return instance

class HistoricalStateGetSerializer(serializers.ModelSerializer):
    presentCountries = HistoricalStatePresentCountryPeriodGetSerializer(many=True, source='historicalstatepresentcountryperiod_set')

    class Meta:
        model = HistoricalState
        exclude = ['createdAt', 'createdBy', 'updatedAt', 'updatedBy']

class HistoricalStatePropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoricalState
        fields = ['id', 'name']
#endregion


#region HISTORICAL EVENT SERIALIZERS
class HistoricalEventDeletePostUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoricalEvent
        exclude = ['createdAt', 'createdBy', 'updatedAt', 'updatedBy']

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


#region HISTORICAL FIGURE ROLE SERIALIZERS
class HistoricalFigureRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoricalFigureRole
        fields = ['description', 'id', 'name']

class HistoricalFigureRolePropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoricalFigureRole
        fields = ['id', 'name']
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