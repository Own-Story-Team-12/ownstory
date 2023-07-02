from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib import messages
from django.contrib.auth import logout as auth_logout
from django.contrib.auth.hashers import make_password, check_password
from .models import User
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_jwt.settings import api_settings
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .serializers import UserSerializer
import os
import time
import csv
from Ai.models import Result

from rest_framework.permissions import IsAuthenticated

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
            
            response = HttpResponse()
            
            response['Access-Control-Allow-Origin'] = 'http://localhost:3000'
            response['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE'
            response['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
            response['Authorization'] = 'Bearer ' + token
            
            response.content = token
            return response
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

        response['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        response['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE'
        response['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        response.content = access_token

        return response
    
class userInfo(APIView):
    def get(self, request):
        username = request.GET.get('username')
        user = User.objects.get(username=username)
        user_id = user.id
        results = Result.objects.filter(user_id=user_id)
        results_data = []
        for result in results:
            results_data.append({
                'id': result.id,
                'title': result.title,
                'ko_title': result.ko_title,
                'image': result.image.path,
                'img_name' : result.image.name,
            })
        member_info = {
            'username': user.username,
            'results': results_data

        }
        return Response(member_info)
    
class UploadAudioView(APIView):
    def post(self, request, format=None):
        audio_file = request.FILES.get('audioFile')  # 파일 업로드 필드명에 맞게 수정하세요
        # 저장할 디렉토리 경로
        save_directory = './media/wav/'
        
        if not os.path.exists(save_directory):
            os.makedirs(save_directory)

        # 파일명
        filename = audio_file.name
        file_path = os.path.join(save_directory, filename)
        
        if int(filename.split('.')[0]) < 5:
            with open(file_path, 'wb') as f:
                f.write(audio_file.read())             
            
        file_count = len(os.listdir(save_directory))

        return Response({'message': file_count})
    
class AudioCheckView(APIView):
    def post(self, request):
        userid = request.data.get('name') # 추후에 활용할수있을것같아서 받아옴
        
        save_directory = './media/wav/'

        try:
            os.makedirs(save_directory)
        except FileExistsError:
            if not os.path.isdir(save_directory):
                print(1)
            
        file_count = len(os.listdir(save_directory))

        return Response({'message': file_count})
    
class AudioFitView(APIView):
    def post(self, request):
        # texts = request.data.get('text')   
        # print(texts)
          
        save_directory = './media/wav/'
        
        text = ["The pigs and cows ran everywhere.",
                  "Float the soap on top of the bath water.",
                  "A very young boy sliding down a slide into a swimming pool. wearing blue floaties.",
                  "I can't do that right now. Please try again later.",
                  "The boy was there when the sun rose."]

        data = []
        file_names = os.listdir(save_directory)
        
        for i in range(len(text)):
            t = file_names[i][:-4]+'|'+text[i]
            t = t.replace('"', '')
            data.append([t])
            
        f = open('./media/wav/metadata.csv', 'w', newline='')
        writer = csv.writer(f)
        writer.writerows(data)
        f.close()

        return Response({'message': '성공'})
