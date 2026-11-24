// Abertura do hall de entrada: completa só no primeiro acesso da sessão;
// qualquer interação a conclui imediatamente. A animação em si está no CSS.
const hero = document.querySelector('.hero');

function introSeen() {
  try {
    if (sessionStorage.getItem('intro-seen')) return true;
    sessionStorage.setItem('intro-seen', '1');
  } catch {
    // Sem sessionStorage, a abertura apenas toca novamente.
  }
  return false;
}

if (hero && introSeen()) {
  document.documentElement.classList.add('no-intro');
} else if (hero) {
  const animations = hero.getAnimations({ subtree: true });
  const listeners = new AbortController();
  const finish = () => {
    listeners.abort();
    animations.forEach((animation) => animation.finish());
  };

  for (const type of ['scroll', 'wheel', 'touchstart', 'keydown', 'pointerdown']) {
    addEventListener(type, finish, { passive: true, signal: listeners.signal });
  }
  Promise.allSettled(animations.map((animation) => animation.finished)).then(() => listeners.abort());
}
