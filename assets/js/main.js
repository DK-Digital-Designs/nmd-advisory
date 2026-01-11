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

  // Global toast (for placeholder integrations)
  let toastEl = null;
  function showGlobalToast(msg) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "toast toast-global";
      toastEl.setAttribute("role", "status");
      toastEl.setAttribute("aria-live", "polite");
      toastEl.hidden = true;
      document.body.appendChild(toastEl);
    }

    toastEl.textContent = msg;
    toastEl.hidden = false;

    window.clearTimeout(toastEl._t);
    toastEl._t = window.setTimeout(() => {
      toastEl.hidden = true;
    }, 4500);
  }

  // Active nav state
  const currentPath = window.location.pathname;
  // Normalize path (handle / and /index.html as same, or just match end)
  const navLinks = document.querySelectorAll('.nav a, .mobile-nav a');
  navLinks.forEach(link => {
    // Get the path from the link href (which is absolute)
    const url = new URL(link.href);
    // loose match: if current path ends with this link's path
    // handle root
    const linkPath = url.pathname;

    // Check if current page is this link
    // E.g. /services.html vs /services.html
    // Also handle / == /index.html if needed, but Vite usually serves / as /index.html

    if (currentPath === linkPath || (linkPath.endsWith('/') && currentPath.endsWith('index.html'))) {
      link.classList.add('active');
    } else if (currentPath.endsWith('/') && linkPath.endsWith('index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // WhatsApp placeholder (no alerts)
  const whatsappTargets = document.querySelectorAll("[data-whatsapp-link]");
  whatsappTargets.forEach(a => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      showGlobalToast("WhatsApp integration will be enabled during implementation.");
    });
  });
})();

const heroBg = document.querySelector(".hero-bg");

if (heroBg) {
    document.addEventListener("mousemove", (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 12;
        const y = (e.clientY / window.innerHeight - 0.5) * 12;

        heroBg.style.transform = `scale(1.05) translate(${x}px, ${y}px)`;
    });
}

// WhatsApp link wiring
(function wireWhatsAppLinks() {
    // Use international format without +, spaces, or leading zeros.
    // Example: South Africa +27 82 123 4567 -> "27821234567"
    const WHATSAPP_NUMBER = "27821234567";

    // Optional default message
    const DEFAULT_MESSAGE =
        "Hi NMD Advisory, I’d like to enquire about your services. Please contact me.";

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

    document.querySelectorAll("[data-whatsapp-link]").forEach((a) => {
        a.href = url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
    });
})();

