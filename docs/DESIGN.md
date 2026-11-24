# Direção artística e design — Karin Silveira

> Versão 0.2 · 24/11/2026 · Documento vivo

## 1. Linguagem visual

**Construção + Fluxo**: estruturas precisas que se transformam com naturalidade. A cinematografia é o fio condutor; a elegância editorial organiza a informação; a expressividade contemporânea dá personalidade; a precisão tecnológica orienta o acabamento.

A estética deve ser tecnológica e contrastante, mas não parecer uma interface de ficção científica, uma demonstração de efeitos ou um template genérico. Usar grids, alinhamentos, profundidade, luz e movimento com intenção. Evitar excesso de neon, partículas, gradientes indiscriminados e competição entre elementos.

## 2. Spectrum — paleta de referência aprovada

| Token de referência | Nome | Hex | Papel |
| --- | --- | --- | --- |
| `--color-obsidian` | Obsidian | `#0C0C10` | Superfícies escuras, profundidade |
| `--color-porcelain` | Porcelain | `#EDEDF2` | Texto sobre escuro, superfícies claras |
| `--color-ultraviolet` | Ultraviolet | `#7148FF` | Assinatura tecnológica |
| `--color-aqua` | Aqua | `#00D6CF` | Fluxo, interação, acentos |
| `--color-pulse` | Pulse | `#FF426C` | Expressividade e tensão pontual |

Proporção visual sugerida: 60% Obsidian, 25% Porcelain, 8% Ultraviolet, 4% Aqua, 3% Pulse; não são cotas obrigatórias. A identidade deve permanecer predominantemente neutra, com acentos seletivos. Preferir uma cor expressiva dominante por composição quando adequado.

Os tokens primitivos não substituem tokens semânticos: definir papéis como `--color-bg`, `--color-text`, `--color-muted`, `--color-border`, `--color-focus` e `--color-accent` por atmosfera. Validar contrastes antes de usar acentos em texto ou controles, especialmente sobre Porcelain. A cor não pode ser o único indicador de estado.

**Aplicado:**

- A atmosfera escura é o padrão. A clara é a classe `.light`, que redefine os tokens semânticos em uso (`--color-bg`, `--color-text`, `--color-muted`, `--color-accent`). Os demais papéis entram quando forem usados.
- O acento é Aqua no escuro. No claro, é `--color-ultraviolet-deep` (`#5D3CCF`, 5,97:1), porque Ultraviolet não atinge AA sobre Porcelain (4,42:1).
- Pulse fica restrito a usos pontuais e não textuais (2,88:1 sobre Porcelain).
- Referência visual: [style-guide.html](style-guide.html).

### Ritmo cromático

| Ambiente | Atmosfera |
| --- | --- |
| Hall de entrada | Obsidian, luz atmosférica predominantemente violeta |
| Projetos | Escuro como base, com atmosferas adaptáveis à obra |
| Sobre | Porcelain, contraste editorial e respiro |
| Laboratório | Retorno ao escuro, maior liberdade cromática |
| Contato | Obsidian e composição contida |

As transições entre claro e escuro são parte da narrativa; não implicam necessariamente um seletor global de tema. Imagens e projetos podem introduzir cores próprias, mantendo a leitura e a navegação consistentes.

## 3. Tipografia

Direção aprovada: contraste editorial. Famílias adotadas, hospedadas localmente:

| Função | Família | Uso |
| --- | --- | --- |
| Estrutura | Manrope (200–800) | Nome, títulos, navegação e texto |
| Expressão | Instrument Serif (regular e itálico) | Contraste editorial pontual, decidido em cada composição (ex.: o sobrenome no hero) |

Manrope substituiu Satoshi, e Geist Mono foi deixada de lado até haver índices ou metadados que a justifiquem. A monumentalidade virá de escala, composição e peso, sem adicionar outra fonte display. Fallbacks: `system-ui` para Manrope e Georgia para Instrument Serif. Os arquivos são WOFF2 do subconjunto latin, suficiente para o português, com `font-display: swap` e licenças OFL em `assets/fonts/`. Saíram do Google Fonts por privacidade e porque a folha externa bloqueava a renderização. O preload foi testado e piorou o FCP em rede lenta, por isso não é usado.

Definir uma escala fluida com `clamp()` onde fizer sentido, hierarquia clara, largura de leitura confortável e espaçamento responsivo. Não fixar tamanhos de tela ou tipografia que impeçam zoom.

## 4. Composição e sistema visual

- Estrutura editorial assimétrica, modular, com espaços negativos e alinhamento preciso.
- Header reconhecível, links convencionais, foco visível e navegação acessível.
- Unificar grids, espaçamentos, tipografia, controles e linguagem de interação.
- Adaptar proporções, atmosfera e movimento às necessidades de cada trabalho.
- Evitar que cards, bordas, brilhos e sobreposições prejudiquem imagens ou texto.

