from rest_framework import serializers
from .models import HistoricalEvent

class HistoricalEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoricalEvent
        fields = '__all__'