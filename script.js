/* ══════════════════════════════════════
   CleanLab — script.js
   ══════════════════════════════════════ */

/* ─── Language Toggle ─── */
let currentLang = 'es';

function setLanguage(lang) {
  currentLang = lang;

  // Update all elements with data-es / data-en
  document.querySelectorAll('[data-es]').forEach(el => {
    const text = el.getAttribute('data-' + lang);
    if (text) el.innerHTML = text;
  });

  // Update placeholders
  document.querySelectorAll('[data-placeholder-' + lang + ']').forEach(el => {
    el.placeholder = el.getAttribute('data-placeholder-' + lang);
  });

  // Update select options
  document.querySelectorAll('select option[data-es]').forEach(opt => {
    const text = opt.getAttribute('data-' + lang);
    if (text) opt.textContent = text;
  });

  // Update lang buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  // Update html lang attribute
  document.documentElement.lang = lang;
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => setLanguage(btn.getAttribute('data-lang')));
});


/* ─── Mobile Menu ─── */
const burger = document.getElementById('burger');
const nav    = document.getElementById('nav');

burger.addEventListener('click', () => {
  nav.classList.toggle('open');
  burger.classList.toggle('open');
});

// Close menu when a nav link is clicked
nav.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    burger.classList.remove('open');
  });
});


/* ─── Sticky Header Shadow ─── */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
});


/* ─── Booking Form ─── */
const form    = document.getElementById('bookingForm');
const success = document.getElementById('formSuccess');

form.addEventListener('submit', async (e) => {
  const action = form.getAttribute('action');

  // If the form still has the placeholder action, just show success (no real submit)
  if (action.includes('YOUR_FORM_ID')) {
    e.preventDefault();
    success.hidden = false;
    form.reset();
    setTimeout(() => { success.hidden = true; }, 4000);
    return;
  }

  // Real Formspree submission
  e.preventDefault();
  const data = new FormData(form);

  try {
    const res = await fetch(action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      success.hidden = false;
      form.reset();
      setTimeout(() => { success.hidden = true; }, 5000);
    } else {
      alert(currentLang === 'es'
        ? 'Hubo un error. Por favor llámanos directamente.'
        : 'There was an error. Please call us directly.');
    }
  } catch {
    alert(currentLang === 'es'
      ? 'Sin conexión. Por favor llámanos directamente.'
      : 'No connection. Please call us directly.');
  }
});


/* ─── Scroll Reveal (simple fade-in) ─── */
const revealEls = document.querySelectorAll(
  '.service-card, .step, .review-card, .gallery-pair, .trust-item'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  observer.observe(el);
});

// Add CSS class that triggers animation
const style = document.createElement('style');
style.textContent = '.visible { opacity: 1 !important; transform: none !important; }';
document.head.appendChild(style);
