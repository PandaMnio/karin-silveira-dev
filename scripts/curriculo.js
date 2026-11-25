// Exportação em PDF pelo diálogo de impressão; sem JS, o botão permanece oculto.
const button = document.querySelector('[data-print]');

if (button && typeof window.print === 'function') {
  button.hidden = false;
  button.addEventListener('click', () => window.print());
}
