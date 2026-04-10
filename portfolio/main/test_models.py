from django.test import TestCase, Client
from django.urls import reverse
from .models import Project, Skill, Experience, Blog, Contact
from rest_framework.test import APIClient
import json


class ProjectModelTest(TestCase):
    def setUp(self):
        self.project = Project.objects.create(
            title='Test Project',
            description='Test Description',
            technologies='Django, React',
            github_link='https://github.com/test/project'
        )

    def test_project_creation(self):
        self.assertTrue(isinstance(self.project, Project))
        self.assertEqual(self.project.title, 'Test Project')

    def test_project_string_representation(self):
        self.assertEqual(str(self.project), 'Test Project')


class SkillModelTest(TestCase):
    def setUp(self):
        self.skill = Skill.objects.create(
            name='Python',
            category='backend',
            proficiency=99
        )

    def test_skill_creation(self):
        self.assertTrue(isinstance(self.skill, Skill))
        self.assertEqual(self.skill.name, 'Python')
        self.assertEqual(self.skill.proficiency, 99)

    def test_skill_category_choices(self):
        self.assertEqual(self.skill.category, 'backend')


class ExperienceModelTest(TestCase):
    def setUp(self):
        from datetime import date
        self.experience = Experience.objects.create(
            company='Tech Company',
            position='Developer',
            start_date=date(2020, 1, 1),
            description='Test Experience',
            current=True
        )

    def test_experience_creation(self):
        self.assertTrue(isinstance(self.experience, Experience))
        self.assertEqual(self.experience.company, 'Tech Company')
        self.assertTrue(self.experience.current)


class BlogModelTest(TestCase):
    def setUp(self):
        self.blog = Blog.objects.create(
            title='Test Blog',
            slug='test-blog',
            content='Test Content',
            excerpt='Test Excerpt',
            published=True
        )

    def test_blog_creation(self):
        self.assertTrue(isinstance(self.blog, Blog))
        self.assertEqual(self.blog.title, 'Test Blog')
        self.assertTrue(self.blog.published)

    def test_blog_slug(self):
        self.assertEqual(self.blog.slug, 'test-blog')


class ContactModelTest(TestCase):
    def setUp(self):
        self.contact = Contact.objects.create(
            name='Kaushal Acharya',
            email='kaushal.acharya1999@gmail.com',
            subject='Test Subject',
            message='Test Message'
        )

    def test_contact_creation(self):
        self.assertTrue(isinstance(self.contact, Contact))
        self.assertEqual(self.contact.name, 'Kaushal Acharya')
        self.assertEqual(self.contact.email, 'kaushal.acharya1999@gmail.com')


class ViewsTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.project = Project.objects.create(
            title='Test Project',
            description='Test Description'
        )
        self.skill = Skill.objects.create(
            name='Test Skill',
            category='other'
        )
        self.blog = Blog.objects.create(
            title='Test Blog',
            slug='test-blog',
            content='Test Content',
            published=True
        )

    def test_home_view(self):
        response = self.client.get(reverse('home'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'main/home.html')
        self.assertIn('projects', response.context)
        self.assertIn('skills', response.context)

    def test_blog_detail_view(self):
        response = self.client.get(reverse('blog_detail', args=['test-blog']))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'main/blog_detail.html')

    def test_contact_form_submission(self):
        response = self.client.post(reverse('contact'), {
            'name': 'Test User',
            'email': 'test@example.com',
            'subject': 'Test Subject',
            'message': 'Test Message'
        })
        self.assertEqual(response.status_code, 200)
        self.assertTrue(Contact.objects.count() > 0)


class APITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.project = Project.objects.create(
            title='API Test Project',
            description='API Test Description'
        )
        self.skill = Skill.objects.create(
            name='API Test Skill',
            category='backend'
        )

    def test_projects_api(self):
        response = self.client.get('/api/projects/')
        self.assertEqual(response.status_code, 200)
        self.assertGreater(len(response.data), 0)

    def test_skills_api(self):
        response = self.client.get('/api/skills/')
        self.assertEqual(response.status_code, 200)
        self.assertGreater(len(response.data), 0)

    def test_project_detail_api(self):
        response = self.client.get(f'/api/projects/{self.project.id}/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['title'], 'API Test Project')

    def test_skill_detail_api(self):
        response = self.client.get(f'/api/skills/{self.skill.id}/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['name'], 'API Test Skill')