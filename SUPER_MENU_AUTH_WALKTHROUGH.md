# Brasil Sustenta — Super Menu & Persona Auth Walkthrough

## Objetivo

Resumo operacional da nova navegação editorial e do fluxo de acesso por persona.

---

## 1. Super Menu

### Anatomia

- `client/src/constants/navigation-data.ts` e a fonte unica de verdade da navegacao.
- Cada secao do header define:
  - `label` e `href`
  - `hasPanel`
  - `panel.eyebrow`, `panel.title`, `panel.description`
  - `panel.ctaLabel`, `panel.ctaHref`
  - `panel.gridCols`
  - `panel.tiles[]` com `iconKey`, `colSpan`, `rowSpan`, `featureTag`, `accent` e `invert`

### Comportamento

- Desktop usa `NavigationMenu` do Radix com `delayDuration={150}`.
- Abertura por hover.
- Fechamento por:
  - mouse leave da area total do menu
  - blur para fora do wrapper
  - tecla `Escape`
- Painel usa `AnimatePresence` + `motion.div` para rollout editorial em largura total.

### Responsividade

- Desktop: mega menu full-width com hero editorial + grid Bento.
- Mobile/tablet: drawer lateral com `Accordion`, reaproveitando os mesmos dados da navegacao.

---

## 2. Acesso por Persona

### Regra de produto

- `/auth/*` e a rota canonica de cada portal.
- `/login` continua como hub global de escolha por persona.
- `/login/empresa`, `/login/jovem` e `/login/universidade` sao aliases com redirect.

### Personas ativas

- Empresa → `/auth/empresa`
- Jovem → `/auth/jovem`
- IES → `/auth/ies`
- Prefeitura → `/auth/prefeitura`
- Embaixador → `/auth/embaixador`

### Arquitetura

- `client/src/constants/auth-personas.ts` centraliza copy, metricas, tabs, campos e highlights.
- `client/src/components/AuthPortalLayout.tsx` monta o shell editorial escuro + formulario claro.
- `client/src/components/auth/PersonaAuthPage.tsx` renderiza as cinco telas a partir da configuracao da persona.

---

## 3. QA Manual

### Header / Super Menu

1. Passar o mouse pelos itens do header e confirmar atraso perceptivel de `150ms`.
2. Validar se cada painel abre o hero correto e tiles com rotas corretas.
3. Confirmar fechamento com `Escape`, blur e saida do cursor.
4. Testar se o CTA `Acesso` continua levando para `/login`.

### Mobile

1. Abrir o drawer.
2. Expandir secoes do accordion e navegar pelos tiles.
3. Confirmar que nao ha estado travado apos abrir/fechar.

### Persona Auth

1. Entrar em cada rota `/auth/*`.
2. Validar:
   - shell escuro + formulario claro
   - CTA principal unico por tela
   - tabs funcionando
   - copy aderente a persona
3. Em `Prefeitura`, confirmar ausencia de linguagem de startup ou argumento centrado em IA.

---

## 4. Arquivos-Chave

- `client/src/components/Header.tsx`
- `client/src/components/SuperMenu.tsx`
- `client/src/constants/navigation-data.ts`
- `client/src/constants/auth-personas.ts`
- `client/src/components/AuthPortalLayout.tsx`
- `client/src/components/auth/PersonaAuthPage.tsx`
