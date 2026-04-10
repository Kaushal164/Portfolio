// Dark/Light Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', currentTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update icon
        themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });
    
    // Set initial icon
    themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Animate on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Skill bars animation
const skillBars = document.querySelectorAll('.skill-fill');
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.style.width;
            entry.target.style.width = '0%';
            setTimeout(() => {
                entry.target.style.width = width;
            }, 100);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillsObserver.observe(bar);
});

// Contact form handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        
        try {
            const response = await fetch('/contact/', {
                method: 'POST',
                body: formData  // Send FormData directly, no Content-Type header needed
            });
            
            const result = await response.json();
            if (result.success) {
                alert(result.message || 'Message sent successfully!');
                contactForm.reset();
            } else {
                alert(result.message || 'Error sending message. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error sending message. Please try again.');
        }
    });
}

// GitHub stats integration (placeholder)
async function fetchGitHubStats() {
    try {
        const githubUser = window.USER_PROFILE?.github?.split('/').pop() || 'Kaushal164';
        const response = await fetch(`https://api.github.com/users/${githubUser}`);
        const data = await response.json();
        
        // Update DOM with stats
        document.getElementById('github-repos').textContent = data.public_repos;
        document.getElementById('github-followers').textContent = data.followers;
    } catch (error) {
        console.error('Error fetching GitHub stats:', error);
    }
}

// Call on page load
document.addEventListener('DOMContentLoaded', () => {
    // fetchGitHubStats(); // Uncomment when you have your GitHub username
});