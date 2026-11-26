const button = document.querySelector('[data-print]');

if (button && typeof window.print === 'function') {
  button.hidden = false;
  button.addEventListener('click', () => window.print());
}
