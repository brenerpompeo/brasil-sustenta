# PROJECT CONTEXT — Brasil Sustenta v2

## Identidade

- **Nome**: Brasil Sustenta
- **Categoria**: Plataforma AI-first de squads ESG universitarios com presenca territorial
- **Status**: #projeto/ativo
- **Frase de compra**: "Transformamos desafios ESG em squads universitarios com matching por IA, presenca territorial e entregas mensuraveis."
- **Stage**: Pre-revenue / validacao de modelo

## Repositorio

- **URL**: https://github.com/brasil-sustenta/plataforma
- **Owner**: `brasil-sustenta`
- **Committer**: `brenerpompeo` (brenerpompeo@brasil-sustenta.org)
- **Branch principal**: `main`
- **Branch de develop**: `develop`

## Path Canonico na Vault

- **Raiz**: `20 Action/21 Projects/brasil-sustenta/`
- **Deep Memory**: `00 System/Deep Memory: Brasil Sustenta Context.md`

## O que o Brasil Sustenta faz

1. Recebe desafio ESG da empresa (brief)
2. Gera shortlist com ODS Fit Score explicavel (IA + curadoria humana)
3. Forma squad universitario otimizado por skills, ODS e contexto territorial
4. Executa projeto em sprint com checkpoints
5. Entrega relatorio auditavel com trilha de evidencia

Tudo organizado em HUBs Locais territoriais por cidade.

## Arquitetura Territorial

```
Brasil Sustenta (Rede Nacional)
    └── HUB Matriz Sao Paulo (Estado)
            └── HUB Local Campinas (Cidade)
                    ├── Campus Unicamp
                    ├── Campus PUC-Campinas
                    ├── Campus Unip
                    └── Campus Esamc
                    + Prefeitura de Campinas (parceira B2G)
                    + Empresas locais (clientes B2B)
```

## 5 Tipos de Usuario

| Tipo | userType | Dashboard | JTBD principal |
|---|---|---|---|
| Empresa | `empresa` | DashboardEmpresa | Brief → shortlist IA → squad → relatorio |
| Jovem Talento | `jovem` | DashboardJovem | Match explicado → candidatura → portfolio |
| Universidade (Campus) | `universidade` | DashboardUniversidade | Extensao → alunos em squads → relatorio MEC |
| Prefeitura | `prefeitura` | DashboardPrefeitura | Programa ODS → impacto → relatorio publico |
| Embaixador do HUB | `embaixador` | DashboardHubLocal | Coordenar cidade → metricas → leads → eventos |

## 5 Produtos

| Produto | Buyer | Ticket | Modelo |
|---|---|---|---|
| Pilot Project | Empresa (B2B) | R$15k-25k | Fee |
| Managed Squad | Empresa (B2B) | R$35k-60k | Fee |
| University Partner | Universidade (B2B Inst.) | R$5k-12k/sem | Fee |
| Programa Municipal ODS Jovem | Prefeitura (B2G) | R$80k-200k/ano | Contrato |
| BS Ventures | Brasil Sustenta (Proprio) | Equity-based | Co-fundacao |

## Stack Tecnica

- **Frontend**: React 19, TypeScript 5.x, Tailwind CSS 4, shadcn/ui, Framer Motion
- **Backend**: Express, tRPC v11, Drizzle ORM
- **Banco**: PostgreSQL (Supabase)
- **Auth**: Supabase Auth (Sprint -1: migrar de Manus OAuth)
- **Storage**: Supabase Storage (Sprint -1: migrar de S3)
- **IA**: OpenAI API ou Claude API (matching + fit score)
- **Deploy**: Vercel (frontend) + Supabase (backend/db)
- **Validacao**: Zod

## Estrutura de Pastas

```
brasil-sustenta/
├── client/src/
│   ├── components/     # UI components (shadcn + DS customizado)
│   ├── pages/          # Paginas publicas e privadas
│   ├── lib/            # Utils, trpc, hubs data
│   └── contexts/       # ThemeContext
├── server/
│   ├── _core/          # Auth, OAuth, tRPC config, LLM, S3
│   └── routers/        # Routers por dominio (17 routers)
├── drizzle/
│   └── schema.ts       # Schema completo (18 tabelas + enums)
├── shared/
│   ├── types.ts        # Type exports
│   └── const.ts        # Constantes
└── [.mds estrategicos] # 16 documentos de estrategia e orquestracao
```

## Routers Ativos (17)

auth, profile, upload, contact, student, company, talent, university, blog, project, dashboard, ai, event, article, report, material, user

## Tabelas do Banco (18 + 4 novas planejadas)

