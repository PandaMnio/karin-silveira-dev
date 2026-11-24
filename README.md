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
├── styles/main.css
├── scripts/main.js    # Módulo de entrada
├── assets/fonts/      # Fontes WOFF2 e licenças
├── index.html
└── AGENTS.md          # Instruções para agentes de IA
```

## Execução local

Sirva o site por HTTP (via `file://`, os módulos JavaScript não carregam). A partir da raiz:

```sh
python3 -m http.server 8000
```

Acesse <http://localhost:8000/>. Qualquer servidor estático, como o Live Server do editor, também funciona.

## Documentação

- [Briefing](docs/BRIEFING.md): propósito, posicionamento, públicos e conteúdo.
- [Design](docs/DESIGN.md): direção artística, paleta, tipografia e movimento.
- [Arquitetura](docs/ARCHITECTURE.md): decisões técnicas e organização do código.
- [Roadmap](docs/ROADMAP.md): etapas e critérios de aceite.
- [AGENTS.md](AGENTS.md): diretrizes para agentes de IA.
