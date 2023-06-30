from rest_framework import serializers
from Ai.models import Result
from .models import Comment

class PostSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source = 'user.username')

    class Meta:
        model = Result
        fields = '__all__'

class PostListSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source = 'user.username')
    
    class Meta:
        model = Result
        fields = ['id', 'title', 'ko_title', 'user', 'pub_date']
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        title = representation['title']       
        if 'ko_title' is not None:
            ko_title = representation['ko_title']
            representation['title'] = f'{title} ({ko_title})'
        else:
            representation['title'] = title
        return representation
    
class CommentSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source = 'user.username')
    
    class Meta:
        model = Comment
        fields = '__all__'