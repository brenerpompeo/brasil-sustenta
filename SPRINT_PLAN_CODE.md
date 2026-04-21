# Brasil Sustenta — Sprint Plan: Codigo v2

Status: ATIVO | Inicio: Abril 2026 | Duracao estimada: 5-7 semanas

---

## Dependencias entre sprints

```
Sprint -1 (Manus→Vercel/Supabase) ── Sprint 0 (Schema) ──┬── Sprint 1 (ODS Fit Score)
                                                           │         └── Sprint 2 (Dashboard Empresa v2)
                                                           │                   └── Sprint 3 (Dashboard Jovem v2)
                                                           └── Sprint 4 (Dashboard Prefeitura + HUB Local)
                                                                         └── Sprint 5 (Paginas Publicas v2)
                                                                                   └── Sprint 6 (CMS + Relatorios)
                                                                                             └── Sprint 7 (QA + Deploy)
```

---

## Sprint -1 — Migracao Manus → Vercel/Supabase

**Duracao:** 1 dia
**Objetivo:** Remover toda dependencia de Manus. Auth via Supabase Auth, deploy via Vercel.
**Agent:** `backend-specialist` ou GSD `gsd-executor`

### Tasks

1. **vite.config.ts** — Remover `vite-plugin-manus-runtime`:
   - Remover import `import manusRuntime from 'vite-plugin-manus-runtime'`
   - Remover `manusRuntime()` do array de plugins
   - Remover `allowedHosts` com dominios Manus
   - Manter config padrao Vite para Vercel

2. **server/_core/sdk.ts** — Substituir Manus OAuth SDK:
   - Remover endpoints `ExchangeToken` e `GetUserInfo` de `forge.manus.im`
   - Implementar Supabase Auth client:
     ```typescript
     import { createClient } from '@supabase/supabase-js'
     export const supabase = createClient(
       process.env.SUPABASE_URL!,
       process.env.SUPABASE_ANON_KEY!
     )
     ```

3. **server/_core/oauth.ts** — Reescrever callback:
   - Remover fluxo OAuth Manus (ExchangeToken → GetUserInfo → createOrUpdateUser)
   - Implementar session validation via `supabase.auth.getUser(token)`
   - Middleware de auth: `requireAuth` que valida JWT do Supabase

4. **server/_core/llm.ts** — Atualizar endpoint LLM:
   - Remover referencia a `forge.manus.im`
   - Usar OpenAI API diretamente ou Claude API via `@anthropic-ai/sdk`

5. **server/storage.ts** — Migrar de S3 para Supabase Storage:
   - Substituir helpers S3 por `supabase.storage.from('bucket')`
   - Manter interface de upload/download compativel

6. **client/src/components/ManusDialog.tsx** — Deletar:
   - Remover componente inteiro
   - Atualizar imports em arquivos que referenciam ManusDialog

7. **client/src/_core/hooks/useAuth.ts** — Reescrever:
   - Remover `manus-runtime-user-info`
   - Implementar hook com `supabase.auth.onAuthStateChange`
   - Manter interface: `{ user, isLoading, login, logout }`

8. **package.json** — Limpar dependencias:
   - Remover `vite-plugin-manus-runtime`
   - Adicionar `@supabase/supabase-js`
   - Adicionar `@supabase/ssr` (para SSR-safe auth)

9. **.env.example** — Criar/atualizar:
   ```
   SUPABASE_URL=
   SUPABASE_ANON_KEY=
   SUPABASE_SERVICE_ROLE_KEY=
   OPENAI_API_KEY=
   ```

10. **vercel.json** — Criar config de deploy:
    ```json
    {
      "buildCommand": "npm run build",
      "outputDirectory": "dist",
      "framework": "vite"
    }
    ```

### Criterio de aceite
- [ ] Zero imports ou referencias a "manus" no codebase (grep retorna vazio)
- [ ] Auth funciona com Supabase (login/logout/session)
- [ ] Upload funciona com Supabase Storage
- [ ] `npm run build` passa sem erro
- [ ] `npm run dev` roda sem dependencia de servicos Manus

