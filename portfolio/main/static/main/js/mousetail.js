// Mouse Tracking and Glow Effects

// Initialize mouse tracking and glow effect
function initMouseTracking() {
    let mouseX = 0;
    let mouseY = 0;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Update CSS variables for background gradient tracking
        document.documentElement.style.setProperty('--mouse-x', mouseX + 'px');
        document.documentElement.style.setProperty('--mouse-y', mouseY + 'px');
    });
}

// Add glow effect to elements on hover
function initElementGlow() {
    // Add glow-on-hover to interactive elements
    const glowElements = document.querySelectorAll(
        '.card, .btn, .project-card, .stat-card, .skill-item, .social-links a'
    );

    glowElements.forEach((element) => {
        element.classList.add('glow-on-hover');
    });
}

// Smooth cursor tracking with parallax effect
function initParallaxCursor() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        parallaxElements.forEach((element) => {
            const parallaxValue = parseFloat(element.getAttribute('data-parallax')) || 0.1;
            const moveX = (mouseX / window.innerWidth) * 20 * parallaxValue;
            const moveY = (mouseY / window.innerHeight) * 20 * parallaxValue;

            element.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
}

// Add ripple effect on click
function initRippleEffect() {
    const rippleElements = document.querySelectorAll('.btn, .card, .social-links a');

    rippleElements.forEach((element) => {
        element.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            const ripple = document.createElement('span');
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            // Remove previous ripple if exists
            const previousRipple = this.querySelector('.ripple');
            if (previousRipple) {
                previousRipple.remove();
            }

            this.appendChild(ripple);

            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Dynamic background particle effect on mouse movement
function initDynamicParticles() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    document.body.insertBefore(canvas, document.body.firstChild);

    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];

    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 2;
            this.speedY = (Math.random() - 0.5) * 2;
            this.opacity = Math.random() * 0.5 + 0.3;
            this.life = 1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life -= 0.01;
            this.opacity = this.life * 0.5;
        }

        draw(isDark) {
            if (isDark) {
                ctx.fillStyle = `rgba(37, 99, 235, ${this.opacity})`;
            } else {
                ctx.fillStyle = `rgba(37, 99, 235, ${this.opacity * 0.6})`;
            }
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Create particles on mouse move
    document.addEventListener('mousemove', (e) => {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        
        // Add new particles occasionally
        if (Math.random() > 0.85) {
            for (let i = 0; i < 2; i++) {
                particles.push(new Particle(e.clientX, e.clientY));
            }
        }
    });

    // Animation loop
    function animate() {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles = particles.filter((p) => p.life > 0);

        particles.forEach((particle) => {
            particle.update();
            particle.draw(isDark);
        });

        animationId = requestAnimationFrame(animate);
    }

    animate();
}

// Smooth hover transitions for elements
function initSmoothHoverTransition() {
    const hoverElements = document.querySelectorAll('.card, .project-card, .stat-card, .btn');

    hoverElements.forEach((element) => {
        element.addEventListener('mouseenter', function () {
            this.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });

        element.addEventListener('mouseleave', function () {
            this.style.transition = 'all 0.3s ease';
        });
    });
}

// Initialize all mouse effects
function initAllMouseEffects() {
    initMouseTracking();
    initElementGlow();
    initParallaxCursor();
    initRippleEffect();
    initDynamicParticles();
    initSmoothHoverTransition();
}

// Run on DOM load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllMouseEffects);
} else {
    initAllMouseEffects();
}
