# Brasil Sustenta — Design System v2

## Filosofia: Brutalism Tropical / Neon Patria

O Brasil Sustenta abandona o "Midnight Emerald" e adota o **Brutalism Tropical**: uma estetica editorial de alto impacto que funde a sobriedade do ESG com a energia do Brasil jovem. As cores da bandeira brasileira aparecem em versao neon sobre fundo negro absoluto — criando tensao visual entre institucionalidade e disrupcao.

O resultado deve parecer: um manifesto impresso em papel preto com tinta fluorescente. Nao parece startup. Nao parece ONG. Parece uma categoria nova.

---

## Paleta de Cores — Brasil Neon

### Cores Primarias

| Token | Hex | RGB | Uso |
|---|---|---|---|
| `--background` | `#050505` | 5, 5, 5 | Base (negro absoluto) |
| `--foreground` | `#FAFAFA` | 250, 250, 250 | Texto principal |
| `--primary` | `#00FF41` | 0, 255, 65 | Verde Brasil Neon — CTA, destaques, sucesso |
| `--secondary` | `#FFD700` | 255, 215, 0 | Amarelo Brasil Neon — badges, acentos, alertas |
| `--accent` | `#0047FF` | 0, 71, 255 | Azul Brasil Neon — links, interativos, B2G |

### Cores de Suporte

| Token | Hex | Uso |
|---|---|---|
| `--destructive` | `#FF003C` | Erros, alertas criticos |
| `--card` | `#0A0A0A` | Superficies elevadas |
| `--card-hover` | `#111111` | Hover em cards |
| `--border` | `rgba(255,255,255,0.08)` | Bordas sutis |
| `--border-strong` | `rgba(255,255,255,0.20)` | Bordas de destaque |
| `--muted` | `#6B7280` | Texto secundario |
| `--muted-foreground` | `#94A3B8` | Texto terciario |

### Cores por Persona

| Persona | Cor dominante | Uso em sections |
|---|---|---|
| Empresa (B2B) | `#00FF41` (verde) | Hero, CTAs, cards |
| Prefeitura (B2G) | `#0047FF` (azul) | Headers, badges, accents |
| Universidade (Campus) | `#FFD700` (amarelo) | Headers, badges, accents |
| Talento (Jovem) | `#00FF41` + `#FFD700` | Mix energetico |
| Admin | `#6B7280` (neutro) | Interface operacional |

---

## Gradientes

```css
/* Hero: Glow Brasil Neon */
.gradient-hero {
  background:
    radial-gradient(ellipse at 20% 50%, rgba(0,255,65,0.12) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 50%, rgba(0,71,255,0.08) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 80%, rgba(255,215,0,0.06) 0%, transparent 50%);
}

/* CTA: Verde Neon */
.gradient-cta {
  background: linear-gradient(135deg, #00FF41 0%, #00CC33 100%);
  color: #050505;
}
.gradient-cta:hover {
  box-shadow: 0 0 32px rgba(0,255,65,0.4);
}

/* B2G Sections: Azul Neon */
.gradient-b2g {
  background: linear-gradient(135deg, #0047FF 0%, #0033CC 100%);
  color: #FAFAFA;
}

/* University Sections: Amarelo Neon */
.gradient-univ {
  background: linear-gradient(135deg, #FFD700 0%, #CC9900 100%);
  color: #050505;
}

/* Card Glow (hover) */
.card-glow-green:hover {
  box-shadow: 0 0 24px rgba(0,255,65,0.15), inset 0 0 24px rgba(0,255,65,0.05);
}
.card-glow-blue:hover {
  box-shadow: 0 0 24px rgba(0,71,255,0.15), inset 0 0 24px rgba(0,71,255,0.05);
}
```

---

## Tipografia — Editorial Brutalist

### Fontes

| Tipo | Fonte | Fallback | Uso |
|---|---|---|---|
| **Display** | **Fraunces** (Google Fonts) | Georgia, serif | Titulos, hero, impacto |
| **Body** | **Inter** (Google Fonts) | system-ui, sans-serif | Texto corrido, UI |
| **Mono** | **JetBrains Mono** | monospace | Scores, dados, metricas, code |

### Escala Tipografica (Desktop)

