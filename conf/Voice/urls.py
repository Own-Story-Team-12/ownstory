from django.urls import path
from . import views


app_name = 'Voice'

urlpatterns = [
    path('', views.Voice.as_view(), name='Voice'),
]