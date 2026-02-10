/**
 * Main JavaScript Module
 * 
 * Handles mobile navigation, form validation, and smooth scrolling.
 * No external dependencies - vanilla JavaScript only.
 */

/* ===== MOBILE NAVIGATION ===== */
/**
 * Toggles mobile navigation menu visibility
 */
function initMobileNav() {
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');

  if (!menuToggle || !mobileNav) return;

  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';

    // Toggle aria-expanded attribute for accessibility
    menuToggle.setAttribute('aria-expanded', !isExpanded);

    // Toggle active class to show/hide menu
    mobileNav.classList.toggle('active');
  });

  // Close mobile menu when clicking a link
  const mobileNavLinks = mobileNav.querySelectorAll('.nav-link');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileNav.classList.remove('active');
    });
  });
}

/* ===== FORM VALIDATION ===== */
/**
 * Validates email format using standard regex
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Displays error message for a form field
 * @param {HTMLElement} field - Input field element
 * @param {string} message - Error message to display
 */
function showError(field, message) {
  const formGroup = field.closest('.form-group');
  const errorMessage = formGroup.querySelector('.error-message');

  formGroup.classList.add('form-group-error');
  errorMessage.textContent = message;
  field.setAttribute('aria-invalid', 'true');
}

/**
 * Clears error message for a form field
 * @param {HTMLElement} field - Input field element
 */
function clearError(field) {
  const formGroup = field.closest('.form-group');
  const errorMessage = formGroup.querySelector('.error-message');

  formGroup.classList.remove('form-group-error');
  errorMessage.textContent = '';
  field.setAttribute('aria-invalid', 'false');
}

/**
 * Validates a single form field based on its type and requirements
 * @param {HTMLElement} field - Input field to validate
 * @returns {boolean} - True if field is valid
 */
function validateField(field) {
  const value = field.value.trim();
  const isRequired = field.hasAttribute('required');

  // Clear previous errors
  clearError(field);

  // Check if required field is empty
  if (isRequired && !value) {
    showError(field, 'This field is required');
    return false;
  }

  // Email validation
  if (field.type === 'email' && value && !isValidEmail(value)) {
    showError(field, 'Please enter a valid email address');
    return false;
  }

  // Checkbox validation (for privacy consent)
  if (field.type === 'checkbox' && isRequired && !field.checked) {
    showError(field, 'You must agree to the privacy policy to continue');
    return false;
  }

  // Select validation
  if (field.tagName === 'SELECT' && isRequired && !value) {
    showError(field, 'Please select an option');
    return false;
  }

  return true;
}

/**
 * Initializes form validation for the enquiry form
 */
function initFormValidation() {
  const form = document.getElementById('enquiryForm');
  if (!form) return;

  // Validate on blur (when field loses focus)
  const fields = form.querySelectorAll('input, textarea, select');
  fields.forEach(field => {
    field.addEventListener('blur', () => {
      validateField(field);
    });

    // Clear error on input
    field.addEventListener('input', () => {
      if (field.closest('.form-group').classList.contains('form-group-error')) {
        clearError(field);
      }
    });
  });

  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate all fields
    let isValid = true;
    fields.forEach(field => {
      if (!validateField(field)) {
        isValid = false;
      }
    });

    if (!isValid) {
      // Focus on first error field
      const firstError = form.querySelector('.form-group-error input, .form-group-error textarea, .form-group-error select');
      if (firstError) {
        firstError.focus();
      }
      return;
    }

    // If valid, handle form submission (placeholder - no backend in this demo)
    handleFormSubmission(form);
  });
}

/**
 * Handles form submission - placeholder for actual backend integration
 * @param {HTMLFormElement} form - Form element to submit
 */
async function handleFormSubmission(form) {
  const submitButton = form.querySelector('button[type="submit"]');
  const formFeedback = document.getElementById('formFeedback');

  // Disable submit button
  submitButton.disabled = true;
  submitButton.textContent = 'Sending...';

  // Simulate API call (replace with actual backend integration)
  // In production, this would POST to your email service or CRM
  setTimeout(() => {
    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Log form data for demonstration (remove in production)
    console.log('Form Data:', data);

    // Show success message
    formFeedback.style.display = 'block';
    formFeedback.className = 'card';
    formFeedback.style.background = 'var(--success-light)';
    formFeedback.style.borderLeft = '4px solid var(--success)';
    formFeedback.style.padding = 'var(--space-4)';
    formFeedback.innerHTML = `
      <h3 style="color: var(--success); margin-bottom: var(--space-2);">Enquiry sent successfully.</h3>
      <p>Thank you for contacting NMD Advisory. We've received your enquiry and will respond within 24-48 hours.</p>
      <p style="margin-top: var(--space-3); font-size: var(--text-sm); color: var(--color-text-muted);">
        <strong>Note:</strong> This is a demo. In production, this form would send your message via email or to a CRM system.
      </p>
    `;

    // Reset form
    form.reset();

    // Re-enable submit button
    submitButton.disabled = false;
    submitButton.textContent = 'Send Enquiry';

    // Scroll to feedback
    formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 1500);
}

/* ===== SMOOTH SCROLL ===== */
/**
 * Enables smooth scrolling for anchor links
 */
function initSmoothScroll() {
  // Get all anchor links that point to sections on the same page
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      // Ignore # links without targets
      if (href === '#' || !href) return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      // Smooth scroll to target
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      // Update URL without page jump
      history.pushState(null, null, href);

      // Focus on target for accessibility (skip links)
      if (link.classList.contains('skip-link')) {
        target.focus();
      }
    });
  });
}

/* ===== ACTIVE NAV HIGHLIGHTING ===== */
/**
 * Highlights the active navigation link based on current page
 */
function highlightActiveNav() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;

    // Check if link matches current page
    if (linkPath === currentPath ||
      (currentPath.includes(linkPath) && linkPath !== '/')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

/* ===== INITIALIZATION ===== */
/**
 * Initialize all modules when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initFormValidation();
  initSmoothScroll();
  highlightActiveNav();

  console.log('NMD Advisory website initialized');
});
