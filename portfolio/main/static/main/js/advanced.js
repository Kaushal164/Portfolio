// Advanced Features and Utilities

// Scroll Progress Bar
function initScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (!scrollProgress) {
        const progress = document.createElement('div');
        progress.className = 'scroll-progress';
        document.body.appendChild(progress);
    }
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        document.querySelector('.scroll-progress').style.width = scrollPercent + '%';
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const backdrop = document.querySelector('.backdrop');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            backdrop.classList.toggle('active');
        });
    }
    
    if (backdrop) {
        backdrop.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            backdrop.classList.remove('active');
        });
    }
}

// Lazy Loading Images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Smooth Scroll for Hash Links
function initSmoothScroll() {
    document.querySelectorAll('a[href*="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Typewriter Effect
function typewriterEffect(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Counter Animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function count() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(count);
        } else {
            element.textContent = target;
        }
    }
    count();
}

// Form Validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input:required, textarea:required');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Local Storage Utilities
const storage = {
    set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
    get: (key) => JSON.parse(localStorage.getItem(key)),
    remove: (key) => localStorage.removeItem(key),
    clear: () => localStorage.clear()
};

// API Utilities
async function apiCall(url, options = {}) {
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]')?.value || ''
        }
    };
    
    try {
        const response = await fetch(url, { ...defaultOptions, ...options });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Debounce Function
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Throttle Function
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Toast Notification
function showToast(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    const style = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background-color: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
        color: white;
        border-radius: 5px;
        z-index: 10000;
        animation: slideInUp 0.3s ease;
    `;
    
    toast.setAttribute('style', style);
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideInUp 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    initScrollProgress();
    initMobileMenu();
    lazyLoadImages();
    initSmoothScroll();
});