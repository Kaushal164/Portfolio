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

// ===== AI ASSISTANT (Real Resume Data) =====
const aiData = {
    skills: "Here's Kaushal's actual tech stack:\n\n**Programming:** HTML, CSS, JavaScript, React, Python, Java, SQL\n**Machine Learning:** Supervised Learning, Unsupervised Learning, ANN, Reinforcement Learning\n**Tools:** Figma, Power BI, Excel, Git, VS Code\n**Technical:** Data Analysis, Data Visualization, Database Management, Algorithms\n**Soft Skills:** Teaching, Academic Writing, Problem Solving, Critical Thinking",
    frontend: "Kaushal's frontend expertise includes:\n\n- HTML5, CSS3, JavaScript (ES6+)\n- React.js & React Native\n- Bootstrap, Responsive Design\n- DOM Manipulation\n- Socket.io for real-time features\n- UI/UX Design with Figma",
    backend: "Kaushal's backend & database skills:\n\n- Python & Django (Full-stack)\n- REST APIs & WebSocket\n- SQL & Database Management\n- User Authentication & CRUD\n- Real-time communication systems",
    projects: "Here are Kaushal's real projects:\n\n1. **Blog Nepal** (Django) - Full-stack blog with CRUD operations, Django admin, dynamic content rendering, mobile-responsive UI\n\n2. **SafeDriveNepal** (React Native) - App to identify risky road areas using OpenStreetMap data, UI/UX designed in Figma\n\n3. **Food Delivery App** (React.js) - Frontend with API integration, cart management & delivery functionality\n\n4. **Booking System** (Django) - User authentication, CRUD operations, interactive dashboard for resource allocation\n\n5. **Real-Time Chat** (Django + WebSocket) - Real-time messaging with user auth & responsive UI",
    experience: "Kaushal's professional experience:\n\n**Data Analyst Associate Intern** - Saint Louis University (2025, Remote)\n- Data cleaning, dashboards with Power BI & Tableau, EDA, reporting\n\n**IT Instructor** - Augusta Institute of Technology (2025, Nepal)\n- Trained IT specialists, assisted with software/hardware diagnosis\n\n**Sr. Front-End Developer (Intern)** - BINET Technologies (2024, Nepal)\n- Built responsive jewelry website with React, implemented Socket.io chat, product zoom & 360° views\n\n**Web Developer (Trainee)** - Digital Yeti Pvt. Ltd. (2023, Nepal)\n- Built Gym website with Bootstrap, React with Axios, React Native mobile apps\n\n**Hackathon Participant** - OSM HACKFEST 2023\n- Developed React Native prototype for accident-prone area visualization",
    education: "Kaushal's education:\n\n- **BSc CSIT** - Birendra Multiple Campus, TU (72.64%, 2023)\n- **+2 Science** - SkyRider College (GPA: 3.08, 2018)\n- **SLC** - Sky Rider English Boarding HSS (GPA: 3.5, 2016)",
    contact: "You can reach Kaushal through:\n\n- **Email:** kaushal.acharya1999@gmail.com\n- **LinkedIn:** linkedin.com/in/kaushalacharya\n- **GitHub:** github.com/Kaushal164\n- **Website:** www.kaushalacharya.com.np\n- **Location:** Bharatpur-12, Chitwan, Nepal",
    about: "Kaushal Acharya is a BSc CSIT graduate from Birendra Multiple Campus, TU Nepal. He specializes in full-stack web development (React, Django), data analytics (Power BI, Tableau, Python), and machine learning. He's passionate about building impactful applications and exploring AI for social good.",
    certifications: "Kaushal holds 11+ certifications:\n\n- Supervised Machine Learning (Coursera)\n- Unsupervised Learning, Recommenders, RL (Coursera)\n- Machine Learning with Python (IBM)\n- Machine Learning (Coursera)\n- Advanced Learning Algorithms (Coursera)\n- Divide and Conquer, Sorting, Searching Algorithms (Coursera)\n- Data Analysis with Python (Cognitive Class)\n- Data Visualization Associate (Saint Louis University)\n- Sr. Front-end Developer (BINET Technologies)\n- OSM HACKFEST 2023 (Birendra Open Source Club)\n- Digital Marketing (Augusta Institute)",
    research: "Kaushal's research interests:\n\n- Machine Learning & Deep Learning\n- Explainable AI\n- Educational Data Mining\n- Intelligent Systems\n- AI for Social Impact",
    freelance: "Yes! Kaushal is open to freelance work and collaborations in:\n\n- Full-Stack Web Development (React + Django)\n- Data Analysis & Visualization\n- Machine Learning Projects\n- React Native Mobile Apps\n- Frontend Development\n\nReach out at kaushal.acharya1999@gmail.com or use the contact section!",
    resume: "You can download Kaushal's resume using the **Download CV** button in the hero section, or click **Preview CV** to view it directly in your browser!\n\nHis resume covers all his experience at Saint Louis University, BINET Technologies, Digital Yeti, certifications, and projects.",
    services: "Kaushal offers:\n\n- Full-Stack Web Development\n- Frontend Development (React, JS)\n- Data Analysis & Dashboard Creation\n- Machine Learning Solutions\n- Mobile App Development (React Native)\n- UI/UX Design\n- IT Training & Consultation"
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

// Idle prompt after 25 seconds
let idleTimer;
function resetIdleTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
        if (aiPanel.classList.contains('active') && aiMessages.querySelectorAll('.ai-msg.user').length === 0) {
            addAiMsg("Need help exploring the portfolio? Try asking about Kaushal's projects, skills, or availability! 🚀", 'bot');
        }
    }, 25000);
}
resetIdleTimer();
document.addEventListener('mousemove', resetIdleTimer);
document.addEventListener('keydown', resetIdleTimer);

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
    // Greetings
    if (query.match(/^(hi|hello|hey|namaste|greetings|sup|yo)/)) return "Hey there! 👋 I'm Kaushal's AI assistant. I can help you explore his projects, skills, experience, and services. What would you like to know?";
    // Skills
    if (query.match(/skill|tech|stack|language|programming|what.*use|what.*know/)) return aiData.skills;
    // Frontend specific
    if (query.match(/frontend|front-end|react|html|css|javascript|ui/)) return aiData.frontend;
    // Backend specific
    if (query.match(/backend|back-end|python|django|database|sql|api|server/)) return aiData.backend;
    // Projects
    if (query.match(/project|built|develop|portfolio|app|work.*on|show.*project|best project/)) return aiData.projects;
    // Experience
    if (query.match(/experience|job|career|intern|work|company|where.*work/)) return aiData.experience;
    // Education
    if (query.match(/education|study|degree|college|university|school|qualification/)) return aiData.education;
    // Contact
    if (query.match(/contact|email|phone|reach|connect|how.*reach|get.*touch/)) return aiData.contact;
    // About
    if (query.match(/about|who|introduce|tell.*about|yourself|kaushal/)) return aiData.about;
    // Certifications
    if (query.match(/certif|course|credential|license|training/)) return aiData.certifications;
    // Research
    if (query.match(/research|interest|ml|ai|machine learning|deep learning|explainable/)) return aiData.research;
    // Freelance / Hiring
    if (query.match(/freelance|available|hire|open|opportunity|contract|work.*together|collaboration/)) return aiData.freelance;
    // Resume
    if (query.match(/resume|cv|download|pdf/)) return aiData.resume;
    // Services
    if (query.match(/service|offer|what.*do|provide|help.*with/)) return aiData.services;
    // GitHub
    if (query.match(/github|git|repo|code|open.*source/)) return "You can explore Kaushal's code on GitHub:\n\n**github.com/Kaushal164**\n\nHe has repositories for Blog Nepal, SafeDriveNepal, booking systems, and more!";
    // LinkedIn
    if (query.match(/linkedin|professional|network/)) return "Connect with Kaushal on LinkedIn:\n\n**linkedin.com/in/kaushalacharya**";
    // Location
    if (query.match(/location|where|address|country|city|based|nepal/)) return "Kaushal is based in Bharatpur-12, Chitwan, Nepal. He's open to remote work worldwide and currently working remotely with Saint Louis University!";
    // Timeline / Budget (Lead gen)
    if (query.match(/timeline|budget|cost|price|how.*much|quote|estimate/)) return "I'd be happy to help connect you with Kaushal for project discussions! Could you share:\n\n1. What you're building\n2. Your expected timeline\n3. Approximate budget range\n\nOr you can use the contact section to send him a message directly!";
    // Recruiter mode
    if (query.match(/recruiter|hiring.*manager|talent|position|role|job.*opening/)) return "Great to have you here! Here's a quick summary for recruiters:\n\n**Kaushal Acharya** - BSc CSIT Graduate\n- 6+ work experiences including remote Data Analyst role\n- Strongest in: React, Django, Python, Data Analysis, ML\n- 11+ certifications (Coursera, IBM, Stanford)\n- Available for: Full-time, Remote, Freelance\n\nDownload his CV using the 'Download CV' button above!";
    // Availability
    if (query.match(/when.*available|start.*when|notice.*period|immediate/)) return "Kaushal is currently available for new opportunities and can start discussions immediately. He's flexible with remote work schedules across different time zones.";
    // Thank you
    if (query.match(/thank|thanks|thx|appreciate/)) return "You're welcome! 😊 Let me know if there's anything else I can help you with. Feel free to explore the portfolio or reach out to Kaushal directly!";
    // Goodbye
    if (query.match(/bye|goodbye|see.*you|later|gtg/)) return "Goodbye! 👋 Thanks for visiting Kaushal's portfolio. Feel free to come back anytime. Have a great day!";
    // Default fallback
    return "I may not have that specific information yet, but I can help with:\n\n- Skills & Technologies\n- Projects\n- Experience\n- Certifications\n- Freelance availability\n- Contact info\n- Services offered\n\nOr you can contact Kaushal directly at kaushal.acharya1999@gmail.com!";
}

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', e => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
    btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
    setTimeout(() => { btn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>'; btn.style.background = ''; e.target.reset(); }, 3000);
});
