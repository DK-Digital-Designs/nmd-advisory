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
    const navLinks = mobileNav.querySelectorAll("a");
    const firstLink = navLinks[0];

    const setMenuState = (isOpen) => {
      toggleBtn.setAttribute("aria-expanded", String(isOpen));
      toggleBtn.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
      mobileNav.hidden = !isOpen;
    };

    const openMenu = () => {
      setMenuState(true);
      if (firstLink) {
        firstLink.focus();
      }
    };

    const closeMenu = () => {
      setMenuState(false);
      toggleBtn.focus();
    };

    toggleBtn.setAttribute("aria-label", "Open menu");

    toggleBtn.addEventListener("click", () => {
      const isOpen = toggleBtn.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    mobileNav.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        closeMenu();
      }
    });

    document.addEventListener("click", (event) => {
      if (mobileNav.hidden) return;
      if (!mobileNav.contains(event.target) && !toggleBtn.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !mobileNav.hidden) {
        closeMenu();
      }
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
    document.addEventListener("mousemove", (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      heroBg.style.transform = `scale(1.05) translate(${x}px, ${y}px)`;
    });
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
