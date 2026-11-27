# Direção artística e design — Karin Silveira

> Documento vivo. O código é a fonte dos valores exatos (tokens, medidas, breakpoints); aqui ficam as decisões e a intenção.

## 1. Linguagem visual

**Construção + Fluxo**: estruturas precisas que se transformam com naturalidade. A cinematografia é o fio condutor; a elegância editorial organiza a informação; a expressividade contemporânea dá personalidade; a precisão tecnológica orienta o acabamento.

A estética deve ser tecnológica e contrastante, mas não parecer interface de ficção científica, demonstração de efeitos ou template genérico. Usar grids, alinhamentos, profundidade, luz e movimento com intenção. Evitar excesso de neon, partículas, gradientes indiscriminados e competição entre elementos.

### Vocabulário gráfico permanente

As formas abstratas da Spectrum (painéis, grades, molduras, órbitas, cápsulas de fluxo, gradientes e acentos cromáticos) fazem parte da identidade e coexistem com os conteúdos reais, sem serem substituídas por eles. Cada composição as recombina conforme o contexto, sem repetir literalmente o hero. Cada uso tem função (orientar, sequenciar, marcar) e respeita a identidade da página, sem empregar todos os elementos por obrigação. Nunca encobrem rostos, textos ou o essencial de uma obra.

Padrões recorrentes: título em duas vozes (sans + serifa itálica, ponto final em acento, ecoando a assinatura `ks.`), traço Aqua → Ultraviolet como guia, e o quadrado Pulse como marca de chegada ou rótulo.

## 2. Spectrum — paleta

| Token | Nome | Hex | Papel |
| --- | --- | --- | --- |
| `--color-obsidian` | Obsidian | `#0C0C10` | Superfícies escuras, profundidade |
| `--color-porcelain` | Porcelain | `#EDEDF2` | Texto sobre escuro, superfícies claras |
| `--color-ultraviolet` | Ultraviolet | `#7148FF` | Assinatura tecnológica |
| `--color-aqua` | Aqua | `#00D6CF` | Fluxo, interação, acentos |
| `--color-pulse` | Pulse | `#FF426C` | Expressividade e tensão pontual |

Proporção sugerida: 60% Obsidian, 25% Porcelain, 8% Ultraviolet, 4% Aqua, 3% Pulse; não são cotas. A identidade é predominantemente neutra, com acentos seletivos e, quando adequado, uma cor expressiva dominante por composição.

Tokens primitivos não substituem tokens semânticos (`--color-bg`, `--color-text`, `--color-muted`, `--color-accent` etc., por atmosfera). A cor nunca é o único indicador de estado.

- A atmosfera escura é o padrão; a clara é a classe `.light`, que redefine os tokens semânticos em uso.
- O acento é Aqua no escuro. No claro é `--color-ultraviolet-deep` (`#5D3CCF`, 5,97:1), porque Ultraviolet não atinge AA sobre Porcelain (4,42:1). Texto em Ultraviolet sobre escuro usa um tom claro.
- Pulse fica restrito a usos pontuais e não textuais (2,88:1 sobre Porcelain).
- Referência visual: [style-guide.html](style-guide.html).

### Ritmo cromático

| Ambiente | Atmosfera |
| --- | --- |
| Hall de entrada | Obsidian, luz atmosférica violeta no topo |
| Projetos | Escuro como base, com atmosfera adaptável à obra |
| Sobre | Porcelain, contraste editorial e respiro |
| Serviços e Contato | Campo único de encerramento (`.finale`): grade da construção no alto, luz violeta do fluxo embaixo |
| Laboratório | Verde-petróleo derivado do Aqua, com maior liberdade cromática |

As transições entre claro e escuro fazem parte da narrativa de cada ambiente e não dependem de escolha do visitante. Projetos podem introduzir cores próprias, mantendo leitura e navegação consistentes.

**Possibilidade futura (não aprovada):** seletor global de tema claro/escuro, respeitando `prefers-color-scheme`. Exigiria definir a relação com as atmosferas contextuais e preservar o ritmo cromático, os contrastes validados e o funcionamento sem JS.

