import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

# Initialize Django ASGI application early to ensure AppRegistry is populated
django_asgi_app = get_asgi_application()

application = ProtocolTypeRouter({
    "http": django_asgi_app,
    # Remove websocket if not needed or uncomment if using WebSockets
    # "websocket": AuthMiddlewareStack(URLRouter(websocket_urlpatterns)),
})
