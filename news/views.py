from django.shortcuts import render, redirect, get_list_or_404, get_object_or_404
from django.template import loader
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth import login, logout
from .forms import SignUpForm
from django.views import View
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required, permission_required
from django.contrib.auth.models import Group, User
from rest_framework.status import HTTP_200_OK
from rest_framework import mixins
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import CustomUser, PhonesOfClient

def main_page(request):
    return render(
        request, 
        "news/index.html",
    )

def connect_with_us(request):
    if request.method == "POST":
        phone = request.POST.get("phone", "")
        client_phone = PhonesOfClient.objects.create(phone=phone)
    return redirect(reverse("news:main"))


