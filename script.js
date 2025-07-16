// Keys Motors - Enhanced JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Preload why-us images for smoother animations
    const whyUsImages = document.querySelectorAll('.why-us img');
    let loadedImages = 0;
    
    whyUsImages.forEach(img => {
        if (img.complete) {
            loadedImages++;
        } else {
            img.addEventListener('load', () => {
                loadedImages++;
                if (loadedImages === whyUsImages.length) {
                    // All images loaded, safe to animate
                    initAnimations();
                }
            });
        }
    });
    
    // If all images are already loaded
    if (loadedImages === whyUsImages.length) {
        initAnimations();
    }
    
    function initAnimations() {
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.05,
            rootMargin: '0px 0px -20px 0px'
        };
        
        const animationObserver = new IntersectionObserver(function(entries) {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add a small delay for staggered effect
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                        
                        // Handle counter animations
                        if (entry.target.classList.contains('counter')) {
                            animateCounter(entry.target);
                        }
                    }, index * 50);
                    
                    // Stop observing once animated
                    animationObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe all animated elements
        const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in, .counter');
        animatedElements.forEach(el => {
            animationObserver.observe(el);
        });
    }
    
    // Counter animation function
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    // Throttled parallax effect for hero section
    const hero = document.querySelector('.hero-video');
    let ticking = false;
    
    if (hero) {
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.3;
            hero.style.transform = `translateY(${parallax}px)`;
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
    }
    
    // Mobile Navigation
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Success message
            alert('Thank you for your message! We will respond within 2 hours.');
            contactForm.reset();
        });
    }
    
    // Throttled header scroll effect
    const header = document.querySelector('.nav-header');
    let lastScroll = 0;
    let headerTicking = false;
    
    function updateHeader() {
        const scrolled = window.pageYOffset;
        
        if (scrolled > 100) {
            header.style.background = 'rgba(26, 26, 26, 0.98)';
            header.style.backdropFilter = 'blur(25px)';
            header.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(26, 26, 26, 0.85)';
            header.style.backdropFilter = 'blur(20px)';
            header.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
        }
        
        // Hide/show header on scroll
        if (scrolled > lastScroll && scrolled > 300) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = scrolled;
        headerTicking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!headerTicking) {
            requestAnimationFrame(updateHeader);
            headerTicking = true;
        }
    });
    
    // Keyboard support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });
});