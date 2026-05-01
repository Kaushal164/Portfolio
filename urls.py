from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, SkillViewSet, ExperienceViewSet

router = DefaultRouter()
router.register('project', ProjectViewSet)
router.register('skill', SkillViewSet)
router.register('experience', ExperienceViewSet)

urlpatterns = [
    path('', include(router.urls)),
]