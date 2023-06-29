from django.urls import path, include
from . import views


app_name = 'Ai'


urlpatterns = [
    path('api/', views.ResultAPIView.as_view()),
]
