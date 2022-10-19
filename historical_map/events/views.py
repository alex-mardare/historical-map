from django.http import HttpResponse

# Create your views here.
def test_home(request):
    return HttpResponse('Historical Map WIP')