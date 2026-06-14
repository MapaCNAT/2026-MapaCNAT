from django.http import HttpResponse
from django.template import loader
from django.shortcuts import redirect

def mapa(request):
    template = loader.get_template('mapa.html')
    return HttpResponse(template.render())

def home(request):
    return redirect("login")

def login(request):
    template = loader.get_template('login.html')
    return HttpResponse(template.render())