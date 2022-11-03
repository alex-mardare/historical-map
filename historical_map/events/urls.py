from django.urls import path
from . import views

urlpatterns = [
    path('', views.test_home),
    path('api/', views.HistoricalEventList.as_view()),
]