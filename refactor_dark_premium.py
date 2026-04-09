import re

def process_file(filepath, is_jovem):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Update Themes
    if not is_jovem:
        content = re.sub(
            r'const theme: DashboardTheme = \{[\s\S]*?\};',
            '''const theme: DashboardTheme = {
    navBg: "bg-card", navBorder: "border-border",
    brandHighlightText: "text-primary", brandSubtitleText: "text-muted-foreground",
    activeText: "text-primary", activeBg: "bg-primary/10", activeBorder: "border-primary",
    personaOuterBorder: "border-transparent", personaGradientFrom: "from-primary/20", personaGradientTo: "to-primary/5",
    personaTitleText: "text-muted-foreground", personaSubtitleText: "text-foreground",
    avatarRing: "ring-border", avatarBg: "bg-primary/20", avatarText: "text-primary"
  };''',
            content
        )
    else:
        content = re.sub(
            r'const theme: DashboardTheme = \{[\s\S]*?\};',
            '''const theme: DashboardTheme = {
    navBg: "bg-card", navBorder: "border-border",
    brandHighlightText: "text-primary", brandSubtitleText: "text-muted-foreground",
    activeText: "text-primary", activeBg: "bg-primary/10", activeBorder: "border-primary",
    personaOuterBorder: "border-transparent", personaGradientFrom: "from-primary/20", personaGradientTo: "to-primary/5",
    personaTitleText: "text-muted-foreground", personaSubtitleText: "text-foreground",
    avatarRing: "ring-border", avatarBg: "bg-primary/20", avatarText: "text-primary",
    pageSelectionTheme: "selection:bg-primary selection:text-primary-foreground"
  };''',
            content
        )

    # 2. General Token Replacements (from light to dark premium)
    # Backgrounds and borders
    content = content.replace('bg-white', 'bg-card')
    content = content.replace('border-paper-3', 'border-border')
    content = content.replace('bg-paper-2', 'bg-secondary')
    content = content.replace('bg-paper', 'bg-background')
    
    # Typography
    content = content.replace('text-ink-4', 'text-muted-foreground')
    content = content.replace('text-ink-3', 'text-muted-foreground')
    content = content.replace('text-ink-2', 'text-muted-foreground')
    content = content.replace('text-ink', 'text-foreground')
    content = content.replace('text-leaf', 'text-primary')
    content = content.replace('text-leaf-3', 'text-primary')
    content = content.replace('bg-leaf', 'bg-primary')
    content = content.replace('bg-leaf-5', 'bg-primary/20')
    content = content.replace('bg-leaf/10', 'bg-primary/10')
    content = content.replace('shadow-leaf/10', 'shadow-primary/10')
    content = content.replace('shadow-leaf/5', 'shadow-primary/5')
    content = content.replace('border-leaf', 'border-primary')
    content = content.replace('hover:border-leaf', 'hover:border-primary')

    # Specific structural adjustments for Typography Spalter
    content = content.replace('font-display text-4xl leading-none font-black', 'font-display text-4xl leading-none font-black tracking-tighter')
    content = content.replace('font-display text-[2.5rem] leading-[1.1] font-black', 'font-display text-[2.5rem] leading-[1.1] font-black tracking-tighter')
    content = content.replace('font-display text-[2.5rem] font-black', 'font-display text-[2.5rem] font-black tracking-tighter')

    # Specifically for Jovem Sky -> Primary
    if is_jovem:
        content = content.replace('text-sky-1', 'text-primary')
        content = content.replace('bg-sky-1', 'bg-primary')
        content = content.replace('text-sky', 'text-primary')
        content = content.replace('bg-sky', 'bg-primary')
        content = content.replace('bg-[#020617]', 'bg-card')
        content = content.replace('border-[#1E293B]', 'border-border')
        content = content.replace('bg-[#F8FAFC]', 'bg-secondary/50')
        content = content.replace('bg-sky/10', 'bg-primary/10')
        content = content.replace('border-sky/20', 'border-primary/20')
        content = content.replace('hover:shadow-sky-1/25', 'hover:shadow-primary/25')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

process_file('client/src/pages/DashboardEmpresa.tsx', False)
process_file('client/src/pages/DashboardJovem.tsx', True)
print("Dashboards migrated to Dark Premium.")
