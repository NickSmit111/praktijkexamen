from django.shortcuts import render
from .models import Activiteit

def agenda_overzicht(request):
    activiteiten = Activiteit.objects.order_by('datum', 'begin_tijd')
    return render(request, 'agenda/agenda.html', {'activiteiten': activiteiten})

def home(request):
    return render(request, 'index.html')

def over_ons(request):
    return render(request, 'over-ons.html')

def tarieven(request):
    return render(request, 'tarieven.html')

def contact(request):
    return render(request, 'contact.html')

def blog(request):
    return render(request, 'blog.html')