---

## Sprint 0 — Schema Evolution

**Duracao:** 1-2 dias
**Objetivo:** Banco de dados suporta modelo v2
**Agent:** `database-architect` ou GSD `gsd-planner`

### Tasks

1. Adicionar valores ao `userTypeEnum`: `"prefeitura"`, `"embaixador"`

2. Criar tabela `hubLocals`:
```typescript
hubLocals = pgTable("hub_locals", {
  id: serial("id").primaryKey(),
  cityName: varchar("city_name", { length: 100 }).notNull(),
  state: varchar("state", { length: 2 }).notNull(),
  status: pgEnum("hub_status", ["piloto", "consolidado", "flagship"]),
  embaixadorUserId: integer("embaixador_user_id"),
  prefeituraPartnerId: integer("prefeitura_partner_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
```

3. Criar tabela `campuses`:
```typescript
campuses = pgTable("campuses", {
  id: serial("id").primaryKey(),
  hubLocalId: integer("hub_local_id").notNull(),
  universityProfileId: integer("university_profile_id").notNull(),
  liderName: varchar("lider_name", { length: 255 }),
  liderEmail: varchar("lider_email", { length: 320 }),
  status: pgEnum("campus_status", ["ativo", "inativo", "onboarding"]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
```

4. Criar tabela `prefeituraProfiles`:
```typescript
prefeituraProfiles = pgTable("prefeitura_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().unique(),
  cityName: varchar("city_name", { length: 100 }).notNull(),
  state: varchar("state", { length: 2 }).notNull(),
  secretaria: varchar("secretaria", { length: 255 }),
  contactPerson: varchar("contact_person", { length: 255 }),
  contactEmail: varchar("contact_email", { length: 320 }),
  contactPhone: varchar("contact_phone", { length: 20 }),
  programStatus: pgEnum("program_status", ["informal", "engajada", "negociacao", "ativo"]),
  contractType: varchar("contract_type", { length: 100 }),
  contractValue: integer("contract_value"),
  odsTargets: json("ods_targets").$type<number[]>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
```

5. Criar tabela `hubMetrics`:
```typescript
hubMetrics = pgTable("hub_metrics", {
  id: serial("id").primaryKey(),
  hubLocalId: integer("hub_local_id").notNull(),
  period: varchar("period", { length: 20 }).notNull(),
  talentosEngajados: integer("talentos_engajados").default(0),
  squadsEntregues: integer("squads_entregues").default(0),
  empresasParceiras: integer("empresas_parceiras").default(0),
  eventosRealizados: integer("eventos_realizados").default(0),
  horasExtensao: integer("horas_extensao").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
```

6. Adicionar campos em tabelas existentes:
- `projects.hubLocalId` (integer, nullable)
- `projects.odsAlignment` (json array number[])
- `events.hubLocalId` (integer, nullable)
- `applications.odsFitScore` (integer, nullable)
- `applications.odsFitExplanation` (text, nullable)

7. Atualizar relations

8. Gerar e executar migracao: `npm run db:push`

### Criterio de aceite
- [ ] Migracao roda sem erro
- [ ] Tipos exportados em shared/types.ts
- [ ] Relations funcionam em queries

---

## Sprint 1 — ODS Fit Score v1

**Duracao:** 3-5 dias
**Objetivo:** IA como artefato compravel visivel
**Agent:** `backend-specialist` + `frontend-specialist`

### Tasks Backend

1. Refatorar `server/routers/ai.ts`:
   - Dimensao ODS: comparar `project.odsAlignment` com ODS do portfolio do talento
   - Dimensao Context: cidade do talento vs. cidade do HUB do projeto, semestre, disponibilidade
   - Score decomposto: `{ skillsFit: number, odsFit: number, contextFit: number, totalScore: number }`
   - Explicacao em linguagem natural via template:
     - "Marina tem fit alto com ODS 13 por causa de 3 projetos de extensao em monitoramento ambiental."
   - Salvar score em `applications.odsFitScore` e `applications.odsFitExplanation`

