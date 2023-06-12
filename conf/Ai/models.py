from django.db import models

# Create your models here.


class Result(models.Model):
    image = models.ImageField(blank=True)
    result = models.CharField(max_length=1000)
    pub_date = models.DateTimeField('date published')