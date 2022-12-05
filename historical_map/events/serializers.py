from django.db import IntegrityError
from rest_framework import serializers

from .models import EventFigureRole, HistoricalEvent, HistoricalFigure, HistoricalFigureRole, HistoricalState


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


class HistoricalFigureSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoricalFigure
        fields = '__all__'

class HistoricalFigureLinksSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoricalFigure
        fields = ['id', 'name']


class HistoricalFigureRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoricalFigureRole
        fields = '__all__'

class HistoricalFigureRoleLinksSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoricalFigureRole
        fields = ['id', 'name']


class HistoricalStateSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoricalState
        fields = '__all__'


class EventFigureRoleSerializer(serializers.ModelSerializer):
    historicalEventId = HistoricalEventLinksSerializer(many=False)
    historicalFigureId = HistoricalFigureLinksSerializer(many=False)
    historicalFigureRoleId = HistoricalFigureRoleLinksSerializer(many=False)

    class Meta:
        model = EventFigureRole
        fields = ['historicalEventId', 'historicalFigureId', 'historicalFigureRoleId']