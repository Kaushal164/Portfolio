from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'projects', views.ProjectViewSet)
router.register(r'skills', views.SkillViewSet)
router.register(r'experiences', views.ExperienceViewSet)
router.register(r'blogs', views.BlogViewSet)

urlpatterns = [
    path('', views.home, name='home'),
    path('contact/', views.contact, name='contact'),
    path('blog/<slug:slug>/', views.blog_detail, name='blog_detail'),
    path('resume/pdf/', views.resume_pdf, name='resume_pdf'),
    path('api/', include(router.urls)),
]