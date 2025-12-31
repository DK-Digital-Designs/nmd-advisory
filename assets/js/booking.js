(() => {
  const STORAGE_KEY = "nmd_bookings";

  /** @typedef {{ref:string,name:string,email:string,service:string,platform:string,date:string,time:string,notes:string,status:"Reserved"|"Cancelled"}} Booking */

  const bookingForm = document.querySelector("[data-booking-form]");
  const manageForm = document.querySelector("[data-manage-form]");
  const bookingToast = document.querySelector("[data-booking-toast]");
  const manageToast = document.querySelector("[data-manage-toast]");

  const btnReschedule = document.querySelector("[data-reschedule]");
  const btnCancel = document.querySelector("[data-cancel]");

  /** @returns {Booking[]} */
  function loadBookings(){
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed;
    } catch {
      return [];
    }
  }

  /** @param {Booking[]} list */
  function saveBookings(list){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  function makeRef(){
    // NMD-XXXXXX
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let s = "";
    for (let i = 0; i < 6; i++){
      s += chars[Math.floor(Math.random() * chars.length)];
    }
    return `NMD-${s}`;
  }

  function showToast(el, msg){
    if (!el) return;
    el.textContent = msg;
    el.hidden = false;
    window.clearTimeout(el._t);
    el._t = window.setTimeout(() => (el.hidden = true), 5500);
  }

  // Reserve slot
  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const fd = new FormData(bookingForm);
      const name = String(fd.get("name") || "").trim();
      const email = String(fd.get("email") || "").trim();
      const service = String(fd.get("service") || "").trim();
      const platform = String(fd.get("platform") || "").trim();
      const date = String(fd.get("date") || "").trim();
      const time = String(fd.get("time") || "").trim();
      const notes = String(fd.get("notes") || "").trim();

      if (!name || !email || !service || !platform || !date || !time) {
        showToast(bookingToast, "Please complete all required fields.");
        return;
      }

      const ref = makeRef();
      const booking = { ref, name, email, service, platform, date, time, notes, status: "Reserved" };

      const list = loadBookings();
      list.unshift(booking);
      saveBookings(list);

      bookingForm.reset();
      showToast(bookingToast, `Reserved. Reference: ${ref}. Use this to cancel or reschedule.`);
    });
  }

  // Manage booking (demo)
  function findBooking(ref){
    const list = loadBookings();
    const idx = list.findIndex(b => b.ref.toUpperCase() === ref.toUpperCase());
    if (idx === -1) return { list, idx, booking: null };
    return { list, idx, booking: list[idx] };
  }

  if (btnCancel) {
    btnCancel.addEventListener("click", () => {
      if (!manageForm) return;

      const fd = new FormData(manageForm);
      const ref = String(fd.get("ref") || "").trim();
      if (!ref) {
        showToast(manageToast, "Enter your booking reference first.");
        return;
      }

      const { list, idx, booking } = findBooking(ref);
      if (!booking) {
        showToast(manageToast, "Booking reference not found (demo).");
        return;
      }

      list[idx] = { ...booking, status: "Cancelled" };
      saveBookings(list);
      showToast(manageToast, `Booking ${booking.ref} cancelled.`);
    });
  }

  if (btnReschedule) {
    btnReschedule.addEventListener("click", () => {
      if (!manageForm) return;

      const fd = new FormData(manageForm);
      const ref = String(fd.get("ref") || "").trim();
      const newDate = String(fd.get("newDate") || "").trim();
      const newTime = String(fd.get("newTime") || "").trim();

      if (!ref) {
        showToast(manageToast, "Enter your booking reference first.");
        return;
      }
      if (!newDate && !newTime) {
        showToast(manageToast, "Enter a new date or time to reschedule.");
        return;
      }

      const { list, idx, booking } = findBooking(ref);
      if (!booking) {
        showToast(manageToast, "Booking reference not found (demo).");
        return;
      }
      if (booking.status === "Cancelled") {
        showToast(manageToast, "This booking is already cancelled.");
        return;
      }

      list[idx] = {
        ...booking,
        date: newDate || booking.date,
        time: newTime || booking.time
      };
      saveBookings(list);

      showToast(manageToast, `Booking ${booking.ref} rescheduled to ${list[idx].date} at ${list[idx].time}.`);
    });
  }
})();
