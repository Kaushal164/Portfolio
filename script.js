// ===== LOADING SCREEN =====
let loadProgress = 0;
const loaderInterval = setInterval(() => {
    loadProgress += Math.random() * 15 + 5;
    if (loadProgress >= 100) loadProgress = 100;
    document.getElementById('loaderProgress').style.width = loadProgress + '%';
    if (loadProgress >= 100) {
        clearInterval(loaderInterval);
        setTimeout(() => {
            document.getElementById('loader').classList.add('hidden');
            document.querySelector('.navbar').classList.add('visible');
            animateHero();
        }, 400);
    }
}, 150);

// ===== CUSTOM CURSOR =====
const dot = document.getElementById('cursorDot');
const outline = document.getElementById('cursorOutline');
let mouseX = 0, mouseY = 0, outlineX = 0, outlineY = 0;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    dot.style.left = mouseX - 4 + 'px';
    dot.style.top = mouseY - 4 + 'px';
});

function animateCursor() {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;
    outline.style.left = outlineX - 18 + 'px';
    outline.style.top = outlineY - 18 + 'px';
    requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .project-card, .skill-card, .social-link').forEach(el => {
    el.addEventListener('mouseenter', () => outline.classList.add('hover'));
    el.addEventListener('mouseleave', () => outline.classList.remove('hover'));
});

// ===== SCROLL PROGRESS =====
window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    document.getElementById('scrollProgress').style.width = scrolled + '%';
});