| Nivel | Fonte | Peso | Tamanho | Line-height | Letter-spacing | Uso |
|---|---|---|---|---|---|---|
| **Display** | Fraunces | 900 (Black) | 8rem (128px) | 0.9 | -0.04em | Hero H1, numeros hero |
| **H1** | Fraunces | 900 (Black) | 5rem (80px) | 0.95 | -0.03em | Titulos de pagina |
| **H2** | Fraunces | 700 (Bold) | 3.5rem (56px) | 1.0 | -0.02em | Titulos de secao |
| **H3** | Inter | 700 (Bold) | 2rem (32px) | 1.2 | -0.01em | Subtitulos |
| **H4** | Inter | 600 (SemiBold) | 1.5rem (24px) | 1.3 | normal | Card titles |
| **Body** | Inter | 400 (Regular) | 1.125rem (18px) | 1.6 | normal | Texto corrido |
| **Body SM** | Inter | 400 (Regular) | 1rem (16px) | 1.5 | normal | Texto secundario |
| **Label** | Inter | 500 (Medium) | 0.75rem (12px) | 1.4 | 0.12em | Labels, badges (UPPERCASE) |
| **Score** | JetBrains Mono | 700 (Bold) | 3rem (48px) | 1.0 | -0.02em | ODS Fit Score, metricas |
| **Metric** | Fraunces | 900 (Black) | 6rem (96px) | 0.9 | -0.04em | Numeros grandes em secoes |

### Escala Mobile (breakpoint < 768px)

- Display: 4rem
- H1: 3rem
- H2: 2.25rem
- H3: 1.5rem
- Body: 1rem
- Metric: 3.5rem

---

## Principios Brutalist para Paginas Publicas

### 1. Tipografia como Arquitetura
H1 ocupa 60%+ da viewport em hero sections. Palavras-chave em verde neon. O titulo e o design.

### 2. Blocos de Cor Massivos
Secoes inteiras com background `#00FF41` e texto `#050505`. Secoes B2G com background `#0047FF`. Cria ritmo visual forte entre negro e cor.

### 3. Grid Quebrado
Layouts assimetricos. Elementos que "vazam" da margem. Cards com tamanhos irregulares. Nunca uma grid perfeitamente simetrica — isso e consultoria, nao e Brasil Sustenta.

### 4. Contrastes Extremos
Neon sobre negro. Branco sobre azul. Amarelo sobre negro. Sem meios-termos, sem cinzas medianos como cor de destaque.

### 5. Numeros como Design
Metricas em 6-8rem (Fraunces Black). "300+ talentos" e visual, nao texto. Contadores grandes sao elementos de design, nao informacao auxiliar.

### 6. Zero Fotografia
Sem fotos stock. Sem fotos de pessoas. Usar: icones lucide-react, formas geometricas, graficos de dados, blocos de cor, tipografia. A identidade e grafica, nao fotografica.

### 7. Microinteracoes Nervosas
- Hover em botoes: glow neon (150ms ease-out)
- Hover em cards: border-color neon + sombra difusa
- Scroll reveal: fade-in-up (400ms) com stagger entre elementos
- Cursor: crosshair em zonas de destaque (hero section)

---

## Principios para Paginas Privadas (Dashboards)

### 1. Funcionalidade sobre Estetica
Dashboard e ferramenta de trabalho. Mantem a paleta de cores, mas reduz o brutalismo. Layout mais organizado, tipografia mais funcional.

### 2. Hierarquia Clara
- Sidebar fixa com navegacao por tabs
- Conteudo principal ocupa 80% da largura
- Metricas-chave no topo (MetricBlock)
- Tabelas e listas como corpo principal

### 3. Cor como Significado
- Verde = sucesso, aprovado, ativo
- Amarelo = pendente, atencao
- Azul = informacao, B2G, institucional
- Vermelho = erro, rejeitado, cancelado

### 4. Consistencia entre Dashboards
Todos os 5 dashboards seguem a mesma estrutura:
- Resumo no topo (3-4 MetricBlocks)
- Tabs horizontais para navegacao interna
- Conteudo principal por tab
- Acoes contextuais por item

---

## Componentes do Design System

### DSButton v2

