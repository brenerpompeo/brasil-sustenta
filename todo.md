# Brasil Sustenta — TODO v2

Status: Atualizado 2026-04-17 | Referencia detalhada: `SPRINT_PLAN_CODE.md`

---

## Legado v1 (Concluido)

Tudo abaixo foi construido na fase v1 e esta funcional:
- Landing page, Header, Footer
- Schema DB: 18 tabelas (users, companyProfiles, talentProfiles, universityProfiles, projects, applications, squads, etc.)
- Auth pages: login/cadastro para empresa, jovem, universidade
- Paginas publicas: Para Empresas, Para Jovens, Para Universidades, Blog, Eventos
- Dashboard Empresa (parcial): criar projeto, listar projetos, visualizar candidatos
- Admin layout com sidebar + gestao de usuarios
- Upload de imagens (S3)
- Formularios de contato, duvidas, parceria universitaria
- Perfis de usuario (empresa, talento, universidade)

---

## Sprint -1: Migracao Auth/Deploy → Vercel/Supabase
- [ ] Remover vite-plugin-manus-runtime de vite.config.ts
- [ ] Substituir server/_core/sdk.ts por Supabase Auth client
- [ ] Reescrever server/_core/oauth.ts para Supabase session
- [ ] Atualizar server/_core/llm.ts (remover endpoint legado)
- [ ] Migrar server/storage.ts de S3 → Supabase Storage
- [ ] Deletar client/src/components/ManusDialog.tsx
- [ ] Reescrever client/src/_core/hooks/useAuth.ts para Supabase
- [ ] Atualizar package.json (remover plugin legado, adicionar @supabase/supabase-js)
- [ ] Criar .env.example e vercel.json
- [ ] Testar: npm run build passa, npm run dev funciona

## Sprint 0: Schema Evolution
- [ ] Adicionar userTypeEnum: "prefeitura", "embaixador"
- [ ] Criar tabela hubLocals
- [ ] Criar tabela campuses
- [ ] Criar tabela prefeituraProfiles
- [ ] Criar tabela hubMetrics
- [ ] Adicionar campos: projects.hubLocalId, projects.odsAlignment, events.hubLocalId, applications.odsFitScore
- [ ] Atualizar relations
- [ ] Executar migracao: npm run db:push
- [ ] Exportar tipos em shared/types.ts

## Sprint 1: ODS Fit Score v1
- [ ] Refatorar server/routers/ai.ts com 3 dimensoes (skills, ODS, context)
- [ ] Endpoint ai.calculateFitScore
- [ ] Endpoint ai.getShortlist
- [ ] Criar components/ODSFitScoreCard.tsx
- [ ] Criar components/ODSBadge.tsx
- [ ] Fallback sem OpenAI (template-based)

## Sprint 2: Dashboard Empresa v2
- [ ] Refatorar DashboardEmpresa.tsx com tabs (Resumo, Briefs, Shortlists, Squads, Relatorios)
- [ ] Criar BriefForm.tsx
- [ ] Criar ShortlistView.tsx com ODSFitScoreCard
- [ ] Criar SquadFormation.tsx
- [ ] Backend: company.createBrief, company.getShortlist, company.formSquad

## Sprint 3: Dashboard Jovem v2
- [ ] Refatorar DashboardJovem.tsx com tabs (Matches, Candidaturas, Squads, Portfolio)
- [ ] Criar MatchCard.tsx
- [ ] Criar PortfolioView.tsx
- [ ] Backend: talent.getMatches, talent.getPortfolio

## Sprint 4: Dashboard Prefeitura + HUB Local
- [ ] Criar DashboardPrefeitura.tsx (6 tabs)
- [ ] Criar DashboardHubLocal.tsx (6 tabs)
- [ ] Backend: routers prefeitura.ts e hubLocal.ts
- [ ] Atualizar App.tsx com novas rotas
- [ ] Login pages para prefeitura e embaixador

## Sprint 5: Paginas Publicas v2
- [ ] Refatorar Home.tsx com Design System v2
- [ ] Refatorar ParaEmpresas.tsx
- [ ] Refatorar ParaJovens.tsx
- [ ] Criar ParaPrefeituras.tsx [NOVO]
- [ ] Refatorar Hubs.tsx com mapa territorial
- [ ] Atualizar Header.tsx e Footer.tsx

## Sprint 6: CMS + Relatorios
- [ ] Admin Blog CRUD completo
- [ ] Admin Eventos CRUD completo
- [ ] Relatorio ESG por projeto (PDF)
- [ ] Relatorio impacto municipal (PDF)

## Sprint 7: QA + Deploy
- [ ] Testes vitest para routers criticos
- [ ] Lighthouse audit (>90 performance, >90 accessibility)
- [ ] WCAG AA em pares de cor neon
- [ ] SEO meta tags
- [ ] Deploy producao Vercel
