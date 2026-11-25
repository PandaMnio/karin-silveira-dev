// Gera a escultura do hero (fita regrada que passa de grade, construção, a fluxo, e uma órbita)
// e a grava no SVG de index.html. Recurso de desenvolvimento, fora do artefato publicado.
// Uso, a partir da raiz: node dev/escultura.mjs
// Para experimentar, sobrescreva parâmetros: P='{"rr":1.5}' node dev/escultura.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const W = 1600, H = 900;
const CAM = 1500, F = 1250;
const N = 84;           // amostras ao longo da fita
const M = 12;           // linhas longitudinais (intervalos)
// Eixo: Bézier cúbica no espaço (p0 nasce sob o texto, p3 se recolhe sobre o topo).
const DEF = {
  p0: [-1250, -330, 120], p1: [0, -560, 300], p2: [1000, 200, 0], p3: [300, 600, -300],
  th0: -0.35, tw: 3.0, ta: 0.3, tb: 0.75, ba: 0.3, h0: 230, h1: 120, tp: 0.6, tr: 0.5, rr: 1.8, cy: 0,
};
const P = (o) => ({ ...DEF, ...JSON.parse(process.env.P || '{}') })[o];

const v = {
  add: (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]],
  sub: (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]],
  mul: (a, k) => [a[0] * k, a[1] * k, a[2] * k],
  dot: (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2],
  cross: (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]],
  norm: (a) => { const l = Math.hypot(...a) || 1; return [a[0] / l, a[1] / l, a[2] / l]; },
};
const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
const lerp = (a, b, t) => a + (b - a) * t;

function center(t) {
  const u = 1 - t, c = [u * u * u, 3 * u * u * t, 3 * u * t * t, t * t * t];
  return [0, 1, 2].map((k) => c[0] * P('p0')[k] + c[1] * P('p1')[k] + c[2] * P('p2')[k] + c[3] * P('p3')[k]);
}
const tangent = (t) => v.norm(v.sub(center(t + 1e-3), center(t - 1e-3)));
const twist = (t) => P('th0') + P('tw') * smooth(P('ta'), P('tb'), t);
// Largura: estreita depois da torção e afina na ponta, onde a curva se fecha.
const half = (t) => lerp(P('h0'), P('h1'), smooth(P('ba'), 1, t)) * (1 - P('tp') * smooth(P('tb'), 1, t));

function frame(t) {
  const T = tangent(t);
  const th = twist(t);
  let w = [0, Math.sin(th), Math.cos(th)];
  w = v.norm(v.sub(w, v.mul(T, v.dot(w, T))));
  return { T, Wd: w, N: v.cross(T, w) };
}
const point = (t, s) => { const f = frame(t); return v.add(center(t), v.mul(f.Wd, s * half(t))); };
const project = (p) => { const k = F / (CAM - p[2]); return [W / 2 + p[0] * k, H / 2 + P('cy') - p[1] * k]; };
const fmt = (p) => `${Math.round(p[0])} ${Math.round(p[1])}`;

const ts = Array.from({ length: N + 1 }, (_, i) => i / N);
const ss = Array.from({ length: M + 1 }, (_, j) => -1 + (2 * j) / M);

// Réguas transversais: espaçamento igual ao das linhas (células quadradas) e depois cada vez mais esparsas.
const rulings = [];
{
  let acc = 0, next = 0, gap = 0;
  for (let i = 1; i <= N; i++) {
    const t = ts[i];
    acc += Math.hypot(...v.sub(center(t), center(ts[i - 1])));
    const cell = (2 * half(t)) / M;
    if (!gap) gap = cell;
    if (acc >= next) {
      rulings.push(i);
      gap = t < 0.34 ? cell : gap * 1.55;
      next = acc + gap;
    }
    if (t > 0.62) break;
  }
}

const L = v.norm([-0.45, 0.75, 0.5]);
const cam = [0, 0, CAM];

const hex = (c) => '#' + c.map((x) => Math.round(x).toString(16).padStart(2, '0')).join('');
const mix = (a, b, t) => a.map((x, k) => lerp(x, b[k], t));
const AQUA = [0, 214, 207], UV = [113, 72, 255], DEEP = [16, 12, 34], NIGHT = [14, 13, 22], DUSK = [44, 32, 92];

