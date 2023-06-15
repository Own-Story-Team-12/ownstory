from django.urls import path
from . import views

app_name = 'Ai'
urlpatterns = [
    path('', views.index, name='index'),
    path('image/', views.image, name='image'),
    path('image/result', views.result_image, name='result'), 
]
