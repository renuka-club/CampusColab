from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from django.views.static import serve  # THIS WAS MISSING
from django.conf import settings

def health_check(request):
    return JsonResponse({"status": "running"})

urlpatterns = [
    path("", health_check),
    path("admin/", admin.site.urls),
    path("api/", include("connect.urls")),
]

# Media serving for both development and production
urlpatterns += [
    path('media/<path:path>', serve, {'document_root': settings.MEDIA_ROOT}),
]

# Static files in development
if settings.DEBUG:
    from django.conf.urls.static import static
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