2. Endpoint `ai.calculateFitScore`:
   - Input: `{ projectId, talentId }`
   - Output: `{ skillsFit, odsFit, contextFit, totalScore, explanation, odsBadges }`

3. Endpoint `ai.getShortlist`:
   - Input: `{ projectId, limit }`
   - Output: ranked list com fit score decomposto

### Tasks Frontend

4. Criar `components/ODSFitScoreCard.tsx`:
   - Score total em JetBrains Mono (3rem, verde neon)
   - 3 barras de progresso (skills, ODS, context) com cores do DS v2
   - Explicacao em texto natural (Body SM)
   - Row de ODSBadges alinhados

5. Criar `components/ODSBadge.tsx`:
   - Badge circular com numero do ODS (1-17)
   - Cada ODS tem sua cor oficial da ONU
   - Tamanhos: sm (24px), md (32px), lg (48px)

### Criterio de aceite
- [ ] Score calculado com 3 dimensoes
- [ ] Explicacao gerada em PT-BR natural
- [ ] Card renderiza com dados reais
- [ ] Funciona sem OpenAI (fallback para template)

---

## Sprint 2 — Dashboard Empresa v2: Brief-First

**Duracao:** 5-7 dias
**Objetivo:** Fluxo brief → shortlist IA → squad → relatorio
**Agent:** `frontend-specialist` + `backend-specialist`

### Tasks

1. Refatorar `pages/DashboardEmpresa.tsx`:
   - Tab "Resumo" (metricas-chave: briefs ativos, squads, projetos concluidos)
   - Tab "Meus Briefs" (criar + listar briefs ESG)
   - Tab "Shortlists & Fit IA" (shortlist por brief com ODSFitScoreCard)
   - Tab "Squads Ativos" (status de squads em andamento)
   - Tab "Relatorios" (relatorios finais entregues)

2. Criar `components/BriefForm.tsx`:
   - Campos: titulo, descricao do desafio, ODS alinhados (multi-select), skills necessarios, duracao, tamanho do squad, budget, cidade do HUB
   - Validacao Zod

3. Criar `components/ShortlistView.tsx`:
   - Lista de talentos rankeados por ODSFitScore
   - Cada item com ODSFitScoreCard compacto
   - Acao: "Selecionar para squad"

4. Criar `components/SquadFormation.tsx`:
   - Talentos selecionados em painel lateral
   - Composicao do squad com roles
   - Acao: "Confirmar squad" → cria squad no banco

5. Backend:
   - `company.createBrief` (brief com ODS e skills)
   - `company.getShortlist` (chama ai.getShortlist)
   - `company.formSquad` (cria squad a partir da selecao)
   - `company.getReports` (lista relatorios do projeto)

### Criterio de aceite
- [ ] Fluxo completo brief → shortlist → squad funciona
- [ ] Fit Score visivel em cada talento da shortlist
- [ ] Squad formado com membros corretos
- [ ] Tabs navegam sem reload

---

## Sprint 3 — Dashboard Jovem v2: Match-First

**Duracao:** 5-7 dias
**Objetivo:** Match explicado → candidatura → portfolio

### Tasks

1. Refatorar `pages/DashboardJovem.tsx`:
   - Tab "Matches para voce" (projetos com fit score explicado)
   - Tab "Candidaturas" (status + feedback)
   - Tab "Squads Ativos"
   - Tab "Portfolio" (projetos concluidos como portfolio publico)

2. Criar `components/MatchCard.tsx`:
   - Projeto + empresa + ODS badges
   - Fit Score com explicacao resumida
   - Acao: "Tenho interesse"

3. Criar `components/PortfolioView.tsx`:
   - Grid de projetos concluidos
   - Cada card com: titulo, empresa, ODS, skills usadas, avaliacao
   - Link publico para portfolio (/perfil/[username])