A homepage combina A + C com a atmosfera de B dos estudos: presença assimétrica, módulos editoriais e profundidade cinematográfica. O estado final do hero prioriza os fragmentos visuais, mantendo o nome, o posicionamento e o convite à ação claramente legíveis.

**Aplicado na homepage:**

- **Assinatura compacta:** `ks.` em Manrope 800, com o ponto em Aqua.
- **Hierarquia do hero:** posicionamento, nome, mensagem autoral e CTA. Os textos ainda estão sujeitos a aprovação.
- **Sobre:** atmosfera clara (`.light`), com título em duas vozes e um ponto final em acento, ecoando a assinatura. O texto desce em degrau ao lado do retrato, e os princípios aparecem como frases grandes com o verbo em serifa itálica, recuados para deixar espaço vazio à esquerda. Os textos derivam do briefing e estão sujeitos a aprovação.
- **Retrato (Sobre):** a fotografia permanece intacta, sem filtros nem recortes. Ao redor dela, camadas independentes em CSS: um painel de grade violeta que sangra pela borda da página, uma moldura da qual só aparecem os cantos, uma órbita que cruza o canto superior longe do rosto, a cápsula de fluxo e o acento Pulse. Com suporte a scroll-driven animations e sem preferência por movimento reduzido, as formas derivam em velocidades diferentes; a foto não se move.
- **Hero estático = estado C:** fragmentos inclinados numa perspectiva comum, com o texto avançando sobre a borda escura da composição. Grade e moldura (precisão) contrastam com órbita e cápsula (fluidez).

- **Laboratório:** volta ao escuro, com luz violeta e Aqua mais livre. O palco do experimento sangra até as bordas da página, e a legenda fica abaixo dele, em três colunas.
- **Experimento 01 — Construção & Fluxo:** uma grade em SVG se transforma em correntes Aqua → Ultraviolet. O controle deslizante nativo vai da construção ao fluxo, e os rótulos acompanham: "Construção" perde peso enquanto "Fluxo", em serifa itálica, se acende. Com mouse, a lente segue o cursor; com toque, ela fica onde foi tocada. Na construção, ela abre a grade; no fluxo, faz as linhas girarem. O acento Pulse é levado pela corrente. Só há redesenho durante a interação, e o laço de quadros para quando tudo se assenta. Com movimento reduzido, as mudanças são imediatas, sem transição. Sem JS, o palco mostra a grade estática, e o controle continua oculto.

### Vocabulário gráfico permanente

As formas abstratas da Spectrum (painéis, grades, molduras, órbitas, cápsulas de fluxo, gradientes e acentos cromáticos) deixam de ser provisórias e fazem parte da identidade do portfólio. Elas vão coexistir com os conteúdos reais dos projetos, sem ser substituídas por eles. Cada composição as recombina conforme o contexto, sem repetir literalmente o hero, e elas nunca encobrem rostos, textos ou o essencial de uma obra.

## 5. Assinatura de movimento

### Abertura cinematográfica — direção aprovada

O conteúdo já está disponível; não é um preloader bloqueante. Os mesmos elementos se transformam de forma contínua, em vez de três telas separadas.

| Estado | Tempo indicativo | Comportamento |
| --- | --- | --- |
| A — Tipográfico | 0–0,6 s | Nome protagonista, fragmentos discretos, revelação precisa |
| B — Equilibrado | 0,6–1,5 s | Nome se reposiciona, fragmentos ganham escala e profundidade |
| C — Visual | 1,5–2,5 s | Fragmentos reais de trabalhos protagonizam a composição espacial |
| D — Transição | Scroll | Fragmentos se expandem, alinham e perdem inclinação |
| E — Exposição | Scroll | Composição editorial modular, trabalhos reconhecíveis e acessíveis |

Os tempos são parâmetros de prototipação. A abertura e o scroll devem parecer partes de uma única transformação. Preservar conteúdo legível, ações e navegação. Não sequestrar scroll, não usar flashes ou movimentos frenéticos.

Comportamento acordado como direção: sequência completa apenas no primeiro acesso da sessão; em visitas subsequentes, estado final ou transição breve. Caso haja rolagem ou intenção de navegar durante a abertura, permitir conclusão/avanço sem espera. Preferência de movimento reduzido, falhas de JS e recursos indisponíveis devem deixar uma experiência estável e funcional. Em telas pequenas, priorizar composição própria e movimentos simplificados, não comprimir a versão desktop.

**Aplicado:**

