import { useAuth } from "@/_core/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLocation } from "wouter";

export type SidebarItem = {
  id: string;
  label: string;
  icon: any;
  onClick?: () => void;
};

export type DashboardTheme = {
  navBg: string;
  navBorder: string;
  brandHighlightText: string;
  brandSubtitleText: string;
  activeText: string;
  activeBg: string;
  activeBorder: string;
  personaOuterBorder: string;
  personaGradientFrom: string;
  personaGradientTo: string;
  personaTitleText: string;
  personaSubtitleText: string;
  avatarRing: string;
  avatarBg: string;
  avatarText: string;
  pageSelectionTheme?: string;
  mainPaddingClass?: string;
};

export type DashboardLayoutProps = {
  theme: DashboardTheme;
  workspaceTitle: React.ReactNode;
  workspaceSubtitle: React.ReactNode;
  menuSection1Title: string;
  menuItems1: SidebarItem[];
  menuSection2Title?: string;
  menuItems2?: SidebarItem[];
  personaTitle: string;
  personaSubtitle: string;
  userName?: string | null;
  userAvatar?: string | null;
  userDescription?: string | null;
  activeTab: string;
  children: React.ReactNode;
  onNavigateMap?: Partial<Record<string, string>>;
};

export default function DashboardLayout({
  theme,
  workspaceTitle,
  workspaceSubtitle,
  menuSection1Title,
  menuItems1,
  menuSection2Title,
  menuItems2,
  personaTitle,
  personaSubtitle,
  userName,
  userAvatar,
  userDescription,
  activeTab,
  children,
}: DashboardLayoutProps) {
  
  const navItemClass = (id: string) =>
    `flex items-center gap-3 px-5 py-3 text-sm font-semibold cursor-pointer transition-all border-l-2 relative ${
      activeTab === id
        ? `${theme.activeText} ${theme.activeBg} ${theme.activeBorder}`
        : "text-white/50 border-transparent hover:text-white/90 hover:bg-white/5 hover:border-white/20"
    }`;

  const defaultAvatarInitials = userName ? userName.substring(0, 2).toUpperCase() : "US";

  return (
    <div className={`flex min-h-screen bg-background text-foreground font-body ${theme.pageSelectionTheme || ''}`}>
      {/* ── LEFT RAIL: UNIFIED SIDEBAR ── */}
      <nav className={`w-[240px] min-w-[240px] ${theme.navBg} ${theme.navBorder} sticky top-0 h-screen flex flex-col overflow-hidden`}>
        
        {/* Brand */}
        <div className={`pt-8 px-6 pb-6 border-b ${theme.navBorder} text-center md:text-left`}>
          <div className="font-display text-xl font-black text-white tracking-tight leading-tight">
            {workspaceTitle}
          </div>
          <div className={`text-[11px] ${theme.brandSubtitleText} mt-1.5 tracking-[0.2em] font-black uppercase`}>
            {workspaceSubtitle}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 py-6 overflow-y-auto w-full px-2">
          {/* Section 1 */}
          <div className="text-[11px] font-bold tracking-widest uppercase text-white/30 px-5 pt-1 pb-3">
            {menuSection1Title}
          </div>
          
          {menuItems1.map((item) => (
            <div key={item.id} className={navItemClass(item.id)} onClick={item.onClick}>
              <item.icon className="w-4 h-4 opacity-80" /> {item.label}
            </div>
          ))}

          {/* Section 2 */}
          {menuSection2Title && menuItems2 && menuItems2.length > 0 && (
            <>
              <div className="text-[11px] font-bold tracking-widest uppercase text-white/30 px-5 pt-8 pb-3">
                {menuSection2Title}
              </div>
              {menuItems2.map((item) => (
                <div key={item.id} className={navItemClass(item.id)} onClick={item.onClick}>
                  <item.icon className="w-4 h-4 opacity-80" /> {item.label}
                </div>
              ))}
            </>
          )}
        </div>

        {/* Persona Pill */}
        <div className="p-4 pb-6 mt-auto">
          <div className={`rounded-2xl p-4 cursor-pointer transition-all border ${theme.personaOuterBorder} bg-gradient-to-br ${theme.personaGradientFrom} ${theme.personaGradientTo} hover:border-white/20`}>
            <div className={`text-[11px] font-bold tracking-[0.15em] uppercase ${theme.personaTitleText} mb-1`}>
              {personaTitle}
            </div>
            <div className={`font-display text-[15px] font-semibold ${theme.personaSubtitleText}`}>
              {personaSubtitle}
            </div>
          </div>
          
          <div className="flex items-center gap-3 mt-5 px-1">
            <Avatar className={`w-9 h-9 ring-2 ${theme.avatarRing} ${theme.avatarBg} ${theme.avatarText}`}>
              {userAvatar ? (
                <AvatarImage src={userAvatar} alt={userName || undefined} />
              ) : (
                <AvatarFallback className="text-xs font-bold font-display">
                  {defaultAvatarInitials}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-white truncate">{userName}</div>
              <div className="text-[11px] text-white/50 truncate font-medium">{userDescription}</div>
            </div>
          </div>
        </div>
      </nav>

      {/* ── MAIN CONTENT ── */}
      <main className={`flex-1 overflow-x-hidden ${theme.mainPaddingClass || 'p-8 md:p-12 max-w-[1200px]'}`}>
        {children}
      </main>
    </div>
  );
}
