// Experimentos do Laboratório. Só redesenham em resposta à interação.
const root = document.querySelector('[data-experiment="construcao-fluxo"]');
const light = document.querySelector('[data-experiment="luz-espectro"]');
const type = document.querySelector('[data-experiment="tipo-ritmo"]');

if (root) setup(root);
if (light) lightSpectrum(light);
if (type) typeRhythm(type);

// "Construção & Fluxo": uma grade que se transforma em correntes.

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

  // Fluxo: ondas que se cruzam. Lente: afasta (construção) ou gira (fluxo) as linhas.
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

  // Com movimento reduzido, só o controle deslizante altera a grade.
  if (!reduce) {
    svg.addEventListener('pointermove', point, { passive: true });
    svg.addEventListener('pointerdown', point, { passive: true });
    // No toque, a lente permanece onde foi tocada.
    svg.addEventListener('pointerleave', (event) => {
      if (event.pointerType === 'touch') return;
      target.lens = 0;
      request();
    });
  }

  control.setAttribute('aria-valuetext', valueText());
  draw();
  root.classList.add('is-ready');
  root.querySelector('.experiment-control').hidden = false;
}

// "Luz & Espectro": luzes somadas em tela; cada uma projeta a sombra do painel.
function lightSpectrum(root) {
  const SIZE = 1000;
  const MARGIN = 40;
  const FAR = 1500;
  const PANEL = [[430, 400], [570, 400], [570, 640], [430, 640]];

  const stage = root.querySelector('.light-stage');
  const beams = stage.querySelectorAll('.light-beam');
  const masks = stage.querySelectorAll('mask path');
  const lights = Array.from(stage.querySelectorAll('.light-handle'), (handle, index) => ({
    handle,
    name: handle.textContent,
    x: Number(handle.dataset.x),
    y: Number(handle.dataset.y),
    beam: beams[index],
    glow: beams[index].firstElementChild,
    shadow: masks[index],
    input: root.querySelector(`[data-intensity="${handle.dataset.light}"]`),
  }));
  const dirty = new Set();
  let frame = 0;

  // A sombra é a união das faces do painel estendidas para longe da luz.
  function shadow(x, y) {
    const extend = ([px, py]) => {
      const length = Math.hypot(px - x, py - y) || 1;
      return [px + ((px - x) / length) * FAR, py + ((py - y) / length) * FAR];
    };
    return PANEL.map((a, index) => {
      const b = PANEL[(index + 1) % PANEL.length];
      const quad = [a, b, extend(b), extend(a)];
      // Mesma orientação em todas, para que a regra nonzero as una.
      const area = quad.reduce((sum, [x1, y1], i) => {
        const [x2, y2] = quad[(i + 1) % quad.length];
        return sum + x1 * y2 - x2 * y1;
      }, 0);
      if (area < 0) quad.reverse();
      return `M${quad.map(([px, py]) => `${Math.round(px)} ${Math.round(py)}`).join('L')}Z`;
    }).join('');
  }

  const zone = (value, names) => names[Math.min(2, Math.floor((value / SIZE) * 3))];

  function draw() {
    frame = 0;
    for (const light of dirty) {
      const intensity = light.input.value / 100;
      light.glow.setAttribute('cx', light.x);
      light.glow.setAttribute('cy', light.y);
      light.glow.setAttribute('r', Math.round(300 + 240 * intensity));
      light.beam.setAttribute('opacity', intensity);
      light.shadow.setAttribute('d', shadow(light.x, light.y));
      light.handle.style.setProperty('--x', light.x);
      light.handle.style.setProperty('--y', light.y);
      light.handle.setAttribute('aria-label', `${light.name}: ${zone(light.x, ['à esquerda', 'ao centro', 'à direita'])}, ${zone(light.y, ['no alto', 'no meio', 'embaixo'])}`);
    }
    dirty.clear();
  }

  function update(light, x, y) {
    light.x = Math.round(Math.min(SIZE - MARGIN, Math.max(MARGIN, x)));
    light.y = Math.round(Math.min(SIZE - MARGIN, Math.max(MARGIN, y)));
    dirty.add(light);
    frame ||= requestAnimationFrame(draw);
  }

  const keys = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };

  for (const light of lights) {
    const { handle } = light;
    const move = (event) => {
      const box = stage.getBoundingClientRect();
      update(light, ((event.clientX - box.left) / box.width) * SIZE, ((event.clientY - box.top) / box.height) * SIZE);
    };

    handle.addEventListener('pointerdown', (event) => {
      handle.setPointerCapture(event.pointerId);
      handle.focus();
      move(event);
    });
    handle.addEventListener('pointermove', (event) => {
      if (handle.hasPointerCapture(event.pointerId)) move(event);
    });
    handle.addEventListener('keydown', (event) => {
      const step = keys[event.key];
      if (!step) return;
      event.preventDefault();
      const distance = event.shiftKey ? 100 : 20;
      update(light, light.x + step[0] * distance, light.y + step[1] * distance);
    });
    light.input.addEventListener('input', () => update(light, light.x, light.y));
    update(light, light.x, light.y);
  }

  draw();
  stage.querySelector('.light-handles').hidden = false;
  root.querySelector('.study-controls').hidden = false;
}

// "Tipo & Ritmo": escala modular nomeada pelos intervalos musicais.
function typeRhythm(root) {
  const INTERVALS = [
    ['Segunda menor', 1.067],
    ['Segunda maior', 1.125],
    ['Terça menor', 1.2],
    ['Terça maior', 1.25],
    ['Quarta justa', 1.333],
    ['Quinta justa', 1.5],
    ['Proporção áurea', 1.618],
  ];
  const stage = root.querySelector('.type-stage');
  const ratio = root.querySelector('[data-type="ratio"]');
  const space = root.querySelector('[data-type="space"]');
  const rhythm = root.querySelector('[data-type="rhythm"]');
  const output = root.querySelector('output');
  const number = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 3 });

  function apply() {
    const [name, value] = INTERVALS[ratio.value];
    const text = `${name} · ${number.format(value)}`;
    for (let step = 0; step <= 3; step += 1) {
      stage.style.setProperty(`--s${step}`, (value ** (step - 3)).toFixed(3));
    }
    const spacing = space.value / 100;
    stage.style.setProperty('--tracking', (-0.04 + 0.24 * spacing).toFixed(3));
    stage.style.setProperty('--leading', (1 + 0.35 * spacing).toFixed(3));
    stage.style.setProperty('--rhythm', rhythm.value / 100);
    output.textContent = text;
    ratio.setAttribute('aria-valuetext', text);
  }

  for (const input of [ratio, space, rhythm]) input.addEventListener('input', apply);
  apply();
  root.querySelector('.study-controls').hidden = false;
}
