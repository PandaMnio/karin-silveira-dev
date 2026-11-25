# Karin Silveira — Portfólio

Portfólio pessoal de Karin Silveira, concebido como o hall de entrada de um estúdio criativo pessoal: um espaço profissional para apresentar trabalhos de desenvolvimento e também um lugar para experimentação e criações multidisciplinares.

> Projeto em desenvolvimento. O conteúdo atual é provisório.

## Conceito criativo

**Construção + Fluxo (Construction & Flow):** a lógica e a precisão da construção convivem com a fluidez, a transformação e a liberdade criativa.

## Stack

HTML, CSS e JavaScript nativos (ES Modules), sem dependências nem etapa de build.

## Estrutura

```text
.
├── docs/              # Documentação do projeto
├── dev/               # Gerador da escultura do hero (Node 22.12+, fora do artefato publicado)
├── .github/workflows/ # Publicação no GitHub Pages
├── styles/main.css
├── scripts/           # main.js (entrada), lab.js (experimentos) e escultura.js (geometria do hero)
├── assets/fonts/      # Fontes WOFF2 e licenças
├── assets/images/     # Imagens otimizadas (WebP)
├── assets/icons/      # Sprite SVG de tecnologias
├── projetos/         # Acervo de projetos
├── index.html
├── 404.html           # Caminhos absolutos a partir do subcaminho do site
└── AGENTS.md          # Instruções para agentes de IA
```

## Execução local

Sirva o site por HTTP (via `file://`, os módulos JavaScript não carregam). A partir da raiz:

```sh
python3 -m http.server 8000
```

Acesse <http://localhost:8000/>. Qualquer servidor estático, como o Live Server do editor, também funciona.

A `404.html` usa caminhos a partir de `/karin-silveira-dev/`, o subcaminho publicado, e só aparece com o estilo completo no GitHub Pages.

## Documentação

- [Briefing](docs/BRIEFING.md): propósito, posicionamento, públicos e conteúdo.
- [Design](docs/DESIGN.md): direção artística, paleta, tipografia e movimento.
- [Arquitetura](docs/ARCHITECTURE.md): decisões técnicas e organização do código.
- [Roadmap](docs/ROADMAP.md): etapas e critérios de aceite.
- [AGENTS.md](AGENTS.md): diretrizes para agentes de IA.
