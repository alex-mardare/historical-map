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
        fields = ['code', 'flag_url', 'id', 'name']

class PresentCountryPropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = PresentCountry
        fields = ['id', 'name']
#endregion


#region HISTORICAL STATE PRESENT COUNTRY PERIOD SERIALIZERS
class HistoricalStatePresentCountryPeriodGetSerializer(serializers.ModelSerializer):
    flag_url = serializers.CharField(source='present_country.flag_url', read_only=True)
    id = serializers.IntegerField(source='present_country.id', read_only=True)
    name = serializers.CharField(source='present_country.name', read_only=True)

    class Meta:
        model = HistoricalStatePresentCountryPeriod
        fields = ['start_date', 'end_date', 'flag_url', 'id', 'name']

class HistoricalStatePresentCountryPeriodDeletePostUpdateSerializer(serializers.ModelSerializer):
    present_country = serializers.PrimaryKeyRelatedField(queryset=PresentCountry.objects.all())

    class Meta:
        model = HistoricalStatePresentCountryPeriod
        fields = ['start_date', 'end_date', 'present_country']
#endregion


#region HISTORICAL STATE SERIALIZERS
class HistoricalStateDeletePostUpdateSerializer(serializers.ModelSerializer):
    present_countries = HistoricalStatePresentCountryPeriodDeletePostUpdateSerializer(many=True, source='historicalstatepresentcountryperiod_set')

    class Meta:
        model = HistoricalState
        exclude = ['created_at', 'created_by', 'updated_at', 'updated_by']

    def create(self, validated_data):
        present_countries = validated_data.pop('historicalstatepresentcountryperiod_set')
        historical_state = HistoricalState.objects.create(**validated_data)

        for present_country in present_countries:
            HistoricalStatePresentCountryPeriod.objects.create(historical_state=historical_state, present_country=present_country['present_country'], 
                                                               start_date=present_country['start_date'], end_date=present_country['end_date'])

        return historical_state
    
    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.start_date = validated_data.get('start_date', instance.start_date)
        instance.end_date = validated_data.get('end_date', instance.end_date)
        instance.flag_url = validated_data.get('flag_url', instance.flag_url)

        present_countries = validated_data.pop('historicalstatepresentcountryperiod_set')

        for present_country in present_countries:
            present_country_instance = instance.historicalstatepresentcountryperiod_set.filter(present_country=present_country['present_country']).first()
            if present_country_instance is None:
                HistoricalStatePresentCountryPeriod.objects.create(historical_state=instance, present_country=present_country['present_country'], 
                                                                   start_date=present_country['start_date'], end_date=present_country['end_date'])
            else:
                present_country_instance.start_date = present_country['start_date']
                present_country_instance.end_date = present_country['end_date']
                present_country_instance.save()        
       
        instance.save()
        return instance

class HistoricalStateGetSerializer(serializers.ModelSerializer):
    present_countries = HistoricalStatePresentCountryPeriodGetSerializer(many=True, source='historicalstatepresentcountryperiod_set')

    class Meta:
        model = HistoricalState
        exclude = ['created_at', 'created_by', 'updated_at', 'updated_by']

class HistoricalStatePropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoricalState
        fields = ['id', 'name']
#endregion


#region HISTORICAL EVENT SERIALIZERS
class HistoricalEventDeletePostUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoricalEvent
        exclude = ['created_at', 'created_by', 'updated_at', 'updated_by']

    def create(self, data):
        try:
            historicalEvent = HistoricalEvent.objects.create(**data)
            if historicalEvent.latitude and historicalEvent.longitude:
                historicalEvent.approximate_location = True
            historicalEvent.save()

            return historicalEvent
        except IntegrityError as e:
            raise serializers.ValidationError(e)
        
class HistoricalEventGetSerializer(serializers.ModelSerializer):
    event_category = EventCategorySerializer(many=False)
    historical_state = HistoricalStatePropertySerializer(many=False)
    present_country = PresentCountryPropertySerializer(many=False)

    class Meta:
        model = HistoricalEvent
        fields = ['approximate_location', 'date', 'description', 'event_category', 'historical_state', 'id', 'latitude', 'longitude', 'name', 'present_country', 'time']
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
        fields = ['birth_date', 'birth_historical_state', 'birth_present_country', 'death_date', 'death_historical_state', 'death_present_country', 'name']

class HistoricalFigureGetSerializer(serializers.ModelSerializer):
    birth_historical_state = HistoricalStatePropertySerializer(many=False)
    birth_present_country = PresentCountryPropertySerializer(many=False)
    death_historical_state = HistoricalStatePropertySerializer(many=False)
    death_present_country = PresentCountryPropertySerializer(many=False)

    class Meta:
        model = HistoricalFigure
        fields = ['birth_date', 'birth_historical_state', 'birth_present_country', 'death_date', 'death_historical_state', 'death_present_country', 'id', 'name']
#endregion