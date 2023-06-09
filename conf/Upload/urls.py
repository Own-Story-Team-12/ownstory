# Upload/urls.py
from django.urls import path
from .views import *

urlpatterns = [
    path('', fileUpload, name="fileupload"),
]
