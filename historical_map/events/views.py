from rest_framework import generics

from .models import HistoricalEvent, HistoricalFigure, HistoricalFigureRole, HistoricalState
from .paginations import NoPagination
from .serializers import *

#region EVENT CATEGORY ENDPOINTS
class EventCategoryList(generics.ListAPIView):
    pagination_class = NoPagination
    queryset = EventCategory.objects.all()
    serializer_class = EventCategoryGetAllSerializer
#endregion


#region HISTORICAL EVENT ENDPOINTS
class HistoricalEventItem(generics.RetrieveUpdateDestroyAPIView):
    queryset = HistoricalEvent.objects.all()
    serializer_class = HistoricalEventDeletePostUpdateSerializer

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return HistoricalEventGetSerializer
        return super().get_serializer_class()

class HistoricalEventListPost(generics.ListCreateAPIView):
    queryset = HistoricalEvent.objects.all()
    serializer_class = HistoricalEventDeletePostUpdateSerializer
    
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return HistoricalEventGetSerializer
        return super().get_serializer_class()
#endregion


#region HISTORICAL FIGURE ENDPOINTS
class HistoricalFigureItem(generics.RetrieveUpdateDestroyAPIView):
    queryset = HistoricalFigure.objects.all()
    serializer_class = HistoricalFigureDeletePostUpdateSerializer

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return HistoricalFigureGetSerializer
        return super().get_serializer_class()

class HistoricalFigureListPost(generics.ListCreateAPIView):
    queryset = HistoricalFigure.objects.all()
    serializer_class = HistoricalFigureDeletePostUpdateSerializer

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return HistoricalFigureGetSerializer
        return super().get_serializer_class()
#endregion


#region HISTORICAL STATE ENDPOINTS 
class HistoricalStateList(generics.ListAPIView):
    pagination_class = NoPagination
    queryset = HistoricalState.objects.all()
    serializer_class = HistoricalStateGetAllSerializer
#endregion


#region PRESENT COUNTRY ENDPOINTS
class PresentCountryList(generics.ListAPIView):
    pagination_class = NoPagination
    queryset = PresentCountry.objects.all()
    serializer_class = PresentCountryGetAllSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        
        histStateId = self.request.query_params.get('histStateId')
        if histStateId:
            historicalState = HistoricalState.objects.filter(id=histStateId).first()
            queryset = historicalState.get_present_countries()
        
        return queryset

#endregion