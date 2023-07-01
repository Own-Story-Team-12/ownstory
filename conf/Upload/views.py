# Upload/views.py
import os
from django.shortcuts import render, redirect
from .forms import FileUploadForm
from .models import FileUpload

def fileUpload(request):
    if request.method == 'POST':
        fileuploadForm = FileUploadForm(request.POST, request.FILES)
        if fileuploadForm.is_valid():
            # 파일 데이터 가져오기
            file_data = request.FILES['route']
            file_contents = file_data.read().decode('utf-8')
            file_title = file_data.name
            
            # FileUpload 모델 인스턴스 생성 및 저장
            txt_test = FileUpload.objects.create(title=file_title, route=fileuploadForm.cleaned_data['route'], content=file_contents)
            
            return redirect('Page:index') # 저장 완료 후 리다이렉트
    else: # GET 방식의 요청일 경우
        fileuploadForm = FileUploadForm()
        context = {
            'fileuploadForm': fileuploadForm
        }
        return render(request, 'fileupload.html', context)