# Brasil Sustenta - Design System

## Filosofia: Impacto Sofisticado

O Design System da Brasil Sustenta segue a filosofia **"Impacto Sofisticado"**: uma identidade visual premium, minimalista e dark que transmite seriedade, inovação e sustentabilidade.

---

## Paleta de Cores

### Cores Principais
- **Background**: `#121212` (oklch(0.10 0 0)) - Base escura premium
- **Primary**: `#1ED760` (oklch(0.78 0.24 145)) - Verde vibrante para CTAs e destaques
- **Foreground**: `#FAFAFA` (oklch(0.98 0 0)) - Texto principal

### Cores Secundárias
- **Card**: `oklch(0.18 0 0)` - Fundo de cards e containers
- **Border**: `oklch(0.28 0 0)` - Bordas sutis
- **Muted**: `oklch(0.65 0 0)` - Texto secundário

### Gradientes
```css
/* Gradiente Radial para Banners */
.gradient-radial-primary {
  background: radial-gradient(circle at center, rgba(30, 215, 96, 0.15) 0%, transparent 70%);
}

/* Gradiente Linear para CTAs */
.gradient-cta {
  background: linear-gradient(135deg, #1ED760 0%, #17a34a 100%);
}

.gradient-cta:hover {
  background: linear-gradient(135deg, #22ff70 0%, #1ED760 100%);
  box-shadow: 0 8px 24px rgba(30, 215, 96, 0.3);
}
```

---

## Tipografia

### Fonte Principal
**Poppins** - Google Fonts
- Weights: 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)

### Hierarquia
- **H1**: 3rem (48px) / Bold / Leading tight
- **H2**: 2.5rem (40px) / SemiBold / Leading tight
- **H3**: 2rem (32px) / SemiBold / Leading snug
- **Body**: 1rem (16px) / Regular / Leading relaxed
- **Small**: 0.875rem (14px) / Regular / Leading normal

---

## Componentes

### DSButton
Botão premium com 4 variantes e 3 tamanhos.

**Variantes:**
- `primary`: Gradiente verde com hover effect (padrão)
- `secondary`: Fundo escuro com borda verde
- `outline`: Transparente com borda
- `ghost`: Sem fundo, apenas texto

**Tamanhos:**
- `sm`: px-4 py-2 text-sm
- `md`: px-6 py-3 text-base (padrão)
- `lg`: px-8 py-4 text-lg

**Props:**
```typescript
interface DSButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
}
```

**Exemplo:**
```tsx
<DSButton variant="primary" size="lg">
  Criar Projeto
</DSButton>
```

---

### DSCard
Card premium com 4 variantes e suporte a hover.

**Variantes:**
- `default`: Fundo card padrão
- `bordered`: Com borda sutil
- `elevated`: Com sombra elevada
- `gradient`: Com gradiente radial de fundo

**Padding:**
- `none`: Sem padding
- `sm`: p-4
- `md`: p-6 (padrão)
- `lg`: p-8

**Props:**
```typescript
interface DSCardProps {
  variant?: 'default' | 'bordered' | 'elevated' | 'gradient';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}
```

**Exemplo:**
```tsx
<DSCard variant="gradient" hover>
  <h3>Título do Card</h3>
  <p>Conteúdo do card</p>
</DSCard>
```

---

### DSInput
Input premium com suporte a ícones e estados.

**Props:**
```typescript
interface DSInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}
```

**Exemplo:**
```tsx
<DSInput
  label="Nome da Empresa"
  placeholder="Digite o nome"
  leftIcon={<Building className="w-5 h-5" />}
  required
/>
```

---

## Animações

### Fade In Up
```css
.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}
```

### Delays
- `.delay-100`: 100ms
- `.delay-200`: 200ms
- `.delay-300`: 300ms
- `.delay-500`: 500ms

---

## Espaçamento

Seguimos o sistema de espaçamento do Tailwind CSS (múltiplos de 4px):
- **xs**: 0.5rem (8px)
- **sm**: 1rem (16px)
- **md**: 1.5rem (24px)
- **lg**: 2rem (32px)
- **xl**: 3rem (48px)
- **2xl**: 4rem (64px)

---

## Bordas

- **Radius padrão**: 0.65rem (10.4px)
- **Cards**: rounded-xl (12px)
- **Buttons**: rounded-lg (8px)
- **Inputs**: rounded-lg (8px)

---

## Sombras

```css
/* Sombra Elevada */
shadow-2xl

/* Sombra com Primary */
shadow-2xl shadow-primary/10

/* Hover Effect */
hover:shadow-2xl hover:shadow-primary/10
```

---

## Boas Práticas

1. **Sempre use os componentes do DS** em vez de criar novos estilos inline
2. **Mantenha consistência** nas cores, tipografia e espaçamentos
3. **Use gradientes com moderação** para manter a sofisticação
4. **Priorize acessibilidade** com contraste adequado (WCAG AA)
5. **Teste em dark mode** - é nosso tema padrão

---

## Roadmap

- [ ] Adicionar DSSelect (dropdown customizado)
- [ ] Adicionar DSTextarea
- [ ] Adicionar DSBadge
- [ ] Adicionar DSModal
- [ ] Adicionar DSTooltip
- [ ] Criar Storybook para documentação visual
