from django.core.management.base import BaseCommand
from main.models import Skill, Project, Experience, Blog

class Command(BaseCommand):
    help = 'Load sample data'

    def handle(self, *args, **options):
        # Add skills
        skills_data = [
            {'name': 'HTML', 'category': 'frontend', 'proficiency': 95},
            {'name': 'CSS', 'category': 'frontend', 'proficiency': 93},
            {'name': 'JavaScript', 'category': 'frontend', 'proficiency': 90},
            {'name': 'React', 'category': 'frontend', 'proficiency': 89},
            {'name': 'React Native', 'category': 'frontend', 'proficiency': 94},
            {'name': 'Python', 'category': 'backend', 'proficiency': 99},
            {'name': 'Django', 'category': 'backend', 'proficiency': 96},
            {'name': 'Java', 'category': 'backend', 'proficiency': 60},
            {'name': 'SQL', 'category': 'database', 'proficiency': 88},
            {'name': 'Figma', 'category': 'tools', 'proficiency': 90},
            {'name': 'Power BI', 'category': 'tools', 'proficiency': 80},
        ]

        for skill_data in skills_data:
            Skill.objects.update_or_create(
                name=skill_data['name'],
                category=skill_data['category'],
                defaults={'proficiency': skill_data['proficiency']},
            )

        self.stdout.write(self.style.SUCCESS('Skills added successfully'))

        # Add projects
        projects_data = [
            {
                'title': 'Blog Nepal',
                'description': 'Built a full-stack blog application with CRUD operations, Django admin integration, dynamic content rendering, and mobile-responsive UI.',
                'technologies': 'Django, Python, HTML, CSS, JavaScript',
                'github_link': 'https://github.com/Kaushal164/Blog-Nepal'
            },
            {
                'title': 'Weather-Detector',
                'description': 'A simple weather detector app that provides real-time weather updates based on user location.',
                'technologies': 'Python, Django, OpenWeatherMap API integration',
                'github_link': 'https://github.com/Kaushal164/Weather-Detector'
            },
            {
                'title': 'Food Delivery App',
                'description': 'Developed frontend, implemented API integration, cart management and delivery functionality.',
                'technologies': 'React.js, JavaScript, CSS',
                'github_link': 'https://github.com/Kaushal164/Django-REST-Framework'
            },
            {
                'title': 'Booking System',
                'description': 'Developed a booking system with user authentication, CRUD operations, and an interactive dashboard for efficient resource allocation.',
                'technologies': 'Django, Python, SQL',
                'github_link': 'https://github.com/Kaushal164/Booking-App'
            },
            {
                'title': 'Real-Time Chat Application',
                'description': 'Developed a real-time messaging platform with user authentication, WebSocket-based communication, and responsive UI for seamless interaction.',
                'technologies': 'Django, WebSocket, JavaScript',
                'github_link': 'https://github.com/Kaushal164/real-time-chat-application'
            },
            {
                'title': 'Inventory Management Software',
                'description': 'A desktop inventory application with user login, products and services, sales and purchases with line items, automatic stock updates, and a reports dashboard with CSV/PDF export — built for small businesses using an offline SQLite database.',
                'technologies': 'Python, PyQt6, SQLite',
                'github_link': 'https://github.com/Kaushal164/Inventory-Management-Software'
            },
        ]

        for project_data in projects_data:
            Project.objects.get_or_create(**project_data)

        self.stdout.write(self.style.SUCCESS('Projects added successfully'))

        # Add experience
        experiences_data = [
            {
                'company': 'Morgan International School Nepal',
                'position': 'Lecturer',
                'start_date': '2026-01-01',
                'current': True,
                'description': 'Teaching: Higher secondary courses in computer science, including programming and web development. Assessment: Designed exams, assignments, and supervised lab sessions. Instruction: Delivered engaging lectures and practical demonstrations.'
            },
            {
                'company': 'Saint Louis University Remote',
                'position': 'Data Analyst Associate Intern',
                'start_date': '2025-01-01',
                'end_date': '2025-12-31',
                'description': 'Data Cleaning: Prepared raw datasets for analysis. Visualization: Built dashboards using Excel, Power BI and Tableau. EDA: Conducted exploratory data analysis and presented insights. Reporting: Created final reports and presentation materials.'
            },
            {
                'company': 'Augusta Institute of Technology Nepal',
                'position': 'IT Instructor',
                'start_date': '2025-01-01',
                'end_date': '2025-12-31',
                'description': 'Training: Coached newly-hired IT specialists on advanced technical procedures. Support: Assisted clients with diagnosis of software and hardware issues and concerns.'
            },
            {
                'company': 'BINET Technologies Pvt. Ltd. Nepal',
                'position': 'Sr. Front-End Developer (Intern)',
                'start_date': '2024-01-01',
                'end_date': '2024-12-31',
                'description': 'Web Development: Developed responsive jewelry website using React, HTML, CSS and JavaScript. Features: Implemented product zoom, 360° views and chat using Socket.io for real-time communication.'
            },
            {
                'company': 'OSM HACKFEST 2023- CHITWAN REGION Nepal',
                'position': 'Hackathon (Participant)',
                'start_date': '2023-01-01',
                'end_date': '2023-12-31',
                'description': 'Mobile Development: Developed a prototype using OpenStreetMap data to identify and visualize accident-prone areas in React Native. Design: UI/UX design to showing Open Street Map using Figma.'
            },
            {
                'company': 'Digital Yeti Pvt. Ltd. Nepal',
                'position': 'Web Developer (Trainee)',
                'start_date': '2023-01-01',
                'end_date': '2023-12-31',
                'description': 'Frontend Development: Collaborated with UI designer to build a Gym website frontend using Bootstrap and implemented DOM manipulation for interactive features. React Development: Integrated Axios for API communication and utilized React Hooks for state management. Mobile Development: Developed and maintained mobile applications using React Native.'
            },
            {
                'company': 'Augusta Institute of Technology Nepal',
                'position': 'Digital Marketing',
                'start_date': '2021-01-01',
                'end_date': '2021-12-31',
                'description': 'Professional Training: Gained hands-on knowledge in Digital Marketing, Website Planning and Development, UI/UX design, SEO, Web Analytics, SEM, Social Media Marketing, CRO, AdSense, Blogging, Affiliate Marketing, and Managerial Skills.'
            },
        ]

        for exp_data in experiences_data:
            Experience.objects.get_or_create(**exp_data)

        self.stdout.write(self.style.SUCCESS('Experience added successfully'))

        # Add blog posts
        blogs_data = [
            {
                'title': 'Building a Django Blog for Nepal',
                'slug': 'building-a-django-blog-for-nepal',
                'excerpt': 'How I built a full-stack blog application with Django, admin tools, and responsive design.',
                'content': '''<h2>Project Overview</h2>
<p>This blog project was built with Django and includes CRUD operations, admin management, and mobile-friendly pages.</p>

<h2>Key Features</h2>
<ul>
<li>User-generated posts</li>
<li>Admin content management</li>
<li>Responsive layout and modern UI</li>
</ul>

<h2>Technologies</h2>
<p>Django, HTML, CSS, JavaScript, SQLite</p>''',
                'published': True
            },
            {
                'title': 'Building a Booking System with Django',
                'slug': 'building-booking-system-with-django',
                'excerpt': 'A complete guide to building a booking system with user authentication, CRUD operations, and interactive dashboard.',
                'content': '''<h2>Project Overview</h2>
<p>I built a full-featured booking system using Django with comprehensive features for resource management and user interaction.</p>

<h2>Key Features</h2>
<ul>
<li>User authentication and authorization</li>
<li>Complete CRUD operations for bookings</li>
<li>Interactive admin dashboard</li>
<li>Real-time availability tracking</li>
<li>Mobile-responsive design</li>
</ul>

<h2>Technologies</h2>
<p>Django, Python, PostgreSQL, HTML, CSS, JavaScript</p>''',
                'published': True
            },
            {
                'title': 'Hackathon Prototype with OpenStreetMap',
                'slug': 'hackathon-prototype-with-openstreetmap',
                'excerpt': 'A React Native prototype using OpenStreetMap data to identify accident-prone areas.',
                'content': '''<h2>Hackathon Project</h2>
<p>Built a mobile solution for visualizing accident-prone areas using OpenStreetMap and React Native.</p>

<h2>Highlights</h2>
<ul>
<li>Map-based prototype</li>
<li>Interactive UI designed in Figma</li>
<li>Data visualization for safety insights</li>
</ul>''',
                'published': True
            },
        ]

        for blog_data in blogs_data:
            Blog.objects.get_or_create(**blog_data)

        self.stdout.write(self.style.SUCCESS('Blog posts added successfully'))