from django.urls import path
from . import views

urlpatterns = [
    path('mapa/', views.mapa, name='mapa'),
    path('', views.home, name='home'),
]