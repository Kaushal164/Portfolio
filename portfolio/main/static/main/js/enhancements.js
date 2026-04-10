// ==========================================
// ADVANCED PORTFOLIO ENHANCEMENTS
// ==========================================

// 1. COUNTER ANIMATION FOR STATS
const animateCounters = () => {
    const statCards = document.querySelectorAll('.stat-card');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const number = entry.target.querySelector('.stat-number');
                const value = parseInt(entry.target.getAttribute('data-stat-value'));
                const duration = 2000;
                const increment = value / (duration / 16);
                
                let current = 0;
                const counter = setInterval(() => {
                    current += increment;
                    if (current >= value) {
                        number.textContent = value + '+';
                        clearInterval(counter);
                        entry.target.classList.add('counted');
                    } else {
                        number.textContent = Math.floor(current) + '+';
                    }
                }, 16);
            }
        });
    }, { threshold: 0.5 });
    
    statCards.forEach(card => counterObserver.observe(card));
};

// 2. SMOOTH SCROLL WITH OFFSET FOR FIXED HEADER
const scrollToSection = (e) => {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }
};

// 3. PARALLAX SCROLLING EFFECT
const parallaxEffect = () => {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
            const scrollPosition = window.pageYOffset;
            const speed = element.getAttribute('data-parallax') || 0.5;
            element.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    });
};

// 3a. SUBTLE MOUSE-RESPONSIVE BACKGROUND MOVEMENT
const setupMouseBackground = () => {
    const root = document.documentElement;

    window.addEventListener('pointermove', (e) => {
        const x = e.clientX / window.innerWidth * 100;
        const y = e.clientY / window.innerHeight * 100;
        root.style.setProperty('--mouse-x', `${x}%`);
        root.style.setProperty('--mouse-y', `${y}%`);
    });
};

// 3b. SIMPLE CURSOR GLOW (small, subtle)
const setupCursorGlow = () => {
    // Avoid duplicate initialization
    if (document.querySelector('.cursor-glow')) return;

    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);

    let rafId = null;
    let x = 0;
    let y = 0;

    const update = () => {
        rafId = null;
        glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    window.addEventListener('pointermove', (e) => {
        // Position at cursor (CSS handles centering)
        x = e.clientX;
        y = e.clientY;
        if (!rafId) rafId = requestAnimationFrame(update);
        glow.classList.add('active');
    });

    window.addEventListener('pointerleave', () => {
        glow.classList.remove('active');
    });
};

// 4. ENHANCED SKILL BARS WITH ANIMATION
const animateSkillBars = () => {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const skillFill = entry.target.querySelector('.skill-fill');
                const proficiency = skillFill ? skillFill.style.width : '0%';
                
                skillFill.style.width = '0%';
                skillFill.style.transition = 'width 1.5s ease-out';
                
                setTimeout(() => {
                    skillFill.style.width = proficiency;
                }, 50);
                
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.3 });
    
    skillItems.forEach(item => skillObserver.observe(item));
};

// 5. PROJECT CARD HOVER EFFECTS
const enhanceProjectCards = () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        // Add stagger effect
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Enhanced hover effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
            this.style.boxShadow = '0 30px 60px rgba(37, 99, 235, 0.3)';
            this.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        });
    });
};

// 6. SCROLL PROGRESS BAR ANIMATION
const updateScrollProgress = () => {
    const scrollProgress = document.querySelector('.scroll-progress');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        if (scrollProgress) {
            scrollProgress.style.width = scrollPercent + '%';
        }
    });
};

// 7. ACTIVE NAVIGATION LINK HIGHLIGHTING
const highlightActiveNav = () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
};

// 8. FORM VALIDATION AND SUBMISSION
const enhanceContactForm = () => {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = form.querySelector('#name').value;
            const email = form.querySelector('#email').value;
            const subject = form.querySelector('#subject').value;
            const message = form.querySelector('#message').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill all fields');
                return;
            }
            
            // Add loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Submit form
            fetch(form.action || window.location.pathname, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    submitBtn.textContent = '✓ Sent Successfully!';
                    form.reset();
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }, 2000);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }
};

