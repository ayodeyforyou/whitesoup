// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');
hamburger.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// Smooth Scrolling for Anchor Links
const links = document.querySelectorAll('a[href^="#"]');

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70, // Adjust for sticky header height
        behavior: "smooth",
      });
    }
  });
});

// Email Validation Function
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Dropdown Selection Logging (Optional)
const languageDropdown = document.getElementById("language");
const currencyDropdown = document.getElementById("currency");

if (languageDropdown && currencyDropdown) {
  languageDropdown.addEventListener("change", () => {
    console.log(`Language selected: ${languageDropdown.value}`);
  });

  currencyDropdown.addEventListener("change", () => {
    console.log(`Currency selected: ${currencyDropdown.value}`);
  });
}

// Contact form backend integration
// Enhanced: disable button while sending, show error for invalid email, clear on success

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('contact-submit');
  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const name = form.elements['name'].value.trim();
      const email = form.elements['email'].value.trim();
      const message = form.elements['message'].value.trim();
      const statusDiv = document.getElementById('form-status');
      statusDiv.textContent = '';
      // Basic validation
      if (!name || !email || !message) {
        statusDiv.textContent = 'Please fill in all fields.';
        return;
      }
      if (!validateEmail(email)) {
        statusDiv.textContent = 'Please enter a valid email address.';
        return;
      }
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      try {
        const response = await fetch('https://exposee-backend.onrender.com/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message })
        });
        const data = await response.json();
        if (response.ok) {
          statusDiv.textContent = data.message;
          form.reset();
        } else {
          statusDiv.textContent = data.error || 'Failed to send message.';
        }
      } catch (err) {
        statusDiv.textContent = 'Failed to send message. Please try again later.';
      }
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    });
  }
});

// Global Loader Utility
function showGlobalLoader(show = true) {
  const loader = document.getElementById('global-loader');
  if (loader) {
    loader.style.display = show ? 'flex' : 'none';
    loader.setAttribute('aria-busy', show ? 'true' : 'false');
  }
}

// Example usage: showGlobalLoader(true); // to show, showGlobalLoader(false); // to hide

// Optionally, you can show the loader on navigation or AJAX events as needed.