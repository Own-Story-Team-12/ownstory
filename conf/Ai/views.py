from django.conf import settings
from .serializers import ResultSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.core.files.storage import FileSystemStorage
from Ai.module.returnresult import result_image, result_keyword
from django.http import JsonResponse
from .models import Result
from django.utils import timezone
from Page.models import User

class SaveAPIView(APIView):
    def post(self, request):
        if request.method == 'POST':

            username = request.data.get('user')
            user = User.objects.get(username = username)

            # 필드 값 추출
           
            image = request.data.get('image')
            title = request.data.get('title')
            content = request.data.get('content')
            ko_title = request.data.get('ko_title')
            ko_content = request.data.get('ko_content')
            TTS_example = request.data.get('TTS_example')
            TTS_myvoice = request.data.get('TTS_myvoice')

            if image == "no":
                image = "img_default.png"

            # 모델 인스턴스 생성 및 저장
            result = Result()
            result.image = image
            result.title = title
            result.content = content
            result.ko_title = ko_title
            result.ko_content = ko_content
            result.audio_example = TTS_example
            result.audio_myvoice = TTS_myvoice
            result.user = user
            result.pub_date = timezone.datetime.now()
            result.save()
            print('저장')
            
            return JsonResponse({'message': 'Data saved successfully.'})
        return JsonResponse({'message': 'Invalid request.'}, status=400)



class ResultAPIView(APIView):
    def post(self, request):
        #POST로 들어오고 img_file이라는 필드명을 get할 수 있으면
        if request.method == 'POST' and request.FILES.get('img_file'):
            file = request.FILES['img_file']
            
            #media 폴더에 이미지 파일 저장 
            fs = FileSystemStorage(location=settings.MEDIA_ROOT)
            filename = fs.save(file.name, file)
            uploaded_file_url = fs.url(filename)
            response_data = result_image(uploaded_file_url)

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

