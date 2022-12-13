from django.http import HttpResponse
from rest_framework import generics

from .models import EventFigureRole, HistoricalEvent, HistoricalFigure, HistoricalFigureRole, HistoricalState
from .serializers import *

# Create your views here.
def test_home(request):
    return HttpResponse('Historical Map WIP')


# EVENT FIGURE ROLE ENDPOINTS
class EventFigureRoleItem(generics.RetrieveUpdateDestroyAPIView):
    queryset = EventFigureRole.objects.all()
    serializer_class = EventFigureRoleSerializer

class EventFigureRoleList(generics.ListCreateAPIView):
    queryset = EventFigureRole.objects.all()
    serializer_class = EventFigureRoleSerializer


# HISTORICAL EVENT ENDPOINTS
class HistoricalEventItem(generics.RetrieveUpdateDestroyAPIView):
    queryset = HistoricalEvent.objects.all()
    serializer_class = HistoricalEventSerializer

class HistoricalEventList(generics.ListCreateAPIView):
    queryset = HistoricalEvent.objects.all()
    serializer_class = HistoricalEventSerializer


# HISTORICAL FIGURE ENDPOINTS
class HistoricalFigureItem(generics.RetrieveUpdateDestroyAPIView):
    queryset = HistoricalFigure.objects.all()
    serializer_class = HistoricalFigureSerializer

class HistoricalFigureList(generics.ListCreateAPIView):
    queryset = HistoricalFigure.objects.all()
    serializer_class = HistoricalFigureSerializer


# HISTORICAL FIGURE ROLE ENDPOINTS
class HistoricalFigureRoleItem(generics.RetrieveUpdateDestroyAPIView):
    queryset = HistoricalFigureRole.objects.all()
    serializer_class = HistoricalFigureRoleSerializer

class HistoricalFigureRoleList(generics.ListCreateAPIView):
    queryset = HistoricalFigureRole.objects.all()
    serializer_class = HistoricalFigureRoleSerializer


# HISTORICAL STATE ENDPOINTS
class HistoricalStateItem(generics.RetrieveUpdateDestroyAPIView):
    queryset = HistoricalState.objects.all()
    serializer_class = HistoricalStateSerializer
    
class HistoricalStateList(generics.ListCreateAPIView):
    queryset = HistoricalState.objects.all()
    serializer_class = HistoricalStateSerializer