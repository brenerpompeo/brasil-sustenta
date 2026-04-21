# Brasil Sustenta — Master Orchestration Plan v2

Data: 2026-04-16 | Status: ATIVO | Owner: Brener Pompeo

---

## 1. Mapa do Ecossistema de Ferramentas

### 1.1 Agents Disponiveis

| Camada | Ferramenta | O que faz | Quando usar |
|---|---|---|---|
| **Cowork (Claude Desktop)** | Claude Opus 4.6 | Estrategia, docs, copywriting, design system, orchestracao | Planejamento, .mds, documentos finais, orquestracao geral |
| **Antigravity Kit** (.agent/) | 20 agents + 36 skills + 11 workflows | Desenvolvimento full-stack com agents especializados | Coding sessions no IDE |
| **GSD (Get Shit Done)** (.codex/.claude/.opencode/.kilo/) | 20+ agents especializados | Phase-based development, code review, debugging, verification | Execucao de sprints, QA, deploy |
| **Vercel + Supabase** | Deploy + BaaS | Frontend deploy, Auth, DB, Storage | Infraestrutura e servicos |

### 1.2 Antigravity — Agents Principais para Brasil Sustenta

| Agent | Uso no projeto |
|---|---|
| `orchestrator` | Coordenar multi-agent sessions |
| `frontend-specialist` | React 19, Tailwind 4, shadcn/ui — dashboards e paginas |
| `backend-specialist` | tRPC, Express, routers — APIs e logica de negocio |
| `database-architect` | Drizzle ORM, schema evolution (adicionar prefeitura, HUB, embaixador) |
| `product-manager` | User stories, backlog, prioridades |
| `seo-specialist` | SEO e GEO para paginas publicas |
| `test-engineer` | Vitest, testes de integracao |

### 1.3 Antigravity — Workflows Disponiveis

| Comando | Funcao |
|---|---|
| `/brainstorm` | Ideacao socratica |
| `/create` | Criar features novas |
| `/enhance` | Melhorar codigo existente |
| `/plan` | Quebrar tarefa em steps |
| `/orchestrate` | Coordenar multi-agents |
| `/ui-ux-pro-max` | Design com 50 estilos |
| `/debug` | Debug sistematico |
| `/test` | Rodar testes |
| `/deploy` | Deploy completo |

### 1.4 GSD — Agents Criticos para o Projeto

| Agent GSD | Funcao |
|---|---|
| `gsd-planner` | Cria planos executaveis com breakdown de tasks |
| `gsd-executor` | Executa planos com commits atomicos |
| `gsd-ui-researcher` | Produz UI-SPEC.md antes de implementar frontend |
| `gsd-ui-auditor` | Auditoria visual de 6 pilares no frontend |
| `gsd-code-reviewer` | Code review estruturado com severidade |
| `gsd-verifier` | Verifica se fase atingiu objetivo |
| `gsd-roadmapper` | Cria roadmaps com breakdown de fases |

### 1.5 Cowork Skills Relevantes

| Skill | Uso no projeto |
|---|---|
| `canvas-design` | Design visual: posters, materiais de HUB, one-pagers |
| `brand-guidelines` | Aplicar guia de marca nos artefatos |
| `web-artifacts-builder` | Prototipar componentes React/shadcn |
| `skill-creator` | Criar skills customizadas para o projeto |
| `docx` / `pptx` / `pdf` / `xlsx` | Gerar documentos para B2B, B2G, investidores |
| `design:design-system` | Auditar e documentar design system |
| `design:design-critique` | Feedback estruturado nos mockups |
| `design:ux-copy` | Microcopy, CTAs, empty states, error messages |
| `marketing:content-creation` | Conteudo LinkedIn, newsletter, blog |
| `marketing:campaign-plan` | Campanhas de lancamento |
| `product-management:roadmap-update` | Atualizar roadmap com novas prioridades |
| `product-management:sprint-planning` | Planejar sprints de desenvolvimento |
| `product-management:write-spec` | PRDs e specs de features |

