from rest_framework import generics

from .models import EventFigureRole, HistoricalEvent, HistoricalFigure, HistoricalFigureRole, HistoricalState
from .serializers import *


# EVENT CATEGORY ENDPOINTS
class EventCategoryList(generics.ListAPIView):
    queryset = EventCategory.objects.all()
    serializer_class = EventCategorySerializer


# EVENT FIGURE ROLE ENDPOINTS
class EventFigureRoleCreate(generics.CreateAPIView):
    queryset = EventFigureRole.objects.all()
    serializer_class = EventFigureRoleItemSerializer

class EventFigureRoleItem(generics.RetrieveUpdateDestroyAPIView):
    queryset = EventFigureRole.objects.all()
    serializer_class = EventFigureRoleItemSerializer

class EventFigureRoleList(generics.ListAPIView):
    queryset = EventFigureRole.objects.all()
    serializer_class = EventFigureRoleListSerializer


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

class HistoricalFigureRoleList(generics.ListAPIView):
    queryset = HistoricalFigureRole.objects.all()
    serializer_class = HistoricalFigureRoleSerializer


# HISTORICAL STATE ENDPOINTS
class HistoricalStateItem(generics.RetrieveUpdateDestroyAPIView):
    queryset = HistoricalState.objects.all()
    serializer_class = HistoricalStateSerializer
    
class HistoricalStateList(generics.ListCreateAPIView):
    queryset = HistoricalState.objects.all()
    serializer_class = HistoricalStateSerializer


# PRESENT COUNTRY ENDPOINTS
class PresentCountryList(generics.ListAPIView):
    queryset = PresentCountry.objects.all().order_by('name')
    serializer_class = PresentCountryListSerializer