from django.urls import path
from . import views

urlpatterns = [
    path('', views.test_home),
    path('api/', views.HistoricalEventList.as_view()),
    path('api/<int:pk>', views.HistoricalEventItem.as_view()),

    path('api/figure/', views.HistoricalFigureList.as_view()),
    path('api/figure/<int:pk>', views.HistoricalFigureItem.as_view()),

    path('api/role/', views.HistoricalFigureRoleList.as_view()),
    path('api/role/<int:pk>', views.HistoricalFigureRoleItem.as_view()),

    path('api/historical-state/', views.HistoricalStateList.as_view()),
    path('api/historical-state/<int:pk>', views.HistoricalStateItem.as_view()),
]