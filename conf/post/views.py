
import logging
from rest_framework import viewsets
from .serializer import PostDetailSerializer, PostListSerializer, ResultSerializer
from Ai.views import Result
from rest_framework.response import Response
from rest_framework.views import APIView
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
    queryset = Result.objects.all()
    serializer_class = PostDetailSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)

        return Response(serializer.data)
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return PostDetailSerializer
        return PostListSerializer    

    
# 검색 기능
class SearchResultAPIView(APIView):
    def get(self, request):
        # 검색어를 가져온다
        query = request.GET.get('query')
        
        if query:
            # DB로부터 검색어를 포함한 결과를 필터링하여 가져옴
            results = Result.objects.filter(title__icontains=query)          
      
        else:
            # 검색어가 없는 경우 모든 결과를 가져옴
            results = Result.objects.all()
            
        serializer = ResultSerializer(results, many=True)
        return Response(serializer.data)
