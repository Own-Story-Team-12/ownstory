
from rest_framework import viewsets
from .serializer import PostSerializer, PostListSerializer, CommentSerializer
from Ai.views import Result
from .models import Comment
from django.shortcuts import get_object_or_404
from rest_framework.response import Response

class PostViewSet(viewsets.ModelViewSet):
    queryset = Result.objects.all()
    serializer_class = PostListSerializer
    
    # # serializer.save() 재정의
    # def perform_create(self, serializer):
    #     serializer.save(user=self.request.user)
    
class PostDetailViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = PostSerializer
    
    def get_object(self):
        id = self.kwargs['id']
        queryset = Result.objects.get(id=id)
        obj = get_object_or_404(queryset, id=id)
        return obj
   
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        
        # 게시물 정보를 포함한 응답 데이터 생성
        response_data = {
            'post': serializer.data,
            'comments': self.get_comments(instance),
        }
        
        return Response(response_data)
    
        
# (댓글) Comment 보여주기, 수정하기, 삭제하기
class CommentViewSet(viewsets.ModelViewSet):
    # authentication_class = [BasicAuthentication, SessionAuthentication]
    # permission_class = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