---

## 2. Arquitetura de Documentos Estrategicos (.mds)

### 2.1 Estrutura Definitiva v2

```
brasil-sustenta/
├── 00_MASTER_STRATEGY.md          # Tese central + regras + arquitetura territorial
├── 01_CANVAS_HIBRIDO.md           # Business Model Canvas multi-sided
├── 02_SWOT_TOWS_BRASIL_SUSTENTA.md # Analise SWOT + acoes TOWS
├── 03_BENCHMARK_ACTION_MAP.md      # Benchmark + acoes por player
├── 04_GO_TO_MARKET.md             # GTM por buyer (B2B, B2G, Univ, Talento)
├── 05_HUBS_E_EVENTOS.md           # Arquitetura territorial + playbooks + eventos
├── 06_ROADMAP_5_ANOS.md           # Roadmap ano a ano
├── 07_PRIVATE_PRODUCT_REPOSITION.md # Dashboards por persona (5 dashboards)
├── BENCHMARK_CONCORRENTES_2026-04.md # Benchmark detalhado de 8 players
├── REPOSICIONAMENTO_2026-04.md     # Message house + oferta + regras de canal
├── PITCH_DECK_CRIATIVIDADE_ESG.md  # Deck 12 slides
├── Brasil_Sustenta_CEO_COO_v2.md   # Memo executivo (editado pelo founder)
├── DESIGN_SYSTEM_V2.md            # [NOVO] Design system brutalism editorial
├── COPYWRITING_GUIDE.md           # [NOVO] Storytelling + copy por persona
├── SPRINT_PLAN_CODE.md            # [NOVO] Plano de sprints de codigo
├── MASTER_ORCHESTRATION.md        # [ESTE ARQUIVO] Orquestracao geral
└── PROJECT_CONTEXT.md             # [ATUALIZAR] Contexto para agents
```

### 2.2 Status dos .mds

| Arquivo | Status v2 | Proximo passo |
|---|---|---|
| 00_MASTER_STRATEGY | ✅ Atualizado | Revisar apos Design System v2 |
| 01_CANVAS_HIBRIDO | ✅ Atualizado | Estavel |
| 02_SWOT_TOWS | ✅ Atualizado | Estavel |
| 03_BENCHMARK_ACTION_MAP | ✅ Atualizado | Estavel |
| 04_GO_TO_MARKET | ✅ Atualizado | Revisar copy apos COPYWRITING_GUIDE |
| 05_HUBS_E_EVENTOS | ✅ Atualizado | Estavel |
| 06_ROADMAP_5_ANOS | ✅ Atualizado | Sincronizar com SPRINT_PLAN_CODE |
| 07_PRIVATE_PRODUCT_REPOSITION | ✅ Atualizado | Sincronizar com Design System v2 |
| BENCHMARK_CONCORRENTES | ✅ Atualizado | Estavel |
| REPOSICIONAMENTO | ✅ Atualizado | Sincronizar com COPYWRITING_GUIDE |
| PITCH_DECK | ✅ Atualizado | Gerar .pptx final |
| CEO_COO_v2 | ✅ Editado pelo founder | Referencia — nao alterar |
| DESIGN_SYSTEM | ❌ OBSOLETO (v1) | Substituido por DESIGN_SYSTEM_V2 — deletar |
| DESIGN_SYSTEM_V2 | ✅ Criado | Referencia visual definitiva |
| COPYWRITING_GUIDE | ✅ Criado | Copy definitivo por persona |
| SPRINT_PLAN_CODE | ✅ Criado | Inclui Sprint -1 (migracao Manus→Vercel) |
| PROJECT_CONTEXT | ✅ Atualizado | Contexto v2 para todos os agents |

---

## 3. Plano de Sprints de Codigo

### Sprint 0 — Schema Evolution (1-2 dias)

**Objetivo:** Atualizar banco de dados para suportar modelo v2

Alteracoes no `drizzle/schema.ts`:

