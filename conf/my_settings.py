#my_settings.py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql', #1
        'NAME': 'test', #2
        'USER': 'root', #3                      
        'PASSWORD': 'password',  #4              
        'HOST': 'localhost',   #5                
        'PORT': '3306', #6
    }
}
SECRET_KEY ='기존 settings.py에 있던 시크릿키를 붙여넣는다'