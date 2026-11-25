// Escultura paramétrica: fita regrada que passa de grade (construção) a fluxo, e uma órbita.
// Compartilhada pelo gerador do hero (dev/escultura.mjs) e pelo experimento Forma & Espaço.
export const WIDTH = 1600;
export const HEIGHT = 900;

// Eixo: Bézier cúbica no espaço (p0 nasce sob o texto, p3 se recolhe sobre o topo).
// n amostras ao longo da fita, m intervalos entre as linhas longitudinais; câmera a cam, focal f.
export const DEFAULTS = {
  p0: [-1250, -330, 120], p1: [0, -560, 300], p2: [1000, 200, 0], p3: [300, 600, -300],
  th0: -0.35, tw: 3.0, ta: 0.3, tb: 0.75, ba: 0.3, h0: 230, h1: 120, tp: 0.6, tr: 0.5, rr: 1.8, cy: 0,
  n: 84, m: 12, cam: 1500, f: 1250,
  light: [-0.45, 0.75, 0.5],
  colors: [[0, 214, 207], [113, 72, 255]],
};

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
const hex = (c) => '#' + c.map((x) => Math.round(x).toString(16).padStart(2, '0')).join('');
const mix = (a, b, t) => a.map((x, k) => lerp(x, b[k], t));
const DEEP = [16, 12, 34], NIGHT = [14, 13, 22], DUSK = [44, 32, 92];
const fmt = (p) => `${Math.round(p[0])} ${Math.round(p[1])}`;

// Devolve a fita em trechos na ordem do pintor (faces sombreadas e linhas de cada trecho)
// e a órbita dividida em metade de trás e da frente, como caminhos SVG.
export function sculpt(options = {}) {
  const P = { ...DEFAULTS, ...options };
  const { n: N, m: M } = P;

  const center = (t) => {
    const u = 1 - t, c = [u * u * u, 3 * u * u * t, 3 * u * t * t, t * t * t];
    return [0, 1, 2].map((k) => c[0] * P.p0[k] + c[1] * P.p1[k] + c[2] * P.p2[k] + c[3] * P.p3[k]);
  };
  const tangent = (t) => v.norm(v.sub(center(t + 1e-3), center(t - 1e-3)));
  const twist = (t) => P.th0 + P.tw * smooth(P.ta, P.tb, t);
  // Largura: estreita depois da torção e afina na ponta, onde a curva se fecha.
  const half = (t) => lerp(P.h0, P.h1, smooth(P.ba, 1, t)) * (1 - P.tp * smooth(P.tb, 1, t));

  const frame = (t) => {
    const T = tangent(t);
    const th = twist(t);
    let w = [0, Math.sin(th), Math.cos(th)];
    w = v.norm(v.sub(w, v.mul(T, v.dot(w, T))));
    return { T, Wd: w, N: v.cross(T, w) };
  };
  const point = (t, s) => v.add(center(t), v.mul(frame(t).Wd, s * half(t)));
  const project = (p) => { const k = P.f / (P.cam - p[2]); return [WIDTH / 2 + p[0] * k, HEIGHT / 2 + P.cy - p[1] * k]; };
  const at = (t, s) => fmt(project(point(t, s)));

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

  const L = v.norm(P.light);
  const cam = [0, 0, P.cam];

  // Segmentos com face visível, profundidade e cor.
  const facingAt = (t) => v.dot(frame(t).N, v.sub(cam, center(t)));
  const sign0 = Math.sign(facingAt(0));
  const segs = [];
  for (let i = 0; i < N; i++) {
    const tm = (ts[i] + ts[i + 1]) / 2;
    const { N: nrm } = frame(tm);
    const build = tm < P.tb && Math.sign(facingAt(tm)) === sign0;
    const light = Math.abs(v.dot(nrm, L));
    const color = build
      ? mix(NIGHT, DUSK, light * 0.8)
      : mix(DEEP, mix(P.colors[0], P.colors[1], smooth(0.35, 0.9, tm)), 0.35 + 0.65 * light);
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

  const band = runs.map(({ lo, hi, build }) => {
    const faces = [];
    for (let i = lo; i <= hi; i++) {
      faces.push({ color: segs[i].color, d: `M${[at(ts[i], -1), at(ts[i + 1], -1), at(ts[i + 1], 1), at(ts[i], 1)].join('L')}Z` });
    }
    const idx = Array.from({ length: hi - lo + 2 }, (_, k) => lo + k);
    let lines = '';
    for (const s of ss) lines += 'M' + idx.map((i) => at(ts[i], s)).join('L');
    if (build) for (const i of rulings) if (i >= lo && i <= hi + 1) lines += `M${at(ts[i], -1)}L${at(ts[i], 1)}`;
    return { build, faces, lines };
  });

  // Órbita perpendicular à fita.
  const R = half(P.tr) * P.rr;
  const { T: To } = frame(P.tr);
  const U = v.norm(v.cross(To, [0, 1, 0]));
  const V = v.cross(To, U);
  const C0 = center(P.tr);
  const orbit = (k) => { const a = (k / 96) * Math.PI * 2; return v.add(C0, v.add(v.mul(U, R * Math.cos(a)), v.mul(V, R * Math.sin(a)))); };
  const isFront = (k) => orbit(k)[2] > C0[2];
  const trace = (from, to) => 'M' + Array.from({ length: to - from + 1 }, (_, i) => fmt(project(orbit(from + i)))).join('L');
  // Começa onde a órbita passa para a frente, para que cada metade seja um traço contínuo.
  const k0 = Array.from({ length: 96 }, (_, k) => k).find((k) => isFront(k) && !isFront(k - 1));
  if (k0 === undefined) return { band, front: '', back: trace(0, 96) };
  let k1 = k0;
  while (isFront(k1)) k1++;
  return { band, front: trace(k0, k1), back: trace(k1, k0 + 96) };
}
