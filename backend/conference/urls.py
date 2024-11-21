"""conference URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions
from django.views.generic import TemplateView



urlpatterns = [
    path('admin/', admin.site.urls),
    # Api v1 urls
    path('api/v1/accounts/', include(('user.api.v1.urls', 'accounts_api_v1'), namespace='accounts_api_v1')),
    path('api/v1/events/', include(('event.api.v1.urls', 'events_api_v1'), namespace='events_api_v1')),
]


if settings.DEBUG:
    # The configuration for Swagger UI
    schema_view = get_schema_view(
        openapi.Info(
            title = "INTERNATIONAL CONFERENCE API",
            default_version = '2024',
            description = "CONFERENCE API",
        ),
        public = True,
        permission_classes=(permissions.AllowAny,),
    )

    urlpatterns += [
        path('api/docs/', schema_view.with_ui('swagger', cache_timeout = 0), name = 'schema-swagger-ui')
    ]



# serve REACT frontend
urlpatterns +=  [
    path("", TemplateView.as_view(template_name='index.html')),
    re_path(r"^(?P<path>.*)$", TemplateView.as_view(template_name='index.html')),
]
