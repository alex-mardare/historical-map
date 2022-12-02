from django.db import IntegrityError
from rest_framework import serializers

from .models import HistoricalEvent, HistoricalFigure, HistoricalFigureRole, HistoricalState

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

class HistoricalFigureSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoricalFigure
        fields = '__all__'

class HistoricalFigureRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoricalFigureRole
        fields = '__all__'

class HistoricalStateSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoricalState
        fields = '__all__'