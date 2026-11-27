import './nav.js';

const opening = document.querySelector('.offer-open');
const pause = opening?.querySelector('.offer-pause');

if (pause && matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  pause.hidden = false;
  pause.addEventListener('click', () => {
    const paused = opening.classList.toggle('is-paused');
    pause.textContent = paused ? 'Retomar movimento' : 'Pausar movimento';
  });
  new IntersectionObserver(([entry]) => opening.classList.toggle('is-offscreen', !entry.isIntersecting)).observe(opening);
}
