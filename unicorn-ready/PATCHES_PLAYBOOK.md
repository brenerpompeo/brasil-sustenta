# Patches Playbook — Brasil Sustenta Unicorn-Ready

**Versão**: 1.0 | **Data**: 2026-04-23 | **Dono**: CTO + AI-Dev-Senior

Este documento lista os 5 patches cirúrgicos a aplicar antes do lançamento oficial. Cada patch tem: problema, solução, arquivos afetados, código sugerido, critério de aceite, prazo.

---

## Patch 1 — Rotação de Credenciais Expostas (P0 — CRÍTICO)

### Problema
Arquivo `.env` em `/sessions/gracious-elegant-bohr/mnt/brasil-sustenta/.env` contém credenciais de produção em texto claro, incluindo:
- `DATABASE_URL` com senha PostgreSQL
- `JWT_SECRET` (secret estático)
- `GEMINI_API_KEY` (Google AI)
- `SUPABASE_URL` + `SUPABASE_ANON_KEY` + `SUPABASE_SERVICE_ROLE_KEY`

Ainda que não esteja commitado (checar `git check-ignore .env`), o risco é alto: exposição em backup, share de máquina, troca de dev machine.

### Solução
1. **Rotacionar 100% dos secrets**:
   - Supabase: Dashboard → Settings → API → "Reset service role key" e "Reset anon key"
   - Supabase DB: Settings → Database → "Reset database password" (inválida a URL atual)
   - Google AI Studio: revogar `GEMINI_API_KEY` atual e emitir nova
   - JWT: gerar novo `JWT_SECRET` com `openssl rand -base64 64`
2. **Mover secrets para vault**: Vercel Environment Variables (Preview/Production separados)
3. **Nunca mais** colocar em `.env` local que não seja `.env.local` (já no `.gitignore`)
4. **Auditar git history**: rodar `git log --all --full-history -- .env` para confirmar que nunca foi commitado; se foi, rodar `git filter-repo` ou BFG Repo Cleaner
5. **Habilitar GitHub secret scanning**: Settings → Code security → push protection
6. **Rotação trimestral**: documentar em `SECURITY.md` como ritual obrigatório

### Critério de aceite
- [ ] Todas as 5 credenciais rotacionadas e confirmadas ativas
- [ ] Vercel rodando com secrets novos (sem downtime > 60s)
- [ ] `.env` local recriado com novos valores
- [ ] `.env.example` atualizado mostrando o formato (sem valor real)
- [ ] Git history limpa (confirmado com `git log`)
- [ ] GitHub secret scanning ligado
- [ ] Registro em `Log de Evolução do Sistema.md`

### Prazo
**48 horas** a partir desta publicação (bloqueante para deploy prod)

---

## Patch 2 — Middleware de Auth Centralizado no Express

### Problema
tRPC em `server/_core/trpc.ts` já tem `protectedProcedure` e `adminProcedure` funcionais. Porém, o bootstrap Express em `server/index.ts` pode estar expondo rotas `/api/*` fora do tRPC (ex.: webhooks, uploads, image generation) sem checagem consistente.

### Solução
Criar middleware `requireAuth` e `requireAdmin` reutilizável para rotas Express não-tRPC. Padrão sugerido:

```typescript
// server/middleware/requireAuth.ts
import type { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../_core/oauth'; // usa função existente

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.access_token ?? req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'UNAUTHORIZED' });
  try {
    const user = await verifyJwt(token);
    (req as any).user = user;
    next();
  } catch {
    res.status(401).json({ error: 'UNAUTHORIZED' });
  }
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const user = (req as any).user;
  if (!user || user.role !== 'admin') return res.status(403).json({ error: 'FORBIDDEN' });
  next();
}
```

Aplicar em todas as rotas não-tRPC:
```typescript
app.post('/api/upload', requireAuth, uploadHandler);
app.post('/api/image/generate', requireAuth, imageGenHandler);
app.delete('/api/admin/users/:id', requireAuth, requireAdmin, deleteUserHandler);
```

### Critério de aceite
- [ ] Arquivo `server/middleware/requireAuth.ts` criado
- [ ] Zero endpoints públicos em `/api/*` retornando dados sensíveis (validar com `curl` sem token → 401)
- [ ] Teste E2E em `e2e/` cobrindo: login → protected route OK; logout → mesmo endpoint → 401
- [ ] Rate limit básico (ex.: `express-rate-limit`) em endpoints de auth (10/min por IP)

