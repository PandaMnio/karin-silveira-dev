# Direção artística e design — Karin Silveira

> Versão 0.1 · 24/11/2026 · Documento vivo

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

Direção aprovada: contraste editorial. Combinação inicial a testar, ainda não definitiva:

| Função | Família candidata | Uso |
| --- | --- | --- |
| Estrutura | Satoshi | Nome, grandes títulos, navegação e texto |
| Expressão | Instrument Serif | Destaques pontuais, inclusive itálicos |
| Precisão | Geist Mono | Índices, numerações e metadados |

A monumentalidade virá de escala, composição e peso, sem adicionar outra fonte display. Verificar legibilidade, caracteres portugueses, licenças e formatos antes de incorporar arquivos. Preferir WOFF2 local quando disponível e licenciado. Usar fontes de sistema como fallback. As amostras dos protótipos anteriores são aproximações, não a validação final das fontes.

Definir uma escala fluida com `clamp()` onde fizer sentido, hierarquia clara, largura de leitura confortável e espaçamento responsivo. Não fixar tamanhos de tela ou tipografia que impeçam zoom.

## 4. Composição e sistema visual

- Estrutura editorial assimétrica, modular, com espaços negativos e alinhamento preciso.
- Header reconhecível, links convencionais, foco visível e navegação acessível.
- Unificar grids, espaçamentos, tipografia, controles e linguagem de interação.
- Adaptar proporções, atmosfera e movimento às necessidades de cada trabalho.
- Evitar que cards, bordas, brilhos e sobreposições prejudiquem imagens ou texto.

A homepage combina A + C com a atmosfera de B dos estudos: presença assimétrica, módulos editoriais e profundidade cinematográfica. O estado final do hero prioriza os fragmentos visuais, mantendo o nome, o posicionamento e o convite à ação claramente legíveis.

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

### Motion complementar — a validar

- Parallax sutil para ponteiro de mouse, sem depender de hover.
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

## 7. Qualidade visual e acessibilidade

Meta de referência: WCAG 2.2 AA, a verificar, não uma certificação. Contraste de texto normal de pelo menos 4,5:1 e texto grande 3:1, quando aplicável; controles e foco distinguíveis. Testar teclado, zoom, leitura em mobile, conteúdo alternativo, redução de movimento e desativação de JS. Todo efeito deve ser avaliado tanto em beleza quanto em utilidade e custo de execução.

## 8. Pendências de design

Validar fontes, escala, grid, tokens semânticos, breakpoints guiados por conteúdo, composição desktop/mobile, assinatura compacta, textos, imagens reais, estados de interação e implementação da transição do hero. Os protótipos do briefing são estudos, não layouts finais.

Ver também: [Briefing](BRIEFING.md), [Arquitetura](ARCHITECTURE.md) e [Roadmap](ROADMAP.md).
