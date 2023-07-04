from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse, FileResponse
import os

# Create your views here.

class Voice(APIView):
    def get(self, request):
        base_path = r"./media/"
        voice_name = fr"{request.GET.get('voice')}"
        #voice_name = r'\tts.wav' # request.TTS
        
        #print(fr"{request.GET.get('voice')}")
        file_path = base_path + voice_name
        
        print(file_path)
        with open(file_path, 'rb') as file:
            response = HttpResponse(open(file_path, 'rb'), content_type='audio/wav')
           
            return response
        