### Prazo
**Sprint -1 (antes do deploy)**

---

## Patch 3 — Checkout Stub B2B (Pilot Project + Managed Squad)

### Problema
Não há caminho de monetização self-service. Todo deal hoje passa por founder outbound → sem leakage para funil inbound. Essa é a maior barreira para validação de LTV/CAC.

### Solução
Criar componente `CheckoutModal.tsx` como stub de conversão, mesmo que o pagamento real seja por PIX/boleto manual na v1. O objetivo é capturar intenção de compra como lead qualificado (SQL).

**Fluxo v1 (sem integração de pagamento real)**:
1. User na página `/para-empresas` clica em "Contratar Pilot Project"
2. Modal abre: formulário com (a) empresa, CNPJ, (b) sponsor + cargo, (c) desafio ESG em 200 chars, (d) ODS prioritário, (e) budget aprovado
3. Submit → gera lead no CRM + dispara e-mail para `comercial@brasilsustenta.com.br` + confirma em tela "Nosso time fala com você em 24h"
4. Trigger automático: agente `bs-b2g-sales` ou `bs-squad-coordinator` recebe tarefa

**Fluxo v2 (com Stripe/PagarMe — Q3 2026)**:
- Checkout real com 50% entrada via Stripe
- Contract e-sign (Clicksign ou DocuSign)
- Webhook cria projeto no DB + trigger Suzely

**Arquivo sugerido**: `client/src/components/CheckoutModal.tsx` — usar shadcn `Dialog` + `Form` + `zod` schema.

### Critério de aceite
- [ ] Modal renderiza em `/para-empresas` e `/para-prefeituras`
- [ ] Form validação zod com feedback inline
- [ ] Submit cria registro em tabela `leads` (Drizzle) com status `novo`
- [ ] E-mail transacional disparado (pode ser Resend ou SMTP Supabase)
- [ ] Analytics event `checkout_intent` registrado (mixpanel ou similar)

### Prazo
**2 semanas após Sprint -1**

---

## Patch 4 — Landing Page `/para-prefeituras` (B2G)

### Problema
Já existe `client/src/pages/ParaPrefeituras.tsx` (339 linhas) porém pode não estar otimizada para o funil B2G. Precisa revisar:
- Copy específico para gestor público (não usa linguagem de startup)
- Evidência de conformidade com Lei 14.133/21 + Lei 13.019/14
- Case study de prefeitura (mesmo que fictício "prefeitura fictícia de exemplo" para validar copy)
- CTA duplo: "Agende reunião" (top) + "Baixe whitepaper ODS municipal" (middle)
- Selo de auditabilidade TCU/TCE
- FAQ jurídico: "É licitável?" "Qual modalidade?" "Tem dispensa até R$50k?"

### Solução
Auditar conteúdo atual e aplicar estrutura canônica:
1. **Hero**: "Plano Municipal de ODS em 12 semanas, auditável pelo TCU"
2. **Problema**: 3 dores do gestor (capacidade técnica, prazos mandato, prestação de contas)
3. **Solução**: Squad universitário + metodologia auditável + relatório LAI
4. **Prova**: metodologia citando SASB/GRI + evidência de projetos (se houver)
5. **Processo**: 4 passos (kickoff → diagnóstico → plano → evento público)
6. **Modalidades de contratação**: dispensa (≤R$50k), convênio MROSC, pregão eletrônico
7. **FAQ jurídico** (5 perguntas)
8. **CTA final**: "Agende apresentação (30min)"

### Critério de aceite
- [ ] Copy revisado por skill `bs-b2g-procurement-law`
- [ ] Mínimo 3 CTAs (topo, meio, fim)
- [ ] Lighthouse ≥90 em mobile + desktop
- [ ] Google Analytics + event tracking configurado
- [ ] Whitepaper "Plano Municipal ODS em 12 semanas" disponível para download (PDF)

### Prazo
**Semana 2 pós-Sprint -1**

---

## Patch 5 — Índices pgvector para Suzely Pipeline

### Problema
Suzely VNext usa pgvector para retrieval semântico (skills, ODS, context). Sem índice IVFFLAT ou HNSW, queries cosine distance fazem full scan → latência cresce O(n) com número de talentos. Para 500+ talentos (meta Ano 1) já é >2s/query; para 10k+ (Ano 3) inviável.

