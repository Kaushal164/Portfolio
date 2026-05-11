// ===== PORTFOLIO DATA =====
const portfolioData = {
    about: "Kaushal Acharya is a BSc CSIT graduate from Birendra Multiple Campus, Nepal. He's a Software Developer, Data Analyst, and ML enthusiast with experience in React, Django, Python, and data visualization. Currently working as a Data Analyst Associate Intern at Saint Louis University.",
    skills: "Kaushal's skills include:\n\n- Programming: HTML, CSS, JavaScript, React, Python, Java, SQL\n- Machine Learning: Supervised Learning, Unsupervised Learning, ANN, Reinforcement Learning\n- Tools: Figma, Power BI, Excel, Git, VS Code\n- Technical: Data Analysis, Data Visualization, Database Management, Algorithms\n- Soft Skills: Teaching, Academic Writing, Problem Solving, Critical Thinking",
    experience: "Kaushal's experience:\n\n1. Data Analyst Intern - Saint Louis University (2025, Remote)\n2. IT Instructor - Augusta Institute of Technology (2025)\n3. Sr. Front-End Developer - BINET Technologies (2024)\n4. Hackathon Participant - OSM HACKFEST 2023\n5. Web Developer Trainee - Digital Yeti Pvt. Ltd. (2023)\n6. Digital Marketing - Augusta Institute (2021)",
    projects: "Key projects by Kaushal:\n\n1. Blog Nepal (Django) - Full-stack blog platform with CRUD\n2. SafeDriveNepal (React Native) - Road safety visualization app\n3. Food Delivery App (React.js) - Frontend with cart management\n4. Booking System (Django) - User auth & dashboard\n5. Real-Time Chat App (Django + WebSocket) - Messaging platform",
    certifications: "Kaushal holds 11+ certifications including:\n\n- Supervised ML: Regression & Classification (Coursera)\n- Unsupervised Learning (Coursera)\n- ML with Python (IBM)\n- Advanced Learning Algorithms (Coursera)\n- Data Analysis with Python (Cognitive Class)\n- Data Visualization (Saint Louis University)\n- Digital Marketing (Augusta Institute)",
    education: "Education:\n\n- BSc CSIT - Birendra Multiple Campus, TU (72.64%, 2023)\n- +2 Science - SkyRider College (GPA: 3.08, 2018)\n- SLC - Sky Rider English Boarding HSS (GPA: 3.5, 2016)",
    research: "Research interests: Machine Learning, Deep Learning, Explainable AI, Educational Data Mining, Intelligent Systems, and AI for Social Impact.",
    contact: "Contact Kaushal:\n\n- Email: kaushal.acharya1999@gmail.com\n- Phone: +977-9867866025\n- LinkedIn: linkedin.com/in/kaushalacharya\n- GitHub: github.com/Kaushal164\n- Website: www.kaushalacharya.com.np\n- Location: Bharatpur-12, Chitwan, Nepal",
    location: "Kaushal is based in Bharatpur-12, Chitwan, Nepal. He's open to remote opportunities worldwide!"
};

// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initThemeToggle();
    initChatbox();
    initScrollAnimations();
    initScrollSpy();
});

// ===== NAVBAR =====
function initNavbar() {
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');

    toggle.addEventListener('click', () => {
        links.classList.toggle('active');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            links.classList.remove('active');
        });
    });

    // Shrink navbar on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 80) {
            navbar.style.padding = '10px 40px';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.padding = '15px 40px';
            navbar.style.boxShadow = 'none';
        }
    });
}

// ===== SCROLL SPY =====
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// ===== THEME TOGGLE =====
function initThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    const icon = toggle.querySelector('i');

    // Check saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(icon, savedTheme);

    toggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const newTheme = current === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(icon, newTheme);
    });
}

function updateThemeIcon(icon, theme) {
    if (theme === 'dark') {
        icon.className = 'fas fa-moon';
    } else {
        icon.className = 'fas fa-sun';
    }
}

