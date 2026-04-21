# Brasil Sustenta - Reposicionamento das Areas Privadas v2

## Como usar este documento

Este arquivo descreve direcao de reposicionamento para areas privadas e dashboards.

Trate este material como:

- alvo estrategico de produto
- backlog de direcao para experience design
- referencia para evolucao das areas autenticadas

Nao trate este material como:

- fotografia exata do que ja esta implementado
- fonte de verdade do sitemap atual
- definicao final da navegacao publica

Para o estado implementado agora, consultar:

1. `IMPLEMENTATION_STATUS.md`
2. `client/src/App.tsx`
3. `client/src/components/Header.tsx`

Observacao:

- a camada B2G e o dashboard de prefeitura aparecem aqui como direcao futura relevante.
- Isso ainda nao significa entrega concluida no produto atual.

## Diagnostico atual

As areas privadas possuem base visual forte, mas nao foram reposicionadas para refletir:

- a nova categoria (squad ESG com matching por IA)
- a arquitetura territorial (HUBs Locais + Campi)
- a camada B2G (prefeitura como cliente com dashboard proprio)
- os fluxos corretos por persona (empresa, talento, universidade/Campus, prefeitura)

### Problemas transversais

- labels antigas e genericas sem orientacao por JTBD
- linguagem de "dashboard premium" ao inves de "produto compravel e operacional"
- mock data e claims sem lastro em partes da experiencia
- IA presente no discurso mas ausente como artefato central
- pouco alinhamento entre area privada e categoria publica
- ausencia de dashboard especifico para prefeitura (B2G)
- ausencia de camada de HUB Local como entidade do sistema

---

## Estado desejado por dashboard

### Dashboard Empresa

#### Eixo central

`brief -> shortlist IA -> squad -> sprint -> relatorio final`

#### Tabs recomendadas

- Resumo da conta
- Meus Briefs
- Shortlists e Fit IA
- Squads Ativos
- Relatorios e Evidencias
- Historico de Projetos

#### Mudancas-chave

- substituir "Dashboard Corporativo" por fluxo orientado a brief e squad
- transformar "Talent Pool" em shortlist contextual com fit score explicado
- transformar "IA Intelligence" em artefato claro: ODS Fit Score + justificativa de match
- tornar relatorio e trilha de evidencia parte central da experiencia, nao apendice
- adicionar campo "cidade do HUB" para empresas que operam em multiplas cidades

#### Criticos de UX

- o usuario deve ver o proximo passo em menos de 5 segundos
- o fit score deve ser explicado em linguagem natural ("Fit com ODS 8 porque...")
- o relatorio final deve ser acessivel diretamente da tela do squad

---

### Dashboard Jovem (Talento)

#### Eixo central

`match contextual -> candidatura com justificativa -> squad -> portfolio observavel`

#### Tabs recomendadas

- Resumo e Perfil
- Matches para voce (com justificativa de fit)
- Candidaturas
- Squads Ativos
- Portfolio e Entregas
- Historico

#### Mudancas-chave

- destacar por que aquele desafio combina com o usuario (fit score explicado)
- mostrar progresso de reputacao e portfolio com cada squad concluido
- substituir "Oportunidades" por "Matches para voce" (linguagem de curadoria, nao de mercado)
- fazer cada squad virar prova observavel no portfolio
- mostrar cidade do HUB Local como contexto do desafio

#### Criticos de UX

- o talento precisa entender o match em 10 segundos
- o portfolio precisa mostrar habilidades + ODS + empresa + entregavel
- cada candidatura deve ter feedback, nao apenas status

---

### Dashboard Universidade (Campus)

#### Eixo central

`parceria Campus -> alunos alocados -> horas de extensao -> desafios ativos -> relatorio institucional`

#### Tabs recomendadas

- Resumo institucional do Campus
- Parceria e Status
- Talentos alocados em squads
- Desafios ativos na cidade
- Horas e Relatorios de Extensao
- HUB Local da cidade

#### Mudancas-chave

- reduzir sensacao de portal juridico-academico
- aumentar visibilidade da extensao, dos squads ativos e das empresas parceiras
- incluir aba do HUB Local com mapa das universidades da cidade
- relatorio MEC integrado como saida do sistema, nao entrada manual
- mostrar quais ODS os projetos do campus estao cobrindo

