from django.urls import path, include
from . import views

app_name = 'news'


urlpatterns = [
    path("main_page/", views.main_page, name="main"),
    path("connect_with_us/", views.connect_with_us, name="connect_with_us"),
    path("connect_with_us/", views.connect_with_us, name="connect_with_us")
]