1. Adicionar `userTypeEnum` novos: `"prefeitura"`, `"embaixador"`
2. Criar tabela `hubLocals` (id, cityName, state, status, embaixadorId, prefeituraPartnerId, createdAt)
3. Criar tabela `campuses` (id, hubLocalId, universityProfileId, liderName, liderEmail, status)
4. Criar tabela `prefeituraProfiles` (id, userId, cityName, state, secretaria, contactPerson, contactEmail, programStatus, contractType, contractValue, odsTargets)
5. Criar tabela `hubMetrics` (id, hubLocalId, period, talentosEngajados, squadsEntregues, empresasParceiras, eventosRealizados, horasExtensao)
6. Adicionar campo `hubLocalId` em `projects` (vincular projeto a HUB da cidade)
7. Adicionar campo `hubLocalId` em `events` (vincular evento ao HUB)
8. Adicionar campo `odsAlignment` em `projects` (json array de ODS [1-17])
9. Adicionar campo `odsFitScore` em `applications` (score calculado pela IA)
10. Atualizar relations

### Sprint 1 — ODS Fit Score v1 (3-5 dias)

**Objetivo:** Transformar IA em artefato compravel visivel

1. Refatorar `server/routers/ai.ts`:
   - Adicionar dimensao ODS ao scoring (ODS do projeto vs. ODS do portfolio do talento)
   - Adicionar dimensao de contexto (cidade, disponibilidade, semestre)
   - Gerar explicacao em linguagem natural ("Fit com ODS 13 porque...")
   - Retornar score decomposto: `{ skillsFit, odsFit, contextFit, totalScore, explanation }`
2. Criar componente `ODSFitScoreCard.tsx`:
   - Exibe score total + breakdown visual
   - Mostra explicacao em linguagem natural
   - Badge de ODS alinhados
3. Integrar no fluxo de shortlist da empresa

### Sprint 2 — Dashboard Empresa v2: Brief-First (5-7 dias)

**Objetivo:** Fluxo completo brief → shortlist IA → squad → relatorio

1. Refatorar `DashboardEmpresa.tsx`:
   - Tab "Meus Briefs" (criacao e listagem)
   - Tab "Shortlists e Fit IA" (com ODSFitScoreCard)
   - Tab "Squads Ativos" (formacao e acompanhamento)
   - Tab "Relatorios" (entregaveis finais)
2. Criar componente `BriefForm.tsx` (formulario de brief ESG)
3. Criar componente `ShortlistView.tsx` (lista de talentos com fit score)
4. Criar componente `SquadFormation.tsx` (selecao de membros do squad)
5. Implementar formacao de squads no backend (company.formSquad)

### Sprint 3 — Dashboard Jovem v2: Match-First (5-7 dias)

**Objetivo:** Match explicado → candidatura → portfolio observavel

1. Refatorar `DashboardJovem.tsx`:
   - Tab "Matches para voce" (com justificativa de fit)
   - Tab "Candidaturas" (status + feedback)
   - Tab "Squads Ativos"
   - Tab "Portfolio" (entregas como prova observavel)
2. Criar componente `MatchCard.tsx` (projeto + explicacao de por que combina)
3. Criar componente `PortfolioView.tsx` (projetos concluidos como portfolio)

### Sprint 4 — Dashboard Prefeitura + HUB Local (7-10 dias)

**Objetivo:** Dois dashboards novos para o modelo territorial v2

1. Criar paginas:
   - `LoginPrefeitura.tsx`
   - `DashboardPrefeitura.tsx`
   - `DashboardHubLocal.tsx`
2. Dashboard Prefeitura:
   - Resumo do Programa Municipal
   - Impacto por ODS (mapa visual com recharts)
   - Talentos engajados, empresas parceiras
   - Relatorio anual exportavel (PDF)
3. Dashboard HUB Local (Embaixador):
   - Metricas da cidade
   - Campi e Lideres
   - Pipeline de leads corporativos
   - Status da prefeitura
   - Agenda de eventos
4. Backend: routers `prefeitura.ts` e `hubLocal.ts`

