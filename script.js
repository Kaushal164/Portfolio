// ===== PORTFOLIO DATA =====
const portfolioData = {
    about: `Kaushal Acharya | Software Developer & Data Analyst
Location: Bharatpur-12, Chitwan, Nepal
Email: kaushal.acharya1999@gmail.com
Phone: +977-9867866025
Website: www.kaushalacharya.com.np
GitHub: github.com/Kaushal164
LinkedIn: linkedin.com/in/kaushalacharya

BSc CSIT Graduate passionate about web development, data analytics, machine learning, and building impactful full-stack applications.`,

    skills: `Programming: HTML, CSS, JavaScript, React, Python, Java, SQL
Machine Learning: Supervised Learning, Unsupervised Learning, ANN, Reinforcement Learning
Tools: Figma, Power BI, Excel, Git, VS Code
Technical: Data Analysis, Data Visualization, Database Management, Algorithms
Soft Skills: Teaching, Academic Writing, Problem Solving, Critical Thinking`,

    experience: `1. Data Analyst Associate Intern - Saint Louis University (2025, Remote)
   - Data Cleaning, Visualization with Power BI & Tableau, EDA, Reporting

2. IT Instructor - Augusta Institute of Technology (2025, Nepal)
   - Trained IT specialists, assisted with software/hardware diagnosis

3. Sr. Front-End Developer (Intern) - BINET Technologies (2024, Nepal)
   - Built responsive jewelry website with React, implemented Socket.io chat

4. Hackathon Participant - OSM HACKFEST 2023 (2023, Nepal)
   - Developed React Native prototype for accident-prone area visualization

5. Web Developer (Trainee) - Digital Yeti Pvt. Ltd. (2023, Nepal)
   - Frontend with Bootstrap, React with Axios, React Native mobile apps

6. Digital Marketing - Augusta Institute of Technology (2021, Nepal)
   - SEO, Web Analytics, SEM, Social Media Marketing, UI/UX`,

    projects: `1. Blog Nepal (Django) - Full-stack blog with CRUD, admin integration, responsive UI
2. SafeDriveNepal (React Native) - Risky road area identification using map data
3. Food Delivery App (React.js) - Frontend with API integration, cart management
4. Booking System (Django) - User auth, CRUD, interactive dashboard
5. Real-Time Chat App (Django + WebSocket) - Real-time messaging platform`,

    certifications: `- Supervised Machine Learning: Regression and Classification (Coursera)
- Unsupervised Learning, Recommenders, Reinforcement Learning (Coursera)
- Machine Learning with Python (IBM)
- Machine Learning (Coursera)
- Advanced Learning Algorithms (Coursera)
- Divide and Conquer, Sorting and Searching, Randomized Algorithms (Coursera)
- Data Analysis with Python (Cognitive Class)
- Data Visualization Associate Early Internship (Saint Louis University)
- Sr. Front-end Developer (BINET Technologies)
- OSM HACKFEST 2023 (Birendra Open Source Club)
- Digital Marketing (Augusta Institute of Technology)`,

    education: `1. BSc CSIT - Birendra Multiple Campus, TU (2023) - Percentage: 72.64%
2. +2 Science - SkyRider College (2018) - GPA: 3.08
3. SLC - Sky Rider English Boarding HSS (2016) - GPA: 3.5`,

    research: `Machine Learning, Deep Learning, Explainable AI, Educational Data Mining, Intelligent Systems, AI for Social Impact`,

    contact: `Email: kaushal.acharya1999@gmail.com
Phone: +977-9867866025
LinkedIn: linkedin.com/in/kaushalacharya
GitHub: github.com/Kaushal164
Website: www.kaushalacharya.com.np
Location: Bharatpur-12, Chitwan, Nepal`,

    references: `1. Prithivi Raj Paneru - Assistant Professor, Birendra Multiple Campus, TU
   Email: prithivi.paneru@bimc.tu.edu.np

2. Sandip Adhikari - CEO, BINET Technologies Pvt. Ltd.
   Email: sandipadhikari880@gmail.com

3. Ramesh Neupane - Teaching Assistant, Birendra Multiple Campus, TU
   Email: ramesh.neupane@bimc.tu.edu.np`
};

// ===== ASCII ART =====
const asciiArt = `
        ::
  _ _    _        .####....
 | |_| | |       ####"   "~~..
 | _  | ||     ."         "####.
 |_| |_| |_|  ... ." .###;       '###!
       ####.. '####'     ..##. '#"
       ######. .."  .?#. !{##   !
        "######..  "~~. '###  .;'
          '#######h...     '. .;"
              :!"""########..
              :      ""####.
              %          '####.
              :.          #####!
              :!..          .!P###"
            ######....;#####!
            '####"  '####'
              "~~~    ~~~
`;

// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initTerminal();
    initChatbox();
    initAnimations();
    setSessionTime();
    renderAsciiArt();
    initScrollSpy();
});

// ===== SESSION TIME =====
function setSessionTime() {
    const now = new Date();
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
    const el = document.getElementById('sessionTime');
    if (el) el.textContent = now.toLocaleString('en-US', options);
}

// ===== ASCII ART =====
function renderAsciiArt() {
    const el = document.getElementById('asciiArt');
    if (el) el.textContent = asciiArt;
}

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

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 30px rgba(0, 255, 65, 0.4)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 255, 65, 0.3)';
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
            const sectionTop = section.offsetTop - 100;
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

// ===== INTERACTIVE TERMINAL =====
function initTerminal() {
    const input = document.getElementById('terminalInput');
    const output = document.getElementById('terminalOutput');

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = input.value.trim().toLowerCase();
            if (cmd) {
                processCommand(cmd, output);
                input.value = '';
            }
        }
    });

    // Focus terminal on click
    document.querySelector('.interactive-terminal').addEventListener('click', () => {
        input.focus();
    });
}

function processCommand(cmd, outputEl) {
    // Add command line to output
    const cmdLine = document.createElement('div');
    cmdLine.className = 'output-line cmd-line';
    cmdLine.textContent = `guest@terminal:~/portfolio$ ${cmd}`;
    outputEl.appendChild(cmdLine);

    let response = '';
    let targetSection = null;

    switch(cmd) {
        case 'help':
            response = `Available Commands:
  help           - Show available commands
  about          - Display about info
  skills         - Show skills & technologies
  experience     - Show work experience
  projects       - List featured projects
  certifications - Show certifications
  education      - Display education
  research       - Show research interests
  contact        - Display contact info
  references     - Show references
  resume         - Download resume
  clear          - Clear terminal screen
  whoami         - Who is Kaushal?`;
            break;
        case 'about':
        case 'whoami':
            response = portfolioData.about;
            targetSection = 'about';
            break;
        case 'skills':
            response = portfolioData.skills;
            targetSection = 'skills';
            break;
        case 'experience':
        case 'exp':
            response = portfolioData.experience;
            targetSection = 'experience';
            break;
        case 'projects':
            response = portfolioData.projects;
            targetSection = 'projects';
            break;
        case 'certifications':
        case 'certs':
            response = portfolioData.certifications;
            targetSection = 'certifications';
            break;
        case 'education':
        case 'edu':
            response = portfolioData.education;
            targetSection = 'education';
            break;
        case 'research':
            response = portfolioData.research;
            targetSection = 'research';
            break;
        case 'contact':
            response = portfolioData.contact;
            targetSection = 'contact';
            break;
        case 'references':
        case 'refs':
            response = portfolioData.references;
            targetSection = 'references';
            break;
        case 'resume':
        case 'cv':
            response = 'Opening resume section...';
            targetSection = 'resume';
            break;
        case 'clear':
            outputEl.innerHTML = '';
            return;
        default:
            response = `Command not found: ${cmd}\nType 'help' to see available commands.`;
    }

    const responseLine = document.createElement('div');
    responseLine.className = 'output-line';
    responseLine.style.whiteSpace = 'pre-wrap';
    responseLine.textContent = response;
    outputEl.appendChild(responseLine);

    // Scroll output into view
    outputEl.scrollTop = outputEl.scrollHeight;

    // Navigate to section
    if (targetSection) {
        setTimeout(() => {
            const section = document.getElementById(targetSection);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                section.style.boxShadow = '0 0 40px rgba(0, 255, 65, 0.6)';
                setTimeout(() => {
                    section.style.boxShadow = '';
                }, 2000);
            }
        }, 300);
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

    function sendChatMessage() {
        const text = input.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        input.value = '';

        // Simulate typing delay
        setTimeout(() => {
            const response = generateAIResponse(text);
            addMessage(response, 'bot');
        }, 500 + Math.random() * 500);
    }

    function addMessage(text, type) {
        const msg = document.createElement('div');
        msg.className = `chat-message ${type}`;

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = type === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';

        const content = document.createElement('div');
        content.className = 'message-content';
        content.textContent = text;

        msg.appendChild(avatar);
        msg.appendChild(content);
        messages.appendChild(msg);
        messages.scrollTop = messages.scrollHeight;
    }
}

