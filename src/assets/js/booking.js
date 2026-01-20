import { supabase } from '../../lib/supabase.js';

(() => {
  const bookingForm = document.querySelector("[data-booking-form]");
  const manageForm = document.querySelector("[data-manage-form]");
  const bookingToast = document.querySelector("[data-booking-toast]");
  const manageToast = document.querySelector("[data-manage-toast]");

  const btnReschedule = document.querySelector("[data-reschedule]");
  const btnCancel = document.querySelector("[data-cancel]");

  function makeRef() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let s = "";
    for (let i = 0; i < 6; i++) {
      s += chars[Math.floor(Math.random() * chars.length)];
    }
    return `NMD-${s}`;
  }

  function showToast(el, msg) {
    if (!el) return;
    el.textContent = msg;
    el.hidden = false;
    window.clearTimeout(el._t);
    el._t = window.setTimeout(() => (el.hidden = true), 5500);
  }

  // Reserve slot
  if (bookingForm) {
    bookingForm.addEventListener("submit", async (e) => {
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

      const { data, error } = await supabase
        .from('bookings')
        .insert([{
          ref_code: ref,
          name,
          email,
          service,
          platform,
          booking_date: date,
          booking_time: time,
          notes,
          status: 'Pending'
        }]);

      if (error) {
        showToast(bookingToast, `Error: ${error.message}`);
      } else {
        bookingForm.reset();
        showToast(bookingToast, `Request received. Reference: ${ref}. We will confirm shortly.`);
      }
    });
  }

  // Manage booking
  if (btnCancel) {
    btnCancel.addEventListener("click", async () => {
      if (!manageForm) return;

      const fd = new FormData(manageForm);
      const ref = String(fd.get("ref") || "").trim();
      if (!ref) {
        showToast(manageToast, "Enter your booking reference first.");
        return;
      }

      const { data, error } = await supabase
        .from('bookings')
        .update({ status: 'Cancelled' })
        .eq('ref_code', ref.toUpperCase())
        .select();

      if (error) {
        showToast(manageToast, `Error: ${error.message}`);
      } else if (data && data.length > 0) {
        showToast(manageToast, `Booking ${ref} cancelled.`);
      } else {
        showToast(manageToast, "Booking reference not found.");
      }
    });
  }

  if (btnReschedule) {
    btnReschedule.addEventListener("click", async () => {
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

      const updates = {};
      if (newDate) updates.booking_date = newDate;
      if (newTime) updates.booking_time = newTime;

      const { data, error } = await supabase
        .from('bookings')
        .update(updates)
        .eq('ref_code', ref.toUpperCase())
        .select();

      if (error) {
        showToast(manageToast, `Error: ${error.message}`);
      } else if (data && data.length > 0) {
        showToast(manageToast, `Booking ${ref} rescheduled.`);
      } else {
        showToast(manageToast, "Booking reference not found.");
      }
    });
  }
})();