### Sprint 5 — Paginas Publicas v2: Storytelling (5-7 dias)

**Objetivo:** Reposicionar todas as paginas publicas com novo copy e design

1. Refatorar `Home.tsx` — nova hero brutalist editorial, copy v2
2. Refatorar `ParaEmpresas.tsx` — foco brief → squad → relatorio
3. Refatorar `ParaJovens.tsx` — foco match explicado → portfolio
4. Criar `ParaPrefeituras.tsx` — [NOVO] pagina B2G com linguagem de politica publica
5. Refatorar `Hubs.tsx` — mapa territorial com status por cidade + campi
6. Atualizar `Header.tsx` — adicionar "Para Prefeituras" na navegacao
7. Atualizar `Footer.tsx` — CTAs por persona

### Sprint 6 — Admin CMS + Relatorios (5-7 dias)

**Objetivo:** CMS funcional e geracao de relatorios

1. CRUD Blog completo (admin/Blog.tsx)
2. CRUD Eventos completo (admin/Eventos.tsx)
3. Geracao de relatorio ESG por projeto (PDF exportavel)
4. Geracao de relatorio de impacto municipal (PDF exportavel)
5. Dashboard admin com metricas reais (nao mock data)

### Sprint 7 — QA, Performance, Deploy (3-5 dias)

**Objetivo:** Qualidade e publicacao

1. Testes vitest para routers criticos (company, ai, prefeitura, hubLocal)
2. Lighthouse audit (Core Web Vitals)
3. Acessibilidade WCAG AA
4. SEO meta tags em todas as paginas
5. Deploy em producao

---

## 4. Design System v2 — Brutalism Editorial + Brasil Neon

### 4.1 Filosofia Visual

**Nome do movimento:** "Brutalism Tropical" / "Neon Pátria"

O Brasil Sustenta evolui de "Midnight Emerald" para um brutalism editorial que usa as cores do Brasil em versao neon. A estetica e de impacto visual maximo: tipografia dramatica, blocos de cor ousados, e uma tensao visual entre a sobriedade do ESG e a energia do Brasil jovem.

### 4.2 Paleta de Cores — Brasil Neon

| Token | Hex | Uso |
|---|---|---|
| `--background` | `#050505` | Base (negro absoluto) |
| `--foreground` | `#FAFAFA` | Texto principal |
| `--primary` | `#00FF41` | Verde Brasil Neon — CTA principal, destaques |
| `--secondary` | `#FFD700` | Amarelo Brasil Neon — badges, alertas, acentos |
| `--accent` | `#0047FF` | Azul Brasil Neon — links, elementos interativos |
| `--destructive` | `#FF003C` | Vermelho — erros, alertas criticos |
| `--card` | `#0A0A0A` | Cards e superficies elevadas |
| `--border` | `rgba(255,255,255,0.08)` | Bordas sutis |
| `--muted` | `#6B7280` | Texto secundario |
| `--muted-foreground` | `#94A3B8` | Texto terciario |

### 4.3 Gradientes

```css
/* Gradiente Brasil Neon (hero sections) */
.gradient-brasil-neon {
  background: radial-gradient(
    ellipse at 20% 50%, rgba(0,255,65,0.12) 0%,
    transparent 50%
  ), radial-gradient(
    ellipse at 80% 50%, rgba(0,71,255,0.08) 0%,
    transparent 50%
  ), radial-gradient(
    ellipse at 50% 80%, rgba(255,215,0,0.06) 0%,
    transparent 50%
  );
}

/* CTA Gradient */
.gradient-cta {
  background: linear-gradient(135deg, #00FF41 0%, #00CC33 100%);
}

/* Accent Gradient (B2G sections) */
.gradient-b2g {
  background: linear-gradient(135deg, #0047FF 0%, #0033CC 100%);
}
```

### 4.4 Tipografia — Editorial Brutalist

