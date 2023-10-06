from rest_framework import generics

from .models import EventFigureRole, HistoricalEvent, HistoricalFigure, HistoricalFigureRole, HistoricalState
from .paginations import NoPagination
from .serializers import *

#region EVENT CATEGORY ENDPOINTS
class EventCategoryList(generics.ListAPIView):
    pagination_class = NoPagination
    queryset = EventCategory.objects.all()
    serializer_class = EventCategorySerializer
#endregion


#region EVENT FIGURE ROLE ENDPOINTS
class EventFigureRoleCreate(generics.CreateAPIView):
    queryset = EventFigureRole.objects.all()
    serializer_class = EventFigureRoleItemSerializer

class EventFigureRoleItem(generics.RetrieveUpdateDestroyAPIView):
    queryset = EventFigureRole.objects.all()
    serializer_class = EventFigureRoleItemSerializer

class EventFigureRoleList(generics.ListAPIView):
    queryset = EventFigureRole.objects.all()
    serializer_class = EventFigureRoleListSerializer
#endregion


#region HISTORICAL EVENT ENDPOINTS
class HistoricalEventList(generics.ListCreateAPIView):
    queryset = HistoricalEvent.objects.all()
    serializer_class = HistoricalEventSerializer

class HistoricalEventRetrieveUpdate(generics.RetrieveUpdateDestroyAPIView):
    queryset = HistoricalEvent.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return HistoricalEventRetrieveSerializer
        elif self.request.method in ['DELETE', 'PATCH', 'PUT']:
            return HistoricalEventSerializer
        return super().get_serializer_class()
#endregion


#region HISTORICAL FIGURE ENDPOINTS
class HistoricalFigureItem(generics.RetrieveUpdateDestroyAPIView):
    queryset = HistoricalFigure.objects.all()
    serializer_class = HistoricalFigureSerializer

class HistoricalFigureList(generics.ListCreateAPIView):
    queryset = HistoricalFigure.objects.all()
    serializer_class = HistoricalFigureSerializer

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return HistoricalFigureCreateSerializer
        return super().get_serializer_class()
#endregion


#region HISTORICAL FIGURE ROLE ENDPOINTS
class HistoricalFigureRoleItem(generics.RetrieveUpdateDestroyAPIView):
    queryset = HistoricalFigureRole.objects.all()
    serializer_class = HistoricalFigureRoleSerializer

class HistoricalFigureRoleList(generics.ListAPIView):
    queryset = HistoricalFigureRole.objects.all()
    serializer_class = HistoricalFigureRoleSerializer
#endregion


#region HISTORICAL STATE ENDPOINTS
class HistoricalStateItem(generics.RetrieveUpdateDestroyAPIView):
    queryset = HistoricalState.objects.all()
    serializer_class = HistoricalStateSerializer
    
class HistoricalStateList(generics.ListCreateAPIView):
    pagination_class = NoPagination
    queryset = HistoricalState.objects.all()
    serializer_class = HistoricalStateSerializer
#endregion


#region PRESENT COUNTRY ENDPOINTS
class PresentCountryList(generics.ListAPIView):
    pagination_class = NoPagination
    queryset = PresentCountry.objects.all()
    serializer_class = PresentCountrySerializer
#endregion