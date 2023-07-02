from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models

# class UserManager(BaseUserManager):
#     def create_user(self, name, password):
#         user = self.model(name=name)
#         user.set_password(password)
#         user.save(using=self._db)
#         return user

class User(AbstractUser):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=20, unique=True)
    password = models.CharField(max_length=200)

    # objects = UserManager()

    USERNAME_FIELD = 'username'

    def __str__(self):
        return self.username
    
    def has_perm(self, perm, obj=None):
        return True

    # class User(models.Model):
    # id = models.AutoField(primary_key=True)
    # name = models.CharField(max_length = 20)
    # password = models.CharField(max_length=200)