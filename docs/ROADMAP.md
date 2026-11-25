# Roadmap — Karin Silveira

> Versão 0.2 · 25/11/2026 · Documento vivo

## 1. Método

Trabalhar em incrementos pequenos, com participação ativa da autora. Em cada etapa: discutir objetivo e escolhas, implementar um recorte, validar o resultado, registrar decisões e só então ampliar o escopo. Não há prazo ou estimativa de esforço definidos. O roadmap é uma sequência de prioridades e pode mudar conforme os testes.

Legenda: `[x]` concluído no escopo atual; `[ ]` pendente. Critérios são condições de conclusão propostas, não resultados já verificados.

## 2. Etapas

### 00 — Briefing e conceituação · concluído

- [x] Definir propósito, marca pessoal, identidade, públicos e abordagem profissional.
- [x] Definir Construção + Fluxo, direção cinematográfica, Spectrum e contraste editorial.
- [x] Definir jornada híbrida, abertura tipográfica → equilibrada → visual e transição espacial → modular no scroll.
- [x] Definir fundação HTML + CSS + JS sem dependências obrigatórias.
- [x] Consolidar os quatro documentos iniciais.
- [x] Revisar a documentação com a autora e ajustar possíveis divergências.

**Saída:** visão compartilhada, com hipóteses e decisões distinguidas.

### 01 — Fundação técnica · concluída

- [x] Criar o repositório local e copiar a pasta `docs/`.
- [x] Discutir e montar a estrutura mínima de arquivos.
- [x] Escrever `index.html` com metadados essenciais, landmarks e conteúdo provisório simples.
- [x] Conectar `main.css` e `main.js` (módulo nativo); iniciar arquivos CSS essenciais sem implementar efeitos.
- [x] Executar em servidor HTTP local; escrever instruções no README e definir `.gitignore` conforme necessidade.
- [x] Validar a base: verificações automatizadas e validação manual da autora (teclado e foco, zoom, telas pequenas, JS desativado).
- [x] Revisar e simplificar a fundação: CSS consolidado em `main.css`, sem camadas nem arquivos reservados.
- [ ] Validar o HTML no W3C Nu.
- [x] Primeiro commit, feito pela autora.

**Aceite:** página abre via HTTP, sem erros de console ou recursos inexistentes; conteúdo e links básicos utilizáveis; estrutura compreensível e sem dependências. Nenhuma animação complexa é necessária.

### 02 — Design system · em andamento

- [x] Criar tokens Spectrum e tokens semânticos para atmosferas claras/escuras.
- [x] Definir famílias tipográficas e fallbacks: Manrope + Instrument Serif via Google Fonts.
- [ ] Definir escala de tipografia, espaçamentos, grid e regras responsivas.
- [ ] Criar os primeiros estilos de links, botões, títulos, foco e navegação.
- [ ] Testar contraste, zoom e estados de interação.

**Aceite:** amostras de texto, componentes e superfícies coerentes nos dois ambientes cromáticos; leitura e foco claros; tokens reaproveitáveis.

### 03 — Estrutura funcional

- [ ] Montar a homepage em HTML semântico: entrada, projetos, sobre, lab e contato.
- [ ] Criar navegação e decidir as primeiras páginas internas conforme o volume de conteúdo.
- [x] Usar projetos ilustrativos explicitamente marcados; definir modelo básico de conteúdo.
- [ ] Testar versão estática, responsividade, teclado e navegação sem JS.

**Aceite:** visitante consegue compreender o propósito, explorar trabalhos ilustrativos e chegar ao contato sem animações. Sem links quebrados ou destinos fictícios apresentados como reais.

### 04 — Hall de entrada · concluída

- [x] Prototipar a composição final assimétrica/editorial com prioridade visual e nome legível (fragmentos provisórios).
- [x] Desenvolver a abertura A → B → C com os mesmos elementos.
- [x] Testar progressão automática, navegação durante a abertura e comportamento por sessão.
- [x] Implementar o estudo de continuidade espacial → modular com scroll, sem bloqueá-lo.
- [x] Criar tratamento mobile, fallback estático e redução de movimento.

**Aceite:** movimento contínuo e controlado; conteúdo e ações acessíveis a qualquer momento; composição final preservada sem efeitos; testes em toque e desktop. Não avançar para efeitos ópticos antes de validar a coreografia.

### 05 — Exposição de trabalhos

