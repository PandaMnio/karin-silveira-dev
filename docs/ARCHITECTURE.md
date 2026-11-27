# Arquitetura técnica — Karin Silveira

> Documento vivo

## 1. Stack

HTML, CSS e JavaScript nativos. Site estático multipágina, sem framework, backend, CMS, npm ou build. Ferramentas novas só entram quando uma necessidade concreta justificar, com discussão e registro. Não criar um framework próprio para substituir o que foi dispensado. Os projetos do acervo podem usar qualquer stack, em ambientes independentes.

Princípio: simplicidade na arquitetura, sofisticação na experiência.

## 2. Aprimoramento progressivo

1. **HTML:** conteúdo, semântica, links e navegação funcionam sem JS.
2. **CSS:** identidade, layout e responsividade; boa parte do movimento, inclusive o guiado por scroll.
3. **JavaScript:** interações, filtros e coordenação de estados como aprimoramento.
4. **Camada criativa:** geometria e experimentos carregados sob demanda.

Sem JS, sem uma API ou com movimento reduzido, a página continua completa e os projetos acessíveis. Não esconder conteúdo à espera do JavaScript.

## 3. Estrutura

```text
├── index.html, 404.html, sitemap.xml
├── projetos/
│   ├── index.html               # acervo: lista única, filtrável por categoria (?categoria=)
│   ├── spectrum/, psicologia/   # um diretório por estudo de caso
│   └── sites-institucionais/    # página mínima de redirecionamento ao acervo filtrado
├── servicos/, laboratorio/, curriculo/
├── styles/
│   ├── global.css               # fontes, tokens, atmosferas, elementos e componentes compartilhados
│   ├── shared.css               # cabeçalho, rodapé e regras usadas por mais de uma página
│   └── home, projetos, case, servicos, laboratorio, curriculo (.css)
├── scripts/
│   ├── nav.js                   # menu mobile; importado por todas as páginas com JS
│   ├── main.js                  # homepage: abertura, carrossel e cópia do e-mail
│   ├── acervo.js                # filtros do acervo
│   ├── servicos.js, curriculo.js
│   ├── lab.js                   # experimentos do Laboratório
│   └── escultura.js             # geometria da escultura, usada por dev/ e, sob demanda, por lab.js
├── assets/                      # fonts (WOFF2 e licenças OFL), icons (sprites SVG), images (WebP), share
├── dev/escultura.mjs            # gera o SVG do hero (Node 22.12+); fora do artefato publicado
├── docs/                        # BRIEFING, DESIGN, ARCHITECTURE e style-guide.html
└── .github/workflows/pages.yml
```

Arquivos e diretórios novos são criados quando houver conteúdo real para eles. Preferir links reais e HTML estático: repetir cabeçalho e rodapé é aceitável, e a navegação não é carregada por JS para evitar repetição.

## 4. HTML

- `lang` conforme o idioma real; landmarks (`header`, `nav`, `main`, `footer`) e títulos hierárquicos.
- Links para navegar, botões para ações, texto alternativo em imagens e rótulos em controles.
- Cada página tem título, descrição, canonical, metadados sociais e dados estruturados.
- Texto essencial nunca apenas em Canvas, imagem ou SVG.

## 5. CSS

Cada página carrega, por `<link>` direto e nesta ordem, `global.css`, `shared.css` e o arquivo da sua responsabilidade, sem `@import`. A 404, `projetos/sites-institucionais/` e `docs/style-guide.html` usam só os dois primeiros.

- `global.css`: o que é base ou compartilhado por todas as páginas.
- `shared.css`: regras usadas por mais de uma página ou família (cabeçalho, rodapé, índice dos estudos e dos serviços, acervo, animações compartilhadas).
- Arquivos de página: estilos exclusivos, com seus breakpoints, movimento e `@keyframes`. `case.css` atende os dois estudos de caso; `curriculo.css` inclui a impressão.

Uma regra vai para `shared.css` apenas quando mais de uma família a usa, e nenhuma regra de página depende de outra para vencer a cascata. Compor com as classes existentes antes de criar regras novas; utilitários e variáveis só entram com reúso real.

- Custom Properties para tokens primitivos e semânticos; atmosferas definidas por seção.
- Grid, Flexbox, propriedades lógicas, `clamp()` e media/container queries quando adequados.
- Classes em `kebab-case`, criadas quando houver estilo a aplicar; estados como `is-active`.
- Evitar seletores acoplados à estrutura interna e `!important`.

## 6. JavaScript

