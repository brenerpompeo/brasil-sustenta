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
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsuarios from "./pages/admin/Usuarios";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path="/login/empresa" component={LoginEmpresa} />
      <Route path="/login/jovem" component={LoginJovem} />
      <Route path="/login/universidade" component={LoginUniversidade} />
      <Route path="/perfil/empresa" component={PerfilEmpresa} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/usuarios" component={AdminUsuarios} />
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

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
