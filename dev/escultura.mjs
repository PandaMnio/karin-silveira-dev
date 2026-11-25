// Gera a escultura do hero e a grava no SVG de index.html; a geometria vem de scripts/escultura.js.
// Recurso de desenvolvimento, fora do artefato publicado.
// Uso, a partir da raiz: node dev/escultura.mjs
// Para experimentar, sobrescreva parâmetros: P='{"rr":1.5}' node dev/escultura.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { WIDTH, HEIGHT, sculpt } from '../scripts/escultura.js';

const { band, front, back } = sculpt(JSON.parse(process.env.P || '{}'));
const bandSvg = band.map(({ build, faces, lines }) =>
  faces.map(({ color, d }) => `<path color="${color}" d="${d}"/>`).join('') + `<path class="${build ? 'grid' : 'flow'}" d="${lines}"/>`,
).join('');

// Atualiza só as geometrias (órbitas, fita e trajetória do acento) no SVG de index.html;
// a forma do acento e o restante do hero são mantidos à mão.
const file = new URL('../index.html', import.meta.url);
let html = readFileSync(file, 'utf8');
const swap = (re, fn) => {
  if (!re.test(html)) throw new Error('Trecho do hero não encontrado: ' + re);
  html = html.replace(re, fn);
};
html = html.replace(/(<svg class="hero-(?:orbit|band)[^"]*" viewBox=")[^"]*/g, (_, a) => a + `0 0 ${WIDTH} ${HEIGHT}`);
swap(/(<svg class="hero-orbit" [^>]*><path d=")[^"]*/, (_, a) => a + back);
swap(/(<svg class="hero-band" [^>]*>).*?(<\/svg>)/, (_, a, b) => a + bandSvg + b);
swap(/(<svg class="hero-orbit hero-orbit-front" [^>]*><path d=")[^"]*/, (_, a) => a + front);
swap(/(offset-path:path\(')[^']*/, (_, a) => a + front);
writeFileSync(file, html);
