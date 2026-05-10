// Terminal typing effect
document.addEventListener('DOMContentLoaded', function() {
    const prompts = document.querySelectorAll('.prompt');
    const outputs = document.querySelectorAll('.output');
    const listItems = document.querySelectorAll('.list-item');
    
    // Add animation delays
    prompts.forEach((prompt, index) => {
        prompt.style.animationDelay = `${index * 0.1}s`;
    });

    outputs.forEach((output, index) => {
        output.style.animationDelay = `${(index + 1) * 0.1}s`;
    });

    // Smooth scroll for links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Add cursor blinking effect to last prompt
    const lastPromptText = document.querySelector('.prompt-text:last-of-type');
    if (lastPromptText) {
        setInterval(() => {
            if (lastPromptText.style.borderRight === 'none') {
                lastPromptText.style.borderRight = '2px solid #00ff00';
            } else {
                lastPromptText.style.borderRight = 'none';
            }
        }, 500);
    }

    // Log to console
    console.log('%cWelcome to my portfolio!', 'color: #00ff00; font-size: 14px; font-family: monospace; font-weight: bold;');
    console.log('%cFor contact: kaushal.acharya1999@gmail.com', 'color: #00ff00; font-family: monospace;');
});