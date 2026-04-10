from django.contrib import admin
from .models import Project, Skill, Experience, Blog, Contact

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'link', 'created_at')
    search_fields = ('title', 'description')

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'proficiency')
    list_filter = ('category',)

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('position', 'company', 'start_date', 'current')
    list_filter = ('current',)

@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ('title', 'published', 'created_at')
    list_filter = ('published',)
    prepopulated_fields = {'slug': ('title',)}

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'created_at')
    readonly_fields = ('created_at',)