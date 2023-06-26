from django.shortcuts import render
from django.conf import settings
from Ai.module.img2keyword import Img2keyword
from Ai.module.translate import get_trans_papago
from Ai.module.translate_deepL import get_trans_deepl
from Ai.module.make_fairytale import chatGPT
from Ai.module.text2img import Txt2img
from Ai.module.text2keyword import textrank_keyword
from Ai.module.text2TTS import text2TTS, text2TTS_myvoice
import tempfile


def index(request):
    return render(request, 'Ai/index.html')

def image(request):
    return render(request, 'Ai/image.html')

def keyword(request):
    return render(request, 'Ai/keyword.html')

# def result_image(request):
#      #POST 방식으로 name이 img_file인 파일이 들어오면
#      if request.method == 'POST' and request.FILES['img_file']:
#         file = request.FILES['img_file']
        
#         with tempfile.NamedTemporaryFile(delete=False) as temp_file:
#             temp_file.write(file.read())
#             temp_file_path = temp_file.name

#         file_absolute_path = temp_file_path
#         #img로부터 keyword 추출 후 DB에 저장
#         img_keywords = Img2keyword(file_absolute_path)
#         img_keywords = img_keywords.clarifai()
        
#         #동화 생성 후 제목, 내용 가져오기
#         title, content = chatGPT(img_keywords)

#         #TTS
#         tts_example = text2TTS(content)
#         tts_myvoice = text2TTS_myvoice(content)

#         #생성 동화 번역
#         #deepL
#         # ko_title = get_trans_deepl(title)
#         # ko_content = get_trans_deepl(content)

#         #papago
#         ko_title = get_trans_papago(title, 'en','ko')
#         ko_content = get_trans_papago(content, 'en','ko')


#         #result 페이지에 넘겨줄 값
#         context = {
#         'image' : file.name,
#         'title' : title,
#         'content' : content,
#         'ko_title' : ko_title,
#         'ko_content' : ko_content,
#         'TTS_example' : tts_example,
#         'TTS_myvoice' : tts_myvoice,
#         }
        
#      return render(request, 'Ai/result.html', context)



# def result_keyword(request):
#     #입력받은 이름, 특징, 동물, 동물 특징
#     name = request.POST.get('name')
#     personality = request.POST.get('personality')
#     animal = request.POST.get('animal')
#     animal_feature = request.POST.get('animal_feature')

#     ko_keyword = [name, personality, animal, animal_feature]

    

#     #입력받은 키워드 영어로 변환 후 동화 생성
#     #deepL
#     #en_keyword = get_trans_deepl(ko_keyword)

#     en_keyword = get_trans_papago(ko_keyword, 'ko','en')
#     title, content = chatGPT(en_keyword)

#     #TTS
#     tts_example = text2TTS(content)
#     tts_myvoice = text2TTS_myvoice(content)

#     #생성된 동화 번역
#     #deepL
#     # ko_title = get_trans_deepl(title)
#     # ko_content = get_trans_deepl(content)

#     #papago
#     ko_title = get_trans_papago(title, 'en','ko')
#     ko_content = get_trans_papago(content, 'en','ko')
 
#     context = {
#         'title' : title,
#         'content' : content,
#         'ko_title' : ko_title,
#         'ko_content' : ko_content,
#         'TTS_example' : tts_example,
#         'TTS_myvoice' : tts_myvoice,
#         }
#     return render(request, 'Ai/result.html', context)



###########################################################

from .serializers import ResultSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from Ai.module.returnresult import result_image, result_keyword


class ResultAPIView(APIView):
    def post(self, request):

        content_type = request.content_type
        if content_type == 'multipart/form-data':
            file = request.FILES['img_file']
        
            with tempfile.NamedTemporaryFile(delete=False) as temp_file:
                temp_file.write(file.read())
                temp_file_path = temp_file.name

            file_absolute_path = temp_file_path

            response_data = result_image(file_absolute_path)

            return Response(response_data, status=status.HTTP_200_OK)
        else:
            name = request.data.get('name')
            feature = request.data.get('feature')
            background = request.data.get('background')
            content = request.data.get('content')

            ko_keyword = [name, feature, background, content]
            
            # 응답 데이터 구성
            response_data = result_keyword(ko_keyword)

            return Response(response_data, status=status.HTTP_200_OK)
        
#Django REST Framework는 기본적으로 JSON 시리얼라이저를 사용하므로,
#Python의 dict 객체를 Response 객체에 전달하면 자동으로 JSON으로 시리얼라이즈