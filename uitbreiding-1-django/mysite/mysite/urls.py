from django.contrib import admin
from django.urls import path, include
from agenda import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('index/', views.home, name='home'),
    path('over-ons/', views.over_ons, name='over-ons'),
    path('tarieven/', views.tarieven, name='tarieven'),
    path('contact/', views.contact, name='contact'),
    path('agenda/', include('agenda.urls')),
    path('blog/', views.blog, name='blog'),

]
