
from rest_framework import viewsets
from .serializer import PostDetailSerializer, PostListSerializer, CommentSerializer
from Ai.views import Result
from .models import Comment
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

class PostViewSet(viewsets.ModelViewSet):
    queryset = Result.objects.all()
    serializer_class = PostListSerializer
    pagination_class = PageNumberPagination
    pagination_class.page_size = 6
    
    def get_paginated_response(self, data):
        response = super().get_paginated_response(data)
        response.data['max_pages'] = self.paginator.page.paginator.num_pages
        return response
    
class PostDetailViewSet(viewsets.ModelViewSet):
    serializer_class = PostDetailSerializer
    
    def get_object(self):
        id = self.kwargs['id']
        obj = get_object_or_404(Result, id=id)
        return obj
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return PostDetailSerializer
        return super().get_serializer_class()
   
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, many=False)
        
        # 직렬화된 결과를 생성하여 필요한 필드를 포함시킴
        response_data = serializer.data
        response_data['comments'] = self.get_comments(instance)
        
        return Response(serializer.data)
    
    
    
    
        
# (댓글) Comment 보여주기, 수정하기, 삭제하기
class CommentViewSet(viewsets.ModelViewSet):
    # authentication_class = [BasicAuthentication, SessionAuthentication]
    # permission_class = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
