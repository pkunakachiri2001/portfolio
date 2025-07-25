// JavaScript for smooth scroll, form validation, and interactive effects

document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll ONLY for same-page anchor links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // AJAX Contact form for custom thank you
  const form = document.getElementById('contact-form');
  if (form) {
    const successMsg = form.querySelector('.success');
    const errorMsg = form.querySelector('.error');
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      const valid = name && email && message && /\S+@\S+\.\S+/.test(email);

      if (!valid) {
        if (errorMsg) errorMsg.style.display = 'block';
        if (successMsg) successMsg.style.display = 'none';
        return;
      }

      // Hide error, show loading if you want
      if (errorMsg) errorMsg.style.display = 'none';

      // Prepare data
      const data = new FormData(form);

      fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      })
      .then(response => {
        if (response.ok) {
          if (successMsg) successMsg.style.display = 'block';
          form.reset();
          setTimeout(() => { if (successMsg) successMsg.style.display = 'none'; }, 4000);
        } else {
          return response.json().then(data => {
            if (errorMsg) errorMsg.style.display = 'block';
            if (data.errors) {
              errorMsg.textContent = data.errors.map(e => e.message).join(", ");
            }
          });
        }
      })
      .catch(() => {
        if (errorMsg) errorMsg.style.display = 'block';
        errorMsg.textContent = "There was a problem sending your message. Please try again later.";
      });
    });
  }
});
