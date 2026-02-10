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
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
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
