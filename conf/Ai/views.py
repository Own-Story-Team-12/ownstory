from django.shortcuts import render
from django.conf import settings
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from Ai import extract_keyword
from Ai.translate import get_trans_papago
from Ai.models import Result
from django.utils import timezone
import openai


openai.api_key = "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"# 원장희 gpt api key


def index(request):
    return render(request, 'Ai/index.html')

def image(request):
    return render(request, 'Ai/image.html')

def keyword(request):
    return render(request, 'Ai/keyword.html')


def result_image(request):
     #POST 방식으로 name이 img_file인 파일이 들어오면
     if request.method == 'POST' and request.FILES['img_file']:

        #Keyword_Extraction 클래스 호출
        file = request.FILES['img_file']

        #history 저장을 위해 DB에 저장
        result_db = Result()
        result_db.image = file
        result_db.pub_date = timezone.datetime.now()
        result_db.save()
        
        # saved_file = default_storage.save('static/' + file.name, ContentFile(file.read()))
        # url = default_storage.url(saved_file)
        # print(url)
        test = extract_keyword.Keyword_Extraction(result_db.image.path)
        img_keywords = test.clarifai()
        result_db.result = img_keywords
        result_db.save()
        print(img_keywords)

        result = chatGPT(result_db.result)

        korean_script = get_trans_papago(result, 'en','ko')
        print(korean_script)

        context = {
        #'question': "keywords are " + img_keywords,
        'korean_script' : korean_script,
        'result': result
    }
     return render(request, 'Ai/result.html', context)


def chatGPT(prompt):
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": "Use keywords to create fairy tales for kids in very, very simple words at least 1500 characters. keywords are"+ str(prompt)}]
    )
    print(completion)
    result = completion.choices[0].message.content
    return result


def result_keyword(request):
    #post로 받은 keyword
    prompt = request.POST.get('keyword')
    result = chatGPT(prompt)

    korean_script = get_trans_papago(result, 'en','ko')
    print(korean_script)
    context = {
        'korean_script' : korean_script,
        'result': result
    }

    return render(request, 'Ai/result.html', context) 


