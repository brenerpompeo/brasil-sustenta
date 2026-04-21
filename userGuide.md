# Brasil Sustenta — Guia do Produto v2

## Objetivo

Resumo operacional para modelos, designers e engenheiros entenderem o estado atual sem ler todos os .mds.

---

## 1. O que e o Brasil Sustenta

Plataforma AI-first que transforma desafios ESG em squads universitarios com matching por IA, presenca territorial e entregas mensuraveis.

Fluxo: Brief → Shortlist com ODS Fit Score → Squad → Sprint → Relatorio auditavel

Nao tratar como: job board, consultoria ESG, portal institucional, comunidade estudantil.

---

## 2. Direcao visual vigente

- **Tema**: dark (unico)
- **Filosofia**: Brutalism Tropical / Neon Patria
- **Background**: #050505 (negro absoluto)
- **Cores**: #00FF41 (verde neon), #FFD700 (amarelo neon), #0047FF (azul neon)
- **Fontes**: Fraunces (display), Inter (body), JetBrains Mono (scores/metricas)
- **Principio**: Mobile-first, anti-AI estetico, zero fotografia

Arquivo canonico: `DESIGN_SYSTEM_V2.md`

---

## 3. Stack tecnica

- Frontend: React 19 + Vite + Tailwind 4 + shadcn/ui + Framer Motion
- Backend: Express + tRPC v11 + Drizzle ORM
- Auth: Supabase Auth (migrando de OAuth legado — Sprint -1)
- DB: PostgreSQL (Supabase)
- Deploy: Vercel (frontend) + Supabase (backend/db)

---

## 4. Sitemap ativo

### Publicas
- `/` (Home)
- `/para-empresas`
- `/para-jovens`
- `/para-universidades`
- `/para-prefeituras` [NOVO — Sprint 5]
- `/hubs`
- `/conteudo/blog`, `/conteudo/eventos`, `/conteudo/artigos`

### Auth
- `/login`, `/login/empresa`, `/login/jovem`, `/login/universidade`
- `/login/prefeitura` [NOVO — Sprint 4]

### Dashboards
- `/dashboard/empresa`
- `/dashboard/jovem`
- `/dashboard/universidade`
- `/dashboard/prefeitura` [NOVO — Sprint 4]
- `/dashboard/hub-local` [NOVO — Sprint 4]
- `/admin/*`

---

## 5. 5 Tipos de usuario

| Tipo | userType | Dashboard |
|---|---|---|
| Empresa | empresa | DashboardEmpresa |
| Jovem | jovem | DashboardJovem |
| Universidade | universidade | DashboardUniversidade |
| Prefeitura | prefeitura | DashboardPrefeitura [Sprint 4] |
| Embaixador | embaixador | DashboardHubLocal [Sprint 4] |

---

## 6. Sprints de codigo

Ver `SPRINT_PLAN_CODE.md` para detalhes completos.

- Sprint -1: Migracao Auth/Deploy → Vercel/Supabase
- Sprint 0: Schema Evolution (4 tabelas novas)
- Sprint 1: ODS Fit Score v1
- Sprint 2: Dashboard Empresa v2
- Sprint 3: Dashboard Jovem v2
- Sprint 4: Dashboard Prefeitura + HUB Local
- Sprint 5: Paginas Publicas v2
- Sprint 6: CMS + Relatorios
- Sprint 7: QA + Deploy

---

## 7. Fontes de verdade

| Area | Arquivo |
|---|---|
| Design | DESIGN_SYSTEM_V2.md |
| Copy | COPYWRITING_GUIDE.md |
| Super Menu + Auth | SUPER_MENU_AUTH_WALKTHROUGH.md |
| Sprints | SPRINT_PLAN_CODE.md |
| Orquestracao | MASTER_ORCHESTRATION.md |
| Contexto agents | .agent/PROJECT_CONTEXT.md |
| Estrategia | 00_MASTER_STRATEGY.md |
| Dashboards | 07_PRIVATE_PRODUCT_REPOSITION.md |
| Memo founder | Brasil_Sustenta_CEO_COO_v2.md (NAO ALTERAR) |

---

## 8. Regras para outros modelos

1. Ler `DESIGN_SYSTEM_V2.md` antes de propor interfaces
2. Ler `COPYWRITING_GUIDE.md` antes de escrever qualquer copy
3. Ler `SUPER_MENU_AUTH_WALKTHROUGH.md` se a tarefa tocar em header, navegacao ou acessos por persona
4. Ler `.agent/PROJECT_CONTEXT.md` para contexto rapido
5. Mobile-first: sempre comecar pelo breakpoint menor
6. Anti-AI: recusar qualquer visual que pareca template ou gerado por IA
7. Nunca alterar `Brasil_Sustenta_CEO_COO_v2.md`
8. Atualizar este guia sempre que sitemap, header ou home mudarem
