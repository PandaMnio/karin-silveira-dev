# Arquitetura técnica — Karin Silveira

> Versão 0.4 · 25/11/2026 · Documento vivo

## 1. Stack

HTML, CSS e JavaScript nativos. Site estático, multipágina se necessário, sem framework, backend, CMS, npm ou build. Ferramentas novas só entram quando uma necessidade concreta justificar, com discussão e registro. Não criar um framework próprio para substituir o que foi dispensado. Os projetos do acervo podem usar qualquer stack, em ambientes independentes.

Princípio: simplicidade na arquitetura, sofisticação na experiência.

## 2. Aprimoramento progressivo

1. **HTML:** conteúdo, semântica, links e navegação funcionam sem JS.
2. **CSS:** identidade, layout e responsividade.
3. **JavaScript:** interações, filtros e animações como aprimoramento.
4. **Camada criativa opcional:** Canvas, WebGL ou outras APIs, isoladas e carregadas sob demanda.

Sem JS, sem uma API ou sem recursos gráficos, a página continua apresentável e os projetos acessíveis. Não esconder conteúdo à espera do JavaScript.

## 3. Estrutura

```text
portfolio/
├── docs/            # BRIEFING, DESIGN, ARCHITECTURE, ROADMAP e style-guide.html
├── styles/
│   ├── global.css   # fundamentos, utilitários e componentes reutilizáveis
│   └── main.css     # estilos específicos, na ordem da interface
├── scripts/
│   ├── main.js      # módulo de entrada (coordenação da abertura)
│   └── lab.js       # experimento do Laboratório, importado por main.js
├── assets/
│   ├── fonts/       # WOFF2 e licenças OFL
│   ├── icons/       # sprites SVG de tecnologias e redes (Simple Icons, CC0)
│   └── images/      # WebP em larguras responsivas; capturas por projeto
├── projetos/
│   ├── index.html   # acervo, por categoria
│   ├── sites-institucionais/  # um diretório por coleção (categoria com projetos)
│   └── psicologia/  # um diretório por estudo de caso; a URL não depende da coleção
├── index.html
├── AGENTS.md
├── README.md
├── .gitignore
└── .gitattributes
```

Arquivos e diretórios novos (páginas internas, `assets/`, novos módulos CSS ou JS, dados) são criados quando houver conteúdo real para eles, não antes. Preferir links reais e HTML estático; com poucas páginas, repetir header e footer é aceitável. Não carregar a navegação via JS só para evitar repetição.

## 4. HTML

- `lang` conforme o idioma real; landmarks (`header`, `nav`, `main`, `footer`) e títulos hierárquicos.
- Links para navegar, botões para ações, texto alternativo em imagens e rótulos em controles.
- Cada página tem título, descrição e conteúdo significativo. Metadados sociais e canonical entram quando houver domínio.
- Texto essencial nunca apenas em Canvas, imagem ou SVG.

## 5. CSS

Dois arquivos, carregados nesta ordem em todas as páginas:

- `global.css`: fontes, tokens, atmosferas, estilos de elementos, utilitários com reúso efetivo (como `.grid-12`) e componentes compartilhados entre páginas (rótulos, títulos, links, botão, link de card, link de retorno, palco de projeto e capa de coleção), terminando nos fallbacks sem `color-mix` desses fundamentos.
- `main.css`: estilos específicos, na ordem da interface (cabeçalho, hall, projetos, acervo e coleções, estudo de caso, sobre, laboratório, contato e rodapé), seguidos dos fallbacks sem `color-mix`, de um único bloco de movimento e dos `@keyframes`.

Compor com as classes existentes antes de criar regras novas. Utilitários e variáveis só entram quando há reúso real; nada de framework próprio. Listas com `role="list"` já chegam sem marcadores nem recuos, e `dt`/`dd` já têm o estilo de rótulo e valor.

