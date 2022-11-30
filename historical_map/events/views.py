from django.http import HttpResponse
from rest_framework import generics

from .models import HistoricalEvent, HistoricalFigure, HistoricalState
from .serializers import *

# Create your views here.
def test_home(request):
    return HttpResponse('Historical Map WIP')

# HISTORICAL EVENT ENDPOINTS
class HistoricalEventList(generics.ListCreateAPIView):
    queryset = HistoricalEvent.objects.all()
    serializer_class = HistoricalEventSerializer

class HistoricalEventItem(generics.RetrieveUpdateDestroyAPIView):
    queryset = HistoricalEvent.objects.all()
    serializer_class = HistoricalEventSerializer


# HISTORICAL FIGURE ENDPOINTS
class HistoricalFigureList(generics.ListCreateAPIView):
    queryset = HistoricalFigure.objects.all()
    serializer_class = HistoricalFigureSerializer

class HistoricalFigureItem(generics.RetrieveUpdateDestroyAPIView):
    queryset = HistoricalFigure.objects.all()
    serializer_class = HistoricalFigureSerializer


# HISTORICAL STATE ENDPOINTS
class HistoricalStateList(generics.ListCreateAPIView):
    queryset = HistoricalState.objects.all()
    serializer_class = HistoricalStateSerializer

class HistoricalStateItem(generics.RetrieveUpdateDestroyAPIView):
    queryset = HistoricalState.objects.all()
    serializer_class = HistoricalStateSerializer