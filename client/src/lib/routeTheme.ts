const PRIVATE_THEME_PREFIXES = [
  "/auth",
  "/login",
  "/dashboard",
  "/admin",
  "/perfil",
  "/board",
  "/br360",
];

const PRIVATE_THEME_EXACT = new Set([
  "/para-empresas/publicar",
  "/para-universidades/parceria",
]);

export function isPrivateThemePath(pathname: string) {
  return (
    PRIVATE_THEME_EXACT.has(pathname) ||
    PRIVATE_THEME_PREFIXES.some(
      prefix => pathname === prefix || pathname.startsWith(`${prefix}/`)
    )
  );
}
