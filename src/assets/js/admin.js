import { supabase } from '../../lib/supabase.js';

(function () {
  const loginSection = document.querySelector("[data-admin-login]");
  const loginForm = document.querySelector("[data-admin-login-form]");
  const adminShell = document.querySelector("[data-admin-shell]");
  const toast = document.querySelector("[data-admin-toast]");

  // UI state
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.hidden = false;
    clearTimeout(toast._t);
    toast._t = setTimeout(() => (toast.hidden = true), 4500);
  }

  async function checkSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (session) {
      unlockUI();
    } else {
      lockUI();
    }
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

  // Initial check
  checkSession();

  // 🔐 SUPABASE LOGIN
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const fd = new FormData(loginForm);
      const email = String(fd.get("email") || "").trim();
      const password = String(fd.get("password") || "").trim();

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        showToast(error.message || "Invalid login credentials.");
      } else {
        unlockUI();
        showToast("Welcome back.");
      }
    });
  }

  const btnLock = document.querySelector("[data-admin-lock]");
  if (btnLock) {
    btnLock.addEventListener("click", async () => {
      await supabase.auth.signOut();
      lockUI();
    });
  }

  if (btnOpenBookingPage) {
    btnOpenBookingPage.addEventListener("click", () => {
      window.location.href = "../booking.html";
    });
  }

  async function renderBookings() {
    const { data: bookings, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    const safe = bookings || [];
    if (statBookings) statBookings.textContent = safe.length;

    if (!bookingsTable) return;

    bookingsTable.innerHTML = safe.length
      ? safe.slice(0, 25).map(b => `
        <tr>
          <td>${b.ref_code || "—"}</td>
          <td>${b.name || "—"}<div class="muted small">${b.email || ""}</div></td>
          <td>${b.service || "—"}</td>
          <td>${b.booking_date || ""} ${b.booking_time || ""}</td>
          <td>
            <span class="tag">${b.status || "Pending"}</span>
            ${b.status === 'Pending' ? `
              <div class="form-row mini-actions" style="margin-top: 8px;">
                <button class="btn btn-primary btn-sm" data-action="confirm" data-id="${b.id}">Confirm</button>
                <button class="btn btn-danger btn-sm" data-action="cancel" data-id="${b.id}">Cancel</button>
              </div>
            ` : ''}
          </td>
        </tr>
      `).join("")
      : `<tr><td colspan="5" class="muted">No requests yet.</td></tr>`;

    // Add event listeners to buttons
    bookingsTable.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        const action = btn.getAttribute('data-action');
        const status = action === 'confirm' ? 'Confirmed' : 'Cancelled';

        const { error } = await supabase
          .from('bookings')
          .update({ status })
          .eq('id', id);

        if (error) {
          showToast("Error updating booking: " + error.message);
        } else {
          showToast(`Booking ${status.toLowerCase()}ed.`);
          renderBookings();
        }
      });
    });
  }

  async function renderTestimonials() {
    // Also fetch enquiries for the Stat value since we don't have testimonials table yet
    const { data: enquiries } = await supabase.from('enquiries').select('id');
    const statEnquiries = document.querySelector("[data-stat-enquiries]");
    if (statEnquiries) statEnquiries.textContent = (enquiries || []).length;

    if (statTestimonials) statTestimonials.textContent = "0";

    if (!testimonialList) return;
    testimonialList.innerHTML = `<div class="panel muted">Dashboard connected to live database.</div>`;
  }

  const btnOpenBookingPage = document.querySelector("[data-open-booking-page]");
  const statBookings = document.querySelector("[data-stat-bookings]");
  const statTestimonials = document.querySelector("[data-stat-testimonials]");
  const bookingsTable = document.querySelector("[data-bookings-table]");
  const testimonialList = document.querySelector("[data-testimonial-list]");

})();
