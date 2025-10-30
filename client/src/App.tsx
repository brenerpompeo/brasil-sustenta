import { Helmet } from 'react-helmet';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
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
      <Helmet>
        <title>Brasil Sustenta - Conectando Empresas e Talentos para Impacto ESG</title>
        <meta name="description" content="Plataforma que conecta empresas a jovens talentos universitários para projetos de sustentabilidade e inovação através do modelo Squad as a Service. Transforme desafios ESG em resultados concretos." />
        <meta name="keywords" content="ESG, sustentabilidade, talentos jovens, squad as a service, impacto social, Brasil, universidades, projetos ESG" />
        <meta property="og:title" content="Brasil Sustenta - ESG Marketplace" />
        <meta property="og:description" content="Conectamos empresas e jovens talentos para projetos de sustentabilidade e inovação" />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
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
