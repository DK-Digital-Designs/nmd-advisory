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
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleNavScroll();
            handleStackParallax();
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
