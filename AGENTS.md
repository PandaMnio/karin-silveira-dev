# Instruções para agentes

Ponto de entrada do projeto. Este arquivo define como trabalhar; as decisões estão em `docs/` e prevalecem em caso de conflito.

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

## Contexto e ferramentas

Use o menor contexto suficiente: busque antes de ler e leia o arquivo inteiro quando dependências ou regressões exigirem. Reaproveite o contexto válido e ignore logs e arquivos gerados. Use comandos com escopo definido, agrupe operações independentes, analise erros antes de repetir comandos e não refaça verificações ainda válidas.

## Como trabalhar

- HTML, CSS e JavaScript nativos; nenhuma dependência, framework ou build sem autorização.
- Simplicidade na arquitetura, sofisticação na experiência, sem reduzir a qualidade.
- Planeje na proporção do risco. Decida com autonomia o que for local e reversível; consulte a desenvolvedora antes de mudar escopo, identidade, arquitetura ou requisito aprovado.
- Faça a menor alteração suficiente e só o que a tarefa pede, sem refatorar o que não está relacionado nem antecipar etapas. Nada de abstrações, arquivos ou padrões para necessidades hipotéticas.
- Preserve as decisões criativas consolidadas e as alterações da desenvolvedora.
- Não invente conteúdo pessoal ou profissional; o provisório é marcado como tal.
- O código representa só o produto: nada de IDs de tarefa, roadmap, IA ou histórico em comentários e nomes. Comente apenas o que não é evidente.

## Qualidade

SEO, performance, responsividade e acessibilidade valem para toda implementação; metas em [ARCHITECTURE, seção 9](docs/ARCHITECTURE.md#9-qualidade).

- HTML semântico, conteúdo indexável, navegação nativa e aprimoramento progressivo; o conteúdo não depende de JS nem de animações.
- Carregamento rápido, layout estável e nenhum processamento contínuo em animações e scroll. Recursos pesados só sob demanda e otimizados.
- Adapte a telas, toque, teclado e mouse; respeite `prefers-reduced-motion`. Mire em Chrome, Safari, Firefox e navegadores móveis.
- Valide na proporção do risco: verifique o que mudou e o que pode regredir. Nunca declare o que não foi verificado; registre as limitações.
- Não adicione bibliotecas, monitoramento ou infraestrutura de testes; scripts pontuais ficam fora do repositório.

## Versionamento

O Git é responsabilidade exclusiva da desenvolvedora. Nunca execute comandos que alterem o estado do repositório, independentemente de autorização ou contexto: staging, commits, pushes, tags, branches, merges, rebases, resets e stashes. Apenas consultas como `git status`, `git diff` e `git log` são permitidas. É possível sugerir uma mensagem de commit, mas o versionamento nunca é requisito para concluir uma tarefa.

## Ao concluir

Relate em **Resultado**, **Alterações**, **Validação** e **Pendências**, omitindo seções vazias. Não repita o pedido, os arquivos ou as decisões já documentadas.

Registre na documentação apenas o que não se infere do código: decisões duradouras, progresso real no roadmap e pendências. Sem narrativas e sem um arquivo por tarefa.