// 9. KEYBOARD SHORTCUTS
const setupKeyboardShortcuts = () => {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K to focus search (if we add it later)
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            // Focus search input if exists
        }
        
        // Escape to close any modals
        if (e.key === 'Escape') {
            // Close any open modals
        }
    });
};

// 10. SMOOTH PAGE LOAD ANIMATION
const pageLoadAnimation = () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.8s ease-in';
    }, 100);
};

// 11. INTERACTIVE SOCIAL LINKS WITH RIPPLE EFFECT
const addRippleEffect = () => {
    const socialLinks = document.querySelectorAll('.social-links a, .hero-actions a, .btn');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const x = e.clientX - this.getBoundingClientRect().left;
            const y = e.clientY - this.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
};

// 12. LAZY LOAD IMAGES
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
};

// 13. SCROLL REVEAL WITH STAGGERED ANIMATIONS
const setupScrollReveal = () => {
    const revealElements = document.querySelectorAll('.card, .project-card, .stat-card');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('revealed')) {
                entry.target.classList.add('revealed');
                entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(el => revealObserver.observe(el));
};

// 15. DYNAMIC SKILL FILTER
function setupSkillFilter() {
    const skillItems = document.querySelectorAll('.skill-item');
    const categories = ['frontend', 'backend', 'database', 'tools'];

    // Add filtering capability (if needed)
    window.filterSkills = (category) => {
        skillItems.forEach(item => {
            const cat = item.getAttribute('data-category');
            item.style.opacity = category === 'all' || cat === category ? '1' : '0.3';
            item.style.transition = 'opacity 0.3s ease';
        });
    };
}
const setupSkillFilter = () => {
    const skillItems = document.querySelectorAll('.skill-item');
    const categories = ['frontend', 'backend', 'database', 'tools'];
    
    // Add filtering capability (if needed)
    window.filterSkills = (category) => {
        skillItems.forEach(item => {
            const cat = item.getAttribute('data-category');
            item.style.opacity = category === 'all' || cat === category ? '1' : '0.3';
            item.style.transition = 'opacity 0.3s ease';
        });
    };
};

// 16. BACKGROUND PARTICLE MOVEMENT
const createBackgroundParticles = () => {
    const particleCount = 18;
    const container = document.createElement('div');
    container.id = 'background-particles';

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'background-particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 8}s`;
        particle.style.animationDuration = `${10 + Math.random() * 10}s`;
        particle.style.opacity = `${0.25 + Math.random() * 0.5}`;
        particle.style.transform = `scale(${0.75 + Math.random() * 0.7})`;
        container.appendChild(particle);
    }

    document.body.appendChild(container);
};

// 17. TYPED ROLE ROTATION
const typewriterEffect = () => {
    const typedText = document.querySelector('.typed-text');
    if (!typedText) return;

    const roles = typedText.getAttribute('data-roles')?.split('|').filter(Boolean) || ['Software Developer', 'Backend Developer', 'Data Analyst'];
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let currentText = '';

    const type = () => {
        const role = roles[roleIndex];

        if (!deleting) {
            currentText = role.slice(0, charIndex + 1);
            typedText.textContent = currentText;
            charIndex++;

            if (charIndex === role.length) {
                deleting = true;
                setTimeout(type, 1500);
                return;
            }
        } else {
            currentText = role.slice(0, charIndex - 1);
            typedText.textContent = currentText;
            charIndex--;

            if (charIndex === 0) {
                deleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }
        }

        const delay = deleting ? 60 : 90;
        setTimeout(type, delay);
    };

    type();
};

// ==========================================
// INITIALIZE ALL ENHANCEMENTS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    pageLoadAnimation();
    animateCounters();
    animateSkillBars();
    enhanceProjectCards();
    updateScrollProgress();
    highlightActiveNav();
    enhanceContactForm();
    setupKeyboardShortcuts();
    addRippleEffect();
    lazyLoadImages();
    setupScrollReveal();
    typewriterEffect();
    setupSkillFilter();
    parallaxEffect();
    setupMouseBackground();
    setupCursorGlow();
    createBackgroundParticles();
    
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', scrollToSection);
    });
});

// Page visibility API to pause animations when tab is not active
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden
    } else {
        // Page is visible
    }
});
