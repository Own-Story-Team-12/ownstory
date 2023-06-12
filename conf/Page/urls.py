from django.urls import path
from . import views

app_name = 'Page'
urlpatterns = [
    path('', views.index, name='index'),
    path('login/', views.login, name='login'),
    path('join/', views.join, name='join'),
    path('createuser/', views.create_user, name='createuser'),
    path('loginuser/', views.login_user, name='loginuser'),
    path('logout/', views.logout, name='logout'),
]
