// ===========================
// Mobile Menu Toggle
// ===========================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// ===========================
// Smooth Scroll for Navigation
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Active Navigation Link on Scroll
// ===========================
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===========================
// Gallery Filter
// ===========================
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
            if (filterValue === 'all') {
                item.classList.remove('hide');
                setTimeout(() => {
                    item.style.display = 'block';
                }, 10);
            } else {
                const category = item.getAttribute('data-category');
                if (category === filterValue) {
                    item.classList.remove('hide');
                    setTimeout(() => {
                        item.style.display = 'block';
                    }, 10);
                } else {
                    item.classList.add('hide');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
});

// ===========================
// Contact Form Submission
// ===========================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);

        // Here you would typically send the form data to a server
        // For now, we'll just show an alert
        alert('Thank you for your message! We will get back to you soon.');

        // Reset form
        contactForm.reset();
    });
}

// ===========================
// Reviews Slider (if multiple reviews)
// ===========================
let currentReview = 0;
const reviewCards = document.querySelectorAll('.review-card');
const dots = document.querySelectorAll('.dot');

if (dots.length > 0) {
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentReview = index;
            updateReview();
        });
    });
}

function updateReview() {
    reviewCards.forEach((card, index) => {
        card.classList.remove('active');
        if (index === currentReview) {
            card.classList.add('active');
        }
    });

    dots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === currentReview) {
            dot.classList.add('active');
        }
    });
}

// Auto-rotate reviews every 5 seconds
if (reviewCards.length > 1) {
    setInterval(() => {
        currentReview = (currentReview + 1) % reviewCards.length;
        updateReview();
    }, 5000);
}

// ===========================
// Scroll Animations
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.service-card, .gallery-item, .review-card, .contact-detail-item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===========================
// Navbar Background on Scroll
// ===========================
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.backgroundColor = '#000000';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ===========================
// Lazy Loading Images
// ===========================
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ===========================
// Prevent Form Resubmission
// ===========================
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// ===========================
// Add Loading State to Buttons
// ===========================
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
    btn.addEventListener('click', function(e) {
        if (this.classList.contains('loading')) {
            e.preventDefault();
            return;
        }
    });
});

// ===========================
// Gallery Item Click (Lightbox could be added)
// ===========================
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        // Here you could add lightbox functionality
        // For now, we'll just add a simple effect
        console.log('Gallery item clicked');
    });
});

// ===========================
// Initialize on Page Load
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Innova Exterior LLC website loaded successfully!');

    // Add fade-in animation to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
});

// ===========================
// Handle External Links
// ===========================
const externalLinks = document.querySelectorAll('a[target="_blank"]');
externalLinks.forEach(link => {
    link.setAttribute('rel', 'noopener noreferrer');
});
