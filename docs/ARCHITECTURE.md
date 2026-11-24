# Arquitetura técnica — Karin Silveira

> Versão 0.2 · 24/11/2026 · Documento vivo

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
├── docs/            # BRIEFING, DESIGN, ARCHITECTURE, ROADMAP
├── styles/
│   └── main.css
├── scripts/
│   └── main.js      # módulo de entrada, ainda vazio
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

Um único `styles/main.css` enquanto o volume permitir. Dividir em arquivos ou adotar `@layer` quando houver responsabilidades distintas o bastante (por exemplo, tokens do design system e componentes) para justificar a separação.

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

Servir por HTTP, não por `file://`, que bloqueia módulos. A partir da raiz:

```sh
python3 -m http.server 8000
```

Acessar `http://localhost:8000/`. Live Server ou qualquer servidor estático também serve. Usar caminhos relativos para permitir publicação em subdiretórios. Hospedagem estática e domínio serão decididos depois. Contato por links reais; formulário com envio exigiria um serviço adicional.

## 9. Qualidade

Testar desde já: teclado, foco, zoom, telas pequenas, redução de movimento, JS desativado, links, console e HTML válido. Com conteúdo real: otimizar imagens e fontes, declarar dimensões de mídia, carregar sob demanda o que está fora da primeira dobra e medir a performance em condições realistas.

## 10. Decisões

- **Aprovado:** stack nativa sem dependências, aprimoramento progressivo, independência dos projetos, estrutura mínima que cresce com a necessidade.
- **Proposto:** nomenclatura de CSS e JS, modo de publicação, detalhes das APIs.
- **A validar:** páginas internas, estratégia de dados, compatibilidade dos efeitos e implementação da coreografia.

Ver também: [Briefing](BRIEFING.md), [Design](DESIGN.md) e [Roadmap](ROADMAP.md).
