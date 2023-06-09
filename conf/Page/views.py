from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib import messages
from django.contrib.auth.hashers import make_password
from .models import User

# Create your views here.

def index(request):
    return render(request, 'page/index.html')

def login(request):
    return render(request, 'page/login.html')

def join(request):
    return render(request, 'page/join.html')


def create_user(request):
    if request.method == "POST":
        name = request.POST.get('user-name')
        password = request.POST.get('user-pw')
        password_ch = request.POST.get('user-pw-check')
        
        # 비밀번호 확인
        if password != password_ch:
            return redirect('Page:join')
        
        
        #비밀번호 암호화
        hashed_pw = make_password(password)
        
        #회원생성
        user = User(name = name, password = hashed_pw)
        user.save()
        
        return redirect('Page:login')
    return render(request, 'Page/join.html')
        