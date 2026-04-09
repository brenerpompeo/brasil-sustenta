def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Apply general Dark Premium replacements
    content = content.replace('bg-white/70', 'bg-card')
    content = content.replace('bg-white/50', 'bg-background')
    content = content.replace('bg-white', 'bg-card')
    
    content = content.replace('border-paper-3', 'border-border')
    content = content.replace('border-paper', 'border-border')
    
    content = content.replace('text-ink-4', 'text-muted-foreground')
    content = content.replace('text-ink-3', 'text-muted-foreground')
    content = content.replace('text-ink-2', 'text-muted-foreground')
    content = content.replace('text-ink', 'text-foreground')

    content = content.replace('text-sky-1', 'text-primary')
    content = content.replace('bg-sky-1', 'bg-primary')
    content = content.replace('text-sky', 'text-primary')
    content = content.replace('bg-sky/10', 'bg-primary/10')
    content = content.replace('bg-sky/5', 'bg-primary/5')
    content = content.replace('bg-sky', 'bg-primary')

    content = content.replace('bg-violet/10', 'bg-secondary/20')
    content = content.replace('text-violet-2', 'text-secondary')
    content = content.replace('focus:border-violet-2', 'focus:border-primary')
    content = content.replace('focus:border-sky-1', 'focus:border-primary')
    content = content.replace('focus:border-ink', 'focus:border-primary')

    content = content.replace('backdrop-blur-xl', '') # Remove blur since background is dark solid

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

process_file('client/src/components/FormPerfilTalento.tsx')
process_file('client/src/components/FormularioCriarProjeto.tsx')
