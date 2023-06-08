from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
# Create your views here.

def index(request):
    return render(request, 'page/index.html')

def login(request):
    return render(request, 'page/login.html')

def join(request):
    return render(request, 'page/join.html')