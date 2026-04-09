const fs = require('fs');
function fix(file) {
  let content = fs.readFileSync(file, 'utf8');

  // Dashboard Empresa Theme
  content = content.replace(/navBg: "bg-ink", navBorder: "border-white\/5",/g, 'navBg: "bg-card", navBorder: "border-border",');
  content = content.replace(/activeBg: "bg-white\/5", activeBorder: "border-leaf-3",/g, 'activeBg: "bg-primary/10", activeBorder: "border-primary",');
  content = content.replace(/avatarBg: "bg-leaf-5", avatarText: "text-leaf"/g, 'avatarBg: "bg-primary/20", avatarText: "text-primary"');
  content = content.replace(/activeText: "text-white"/g, 'activeText: "text-primary"');
  content = content.replace(/text-leaf-3/g, 'text-primary');

  // Dashboard Jovem Theme
  content = content.replace(/navBg: "bg-\[#0A1128\]", navBorder: "border-\[#152140\]",/g, 'navBg: "bg-card", navBorder: "border-border",');
  content = content.replace(/text-sky-1/g, 'text-primary');
  content = content.replace(/bg-sky-1/g, 'bg-primary');
  content = content.replace(/bg-sky\/10/g, 'bg-primary/10');
  content = content.replace(/text-sky/g, 'text-primary');

  // General Replacements
  content = content.replace(/bg-white/g, 'bg-card');
  content = content.replace(/border-paper-3/g, 'border-border');
  content = content.replace(/bg-paper-2/g, 'bg-secondary');
  content = content.replace(/bg-paper/g, 'bg-background');
  
  content = content.replace(/text-ink-4/g, 'text-muted-foreground');
  content = content.replace(/text-ink-3/g, 'text-muted-foreground/80');
  content = content.replace(/text-ink-2/g, 'text-muted-foreground');
  content = content.replace(/text-ink/g, 'text-foreground');

  // Título e Fontes
  content = content.replace(/font-display text-4xl leading-none font-black/g, 'font-display text-4xl leading-none font-black tracking-tighter');
  content = content.replace(/font-display text-\[2\.5rem\] leading-\[1\.1\] font-black/g, 'font-display text-[2.5rem] leading-[1.1] font-black tracking-tighter');

  content = content.replace(/bg-\[#020617\]/g, 'bg-card');
  content = content.replace(/border-\[#1E293B\]/g, 'border-border');
  
  fs.writeFileSync(file, content, 'utf8');
  console.log('Fixed', file);
}

fix('client/src/pages/DashboardEmpresa.tsx');
fix('client/src/pages/DashboardJovem.tsx');
