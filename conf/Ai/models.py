from django.db import models

# Create your models here.

class Result(models.Model):
    image = models.ImageField(blank=True)
    keyword = models.CharField(max_length=1000, default='')
    title = models.CharField(max_length=50, default='')
    ko_title = models.CharField(max_length=50, default='')
    content = models.CharField(max_length=1000)
    ko_content = models.CharField(max_length=1000, default='')
    pub_date = models.DateTimeField('date published')
    
    class Meta:
        db_table = 'result'