4. Backend:
   - `talent.getMatches` (projetos abertos rankeados por fit)
   - `talent.getPortfolio` (projetos concluidos com avaliacoes)

### Criterio de aceite
- [ ] Matches aparecem com fit score explicado
- [ ] Portfolio mostra projetos reais concluidos
- [ ] Candidatura registrada com feedback

---

## Sprint 4 — Dashboard Prefeitura + HUB Local

**Duracao:** 7-10 dias
**Objetivo:** 2 dashboards novos para modelo territorial v2

### Tasks

1. Criar `pages/LoginPrefeitura.tsx` e `pages/LoginHubEmbaixador.tsx`

2. Criar `pages/DashboardPrefeitura.tsx`:
   - Tab "Resumo do Programa" (MetricBlocks: talentos, squads, empresas, ODS)
   - Tab "Impacto por ODS" (chart com recharts — barras por ODS)
   - Tab "Talentos da Cidade"
   - Tab "Empresas Parceiras"
   - Tab "Eventos"
   - Tab "Relatorio Anual" (exportar PDF)

3. Criar `pages/DashboardHubLocal.tsx`:
   - Tab "Resumo do HUB" (metricas da cidade)
   - Tab "Campi e Lideres" (universidades do HUB)
   - Tab "Base de Talentos"
   - Tab "Leads Corporativos"
   - Tab "Agenda de Eventos"
   - Tab "Status Prefeitura" (funnel de relacionamento)

4. Backend:
   - `server/routers/prefeitura.ts` (CRUD + metricas + relatorio)
   - `server/routers/hubLocal.ts` (CRUD + metricas + campus management)

5. Atualizar `App.tsx` com novas rotas

### Criterio de aceite
- [ ] Ambos dashboards renderizam com dados
- [ ] Metricas do HUB agregam dados de Campi
- [ ] Relatorio de impacto exporta para PDF
- [ ] Login por tipo funciona para prefeitura e embaixador

---

## Sprint 5 — Paginas Publicas v2: Storytelling

**Duracao:** 5-7 dias
**Objetivo:** Aplicar Design System v2 + Copy Guide em todas as paginas publicas

### Tasks

1. `pages/Home.tsx` — Hero brutalist editorial, copy v2, secoes redesenhadas
2. `pages/ParaEmpresas.tsx` — Foco brief → squad → relatorio
3. `pages/ParaJovens.tsx` — Foco match → portfolio
4. Criar `pages/ParaPrefeituras.tsx` — [NOVO] linguagem B2G
5. `pages/Hubs.tsx` — Mapa territorial com status por cidade e campi
6. `components/Header.tsx` — "Para Prefeituras" na nav + PersonaNav
7. `components/Footer.tsx` — CTAs por persona
8. Aplicar Design System v2 (cores, tipografia, componentes) globalmente

### Criterio de aceite
- [ ] Copy consistente com COPYWRITING_GUIDE
- [ ] Visual consistente com DESIGN_SYSTEM_V2
- [ ] Pagina de prefeitura existe e funciona
- [ ] Mapa de HUBs mostra status real

---

## Sprint 6 — CMS + Relatorios

**Duracao:** 5-7 dias

### Tasks

1. Admin Blog: CRUD completo com editor de conteudo
2. Admin Eventos: CRUD com campos de data, local, link Sympla
3. Geracao de relatorio ESG por projeto (template → PDF)
4. Geracao de relatorio de impacto municipal (template → PDF)
5. Dashboard admin com metricas reais

---

## Sprint 7 — QA + Deploy

**Duracao:** 3-5 dias

### Tasks

1. Testes vitest: routers company, ai, prefeitura, hubLocal
2. Lighthouse audit (>90 performance, >90 accessibility)
3. WCAG AA em todos os pares de cor neon
4. SEO meta tags em todas as paginas
5. Deploy em producao
