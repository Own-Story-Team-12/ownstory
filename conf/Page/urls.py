from django.urls import path
from . import views

app_name = 'Page'
urlpatterns = [
    path('', views.index, name='index'),
    path('join/', views.join, name='join'),
    path('logout/', views.logout, name='logout'),
    path('signup/', views.SignupView.as_view(), name='signup'),
    path('login/', views.LoginView.as_view(), name='loginup'),
]
