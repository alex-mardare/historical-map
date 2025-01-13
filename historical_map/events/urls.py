from django.urls import path

from . import views

urlpatterns = [
    path('historical-events/', views.HistoricalEventList.as_view(), name='event-list'),
    path('historical-events/create', views.HistoricalEventPost.as_view(), name='event-create'),
    path('historical-events/<int:pk>', views.HistoricalEventItem.as_view(), name='event-item'),

    path('event-categories/',views.EventCategoryList.as_view(), name='event-category-list'),
    path('event-categories/<int:pk>', views.EventCategoryItem.as_view(), name='event-category-item'),

    path('historical-figures/', views.HistoricalFigureListPost.as_view(), name='figure-list'),
    path('historical-figures/<int:pk>', views.HistoricalFigureItem.as_view(), name='figure-item'),

    path('figure-roles/', views.HistoricalFigureRoleList.as_view(), name='figure-role-list'),
    path('figure-roles/<int:pk>', views.HistoricalFigureRoleItem.as_view(), name='figure-role-item'),

    path('historical-states/', views.HistoricalStateListPost.as_view(), name='historical-state-list'),
    path('historical-states/<int:pk>', views.HistoricalStateItem.as_view(), name='historical-state-item'),

    path('present-countries/', views.PresentCountryList.as_view(), name='present-country-list'),
    path('present-countries/<int:pk>', views.PresentCountryItem.as_view(), name='present-country-item'),
]