## 3. Tipografia

Contraste editorial, com fontes hospedadas localmente (detalhes técnicos em [Arquitetura](ARCHITECTURE.md#10-decisões)).

| Função | Família | Uso |
| --- | --- | --- |
| Estrutura | Manrope (200–800) | Nome, títulos, navegação e texto |
| Expressão | Instrument Serif (regular e itálico) | Contraste editorial pontual: segunda voz dos títulos, índices, números |

Fallbacks: `system-ui` e Georgia. A monumentalidade vem de escala, composição e peso, sem outra fonte display. Escala fluida com `clamp()`, largura de leitura confortável, sem tamanhos que impeçam zoom.

## 4. Composição

- Estrutura editorial assimétrica e modular, com espaço negativo e alinhamento preciso; grid de 12 colunas.
- No desktop, o texto de apoio das seções começa na coluna 7 e os títulos na 1; no mobile, tudo se alinha à esquerda.
- Respiros entre seções crescem com a largura da tela, não com a altura (`--space-section`).
- Cada legenda fica logo abaixo da própria imagem; o espaço dentro de um item é sempre menor que o espaço entre itens.
- Cards, bordas, brilhos e sobreposições não podem prejudicar imagens ou texto.
- Cabeçalho transparente em todas as páginas: a luz do topo atravessa cabeçalho e primeira seção sem emenda. Traço Aqua → Ultraviolet cresce nos links no hover e no foco e fica completo na página atual.
- Menu mobile (< 56rem): a mesma `nav` vira painel vertical aberto por botão "Menu" criado por `nav.js`; fecha com Esc, clique fora, escolha de link ou perda de foco. Sem JS, a navegação permanece em linha.
- Rodapé igual em todas as páginas: assinatura `ks.`, créditos e "Voltar ao topo". O uso de IA é tratado nos estudos de caso, não no rodapé.
- Páginas internas: conteúdo perto do cabeçalho, com o link de retorno logo abaixo.

### Fechamento (`.closing`)

Título em duas vozes à esquerda e ações à direita. Nas páginas internas, convite neutro à conversa: dois botões de mesmo peso, "WhatsApp" (mensagem contextualizada, link nativo sem widget) e "E-mail", além de LinkedIn e serviços. O título se ajusta à página.

## 5. Homepage

- **Hero (estado C):** uma escultura paramétrica ocupa toda a seção, com o texto à esquerda sobre ela. Uma superfície regrada nasce do escuro como piso de grade Porcelain (construção), torce-se meia volta num ponto de transformação e revela a outra face em Aqua → Ultraviolet (fluxo), que sobe e se curva na direção do nome. Uma órbita envolve a fita nesse ponto, com o acento Pulse. É um SVG estático em projeção 3D, gerado por `dev/escultura.mjs`; sem texto, código, controles ou dispositivos. No mobile, a escultura fica sob o texto, ancorada na base e esmaecida no topo. Hierarquia: posicionamento, nome, mensagem e CTA.
- **Projetos (carrossel):** cada projeto aparece individualmente e leva direto ao estudo de caso: palco, índice em serifa itálica, título em duas vozes, descrição curta e "Ver estudo de caso". A faixa sangra pelas bordas e o próximo projeto aparece na borda. Rolagem horizontal nativa com snap, que funciona sem JS; o JS acrescenta contador e botões anterior/próximo, que somem quando tudo cabe na tela. O acesso ao acervo fica no cabeçalho da seção, alinhado à direita, no padrão tipográfico "Todos os projetos" (rótulo, título e traço Aqua → Ultraviolet), longe dos controles para não parecer ação de um item.
- **Sobre:** atmosfera clara, título em duas vozes. O texto desce em degrau ao lado do retrato; princípios como frases grandes com o verbo em serifa itálica; uma reflexão autoral em serifa itálica, sem rótulo, para não soar como afirmação curricular. Destaques na coluna do retrato (experiência, bacharelado, formação técnica) fecham com acesso ao currículo, onde ficam mentoria e eventos. Habilidades em faixa própria de ponta a ponta, em quatro colunas (duas abaixo de 75rem): índice, descrição, ícones decorativos (saem abaixo de 56rem) e tecnologias em texto, cada uma citada uma vez. Os dados vêm do [Briefing](BRIEFING.md#dados-profissionais-confirmados); nomes de empregadores não aparecem.
- **Retrato:** a fotografia permanece intacta, sem filtros nem recortes. Ao redor, camadas independentes em CSS (painel de grade que sangra pela borda, moldura de cantos, órbita, cápsula de fluxo e acento Pulse) que derivam em velocidades diferentes com scroll-driven animations; a foto não se move.
- **Serviços:** chamada à página de serviços, separada dos projetos realizados e das competências. Título em duas vozes e quatro frentes sob um traço Aqua → Ultraviolet que se desenha com o scroll; cada frente leva à sua seção na página.
- **Contato:** luz violeta subindo do canto inferior esquerdo, oposta à do topo. Sem títulos intermediários nem linhas entre os canais: a hierarquia vem de tamanho e espaço. Contato direto (e-mail e WhatsApp, mesmo peso, com botão de copiar só quando a área de transferência está disponível) e, a um respiro maior, presença profissional (GitHub e LinkedIn, menores). Órbita e cápsula nas bordas, fora da área do texto, que reagem ao scroll e ao hover do contato direto.
- **Laboratório (chamada):** depois do Contato, sobre superfície verde-petróleo; título, texto, link no padrão de "Todos os projetos" e um espécime de bancada (metade grade, metade ondas Aqua) que se anima ao entrar na tela.
- **Transições entre seções:** Sobre → Serviços passa do Porcelain ao escuro; Serviços → Contato é contínua, num único fundo, sem borda; Contato → Laboratório tem borda tonal do violeta ao verde-petróleo.

## 6. Movimento

### Abertura do hero

O conteúdo já está disponível; não é preloader bloqueante. Os mesmos elementos se transformam de forma contínua, em vez de telas separadas: da tipografia ao equilíbrio e à composição visual (cerca de 2 s), seguidos da transição pelo scroll para a exposição modular.

- A abertura é toda em CSS (`transform`, `opacity`, `clip-path`) e acontece a cada carregamento. O estado final é o próprio layout: sem animação, a página já está completa.
- Textos começam com no mínimo 80% de opacidade: nunca invisíveis (atrasaria o LCP) e sempre com contraste AA.
- O JS apenas conclui a abertura na primeira interação (rolagem, toque, tecla ou clique).
- A saída do hero usa scroll-driven animations, sem JS: os fragmentos perdem inclinação e profundidade e o carrossel chega deslizando. Sem suporte ou com movimento reduzido, a exposição é estática.
- Em telas pequenas, composição própria e movimentos simplificados, não a versão desktop comprimida.

### Movimento contínuo

- **Hero:** atmosfera, fita e órbita derivam devagar, e o Pulse percorre um trecho da órbita. Só animação CSS, sem redesenho do SVG, composta com a abertura, o parallax de ponteiro (`translate`, por profundidade `--z`) e a transição de scroll.
- **Abertura de Serviços:** composição Spectrum (grade, moldura, órbita, Pulse, cápsula) que se monta uma vez e depois se move de forma lenta.
- Ambos são suspensos fora da tela e por um botão discreto "Pausar movimento", visível só com movimento permitido. Sem movimento permitido, ficam estáticos.
- **Indicador de rolagem** do hero: link para `#projetos`, ativo após a abertura, com mouse ou trackpad e sem movimento reduzido; abaixo de 56rem, vira uma mão que desliza.

### Princípios

- Nenhum efeito é obrigatório para acessar conteúdo; não sequestrar scroll, sem flashes ou movimentos frenéticos.
- Priorizar `transform` e `opacity`; evitar trabalho contínuo desnecessário e mudanças bruscas de layout.
- Durações de referência: 150 ms, 300 ms e 600 ms; curva `cubic-bezier(0.22, 1, 0.36, 1)`.
- Microinterações com resposta clara, com foco e toque equivalentes; transições cromáticas acompanham o conteúdo.

## 7. Exposição dos projetos

| Coleção | Tratamento |
| --- | --- |
| Projetos em destaque | Carrossel da homepage, exposição individual |
| Acervo | Lista única, filtrável por categoria, com acesso direto aos estudos de caso |
| Laboratório | Exploração mais livre, com navegação clara |

Cada projeto valoriza o resultado e, quando pertinente, contexto, desafio, papel da autora, decisões, processo, tecnologias e resultados verificáveis. Não atribuir métricas ou trabalhos fictícios à autora. Demos complexas abrem em ambiente independente.

- **Palco (`.stage`):** capturas reais da interface desktop e mobile sobre a superfície do projeto (grade, moldura, órbita, traço de fluxo e acento Pulse), com a luz vinda da identidade de cada projeto (`--project-deep` e `--project-glow`, numa classe `stage-<projeto>`). Aparece no carrossel, no acervo e na abertura do estudo. As formas ficam atrás das telas. Capturas em WebP responsivo, feitas da demonstração publicada (desktop 1440px, mobile 390px a 2x).
- **Acervo (`projetos/`):** lista única, sem coleções, índices nem contagens. Cada projeto reaproveita o item do carrossel (`.work`): palco, classificação em rótulo Aqua precedido pelo quadrado Pulse (categoria · formato), título em duas vozes, descrição curta e "Ver estudo de caso", com a área clicável cobrindo o item. Duas colunas a partir de 56rem. No hover e no foco, a borda do palco acende e a seta avança.
- **Filtros:** "Todos" e uma opção por categoria com projetos reais, sincronizados com a URL (`?categoria=`; valor desconhecido mostra "Todos"). Botões com `aria-pressed` no desktop (seleção por preenchimento e peso, não só cor) e `<select>` nativo montado pelo JS abaixo de 40rem, a partir dos mesmos botões. Sem JS, os filtros ficam ocultos e todos os projetos aparecem. Um projeto pode ter várias categorias em `data-category`; para acrescentar um, basta um item e, se a categoria for nova, um botão com o mesmo valor em `data-filter`. Sem paginação nem busca.
- **Estudo de caso (`projetos/<projeto>/`):** abertura com título em duas vozes, resumo, links e palco; capítulos numerados (título à esquerda, texto recuado) intercalados com registros em escalas variadas; faixa própria com a identidade do projeto; decisões técnicas em ficha de linhas, sem badges; desempenho com a data e o ambiente da medição, distinguindo laboratório de dados reais; painel "Explore o projeto" com os links externos, seguido do convite ao contato, para que explorar e conversar não se confundam. Cada estudo varia a composição conforme a obra: o Spectrum organiza a leitura com sumário de capítulos, esquemas e a sequência de etapas com autoria (autora em Porcelain, IA em Aqua); a psicologia mantém o papel, o azul-petróleo e o bronze do projeto.
- **Página de serviços (`servicos/`):** landing comercial, sem preços, planos, depoimentos ou perguntas frequentes. Abertura com título em duas vozes, resumo, convite ao WhatsApp e a composição Spectrum; sumário das frentes; cada frente com título fixo à esquerda (sticky a partir de 56rem) e conteúdo na coluna 7 (abertura, "Possibilidades", "Para quem contrata" e o painel "Na prática", que cita evidências verificáveis e leva ao acervo, aos estudos, ao Laboratório ou ao currículo); as frentes alternam Aqua e Ultraviolet. Segue a faixa Porcelain do processo em quatro etapas e o fechamento.
- **Currículo (`curriculo/`):** HTML como fonte única, com impressão otimizada para PDF. Quatro versões (Geral, Front-end, Desenvolvimento web e Mobile) selecionadas por rádios em CSS (`:has()`) sobre blocos `data-v`; `?versao=` seleciona e o título do PDF segue a versão.

## 8. Laboratório

Página própria, com o petróleo cobrindo toda a extensão. Cada experimento tem atmosfera própria (luz Aqua ou Ultraviolet alternadas) e um fio Aqua → Ultraviolet separa as seções. O palco sangra até as bordas e a legenda fica abaixo, em três colunas. Princípios comuns: controles nativos, redesenho só durante a interação (um quadro por interação, laço de quadros que para quando tudo se assenta), mudanças imediatas com movimento reduzido e, sem JS, o estado inicial estático com os controles ocultos.

- **01 — Construção & Fluxo** (protagonista): uma grade em SVG se transforma em correntes Aqua → Ultraviolet por um controle deslizante, com uma lente que segue o cursor (ou o toque) e o Pulse levado pela corrente.
- **02 — Luz & Espectro:** três luzes (Aqua, Ultraviolet e Pulse, mais contida) somadas em `screen`, com sombras de penumbra que ganham a cor das outras luzes. Movidas por arraste ou setas (Shift para passos maiores).
- **03 — Tipo & Ritmo:** a frase "Estruturas precisas que se transformam com naturalidade" em escala modular com intervalo musical nomeado, entreletra, entrelinha e ritmo de peso e recuo, tudo em propriedades CSS.
- **04 — Forma & Espaço:** a escultura do hero recalculada no navegador pelo mesmo núcleo (`scripts/escultura.js`), carregado quando o experimento se aproxima da tela. Controles de forma, espaço, luz e cor; restaurar volta ao estado do hero e exportar baixa um SVG autônomo.

## 9. Voz e SEO editorial

**Diretriz verbal** (projetos e textos futuros):

- Autoral, reservada e precisa: descrever o que foi feito e como, sem elogio ao próprio trabalho.
- O desenvolvimento vem em primeiro plano; os estudos comunicam propósito, decisões, desafios e soluções sem virar documentação de implementação. O design entra como contexto, com o vocabulário da área explicado no próprio texto.
- Nada de processos internos nos textos públicos (regras de agentes, organização dos documentos, procedimentos de Git).
- Tom por contexto: pessoal na apresentação, convidativo nos serviços, editorial nos estudos, instigante no laboratório e direto nos contatos.
- Fatos vêm do código, do README e da autora. Nada de clientes, resultados, métricas, motivações ou intenções não confirmados.
- Frases curtas e concretas, sem clichês, linguagem publicitária ou metáforas forçadas; nomear o que existe na interface em vez de qualificá-lo; termos técnicos só quando informam uma decisão.
- Projetos publicados para o portfólio não são produtos em produção: apresentar o que foi construído, sem listar limitações como falhas. Recursos demonstrativos e personas fictícias são identificados como tais, sem ênfase.

### SEO editorial

Complementa os requisitos técnicos da [Arquitetura](ARCHITECTURE.md#9-qualidade).

- Objetivo permanente: ser encontrada por clientes, recrutadores e oportunidades em buscas orgânicas, com duas intenções: contratação de serviços de desenvolvimento e recrutamento (desenvolvedora de software web e mobile). O posicionamento não se limita ao front-end.
- Título no padrão "Assunto | Karin Silveira", específico em cada página; a homepage usa "Karin Silveira | Desenvolvedora de Software Web e Mobile". Sem páginas artificiais para busca nem excesso de palavras-chave.
- Cada página responde a uma intenção: a homepage apresenta a profissional; o acervo, os trabalhos filtráveis por tipo de solução; cada estudo, o tipo de solução que demonstra.
- Os termos buscados entram com naturalidade no título, na descrição, nos subtítulos, no texto e nos links, uma vez em cada lugar. O texto dos links descreve o destino, e o título e o `h1` dizem a mesma coisa com palavras próprias.
- Conteúdo original e fundamentado nas decisões reais, sem serviços, qualificações ou resultados não confirmados.

## 10. Qualidade visual e pendências

Controles e foco sempre distinguíveis; todo efeito é avaliado em beleza, utilidade e custo de execução. Metas e compatibilidade estão em [Arquitetura, seção 9](ARCHITECTURE.md#9-qualidade).

Pendências de design:

- Consolidar escala tipográfica, espaçamentos e grid como sistema, a partir do que o hero e a exposição já usam.
- Definir estados de interação.
- Avaliar refinamentos visuais (profundidade, iluminação, parallax) só se justificados em legibilidade e desempenho.

Ver também: [Briefing](BRIEFING.md) e [Arquitetura](ARCHITECTURE.md).
