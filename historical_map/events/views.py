from django.http import HttpResponse
from rest_framework import generics

from .models import HistoricalEvent
from .serializers import HistoricalEventSerializer

# Create your views here.
def test_home(request):
    return HttpResponse('Historical Map WIP')

class HistoricalEventList(generics.ListAPIView):
    queryset = HistoricalEvent.objects.all()
    serializer_class = HistoricalEventSerializer

class HistoricalEventItem(generics.RetrieveAPIView):
    queryset = HistoricalEvent.objects.all()
    serializer_class = HistoricalEventSerializer