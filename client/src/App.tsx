import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import LoginEmpresa from "./pages/LoginEmpresa";
import LoginJovem from "./pages/LoginJovem";
import LoginUniversidade from "./pages/LoginUniversidade";
import PerfilEmpresa from "./pages/PerfilEmpresa";
import PerfilJovem from "./pages/PerfilJovem";
import PerfilUniversidade from "./pages/PerfilUniversidade";
import DashboardEmpresa from "./pages/DashboardEmpresa";
import DashboardJovem from "./pages/DashboardJovem";
import DashboardUniversidade from "./pages/DashboardUniversidade";
import ParaEmpresas from "./pages/ParaEmpresas";
import ParaJovens from './pages/ParaJovens';
import ParaUniversidades from './pages/ParaUniversidades';
import Comunidade from './pages/Comunidade';
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsuarios from "./pages/admin/Usuarios";
import AdminEmpresas from "./pages/admin/Empresas";
import AdminTalentos from "./pages/admin/Talentos";
import AdminUniversidades from "./pages/admin/Universidades";
import AdminProjetos from "./pages/admin/Projetos";
import AdminSquads from "./pages/admin/Squads";
import AdminBlog from "./pages/admin/Blog";
import AdminEventos from "./pages/admin/Eventos";
import AdminArtigos from "./pages/admin/Artigos.tsx";
import AdminRelatorios from "./pages/admin/Relatorios.tsx";
import AdminMateriais from "./pages/admin/Materiais.tsx";
import Oportunidades from "./pages/Oportunidades";
import Blog from "./pages/Blog";
import Eventos from "./pages/Eventos";
import Artigos from "./pages/Artigos";
import Relatorios from "./pages/Relatorios";
import Biblioteca from "./pages/Biblioteca";
import Manifesto from "./pages/Manifesto";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/" component={Home} />
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

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" switchable={false}>
        <TooltipProvider>
          <SEO />
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