### Solução
Criar migration Drizzle adicional `0005_pgvector_indexes.sql` com índices IVFFLAT nas colunas vetoriais:

```sql
-- Ative a extensão (se ainda não estiver ativa no Supabase)
CREATE EXTENSION IF NOT EXISTS vector;

-- Índice para embedding de perfil do talento
CREATE INDEX IF NOT EXISTS talents_profile_embedding_idx 
  ON talents 
  USING ivfflat (profile_embedding vector_cosine_ops) 
  WITH (lists = 100);

-- Índice para embedding de brief do projeto
CREATE INDEX IF NOT EXISTS projects_brief_embedding_idx 
  ON projects 
  USING ivfflat (brief_embedding vector_cosine_ops) 
  WITH (lists = 50);

-- Índice para skills
CREATE INDEX IF NOT EXISTS skills_embedding_idx 
  ON skills_catalog 
  USING ivfflat (embedding vector_cosine_ops) 
  WITH (lists = 20);

-- Índice HNSW opcional para ODS (baixa cardinalidade, 17 elementos)
CREATE INDEX IF NOT EXISTS ods_embedding_hnsw_idx 
  ON ods_catalog 
  USING hnsw (embedding vector_cosine_ops);

-- ANALYZE para que o planner conheça as estatísticas
ANALYZE talents;
ANALYZE projects;
ANALYZE skills_catalog;
ANALYZE ods_catalog;
```

**Tuning `lists`**: valor aproximado é `sqrt(n_rows)`. Para 500 talentos: `lists = 25`. Ao crescer, rodar `REINDEX` trimestral.

**Validação**: rodar `EXPLAIN ANALYZE` em query de matching antes e depois — latência deve cair de ~2s para <100ms com 500 rows.

### Critério de aceite
- [ ] Migration `0005_pgvector_indexes.sql` criada e aplicada em staging
- [ ] `EXPLAIN ANALYZE` confirma uso do índice (não seq scan)
- [ ] Benchmark latência em `suzely-benchmark.test.ts` passando com p95 <200ms em 500 rows
- [ ] Aplicado em produção com zero downtime (CREATE INDEX CONCURRENTLY)
- [ ] Monitoramento configurado (alerta se query >1s)

### Prazo
**Antes do 1º Programa Municipal ODS com >100 candidatos**

---

## Patch 6 (BÔNUS) — Observability básico

### Problema
Sem logs estruturados, tracing ou métricas, qualquer bug em produção é gambiarra de investigação. Especialmente crítico para Suzely (pipeline de 3 etapas com Gemini externo).

### Solução
1. **Logs estruturados**: substituir `console.log` por `pino` com `pino-http`
2. **Tracing distribuído**: OpenTelemetry SDK (Sentry já faz isso se usar `@sentry/node`)
3. **Métricas**: Sentry Performance + dashboards Supabase (query slow log)
4. **Alertas**: Slack webhook em erros 500 + tempo resposta >2s p95

### Prazo
**Sprint 1 pós-deploy**

---

## Ordem de aplicação (priorização)

1. **Patch 1 (Rotação)** — 48h — BLOQUEANTE
2. **Patch 5 (pgvector)** — Sprint -1 — PERFORMANCE
3. **Patch 2 (Auth middleware)** — Sprint -1 — SECURITY
4. **Patch 3 (Checkout stub)** — Sprint 1 — REVENUE
5. **Patch 4 (ParaPrefeituras)** — Sprint 1 — B2G FUNNEL
6. **Patch 6 (Observability)** — Sprint 2 — OPS

---

## Nota operacional

Estes patches são **recomendações**. A aplicação concreta deve ser feita pelo time de engenharia (Brener + AI-Dev-Senior + futuro CTO), seguindo o padrão de PR + review + teste + deploy. Cada patch vira uma issue no GitHub com critério de aceite copiado deste documento.

**Referência cruzada**:
- `.antigravity/agents/bs-squad-coordinator.md` — quem aciona Patch 3
- `.antigravity/agents/bs-b2g-sales.md` — quem valida Patch 4
- `.antigravity/skills/bs-b2g-procurement-law/SKILL.md` — fonte de verdade jurídica
- `SPRINT_PLAN_CODE.md` do repo — onde estes patches entram no roadmap de engenharia