// ===== PARTICLES =====
const canvas = document.getElementById('particlesCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

for (let i = 0; i < 50; i++) {
    particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3, size: Math.random() * 2 + 0.5, opacity: Math.random() * 0.5 + 0.1 });
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${p.opacity})`;
        ctx.fill();
    });
    requestAnimationFrame(drawParticles);
}
drawParticles();

// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const current = window.scrollY;
    navbar.classList.toggle('scrolled', current > 80);
    if (current > lastScroll && current > 200) navbar.style.transform = 'translateX(-50%) translateY(-100%)';
    else navbar.style.transform = 'translateX(-50%) translateY(0)';
    lastScroll = current;

    // Scroll to top button
    const btn = document.getElementById('scrollTop');
    btn.classList.toggle('visible', current > 600);
});

// Mobile nav
document.getElementById('navToggle').addEventListener('click', () => {
    document.getElementById('navLinks').classList.toggle('active');
});
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => document.getElementById('navLinks').classList.remove('active'));
});

// Scroll spy
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 150) current = s.id; });
    document.querySelectorAll('.nav-link').forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
});

// Scroll to top
document.getElementById('scrollTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== HERO ANIMATIONS =====
function animateHero() {
    const elements = document.querySelectorAll('.hero-badge, .hero-title, .hero-roles, .hero-desc, .hero-cta, .hero-social, .hero-visual');
    elements.forEach((el, i) => {
        setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }, i * 100);
    });
}
// Initially hide hero elements
document.querySelectorAll('.hero-badge, .hero-title, .hero-roles, .hero-desc, .hero-cta, .hero-social, .hero-visual').forEach(el => {
    el.style.opacity = '0'; el.style.transform = 'translateY(20px)'; el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
});

// Role typewriter
const roles = ['Web Applications', 'APIs and Systems', 'Softwares'];
let roleIndex = 0;
function typeRole() {
    const el = document.getElementById('roleText');
    const text = roles[roleIndex];
    el.textContent = '';
    let i = 0;
    const type = setInterval(() => {
        el.textContent += text[i]; i++;
        if (i >= text.length) { clearInterval(type); setTimeout(() => { eraseRole(); }, 2000); }
    }, 60);
}
function eraseRole() {
    const el = document.getElementById('roleText');
    let text = el.textContent;
    const erase = setInterval(() => {
        text = text.slice(0, -1); el.textContent = text;
        if (text.length === 0) { clearInterval(erase); roleIndex = (roleIndex + 1) % roles.length; setTimeout(typeRole, 300); }
    }, 30);
}
setTimeout(typeRole, 1500);

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Animate stat counters
            entry.target.querySelectorAll('.stat-number').forEach(num => {
                const target = parseInt(num.dataset.count);
                let current = 0;
                const increment = target / 30;
                const counter = setInterval(() => {
                    current += increment;
                    if (current >= target) { current = target; clearInterval(counter); }
                    num.textContent = Math.floor(current);
                }, 40);
            });
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.timeline-item, .skill-card, .project-card, .cert-card, .stat-card, .about-content').forEach(el => {
    el.style.opacity = '0'; el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
});

// Fix visible class
const style = document.createElement('style');
style.textContent = '.visible{opacity:1!important;transform:translateY(0)!important}';
document.head.appendChild(style);

// ===== AI ASSISTANT =====
const aiData = {
    skills: "Kaushal's tech stack:\n\n- Frontend: HTML, CSS, JavaScript, React, React Native, Bootstrap\n- Backend: Python, Django, REST APIs, WebSocket\n- Data & ML: Supervised/Unsupervised Learning, ANN, Reinforcement Learning, Data Analysis, Power BI, Tableau\n- Tools: Git, Figma, VS Code, Excel\n- Soft: Teaching, Academic Writing, Problem Solving",
    projects: "Featured projects:\n\n1. Blog Nepal (Django) - Full-stack CRUD blog\n2. SafeDriveNepal (React Native) - Road safety visualization\n3. Food Delivery App (React.js) - Cart & delivery system\n4. Booking System (Django) - Auth + dashboard\n5. Real-Time Chat (Django + WebSocket)",
    experience: "Work experience:\n\n- Data Analyst Intern @ Saint Louis University (2025)\n- IT Instructor @ Augusta Institute (2025)\n- Sr. Front-End Dev @ BINET Technologies (2024)\n- Web Developer @ Digital Yeti (2023)\n- Hackathon @ OSM HACKFEST 2023",
    education: "Education:\n\n- BSc CSIT - Birendra Multiple Campus, TU (72.64%, 2023)\n- +2 Science - SkyRider College (GPA: 3.08, 2018)\n- SLC - Sky Rider English Boarding HSS (GPA: 3.5, 2016)",
    contact: "Contact Kaushal:\n\n- Email: kaushal.acharya1999@gmail.com\n- Phone: +977-9867866025\n- LinkedIn: linkedin.com/in/kaushalacharya\n- GitHub: github.com/Kaushal164\n- Location: Bharatpur-12, Chitwan, Nepal",
    about: "Kaushal Acharya is a BSc CSIT graduate from Nepal specializing in full-stack web development, data analytics, and machine learning. He builds impactful applications and is passionate about AI for social good."
};

const aiToggle = document.getElementById('aiToggle');
const aiPanel = document.getElementById('aiPanel');
const aiClose = document.getElementById('aiClose');
const aiInput = document.getElementById('aiInput');
const aiSend = document.getElementById('aiSend');
const aiMessages = document.getElementById('aiMessages');

// Set initial time
document.querySelector('.ai-msg-time').textContent = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

// Auto-open chatbox after loading
setTimeout(() => { aiPanel.classList.add('active'); }, 2500);

aiToggle.addEventListener('click', () => { aiPanel.classList.toggle('active'); if (aiPanel.classList.contains('active')) aiInput.focus(); });
aiClose.addEventListener('click', () => aiPanel.classList.remove('active'));
aiSend.addEventListener('click', sendAiMessage);
aiInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendAiMessage(); });

document.querySelectorAll('.ai-suggestion').forEach(btn => {
    btn.addEventListener('click', () => { aiInput.value = btn.dataset.q; sendAiMessage(); });
});

function sendAiMessage() {
    const text = aiInput.value.trim();
    if (!text) return;
    addAiMsg(text, 'user');
    aiInput.value = '';
    // Show typing indicator
    const typing = document.createElement('div');
    typing.className = 'ai-msg bot ai-typing';
    typing.innerHTML = '<div class="ai-msg-content"><span class="typing-dots"><span>.</span><span>.</span><span>.</span></span></div>';
    aiMessages.appendChild(typing);
    aiMessages.scrollTop = aiMessages.scrollHeight;
    setTimeout(() => { typing.remove(); addAiMsg(getAiResponse(text), 'bot'); }, 800 + Math.random() * 600);
}

function addAiMsg(text, type) {
    const msg = document.createElement('div');
    msg.className = `ai-msg ${type}`;
    msg.innerHTML = `<div class="ai-msg-content">${text.replace(/\n/g, '<br>')}</div><span class="ai-msg-time">${new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</span>`;
    aiMessages.appendChild(msg);
    aiMessages.scrollTop = aiMessages.scrollHeight;

    // Navigate to section
    const q = text.toLowerCase();
    let target = null;
    if (q.match(/skill|tech/)) target = 'skills';
    else if (q.match(/project|built/)) target = 'projects';
    else if (q.match(/experience|work/)) target = 'experience';
    else if (q.match(/cert/)) target = 'certifications';
    else if (q.match(/contact|email|hire/)) target = 'contact';
    if (target && type === 'user') {
        setTimeout(() => document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' }), 800);
    }
}

function getAiResponse(q) {
    const query = q.toLowerCase();
    if (query.match(/^(hi|hello|hey|namaste)/)) return "Namaste! I'm Kaushal's AI assistant. Ask me about his skills, projects, experience, education, or contact info!";
    if (query.match(/skill|tech|stack|language/)) return aiData.skills;
    if (query.match(/project|built|app|work on/)) return aiData.projects;
    if (query.match(/experience|job|career|intern|work/)) return aiData.experience;
    if (query.match(/education|study|degree|college/)) return aiData.education;
    if (query.match(/contact|email|phone|hire|reach|connect/)) return aiData.contact;
    if (query.match(/about|who|introduce|tell me/)) return aiData.about;
    if (query.match(/research|ml|ai|machine learning/)) return "Research interests: Machine Learning, Deep Learning, Explainable AI, Educational Data Mining, Intelligent Systems, and AI for Social Impact.";
    if (query.match(/available|open|freelance/)) return "Kaushal is open to opportunities in Software Development, Data Analysis, and ML roles. Reach him at kaushal.acharya1999@gmail.com!";
    if (query.match(/location|where|country/)) return "Kaushal is based in Bharatpur-12, Chitwan, Nepal. Open to remote work worldwide!";
    if (query.match(/resume|cv|download/)) return "You can download Kaushal's resume using the 'Download CV' button in the hero section, or click 'Preview CV' to view it directly in your browser without downloading!";
    if (query.match(/freelance|available|hire|open/)) return "Yes! Kaushal is available for freelance work and full-time opportunities in:\n\n- Full Stack Web Development\n- Data Analysis & Visualization\n- Machine Learning Projects\n- React/Django Applications\n\nReach out: kaushal.acharya1999@gmail.com";
    return "I can help with info about Kaushal's skills, projects, experience, education, certifications, resume, or contact details. What would you like to know?";
}

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', e => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
    btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
    setTimeout(() => { btn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>'; btn.style.background = ''; e.target.reset(); }, 3000);
});