- Custom Properties para tokens primitivos e semânticos; atmosferas definidas por seção.
- Grid, Flexbox, propriedades lógicas, `clamp()` e media/container queries quando adequados.
- Classes em `kebab-case`, criadas quando houver estilo a aplicar; estados como `is-active` quando necessários.
- Evitar seletores acoplados à estrutura interna e `!important`.

## 6. JavaScript

ES Modules nativos, com `main.js` como entrada (`type="module"`). Criar módulos só quando a funcionalidade existir. JS coordena estados, CSS descreve a aparência; usar `data-*` como hook de comportamento quando isso desacoplar das classes de estilo.

APIs candidatas, não dependências:

| Necessidade | Solução inicial |
| --- | --- |
| Abertura e coreografia | CSS Animations/Transitions ou Web Animations API |
| Transformação espacial → modular | CSS transforms e JS; FLIP se útil |
| Scroll e revelação | Intersection Observer; scroll-driven CSS com detecção de suporte |
| Transição entre páginas | View Transition API, com navegação comum como fallback |
| Atmosferas | Custom Properties + estados de seção |
| Experimentos | Canvas/WebGL sob demanda |

Detectar suporte (`CSS.supports` ou equivalente), respeitar `prefers-reduced-motion`, não interceptar o scroll e evitar listeners que forcem layout repetidamente. `sessionStorage` pode registrar a abertura; se falhar, o site continua funcional.

## 7. Conteúdo

O HTML estático é a fonte do conteúdo profissional, o que garante acesso sem JS e favorece SEO. Não renderizar a galeria apenas a partir de JSON via `fetch`. Um arquivo de dados pode surgir para filtros ou experimentos, com fonte de verdade definida. Campos ausentes não são inventados. Demos externas entram por link. Nunca publicar segredos ou materiais confidenciais de antigos empregadores.

## 8. Desenvolvimento local e publicação

Servir por HTTP, não por `file://`, que bloqueia módulos; o comando está no [README](../README.md). Usar caminhos relativos para permitir publicação em subdiretórios. Hospedagem estática e domínio serão decididos depois. Contato por links reais; formulário com envio exigiria um serviço adicional.

## 9. Qualidade

SEO, performance, responsividade e acessibilidade são requisitos de toda implementação, desde a fundação; as regras de trabalho estão no [AGENTS.md](../AGENTS.md).

**Metas** (objetivos, não garantias):

| Indicador | Meta |
| --- | --- |
| Lighthouse (desempenho, acessibilidade, boas práticas, SEO) | 95 ou mais em cada categoria |
| LCP | até 2,5 s |
| INP | até 200 ms |
| CLS | até 0,1 |
| Acessibilidade | WCAG 2.2 AA como referência (a verificar, não uma certificação) |
| Transferência da homepage | até 600 KB (orçamento inicial, revisável com justificativa quando houver conteúdo real) |

**Navegadores:** Chrome, Safari, Firefox e navegadores móveis.

**Testar desde já:** teclado, foco, contraste, zoom, telas pequenas, redução de movimento, JS desativado, conteúdo alternativo, links, console e HTML válido.

**Com conteúdo real:** otimizar imagens e fontes (fotos em WebP, gerado com `cwebp` sem metadados, em várias larguras com `srcset`), declarar dimensões de mídia, carregar sob demanda o que está fora da primeira dobra e medir em condições realistas.

**SEO de conteúdo:** títulos, descrições e textos reais e específicos em cada página.

## 10. Decisões

- **Aprovado:**
  - Stack nativa sem dependências, aprimoramento progressivo e independência dos projetos.
  - Estrutura mínima que cresce com a necessidade.
  - Fontes WOFF2 locais; nenhum recurso externo.
  - Movimento em CSS, com JS apenas coordenando estados.
- **Proposto:** nomenclatura de CSS e JS, modo de publicação, detalhes das APIs.
- **A validar:** páginas internas, estratégia de dados e compatibilidade dos efeitos em Safari, Firefox e dispositivos reais.

Ver também: [Briefing](BRIEFING.md), [Design](DESIGN.md) e [Roadmap](ROADMAP.md).