// Segmentos com face visível, profundidade e cor.
const facingAt = (t) => v.dot(frame(t).N, v.sub(cam, center(t)));
const sign0 = Math.sign(facingAt(0));
const segs = [];
for (let i = 0; i < N; i++) {
  const tm = (ts[i] + ts[i + 1]) / 2;
  const { N: nrm } = frame(tm);
  const build = tm < P('tb') && Math.sign(facingAt(tm)) === sign0;
  const light = Math.abs(v.dot(nrm, L));
  const color = build
    ? mix(NIGHT, DUSK, light * 0.8)
    : mix(DEEP, mix(AQUA, UV, smooth(0.35, 0.9, tm)), 0.35 + 0.65 * light);
  segs.push({ i, build, z: center(tm)[2], color: hex(color) });
}

// Ordem do pintor, agrupando segmentos vizinhos da mesma face.
const order = [...segs].sort((a, b) => a.z - b.z);
const runs = [];
for (const s of order) {
  const r = runs.at(-1);
  if (r && r.build === s.build && (s.i === r.hi + 1 || s.i === r.lo - 1)) {
    r.lo = Math.min(r.lo, s.i); r.hi = Math.max(r.hi, s.i);
  } else runs.push({ lo: s.i, hi: s.i, build: s.build });
}

let band = '';
for (const r of runs) {
  const idx = Array.from({ length: r.hi - r.lo + 2 }, (_, k) => r.lo + k);
  for (let i = r.lo; i <= r.hi; i++) {
    const q = [point(ts[i], -1), point(ts[i + 1], -1), point(ts[i + 1], 1), point(ts[i], 1)].map((p) => fmt(project(p)));
    band += `<path color="${segs[i].color}" d="M${q.join('L')}Z"/>`;
  }
  let lines = '';
  for (const s of ss) lines += 'M' + idx.map((i) => fmt(project(point(ts[i], s)))).join('L');
  if (r.build) for (const i of rulings) if (i >= r.lo && i <= r.hi + 1) lines += `M${fmt(project(point(ts[i], -1)))}L${fmt(project(point(ts[i], 1)))}`;
  band += `<path class="${r.build ? 'line-c' : 'line-f'}" d="${lines}"/>`;
}

// Órbita perpendicular à fita, dividida em metade de trás e da frente.
const TR = P('tr');
const R = half(TR) * P('rr');
const { T: To } = frame(TR);
const U = v.norm(v.cross(To, [0, 1, 0]));
const V = v.cross(To, U);
const C0 = center(TR);
// Começa onde a órbita passa para a frente, para que cada metade seja um traço contínuo.
const orbit = (k) => { const a = (k / 96) * Math.PI * 2; return v.add(C0, v.add(v.mul(U, R * Math.cos(a)), v.mul(V, R * Math.sin(a)))); };
const isFront = (k) => orbit(k)[2] > C0[2];
const k0 = Array.from({ length: 96 }, (_, k) => k).find((k) => isFront(k) && !isFront(k - 1));
let k1 = k0;
while (isFront(k1)) k1++;
const trace = (from, to) => 'M' + Array.from({ length: to - from + 1 }, (_, i) => fmt(project(orbit(from + i)))).join('L');
const front = trace(k0, k1), back = trace(k1, k0 + 96);
// Atualiza só as geometrias (órbitas, fita e trajetória do acento) no SVG de index.html;
// a forma do acento e o restante do hero são mantidos à mão.
const file = new URL('../index.html', import.meta.url);
let html = readFileSync(file, 'utf8');
const bandSvg = band.replace(/class="line-c"/g, 'class="grid"').replace(/class="line-f"/g, 'class="flow"');
const swap = (re, fn) => {
  if (!re.test(html)) throw new Error('Trecho do hero não encontrado: ' + re);
  html = html.replace(re, fn);
};
html = html.replace(/(<svg class="hero-(?:orbit|band)[^"]*" viewBox=")[^"]*/g, (_, a) => a + `0 0 ${W} ${H}`);
swap(/(<svg class="hero-orbit" [^>]*><path d=")[^"]*/, (_, a) => a + back);
swap(/(<svg class="hero-band" [^>]*>).*?(<\/svg>)/, (_, a, b) => a + bandSvg + b);
swap(/(<svg class="hero-orbit hero-orbit-front" [^>]*><path d=")[^"]*/, (_, a) => a + front);
swap(/(offset-path:path\(')[^']*/, (_, a) => a + front);
writeFileSync(file, html);
