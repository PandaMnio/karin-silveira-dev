# Karin Silveira — Portfólio

Portfólio pessoal de Karin Silveira, concebido como o hall de entrada de um estúdio criativo pessoal: um espaço profissional para apresentar trabalhos de desenvolvimento e também um lugar para experimentação e criações multidisciplinares.

Publicado em <https://pandamnio.github.io/karin-silveira-dev/>.

**Conceito criativo, Construção + Fluxo (Construction & Flow):** a lógica e a precisão da construção convivem com a fluidez, a transformação e a liberdade criativa.

## Stack

HTML, CSS e JavaScript nativos (ES Modules), sem dependências nem etapa de build.

## Estrutura

```text
.
├── index.html         # Homepage
├── projetos/          # Acervo e um estudo de caso por projeto
├── servicos/          # Página de serviços
├── laboratorio/       # Experimentos interativos
├── curriculo/         # Currículo em HTML, exportável em PDF pela impressão
├── 404.html           # Caminhos absolutos a partir do subcaminho do site
├── styles/            # global.css, shared.css e um arquivo por página ou família
├── scripts/           # Módulos ES por página
├── assets/            # Fontes, ícones, imagens e imagens de compartilhamento
├── dev/               # Gerador da escultura do hero (Node 22.12+), fora do artefato publicado
├── docs/              # Documentação do projeto
└── .github/workflows/ # Publicação no GitHub Pages
```

O detalhe da organização do código está em [Arquitetura](docs/ARCHITECTURE.md#3-estrutura).

## Execução local

Sirva o site por HTTP (via `file://`, os módulos JavaScript não carregam). A partir da raiz:

```sh
python3 -m http.server 8000
```

Acesse <http://localhost:8000/>. Qualquer servidor estático, como o Live Server do editor, também funciona.

A `404.html` usa caminhos a partir de `/karin-silveira-dev/`, o subcaminho publicado, e só aparece com o estilo completo no GitHub Pages.

## Publicação

O workflow [pages.yml](.github/workflows/pages.yml) publica no GitHub Pages a cada push em `main`. O artefato é montado a partir de uma lista explícita de arquivos: ao criar páginas, diretórios de `assets/` ou novos tipos de arquivo, inclua-os no workflow, ou eles não serão publicados. Páginas novas entram também no `sitemap.xml`.

## Documentação

- [Briefing](docs/BRIEFING.md): propósito, posicionamento, públicos, conteúdo e dados profissionais.
- [Design](docs/DESIGN.md): direção artística, paleta, tipografia, composição e movimento.
- [Arquitetura](docs/ARCHITECTURE.md): decisões técnicas, convenções e metas de qualidade.
- [Guia de estilo](docs/style-guide.html): referência visual da paleta, tipografia e atmosferas.
- [AGENTS.md](AGENTS.md): diretrizes para agentes de IA.
