from django.urls import path
from . import views

urlpatterns = [
    path('', views.test_home),

    path('events/', views.HistoricalEventList.as_view()),
    path('events/<int:pk>', views.HistoricalEventItem.as_view()),

    path('figures/', views.HistoricalFigureList.as_view()),
    path('figures/<int:pk>', views.HistoricalFigureItem.as_view()),

    path('historical-states/', views.HistoricalStateList.as_view()),
    path('historical-states/<int:pk>', views.HistoricalStateItem.as_view()),

    path('links/', views.EventFigureRoleList.as_view()),
    path('links/<int:pk>', views.EventFigureRoleItem.as_view()),

    path('roles/', views.HistoricalFigureRoleList.as_view()),
    path('roles/<int:pk>', views.HistoricalFigureRoleItem.as_view()),
]