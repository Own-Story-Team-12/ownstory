from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'Ai'

# router = DefaultRouter()
# router.register('save', views.SaveViewSet)

urlpatterns = [
    path('result/', views.ResultAPIView.as_view()),
    # path('save/', include(router.urls)),
]
