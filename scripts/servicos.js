import './nav.js';

const offer = document.querySelector('.offer');
const illustrations = document.querySelectorAll('.illo');
const toggles = document.querySelectorAll('.illo .pause-toggle');

if (offer && illustrations.length && matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  offer.classList.add('has-motion');

  for (const toggle of toggles) {
    toggle.hidden = false;
    toggle.addEventListener('click', () => {
      const paused = offer.classList.toggle('is-paused');
      for (const each of toggles) each.textContent = paused ? 'Retomar movimento' : 'Pausar movimento';
    });
  }

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) entry.target.classList.toggle('is-offscreen', !entry.isIntersecting);
  });

  for (const illustration of illustrations) observer.observe(illustration);
}
