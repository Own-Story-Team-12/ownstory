from rest_framework import serializers
from Ai.models import Result

class PostDetailSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source = 'user.username')
    content = serializers.CharField()
    ko_content = serializers.CharField()
    image = serializers.ImageField()
    audio_example = serializers.FileField()
    audio_myvoice = serializers.FileField()

    class Meta:
        model = Result
        fields = ['id', 'title', 'ko_title', 'content', 'ko_content', 'image', 'audio_example', 'audio_myvoice', 'user', 'pub_date',]
        
class PostListSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source = 'user.username')
    
    class Meta:
        model = Result
        fields = ['id', 'title', 'ko_title', 'content', 'ko_content', 'image', 'user', 'pub_date', 'audio_myvoice', 'audio_example',]
    
    # def to_representation(self, instance):
    #     representation = super().to_representation(instance)
    #     title = representation['title']       
    #     if 'ko_title' in representation:
    #         ko_title = representation['ko_title']
    #         representation['title'] = f'{title} ({ko_title})'
    #     else:
    #         representation['title'] = title
    #     return representation
    
        
class ResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Result
        fields = '__all__'