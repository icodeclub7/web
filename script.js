// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');
const mobileNavItems = document.querySelectorAll('.mobile-nav .nav-item');

burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('active');
    
    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger Animation
    burger.classList.toggle('toggle');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                burger.classList.remove('toggle');
            }
        }
    });
});

// Form Submission with EmailJS
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[name="name"]').value;
        const email = this.querySelector('input[name="email"]').value;
        const message = this.querySelector('textarea[name="message"]').value;
        
        // EmailJS configuration
        emailjs.init("qFdlYjDgHVnZkwFn2");
        
        const templateParams = {
            name: name,
            email: email,
            message: message
        };

        emailjs.send("iCODEclub_Gmail_service", "icodeclub_temp_id", templateParams)
            .then(function(response) {
                alert(`Thank you for your message, ${name}! We'll get back to you soon.`);
                contactForm.reset();
            }, function(error) {
                alert("Sorry, there was an error sending your message. Please try again later.");
                console.error('Error:', error);
            });
    });
}

// Initialize all sections with default styles
const initializeSections = () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
        section.style.transition = 'none';
    });
};

// Initialize all cards with default styles
const initializeCards = () => {
    const cards = document.querySelectorAll('.activity-card, .skill-card, .event-card, .project-card, .founder-card');
    cards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        card.style.transition = 'none';
    });
};

// Check if device is mobile
const isMobile = () => {
    return window.innerWidth <= 100000;
};

// Initialize content based on device
const initializeContent = () => {
    if (isMobile()) {
        initializeSections();
        initializeCards();
    } else {
        // Desktop animations
        const sections = document.querySelectorAll('section');
        const options = {
            threshold: 0.3
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, options);

        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(section);
        });

        // Card animations for desktop
        const cards = document.querySelectorAll('.activity-card, .skill-card, .event-card, .project-card, .founder-card');
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.2
        });

        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            cardObserver.observe(card);
        });
    }
};

// Initialize on load
window.addEventListener('load', initializeContent);

// Re-initialize on resize
window.addEventListener('resize', initializeContent);

// Add current year to copyright
const copyright = document.querySelector('.copyright');
if (copyright) {
    const currentYear = new Date().getFullYear();
    copyright.innerHTML = copyright.innerHTML.replace('2024', currentYear);
}

// Add scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add CSS for scroll to top button
const style = document.createElement('style');
style.textContent = `
    .scroll-to-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--gradient-primary);
        color: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
        border: none;
        box-shadow: 0 4px 15px rgba(0, 180, 216, 0.3);
        z-index: 1000;
    }

    .scroll-to-top.show {
        opacity: 1;
    }

    .scroll-to-top:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(0, 180, 216, 0.4);
    }

    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

// Update active state on mobile navigation
const updateActiveNavItem = () => {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            mobileNavItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${sectionId}`) {
                    item.classList.add('active');
                }
            });
        }
    });
};

// Update active state on scroll
window.addEventListener('scroll', updateActiveNavItem);

// Update active state on load
window.addEventListener('load', updateActiveNavItem); 