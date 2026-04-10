// Hero interactions: typewriter effect, counters, and CTA scrolling

function initHeroTypewriter() {
    const textElement = document.querySelector('.typed-text');
    const phrases = ['Data Analyst', 'Front-End Developer', 'Machine Learning Enthusiast', 'Visualization Specialist'];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentText = '';

    if (!textElement) return;

    function type() {
        const fullText = phrases[phraseIndex];

        if (isDeleting) {
            currentText = fullText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            currentText = fullText.substring(0, charIndex + 1);
            charIndex++;
        }

        textElement.textContent = currentText;

        let delay = isDeleting ? 60 : 120;
        if (!isDeleting && currentText === fullText) {
            delay = 2200;
            isDeleting = true;
        } else if (isDeleting && currentText === '') {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            delay = 500;
        }

        setTimeout(type, delay);
    }

    type();
}

function animateHeroCounters() {
    const stats = [
        { selector: '#projects-count', target: 30 },
        { selector: '#experience-count', target: 8 },
        { selector: '#clients-count', target: 36 },
        { selector: '#awards-count', target: 10 }
    ];

    stats.forEach(({ selector, target }) => {
        const element = document.querySelector(selector);
        if (!element) return;

        let count = 0;
        const step = Math.ceil(target / 40);

        const observer = new IntersectionObserver((entries, obs) => {
            if (!entries[0].isIntersecting) return;
            const interval = setInterval(() => {
                count += step;
                if (count >= target) {
                    count = target;
                    clearInterval(interval);
                }
                element.textContent = count + '+';
            }, 50);
            obs.unobserve(element);
        }, { threshold: 0.6 });

        observer.observe(element);
    });
}

function initHeroCTA() {
    document.querySelectorAll('.hero-actions .btn-outline, .hero-actions .btn-primary').forEach(button => {
        button.addEventListener('click', (event) => {
            const href = button.getAttribute('href');
            if (href && href.startsWith('#')) {
                event.preventDefault();
                document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

function initHeroInteractions() {
    initHeroTypewriter();
    animateHeroCounters();
    initHeroCTA();
}

window.addEventListener('DOMContentLoaded', () => {
    initHeroInteractions();
});
