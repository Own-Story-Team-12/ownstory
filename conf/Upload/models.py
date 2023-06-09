# Upload/models.py
from django.db import models

class FileUpload(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.TextField(max_length=40)
    route = models.FileField(null=True, upload_to="media/", blank=True)
    content = models.TextField()
    
    class Meta:
        db_table = 'txt_test'
    
    def __str__(self):
        return self.title