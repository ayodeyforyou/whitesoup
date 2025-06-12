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

// Form Validation for Contact Form
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = contactForm.querySelector('input[placeholder="Your Name"]');
    const email = contactForm.querySelector('input[placeholder="Your Email"]');
    const message = contactForm.querySelector("textarea");

    if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
      alert("Please fill out all fields.");
      return;
    }

    if (!validateEmail(email.value)) {
      alert("Please enter a valid email address.");
      return;
    }

    alert("Thank you for your message! We'll get back to you soon.");
    contactForm.reset();
  });
}

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