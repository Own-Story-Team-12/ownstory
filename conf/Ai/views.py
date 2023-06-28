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