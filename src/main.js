import './style.css';

/* =============================================
   1. Scroll Reveal — Intersection Observer
   ============================================= */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

/* =============================================
   2. Image Stack — Scroll Parallax
   ============================================= */
const stackItems = document.querySelectorAll('.stack-item');

const handleStackParallax = () => {
    const scrollY = window.scrollY;
    const speed = 0.03;

    stackItems.forEach((item, index) => {
        const shift = scrollY * speed * (index + 1);
        if (index === 0) item.style.transform = `translate(${-shift}px, ${-shift}px)`;
        if (index === 2) item.style.transform = `translate(${shift}px, ${shift}px)`;
    });
};

/* =============================================
   3. Navigation — Scroll State + Mobile Toggle
   ============================================= */
const nav = document.querySelector('.glass-nav');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

const handleNavScroll = () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
};

// Mobile hamburger toggle
if (navToggle && navLinks) {
    const navClose = document.getElementById('nav-close');

    navToggle.addEventListener('click', () => {
        navToggle.classList.add('active');
        navLinks.classList.add('open');
    });

    if (navClose) {
        navClose.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    }

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('open') &&
            !navLinks.contains(e.target) &&
            !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        }
    });
}

/* =============================================
   4. Combined Scroll Listener (performance)
   ============================================= */
let ticking = false;
const scrollHandlers = [handleNavScroll, handleStackParallax];

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            scrollHandlers.forEach(fn => fn());
            ticking = false;
        });
        ticking = true;
    }
});

/* =============================================
   5. Lead Generation Form
   ============================================= */
const leadForm = document.querySelector('#lead-form');

if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = leadForm.querySelector('button');
        const input = leadForm.querySelector('input');
        const originalText = btn.innerText;

        btn.disabled = true;
        btn.innerText = 'Processing...';
        btn.style.opacity = '0.7';

        setTimeout(() => {
            btn.innerText = '✓ We\'ll be in touch';
            btn.style.backgroundColor = '#2b7a4b';
            btn.style.opacity = '1';
            input.value = '';

            setTimeout(() => {
                btn.disabled = false;
                btn.innerText = originalText;
                btn.style.backgroundColor = '';
            }, 4000);
        }, 1200);
    });
}

/* =============================================
   6. Animated Step Counters
   ============================================= */
const stepNumbers = document.querySelectorAll('.step-number');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.textContent, 10);
            if (isNaN(target)) return;

            let current = 0;
            const duration = 600; // ms
            const startTime = performance.now();

            const animate = (now) => {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                current = Math.round(progress * target);
                el.textContent = String(current).padStart(2, '0');
                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            el.textContent = '00';
            requestAnimationFrame(animate);
            counterObserver.unobserve(el);
        }
    });
}, {
    threshold: 0.5
});

stepNumbers.forEach(el => counterObserver.observe(el));

/* =============================================
   7. Section Title Gold Line Observer
   ============================================= */
const sectionTitles = document.querySelectorAll('.section-title:not(.reveal)');

const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.3,
    rootMargin: '0px 0px -40px 0px'
});

sectionTitles.forEach(el => titleObserver.observe(el));

/* =============================================
   8. Magnetic CTA Buttons
   ============================================= */
const magneticBtns = document.querySelectorAll('.btn-primary');
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (!isTouchDevice) {
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const strength = 0.25;

            btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
}

/* =============================================
   9. Scroll Progress Bar
   ============================================= */
const scrollProgress = document.getElementById('scroll-progress');

const handleScrollProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (scrollProgress) {
        scrollProgress.style.width = `${progress}%`;
    }
};

/* =============================================
   10. Background Color Morphing on Scroll
   ============================================= */
const colorSections = [
    { selector: '.hero', bg: '#f9f8f4' },   // off-white
    { selector: '.philosophy', bg: '#f9f8f4' },   // stays (section has own dark bg)
    { selector: '.services', bg: '#f5f3ed' },   // slightly warmer
    { selector: '.how-we-work', bg: '#f1ede3' },   // warmer still
    { selector: '.lead-gen', bg: '#f9f8f4' },   // back to default
];

const handleColorMorph = () => {
    const scrollY = window.scrollY + window.innerHeight * 0.4;
    let currentBg = '#f9f8f4';

    for (let i = colorSections.length - 1; i >= 0; i--) {
        const el = document.querySelector(colorSections[i].selector);
        if (el && scrollY >= el.offsetTop) {
            currentBg = colorSections[i].bg;
            break;
        }
    }

    document.body.style.backgroundColor = currentBg;
};

/* =============================================
   11. Hero H1 Letter Split Animation
   ============================================= */
const splitHeading = document.querySelector('[data-split-text]');

if (splitHeading) {
    const processNode = (node) => {
        const fragment = document.createDocumentFragment();

        node.childNodes.forEach(child => {
            if (child.nodeType === Node.TEXT_NODE) {
                // Split text into individual characters
                const chars = child.textContent.split('');
                chars.forEach(char => {
                    const span = document.createElement('span');
                    span.className = 'split-char' + (char === ' ' ? ' is-space' : '');
                    span.textContent = char === ' ' ? '\u00A0' : char;
                    fragment.appendChild(span);
                });
            } else if (child.nodeType === Node.ELEMENT_NODE) {
                // Preserve child elements (like <br>, <span class="accent">)
                if (child.tagName === 'BR') {
                    fragment.appendChild(child.cloneNode());
                } else {
                    // Recursively split text inside child elements
                    const clone = child.cloneNode(false);
                    const innerFragment = processNode(child);
                    clone.appendChild(innerFragment);
                    fragment.appendChild(clone);
                }
            }
        });

        return fragment;
    };

    const result = processNode(splitHeading);
    splitHeading.innerHTML = '';
    splitHeading.appendChild(result);

    // Apply staggered delays
    const allChars = splitHeading.querySelectorAll('.split-char');
    allChars.forEach((char, i) => {
        // Start after the hero cascade (0.45s base for h1) + per-char stagger
        char.style.setProperty('--char-delay', `${0.5 + i * 0.035}s`);
    });
}

/* =============================================
   12. Clip-Path Section Wipe Observer
   ============================================= */
const wipeElements = document.querySelectorAll('.section-wipe');

const wipeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.05,
    rootMargin: '0px 0px -60px 0px'
});

wipeElements.forEach(el => wipeObserver.observe(el));

/* =============================================
   Register new scroll handlers
   ============================================= */
scrollHandlers.push(handleScrollProgress, handleColorMorph);

// Initial calls
handleScrollProgress();
handleColorMorph();
