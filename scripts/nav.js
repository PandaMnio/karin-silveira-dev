// Menu expansível em telas estreitas; sem JS, a navegação fica em linha.
const header = document.querySelector('.site-header');
const nav = header?.querySelector('nav');

if (nav) {
  const wide = matchMedia('(min-width: 56rem)');
  const button = document.createElement('button');

  nav.id ||= 'menu-principal';
  button.type = 'button';
  button.className = 'menu-toggle';
  button.setAttribute('aria-controls', nav.id);
  button.innerHTML = 'Menu<span class="menu-icon" aria-hidden="true"></span>';
  nav.before(button);
  header.classList.add('has-menu');

  const toggle = (open) => {
    header.classList.toggle('is-open', open);
    button.setAttribute('aria-expanded', open);
  };
  const isOpen = () => header.classList.contains('is-open');

  toggle(false);
  button.addEventListener('click', () => toggle(!isOpen()));
  nav.addEventListener('click', (event) => { if (event.target.closest('a')) toggle(false); });

  header.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) {
      toggle(false);
      button.focus();
    }
  });
  document.addEventListener('pointerdown', (event) => { if (!header.contains(event.target)) toggle(false); });
  header.addEventListener('focusout', (event) => { if (event.relatedTarget && !header.contains(event.relatedTarget)) toggle(false); });
  wide.addEventListener('change', () => toggle(false));
}
