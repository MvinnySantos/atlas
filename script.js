const header = document.querySelector('.header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

menuToggle.addEventListener('click', () => {
  const open = menuToggle.classList.toggle('active');
  nav.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && nav.classList.contains('open')) {
    menuToggle.classList.remove('active');
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.focus();
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
document.getElementById('year').textContent = new Date().getFullYear();

const WHATSAPP_NUMBER = '5571994125137';

document.querySelectorAll('.whatsapp-link').forEach((link) => {
  const currentUrl = new URL(link.href);
  link.href = `https://wa.me/${WHATSAPP_NUMBER}${currentUrl.search}`;
});

const canUseParallax = window.matchMedia('(min-width: 821px)').matches
  && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (canUseParallax) {
  const parallaxGrid = document.querySelector('[data-parallax="grid"]');
  const parallaxContent = document.querySelector('[data-parallax="content"]');
  const parallaxVisual = document.querySelector('[data-parallax="visual"]');
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const offset = Math.min(window.scrollY, 600);
        if (parallaxGrid) parallaxGrid.style.transform = `translateY(${offset * 0.08}px)`;
        if (parallaxContent) parallaxContent.style.transform = `translateY(${offset * 0.025}px)`;
        if (parallaxVisual) parallaxVisual.style.transform = `translateY(${offset * -0.025}px)`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}
