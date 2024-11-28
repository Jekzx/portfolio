// Multilingual Content
const translations = {
    en: {
        // Page Title
        pageTitle: 'Gabriel Rodrigues - Software Developer',
        
        // Navigation
        logoName: 'Gabriel Rodrigues',
        navHome: 'Home',
        navAbout: 'About',
        navSkills: 'Skills',
        navProjects: 'Projects',
        navContact: 'Contact',

        // Hero Section
        heroTitle: 'Gabriel Rodrigues',
        heroSubtitle: 'Software Developer',
        heroDescription: 'Crafting innovative solutions with code, bridging creativity and technology.',

        // About Section
        aboutSectionTitle: 'About Me',
        aboutParagraph1: 'I specialize in backend development with Python but also enjoy working across the stack with tools like JavaScript, TypeScript, and React to build modern web applications. I have experience designing and optimizing SQL and NoSQL databases and a growing interest in AI and Machine Learning for creating smart, predictive systems. I also work with Delphi, using it to develop desktop applications when the need arises.',
        aboutParagraph2: 'I aim for clean, minimalist designs that make life easier for users. While my main focus is backend development, I like to think of myself as a flexible full-stack developer, ready to tackle challenges from coding to deployment.',
        aboutDescription: 'I\'m a passionate software developer with expertise in full-stack development, specializing in creating robust and scalable web applications. My approach combines technical precision with creative problem-solving.',

        // Skills Section
        skillsSectionTitle: 'Skills',
        skillPythonTitle: 'Python',
        skillPythonDescription: 'Advanced backend development',
        skillJavaScriptTitle: 'JavaScript',
        skillJavaScriptDescription: 'Frontend and full-stack development',
        skillAITitle: 'AI & Machine Learning',
        skillAIDescription: 'Intelligent system design and predictive modeling',
        skillDelphiTitle: 'Delphi',
        skillDelphiDescription: 'Desktop application development',
        skillDataAnalysisTitle: 'Data Analysis',
        skillDataAnalysisDescription: 'Statistical analysis and data visualization',
        skillCloudTitle: 'Cloud Services',
        skillCloudDescription: 'AWS and Azure infrastructure',

        // Projects Section
        projectsSectionTitle: 'Projects',
        project1Title: 'Ticket Management System',
        project1Description: 'A comprehensive ticket management system with bilingual support, enabling efficient tracking and resolution of support tickets.',
        project2Title: 'Smart AI Task Manager',
        project2Description: 'An intelligent task management application leveraging AI to prioritize and optimize personal productivity workflows.',
        project3Title: 'Smart Home Automation System',
        project3Description: 'A comprehensive IoT-based smart home automation system built with Python, utilizing MQTT for device communication and providing a user-friendly interface for home device control.',
        projectGithubLink: 'GitHub',
        projectDemoLink: 'Live Demo',

        // Contact Section
        contactSectionTitle: 'Contact Me',
        contactNamePlaceholder: 'Your Name',
        contactEmailPlaceholder: 'Your Email',
        contactMessagePlaceholder: 'Your Message',
        contactSendButton: 'Send Message',
        contactWhatsappButton: 'Contact me on WhatsApp',

        // Footer
        footerCopyright: ' 2023 Gabriel Rodrigues. All rights reserved.'
    },
    pt: {
        // Page Title
        pageTitle: 'Gabriel Rodrigues - Desenvolvedor de Software',
        
        // Navigation
        logoName: 'Gabriel Rodrigues',
        navHome: 'Início',
        navAbout: 'Sobre',
        navSkills: 'Habilidades',
        navProjects: 'Projetos',
        navContact: 'Contato',

        // Hero Section
        heroTitle: 'Gabriel Rodrigues',
        heroSubtitle: 'Desenvolvedor de Software',
        heroDescription: 'Criando soluções inovadoras com código, unindo criatividade e tecnologia.',

        // About Section
        aboutSectionTitle: 'Sobre Mim',
        aboutParagraph1: 'Eu me especializo em desenvolvimento backend com Python, mas também gosto de trabalhar em todo o stack usando ferramentas como JavaScript, TypeScript e React para criar aplicações web modernas. Tenho experiência no design e otimização de bancos de dados SQL e NoSQL e um interesse crescente em IA e Machine Learning para criar sistemas inteligentes e preditivos. Também trabalho com Delphi, usando a linguagem para desenvolver aplicações desktop quando necessário.',
        aboutParagraph2: 'Meu foco é criar designs limpos e minimalistas que facilitam a vida dos usuários. Embora meu foco principal seja no backend, gosto de me ver como um desenvolvedor full-stack flexível, pronto para enfrentar desafios desde a codificação até a implantação.',
        aboutDescription: 'Sou um desenvolvedor de software apaixonado com expertise em desenvolvimento full-stack, especializado em criar aplicações web robustas e escaláveis. Minha abordagem combina precisão técnica com resolução criativa de problemas.',

        // Skills Section
        skillsSectionTitle: 'Habilidades',
        skillPythonTitle: 'Python',
        skillPythonDescription: 'Desenvolvimento backend avançado',
        skillJavaScriptTitle: 'JavaScript',
        skillJavaScriptDescription: 'Desenvolvimento frontend e full-stack',
        skillAITitle: 'IA & Aprendizado de Máquina',
        skillAIDescription: 'Design de sistemas inteligentes e modelagem preditiva',
        skillDelphiTitle: 'Delphi',
        skillDelphiDescription: 'Desenvolvimento de aplicações desktop',
        skillDataAnalysisTitle: 'Análise de Dados',
        skillDataAnalysisDescription: 'Análise estatística e visualização de dados',
        skillCloudTitle: 'Serviços em Nuvem',
        skillCloudDescription: 'Infraestrutura AWS e Azure',

        // Projects Section
        projectsSectionTitle: 'Projetos',
        project1Title: 'Visualizador de Tickets',
        project1Description: 'Um sistema abrangente de gerenciamento de tickets com suporte bilíngue, permitindo rastreamento e resolução eficientes de tickets de suporte.',
        project2Title: 'Gerenciador de Tarefas IA Inteligente',
        project2Description: 'Uma aplicação de gerenciamento de tarefas inteligente que utiliza IA para priorizar e otimizar fluxos de trabalho de produtividade pessoal.',
        project3Title: 'Sistema de Automação de Casa Inteligente',
        project3Description: 'Um sistema abrangente de automação de casa inteligente baseado em IoT, construído com Python, utilizando MQTT para comunicação de dispositivos e fornecendo uma interface amigável para controle de dispositivos domésticos.',
        projectGithubLink: 'GitHub',
        projectDemoLink: 'Demonstração',

        // Contact Section
        contactSectionTitle: 'Entre em Contato',
        contactNamePlaceholder: 'Seu Nome',
        contactEmailPlaceholder: 'Seu Email',
        contactMessagePlaceholder: 'Sua Mensagem',
        contactSendButton: 'Enviar Mensagem',
        contactWhatsappButton: 'Entre em contato comigo no WhatsApp',

        // Footer
        footerCopyright: ' 2023 Gabriel Rodrigues. Todos os direitos reservados.'
    }
};

