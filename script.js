// Language Switcher
function switchLang(lang) {
    // Update button states
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Find the clicked button and make it active
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.textContent.toLowerCase() === lang || 
            (btn.textContent === 'EN' && lang === 'en') ||
            (btn.textContent === 'FR' && lang === 'fr')) {
            btn.classList.add('active');
        }
    });
    
    // Update content visibility
    document.querySelectorAll('.lang-content').forEach(content => {
        content.classList.remove('active');
    });
    document.querySelectorAll('.lang-content.' + lang).forEach(content => {
        content.classList.add('active');
    });
    
    // Update navigation labels
    if (lang === 'fr') {
        document.querySelector('.nav-service').textContent = 'Services';
        document.querySelector('.nav-gumloop').textContent = 'Gumloop';
        document.querySelector('.nav-pricing').textContent = 'Tarifs';
        document.querySelector('.nav-contact').textContent = 'Contact';
        document.querySelector('.footer-privacy').textContent = 'Confidentialité';
        document.querySelector('.footer-terms').textContent = 'Conditions';
        document.documentElement.lang = 'fr';
    } else {
        document.querySelector('.nav-service').textContent = 'Services';
        document.querySelector('.nav-gumloop').textContent = 'Gumloop';
        document.querySelector('.nav-pricing').textContent = 'Pricing';
        document.querySelector('.nav-contact').textContent = 'Contact';
        document.querySelector('.footer-privacy').textContent = 'Privacy';
        document.querySelector('.footer-terms').textContent = 'Terms';
        document.documentElement.lang = 'en';
    }
}

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            // Calculate offset for fixed header
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', function() {
    // Service cards animation
    document.querySelectorAll('.service-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
    
    // Path cards animation
    document.querySelectorAll('.path-card').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Framework cards animation
    document.querySelectorAll('.framework-card').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Project cards animation
    document.querySelectorAll('.project-card').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (hero && scrolled < hero.offsetHeight) {
        if (heroVisual) {
            heroVisual.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    }
});

// Dynamic pricing calculator placeholder (for future implementation)
function initPricingCalculator() {
    // This function will be expanded when implementing the actual calculator
    console.log('Pricing calculator ready for implementation');
}

// Handle pricing path selection
document.querySelectorAll('.path-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const target = this.getAttribute('href');
        
        // Add visual feedback
        if (target === '#retainer-pricing') {
            document.querySelector('.retainer-pricing').classList.add('highlighted');
            setTimeout(() => {
                document.querySelector('.retainer-pricing').classList.remove('highlighted');
            }, 1000);
        } else if (target === '#project-pricing') {
            document.querySelector('.project-pricing').classList.add('highlighted');
            setTimeout(() => {
                document.querySelector('.project-pricing').classList.remove('highlighted');
            }, 1000);
        }
    });
});

// Mobile menu toggle (for future mobile menu implementation)
function toggleMobileMenu() {
    const nav = document.querySelector('.nav-links');
    nav.classList.toggle('mobile-active');
}

// Form validation placeholder (for Notion form integration)
function validateContactForm(formData) {
    // Placeholder for form validation logic
    return true;
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initPricingCalculator();
    
    // Add loading animation removal
    document.body.classList.add('loaded');
    
    // Check for preferred language in localStorage
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && (savedLang === 'en' || savedLang === 'fr')) {
        switchLang(savedLang);
    }
});

// Save language preference
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const lang = this.textContent.toLowerCase();
        localStorage.setItem('preferredLanguage', lang);
    });
});