- [ ] Implementar destaque cinematográfico e galeria editorial.
- [x] Construir apresentação de projeto reutilizável (primeiro estudo de caso: `projetos/psicologia/`).
- [x] Retirar os estudos ilustrativos da exposição e do acervo, mantendo suas formas como capas.
- [x] Organizar o acervo por categorias e criar a coleção Sites institucionais (`projetos/sites-institucionais/`).
- [x] Apresentar projetos e coleções no mosaico da homepage, com agrupamento claro entre imagem e legenda.
- [ ] Publicar as demais categorias (Sistemas e aplicações web, Aplicativos mobile, Back-end e integrações) quando houver projetos reais.
- [x] Criar o acervo (`projetos/`) como índice estático, acessível pela exposição da homepage.
- [ ] Adicionar filtros ao acervo quando o volume justificar, com alternativa sem JS.
- [ ] Conectar os fragmentos do hero aos trabalhos da curadoria.

**Aceite:** trabalhos distinguíveis e acessíveis; contexto, autoria e links visíveis; adicionar um projeto não exige reescrever a fundação.

### 06 — Sobre, laboratório e contato

- [x] Compor a seção clara de apresentação (textos provisórios, derivados do briefing).
- [x] Acrescentar ao Sobre capacidades, formação e repertório confirmados, sem nomes de empregadores.
- [x] Acrescentar ao Sobre a mentoria e a participação em eventos da comunidade.
- [ ] Aprovar os textos de apresentação.
- [x] Criar a entrada do laboratório com o primeiro experimento interativo (Construção & Fluxo).
- [ ] Definir a navegação às experiências quando houver mais de uma.
- [x] Construir encerramento e canais de contato.
- [ ] Acrescentar o currículo quando disponível.

**Aceite:** identidade profissional clara, contato direto e experimentos isolados do funcionamento principal.

### 07 — Refinamento visual

- [ ] Avaliar profundidade, iluminação, parallax e transições cromáticas.
- [ ] Adicionar microinterações apenas onde contribuam com a experiência.
- [ ] Considerar Canvas/WebGL somente se CSS e JS simples não atenderem à intenção.
- [ ] Medir custo de movimento e mídia em dispositivos representativos; retirar efeitos que prejudiquem legibilidade ou desempenho.

**Aceite:** cada efeito tem finalidade e alternativa funcional; experiência fluida, sem excessos ou dependência gráfica obrigatória.

### 08 — Conteúdo real

- [ ] Inventariar projetos, priorizando desenvolvimento; escolher destaques com a autora.
- [ ] Revisar direitos de exposição, confidencialidade e contribuição individual.
- [ ] Substituir exemplos por textos, imagens, links e dados reais; retirar placeholders não publicáveis.
- [ ] Refinar voz, idioma, identidade nominal, favicon e materiais profissionais.

**Aceite:** conteúdo verdadeiro, autorizado, atualizado e coerente com o posicionamento. Este trabalho pode começar paralelamente às etapas 02–06 para orientar o design.

### 09 — Qualidade e publicação

- [ ] Validar HTML, teclado, foco, contraste, zoom, movimento reduzido e JS desligado.
- [ ] Testar dispositivos/navegadores, links e performance com mídia real.
- [ ] Configurar SEO, metadados sociais, domínio, HTTPS e hospedagem estática.
- [ ] Publicar, revisar a experiência no ambiente real e documentar manutenção.

**Aceite:** site profissional utilizável, conteúdo completo, contato válido e ausência de bloqueios críticos; experiência sofisticada sem sacrificar navegação. Registrar limitações e melhorias futuras.

## 3. Recorte da primeira entrega funcional

Priorizar uma homepage estática com apresentação, curadoria de trabalhos, sobre e contato. O laboratório pode começar como uma seção simples. A abertura complexa, acervo avançado e efeitos opcionais entram após a base. Uma versão pública só deverá sair com conteúdo real revisado e validação mínima de qualidade, mesmo que ainda não tenha todos os refinamentos.

## 4. Próximos passos

- **Abertura, transição pelo scroll e mosaico:** validar em Safari, Firefox e dispositivos reais, incluindo o hover dos itens (`:has`) e o subgrid.
- **Etapa 01:** validação do HTML no W3C Nu.
- **Etapa 02:** consolidar escala, espaçamentos e grid a partir do que o hero e a exposição já usam.

## 5. Possibilidades futuras

Ideias registradas para avaliação posterior. Não são decisões aprovadas e não têm etapa definida.

- **Seletor global de tema claro/escuro:** uma preferência do visitante, aplicada ao site inteiro, que poderia respeitar `prefers-color-scheme` e oferecer um controle explícito. É diferente das atmosferas contextuais da direção artística ([Design](DESIGN.md), seção 2), nas quais as transições entre claro e escuro fazem parte da narrativa de cada ambiente e não dependem de escolha do visitante. Se for adotado, o seletor deve preservar o ritmo cromático, os contrastes validados e o funcionamento sem JavaScript, e a relação entre os dois mecanismos precisa ser definida antes da implementação.

Ver também: [Briefing](BRIEFING.md), [Design](DESIGN.md) e [Arquitetura](ARCHITECTURE.md).
