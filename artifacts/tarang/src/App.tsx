import { Switch, Route, Router as WouterRouter } from "wouter";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import DependencyMap from "@/pages/DependencyMap";
import ScenarioSetup from "@/pages/ScenarioSetup";
import SimulationResults from "@/pages/SimulationResults";
import AnomalyDetection from "@/pages/AnomalyDetection";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={DependencyMap} />
      <Route path="/setup" component={ScenarioSetup} />
      <Route path="/results" component={SimulationResults} />
      <Route path="/anomalies" component={AnomalyDetection} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Force dark mode
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
