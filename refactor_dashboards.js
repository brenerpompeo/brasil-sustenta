const fs = require('fs');

function refactorDashboard(file, userType) {
  let content = fs.readFileSync(file, 'utf8');

  if (content.includes('DashboardLayout')) {
    console.log(`${file} already uses DashboardLayout.`);
    return;
  }

  // 1. Add import
  const importStr = `import DashboardLayout, { DashboardTheme, SidebarItem } from "@/components/DashboardLayout";\n`;
  content = content.replace(/import \{ useState \} from "react";/, `import { useState } from "react";\n${importStr}`);

  // 2. Remove navItemClass
  content = content.replace(/const navItemClass = \(id: string\)[^}]+};\n?/g, '');
  content = content.replace(/const navItemClass = \(id: string\) =>\s+`[^`]+`;\n?/g, '');

  let themeObj = '';
  let menuDefs = '';
  let layoutProps = '';

  if (userType === 'jovem') {
    themeObj = `
  const theme: DashboardTheme = {
    navBg: "bg-[#0A1128]", navBorder: "border-[#152140]",
    brandHighlightText: "text-sky-1 drop-shadow-[0_0_8px_rgba(56,189,248,0.3)]", brandSubtitleText: "text-sky-1/60",
    activeText: "text-sky-1", activeBg: "bg-white/5", activeBorder: "border-sky-1",
    personaOuterBorder: "border-[#1E3A8A40]", personaGradientFrom: "from-[#0F172A]", personaGradientTo: "to-[#1E3A8A20]",
    personaTitleText: "text-sky-1", personaSubtitleText: "text-white",
    avatarRing: "ring-sky-1/30", avatarBg: "bg-[#1E3A8A]", avatarText: "text-sky-1",
    pageSelectionTheme: "selection:bg-sky selection:text-white"
  };`;
    menuDefs = `
  const menuItems1: SidebarItem[] = [
    { id: "overview", label: "Visão Geral", icon: Home, onClick: () => setActiveTab("overview") },
    { id: "oportunidades", label: "Oportunidades", icon: Compass, onClick: () => setActiveTab("oportunidades") },
    { id: "candidaturas", label: "Candidaturas", icon: FileText, onClick: () => setActiveTab("candidaturas") },
    { id: "squads", label: "Squads", icon: Zap, onClick: () => setActiveTab("squads") }
  ];
  const menuItems2: SidebarItem[] = [
    { id: "perfil", label: "Perfil Profissional", icon: User },
    { id: "config", label: "Conta", icon: Settings }
  ];`;
    layoutProps = `
      theme={theme}
      workspaceTitle={<>Brasil<br /><span className="text-sky-1 text-2xl drop-shadow-[0_0_8px_rgba(56,189,248,0.3)]">Sustenta</span></>}
      workspaceSubtitle="Portal do Talento"
      menuSection1Title="Menu Principal" menuItems1={menuItems1}
      menuSection2Title="Meu Desenvolvimento" menuItems2={menuItems2}
      personaTitle="Céu Universitário" personaSubtitle="Pronto para Impactar"
      userName={userName} userDescription={course} activeTab={activeTab}
    `;
  } else if (userType === 'empresa') {
    themeObj = `
  const theme: DashboardTheme = {
    navBg: "bg-ink", navBorder: "border-white/5",
    brandHighlightText: "text-leaf-3", brandSubtitleText: "text-white/35",
    activeText: "text-white", activeBg: "bg-white/5", activeBorder: "border-leaf-3",
    personaOuterBorder: "border-transparent", personaGradientFrom: "from-[#1C6B3A80]", personaGradientTo: "to-[#2D965533]",
    personaTitleText: "text-white/50", personaSubtitleText: "text-white",
    avatarRing: "ring-white/10", avatarBg: "bg-leaf-5", avatarText: "text-leaf",
  };`;
    menuDefs = `
  const menuItems1: SidebarItem[] = [
    { id: "overview", label: "Visão Geral", icon: Home, onClick: () => { setActiveTab("overview"); setShowCreateForm(false); } },
    { id: "projetos", label: "Meus Projetos", icon: Briefcase, onClick: () => { setActiveTab("projetos"); setShowCreateForm(false); } },
    { id: "candidatos", label: "Candidatos", icon: Users, onClick: () => { setActiveTab("candidatos"); setShowCreateForm(false); } },
    { id: "squads", label: "Meus Squads", icon: Zap, onClick: () => { setActiveTab("squads"); setShowCreateForm(false); } }
  ];
  const menuItems2: SidebarItem[] = [
    { id: "perfil", label: "Perfil", icon: User },
    { id: "config", label: "Configurações", icon: Settings }
  ];`;
    layoutProps = `
      theme={theme}
      workspaceTitle={<>Brasil<br /><span className="text-leaf-3">Sustenta</span></>}
      workspaceSubtitle="Workspace Corporativo"
      menuSection1Title="Menu" menuItems1={menuItems1}
      menuSection2Title="Conta" menuItems2={menuItems2}
      personaTitle="Persona Ativa" personaSubtitle="Empresa ESG"
      userName={companyName} userDescription="Empresa" activeTab={activeTab}
    `;
  } else if (userType === 'universidade') {
    themeObj = `
  const theme: DashboardTheme = {
    navBg: "bg-[#2E1A47]", navBorder: "border-white/5",
    brandHighlightText: "text-violet-3", brandSubtitleText: "text-violet-3/60",
    activeText: "text-white", activeBg: "bg-white/5", activeBorder: "border-violet-3",
    personaOuterBorder: "border-transparent", personaGradientFrom: "from-[#4C2A75]", personaGradientTo: "to-[#2E1A47]",
    personaTitleText: "text-violet-3/80", personaSubtitleText: "text-white",
    avatarRing: "ring-white/10", avatarBg: "bg-violet-5", avatarText: "text-violet",
  };`;
    menuDefs = `
  const menuItems1: SidebarItem[] = [
    { id: "overview", label: "Visão Geral", icon: Home, onClick: () => setActiveTab("overview") },
    { id: "alunos", label: "Alunos Participantes", icon: Users, onClick: () => setActiveTab("alunos") },
    { id: "relatorios", label: "Relatórios de Extensão", icon: Briefcase, onClick: () => setActiveTab("relatorios") },
    { id: "convenio", label: "Convênio", icon: FileText, onClick: () => setActiveTab("convenio") }
  ];
  const menuItems2: SidebarItem[] = [
    { id: "perfil", label: "Perfil da Instituição", icon: User },
    { id: "config", label: "Configurações", icon: Settings }
  ];`;
    layoutProps = `
      theme={theme}
      workspaceTitle={<>Brasil<br /><span className="text-violet-3">Sustenta</span></>}
      workspaceSubtitle="Portal da Universidade"
      menuSection1Title="Menu Principal" menuItems1={menuItems1}
      menuSection2Title="Conta" menuItems2={menuItems2}
      personaTitle="Persona Ativa" personaSubtitle="Instituição Parceira"
      userName={userName} userDescription="Universidade" activeTab={activeTab}
    `;
  }

  // Find return statement start
  const returnIndex = content.indexOf('return (');
  if (returnIndex === -1) return;

  const contentBeforeReturn = content.substring(0, returnIndex);
  const contentAfterReturn = content.substring(returnIndex);

  let newContentAfterReturn = contentAfterReturn.replace(/<div className="flex min-h-screen[^>]*>/, `<DashboardLayout ${layoutProps}>`);
  
  // Remove nav completely
  newContentAfterReturn = newContentAfterReturn.replace(/<nav[\s\S]*?<\/nav>/, '');
  newContentAfterReturn = newContentAfterReturn.replace(/<main className="flex-1 overflow-x-hidden.*?>/, '');
  newContentAfterReturn = newContentAfterReturn.replace(/<\/main>/, '');
  newContentAfterReturn = newContentAfterReturn.replace(/<\/div>\s*$/, '\n    </DashboardLayout>\n  ');

  const finalContent = contentBeforeReturn + themeObj + '\n' + menuDefs + '\n  ' + newContentAfterReturn;
  fs.writeFileSync(file, finalContent, 'utf8');
  console.log(`Refactored ${file}`);
}

refactorDashboard('client/src/pages/DashboardJovem.tsx', 'jovem');
refactorDashboard('client/src/pages/DashboardEmpresa.tsx', 'empresa');
// refactorDashboard('client/src/pages/DashboardUniversidade.tsx', 'universidade');
