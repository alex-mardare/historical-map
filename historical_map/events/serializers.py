from django.db import IntegrityError
from rest_framework import serializers

from .models import EventFigureRole, HistoricalEvent, HistoricalFigure, HistoricalFigureRole, HistoricalState


# HISTORICAL EVENT SERIALIZERS
class HistoricalEventSerializer(serializers.ModelSerializer):
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

class HistoricalEventLinksSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoricalEvent
        fields =  ['id', 'name', 'description', 'date', 'time', 'latitude', 'longitude']


# HISTORICAL FIGURE SERIALIZERS
class HistoricalFigureSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoricalFigure
        fields = '__all__'

class HistoricalFigureLinksSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoricalFigure
        fields = ['id', 'name']


# HISTORICAL FIGURE ROLE SERIALIZERS
class HistoricalFigureRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoricalFigureRole
        fields = '__all__'

class HistoricalFigureRoleLinksSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoricalFigureRole
        fields = ['id', 'name']


# HISTORICAL STATE SERIALIZERS
class HistoricalStateSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoricalState
        fields = '__all__'


# EVENT FIGURE ROLE SERIALIZERS
class EventFigureRoleItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventFigureRole
        fields = '__all__'

    def create(self, data):
        try:
            eventFigureRole = EventFigureRole.objects.create(**data)
            eventFigureRole.save()

            return eventFigureRole
        except IntegrityError as e:
            raise serializers.ValidationError(e)

class EventFigureRoleListSerializer(serializers.ModelSerializer):
    historicalEvent = HistoricalEventLinksSerializer(many=False, source='historicalEventId')
    historicalFigure = HistoricalFigureLinksSerializer(many=False, source='historicalFigureId')
    historicalFigureRole = HistoricalFigureRoleLinksSerializer(many=False, source='historicalFigureRoleId')

    class Meta:
        model = EventFigureRole
        fields = ['id', 'historicalEvent', 'historicalFigure', 'historicalFigureRole']