from django.urls import path, include
from . import views

app_name = 'Ai'


urlpatterns = [
    path('result/', views.ResultAPIView.as_view()),
    path('save/', views.SaveAPIView.as_view()),
]
