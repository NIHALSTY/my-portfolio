/* =======================================================
   PORTFOLIO WEBSITE — script.js
   Handles interactivity, animations, and UI enhancements
   ======================================================= */

// ===== Wait for DOM to be fully loaded =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    Preloader.init();
    Navbar.init();
    ThemeToggle.init();
    TypingEffect.init();
    ScrollReveal.init();
    SkillBars.init();
    StatCounter.init();
    ContactForm.init();
    ScrollToTop.init();
    MobileMenu.init();
});

/* ===== PRELOADER ===== */
const Preloader = {
    init() {
        const preloader = document.getElementById('preloader');
        // Hide preloader after page loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
                // Remove from DOM after transition
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 800);
        });
    }
};

/* ===== NAVBAR ===== */
const Navbar = {
    init() {
        const navbar = document.getElementById('navbar');
        const navLinks = document.querySelectorAll('.nav-link');

        // Sticky navbar on scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 60) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Active link highlighting based on scroll position
        const sections = document.querySelectorAll('.section');

        const observerOptions = {
            root: null,
            rootMargin: '-40% 0px -40% 0px',
            threshold: 0
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('data-section') === sectionId) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => sectionObserver.observe(section));

        // Smooth scroll on nav link click
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
                // Close mobile menu if open
                MobileMenu.close();
            });
        });
    }
};

/* ===== MOBILE MENU ===== */
const MobileMenu = {
    init() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            // Prevent body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                this.close();
            }
        });
    },

    close() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
};

/* ===== THEME TOGGLE (Dark/Light Mode) ===== */
const ThemeToggle = {
    init() {
        const toggle = document.getElementById('theme-toggle');
        const html = document.documentElement;

        // Check saved preference or system preference
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme) {
            html.setAttribute('data-theme', savedTheme);
        } else if (!systemPrefersDark) {
            html.setAttribute('data-theme', 'light');
        }
        // Default is dark (no data-theme attribute needed)

        toggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            if (newTheme === 'dark') {
                html.removeAttribute('data-theme');
            } else {
                html.setAttribute('data-theme', newTheme);
            }

            localStorage.setItem('theme', newTheme);

            // Add a small scale animation on click
            toggle.style.transform = 'scale(0.85)';
            setTimeout(() => {
                toggle.style.transform = 'scale(1)';
            }, 150);
        });
    }
};

/* ===== TYPING EFFECT ===== */
const TypingEffect = {
    roles: [
        'Web Developer',
        'AI Enthusiast',
        'Software Engineer',
        'Problem Solver',
        'Open Source Contributor'
    ],
    currentIndex: 0,
    charIndex: 0,
    isDeleting: false,
    typingSpeed: 80,
    deletingSpeed: 40,
    pauseAfterType: 2000,
    pauseAfterDelete: 500,

    init() {
        this.typedTextEl = document.getElementById('typed-text');
        if (this.typedTextEl) {
            this.type();
        }
    },

    type() {
        const currentRole = this.roles[this.currentIndex];
        let delay;

        if (this.isDeleting) {
            // Deleting characters
            this.charIndex--;
            this.typedTextEl.textContent = currentRole.substring(0, this.charIndex);
            delay = this.deletingSpeed;

            if (this.charIndex === 0) {
                this.isDeleting = false;
                this.currentIndex = (this.currentIndex + 1) % this.roles.length;
                delay = this.pauseAfterDelete;
            }
        } else {
            // Typing characters
            this.charIndex++;
            this.typedTextEl.textContent = currentRole.substring(0, this.charIndex);
            delay = this.typingSpeed;

            if (this.charIndex === currentRole.length) {
                this.isDeleting = true;
                delay = this.pauseAfterType;
            }
        }

        setTimeout(() => this.type(), delay);
    }
};

/* ===== SCROLL REVEAL ANIMATIONS ===== */
const ScrollReveal = {
    init() {
        const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -80px 0px',
            threshold: 0.1
        };

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add staggered delay for siblings
                    const parent = entry.target.parentElement;
                    const siblings = parent ? parent.querySelectorAll('.reveal-up, .reveal-left, .reveal-right') : [];
                    const index = Array.from(siblings).indexOf(entry.target);
                    const delay = index * 100; // 100ms stagger

                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, delay);

                    revealObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(el => revealObserver.observe(el));
    }
};

/* ===== SKILL BARS ANIMATION ===== */
const SkillBars = {
    init() {
        const skillProgressBars = document.querySelectorAll('.skill-progress');

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3
        };

        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const targetWidth = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = targetWidth + '%';
                    }, 200);
                    skillObserver.unobserve(bar);
                }
            });
        }, observerOptions);

        skillProgressBars.forEach(bar => skillObserver.observe(bar));
    }
};

/* ===== STAT COUNTER ANIMATION ===== */
const StatCounter = {
    init() {
        const statNumbers = document.querySelectorAll('.stat-number');

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-target'));
                    this.animateCounter(el, target);
                    statObserver.unobserve(el);
                }
            });
        }, observerOptions);

        statNumbers.forEach(num => statObserver.observe(num));
    },

    animateCounter(element, target) {
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // ~60fps
        let current = 0;

        const update = () => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                return;
            }
            element.textContent = Math.floor(current);
            requestAnimationFrame(update);
        };

        requestAnimationFrame(update);
    }
};

/* ===== CONTACT FORM ===== */
const ContactForm = {
    init() {
        const form = document.getElementById('contact-form');
        const submitBtn = document.getElementById('submit-btn');
        const formStatus = document.getElementById('form-status');

        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            // Basic validation
            if (!name || !email || !message) {
                this.showStatus(formStatus, 'Please fill in all required fields.', 'error');
                return;
            }

            if (!this.isValidEmail(email)) {
                this.showStatus(formStatus, 'Please enter a valid email address.', 'error');
                return;
            }

            // Simulate sending (since this is a static site)
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                form.reset();
                this.showStatus(formStatus, '✅ Message sent successfully! I\'ll get back to you soon.', 'success');

                // Hide success message after 5 seconds
                setTimeout(() => {
                    formStatus.classList.remove('success');
                    formStatus.style.display = 'none';
                }, 5000);
            }, 2000);
        });

        // Add floating label effect and input animations
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('focused');
            });
        });
    },

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    showStatus(element, message, type) {
        element.textContent = message;
        element.className = 'form-status ' + type;
        element.style.display = 'block';
    }
};

/* ===== SCROLL TO TOP ===== */
const ScrollToTop = {
    init() {
        const scrollTopBtn = document.getElementById('scroll-top');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
};

/* ===== SMOOTH ANCHOR SCROLLING (for all anchor links) ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

/* ===== PARALLAX-LIKE SUBTLE MOUSE MOVEMENT (Hero Section) ===== */
const heroSection = document.querySelector('.hero-section');
if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        const xPercent = (clientX / innerWidth - 0.5) * 2;
        const yPercent = (clientY / innerHeight - 0.5) * 2;

        const orbs = heroSection.querySelectorAll('.gradient-orb');
        orbs.forEach((orb, i) => {
            const speed = (i + 1) * 8;
            orb.style.transform = `translate(${xPercent * speed}px, ${yPercent * speed}px)`;
        });

        const badges = heroSection.querySelectorAll('.floating-badge');
        badges.forEach((badge, i) => {
            const speed = (i + 1) * 4;
            badge.style.transform = `translateY(${Math.sin(Date.now() / 1000 + i) * 6}px) translate(${xPercent * speed}px, ${yPercent * speed}px)`;
        });
    });
}

/* ===== TILT EFFECT ON PROJECT CARDS ===== */
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 0.1s ease';
    });

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
});