Variantes:
- `primary` — Fundo verde neon (#00FF41), texto negro, glow hover
- `secondary` — Fundo transparente, borda verde, texto verde
- `b2g` — Fundo azul neon (#0047FF), texto branco, glow hover azul
- `ghost` — Sem fundo, texto branco, hover com fundo rgba
- `destructive` — Fundo vermelho, texto branco

Tamanhos: `sm` (px-4 py-2), `md` (px-6 py-3), `lg` (px-8 py-4)

### DSCard v2

Variantes:
- `default` — Fundo #0A0A0A, borda sutil
- `bordered` — Borda #00FF41 (1px), fundo transparente
- `brutalist` — Borda espessa (3px) verde, sem radius
- `gradient` — Fundo com gradient-hero sutil
- `elevated` — Sombra difusa com glow neon

### ODSBadge (novo)

Badge circular com cor do ODS + numero + label.
17 variantes de cor (uma por ODS da ONU).
Tamanhos: `sm` (24px), `md` (32px), `lg` (48px)

### ODSFitScoreCard (novo)

Card que mostra:
- Score total (JetBrains Mono, 3rem, verde neon)
- Breakdown: Skills Fit (barra), ODS Fit (barra), Context Fit (barra)
- Explicacao em linguagem natural (Body SM)
- Badges de ODS alinhados
- Variante compacta (para lista) e expandida (para detalhe)

### MetricBlock (novo)

- Numero grande (Fraunces Black, 4-6rem)
- Label em uppercase (Inter Medium, 0.75rem, tracking 0.12em)
- Delta opcional (+12% em verde ou -5% em vermelho)
- Usado no topo de todos os dashboards

### HubMapCard (novo)

Card com:
- Nome da cidade + status (badge com cor)
- Numero de Campi, talentos, squads
- Indicador de prefeitura (ativo/negociacao/informal)
- Cor do pulso baseada no status

### PersonaNav (novo)

Navegacao horizontal com tabs por persona:
- Cada tab tem cor da persona (verde, azul, amarelo)
- Ativo = fundo solido, inativo = ghost
- Usado no Header para direcionar por buyer

---

## Espacamento

Baseado em multiplos de 8px:
- `xs`: 8px (0.5rem)
- `sm`: 16px (1rem)
- `md`: 24px (1.5rem)
- `lg`: 32px (2rem)
- `xl`: 48px (3rem)
- `2xl`: 64px (4rem)
- `3xl`: 96px (6rem)

Section padding vertical: `6rem` (desktop), `3rem` (mobile)
Container max-width: `1280px` (padrao), `1440px` (wide sections)

---

## Bordas e Radius

| Elemento | Radius | Nota |
|---|---|---|
| Buttons | `0.5rem` (8px) | Levemente arredondado |
| Cards (default) | `0.75rem` (12px) | Suave |
| Cards (brutalist) | `0` | Sem radius — reto |
| Inputs | `0.5rem` (8px) | Consistente com buttons |
| Badges | `9999px` | Full round |
| Modal/Dialog | `1rem` (16px) | Destaque |

---

## Sombras e Glow

```css
/* Sombra padrao */
.shadow-card { box-shadow: 0 4px 24px rgba(0,0,0,0.3); }

/* Glow verde neon (CTA, hover) */
.glow-green { box-shadow: 0 0 32px rgba(0,255,65,0.3); }

/* Glow azul (B2G hover) */
.glow-blue { box-shadow: 0 0 32px rgba(0,71,255,0.3); }

/* Glow amarelo (University hover) */
.glow-yellow { box-shadow: 0 0 32px rgba(255,215,0,0.25); }

/* Inner glow (cards) */
.inner-glow-green { box-shadow: inset 0 0 32px rgba(0,255,65,0.05); }
```

---

## Icones

- Biblioteca: **lucide-react** (ja instalado)
- Tamanho padrao: 20px (w-5 h-5)
- Tamanho small: 16px (w-4 h-4)
- Cor: herda do texto (currentColor)
- Nunca usar icones decorativos sem funcao
- Preferir icones de lucide-react sobre custom SVGs

---

## Animacoes

```css
/* Fade in up (scroll reveal) */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }

/* Glow pulse (badges ativos) */
@keyframes glowPulse {
  0%, 100% { box-shadow: 0 0 16px rgba(0,255,65,0.2); }
  50% { box-shadow: 0 0 32px rgba(0,255,65,0.4); }
}
.animate-glow-pulse { animation: glowPulse 2s ease-in-out infinite; }

/* Stagger delays */
.delay-100 { animation-delay: 100ms; }
.delay-200 { animation-delay: 200ms; }
.delay-300 { animation-delay: 300ms; }
.delay-400 { animation-delay: 400ms; }
```

Usar `framer-motion` (ja instalado) para:
- Page transitions
- Layout animations em tabs
- Drag interactions em cards
- Number counting animations em MetricBlocks

---

## Diretiva Anti-IA: Autenticidade Visual

O Brasil Sustenta recusa qualquer estetica que "pareca feita por IA". O visual deve comunicar autoria humana, intencionalidade editorial e personalidade propria.

### O que NUNCA usar

| Elemento proibido | Por que parece IA | Alternativa |
|---|---|---|
| Gradientes multi-cor suaves (rainbow, aurora) | Estetica generativa generica | Gradientes duais com cores do Brasil Neon (max 2 cores) |
| Icones 3D glossy ou isometricos | Padrao de hero image AI | Icones lucide-react flat, 20px, monocromaticos |
| Ilustracoes com "brilho magico" ou sparkles | Estetica Midjourney/DALL-E | Formas geometricas brutas, tipografia como visual |
| Blobs organicos com gradiente | Padrao de landing page generativa | Blocos retangulares, grid quebrado, bordas secas |
| Sombras coloridas difusas em tudo | Over-design AI | Glow neon APENAS em elementos interativos (hover/focus) |
| Icones de cerebro, lampada, foguete, diamante | Cliches de "inovacao" AI | Icones funcionais: ArrowRight, ChevronDown, BarChart, MapPin |
| Mockups de dashboard perfeitos demais | Parece screenshot de template | Dashboards funcionais com dados reais, imperfeicoes intencionais |
| Tipografia decorativa com muitos pesos | Complexidade sem funcao | Fraunces Black para impacto, Inter Regular para leitura — so |
| Fotos stock de pessoas diversas sorrindo | Padrao de ESG greenwashing | Zero fotografia — design 100% grafico e tipografico |

### O que SEMPRE fazer

1. **Tipografia como identidade** — O titulo E o design. Fraunces Black 6-8rem sobre fundo negro e a assinatura visual.
2. **Formas geometricas brutas** — Retangulos, linhas, grids. Nada organico, nada suave.
3. **Dados como visual** — Numeros grandes (Fraunces Black 6rem+) sao elementos de design, nao decoracao.
4. **Cor com proposito** — Cada cor tem significado: verde = acao/empresa, azul = institucional/B2G, amarelo = academia. Nunca cor decorativa.
5. **Espaco negativo agressivo** — Muito preto. Menos e mais. O vazio comunica confianca.
6. **Imperfeicao intencional** — Grid quebrado, elementos assimetricos, texto que "vaza" da margem. Perfeicao simetrica parece template.

### Teste de Autenticidade

Antes de aprovar qualquer componente visual, perguntar:
- "Isso poderia ter sido gerado por um prompt de IA?" → Se sim, refazer.
- "Isso parece um template comprado?" → Se sim, quebrar a simetria.
- "Isso parece outra startup de impacto?" → Se sim, radicalizar o brutalismo.

---

## Mobile-First: Breakpoints e Touch

### Principio

Toda interface e projetada para mobile primeiro. Desktop e a extensao, nao o padrao. 70%+ do publico jovem acessa por celular.

### Breakpoints

| Token | Largura | Uso |
|---|---|---|
| `mobile` | < 640px | Layout padrao (single column, touch-first) |
| `tablet` | 640px - 1023px | 2 colunas onde faz sentido |
| `desktop` | 1024px - 1439px | Layout completo |
| `wide` | ≥ 1440px | Secoes expandidas, max-width 1440px |

### Regras Mobile

1. **Touch targets minimos**: 44x44px para todos os elementos interativos (botoes, links, toggles)
2. **Fonte minima**: 16px para inputs (evita zoom automatico no iOS)
3. **Padding horizontal**: 16px (1rem) em mobile, 24px (1.5rem) em tablet+
4. **Stack vertical**: Tudo em coluna unica em mobile. Nada lado a lado abaixo de 640px.
5. **Thumb zone**: CTAs principais na metade inferior da tela (zona do polegar)
6. **Scroll nativo**: Nenhum scroll horizontal. Tabs com scroll horizontal nativo quando necessario.
7. **Imagens zero**: O design sem fotografia facilita performance mobile — sem lazy load pesado.

### Escala Tipografica Mobile

| Nivel | Desktop | Mobile (< 640px) | Razao |
|---|---|---|---|
| Display | 8rem (128px) | 3.5rem (56px) | Cabe em 375px com padding |
| H1 | 5rem (80px) | 2.5rem (40px) | Legivel em uma linha |
| H2 | 3.5rem (56px) | 2rem (32px) | 2 linhas max |
| H3 | 2rem (32px) | 1.5rem (24px) | Subtitulo confortavel |
| Body | 1.125rem (18px) | 1rem (16px) | Leitura fluida |
| Score | 3rem (48px) | 2.25rem (36px) | Destaque numerico |
| Metric | 6rem (96px) | 3rem (48px) | Impacto mantido |

### Dashboard Mobile

- Sidebar colapsa em bottom nav com 4-5 icones
- MetricBlocks empilham 2x2 (em vez de 4 em linha)
- Tabelas viram cards empilhados com dados-chave
- Modais viram telas full-screen em mobile
- Forms ocupam 100% da largura com spacing generoso

---

## IA-First: Design de Produto com IA no Centro

### Principio

A IA nao e feature escondida — e o artefato compravel visivel. O ODS Fit Score e o produto. O design deve fazer da IA algo tangivel, explicavel e confiavel.

### Regras de Design para Elementos de IA

1. **Score como hero visual**
   - ODS Fit Score sempre em JetBrains Mono Bold, 3rem+, verde neon
   - Nunca esconder o score em um tooltip ou modal — e o centro da tela
   - Breakdown visivel: 3 barras (Skills, ODS, Context) sempre abertas, nao colapsadas

2. **Explicacao como UX, nao rodape**
   - "Marina tem fit com ODS 13 por causa de 3 projetos de extensao em monitoramento ambiental"
   - Linguagem natural em PT-BR, nunca jargao tecnico ("embedding", "similarity")
   - Fonte: Inter Regular 16px, cor `--muted-foreground`, max 2 linhas
   - Posicao: logo abaixo do score, nao em "saiba mais"

3. **Transparencia como confianca**
   - Sempre mostrar POR QUE o score e X, nao apenas o numero
   - Badges de ODS com cor oficial da ONU — usuario reconhece visualmente
   - Delta temporal: "Seu fit subiu 12 pontos desde o ultimo projeto" (quando houver historico)

4. **Loading states com personalidade**
   - Nunca "Loading..." ou spinner generico
   - Usar: "Calculando fit score...", "Analisando portfolio...", "Mapeando ODS..."
   - Animacao: barra de progresso verde neon pulsando (glowPulse)

5. **Empty states com CTA claro**
   - Sem matches: "Seu perfil ainda nao tem projetos. Complete seu portfolio para receber matches."
   - Sem score: "Candidate-se a um projeto para ver seu Fit Score explicado."
   - Sempre com botao de acao, nunca so texto informativo

6. **Erro com tom humano**
   - "Nao conseguimos calcular o fit agora. Tente de novo em alguns minutos."
   - Nunca: "Error 500", "Something went wrong", "Unexpected error"

### Hierarquia Visual de Elementos IA

```
┌─────────────────────────────────┐
│  ODS Fit Score: 87              │  ← JetBrains Mono Bold, 3rem, #00FF41
│  ████████░░ Skills  72          │  ← Barra verde, Inter Medium 14px
│  █████████░ ODS     91          │  ← Barra verde, Inter Medium 14px
│  █████████░ Context 89          │  ← Barra verde, Inter Medium 14px
│                                 │
│  "Fit alto com ODS 13 por 3     │  ← Inter Regular 16px, #94A3B8
│   projetos de extensao em       │
│   monitoramento ambiental."     │
│                                 │
│  [ODS 7] [ODS 13] [ODS 15]     │  ← ODSBadge md (32px), cores ONU
│                                 │
│  [Tenho interesse]              │  ← DSButton primary, glow hover
└─────────────────────────────────┘
```

---

## Boas Praticas

1. Sempre usar tokens de cor do CSS custom properties (nunca hex hardcoded)
2. Componentes DS tem prioridade sobre classes Tailwind inline
3. Testar WCAG AA em todos os pares de cor (especialmente neon sobre negro)
4. Mobile-first: comecar pelo breakpoint menor — SEMPRE
5. Fraunces so para titulos — nunca para body text
6. JetBrains Mono so para dados numericos — nunca para UI text
7. Glow effects so em elementos interativos — nunca em texto estatico
8. Brutalismo nas paginas publicas, funcionalidade nos dashboards
9. Zero estetica que "parece IA" — autenticidade acima de tudo
10. IA visivel como artefato, nao como magia escondida
11. Touch targets 44x44px minimo em TODOS os elementos clicaveis
12. Testar em 375px (iPhone SE) antes de qualquer outra resolucao
