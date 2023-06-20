from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib import messages
from django.contrib import auth
from django.contrib.auth import logout as auth_logout
from django.contrib.auth.hashers import make_password, check_password
from .models import User

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

# 회원가입
def create_user(request):
    if request.method == "POST":
        name = request.POST.get('user-name')
        password = request.POST.get('user-pw')
        password_ch = request.POST.get('user-pw-check')
        
        # ID 중복 확인
        if User.objects.filter(username=name).exists():
            messages.error(request, "사용중인 ID 입니다.")
            return render(request, 'Page/join.html', {'name': name}) 
        
        # 비밀번호 확인
        if password != password_ch:
            return redirect('Page:join')
    
        
        #비밀번호 암호화
        hashed_pw = make_password(password)
        
        #회원생성
        user = User(username = name, password = hashed_pw)
        user.save()
        
        return redirect('Page:login')
    return render(request, 'Page/join.html')


# 회원인증
def authenticate(name, password):
    try:
        user = User.objects.get(username=name)
        
        if check_password(password, user.password):
            return user

    except User.DoesNotExist:
        pass
    return None

# 로그인
def login_user(request):
    if request.method == "POST":
        name = request.POST.get('user-name')
        password = request.POST.get('user-pw')
        
        # 사용자 인증
        user = authenticate(name=name, password = password)
        if user is not None:
            # 로그인 성공
            request.session['user_id'] = user.id # 세션에 user.id 저장
            return redirect('Page:index')
        else:
            #로그인 실패
            messages.error(request, '로그인에 실패했습니다. 아이디 또는 패스워드를 확인해주세요.')  # 오류 메시지 저장
            return redirect('Page:login')
        
#로그아웃
def logout(request):
    auth_logout(request)
    request.session.pop('user_id', None)
    return redirect('Page:index')

############


from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer

@api_view(['POST'])
def login_drf(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    # 사용자 인증
    user = authenticate(name=username, password = password)
    if user is not None:
        # 로그인 성공
        
        return Response({'message': '로그인 성공'})
    else:
        #로그인 실패
        return Response({'message': '로그인 실패. 아이디 또는 패스워드를 확인해주세요.'}, status=401)
    
@api_view(['POST'])
def create_drf(request):
    serializer = UserSerializer(data = request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({'message':'회원가입 성공'}, status=201)
    else:
        return Response(serializer.errors, status = 400)