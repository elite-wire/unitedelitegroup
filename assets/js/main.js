// =============================================
// United Elite Group — main.js
// =============================================

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initFaqAccordion();
  initTestimonialSlider();
  initMobileMenu();
  initProjectFilters();
  initScrollReveal();
});

// --- Sticky header shadow ---
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// --- FAQ accordion ---
function initFaqAccordion() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

// --- Testimonial slider ---
function initTestimonialSlider() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonial-dot');
  if (!slides.length) return;

  let current = 0;

  function goTo(index) {
    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
  }

  document.querySelectorAll('.testimonial-prev').forEach(btn =>
    btn.addEventListener('click', () => goTo(current - 1))
  );
  document.querySelectorAll('.testimonial-next').forEach(btn =>
    btn.addEventListener('click', () => goTo(current + 1))
  );
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  // Auto-advance every 6s
  setInterval(() => goTo(current + 1), 6000);
}

// --- Mobile menu ---
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.nav-mobile-drawer');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('open', !open);
    document.body.classList.toggle('menu-open', !open);
  });
}

// --- Portfolio filters ---
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.type === filter;
        card.style.display = match ? '' : 'none';
      });
    });
  });
}

// --- Scroll-reveal ---
function initScrollReveal() {
  if (!('IntersectionObserver' in window)) return;
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
}
