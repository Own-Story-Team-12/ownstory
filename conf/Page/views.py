from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib import messages
from django.contrib.auth import logout as auth_logout
from django.contrib.auth.hashers import make_password, check_password
from .models import User
from django.http import HttpResponse

# Create your views here.

def index(request):
    user_id = request.session.get('user_id')
    user = None
    
    if user_id:
        try:
            user = User.objects.get(id=user_id)  # 현재 로그인된 사용자
        except User.DoesNotExist:
            pass
    return render(request, 'page/index.html', {'user': user})

def login(request):
    return render(request, 'page/login.html')

def join(request):
    return render(request, 'page/join.html')
        
#로그아웃
def logout(request):
    auth_logout(request)
    request.session.pop('user_id', None)
    return redirect('Page:index')

############

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_jwt.settings import api_settings
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .serializers import UserSerializer

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

class SignupView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            # ID 중복검사
            username = serializer.validated_data['username']
            if User.objects.filter(username=username).exists():
                return Response({'error': '이미 사용중인 ID 입니다.'}, status=400)
            user = serializer.save()
            payload = jwt_payload_handler(user)
            token = jwt_encode_handler(payload)
            return Response({'token': token})
        return Response(serializer.errors, status=400)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)

        if user is None:
            return Response({'detail': 'Invalid credentials'}, status=400)

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        
        response = HttpResponse()
        response['Access-Control-Allow-Origin'] = 'http://localhost:3000/'
        response['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE'
        response['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        response.content = access_token

        return response