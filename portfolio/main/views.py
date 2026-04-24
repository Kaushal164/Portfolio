from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
from django.conf import settings
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Project, Skill, Experience, Blog, Contact
from .serializers import ProjectSerializer, SkillSerializer, ExperienceSerializer, BlogSerializer, ContactSerializer
from .profile import PROFILE
import json

# API ViewSets
class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

class ExperienceViewSet(viewsets.ModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer

class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.filter(published=True)
    serializer_class = BlogSerializer

# Main home view
def home(request):
    projects = Project.objects.all()
    # De-duplicate skills by name to avoid repeated entries (e.g., multiple "Django" rows)
    skills_qs = Skill.objects.all().order_by('name', '-proficiency', 'category')
    skills = []
    seen_names = set()
    for skill in skills_qs:
        key = (skill.name or "").strip().lower()
        if not key or key in seen_names:
            continue
        seen_names.add(key)
        skills.append(skill)
    experiences = Experience.objects.all().order_by('-start_date')
    blogs = Blog.objects.filter(published=True).order_by('-created_at')[:3]
    # Dynamic counts from CV
    return render(request, 'home.html', {
        'projects': projects,
        'skills': skills,
        'experiences': experiences,
        'blogs': blogs,
        'profile': PROFILE,
        'projects_count': 11,
        'roles_count': 8,
        'certifications_count': 18,
        'hackathon_count': 2,
    })

# Contact form view
def contact(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        message = request.POST.get('message')
        
        # Save to database
        Contact.objects.create(
            name=name,
            email=email,
            subject=subject,
            message=message
        )
        
       
        try:
            send_mail(
                f"Portfolio Contact: {subject}",
                f"From: {name} ({email})\n\nSubject: {subject}\n\nMessage:\n{message}",
                settings.DEFAULT_FROM_EMAIL,
                ['kaushal.acharya1999@gmail.com'],
            )
            return JsonResponse({'success': True, 'message': 'Message sent successfully!'})
        except Exception as e:
            print(f"Email sending failed: {e}")
            return JsonResponse({'success': False, 'message': 'Message saved but email failed to send.'})
        
    return JsonResponse({'success': False, 'message': 'Invalid request method.'})


def blog_detail(request, slug):
    blog = Blog.objects.get(slug=slug, published=True)
    return render(request, 'blog_detail.html', {'blog': blog, 'profile': PROFILE})


def resume_pdf(request):
    from django.http import FileResponse
    import os
    
    resume_path = os.path.join(os.path.dirname(__file__), 'static', 'main', 'resume', 'Kaushal_Acharya_Resume.pdf')
    
    if os.path.exists(resume_path):
        response = FileResponse(open(resume_path, 'rb'), content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="{PROFILE["name"].replace(" ", "_")}_Resume.pdf"'
        return response
    else:
        # Fallback if file doesn't exist
        from django.http import HttpResponse
        return HttpResponse('Resume file not found', status=404)
