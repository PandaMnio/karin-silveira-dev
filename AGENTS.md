# Instruções para agentes

Ponto de entrada do projeto. Este arquivo define como trabalhar; as decisões de produto, design e arquitetura estão em `docs/` e prevalecem em caso de conflito.

## Onde consultar

Consulte apenas o que a tarefa exigir.

| Fonte | Quando consultar |
| --- | --- |
| [BRIEFING](docs/BRIEFING.md) | Posicionamento, públicos, conteúdo, tom de voz |
| [DESIGN](docs/DESIGN.md) | Paleta, tipografia, composição, movimento, exposição de trabalhos |
| [ARCHITECTURE](docs/ARCHITECTURE.md) | Stack, estrutura, convenções, metas de qualidade |
| [ROADMAP](docs/ROADMAP.md) | Etapa atual, progresso, próximos passos |
| [README](README.md) | Execução local |
| [style-guide.html](docs/style-guide.html) | Referência visual da paleta, tipografia e atmosferas |

## Contexto

- Use o menor contexto suficiente: localize arquivos, seletores e trechos com buscas direcionadas antes de ler.
- Leia arquivos inteiros quando necessário para entender dependências ou evitar regressões; não imponha limites artificiais.
- Reaproveite o contexto ainda válido; não releia sem motivo nem carregue logs, arquivos gerados ou conteúdo irrelevante.
- Amplie o contexto progressivamente quando surgirem dúvidas ou dependências imprevistas.

## Como trabalhar

- HTML, CSS e JavaScript nativos, sem dependências, frameworks ou build, salvo autorização.
- Simplicidade na arquitetura, sofisticação na experiência. A qualidade das entregas não é reduzida para economizar esforço.
- Planejamento proporcional ao risco: tarefas simples são executadas direto; moderadas pedem um plano breve; complexas, investigação de riscos e critérios de aceite antes de implementar. Quando há uma solução claramente adequada, não apresente alternativas.
- Decida com autonomia o que for local, reversível e coerente com o projeto. Consulte a desenvolvedora antes de mudar escopo, identidade, arquitetura ou requisito aprovado.
- Faça a menor alteração suficiente: preserve o código adequado, prefira mudanças localizadas e não refatore o que não está relacionado.
- Nada de abstrações, helpers, arquivos ou diretórios para necessidades hipotéticas, nem padrões aplicados só por convenção. Não sacrifique a legibilidade para reduzir linhas.
- Faça apenas o que a tarefa pede e não antecipe etapas do roadmap.
- Não altere decisões criativas consolidadas sem justificativa e aprovação.
- Não invente conteúdo pessoal ou profissional. Conteúdo provisório é marcado como tal.
- Preserve as alterações feitas pela desenvolvedora.

## Código de produção

- O código representa apenas o produto. Não inclua IDs de tarefa, referências a roadmap, IA, prompts ou histórico em comentários, classes, funções ou variáveis.
- Comente apenas decisões técnicas não evidentes, restrições reais ou comportamentos que precisem de esclarecimento.
- O funcionamento do site não depende da documentação.

## Qualidade em toda implementação

SEO, performance, responsividade e acessibilidade são requisitos permanentes, não uma etapa final. Metas e orçamento estão em [ARCHITECTURE, seção 9](docs/ARCHITECTURE.md#9-qualidade).

- HTML semântico, conteúdo indexável e navegação nativa; aprimoramento progressivo.
- O conteúdo principal não depende de JavaScript nem de animações.
- Carregamento rápido, estabilidade visual e baixo consumo de recursos; nada de processamento contínuo ou caro em animações e scroll.
- Recursos pesados só quando necessários; otimize imagens, fontes e vídeos ao introduzi-los.
- Adapte a telas, formas de interação (toque, teclado, mouse) e capacidades dos dispositivos; respeite `prefers-reduced-motion`.
- Compatibilidade com Chrome, Safari, Firefox e navegadores móveis.
- Valide proporcionalmente ao risco: verifique o que mudou e o que pode regredir. Reserve auditorias amplas para mudanças estruturais ou marcos.
- Não declare resultados não verificados; registre objetivamente o que não pôde ser testado.
- Não adicione bibliotecas, monitoramento ou infraestrutura de testes só para cumprir as metas.

## Ferramentas

- Use comandos com escopo definido e saídas curtas, e agrupe operações independentes.
- Não repita verificações que continuam válidas.
- Analise o erro antes de repetir um comando; não faça tentativas sem uma hipótese.
- Scripts de verificação pontuais ficam fora do repositório e não se tornam permanentes.

## Versionamento

O versionamento é responsabilidade exclusiva da desenvolvedora. Agentes de IA nunca executam comandos que modifiquem o estado do Git, independentemente de autorização, contexto ou conveniência: staging, commits, pushes, tags, criação ou alteração de branches, merges, rebases, resets e stashes.

São permitidas apenas consultas que não alteram o repositório, como `git status`, `git diff` e `git log`. Uma mensagem de commit pode ser sugerida, mas o versionamento nunca é requisito para concluir uma tarefa.

## Ao concluir

Relate com alta densidade de informação, omitindo seções vazias:

- **Resultado:** o que foi implementado.
- **Alterações:** arquivos e decisões relevantes.
- **Validação:** testes executados, resultados e regressões.
- **Pendências:** apenas limitações, riscos ou decisões que exigem atenção.

Não repita o pedido, arquivos do repositório nem decisões já documentadas, e evite textos genéricos. Detalhe mais apenas quando risco ou complexidade justificarem.

Na documentação, registre só o que não se infere do código: decisões duradouras, mudanças arquiteturais ou conceituais, progresso real no roadmap e pendências para continuar. Sem narrativas de execução e sem um arquivo por tarefa.
