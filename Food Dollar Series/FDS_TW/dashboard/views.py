from django.shortcuts import render
from .models import Year, IndustryCrossPrimary

# Create your views here.
def home(request):
    year = Year.objects.order_by('-Year').first()
    return render(request, "home.html", context = {'objects':{'latestPriodData': year,'nextPeriodData':year.Year+5,'nextDataReleasedTime':year.Year+8}})

def background(request):
    return render(request, "background.html")

def glossary(request):
    return render(request, 'glossary.html')

def download(request):
    return render(request, 'download.html')

def documentation(request):
    year = Year.objects.order_by('-Year').first()
    cross_table = IndustryCrossPrimary.objects.all() 
    # return render(request, "documentation.html", context = {'objects':{'year': year,'nextPeriodData':year.year+5,
    #                                                                    'cross_table': cross_table,}})
    return render(request, "documentation.html", context = {'objects':{'year': year,'nextPeriodData':year.Year+5},
                                                    'table_data': cross_table,})

def quickfacts(request):
    return render(request, "quickfact.html")