ES Modules nativos, um módulo de entrada por página (`type="module"`), criados só quando a funcionalidade existir. JS coordena estados, CSS descreve a aparência; `data-*` serve de hook de comportamento quando isso desacopla das classes de estilo.

Detectar suporte (`CSS.supports` ou equivalente), respeitar `prefers-reduced-motion`, não interceptar o scroll e evitar listeners que forcem layout repetidamente. Animações contínuas são suspensas fora da tela. Em JS, sem `innerHTML` e afins: usar `textContent`, `append` e `createElement` (ver CSP).

## 7. Conteúdo

O HTML estático é a fonte do conteúdo profissional, o que garante acesso sem JS e favorece SEO. Não renderizar a galeria a partir de JSON via `fetch`. Os dados pessoais e profissionais têm fonte única no [Briefing](BRIEFING.md#dados-profissionais-confirmados). Campos ausentes não são inventados. Demos externas entram por link. Nunca publicar segredos ou materiais confidenciais de antigos empregadores.

## 8. Publicação

Servir por HTTP, não por `file://`; execução local e publicação estão no [README](../README.md). Hospedagem no GitHub Pages, em subcaminho: usar caminhos relativos (a 404 é a exceção). Contato por links reais; formulário com envio exigiria um serviço adicional.

## 9. Qualidade

SEO, performance, responsividade e acessibilidade são requisitos de toda implementação; as regras de trabalho estão no [AGENTS.md](../AGENTS.md).

**Metas** (objetivos, não garantias):

| Indicador | Meta |
| --- | --- |
| Lighthouse (desempenho, acessibilidade, boas práticas, SEO) | 95 ou mais em cada categoria |
| LCP | até 2,5 s |
| INP | até 200 ms |
| CLS | até 0,1 |
| Acessibilidade | WCAG 2.2 AA como referência (a verificar, não uma certificação) |
| Transferência da homepage | até 600 KB (revisável com justificativa) |

**Navegadores:** Chrome, Safari, Firefox e navegadores móveis.

**Testar:** teclado, foco, contraste, zoom, telas pequenas, redução de movimento, JS desativado, links, console e HTML válido.

**Mídia:** fotos em WebP, geradas com `cwebp` sem metadados, em várias larguras com `srcset`; dimensões declaradas; carregamento sob demanda fora da primeira dobra.

**SEO:** títulos, descrições e textos reais e específicos em cada página; diretrizes editoriais em [Design](DESIGN.md#seo-editorial).

## 10. Decisões

- **Stack nativa sem dependências**, aprimoramento progressivo, estrutura mínima que cresce com a necessidade e independência dos projetos.
- **Fontes WOFF2 locais** (subconjunto latin, `font-display: swap`); nenhum recurso externo. O preload foi testado e piorou o FCP em rede lenta, por isso não é usado.
- **Movimento em CSS**, com JS apenas coordenando estados.
- **CSP por `<meta>`** em todas as páginas (o GitHub Pages não permite cabeçalhos), sem `unsafe-eval` e só com `style-src-attr 'unsafe-inline'` para as variáveis em `style=""`; `frame-ancestors` não é possível por meta. Trusted Types exigidos (`require-trusted-types-for 'script'`, `trusted-types 'none'`, sem políticas). Recurso externo novo exige ajustar a CSP; script embutido exigiria hash.
- **Workflow com Actions fixadas por SHA de commit**, versão em comentário; ao atualizar, resolver o novo SHA da tag. O lockfile nativo do GitHub (`gh actions-lock`) exige Enterprise Cloud.
- **Redirecionamento:** a hospedagem estática não oferece redirecionamento HTTP; `projetos/sites-institucionais/` usa `meta refresh`, link de reserva e `canonical` para o acervo, e fica fora do `sitemap.xml`.
- **Compatibilidade:** `color-mix` (Chrome 111, Safari 16.2, Firefox 113) é usado livremente; o fallback `@supports not` cobre só o que afeta legibilidade ou função. Animações guiadas por scroll têm suporte parcial; sem ele, o estado final é estático.

## 11. Pendências

- Validar o HTML no W3C Nu.
- Validar abertura, transição pelo scroll, carrossel (`:has`, subgrid) e efeitos em Safari, Firefox e dispositivos reais.
- Medir INP e consultar dados reais de uso (CrUX), indisponíveis até agora.
- Testar a importação do PDF do currículo na Gupy.
- Definir domínio próprio, se houver.

Ver também: [Briefing](BRIEFING.md) e [Design](DESIGN.md).
