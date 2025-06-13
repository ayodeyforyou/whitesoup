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
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const name = form.elements['name'].value;
      const email = form.elements['email'].value;
      const message = form.elements['message'].value;
      const statusDiv = document.getElementById('form-status');
      statusDiv.textContent = 'Sending...';
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
    });
  }
});