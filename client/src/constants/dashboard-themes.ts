import type { DashboardTheme } from "@/components/DashboardLayout";

/**
 * Brasil Sustenta — Dashboard Themes
 *
 * Constantes unificadas de tema para os 3 dashboards persona (empresa, jovem, universidade).
 * Mapeia cada persona para a cor oficial do design system (leaf, sun, atlantic).
 *
 * Substitui o pattern onde cada dashboard inventava seu próprio tema inline,
 * causando divergência visual entre personas.
 *
 * Filosofia: Editorial Soberano — papel cremoso + ink + acento persona.
 */

/**
 * Dashboard Empresa (B2B) — acento verde/leaf.
 * Cor principal: #00603a (leaf sóbrio) + #00a86b (leaf-bright para highlights).
 */
export const dashboardEmpresaTheme: DashboardTheme = {
  navBg: "bg-[color:var(--color-paper)]",
  navBorder: "border-[color:var(--color-border)]",
  brandHighlightText: "text-[color:var(--color-leaf)]",
  brandSubtitleText: "text-[color:var(--color-ink-3)]",
  activeText: "text-[color:var(--color-leaf)]",
  activeBg: "bg-[color:var(--color-leaf-soft)]",
  activeBorder: "border-[color:var(--color-leaf)]",
  personaOuterBorder: "border-[color:var(--color-leaf)]/30",
  personaGradientFrom: "from-[color:var(--color-leaf-soft)]",
  personaGradientTo: "to-[color:var(--color-paper-2)]",
  personaTitleText: "text-[color:var(--color-leaf-deep)]",
  personaSubtitleText: "text-[color:var(--color-ink-3)]",
  avatarRing: "ring-[color:var(--color-leaf)]",
  avatarBg: "bg-[color:var(--color-leaf)]",
  avatarText: "text-white",
  pageSelectionTheme: "selection:bg-[color:var(--color-leaf)] selection:text-white",
  mainPaddingClass: "p-6 md:p-10",
};

/**
 * Dashboard Jovem — acento amarelo/sun + leaf (mix energético).
 * Cor principal: #f4c430 (sun) + #00a86b (leaf para CTAs).
 */
export const dashboardJovemTheme: DashboardTheme = {
  navBg: "bg-[color:var(--color-paper)]",
  navBorder: "border-[color:var(--color-border)]",
  brandHighlightText: "text-[color:var(--color-sun-deep)]",
  brandSubtitleText: "text-[color:var(--color-ink-3)]",
  activeText: "text-[color:var(--color-sun-deep)]",
  activeBg: "bg-[color:var(--color-sun-soft)]",
  activeBorder: "border-[color:var(--color-sun-deep)]",
  personaOuterBorder: "border-[color:var(--color-sun-deep)]/30",
  personaGradientFrom: "from-[color:var(--color-sun-soft)]",
  personaGradientTo: "to-[color:var(--color-paper-2)]",
  personaTitleText: "text-[color:var(--color-sun-deep)]",
  personaSubtitleText: "text-[color:var(--color-ink-3)]",
  avatarRing: "ring-[color:var(--color-sun-deep)]",
  avatarBg: "bg-[color:var(--color-sun)]",
  avatarText: "text-[color:var(--color-ink)]",
  pageSelectionTheme: "selection:bg-[color:var(--color-sun)] selection:text-[color:var(--color-ink)]",
  mainPaddingClass: "p-6 md:p-10",
};

/**
 * Dashboard Universidade (IES) — acento argila/clay.
 * Cor principal: #c45a3a (clay) — editorial, institutional.
 */
export const dashboardUniversidadeTheme: DashboardTheme = {
  navBg: "bg-[color:var(--color-paper)]",
  navBorder: "border-[color:var(--color-border)]",
  brandHighlightText: "text-[color:var(--color-clay)]",
  brandSubtitleText: "text-[color:var(--color-ink-3)]",
  activeText: "text-[color:var(--color-clay-deep)]",
  activeBg: "bg-[color:var(--color-clay-soft)]",
  activeBorder: "border-[color:var(--color-clay)]",
  personaOuterBorder: "border-[color:var(--color-clay)]/30",
  personaGradientFrom: "from-[color:var(--color-clay-soft)]",
  personaGradientTo: "to-[color:var(--color-paper-2)]",
  personaTitleText: "text-[color:var(--color-clay-deep)]",
  personaSubtitleText: "text-[color:var(--color-ink-3)]",
  avatarRing: "ring-[color:var(--color-clay)]",
  avatarBg: "bg-[color:var(--color-clay)]",
  avatarText: "text-white",
  pageSelectionTheme: "selection:bg-[color:var(--color-clay)] selection:text-white",
  mainPaddingClass: "p-6 md:p-10",
};

/**
 * Dashboard Admin — tema neutro institucional (ink).
 * Cor principal: #0a0a0a (ink) — máxima sobriedade.
 */
export const dashboardAdminTheme: DashboardTheme = {
  navBg: "bg-[color:var(--color-paper)]",
  navBorder: "border-[color:var(--color-border)]",
  brandHighlightText: "text-[color:var(--color-ink)]",
  brandSubtitleText: "text-[color:var(--color-ink-3)]",
  activeText: "text-[color:var(--color-ink)]",
  activeBg: "bg-[color:var(--color-paper-2)]",
  activeBorder: "border-[color:var(--color-ink)]",
  personaOuterBorder: "border-[color:var(--color-ink)]/30",
  personaGradientFrom: "from-[color:var(--color-paper-2)]",
  personaGradientTo: "to-[color:var(--color-paper)]",
  personaTitleText: "text-[color:var(--color-ink)]",
  personaSubtitleText: "text-[color:var(--color-ink-3)]",
  avatarRing: "ring-[color:var(--color-ink)]",
  avatarBg: "bg-[color:var(--color-ink)]",
  avatarText: "text-white",
  pageSelectionTheme: "selection:bg-[color:var(--color-ink)] selection:text-white",
  mainPaddingClass: "p-6 md:p-10",
};

/**
 * Mapa persona → theme, útil para factory patterns.
 */
export const dashboardThemes = {
  empresa: dashboardEmpresaTheme,
  jovem: dashboardJovemTheme,
  universidade: dashboardUniversidadeTheme,
  admin: dashboardAdminTheme,
} as const;

export type DashboardPersona = keyof typeof dashboardThemes;
