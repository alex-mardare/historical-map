from django.contrib.auth import logout as django_logout
from django.shortcuts import redirect
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.views import APIView

from .models import EventCategory, HistoricalEvent, HistoricalFigure, HistoricalFigureRole, HistoricalState, PresentCountry
from .paginations import NoPagination
from .serializers import *

#region EVENT CATEGORY ENDPOINTS
class EventCategoryItem(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = EventCategory.objects.all()
    serializer_class = EventCategorySerializer

class EventCategoryList(generics.ListCreateAPIView):
    pagination_class = NoPagination
    permission_classes = [IsAuthenticated]
    queryset = EventCategory.objects.all()
    serializer_class = EventCategorySerializer
#endregion


#region HISTORICAL EVENT ENDPOINTS
class HistoricalEventItem(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = HistoricalEvent.objects.all()
    serializer_class = HistoricalEventDeletePostUpdateSerializer

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return HistoricalEventGetSerializer
        return super().get_serializer_class()

class HistoricalEventList(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = HistoricalEvent.objects.all()
    serializer_class = HistoricalEventGetSerializer
    
class HistoricalEventPost(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = HistoricalEvent.objects.all()
    serializer_class = HistoricalEventDeletePostUpdateSerializer
#endregion


#region HISTORICAL FIGURE ENDPOINTS
class HistoricalFigureItem(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = HistoricalFigure.objects.all()
    serializer_class = HistoricalFigureDeletePostUpdateSerializer

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return HistoricalFigureGetSerializer
        return super().get_serializer_class()

class HistoricalFigureListPost(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = HistoricalFigure.objects.all()
    serializer_class = HistoricalFigureDeletePostUpdateSerializer

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return HistoricalFigureGetSerializer
        return super().get_serializer_class()
#endregion


#region HISTORICAL FIGURE ROLE ENDPOINTS
class HistoricalFigureRoleList(generics.ListCreateAPIView):
    pagination_class = NoPagination
    permission_classes = [IsAuthenticated]
    queryset = HistoricalFigureRole.objects.all()
    serializer_class = HistoricalFigureRoleSerializer
    
class HistoricalFigureRoleItem(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = HistoricalFigureRole.objects.all()
    serializer_class = HistoricalFigureRoleSerializer
#endregion


#region HISTORICAL STATE ENDPOINTS 
class HistoricalStateListPost(generics.ListCreateAPIView):
    pagination_class = NoPagination
    permission_classes = [IsAuthenticated]
    queryset = HistoricalState.objects.all()
    serializer_class = HistoricalStateDeletePostUpdateSerializer

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return HistoricalStateGetSerializer
        return super().get_serializer_class()
    
class HistoricalStateItem(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = HistoricalState.objects.all()
    serializer_class = HistoricalStateDeletePostUpdateSerializer

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return HistoricalStateGetSerializer
        return super().get_serializer_class()
#endregion


#region PRESENT COUNTRY ENDPOINTS
class PresentCountryItem(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    queryset = PresentCountry.objects.all()
    serializer_class = PresentCountrySerializer

class PresentCountryList(generics.ListAPIView):
    pagination_class = NoPagination
    permission_classes = [IsAuthenticated]
    queryset = PresentCountry.objects.all()
    serializer_class = PresentCountriesSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        
        histStateId = self.request.query_params.get('histStateId')
        if histStateId:
            historicalState = HistoricalState.objects.filter(id=histStateId).first()
            queryset = historicalState.get_present_countries()
        
        return queryset
#endregion


#region USER MANAGEMENT
class AuthCheck(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({'isAuthenticated': True}, status=status.HTTP_200_OK)

class CustomLogout(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        django_logout(request)
        return redirect('/api-auth/login/')

    def post(self, request):
        try:
            refresh_token = request.data.get('refresh_token')

            token = RefreshToken(refresh_token)
            token.blacklist()

            response = Response({"detail": "Successfully logged out."}, status=status.HTTP_200_OK)
            response.delete_cookie('access_token')
            return response
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        if response.status_code == status.HTTP_200_OK:
            access_token = response.data.get('access')

            response.set_cookie(httponly=True, key='access_token', max_age=3600, samesite='Lax', secure=True, value=access_token)

        return response
    
class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        if response.status_code == status.HTTP_200_OK:
            access_token = response.data.get('access')

            response.set_cookie(httponly=True, key='access_token', max_age=3600, samesite='Lax', secure=True, value=access_token)

        return response
#endregion