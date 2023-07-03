
from django.urls import path, include
from rest_framework import routers
from .views import PostViewSet, PostDetailViewSet, SearchResultAPIView

router = routers.DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'posts/(?P<id>\d+)', PostDetailViewSet, basename='post-detail')

app_name = 'post'

urlpatterns = [ 
    path('api/', include(router.urls)),
    path('', PostViewSet.as_view({'get':'list'}), name='post_list'),
    path('api/search/', SearchResultAPIView.as_view(), name='search_results'),
]