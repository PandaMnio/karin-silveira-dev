// Experimento "Construção & Fluxo": uma grade que se transforma em correntes.
// Desenha só quando algo muda; o laço de quadros para assim que tudo se assenta.
const root = document.querySelector('[data-experiment="construcao-fluxo"]');

if (root) setup(root);

function setup(root) {
  const NS = 'http://www.w3.org/2000/svg';
  const WIDTH = 1200;
  const HEIGHT = 750;
  const ROWS = 14;
  const COLS = 22;
  const STEP = 10;
  const LENS = 150;

  const svg = root.querySelector('svg');
  const control = root.querySelector('input[type="range"]');
  const lens = svg.querySelector('.lab-lens');
  const accent = svg.querySelector('.lab-accent');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const paths = (group, count) => Array.from({ length: count + 1 }, () => group.appendChild(document.createElementNS(NS, 'path')));
  const columns = paths(svg.querySelector('.lab-grid'), COLS);
  const rows = paths(svg.querySelector('.lab-streams'), ROWS);

  const target = { flow: control.value / 100, x: WIDTH / 2, y: HEIGHT / 2, lens: 0 };
  const state = { ...target };
  let phase = 0;
  let frame = 0;

  // Fluxo: ondas que se cruzam. Lente: na construção afasta as linhas; no fluxo, as faz girar.
  function displace(x, y) {
    const { flow } = state;
    let dx = flow * 26 * Math.cos(y * 0.011 + x * 0.004 + phase);
    let dy = flow * 46 * Math.sin(x * 0.0075 + y * 0.006 + phase);

    if (state.lens > 0.001) {
      const ox = x - state.x;
      const oy = y - state.y;
      const distance = Math.hypot(ox, oy) || 1;
      // Some no centro, para as linhas se abrirem sem dobrar.
      const squared = distance * distance;
      const push = 55 * state.lens * Math.exp(-squared / (2 * LENS * LENS)) * (1 - Math.exp(-squared / 5000));
      dx += (push / distance) * (ox * (1 - flow) - oy * flow);
      dy += (push / distance) * (oy * (1 - flow) + ox * flow);
    }
    return [x + dx, y + dy];
  }

  function line(fixed, horizontal) {
    let d = '';
    const end = (horizontal ? WIDTH : HEIGHT) + STEP * 2;
    for (let t = -STEP * 2; t <= end; t += STEP) {
      const [x, y] = horizontal ? displace(t, fixed) : displace(fixed, t);
      d += `${d ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`;
    }
    return d;
  }

  function draw() {
    rows.forEach((path, index) => path.setAttribute('d', line((index * HEIGHT) / ROWS, true)));
    columns.forEach((path, index) => path.setAttribute('d', line((index * WIDTH) / COLS, false)));

    const [ax, ay] = displace(WIDTH * 0.68, HEIGHT * 0.32);
    accent.setAttribute('x', (ax - 9).toFixed(1));
    accent.setAttribute('y', (ay - 9).toFixed(1));
    lens.setAttribute('cx', state.x.toFixed(1));
    lens.setAttribute('cy', state.y.toFixed(1));
    lens.style.opacity = state.lens.toFixed(3);
    root.style.setProperty('--flow', state.flow.toFixed(3));
  }

  function tick() {
    frame = 0;
    const ease = reduce ? 1 : 0.14;
    let settling = false;

    for (const [key, precision] of [['flow', 0.001], ['lens', 0.001], ['x', 0.5], ['y', 0.5]]) {
      const delta = target[key] - state[key];
      if (Math.abs(delta) > precision) {
        state[key] += delta * ease;
        settling = true;
      } else {
        state[key] = target[key];
      }
    }

    draw();
    if (settling) frame = requestAnimationFrame(tick);
  }

  const request = () => {
    frame ||= requestAnimationFrame(tick);
  };

  function valueText() {
    const value = Number(control.value);
    if (value === 0) return 'Construção';
    if (value === 100) return 'Fluxo';
    return `${value}% fluxo`;
  }

  control.addEventListener('input', () => {
    target.flow = control.value / 100;
    control.setAttribute('aria-valuetext', valueText());
    request();
  });

  // O movimento do ponteiro também faz a corrente avançar.
  function point(event) {
    const { x, y } = new DOMPoint(event.clientX, event.clientY).matrixTransform(svg.getScreenCTM().inverse());
    if (state.lens < 0.01) {
      state.x = x;
      state.y = y;
    } else {
      phase += Math.hypot(x - target.x, y - target.y) * 0.002;
    }
    Object.assign(target, { x, y, lens: 1 });
    request();
  }

  svg.addEventListener('pointermove', point, { passive: true });
  svg.addEventListener('pointerdown', point, { passive: true });
  // No toque, a lente permanece onde foi tocada.
  svg.addEventListener('pointerleave', (event) => {
    if (event.pointerType === 'touch') return;
    target.lens = 0;
    request();
  });

  control.setAttribute('aria-valuetext', valueText());
  draw();
  root.classList.add('is-ready');
  root.querySelector('.experiment-control').hidden = false;
}