**Existentes:** users, companyProfiles, talentProfiles, universityProfiles, projects, applications, squads, squadMembers, evaluations, blogPosts, events, contactRequests, studentQuestions, universityInvitations, universityPartnershipRequests, articles, reports, supportMaterials, notifications

**Planejadas (Sprint 0):** hubLocals, campuses, prefeituraProfiles, hubMetrics

## Design System v2

- **Filosofia**: "Brutalism Tropical" / "Neon Patria"
- **Background**: #050505
- **Primary**: #00FF41 (Verde Brasil Neon)
- **Secondary**: #FFD700 (Amarelo Brasil Neon)
- **Accent**: #0047FF (Azul Brasil Neon)
- **Display font**: Fraunces (serif, Black/Bold)
- **Body font**: Inter (sans, Regular/Medium)
- **Mono font**: JetBrains Mono

## Documentos Estrategicos

| Arquivo | Conteudo |
|---|---|
| 00_MASTER_STRATEGY.md | Tese central + regras + arquitetura territorial |
| 01_CANVAS_HIBRIDO.md | Business Model Canvas multi-sided |
| 02_SWOT_TOWS.md | SWOT + acoes TOWS |
| 03_BENCHMARK_ACTION_MAP.md | Benchmark + acoes por player |
| 04_GO_TO_MARKET.md | GTM por buyer |
| 05_HUBS_E_EVENTOS.md | Arquitetura territorial + playbooks |
| 06_ROADMAP_5_ANOS.md | Roadmap ano a ano |
| 07_PRIVATE_PRODUCT_REPOSITION.md | Dashboards por persona |
| BENCHMARK_CONCORRENTES.md | Benchmark detalhado de 8 players |
| REPOSICIONAMENTO.md | Message house + oferta + canais |
| PITCH_DECK.md | Deck 12 slides |
| Brasil_Sustenta_CEO_COO_v2.md | Memo executivo (NAO ALTERAR) |
| DESIGN_SYSTEM_V2.md | Design system brutalist editorial |
| COPYWRITING_GUIDE.md | Storytelling + copy por persona |
| SPRINT_PLAN_CODE.md | Sprints de codigo |
| MASTER_ORCHESTRATION.md | Orquestracao geral |

## White Spaces Exclusivos (nenhum concorrente tem)

1. ESG-native early talent platform
2. University-to-company squads with measurable impact
3. AI-first matching por ODS
4. Budget bridge entre RH, ESG e inovacao
5. Anti-greenwashing as product wedge
6. HUB territorial por cidade com multiplos Campi
7. Prefeitura como cliente B2G

## Migracao Manus → Vercel/Supabase (Sprint -1)

Arquivos que precisam de migracao (ver SPRINT_PLAN_CODE.md para detalhes):
- `vite.config.ts` — remover vite-plugin-manus-runtime
- `server/_core/sdk.ts` — substituir Manus OAuth por Supabase Auth
- `server/_core/oauth.ts` — reescrever callback
- `server/_core/llm.ts` — remover forge.manus.im
- `server/storage.ts` — migrar S3 → Supabase Storage
- `client/src/components/ManusDialog.tsx` — deletar
- `client/src/_core/hooks/useAuth.ts` — reescrever para Supabase
- `package.json` — remover vite-plugin-manus-runtime, adicionar @supabase/supabase-js

## Diretivas de Design e Desenvolvimento

- **Mobile-first**: Toda interface projetada para mobile primeiro. Desktop e extensao.
- **IA-first**: ODS Fit Score e o produto visivel. IA nunca e promessa, e artefato compravel.
- **Anti-AI estetico**: Recusar qualquer visual que "pareca feito por IA" — zero gradientes aurora, zero icones 3D glossy, zero sparkles. Autenticidade editorial brutalist.
- **Zero fotografia**: Sem fotos stock. Visual 100% tipografico e geometrico.
- **Touch targets**: Minimo 44x44px em todos os elementos clicaveis.

## Regras Criticas

1. NUNCA commitar `.env` ou variaveis sensiveis
2. NUNCA alterar `Brasil_Sustenta_CEO_COO_v2.md` — documento do founder
3. B2B primeiro, B2G como amplificador — nunca inverter
4. Design System v2 antes de refatorar paginas
5. Cada feature precisa de spec antes de implementacao
6. Linguagem de politica publica para B2G, nunca "startup" ou "IA"
7. IA como artefato compravel (ODS Fit Score), nao como promessa
8. Territorio (cidade + HUBs + prefeitura) como moat, nao como complexidade
9. Mobile-first: breakpoint menor primeiro, sempre
10. Anti-IA estetico: recusar design que pareca template ou gerado por IA
11. Zero referencia a Manus em qualquer arquivo — deploy via Vercel
