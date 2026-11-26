import './nav.js';

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

const pause = hero?.querySelector('.hero-pause');

if (pause && matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  pause.hidden = false;
  pause.addEventListener('click', () => {
    const paused = hero.classList.toggle('is-paused');
    pause.textContent = paused ? 'Retomar movimento' : 'Pausar movimento';
  });
  new IntersectionObserver(([entry]) => hero.classList.toggle('is-offscreen', !entry.isIntersecting)).observe(hero);
}

const track = document.querySelector('.works-track');
const controls = document.querySelector('.works-controls');

if (track && controls) {
  const items = [...track.children];
  const [prev, next] = controls.querySelectorAll('button');
  const current = document.createElement('span');
  const pad = (n) => String(n).padStart(2, '0');
  const smooth = matchMedia('(prefers-reduced-motion: no-preference)');
  const visible = new Set();
  let index = 0;

  controls.querySelector('.works-count').replaceChildren(current, ` / ${pad(items.length)}`);

  // aria-disabled em vez de disabled: o botão mantém o foco ao chegar a uma das pontas.
  const render = () => {
    if (visible.size) index = Math.min(...visible);
    current.textContent = pad(index + 1);
    prev.setAttribute('aria-disabled', String(visible.has(0)));
    next.setAttribute('aria-disabled', String(visible.has(items.length - 1)));
    controls.hidden = visible.size === items.length;
  };

  const go = (step) => {
    const target = items[Math.min(Math.max(index + step, 0), items.length - 1)];
    track.scrollTo({ left: target.offsetLeft - items[0].offsetLeft, behavior: smooth.matches ? 'smooth' : 'auto' });
  };

  prev.addEventListener('click', () => go(-1));
  next.addEventListener('click', () => go(1));

  // O navegador não rola um link parcialmente visível ao receber foco; o projeto focado vem inteiro.
  track.addEventListener('focusin', (event) => {
    const item = event.target.closest('.work');
    if (item) go(items.indexOf(item) - index);
  });

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const i = items.indexOf(entry.target);
      if (entry.intersectionRatio >= 0.95) visible.add(i);
      else visible.delete(i);
    }
    render();
  }, { root: track, threshold: 0.95 });

  items.forEach((item) => observer.observe(item));
}