// Language Switching Functionality
function toggleLanguage() {
    const currentLang = getCurrentLanguage();
    const newLang = currentLang === 'en' ? 'pt' : 'en';
    
    // Update language in localStorage
    localStorage.setItem('language', newLang);
    
    // Apply translations
    applyTranslations(newLang);
}

function getCurrentLanguage() {
    return localStorage.getItem('language') || 'en';
}

function applyTranslations(lang) {
    // Update page title
    document.title = translations[lang].pageTitle;

    // Translate all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    // Update WhatsApp contact link
    const waContact = document.querySelector('.whatsapp-contact');
    if (waContact) {
        const waMessage = waContact.getAttribute(`data-wa-${lang}`);
        waContact.href = `https://wa.me/+5521995852036?text=${waMessage}`;
    }

    // Update language toggle button
    updateLanguageToggleButton(lang);
}

function updateLanguageToggleButton(lang) {
    const toggleBtn = document.querySelector('.language-toggle button');
    toggleBtn.textContent = lang === 'en' ? 'PT' : 'EN';
}

// Expose functions globally
window.toggleLanguage = toggleLanguage;

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = getCurrentLanguage();
    
    // Set initial WhatsApp link
    const waContact = document.querySelector('.whatsapp-contact');
    if (waContact) {
        const waMessage = waContact.getAttribute(`data-wa-${savedLang}`);
        waContact.href = `https://wa.me/+5521995852036?text=${waMessage}`;
    }
    
    applyTranslations(savedLang);
    updateLanguageToggleButton(savedLang);
});

// Mobile Menu
window.toggleMenu = function() {
    const navLinks = document.querySelector('.nav-links');
    const menuBtn = document.querySelector('.menu-btn');
    const icon = menuBtn.querySelector('i');
    
    navLinks.classList.toggle('active');
    
    // Toggle menu icon
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
        
        navLinks.classList.remove('active');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
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

// Close menu when clicking outside
document.addEventListener('click', function(e) {
    const navLinks = document.querySelector('.nav-links');
    const menuBtn = document.querySelector('.menu-btn');
    
    if (!navLinks.contains(e.target) && !menuBtn.contains(e.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        const icon = menuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});
