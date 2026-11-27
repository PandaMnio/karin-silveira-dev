# Direção artística e design — Karin Silveira

> Versão 0.3 · 25/11/2026 · Documento vivo

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
| Serviços e Contato | Um só campo de encerramento: grade da construção no alto, luz violeta do fluxo embaixo |
| Laboratório | Verde-petróleo derivado do Aqua, superfície própria e maior liberdade cromática |

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
- **Hierarquia do hero:** posicionamento, nome, mensagem e CTA.
- **Sobre:** atmosfera clara (`.light`), com título em duas vozes e um ponto final em acento, ecoando a assinatura. O texto desce em degrau ao lado do retrato, e os princípios aparecem como frases grandes com o verbo em serifa itálica, recuados para deixar espaço vazio à esquerda. Entre o texto e os destaques, uma reflexão autoral em serifa itálica, em frase única com um filete em acento e as últimas palavras em acento, sem rótulo, para não soar como afirmação curricular. Os textos derivam do briefing e das indicações da autora.
- **Sobre ampliado:**
  - **Destaques:** ficam na coluna do retrato, ao lado do texto: experiência, bacharelado e formação técnica, com o valor em serifa.
  - **Trajetória:** os três destaques fecham com um acesso ao currículo no padrão de "Todos os projetos" (rótulo, título e traço Aqua → Ultraviolet), porque o detalhe profissional vive lá. Mentoria e eventos saíram do Sobre e permanecem só no currículo; os destaques trazem só o essencial (instituição e período).
  - **Espaçamento:** os respiros entre e dentro das seções crescem com a largura da tela, não com a altura (`--space-section`, mais contido no desktop), para que os celulares altos não ganhem vazios excessivos.
  - **Habilidades:** faixa própria, de ponta a ponta, em Porcelain tingido de violeta com a grade do painel do retrato surgindo no canto superior direito; separa o que ela faz de quem ela é e quebra a extensão da seção no mobile. Quatro colunas (duas abaixo de 75rem). Cada uma traz um índice em serifa itálica, a descrição, uma linha de ícones em acento e as tecnologias em texto, mencionadas uma única vez. Os ícones são decorativos; os nomes estão no texto. Abaixo de 75rem o índice divide a linha com o título; abaixo de 56rem os ícones saem, para reduzir estímulos no mobile. O sprite é local (Simple Icons, CC0).
  - **Princípios:** fecham a seção, com o rótulo e o parágrafo no vazio à esquerda da lista.
  - **Fonte e privacidade:** os dados vêm do [Briefing](BRIEFING.md#dados-profissionais-confirmados), e os nomes de empregadores não aparecem.
- **Retrato (Sobre):** a fotografia permanece intacta, sem filtros nem recortes. Ao redor dela, camadas independentes em CSS: um painel de grade violeta que sangra pela borda da página, uma moldura da qual só aparecem os cantos, uma órbita que cruza o canto superior longe do rosto, a cápsula de fluxo e o acento Pulse. Com suporte a scroll-driven animations e sem preferência por movimento reduzido, as formas derivam em velocidades diferentes; a foto não se move.
- **Cabeçalho:** transparente e acima da primeira seção. A luz do topo é um gradiente violeta no fundo da página que atravessa o cabeçalho e a primeira seção, sem emenda entre eles. Nos links, um traço Aqua → Ultraviolet cresce da esquerda no hover e no foco, e fica completo e mais espesso na página atual. O ponto da assinatura salta de leve. Sem filtros nem blur; com movimento reduzido, não há transições.
- **Contato:** Obsidian com luz violeta subindo do canto inferior esquerdo, oposta à do topo, e título em duas vozes com ponto em acento, como no Sobre. Sem títulos intermediários nem linhas entre os canais: a hierarquia vem do tamanho e do espaço. Contato direto (e-mail e WhatsApp, com o mesmo peso, ícone à esquerda, rótulo e valor em duas linhas; o botão de copiar só aparece quando a área de transferência está disponível, e sua confirmação ocupa o espaço entre os canais, sem deslocar o layout) e, a um respiro maior, presença profissional (GitHub e LinkedIn, menores, em linha). No hover e no foco, o valor ganha sublinhado em acento. Ícones locais (Simple Icons, CC0). Uma órbita sangra pela borda superior direita, com o acento Pulse sobre ela, e uma cápsula de fluxo deitada cruza a borda direita. As formas ficam fora da área do texto. Com suporte a scroll-driven animations e sem preferência por movimento reduzido, enquanto a seção entra na tela, a órbita gira e leva o acento pela curva, sem inclinar o quadrado, e a cápsula chega pela borda. Com o hover ou o foco no contato direto, a cápsula se estende. Sem suporte, a composição fica no estado final. A frase de apoio está sujeita a aprovação.
- **Menu mobile (< 56rem):** a mesma `nav` vira um painel vertical com índices em itálico serifado e o traço Aqua → Ultraviolet no topo, aberto por um botão "Menu" (`aria-expanded`) criado por `nav.js`. Fecha com Esc (devolve o foco ao botão), clique fora, escolha de link ou ao sair do foco. Sem JS, a navegação permanece em linha, visível. Abaixo de 40rem, os botões comerciais ocupam a largura total, com links secundários abaixo.
- **Eixo de leitura:** no desktop, o texto de apoio das introduções de seção, as descrições dos serviços e a chamada do Laboratório começam na coluna 7; os títulos ficam na coluna 1. O Contato mantém o corpo na coluna 5, que acomoda os canais diretos lado a lado. No mobile, tudo se alinha à esquerda, inclusive as chamadas tipográficas ("Todos os projetos", "Entrar no laboratório").
- **Transições entre seções:** Sobre → Serviços passa do Porcelain ao escuro; Serviços → Contato é contínua, num único fundo (`.finale`), sem borda nem linha: a órbita do Contato sobe por trás do fim de Serviços, que fica acima dela para não ser encoberto. Contato → Laboratório tem borda tonal, do violeta ao verde-petróleo.
- **Rodapé:** igual em todas as páginas: assinatura `ks.`, créditos ("Design e desenvolvimento autorais"; o uso de IA é tratado nos estudos de caso) e "Voltar ao topo", que leva ao cabeçalho (`#topo`).
- **Hero estático = estado C:** uma escultura paramétrica única que ocupa toda a seção, com o texto à esquerda sobre ela. Uma superfície regrada nasce do escuro sob o texto como um piso de grade com linhas Porcelain (construção), atravessa a base, torce-se meia volta no centro, num ponto de transformação, e revela a outra face em Aqua → Ultraviolet (fluxo), que sobe, se afina e se curva de volta sobre o topo, na direção do nome. Uma órbita perfeita envolve a fita nesse ponto, passando à frente e atrás dela, com o acento Pulse no seu plano; a luz ultravioleta e o brilho Aqua acompanham o fluxo e a torção. As faces são sombreadas por uma luz fixa e calculadas em projeção 3D, num SVG estático (geometria gerada por `dev/escultura.mjs`). No mobile, a escultura continua sob o texto, ancorada na base e esmaecida no topo para preservar a leitura; o início da construção sai pela borda esquerda. Sem texto, código, controles ou dispositivos.

- **Laboratório (`laboratorio/`):** página própria; na homepage, depois do Contato, fica só a chamada (título, texto e link no padrão de "Todos os projetos"), sobre uma superfície verde-petróleo derivada do Aqua. A chamada traz um espécime de bancada à esquerda (no mobile, entre o texto e a lista): moldura com cantos, metade em grade e metade em ondas Aqua (da construção ao fluxo), órbita com o acento Pulse, cápsula Aqua → Ultraviolet e uma régua; com scroll-driven animations e movimento permitido, as ondas se revelam, a órbita gira e a cápsula se estende ao entrar na tela. Na página, o petróleo domina a abertura e cede ao Obsidian antes dos palcos, que mantêm os próprios fundos para não alterar as cores dos experimentos. O palco do experimento sangra até as bordas da página, e a legenda fica abaixo dele, em três colunas.
- **Experimento 01 — Construção & Fluxo:** uma grade em SVG se transforma em correntes Aqua → Ultraviolet. O controle deslizante nativo vai da construção ao fluxo, e os rótulos acompanham: "Construção" perde peso enquanto "Fluxo", em serifa itálica, se acende. Com mouse, a lente segue o cursor; com toque, ela fica onde foi tocada. Na construção, ela abre a grade; no fluxo, faz as linhas girarem. O acento Pulse é levado pela corrente. Só há redesenho durante a interação, e o laço de quadros para quando tudo se assenta. Com movimento reduzido, as mudanças são imediatas, sem transição. Sem JS, o palco mostra a grade estática, e o controle continua oculto.
- **Estudos complementares:** abaixo do Experimento 01, que segue protagonista, em duas colunas assimétricas (6 + 5 do grid, a segunda deslocada para baixo) e empilhados no mobile. Os palcos ficam dentro das margens, com legenda e controles nativos compactos abaixo. Sem JS, mostram o estado inicial, e os controles ficam ocultos.
- **Experimento 02 — Luz & Espectro:** três luzes (Aqua, Ultraviolet e Pulse, esta mais contida) se somam em `screen` sobre uma grade, diante de um painel escuro. Cada luz projeta a sombra do painel com penumbra, e onde uma é bloqueada a sombra ganha a cor das outras. As luzes se movem por arraste ou pelas setas (Shift para passos maiores); o nome acessível informa a região. Controles deslizantes definem a intensidade (brilho e alcance). Redesenho de um quadro por interação.
- **Experimento 03 — Tipo & Ritmo:** a frase "Estruturas precisas que se transformam com naturalidade" em escala modular, com o intervalo musical nomeado (da segunda menor à proporção áurea). Espaço ajusta entreletra e entrelinha; ritmo alterna peso (Manrope 200–800) e recuo entre as linhas, marcado por uma guia Aqua. "naturalidade" é a voz serifada. Tudo em propriedades CSS: cada linha é limitada pela própria largura calibrada, e o quadro tem proporção fixa, sem deslocar a página. Transições só com movimento permitido.
- **Experimento 04 — Forma & Espaço:** a escultura do hero recalculada no navegador pelo mesmo núcleo (`scripts/escultura.js`), carregado quando o experimento se aproxima da tela. O palco sangra pela borda esquerda e acompanha a rolagem enquanto os controles nativos, agrupados em Forma, Espaço e Luz e cor, ficam à direita; no mobile, ele se fixa no topo, limitado à metade da altura, e os controles passam por baixo. Torção, curvatura, largura, densidade da malha, perspectiva (a escala no plano central se mantém), direção da luz e as duas cores do fluxo; a construção mantém as cores fixas. Os limites dos controles mantêm a câmera fora da fita; nos extremos, a forma pode sair pelas bordas do palco. Restaurar volta ao estado do hero; Exportar SVG baixa um arquivo autônomo, com fundo Obsidian e sem o esmaecimento do palco. Redesenho de um quadro por interação. Sem JS, mostra a superfície de grade, e os controles ficam ocultos.

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

Comportamento acordado como direção: sequência completa a cada carregamento da página, inclusive no reload. Caso haja rolagem ou intenção de navegar durante a abertura, permitir conclusão/avanço sem espera. Preferência de movimento reduzido, falhas de JS e recursos indisponíveis devem deixar uma experiência estável e funcional. Em telas pequenas, priorizar composição própria e movimentos simplificados, não comprimir a versão desktop.

**Aplicado:**

- A abertura (cerca de 2 s) é toda em CSS, com `transform`, `opacity` e `clip-path`: a luz acende; os textos sobem em cascata (sobrenome logo após o nome); a superfície se ergue do fundo em perspectiva e se desdobra da grade ao fluxo; as órbitas chegam depois; e o Pulse percorre a órbita até o ponto onde a deriva contínua começa, sem salto. O estado final é o próprio layout: sem animação, a página já está completa.
- Os textos começam com no mínimo 80% de opacidade: nunca invisíveis (o que atrasaria o LCP) e sempre com contraste AA.
- O JS apenas conclui a abertura na primeira interação (rolagem, toque, tecla ou clique).
- A transição D usa CSS scroll-driven animations, sem JS. Ao sair, os fragmentos do hero perdem inclinação e profundidade; o carrossel de projetos chega deslizando da direita, antecipando a navegação horizontal. Sem suporte, como no Firefox atual, ou com movimento reduzido, a exposição é estática.

### Motion complementar — a validar

- Parallax sutil para ponteiro de mouse, sem depender de hover. **Aplicado no hero:**
  - As camadas se deslocam conforme a profundidade (`--z`): a órbita, à frente, move-se mais que a fita.
  - A luz ambiente acompanha o cursor.
- **Movimento contínuo do hero:** a atmosfera, a fita e a órbita derivam devagar (`rotate` e `scale`, 14–20 s, em fases diferentes, ida e volta), e o Pulse percorre um trecho da órbita (`offset-path`). Só há animação CSS, sem redesenho do SVG, e ela compõe com a abertura, o parallax (`translate`) e a transição de scroll (`transform`). É suspensa fora da tela e por um botão discreto "Pausar movimento", só visível com movimento permitido. Sem movimento permitido, o hero fica estático.
- **Indicador de rolagem:** link para `#projetos`, centralizado na base do hero, com ícone de mouse minimalista cujo ponto desce em laço; abaixo de 56rem, o mouse vira uma mão que desliza para cima em laço. A seção reserva espaço para ele, e o botão de pausa fica no canto oposto.
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
| Acervo | Lista única, filtrável por categoria; acesso direto aos estudos de caso |
| Laboratório | Exploração mais livre, com alternativa de navegação clara |

Cada página de projeto deve valorizar o resultado e, quando pertinente, contexto, desafio, papel da autora, decisões, processo, tecnologias e resultados verificáveis. Não atribuir métricas ou trabalhos fictícios à autora. Demos complexas podem ser abertas em ambiente independente.

**Aplicado:**

- **Carrossel de projetos (homepage, estado E):** cada projeto aparece individualmente, sem coleções, e leva direto ao estudo de caso. O palco domina; abaixo dele, índice em serifa itálica, título em duas vozes (a segunda no tom claro do projeto), uma descrição curta e "Ver estudo de caso". Descrição na largura toda do item e ação logo abaixo dela. A faixa sangra pelas bordas da página, e o próximo projeto aparece na borda (86% da largura no mobile, 72% a partir de 40rem, 62% a partir de 56rem).
- **Navegação do carrossel:** rolagem horizontal nativa com snap e sem barra de rolagem visível, que funciona por gesto, trackpad, setas e Tab sem JS, sem clones nem reprodução automática. O JS acrescenta contador ("01 / 02") e botões anterior e próximo abaixo da faixa, com `aria-disabled` nas pontas para não perder o foco, rolagem suave só com movimento permitido, e traz inteiro o projeto que recebe foco. Os controles somem quando todos os projetos cabem na tela.
- **Acesso ao acervo (homepage):** fica no cabeçalho da seção, na mesma linha do título e da descrição (empilhados à esquerda), alinhado à direita, em escala menor, no padrão tipográfico com traço Aqua → Ultraviolet ("Acervo completo" e "Ver todos os *projetos*"). Abaixo de 40rem, desce para baixo da descrição, ainda à direita. Longe dos projetos e dos controles, não parece ação de um item.
- **Agrupamento:** cada legenda fica logo abaixo da própria imagem; o espaço dentro de um item é sempre menor que o espaço entre itens.
- As superfícies compartilhadas (`--surface-*`) mantêm o vínculo visual com os fragmentos do hero, preparando a transição D.
- Todos os itens levam a destinos reais. O título é o link e a área clicável cobre o item inteiro. No hover e no foco, a borda do palco acende em acento, a seta avança e as telas se deslocam.
- **Palco de projeto (`.stage`):** capturas reais da interface desktop e mobile sobre a superfície do projeto: grade, moldura de precisão, órbita, traço de fluxo e acento Pulse. A luz vem da identidade de cada projeto (`--project-deep` e `--project-glow`, definidos numa classe `stage-<projeto>`). O mesmo palco aparece na exposição, nas miniaturas do acervo e da coleção e na abertura do estudo de caso. As formas ficam atrás das telas e nunca cobrem a interface.
- **Estudo de caso (`projetos/<projeto>/`):** a abertura integra título em duas vozes, resumo, links e palco; o título toca a borda do palco, e a ficha corre sob ele. Seguem capítulos numerados, com o título à esquerda e o texto recuado, intercalados com registros em escalas e alinhamentos variados (detalhe, tela inteira, desktop e celular lado a lado). A identidade do projeto entra em uma faixa própria, com as cores dele (no caso da psicologia, papel e azul-petróleo), e a segunda voz e os índices usam o tom claro do projeto. Os capítulos começam pelo desenvolvimento (abertura, agendamento, implementação, desempenho) e terminam na identidade visual; as decisões técnicas formam uma ficha em linhas, sem badges. O desempenho traduz o relatório do PageSpeed Insights para a linguagem do estudo (linhas finas, rótulos, números em serifa, título à esquerda e conteúdo recuado): abas celular e computador, anéis por categoria, métricas com as faixas 0–49, 50–89 e 90–100 em cor e forma, sempre com a data e o ambiente da análise e um link para uma nova análise ao vivo; o peso do primeiro acesso entra como número e barra proporcional, de medição própria datada. A identidade visual é um quadro de estilo: a captura como peça principal e paleta e tipografia ao lado. O fechamento é uma linha compacta, com título no tamanho dos capítulos. Fecha com "Explore o projeto", um painel de portais (grade, luz do projeto e acento Pulse na borda) com três células que dizem o que cada link faz (rótulo com ícone, título grande, uma linha de explicação e um círculo com seta que gira no hover), e depois com o convite ao contato, que mantém título e botões; assim, explorar e conversar não se confundem. Movimento discreto: o celular do palco sobe ao rolar, e os registros chegam com a perspectiva dos estudos. Cada estudo varia a composição conforme a obra: no Spectrum, a abertura termina num sumário dos capítulos (índice em serifa e traço Aqua → Ultraviolet no hover e no foco), os blocos internos de cada capítulo recebem rótulos Aqua com o quadrado Pulse (Ultraviolet profundo na faixa Porcelain), a identidade é a faixa Porcelain no segundo capítulo (barra de proporção da paleta com os contrastes, espécime tipográfico, vocabulário de formas e quatro capturas que comparam a composição da homepage, do acervo, da coleção e de um estudo), a escultura é explicada por um esquema geométrico em SVG, a engenharia por números em serifa e o uso de IA por uma sequência de etapas com autoria (autora em Porcelain, IA em Aqua). Na psicologia, a identidade do projeto (papel, azul-petróleo e bronze) fica na própria faixa, e o Spectrum organiza a leitura: o mesmo sumário, o agendamento como três etapas sob o traço Aqua → Ultraviolet com o quadrado Pulse marcando a chegada, e as decisões técnicas e de carregamento em fichas com rótulo Pulse. A linguagem gráfica do Spectrum (grade, moldura, órbita, cápsula de fluxo e acento Pulse, com Aqua e Ultraviolet) é o repertório das próximas evoluções do portfólio: cada uso tem função (orientar, sequenciar, marcar) e respeita a identidade da página, sem empregar todos os elementos por obrigação.
- **Capturas:** WebP em larguras responsivas em `assets/images/<projeto>/`, feitas da demonstração publicada (desktop em 1440px, mobile em 390px a 2x).
- **Acervo (`projetos/`):** lista única, sem coleções, índices nem contagens por grupo. Cada projeto reaproveita o item do carrossel da homepage (`.work`): o palco domina; abaixo, a classificação em rótulo discreto (categoria · formato, como "Portfólio · Site multipágina" e "Site institucional · Single page"; "Projeto autoral" fica de fora por ser implícito), o título em duas vozes, uma descrição curta e "Ver estudo de caso", com a área clicável cobrindo o item. Duas colunas a partir de 56rem, uma no mobile, com a mesma hierarquia para todos e cada legenda sob a própria imagem. Os textos são os da homepage. A classificação é Aqua, precedida pelo quadrado Pulse do Spectrum, e uma luz Aqua suave no canto esquerdo equilibra o violeta do topo. Aqua e o quadrado são a orientação para as próximas páginas.
- **Filtros do acervo:** "Todos" (inicial) e uma opção por categoria com projetos reais, hoje Projetos em destaque (curadoria, transversal às demais) e Sites institucionais. Um projeto pode ter várias categorias em `data-category`, separadas por espaço. No desktop são botões com `aria-pressed`; a seleção muda de forma (preenchimento em Aqua) e de peso, não só de cor. Abaixo de 40rem, um `<select>` nativo compacto, montado pelo JS a partir dos mesmos botões (uma única lista de categorias e uma única lógica), mantém a altura de uma linha mesmo com mais categorias. Os dois ficam sincronizados com a URL. Os botões quebram em linhas em telas estreitas. Não há contador de projetos. A categoria vem da URL (`projetos/?categoria=sites-institucionais`), que serve para links contextualizados; um valor desconhecido mostra "Todos". O JS (`acervo.js`) só revela os filtros e oculta itens por `data-category`, sem recarregar a página; sem JS, os filtros ficam ocultos e todos os projetos aparecem. Para acrescentar um projeto, basta um item com `data-category` e, se a categoria for nova, um botão com o mesmo valor em `data-filter`. Sem paginação nem busca: o volume não justifica.
- **Coleções extintas:** `projetos/sites-institucionais/` deixou de ser coleção. A URL continua publicada como página mínima, sem conteúdo duplicado, com `meta refresh` imediato para `projetos/?categoria=sites-institucionais`, link visível de reserva e `canonical` para o acervo; sai do `sitemap.xml`. A hospedagem estática não oferece redirecionamento HTTP.
- **Serviços (homepage, entre Sobre e Contato):** chamada à página de serviços, separada dos projetos realizados (carrossel e acervo) e das competências (Sobre). Título em duas vozes, sem rótulo, e as quatro frentes sob um traço Aqua → Ultraviolet que se desenha com o scroll (com suporte a scroll-driven animations e sem movimento reduzido): índice em itálico serifado, título em duas vozes e uma linha de descrição, empilhadas no mobile e em quatro colunas a partir de 56rem. Cada frente leva à sua seção na página; o acesso destacado segue o padrão de "Todos os projetos", na coluna 7.
- **Página de serviços (`servicos/`):** landing page comercial, sem preços, planos, depoimentos ou perguntas frequentes. A abertura traz título em duas vozes, resumo, convite ao WhatsApp e uma composição Spectrum à direita (no mobile, entre o título e o texto, sangrando pela borda): painel de grade, cantos de moldura, órbita Aqua com o acento Pulse e cápsula de fluxo Aqua → Ultraviolet. Com movimento permitido, a abertura se monta uma única vez, em CSS: a grade se estende, a moldura se fecha, a órbita chega girando, o Pulse acende sobre ela e a cápsula atravessa por último; no hover e no foco das ações, a órbita gira e a cápsula se estende; com scroll-driven animations, ao sair da tela, as camadas se separam em profundidades diferentes. Depois da abertura, o movimento é contínuo e lento, só em `transform`: a grade respira, a moldura foca e desfoca, a órbita gira devagar levando o Pulse pela curva e uma corrente de luz percorre a cápsula a intervalos. Como no hero, ele é suspenso fora da tela e por um botão discreto "Pausar movimento", só visível com movimento permitido. Fecha com o sumário das frentes (o mesmo de `.case-toc`). Cada frente é uma seção com título fixo à esquerda (sticky a partir de 56rem) e conteúdo na coluna 7: texto de abertura, "Possibilidades" e "Para quem contrata" (rótulos com o quadrado Pulse) e um painel "Na prática", com grade, luz da frente e o quadrado Pulse na borda, que cita evidências verificáveis e leva ao acervo filtrado, aos estudos, ao Laboratório ou ao currículo. As frentes alternam Aqua e Ultraviolet (o texto em Ultraviolet usa um tom claro, por contraste). Segue a faixa Porcelain do processo (quatro etapas de `.case-process`, com o Pulse na chegada) e o convite ao contato.
- **Fechamento (`.closing`):** título em duas vozes à esquerda e ações à direita, separados por uma linha. Fecha a seção de serviços, com chamadas de orçamento, e as páginas internas, com convite neutro à conversa: dois botões de mesmo peso, "WhatsApp" (mensagem contextualizada à página, link nativo sem widget) e "E-mail", além do LinkedIn e dos serviços. O título se ajusta à página ("Quer conversar sobre sites institucionais?" na coleção, "Quer conversar sobre este projeto?" no estudo de caso).
- **Páginas internas:** o conteúdo começa perto do cabeçalho, com um respiro curto (`clamp(0.5rem, 1.5vw, 1.5rem)`) e o link de retorno logo abaixo.

**Diretriz verbal** (conteúdos de projetos e textos futuros):

- Autoral, reservada e precisa: descrever o que foi feito e como, com sensibilidade, sem elogio ao próprio trabalho.
- O desenvolvimento vem em primeiro plano, mas os estudos de caso comunicam propósito, decisões, desafios, soluções e resultados, sem virar documentação de implementação; o detalhe técnico entra só quando explica uma decisão. O design entra como contexto, com menos peso.
- Nada de processos internos nos textos públicos: regras de agentes, organização dos documentos ou procedimentos de Git.
- Tom por contexto: pessoal na apresentação, convidativo nos serviços, editorial nos estudos, instigante no laboratório e direto nos contatos.
- Design com o vocabulário da área (hierarquia, primeira dobra, paleta, par tipográfico, cor de destaque), explicado no próprio texto para quem não é da área.
- Fatos vêm do código, do README e da autora; a redação é própria. Nada de clientes, resultados, métricas, motivações ou intenções emocionais não confirmados.
- Frases curtas e concretas. Sem clichês, linguagem publicitária, metáforas forçadas ou explicações repetidas.
- Nomear o que existe na interface (seções, etapas, controles) em vez de qualificá-lo.
- Projetos publicados para o portfólio não são produtos em produção: apresentar o que foi construído, sem listar limitações como falhas. Recursos demonstrativos e personas fictícias são identificados como tais, sem ênfase.
- Termos técnicos com precisão e só quando informam uma decisão.

**SEO editorial** (complementa os requisitos técnicos da [Arquitetura](ARCHITECTURE.md#9-qualidade)):

- Objetivo permanente: ser encontrada por clientes, recrutadores e oportunidades profissionais em buscas orgânicas.
- Duas intenções complementares: contratação de serviços de desenvolvimento (sites, sistemas e aplicativos) e recrutamento profissional (desenvolvedora de software web e mobile, tecnologias, experiência). O posicionamento não se limita ao front-end.
- Título no padrão "Assunto | Karin Silveira", específico em cada página; a homepage usa "Karin Silveira | Desenvolvedora de Software Web e Mobile". Sem páginas artificiais para busca nem excesso de palavras-chave.
- Cada página responde a uma intenção de busca: a homepage apresenta a profissional e suas capacidades; o acervo, os trabalhos, filtráveis por tipo de solução (por exemplo, site institucional); cada estudo de caso, o tipo de solução (por exemplo, site para psicólogos, single page profissional, interface responsiva, fluxo de agendamento).
- Os termos que as pessoas buscam entram com naturalidade no título, na descrição, nos subtítulos, no texto e nos links, uma vez em cada lugar e sem repetição forçada.
- O texto dos links descreve o destino; o título da página e o `h1` dizem a mesma coisa com palavras próprias.
- Conteúdo original e fundamentado nas decisões reais. Sem serviços, qualificações, experiências ou resultados não confirmados.

## 7. Qualidade visual e acessibilidade

Controles e foco sempre distinguíveis. Todo efeito é avaliado tanto em beleza quanto em utilidade e custo de execução. Metas, testes e compatibilidade estão em [Arquitetura, seção 9](ARCHITECTURE.md#9-qualidade).

## 8. Pendências de design

- Consolidar escala tipográfica, espaçamentos e grid como sistema; definir breakpoints guiados pelo conteúdo.
- Estados de interação.
- Transição D (scroll) do hero para a exposição.
- Textos e imagens reais; favicon.

Os protótipos do briefing são estudos, não layouts finais.

Ver também: [Briefing](BRIEFING.md), [Arquitetura](ARCHITECTURE.md) e [Roadmap](ROADMAP.md).
