# Professional Portfolio Website

A modern, fully-featured portfolio website built with Django and featuring advanced UI/UX design, REST API, blog system, dark mode, and animations.

## Features

### ✨ Core Features
- **Hero Section** - Eye-catching introduction
- **About Me** - Professional biography
- **Skills Section** - Organized by category with proficiency levels
- **Projects Showcase** - Featured projects with GitHub/Live links
- **Experience Timeline** - Professional work history
- **Blog System** - Write and publish blog articles
- **Contact Form** - Direct message functionality
- **Resume/CV** - Downloadable PDF

### 🎨 UI/UX Features
- **Dark/Light Mode** - Toggle between themes
- **Smooth Animations** - AOS (Animate On Scroll) library
- **Responsive Design** - Mobile-first approach
- **Professional Design** - Modern color scheme and typography
- **Hover Effects** - Interactive elements
- **Scroll Progress Bar** - Visual indication of page progress

### 🔧 Technical Features
- **REST API** - Django REST Framework endpoints
- **Unit Tests** - Comprehensive test coverage
- **Admin Panel** - Easy content management
- **Database Models** - Scalable data structure
- **SEO Optimized** - Meta tags and structured data
- **Fast Loading** - Optimized static files
- **CORS Support** - Cross-origin requests

## Installation

### Prerequisites
- Python 3.8+
- pip
- virtualenv (optional but recommended)

### Setup

1. **Clone and Navigate**
```bash
cd portfolio
```

2. **Create Virtual Environment**
```bash
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # macOS/Linux
```

3. **Install Dependencies**
```bash
pip install -r requirements.txt
```

4. **Run Migrations**
```bash
python manage.py migrate
```

5. **Load Sample Data**
```bash
python manage.py load_sample_data
```

6. **Create Admin User**
```bash
python manage.py createsuperuser
```

7. **Run Development Server**
```bash
python manage.py runserver
```

8. **Access the Site**
- Portfolio: http://localhost:8000
- Admin: http://localhost:8000/admin

## Project Structure

```
portfolio/
├── main/
│   ├── models.py           # Database models
│   ├── views.py            # Views and API endpoints
│   ├── serializers.py      # DRF serializers
│   ├── admin.py            # Admin configuration
│   ├── urls.py             # URL routing
│   ├── tests.py            # Unit tests
│   ├── static/
│   │   ├── css/
│   │   │   ├── style.css       # Main styles
│   │   │   └── animations.css  # Animation styles
│   │   └── js/
│   │       ├── script.js       # Main JS
│   │       └── advanced.js     # Advanced features
│   └── templates/
│       ├── home.html       # Main portfolio page
│       └── blog_detail.html # Blog post page
├── portfolio/
│   ├── settings.py         # Django settings
│   ├── urls.py            # Main URL config
│   └── wsgi.py            # WSGI configuration
├── manage.py
└── requirements.txt
```

## API Endpoints

### Projects
- `GET /api/projects/` - List all projects
- `GET /api/projects/{id}/` - Get project details
- `POST /api/projects/` - Create new project (admin only)
- `PUT /api/projects/{id}/` - Update project (admin only)
- `DELETE /api/projects/{id}/` - Delete project (admin only)

### Skills
- `GET /api/skills/` - List all skills
- `GET /api/skills/{id}/` - Get skill details

### Experiences
- `GET /api/experiences/` - List all experiences
- `GET /api/experiences/{id}/` - Get experience details

### Blogs
- `GET /api/blogs/` - List published blogs
- `GET /api/blogs/{id}/` - Get blog details

### Pages
- `GET /` - Home page
- `GET /blog/<slug>/` - Blog post detail
- `GET /resume/pdf/` - Download resume PDF
- `POST /contact/` - Submit contact form

## Customization

### Update Personal Information
Edit `main/templates/home.html`:
- Change name and title in Hero section
- Update social media links
- Modify contact email

### Add/Edit Content
Use Django Admin panel:
1. Go to http://localhost:8000/admin
2. Add Projects, Skills, Experience, and Blog posts
3. Changes reflect immediately on the site

### Styling
- `static/main/css/style.css` - Main styles
- `static/main/css/animations.css` - Animations
- CSS variables at the top of style.css for easy customization

### Dark Mode
- Controlled via `data-theme` attribute
- Automatic toggle button in header
- Preference saved to localStorage

## Deployment

### Using Gunicorn (Production)

1. **Install Gunicorn**
```bash
pip install gunicorn
```

2. **Create gunicorn_config.py**
```python
workers = 4
worker_class = "sync"
bind = "0.0.0.0:8000"
```

3. **Run Gunicorn**
```bash
gunicorn -c gunicorn_config.py portfolio.wsgi
```

### Using Heroku

1. **Create Procfile**
```
web: gunicorn portfolio.wsgi
```

2. **Create requirements.txt**
```bash
pip freeze > requirements.txt
```

3. **Deploy**
```bash
heroku login
heroku create your-app-name
git push heroku main
```

### Using PythonAnywhere

1. Go to pythonanywhere.com
2. Create account and add web app
3. Upload files
4. Configure web app settings
5. Set WSGI configuration

## Testing

Run all tests:
```bash
python manage.py test main -v 2
```

Run specific test:
```bash
python manage.py test main.test_models.ProjectModelTest
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance Optimization

### Implemented
- Minified CSS/JS
- Image optimization
- Caching headers
- Database query optimization
- Lazy loading for images

### Recommendations
- Use CDN for static files
- Enable compression (gzip)
- Implement caching (Redis)
- Monitor with analytics tools

## Security

### Implemented
- CSRF Protection
- SQL Injection Prevention
- XSS Protection
- CORS Configuration
- Secure headers

### Recommendations
- Enable HTTPS
- Use environment variables for secrets
- Regular security updates
- Implement rate limiting

## Troubleshooting

### Issue: Templates not found
**Solution:** Run `python manage.py collectstatic`

### Issue: Static files not loading
**Solution:** Check `STATIC_URL` and `STATIC_ROOT` in settings.py

### Issue: Database errors
**Solution:** Run `python manage.py migrate`

### Issue: 404 on admin
**Solution:** Ensure URLs are properly configured

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

This project is licensed under the MIT License - see LICENSE file for details.

## Support

For issues and questions:
- Email: john.anderson@studio.com
- GitHub: https://github.com/john-anderson-design
- LinkedIn: https://linkedin.com/in/johnandersondesign

---

**Made with ❤️ using Django**