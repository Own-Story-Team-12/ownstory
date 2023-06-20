from django.shortcuts import render
from django.conf import settings
from Ai.img2keyword import Img2keyword
from Ai.translate import get_trans_papago
from Ai.make_fairytale import chatGPT
from Ai.text2img import Txt2img
from Ai.text2keyword import textrank_keyword
from Ai.text2TTS import text2TTS
from Ai.models import Result
from django.utils import timezone


def index(request):
    return render(request, 'Ai/index.html')

def image(request):
    return render(request, 'Ai/image.html')

def keyword(request):
    return render(request, 'Ai/keyword.html')

def result_image(request):
     #POST 방식으로 name이 img_file인 파일이 들어오면
     if request.method == 'POST' and request.FILES['img_file']:
        file = request.FILES['img_file']

        #history 저장을 위해 image 파일의 경로와 생성 날짜를 DB에 저장
        result_db = Result()
        result_db.image = file
        result_db.pub_date = timezone.datetime.now()
        result_db.save() 
        
        #img로부터 keyword 추출 후 DB에 저장
        img_keywords = Img2keyword(result_db.image.path)
        img_keywords = img_keywords.clarifai()
        result_db.keyword = img_keywords
        

        #동화 생성 후 제목, 내용 가져오기
        title, content = chatGPT(result_db.keyword)
        print(title)
        result_db.title = title
        result_db.content = content

        #생성 동화 번역
        ko_title = get_trans_papago(title, 'en','ko')
        ko_content = get_trans_papago(content, 'en','ko')
        result_db.ko_title = ko_title
        result_db.ko_content = ko_content
        result_db.save()

        #result 페이지에 넘겨줄 값
        context = {
        'title' : title,
        'content' : content,
        'ko_title' : ko_title,
        'ko_content' : ko_content,
        }
        
     return render(request, 'Ai/result.html', context)


def result_keyword(request):
    #입력받은 이름, 특징, 동물, 동물 특징
    name = request.POST.get('name')
    personality = request.POST.get('personality')
    animal = request.POST.get('animal')
    animal_feature = request.POST.get('animal_feature')

    ko_keyword = [name, personality, animal, animal_feature]

    #DB에 저장
    result_db = Result()
    result_db.pub_date = timezone.datetime.now() 
    result_db.keyword = ko_keyword

    #입력받은 키워드 영어로 변환 후 동화 생성
    en_keyword = get_trans_papago(ko_keyword, 'ko','en')
    print(en_keyword)
    title, content = chatGPT(en_keyword)
    result_db.title = title
    result_db.content = content

    content_tts = text2TTS(content)

    split_content = content.split('.')
    half_index = len(split_content) // 2
    first_half = split_content[:half_index]
    second_half = split_content[half_index:]

    first_half = str(textrank_keyword(first_half))
    second_half = str(textrank_keyword(second_half))

    print(first_half)
    print(second_half)

    # first = Txt2img()
    # second = Txt2img()
    # pc_id1 = first.txt2img(first_half)
    # pc_id2 = second.txt2img(second_half)
    # img1 = first.process_id(pc_id1)
    # img2 = second.process_id(pc_id2)

    #생성된 동화 번역
    ko_title = get_trans_papago(title, 'en','ko')
    ko_content = get_trans_papago(content, 'en','ko')
    result_db.ko_title = ko_title
    result_db.ko_content = ko_content
    result_db.save()
    context = {
        'title' : title,
        'content' : content,
        'ko_title' : ko_title,
        'ko_content' : ko_content,
        'TTS' : content_tts,
        }
    return render(request, 'Ai/result.html', context)

     # 'img1' : img1,
    # 'img2' : img2,