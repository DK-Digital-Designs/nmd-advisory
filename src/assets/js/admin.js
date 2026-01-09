
  (function () {
  const LOGIN_KEY = "nmd_admin_logged_in";
  const ADMIN_PASSWORD = "admin123"; // demo passcode
  const BOOKINGS_KEY = "nmd_bookings";
  const TESTIMONIALS_KEY = "nmd_testimonials";

  const loginSection = document.querySelector("[data-admin-login]");
  const loginForm = document.querySelector("[data-admin-login-form]");
  const adminShell = document.querySelector("[data-admin-shell]");
  const toast = document.querySelector("[data-admin-toast]");

  const statBookings = document.querySelector("[data-stat-bookings]");
  const statTestimonials = document.querySelector("[data-stat-testimonials]");
  const bookingsTable = document.querySelector("[data-bookings-table]");
  const testimonialList = document.querySelector("[data-testimonial-list]");

  const btnLock = document.querySelector("[data-admin-lock]");
  const btnSeed = document.querySelector("[data-seed-demo]");
  const btnClear = document.querySelector("[data-clear-demo]");
  const btnExport = document.querySelector("[data-export-bookings]");
  const btnOpenBookingPage = document.querySelector("[data-open-booking-page]");

  const addTestimonialForm = document.querySelector("[data-add-testimonial]");

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.hidden = false;
    clearTimeout(toast._t);
    toast._t = setTimeout(() => (toast.hidden = true), 4500);
  }

  function isLoggedIn() {
    return localStorage.getItem(LOGIN_KEY) === "true";
  }

  function setLoggedIn(v) {
    localStorage.setItem(LOGIN_KEY, v ? "true" : "false");
  }

  function loadJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function saveJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function unlockUI() {
    if (loginSection) loginSection.hidden = true;
    if (adminShell) adminShell.hidden = false;
    renderBookings();
    renderTestimonials();
  }

  function lockUI() {
    if (loginSection) loginSection.hidden = false;
    if (adminShell) adminShell.hidden = true;
  }

  // Gate on load
  isLoggedIn() ? unlockUI() : lockUI();

  // 🔐 LOGIN FIXED
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const fd = new FormData(loginForm);
      const pass = String(fd.get("password") || "").trim(); // ✅ trim added

      if (pass === ADMIN_PASSWORD) {
        setLoggedIn(true);
        unlockUI();
        showToast("Welcome back.");
      } else {
        showToast("Incorrect passcode.");
      }
    });
  }

  if (btnLock) {
    btnLock.addEventListener("click", () => {
      setLoggedIn(false);
      lockUI();
    });
  }

  if (btnOpenBookingPage) {
    btnOpenBookingPage.addEventListener("click", () => {
      window.location.href = "../booking.html";
    });
  }

  function renderBookings() {
    const bookings = loadJson(BOOKINGS_KEY, []);
    const safe = Array.isArray(bookings) ? bookings : [];
    if (statBookings) statBookings.textContent = safe.length;

    if (!bookingsTable) return;

    bookingsTable.innerHTML = safe.length
      ? safe.slice(0, 25).map(b => `
        <tr>
          <td>${b.ref || "—"}</td>
          <td>${b.name || "—"}<div class="muted small">${b.email || ""}</div></td>
          <td>${b.service || "—"}</td>
          <td>${b.date || ""} ${b.time || ""}</td>
          <td><span class="tag">${b.status || "Reserved"}</span></td>
        </tr>
      `).join("")
      : `<tr><td colspan="5" class="muted">No requests yet.</td></tr>`;
  }

  function renderTestimonials() {
    const list = loadJson(TESTIMONIALS_KEY, []);
    const safe = Array.isArray(list) ? list : [];
    if (statTestimonials)
      statTestimonials.textContent = safe.filter(t => t.status === "Pending").length;

    if (!testimonialList) return;

    testimonialList.innerHTML = safe.length
      ? safe.map(t => `
        <div class="panel">
          <strong>${t.name}</strong>
          <div class="muted small">${t.category}</div>
          <p>“${t.quote}”</p>
          <span class="tag">${t.status}</span>
        </div>
      `).join("")
      : `<div class="panel muted">No testimonials yet.</div>`;
  }

})();
