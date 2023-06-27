#serialiezer란 장고 모델 데이터를 json타입으로 바꿔주는 작업

from rest_framework import serializers
from .models import Result

class ResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Result
        fields = ("__all__")