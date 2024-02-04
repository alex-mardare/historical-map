from django.urls import path
from . import views

urlpatterns = [
    path('', views.HistoricalEventList.as_view()),
    path('<int:pk>', views.HistoricalEventItem.as_view()),

    path('event-categories/',views.EventCategoryList.as_view()),

    path('figures/', views.HistoricalFigureList.as_view()),
    path('figures/<int:pk>', views.HistoricalFigureItem.as_view()),

    path('historical-states/', views.HistoricalStateList.as_view()),

    path('present-countries/', views.PresentCountryList.as_view()),
]