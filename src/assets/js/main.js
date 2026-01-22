import { supabase } from '../../lib/supabase.js';

(() => {
  const year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());

  // Header elevate on scroll
  const header = document.querySelector("[data-elevate]");
  if (header) {
    const onScroll = () => {
      header.classList.toggle("is-elevated", window.scrollY > 4);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Mobile nav toggle
  const toggleBtn = document.querySelector("[data-nav-toggle]");
  const mobileNav = document.querySelector("[data-mobile-nav]");
  if (toggleBtn && mobileNav) {
    toggleBtn.addEventListener("click", () => {
      const isOpen = toggleBtn.getAttribute("aria-expanded") === "true";
      toggleBtn.setAttribute("aria-expanded", String(!isOpen));
      mobileNav.hidden = isOpen;
    });
  }

  // Active nav state
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav a, .mobile-nav a');
  navLinks.forEach(link => {
    const url = new URL(link.href);
    const linkPath = url.pathname;

    if (currentPath === linkPath || (linkPath.endsWith('/') && currentPath.endsWith('index.html'))) {
      link.classList.add('active');
    } else if (currentPath.endsWith('/') && linkPath.endsWith('index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Contact Form Handler (Supabase)
  const contactForm = document.querySelector("#lead-form form");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.disabled = true;
      btn.textContent = "Sending...";

      const fd = new FormData(contactForm);
      const name = String(fd.get("name") || "").trim();
      const email = String(fd.get("email") || "").trim();
      const message = String(fd.get("message") || "").trim();

      const { error } = await supabase
        .from('enquiries')
        .insert([{ name, email, message, status: 'unread' }]);

      if (error) {
        alert("Error sending message: " + error.message);
        btn.disabled = false;
        btn.textContent = originalText;
      } else {
        contactForm.reset();
        btn.textContent = "Message sent!";
        setTimeout(() => {
          btn.disabled = false;
          btn.textContent = originalText;
        }, 3000);
      }
    });
  }

  // Hero Background Parallax
  const heroBg = document.querySelector(".hero-bg");
  if (heroBg) {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const setStaticHeroBg = () => {
      heroBg.style.transform = "scale(1.05) translate(0px, 0px)";
    };

    if (prefersReducedMotion.matches) {
      setStaticHeroBg();
    } else {
      let pendingFrame = false;
      let nextTransform = "scale(1.05) translate(0px, 0px)";
      const updateHeroBg = () => {
        heroBg.style.transform = nextTransform;
        pendingFrame = false;
      };

      document.addEventListener("mousemove", (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 12;
        const y = (e.clientY / window.innerHeight - 0.5) * 12;
        nextTransform = `scale(1.05) translate(${x}px, ${y}px)`;
        if (!pendingFrame) {
          pendingFrame = true;
          requestAnimationFrame(updateHeroBg);
        }
      });
    }
  }

  // WhatsApp link wiring
  const WHATSAPP_NUMBER = "27823739907";
  const DEFAULT_MESSAGE = "Hi NMD Advisory, I’d like to enquire about your services. Please contact me.";
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  document.querySelectorAll("[data-whatsapp-link]").forEach((a) => {
    a.href = waUrl;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
  });

})();
