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

// Só as animações de tempo; as vinculadas ao scroll seguem a rolagem.
const intro = hero
  ? hero.getAnimations({ subtree: true }).filter((animation) => animation.timeline === document.timeline)
  : [];
const finish = () => intro.forEach((animation) => animation.finish());

const introDone = Promise.allSettled(intro.map((animation) => animation.finished));

if (intro.length && introSeen()) {
  finish();
} else if (intro.length) {
  const listeners = new AbortController();

  for (const type of ['scroll', 'wheel', 'touchstart', 'keydown', 'pointerdown']) {
    addEventListener(type, () => { listeners.abort(); finish(); }, { passive: true, signal: listeners.signal });
  }
  introDone.then(() => listeners.abort());
}

// Resposta ao cursor (ver main.css): no máximo uma atualização por frame,
// só enquanto o cursor se move sobre o hero, e apenas após a abertura.
function followPointer() {
  let x = 0;
  let y = 0;
  let glow = 0;
  let frame = 0;
  const apply = () => {
    frame = 0;
    hero.style.setProperty('--px', x.toFixed(3));
    hero.style.setProperty('--py', y.toFixed(3));
    hero.style.setProperty('--glow', glow);
  };
  const update = (nextX, nextY, nextGlow) => {
    x = nextX;
    y = nextY;
    glow = nextGlow;
    frame ||= requestAnimationFrame(apply);
  };

  hero.addEventListener('pointermove', (event) => update((event.clientX / innerWidth) * 2 - 1, (event.clientY / innerHeight) * 2 - 1, 1), { passive: true });
  hero.addEventListener('pointerleave', () => update(0, 0, 0));
}

if (hero && matchMedia('(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)').matches) {
  introDone.then(followPointer);
}
