from django.db import models
from Page.models import User

# Create your models here.

class Result(models.Model):
    id = models.AutoField(primary_key=True)
    image = models.ImageField(blank=True)
    audio_example = models.FileField(default='')
    audio_myvoice = models.FileField(default='')
    title = models.CharField(max_length=500, default='')
    ko_title = models.CharField(max_length=500, default='')
    content = models.TextField()
    ko_content = models.TextField()
    pub_date = models.DateTimeField('date published')
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        db_table = 'ai_result'