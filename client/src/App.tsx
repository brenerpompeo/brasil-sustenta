import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import AnalyticsScript from "./components/AnalyticsScript";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
const LoginHub = lazy(() => import("./pages/LoginHub"));
const LoginEmpresa = lazy(() => import("./pages/LoginEmpresa"));
const LoginJovem = lazy(() => import("./pages/LoginJovem"));
const LoginUniversidade = lazy(() => import("./pages/LoginUniversidade"));
const PerfilEmpresa = lazy(() => import("./pages/PerfilEmpresa"));
const PerfilJovem = lazy(() => import("./pages/PerfilJovem"));
const PerfilUniversidade = lazy(() => import("./pages/PerfilUniversidade"));
const DashboardEmpresa = lazy(() => import("./pages/DashboardEmpresa"));
const DashboardJovem = lazy(() => import("./pages/DashboardJovem"));
const DashboardUniversidade = lazy(() => import("./pages/DashboardUniversidade"));
const ParaEmpresas = lazy(() => import("./pages/ParaEmpresas"));
const ParaJovens = lazy(() => import("./pages/ParaJovens"));
const ParaUniversidades = lazy(() => import("./pages/ParaUniversidades"));
const Comunidade = lazy(() => import("./pages/Comunidade"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminUsuarios = lazy(() => import("./pages/admin/Usuarios"));
const AdminEmpresas = lazy(() => import("./pages/admin/Empresas"));
const AdminTalentos = lazy(() => import("./pages/admin/Talentos"));
const AdminUniversidades = lazy(() => import("./pages/admin/Universidades"));
const AdminProjetos = lazy(() => import("./pages/admin/Projetos"));
const AdminSquads = lazy(() => import("./pages/admin/Squads"));
const AdminBlog = lazy(() => import("./pages/admin/Blog"));
const AdminEventos = lazy(() => import("./pages/admin/Eventos"));
const AdminArtigos = lazy(() => import("./pages/admin/Artigos"));
const AdminRelatorios = lazy(() => import("./pages/admin/Relatorios"));
const AdminMateriais = lazy(() => import("./pages/admin/Materiais"));
const Oportunidades = lazy(() => import("./pages/Oportunidades"));
const Blog = lazy(() => import("./pages/Blog"));
const Eventos = lazy(() => import("./pages/Eventos"));
const Artigos = lazy(() => import("./pages/Artigos"));
const Relatorios = lazy(() => import("./pages/Relatorios"));
const Biblioteca = lazy(() => import("./pages/Biblioteca"));
const Manifesto = lazy(() => import("./pages/Manifesto"));

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={LoginHub} />
      <Route path="/login/empresa" component={LoginEmpresa} />
      <Route path="/login/jovem" component={LoginJovem} />
      <Route path="/login/universidade" component={LoginUniversidade} />
      <Route path="/perfil/empresa" component={PerfilEmpresa} />
      <Route path="/perfil/jovem" component={PerfilJovem} />
      <Route path="/perfil/universidade" component={PerfilUniversidade} />
      <Route path="/dashboard/empresa" component={DashboardEmpresa} />
      <Route path="/dashboard/jovem" component={DashboardJovem} />
      <Route path="/dashboard/universidade" component={DashboardUniversidade} />
      <Route path="/para-empresas" component={ParaEmpresas} />
      <Route path="/para-jovens" component={ParaJovens} />
      <Route path="/para-universidades" component={ParaUniversidades} />
      <Route path="/comunidade" component={Comunidade} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/usuarios" component={AdminUsuarios} />
      <Route path="/admin/empresas" component={AdminEmpresas} />
      <Route path="/admin/talentos" component={AdminTalentos} />
      <Route path="/admin/universidades" component={AdminUniversidades} />
      <Route path="/admin/projetos" component={AdminProjetos} />
      <Route path="/admin/squads" component={AdminSquads} />
      <Route path="/admin/blog" component={AdminBlog} />
      <Route path="/admin/eventos" component={AdminEventos} />
      <Route path="/admin/artigos" component={AdminArtigos} />
      <Route path="/admin/relatorios" component={AdminRelatorios} />
      <Route path="/admin/materiais" component={AdminMateriais} />
      <Route path="/oportunidades" component={Oportunidades} />
      <Route path="/blog" component={Blog} />
      <Route path="/eventos" component={Eventos} />
      <Route path="/artigos" component={Artigos} />
      <Route path="/relatorios" component={Relatorios} />
      <Route path="/biblioteca" component={Biblioteca} />
      <Route path="/manifesto" component={Manifesto} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

import { SEO } from "./components/SEO";

function RouteLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 text-center text-foreground">
      <div>
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
        <p className="font-body text-sm uppercase tracking-[0.24em] text-muted-foreground">
          Carregando experi&ecirc;ncia...
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" switchable={false}>
        <TooltipProvider>
          <SEO />
          <AnalyticsScript />
          <Toaster />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-primary-foreground"
          >
            Pular para o conte&uacute;do
          </a>
          <div id="main-content">
            <Suspense fallback={<RouteLoading />}>
              <Router />
            </Suspense>
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
