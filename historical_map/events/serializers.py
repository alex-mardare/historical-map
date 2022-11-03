from rest_framework import serializers
from .models import HistoricalEvent

class HistoricalEventSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = HistoricalEvent