function generateAIResponse(query) {
    const q = query.toLowerCase();

    // Greetings
    if (q.match(/^(hi|hello|hey|namaste|greetings)/)) {
        return "Namaste! I'm Kaushal's AI Assistant. How can I help you? You can ask me about his skills, experience, projects, education, or anything else!";
    }

    // About / Who
    if (q.match(/who|about|introduce|tell me/)) {
        return "Kaushal Acharya is a BSc CSIT graduate from Birendra Multiple Campus, Nepal. He's a Software Developer, Data Analyst, and ML enthusiast with experience in React, Django, Python, and data visualization. Currently working as a Data Analyst Associate Intern at Saint Louis University.";
    }

    // Skills
    if (q.match(/skill|tech|language|programming|stack/)) {
        return "Kaushal's skills include:\n- Programming: HTML, CSS, JavaScript, React, Python, Java, SQL\n- ML: Supervised/Unsupervised Learning, ANN, Reinforcement Learning\n- Tools: Figma, Power BI, Excel, Git\n- Technical: Data Analysis, Visualization, Database Management, Algorithms";
    }

    // Experience
    if (q.match(/experience|work|job|career|intern/)) {
        return "Kaushal's experience includes:\n- Data Analyst Intern at Saint Louis University (2025)\n- IT Instructor at Augusta Institute (2025)\n- Sr. Front-End Developer at BINET Technologies (2024)\n- Web Developer Trainee at Digital Yeti (2023)\n- OSM Hackfest Participant (2023)";
    }

    // Projects
    if (q.match(/project|built|develop|portfolio|app/)) {
        return "Key projects:\n1. Blog Nepal (Django) - Full-stack blog platform\n2. SafeDriveNepal (React Native) - Road safety app\n3. Food Delivery App (React.js)\n4. Booking System (Django)\n5. Real-Time Chat App (Django + WebSocket)";
    }

    // Education
    if (q.match(/education|study|degree|college|university|school/)) {
        return "Education:\n- BSc CSIT from Birendra Multiple Campus, TU (72.64%, 2023)\n- +2 Science from SkyRider College (GPA: 3.08, 2018)\n- SLC from Sky Rider English Boarding HSS (GPA: 3.5, 2016)";
    }

    // Certifications
    if (q.match(/certif|course|credential|license/)) {
        return "Kaushal holds 11+ certifications including:\n- ML: Supervised, Unsupervised, Advanced Algorithms (Coursera)\n- ML with Python (IBM)\n- Data Analysis with Python (Cognitive Class)\n- Data Visualization (Saint Louis University)\n- Sr. Front-end Developer (BINET Technologies)";
    }

    // Contact
    if (q.match(/contact|email|phone|reach|hire|connect/)) {
        return "Contact Kaushal:\n- Email: kaushal.acharya1999@gmail.com\n- Phone: +977-9867866025\n- LinkedIn: linkedin.com/in/kaushalacharya\n- GitHub: github.com/Kaushal164\n- Website: www.kaushalacharya.com.np";
    }

    // Location
    if (q.match(/location|where|address|country|city/)) {
        return "Kaushal is based in Bharatpur-12, Chitwan, Nepal. He's open to remote opportunities worldwide!";
    }

    // Research
    if (q.match(/research|interest|ml|ai|machine learning|deep learning/)) {
        return "Research interests: Machine Learning, Deep Learning, Explainable AI, Educational Data Mining, Intelligent Systems, and AI for Social Impact.";
    }

    // Resume
    if (q.match(/resume|cv|download/)) {
        return "You can download Kaushal's resume from the Resume section above. Scroll down or type 'resume' in the terminal to navigate there!";
    }

    // References
    if (q.match(/reference|recommend/)) {
        return "Kaushal's references include:\n- Prithivi Raj Paneru (Assistant Professor, TU)\n- Sandip Adhikari (CEO, BINET Technologies)\n- Ramesh Neupane (Teaching Assistant, TU)";
    }

    // Availability / Hiring
    if (q.match(/available|hire|open|opportunity|freelance/)) {
        return "Kaushal is open to opportunities in Software Development, Data Analysis, and Machine Learning roles. Feel free to reach out at kaushal.acharya1999@gmail.com!";
    }

    // Default
    return "I can help you learn about Kaushal! Try asking about his: skills, experience, projects, education, certifications, research interests, or contact info.";
}

// ===== ANIMATIONS =====
function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.terminal').forEach(terminal => {
        terminal.style.opacity = '0';
        terminal.style.transform = 'translateY(20px)';
        terminal.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(terminal);
    });

    // Make hero immediately visible
    const hero = document.querySelector('.hero-terminal');
    if (hero) {
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
    }
}

// ===== CONSOLE EASTER EGG =====
console.log('%c Welcome to Kaushal Acharya\'s Portfolio! ', 'background: #000; color: #00ff41; font-size: 16px; font-weight: bold; padding: 10px; border: 2px solid #00ff41;');
console.log('%c Type "help" in the terminal for available commands ', 'color: #00ff41; font-family: monospace;');
