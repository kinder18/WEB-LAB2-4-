from django.contrib import admin
from django.urls import path, include
import rest_framework_simplejwt.views as jwt_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/account/', include('djoser.urls')),
    path('api/v1/auth/login/', jwt_views.TokenObtainPairView.as_view(), name='auth'),
    path('api/v1/auth/verify/', jwt_views.TokenVerifyView.as_view(), name='verify'),
    path('api/v1/auth/refresh/', jwt_views.TokenRefreshView.as_view(), name='refresh'),
    path('api/v1/app/', include("app.urls")),
]
