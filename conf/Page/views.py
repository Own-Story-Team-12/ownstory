from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib import messages
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


# 회원인증
def authenticate(name, password):
    try:
        user = User.objects.get(name=name)
        
        print(user.name) ## 
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
            request.session['is_logged_in'] = True
            return redirect('Page:index')
            #return HttpResponse(f"login success")
        else:
            #로그인 실패
            messages.error(request, '로그인에 실패했습니다. 아이디 또는 패스워드를 확인해주세요.')  # 오류 메시지 저장
            return redirect('Page:login')
        
#로그아웃
def logout(request):
    request.session.pop('user_id', None)
    request.session['is_logged_in'] = False
    return redirect('Page:index')