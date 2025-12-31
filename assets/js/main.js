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

  // WhatsApp placeholder (no alerts)
  const whatsappTargets = document.querySelectorAll("[data-whatsapp-link]");
  whatsappTargets.forEach(a => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      showGlobalToast("WhatsApp integration will be enabled during implementation.");
    });
  });
})();