// ===== AI CHATBOX =====
function initChatbox() {
    const toggle = document.getElementById('chatboxToggle');
    const chatbox = document.getElementById('chatbox');
    const closeBtn = document.getElementById('chatboxClose');
    const input = document.getElementById('chatboxInput');
    const sendBtn = document.getElementById('chatboxSend');
    const messages = document.getElementById('chatboxMessages');
    const suggestions = document.querySelectorAll('.suggestion-btn');

    // Set initial message time
    const timeEl = document.querySelector('.message-time');
    if (timeEl) timeEl.textContent = formatTime(new Date());

    toggle.addEventListener('click', () => {
        chatbox.classList.toggle('active');
        if (chatbox.classList.contains('active')) {
            input.focus();
            document.querySelector('.chat-notification').style.display = 'none';
        }
    });

    closeBtn.addEventListener('click', () => {
        chatbox.classList.remove('active');
    });

    sendBtn.addEventListener('click', () => sendChatMessage());
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') sendChatMessage();
    });

    // Suggestion buttons
    suggestions.forEach(btn => {
        btn.addEventListener('click', () => {
            const query = btn.getAttribute('data-query');
            input.value = query;
            sendChatMessage();
        });
    });

    function sendChatMessage() {
        const text = input.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        input.value = '';

        // Show typing indicator
        const typing = addTypingIndicator();

        setTimeout(() => {
            typing.remove();
            const response = generateAIResponse(text);
            addMessage(response, 'bot');

            // Scroll to relevant section if applicable
            scrollToRelevantSection(text);
        }, 600 + Math.random() * 600);
    }

    function addMessage(text, type) {
        const msg = document.createElement('div');
        msg.className = `chat-message ${type}`;

        const content = document.createElement('div');
        content.className = 'message-content';
        content.textContent = text;

        const time = document.createElement('span');
        time.className = 'message-time';
        time.textContent = formatTime(new Date());

        msg.appendChild(content);
        if (type === 'bot') msg.appendChild(time);
        messages.appendChild(msg);
        messages.scrollTop = messages.scrollHeight;
    }

    function addTypingIndicator() {
        const msg = document.createElement('div');
        msg.className = 'chat-message bot';
        msg.innerHTML = '<div class="message-content" style="font-style: italic; opacity: 0.7;">Typing...</div>';
        messages.appendChild(msg);
        messages.scrollTop = messages.scrollHeight;
        return msg;
    }
}

function scrollToRelevantSection(query) {
    const q = query.toLowerCase();
    let sectionId = null;

    if (q.match(/skill|tech|language|programming/)) sectionId = 'skills';
    else if (q.match(/experience|work|job|intern/)) sectionId = 'experience';
    else if (q.match(/project|built|app/)) sectionId = 'projects';
    else if (q.match(/certif|course/)) sectionId = 'certifications';
    else if (q.match(/research|ml|ai|machine/)) sectionId = 'research';
    else if (q.match(/resume|cv|download/)) sectionId = 'resume';
    else if (q.match(/contact|email|phone|hire/)) sectionId = 'contact';

    if (sectionId) {
        setTimeout(() => {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 400);
    }
}

function generateAIResponse(query) {
    const q = query.toLowerCase();

    if (q.match(/^(hi|hello|hey|namaste|greetings)/)) {
        return "Namaste! I'm Kaushal's AI Assistant. How can I help you? You can ask about his skills, experience, projects, education, or anything else!";
    }
    if (q.match(/who|about|introduce|tell me about/)) {
        return portfolioData.about;
    }
    if (q.match(/skill|tech|language|programming|stack/)) {
        return portfolioData.skills;
    }
    if (q.match(/experience|work|job|career|intern/)) {
        return portfolioData.experience;
    }
    if (q.match(/project|built|develop|portfolio|app/)) {
        return portfolioData.projects;
    }
    if (q.match(/certif|course|credential/)) {
        return portfolioData.certifications;
    }
    if (q.match(/education|study|degree|college|university/)) {
        return portfolioData.education;
    }
    if (q.match(/research|interest|ml|ai|machine learning|deep learning/)) {
        return portfolioData.research;
    }
    if (q.match(/contact|email|phone|reach|hire|connect/)) {
        return portfolioData.contact;
    }
    if (q.match(/location|where|address|country|city|located/)) {
        return portfolioData.location;
    }
    if (q.match(/resume|cv|download/)) {
        return "You can download Kaushal's resume from the Resume section. Scroll down or click 'Resume' in the navigation!";
    }
    if (q.match(/available|hire|open|opportunity|freelance/)) {
        return "Kaushal is open to opportunities in Software Development, Data Analysis, and Machine Learning roles. Contact him at kaushal.acharya1999@gmail.com!";
    }

    return "I can help you learn about Kaushal! Try asking about his: skills, experience, projects, education, certifications, research interests, or contact info.";
}

function formatTime(date) {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.skill-category, .timeline-item, .project-card, .cert-card, .research-card, .contact-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

// Add animate-in class styles
const style = document.createElement('style');
style.textContent = '.animate-in { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);