#### Criticos de UX

- o coordenador de extensao precisa extrair dados para relatorio em 1 clique
- a IES precisa ver o impacto agregado dos seus alunos, nao apenas lista de inscricoes

---

### Dashboard Prefeitura (B2G) — novo

#### Eixo central

`programa ativo -> impacto por ODS -> talentos engajados -> empresas parceiras -> relatorio de impacto`

#### Tabs recomendadas

- Resumo do Programa Municipal
- Impacto por ODS (mapa visual)
- Talentos Engajados da Cidade
- Empresas Parceiras do HUB
- Eventos Realizados
- Relatorio Anual de Impacto
- Universidades Participantes (Campi)

#### Funcionalidades-chave

- dashboard de impacto ODS com visualizacao por objetivo (ODS 4, 8, 11, 13, 17...)
- contador de talentos engajados, squads realizados, horas de extensao geradas
- lista de empresas parceiras do HUB Local da cidade
- modulo de relatorio para prestacao de contas (exportavel para PDF)
- historico de eventos por semestre

#### Criticos de UX

- o secretario precisa ver os numeros de impacto em 30 segundos
- o relatorio deve ser exportavel sem precisar de suporte
- linguagem deve ser de politica publica, nao de startup ("Programa Municipal ODS" nao "Dashboard")

---

### Dashboard HUB Local (Embaixador) — novo

#### Eixo central

`metricas da cidade -> Campi ativos -> talentos -> leads corporativos -> eventos -> status B2G`

#### Tabs recomendadas

- Resumo do HUB Local
- Campi e Lideres de Campus
- Base de Talentos
- Leads Corporativos
- Agenda de Eventos
- Status da Prefeitura
- Metricas de Conversao

#### Funcionalidades-chave

- visao consolidada de todos os Campi da cidade
- pipeline de leads corporativos gerados pelo HUB
- status da relacao com a prefeitura (informal / engajada / negociacao / ativo)
- calendario de eventos com status e CTA
- formulario de reporte semanal integrado

---

## Ordem de implementacao

### Fase 1 — Alinhamento de linguagem (imediato)

- atualizar labels, headings e descricoes em todos os dashboards existentes
- remover claims frageis e mock data sem lastro
- alinhar cada dashboard a um JTBD principal
- criar placeholder do dashboard de prefeitura

### Fase 2 — Reestruturacao de fluxo (mes 1-2)

- empresa: mover para brief-first com squad como unidade central
- talento: mover para match-first com portfolio como resultado
- universidade (Campus): mover para extensao + relatorio + desafios ativos
- criar estrutura basica do dashboard de prefeitura no Notion como MVP

### Fase 3 — IA visivel (mes 2-3)

- mostrar fit score por ODS, skills e contexto
- explicar por que houve match em linguagem natural
- mostrar composicao de squad e sinais de aderencia
- versao v1 do ODS Fit Score no fluxo de shortlist

### Fase 4 — Prova de valor e B2G (mes 3-6)

- integrar relatorio final como entregavel central (B2B)
- integrar historico de entregas e portfolio observavel (talento)
- lancar dashboard de prefeitura como produto B2G com impacto ODS
- integrar HUB Local como entidade no sistema (embaixador com acesso)

---

## Criticos gerais de produto

- nenhum dashboard deve contradizer a categoria publica
- IA precisa aparecer como funcionalidade clara, nao como narrativa
- o usuario deve entender o proximo passo em menos de 5 segundos
- a experiencia deve parecer operacional, nao conceitual
- o dashboard de prefeitura deve usar linguagem de politica publica, nao de startup
- o HUB Local deve aparecer como entidade do sistema (nao apenas como tag de cidade)

## Resultado esperado

Quando reposicionados, os dashboards devem:

- reforcar a compra por empresa (brief -> squad -> relatorio)
- melhorar o engajamento do talento (match explicado -> portfolio real)
- transformar a universidade em parte do moat (Campus dentro do HUB)
- dar a prefeitura um produto visivel e relatavel (dashboard B2G com ODS)
- dar ao Embaixador uma visao operacional completa da cidade
- reduzir a distancia entre marketing, produto e operacao
