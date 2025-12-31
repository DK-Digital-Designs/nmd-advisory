(() => {
  const LOGIN_KEY = "nmd_admin_logged_in";
  const ADMIN_PASSWORD = "admin123"; // demo passcode (change for presentations)
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

  function showToast(msg){
    if (!toast) return;
    toast.textContent = msg;
    toast.hidden = false;
    window.clearTimeout(toast._t);
    toast._t = window.setTimeout(() => (toast.hidden = true), 4500);
  }

  function isLoggedIn(){
    return localStorage.getItem(LOGIN_KEY) === "true";
  }

  function setLoggedIn(v){
    localStorage.setItem(LOGIN_KEY, v ? "true" : "false");
  }

  function loadJson(key, fallback){
    try{
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      const parsed = JSON.parse(raw);
      return parsed ?? fallback;
    } catch {
      return fallback;
    }
  }

  function saveJson(key, value){
    localStorage.setItem(key, JSON.stringify(value));
  }

  function renderBookings(){
    const bookings = loadJson(BOOKINGS_KEY, []);
    const safe = Array.isArray(bookings) ? bookings : [];
    if (statBookings) statBookings.textContent = String(safe.length);

    if (!bookingsTable) return;

    if (safe.length === 0) {
      bookingsTable.innerHTML = `<tr><td colspan="5" class="muted">No requests yet.</td></tr>`;
      return;
    }

    bookingsTable.innerHTML = safe
      .slice(0, 25)
      .map(b => {
        const dt = `${escapeHtml(b.date || "—")} ${escapeHtml(b.time || "")}`.trim();
        const client = `${escapeHtml(b.name || "—")}<div class="muted small">${escapeHtml(b.email || "")}</div>`;
        const status = b.status === "Cancelled"
          ? `<span class="tag">Cancelled</span>`
          : `<span class="tag">Reserved</span>`;

        return `
          <tr>
            <td><span class="mono">${escapeHtml(b.ref || "—")}</span></td>
            <td>${client}</td>
            <td>${escapeHtml(b.service || "—")}</td>
            <td>${dt}</td>
            <td>${status}</td>
          </tr>
        `;
      })
      .join("");
  }

  function renderTestimonials(){
    const list = loadJson(TESTIMONIALS_KEY, []);
    const safe = Array.isArray(list) ? list : [];

    const pending = safe.filter(t => t.status === "Pending");
    if (statTestimonials) statTestimonials.textContent = String(pending.length);

    if (!testimonialList) return;

    if (safe.length === 0) {
      testimonialList.innerHTML = `
        <div class="panel">
          <strong>No testimonials yet.</strong>
          <div class="muted small">Load sample data or add one below.</div>
        </div>
      `;
      return;
    }

    testimonialList.innerHTML = safe
      .slice(0, 12)
      .map((t, idx) => {
        const badge = t.status === "Approved"
          ? `<span class="tag">Approved</span>`
          : `<span class="tag">Pending</span>`;
        return `
          <div class="panel">
            <div style="display:flex;justify-content:space-between;gap:10px;align-items:center;">
              <div><strong>${escapeHtml(t.name || "Client")}</strong> <span class="muted small">(${escapeHtml(t.category || "Other")})</span></div>
              ${badge}
            </div>
            <div class="divider"></div>
            <div>“${escapeHtml(t.quote || "")}”</div>
            <div class="divider"></div>
            <div class="form-row">
              <button class="btn btn-ghost btn-block" type="button" data-approve="${idx}">Approve</button>
              <button class="btn btn-danger btn-block" type="button" data-remove="${idx}">Remove</button>
            </div>
          </div>
        `;
      })
      .join("");

    testimonialList.querySelectorAll("[data-approve]").forEach(btn => {
      btn.addEventListener("click", () => {
        const i = Number(btn.getAttribute("data-approve"));
        const cur = loadJson(TESTIMONIALS_KEY, []);
        if (!Array.isArray(cur) || !cur[i]) return;
        cur[i].status = "Approved";
        saveJson(TESTIMONIALS_KEY, cur);
        renderTestimonials();
      });
    });

    testimonialList.querySelectorAll("[data-remove]").forEach(btn => {
      btn.addEventListener("click", () => {
        const i = Number(btn.getAttribute("data-remove"));
        const cur = loadJson(TESTIMONIALS_KEY, []);
        if (!Array.isArray(cur) || !cur[i]) return;
        cur.splice(i, 1);
        saveJson(TESTIMONIALS_KEY, cur);
        renderTestimonials();
      });
    });
  }

  function escapeHtml(s){
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function unlockUI(){
    if (loginSection) loginSection.hidden = true;
    if (adminShell) adminShell.hidden = false;
    renderBookings();
    renderTestimonials();
  }

  function lockUI(){
    if (loginSection) loginSection.hidden = false;
    if (adminShell) adminShell.hidden = true;
  }

  // Gate
  if (isLoggedIn()) unlockUI();
  else lockUI();

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(loginForm);
      const pass = String(fd.get("password") || "");
      if (pass === ADMIN_PASSWORD) {
        setLoggedIn(true);
        unlockUI();
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

  if (btnExport) {
    btnExport.addEventListener("click", () => {
      const bookings = loadJson(BOOKINGS_KEY, []);
      const blob = new Blob([JSON.stringify(bookings, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "nmd-scheduling-export.json";
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  if (btnSeed) {
    btnSeed.addEventListener("click", () => {
      const demoBookings = [
        { ref: "NMD-7F3A2C", name: "Jane Smith", email: "jane@business.co.za", service: "Accounting", platform: "Microsoft Teams", date: "2026-01-06", time: "10:00", notes: "Monthly bookkeeping and reporting.", status: "Reserved" },
        { ref: "NMD-K9D2QW", name: "Michael Naidoo", email: "michael@startup.co.za", service: "Tax", platform: "Zoom", date: "2026-01-07", time: "14:00", notes: "Compliance question and returns.", status: "Reserved" }
      ];
      const demoTestimonials = [
        { quote: "(Testimonial placeholder) Outcome-focused quote goes here.", name: "Client Name", category: "Small Business", status: "Approved" },
        { quote: "(Testimonial placeholder) Outcome-focused quote goes here.", name: "Client Name", category: "Medium Business", status: "Pending" }
      ];
      saveJson(BOOKINGS_KEY, demoBookings);
      saveJson(TESTIMONIALS_KEY, demoTestimonials);
      renderBookings();
      renderTestimonials();
      showToast("Sample data loaded.");
    });
  }

  if (btnClear) {
    btnClear.addEventListener("click", () => {
      localStorage.removeItem(BOOKINGS_KEY);
      localStorage.removeItem(TESTIMONIALS_KEY);
      renderBookings();
      renderTestimonials();
      showToast("Sample data cleared.");
    });
  }

  if (addTestimonialForm) {
    addTestimonialForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(addTestimonialForm);
      const quote = String(fd.get("quote") || "").trim();
      const name = String(fd.get("name") || "").trim();
      const category = String(fd.get("category") || "").trim();

      if (!quote || !name || !category) return;

      const cur = loadJson(TESTIMONIALS_KEY, []);
      const list = Array.isArray(cur) ? cur : [];
      list.unshift({ quote, name, category, status: "Pending" });
      saveJson(TESTIMONIALS_KEY, list);

      addTestimonialForm.reset();
      renderTestimonials();
    });
  }
})();
