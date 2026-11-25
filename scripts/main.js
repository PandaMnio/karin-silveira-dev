import './nav.js';
import './lab.js';

// Contato: o botão de copiar só aparece com área de transferência.
const copy = document.querySelector('.contact-copy');

if (copy && navigator.clipboard) {
  const button = copy.querySelector('button');
  const status = copy.querySelector('[role="status"]');
  let clear = 0;

  copy.hidden = false;
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy);
      status.textContent = 'E-mail copiado.';
    } catch {
      status.textContent = 'Não foi possível copiar. Selecione o endereço acima.';
    }
    clearTimeout(clear);
    clear = setTimeout(() => { status.textContent = ''; }, 4000);
  });
}

// Abertura: toca a cada carregamento; qualquer interação a conclui.
const hero = document.querySelector('.hero');

// Só animações de tempo finitas; as de scroll seguem a rolagem e as contínuas nunca terminam.
const intro = hero
  ? hero.getAnimations({ subtree: true }).filter((animation) => animation.timeline === document.timeline && Number.isFinite(animation.effect.getComputedTiming().endTime))
  : [];
const finish = () => intro.forEach((animation) => animation.finish());

const introDone = Promise.allSettled(intro.map((animation) => animation.finished));

if (intro.length) {
  const listeners = new AbortController();

  for (const type of ['scroll', 'wheel', 'touchstart', 'keydown', 'pointerdown']) {
    addEventListener(type, () => { listeners.abort(); finish(); }, { passive: true, signal: listeners.signal });
  }
  introDone.then(() => listeners.abort());
}

// Resposta ao cursor: uma atualização por frame, só sobre o hero.
function followPointer() {
  let x = 0;
  let y = 0;
  let frame = 0;
  const apply = () => {
    frame = 0;
    hero.style.setProperty('--px', x.toFixed(3));
    hero.style.setProperty('--py', y.toFixed(3));
  };
  const update = (nextX, nextY) => {
    x = nextX;
    y = nextY;
    frame ||= requestAnimationFrame(apply);
  };

  hero.addEventListener('pointermove', (event) => update((event.clientX / innerWidth) * 2 - 1, (event.clientY / innerHeight) * 2 - 1), { passive: true });
  hero.addEventListener('pointerleave', () => update(0, 0));
}

if (hero && matchMedia('(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)').matches) {
  introDone.then(followPointer);
}

// Movimento contínuo: suspenso fora da tela e a pedido.
const pause = hero?.querySelector('.hero-pause');

if (pause && matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  pause.hidden = false;
  pause.addEventListener('click', () => {
    const paused = hero.classList.toggle('is-paused');
    pause.textContent = paused ? 'Retomar movimento' : 'Pausar movimento';
  });
  new IntersectionObserver(([entry]) => hero.classList.toggle('is-offscreen', !entry.isIntersecting)).observe(hero);
}
