document.addEventListener('DOMContentLoaded', () => {
    // Language toggle functionality
    window.currentLang = 'en';
    
    window.toggleLanguage = function() {
        const newLang = window.currentLang === 'en' ? 'pt' : 'en';
        const elements = document.querySelectorAll('[data-en]');
        const langButton = document.getElementById('langToggle');
        
        elements.forEach(element => {
            const text = element.getAttribute(`data-${newLang}`);
            if (text) {
                element.textContent = text;
            }
        });
        
        window.currentLang = newLang;
        langButton.textContent = langButton.getAttribute(`data-${newLang}`);
    };

    // Mobile Menu
    function toggleMenu() {
        const navLinks = document.querySelector('.nav-links');
        const menuBtn = document.querySelector('.menu-btn');
        
        navLinks.classList.toggle('active');
        
        // Change menu icon
        const icon = menuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            const navLinks = document.querySelector('.nav-links');
            const menuBtn = document.querySelector('.menu-btn');
            const icon = menuBtn.querySelector('i');
            
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Contact form submission handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = this.querySelector('input[name="name"]').value.trim();
            const email = this.querySelector('input[name="email"]').value.trim();
            const message = this.querySelector('textarea[name="message"]').value.trim();

            if (!name || !email || !message) {
                alert(window.currentLang === 'en' ? 'Please fill out all fields.' : 'Por favor, preencha todos os campos.');
                return;
            }

            // In a real-world scenario, you would send this to a backend service
            alert(window.currentLang === 'en' ? 
                `Thank you for your message, ${name}! I will get back to you soon.` :
                `Obrigado pela sua mensagem, ${name}! Entrarei em contato em breve.`
            );
            
            // Reset form
            this.reset();
        });
    }

    // Add subtle animations to sections on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe sections for animations
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
});
