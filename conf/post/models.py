from django.db import models
from Page.models import User
from Ai.models import Result

class Post(models.Model):
    # 1) 게시글의 id값
    id = models.AutoField(primary_key=True, null=False, blank=False)
    # 2) 제목
    postname = models.CharField("제목", max_length=50, null=False)
    # 3) 사진
    mainphoto = models.ImageField("사진", blank=True, null=True)
    # 4) wav 파일
    audio = models.FileField("TTS.wav", blank=True, null=False)
    # 4) 내용
    contents = models.TextField("내용", null=False)
    # 5) 작성자
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)
    # 6) 작성일
    dt_created = models.DateTimeField("작성일", auto_now_add=True, null=False)
    # 7) 수정일
    dt_modified = models.DateTimeField("수정일", auto_now=True, null=False)
    
    # postname이 Post object 대신 나오기
    def __str__(self):
        return self.postname

class Comment(models.Model):
    id = models.AutoField(primary_key=True)
    post = models.ForeignKey(Result, related_name='comments', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    comment = models.TextField()
    
    def __str__(self):
        return self.comment