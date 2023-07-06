# urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path("admin/", admin.site.urls),
    path('', include('Page.urls')),
    path('Ai/', include('Ai.urls')),
    path('post/', include('post.urls')),
    path('Voice/', include('Voice.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)