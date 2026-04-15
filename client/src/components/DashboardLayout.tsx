import { useState } from "react";
import { Menu, type LucideIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export type SidebarItem = {
  id: string;
  label: string;
  icon: LucideIcon;
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
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const defaultAvatarInitials = userName ? userName.substring(0, 2).toUpperCase() : "US";

  const renderSidebarButton = (item: SidebarItem) => {
    const isActive = activeTab === item.id;
    const disabled = !item.onClick;

    return (
      <button
        key={item.id}
        type="button"
        onClick={() => {
          if (!item.onClick) return;
          item.onClick();
          setMobileNavOpen(false);
        }}
        disabled={disabled}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "relative flex w-full items-center gap-4 rounded-r-2xl border-l-2 px-4 py-3.5 text-left text-[13.5px] font-bold transition-all",
          isActive
            ? `${theme.activeText || "text-[#00FF85]"} ${theme.activeBg || "bg-[#00FF85]/10"} ${theme.activeBorder || "border-[#00FF85]"}`
            : "border-transparent text-white/45 hover:border-white/10 hover:bg-white/5 hover:text-white/90",
          disabled && "cursor-not-allowed opacity-45 hover:border-transparent hover:bg-transparent hover:text-white/45"
        )}
      >
        <item.icon className={cn("h-4 w-4", isActive ? "opacity-100" : "opacity-50")} />
        <span className="min-w-0 flex-1 truncate">{item.label}</span>
        {isActive ? <span className="h-1.5 w-1.5 rounded-full bg-primary" /> : null}
      </button>
    );
  };

  const sidebarContent = (
    <>
      <div className={cn("border-b px-8 pb-8 pt-8 text-left", theme.navBorder || "border-white/10")}>
        <div className="font-display text-2xl font-black leading-[1] tracking-tighter text-white italic">
          {workspaceTitle}
        </div>
        <div
          className={cn(
            "mt-3 text-[10px] font-black uppercase tracking-[0.3em]",
            theme.brandSubtitleText || "text-white/40"
          )}
        >
          {workspaceSubtitle}
        </div>
      </div>

      <ScrollArea className="flex-1 px-4 py-8">
        <div className="space-y-1">
          <div className="px-4 pb-4 pt-1 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
            {menuSection1Title}
          </div>
          {menuItems1.map(renderSidebarButton)}

          {menuSection2Title && menuItems2 && menuItems2.length > 0 ? (
            <>
              <div className="px-4 pb-4 pt-8 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
                {menuSection2Title}
              </div>
              {menuItems2.map(renderSidebarButton)}
            </>
          ) : null}
        </div>
      </ScrollArea>

      <div className="mt-auto border-t border-white/5 bg-[#0D0D0D]/70 p-6 backdrop-blur-md">
        <div className="rounded-2xl border border-white/5 bg-white/5 p-5 transition-all hover:border-primary/30 hover:bg-white/10">
          <div className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
            {personaTitle}
          </div>
          <div className="font-display text-[16px] font-bold tracking-tight text-white italic">
            {personaSubtitle}
          </div>
        </div>

        <div className="mt-6 flex items-center gap-4 px-1">
          <div className="relative">
            <Avatar className="h-10 w-10 border border-white/10 bg-white/5 text-white shadow-xl">
              {userAvatar ? (
                <AvatarImage src={userAvatar} alt={userName || undefined} />
              ) : (
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary-3 text-[10px] font-black tracking-tighter">
                  {defaultAvatarInitials}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#0A0A0A] bg-[#00FF85]" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[14px] font-black tracking-tight text-white">{userName}</div>
            <div className="truncate text-[10px] font-black uppercase tracking-widest text-white/40">
              {userDescription}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className={cn("flex min-h-screen bg-background text-foreground font-body", theme.pageSelectionTheme || "")}>
      <nav
        className={cn(
          "sticky top-0 hidden h-screen min-w-[280px] flex-col overflow-hidden border-r lg:flex",
          theme.navBg || "bg-[#0A0A0A]",
          theme.navBorder || "border-white/10"
        )}
      >
        {sidebarContent}
      </nav>

      <div className="flex min-w-0 flex-1 flex-col">
        <div
          className={cn(
            "sticky top-0 z-40 border-b px-4 py-3 lg:hidden",
            theme.navBg || "bg-[#0A0A0A]",
            theme.navBorder || "border-white/10"
          )}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="truncate font-display text-lg font-black tracking-tight text-white italic">
                {workspaceTitle}
              </div>
              <div className="truncate text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                {personaSubtitle}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Avatar className="h-9 w-9 border border-white/10 bg-white/5 text-white">
                {userAvatar ? (
                  <AvatarImage src={userAvatar} alt={userName || undefined} />
                ) : (
                  <AvatarFallback className="bg-gradient-to-br from-primary to-primary-3 text-[10px] font-black tracking-tighter">
                    {defaultAvatarInitials}
                  </AvatarFallback>
                )}
              </Avatar>

              <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
                <SheetTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    aria-label="Abrir menu do dashboard"
                    className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className={cn("w-[310px] border-r p-0 text-white", theme.navBg || "bg-[#0A0A0A]", theme.navBorder || "border-white/10")}
                >
                  <SheetHeader className="sr-only">
                    <SheetTitle>Navegacao do dashboard</SheetTitle>
                    <SheetDescription>Menu principal do workspace.</SheetDescription>
                  </SheetHeader>
                  <div className="flex h-full flex-col">{sidebarContent}</div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        <main
          className={cn(
            "w-full min-w-0 flex-1 overflow-x-hidden",
            theme.mainPaddingClass || "p-4 sm:p-6 lg:p-10 xl:p-12"
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
