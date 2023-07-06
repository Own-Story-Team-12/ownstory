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
        
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['image'] = self.add_media_prefix(representation['image'])
        representation['audio_example'] = self.add_media_prefix(representation['audio_example'])
        representation['audio_myvoice'] = self.add_media_prefix(representation['audio_myvoice'])
        return representation

    def add_media_prefix(self, value):
        if value:
            return f"http://127.0.0.1:8000{value}"
        return None