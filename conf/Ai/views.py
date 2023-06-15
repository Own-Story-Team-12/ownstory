from django.shortcuts import render
from django.conf import settings
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from Ai import extract_keyword
from Ai.models import Result
from django.utils import timezone

def index(request):
    return render(request, 'Ai/index.html')

def image(request):
    return render(request, 'Ai/image.html')

def result_image(request):
     #POST 방식으로 name이 img_file인 파일이 들어오면
     if request.method == 'POST' and request.FILES['img_file']:

        #Keyword_Extraction 클래스 호출
        file = request.FILES['img_file']

        #history 저장을 위해 DB에 저장
        result = Result()
        result.image = file
        result.pub_date = timezone.datetime.now()
        result.save()
        
        # saved_file = default_storage.save('static/' + file.name, ContentFile(file.read()))
        # url = default_storage.url(saved_file)
        # print(url)
        test = extract_keyword.Keyword_Extraction(result.image.path)
        context = {'result' : test.clarifai()}
        result.result = context
        result.save()
     return render(request, 'Ai/result.html', context)