| Nivel | Fonte | Peso | Tamanho | Tracking | Uso |
|---|---|---|---|---|---|
| H1 | **Fraunces** | Black (900) | 6-8rem | -0.04em | Titulos hero, impacto maximo |
| H2 | **Fraunces** | Bold (700) | 3.5-5rem | -0.03em | Titulos de secao |
| H3 | **Inter** | Bold (700) | 1.75-2.5rem | -0.02em | Subtitulos |
| Body | **Inter** | Regular (400) | 1.125rem (18px) | normal | Texto corrido |
| Label | **Inter** | Medium (500) | 0.75rem (12px) | 0.12em (uppercase) | Labels, badges, meta |
| Mono | **JetBrains Mono** | Regular (400) | 0.875rem | normal | Scores, dados, metricas |

### 4.5 Principios Brutalist

1. **Blocos de cor massivos** — secoes inteiras com background solido (#00FF41 com texto #050505)
2. **Tipografia como arquitetura** — H1 ocupa 60%+ da viewport, palavras-chave em destaque
3. **Grid quebrado** — layouts assimetricos, elementos que "vazam" do grid
4. **Contrastes extremos** — neon sobre negro, sem meios-termos
5. **Texto como design** — numeros grandes (8rem+), metricas como elemento visual
6. **Fotografia zero** — icons, formas geometricas, dados como visual
7. **Microinteracoes nervosas** — hovers rapidos (150ms), glow neon, pulsos sutis

### 4.6 Componentes v2

| Componente | Evolucao v1 → v2 |
|---|---|
| DSButton | Adicionar variant "neon" com glow effect + variant "b2g" em azul |
| DSCard | Adicionar variant "brutalist" com borda espessa + gradient neon |
| DSInput | Manter, refinar focus state com glow verde |
| ODSBadge | [NOVO] Badge por ODS com cor e icone |
| ScoreCard | [NOVO] ODS Fit Score visual com breakdown |
| HubMap | [NOVO] Mapa territorial interativo com status por cidade |
| MetricBlock | [NOVO] Numero grande (6rem) + label small + contexto |
| PersonaNav | [NOVO] Navegacao por persona com cor diferenciada |

### 4.7 Diferenciacao Visual por Persona

| Persona | Cor dominante | Tom visual | Linguagem |
|---|---|---|---|
| Empresa (B2B) | Verde (#00FF41) | Operacional, dados, resultado | "Brief → Squad → Relatorio" |
| Prefeitura (B2G) | Azul (#0047FF) | Institucional, impacto publico | "Programa Municipal ODS" |
| Universidade | Amarelo (#FFD700) | Academico, extensao | "Campus → Extensao → Portfolio" |
| Talento | Verde + Amarelo | Energetico, portfolio | "Match → Squad → Portfolio" |
| Admin | Neutro (#6B7280) | Operacional, dados | Dashboards com metricas |

---

## 5. Guia de Copywriting e Storytelling

### 5.1 Tom de Voz

**Regra central:** O Brasil Sustenta fala como um founder que entende de ESG, respeita o universo academico e fala a lingua das empresas — sem parecer consultoria corporativa nem ONG idealista.

| Atributo | O que significa na pratica |
|---|---|
| **Direto** | Frases curtas. Sem rodeios. "Squad pronto em 3 semanas." |
| **Concreto** | Sempre com numero ou entregavel. Nunca promessa vaga. |
| **Categorico** | Fala como quem criou a categoria. "Ninguem mais faz isso." |
| **Anti-greenwashing** | Prova > promessa. "Relatorio auditavel, nao selo decorativo." |
| **Territorial** | "Operamos em Campinas" > "Temos presenca nacional" |

### 5.2 Frase de Compra (Category Statement)

`Transformamos desafios ESG em squads universitarios com matching por IA, presenca territorial e entregas mensuraveis.`

### 5.3 Copy por Persona

#### Empresa (B2B)

- **Hero:** "Seu desafio ESG vira squad, sprint e relatorio em 6 semanas."
- **Subhero:** "Brief → Shortlist com Fit Score IA → Squad otimizado → Entrega auditavel"
- **CTA principal:** "Enviar brief ESG"
- **CTA secundario:** "Agendar discovery call"
- **Prova social:** "[X] squads entregues com [Y]% de aprovacao"

#### Prefeitura (B2G)

- **Hero:** "Coloque [cidade] no mapa das cidades ODS 2030."
- **Subhero:** "Um programa concreto de engajamento de juventude com relatorio publico de impacto."
- **CTA principal:** "Agendar reuniao institucional"
- **CTA secundario:** "Ver modelo do Programa Municipal"
- **Linguagem:** Sempre "programa", "parceria", "Agenda 2030" — nunca "startup", "plataforma", "IA"

#### Universidade (Campus)

- **Hero:** "Extensao com projetos reais. Portfolio com empresas da cidade."
- **Subhero:** "Seu campus dentro do HUB Local. Alunos em squads com evidencias para o MEC."
- **CTA principal:** "Ativar Campus"
- **CTA secundario:** "Falar com coordenacao"

#### Talento (Jovem)

- **Hero:** "Projetos reais. Portfolio que empresas veem. Match que faz sentido."
- **Subhero:** "Voce sabe exatamente por que foi selecionado para cada desafio."
- **CTA principal:** "Ver matches"
- **CTA secundario:** "Criar perfil"

### 5.4 Regras de Copy

1. Nunca mais de 12 palavras por headline
2. Sempre 1 numero concreto por secao de produto
3. Substituir "plataforma" por "operacao" em contextos B2G
4. Substituir "IA" por "fit score explicavel" quando falar com prefeitura
5. Substituir "oportunidades" por "matches para voce" quando falar com talento
6. Cada pagina tem 1 CTA principal e 1 secundario — nunca mais
7. Anti-greenwashing como postura, nao como feature: "relatorio auditavel" > "transparencia ESG"

---

## 6. Estrutura do Second Brain (Vault) — Multi-Projeto

### 6.1 Arquitetura Multi-Projeto

O Vault, Antigravity e Cowork orquestram TODOS os projetos do Brener, nao apenas Brasil Sustenta. A estrutura suporta projetos atuais e futuros com camada compartilhada.

```
Vault:second_brain/
├── 00 System/
│   ├── Deep Memory: Brasil Sustenta Context.md
│   ├── Deep Memory: Pacto Global Context.md
│   ├── Deep Memory: [Projeto Futuro] Context.md
│   ├── .antigravity/                  # COMPARTILHADO entre projetos
│   │   ├── agents/                    # 20 agents reutilizaveis
│   │   ├── skills/                    # 36 skills
│   │   ├── gsd/                       # Get Shit Done framework
│   │   ├── hooks/                     # Hooks de automacao
│   │   ├── prompts/                   # Prompts reutilizaveis
│   │   ├── codex/                     # Codex agents + GSD
│   │   ├── claude/                    # Claude Code agents + GSD
│   │   └── opencode/                  # OpenCode agents + GSD
│   └── Templates/                     # Templates compartilhados
│       ├── PROJECT_CONTEXT_TEMPLATE.md
│       ├── SPRINT_PLAN_TEMPLATE.md
│       └── DESIGN_SYSTEM_TEMPLATE.md
│
├── 10 Areas/
│   ├── Pacto Global da ONU/           # Area permanente (trabalho diario)
│   │   ├── context.md
│   │   └── [docs operacionais]
│   └── Carreira & Networking/
│
├── 20 Action/
│   └── 21 Projects/
│       ├── brasil-sustenta/           # ← PROJETO ATIVO
│       │   ├── [16 .mds estrategicos]
│       │   ├── [codigo fonte]
│       │   ├── .agent/                # Antigravity (symlinks → 00 System/.antigravity/)
│       │   ├── .claude/               # Claude Code (symlinks → 00 System/.antigravity/claude/)
│       │   ├── .codex/                # Codex (symlinks → 00 System/.antigravity/codex/)
│       │   ├── .opencode/             # OpenCode (symlinks)
│       │   ├── .kilo/                 # Kilo config
│       │   ├── .cursor/               # Cursor config
│       │   └── .vscode/               # VS Code + MCP config
│       │
│       └── [projetos-futuros]/        # Mesma estrutura de .agent/ com symlinks
│
└── 30 Resources/
    ├── ESG & ODS/                     # Referencia compartilhada
    ├── Design Assets/                 # Assets reutilizaveis
    └── Research/                      # Pesquisa e benchmarks
```

### 6.2 Principio de Symlinks

Todos os projetos usam symlinks para o Antigravity Kit compartilhado em `00 System/.antigravity/`. Isso garante que agents, skills e hooks sao consistentes entre projetos e atualizacoes propagam automaticamente.

```
brasil-sustenta/.agent/agents → ../../../../00 System/.antigravity/agents
brasil-sustenta/.agent/skills → ../../../../00 System/.antigravity/skills
brasil-sustenta/.codex/agents → ../../../../00 System/.antigravity/codex/agents
```

O que e UNICO por projeto:
- `PROJECT_CONTEXT.md` — contexto especifico do projeto
- `ARCHITECTURE.md` — arquitetura tecnica do projeto
- `settings.json` — hooks e configs especificas
- `gsd-file-manifest.json` — manifesto de arquivos do projeto

### 6.3 Projetos Ativos

| Projeto | Pasta | Status | Contexto |
|---|---|---|---|
| Brasil Sustenta | `21 Projects/brasil-sustenta/` | Ativo — pre-revenue | Plataforma AI-first ESG squads |
| Pacto Global da ONU | `10 Areas/Pacto Global da ONU/` | Ativo — trabalho diario | Brener como colaborador |
| [Futuros] | `21 Projects/[nome]/` | — | Mesma estrutura base |

### 6.2 Mapa de Delegacao de Tarefas

| Tarefa | Ferramenta ideal | Por que |
|---|---|---|
| Estrategia, .mds, orquestracao | **Cowork (Claude Opus)** | Contexto amplo, multi-documento, raciocinio estrategico |
| Copywriting e storytelling | **Cowork (Claude Opus)** | Criatividade + consistencia de tom |
| Design System (documento) | **Cowork (Claude Opus)** | Definicao de principios, tokens, componentes |
| Implementacao de features | **IDE + Antigravity** | `frontend-specialist` + `backend-specialist` |
| Schema evolution (banco) | **IDE + GSD** | `database-architect` + migracao Drizzle |
| Code review | **IDE + GSD** | `gsd-code-reviewer` + `gsd-code-fixer` |
| UI implementation | **IDE + Antigravity** | `/ui-ux-pro-max` + `frontend-specialist` |
| Testes | **IDE + GSD** | `test-engineer` + `gsd-verifier` |
| Deploy | **Vercel + Supabase** | Vercel CLI + Supabase dashboard |
| One-pagers, decks, docs | **Cowork** | Skills `pptx`, `docx`, `pdf` |
| Posts LinkedIn, newsletter | **Cowork** | Skill `marketing:content-creation` |
| Prototipacao React | **Cowork** | Skill `web-artifacts-builder` |

### 6.3 Fluxo de Trabalho Ideal

```
1. ESTRATEGIA (Cowork)
   └── Definir o que fazer nos .mds → atualizar MASTER_ORCHESTRATION

2. SPEC (Cowork ou IDE)
   └── Criar PRD/spec da feature → product-management:write-spec

3. PLAN (IDE + GSD)
   └── /gsd-plan-phase → RESEARCH.md → PLAN.md → verificacao

4. EXECUTE (IDE + Antigravity/GSD)
   └── /create ou gsd-executor → commits atomicos → verificacao

5. REVIEW (IDE + GSD)
   └── gsd-code-reviewer → gsd-ui-auditor → fixes

6. VERIFY (IDE + GSD)
   └── gsd-verifier → testes → Lighthouse → deploy

7. DOCUMENT (Cowork)
   └── Atualizar .mds → gerar relatorios → atualizar Vault
```

---

## 7. Atualizar PROJECT_CONTEXT.md

O arquivo `.agent/PROJECT_CONTEXT.md` precisa ser reescrito para refletir:

- Nova categoria: "plataforma AI-first de squads ESG universitarios com presenca territorial"
- 5 tipos de usuario: empresa, jovem, universidade/campus, prefeitura, embaixador
- 4 produtos: Pilot Project, Managed Squad, University Partner, Programa Municipal ODS
- Arquitetura territorial: Campus → HUB Local → HUB Matriz → Rede Nacional
- Stack atualizada com novas tabelas (hubLocals, campuses, prefeituraProfiles, hubMetrics)
- Referencia cruzada com todos os .mds estrategicos

---

## 8. Prioridades de Execucao (Proximos 30 dias)

### Semana 1: Fundacao

| # | Tarefa | Ferramenta | Entregavel |
|---|---|---|---|
| 1 | Criar DESIGN_SYSTEM_V2.md completo | Cowork | Arquivo .md |
| 2 | Criar COPYWRITING_GUIDE.md completo | Cowork | Arquivo .md |
| 3 | Atualizar PROJECT_CONTEXT.md | Cowork | Arquivo .md |
| 4 | Sprint 0: Schema evolution | IDE + GSD | Migracao Drizzle |

### Semana 2: Core Product

| # | Tarefa | Ferramenta | Entregavel |
|---|---|---|---|
| 5 | Sprint 1: ODS Fit Score v1 | IDE + Antigravity | ai.ts refatorado + ODSFitScoreCard |
| 6 | Sprint 2: Dashboard Empresa v2 | IDE + Antigravity | DashboardEmpresa.tsx refatorado |

### Semana 3: Territorial

| # | Tarefa | Ferramenta | Entregavel |
|---|---|---|---|
| 7 | Sprint 3: Dashboard Jovem v2 | IDE + Antigravity | DashboardJovem.tsx refatorado |
| 8 | Sprint 4: Dashboard Prefeitura + HUB Local | IDE + Antigravity | 2 dashboards novos + backend |

### Semana 4: Storytelling + QA

| # | Tarefa | Ferramenta | Entregavel |
|---|---|---|---|
| 9 | Sprint 5: Paginas publicas v2 | IDE + Antigravity | 6 paginas refatoradas |
| 10 | Sprint 6: CMS + Relatorios | IDE + Antigravity | Admin CMS + PDF export |
| 11 | Sprint 7: QA + Deploy | IDE + GSD | Testes + Lighthouse + deploy |

---

## 9. Checklist de Coerencia

Antes de cada deploy, verificar:

- [ ] Todos os .mds refletem a mesma categoria
- [ ] Frase de compra e consistente entre site, deck e docs
- [ ] Design System v2 esta aplicado em todas as paginas
- [ ] Copy segue o COPYWRITING_GUIDE por persona
- [ ] Dashboard de cada persona reflete o JTBD definido no 07_PRIVATE_PRODUCT_REPOSITION
- [ ] ODS Fit Score esta visivel no fluxo de shortlist
- [ ] Pagina de HUBs mostra mapa territorial com status real
- [ ] Nenhum claim sem lastro nas paginas publicas
- [ ] Relatorio exportavel funciona para B2B e B2G

---

## 10. Regras de Ouro

1. **Nunca implementar feature sem spec escrita** — mesmo que seja um paragrafo no .md
2. **Nunca alterar o CEO_COO_v2.md** — e o documento do founder
3. **Sempre atualizar o MASTER_ORCHESTRATION apos cada sprint** — e o single source of truth
4. **Cowork para pensar, IDE para executar** — nao misturar
5. **B2B primeiro no codigo tambem** — Dashboard Empresa antes de Dashboard Prefeitura
6. **Design System v2 antes de refatorar paginas** — foundation first
7. **Cada .md tem 1 dono e 1 proposito** — se precisa de 2, separa em 2
