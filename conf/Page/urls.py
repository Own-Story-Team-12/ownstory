from django.urls import path
from . import views

app_name = 'Page'
urlpatterns = [
    path('', views.index, name='index'),
    path('login/', views.login, name='login'),
    path('join/', views.join, name='join'),
]
