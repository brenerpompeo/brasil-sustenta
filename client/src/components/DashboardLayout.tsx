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
  const defaultAvatarInitials = userName
    ? userName.substring(0, 2).toUpperCase()
    : "US";

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
          "relative flex w-full items-center gap-4 rounded-[1.25rem] border px-4 py-3.5 text-left text-[13.5px] font-bold transition-all",
          isActive
            ? `${theme.activeText || "text-[#00FF85]"} ${theme.activeBg || "bg-[#00FF85]/10"} ${theme.activeBorder || "border-[#00FF85]"}`
            : "border-black/8 text-foreground/55 hover:border-black/12 hover:bg-black/[0.03] hover:text-foreground",
          disabled &&
            "cursor-not-allowed opacity-45 hover:border-black/8 hover:bg-transparent hover:text-foreground/55"
        )}
      >
        <item.icon
          className={cn("h-4 w-4", isActive ? "opacity-100" : "opacity-50")}
        />
        <span className="min-w-0 flex-1 truncate">{item.label}</span>
        {isActive ? (
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        ) : null}
      </button>
    );
  };

  const sidebarContent = (
    <>
      <div className="border-b border-black/8 px-8 pb-8 pt-8 text-left">
        <div className="font-display text-2xl font-black leading-[1] tracking-tighter text-foreground italic">
          {workspaceTitle}
        </div>
        <div className="mt-3 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
          {workspaceSubtitle}
        </div>
      </div>

      <ScrollArea className="flex-1 px-4 py-8">
        <div className="space-y-1">
          <div className="px-4 pb-4 pt-1 text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30">
            {menuSection1Title}
          </div>
          {menuItems1.map(renderSidebarButton)}

          {menuSection2Title && menuItems2 && menuItems2.length > 0 ? (
            <>
              <div className="px-4 pb-4 pt-8 text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30">
                {menuSection2Title}
              </div>
              {menuItems2.map(renderSidebarButton)}
            </>
          ) : null}
        </div>
      </ScrollArea>

      <div className="mt-auto border-t border-black/8 bg-white p-6">
        <div className="rounded-[1.5rem] border border-black/8 bg-secondary/50 p-5 transition-all hover:border-primary/30 hover:bg-primary/5">
          <div className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-foreground/35">
            {personaTitle}
          </div>
          <div className="font-display text-[16px] font-bold tracking-tight text-foreground italic">
            {personaSubtitle}
          </div>
        </div>

        <div className="mt-6 flex items-center gap-4 px-1">
          <div className="relative">
            <Avatar className="h-10 w-10 border border-black/10 bg-white text-foreground shadow-sm">
              {userAvatar ? (
                <AvatarImage src={userAvatar} alt={userName || undefined} />
              ) : (
                <AvatarFallback className="bg-gradient-to-br from-primary to-sky text-[10px] font-black tracking-tighter text-foreground">
                  {defaultAvatarInitials}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[14px] font-black tracking-tight text-foreground">
              {userName}
            </div>
            <div className="truncate text-[10px] font-black uppercase tracking-widest text-foreground/40">
              {userDescription}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div
      className={cn(
        "flex min-h-screen bg-background text-foreground font-body",
        theme.pageSelectionTheme || ""
      )}
    >
      <nav className="sticky top-0 hidden h-screen min-w-[280px] flex-col overflow-hidden border-r border-black/8 bg-white lg:flex">
        {sidebarContent}
      </nav>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="sticky top-0 z-40 border-b border-black/8 bg-white/95 px-4 py-3 backdrop-blur-xl lg:hidden">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="truncate font-display text-lg font-black tracking-tight text-foreground italic">
                {workspaceTitle}
              </div>
              <div className="truncate text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40">
                {personaSubtitle}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Avatar className="h-9 w-9 border border-black/10 bg-white text-foreground">
                {userAvatar ? (
                  <AvatarImage src={userAvatar} alt={userName || undefined} />
                ) : (
                  <AvatarFallback className="bg-gradient-to-br from-primary to-sky text-[10px] font-black tracking-tighter text-foreground">
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
                    className="border-black/10 bg-white text-foreground hover:bg-secondary hover:text-foreground"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-[310px] border-r border-black/8 bg-white p-0 text-foreground"
                >
                  <SheetHeader className="sr-only">
                    <SheetTitle>Navegacao do dashboard</SheetTitle>
                    <SheetDescription>
                      Menu principal do workspace.
                    </SheetDescription>
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
