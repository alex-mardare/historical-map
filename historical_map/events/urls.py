from django.urls import path
from . import views

urlpatterns = [
    path('', views.HistoricalEventListPost.as_view(), name='event-list'),
    path('<int:pk>', views.HistoricalEventItem.as_view(), name='event-item'),

    path('event-categories/',views.EventCategoryList.as_view(), name='event-category-list'),

    path('figures/', views.HistoricalFigureListPost.as_view(), name='figure-list'),
    path('figures/<int:pk>', views.HistoricalFigureItem.as_view(), name='figure-item'),

    path('historical-states/', views.HistoricalStateList.as_view(), name='historical-state-list'),

    path('present-countries/', views.PresentCountryList.as_view(), name='present-country-list'),
]