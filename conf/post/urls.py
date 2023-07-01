
from django.urls import path, include
from rest_framework import routers
from .views import PostViewSet, CommentViewSet, PostDetailViewSet

router = routers.DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'posts/(?P<id>\d+)', PostDetailViewSet, basename='post-detail')

app_name = 'post'

urlpatterns = [ 
    path('api/', include(router.urls)),
    path('', PostViewSet.as_view({'get':'list'}), name='post_list'),
]