- A abertura (A → B → C) é toda em CSS, com `transform` e `opacity`. O estado final é o próprio layout: sem animação, a página já está completa.
- Os textos começam com no mínimo 80% de opacidade: nunca invisíveis (o que atrasaria o LCP) e sempre com contraste AA.
- O JS apenas pula a abertura nas visitas seguintes da sessão e a conclui na primeira interação.
- Sem JS ou sem `sessionStorage`, a abertura toca a cada carregamento.
- No mobile, a coreografia é simplificada.
- A transição D usa CSS scroll-driven animations, sem JS. Ao sair, os fragmentos do hero perdem inclinação e profundidade; os estudos entram com a mesma perspectiva e se assentam (no mobile, só escala e opacidade). No mosaico, Experimentação se assenta logo depois do principal, em cascata. Sem suporte, como no Firefox atual, ou com movimento reduzido, a exposição é estática.

### Motion complementar — a validar

- Parallax sutil para ponteiro de mouse, sem depender de hover. **Aplicado no hero:**
  - Os fragmentos se deslocam conforme a profundidade (`--z`); os mais próximos se movem mais, e a moldura vai no sentido oposto.
  - A luz ambiente acompanha o cursor, e um reflexo percorre o painel principal.
  - Ativa só depois da abertura, com mouse ou trackpad e sem preferência por movimento reduzido.
  - Usa a propriedade `translate`, que se compõe com as animações de `transform`, e o retorno ao repouso é por transição CSS.
- Máscaras e revelações, iluminação atmosférica, transformações ópticas e profundidade pontuais.
- Microinterações com resposta clara; foco e toque equivalentes quando aplicável.
- Transições cromáticas que acompanham o conteúdo.
- Referência de durações: 150 ms (rápida), 300 ms (normal), 600 ms (lenta); curva inicial `cubic-bezier(0.22, 1, 0.36, 1)`. Ajustar em testes.

Priorizar `transform` e `opacity` quando adequados; evitar trabalho contínuo desnecessário, mudanças bruscas de layout e efeitos que induzam desconforto.

## 6. Exposição dos projetos

| Coleção | Tratamento |
| --- | --- |
| Obras principais | Exposição cinematográfica e individual |
| Trabalhos selecionados | Galeria editorial assimétrica |
| Acervo | Índice pesquisável/filtrável se houver volume; acesso direto aos trabalhos |
| Laboratório | Exploração mais livre, com alternativa de navegação clara |

Cada página de projeto deve valorizar o resultado e, quando pertinente, contexto, desafio, papel da autora, decisões, processo, tecnologias e resultados verificáveis. Não atribuir métricas ou trabalhos fictícios à autora. Demos complexas podem ser abertas em ambiente independente.

**Aplicado:**

- Três estudos ilustrativos (Desenvolvimento, Experimentação e Expressão visual) formam um mosaico editorial no estado E, alinhados e sem inclinação. A partir de 56rem: o principal ocupa 8 colunas; Experimentação fica ao lado, em 4 colunas, com a base alinhada à dele; Expressão visual entra logo abaixo do principal, ao lado da legenda dele; e o acesso ao acervo ocupa o canto livre da última linha. As linhas são compartilhadas por subgrid. Sem subgrid, os três estudos ficam em duas faixas, com as legendas sob cada imagem. No mobile, os estudos se empilham com recuos alternados.
- As superfícies compartilhadas (`--surface-*`) mantêm o vínculo visual com os fragmentos do hero, preparando a transição D.
- Os estudos não têm links individuais enquanto não existirem destinos reais; a exposição termina com um acesso ao acervo.
- **Acervo (`projetos/`):** índice tipográfico em linhas com número em serifa itálica, título, resumo, metadados (categoria e tipo) e miniatura. As miniaturas têm a mesma altura, com largura que segue a proporção de cada trabalho. As categorias seguem as famílias do briefing (Desenvolvimento, Experimentação, Além do código). Cada entrada tem um `id` para link direto. A busca e os filtros só entram quando houver volume que os justifique.

## 7. Qualidade visual e acessibilidade

Controles e foco sempre distinguíveis. Todo efeito é avaliado tanto em beleza quanto em utilidade e custo de execução. Metas, testes e compatibilidade estão em [Arquitetura, seção 9](ARCHITECTURE.md#9-qualidade).

## 8. Pendências de design

- Consolidar escala tipográfica, espaçamentos e grid como sistema; definir breakpoints guiados pelo conteúdo.
- Estados de interação.
- Transição D (scroll) do hero para a exposição.
- Textos e imagens reais; favicon.

Os protótipos do briefing são estudos, não layouts finais.

Ver também: [Briefing](BRIEFING.md), [Arquitetura](ARCHITECTURE.md) e [Roadmap](ROADMAP.md).
