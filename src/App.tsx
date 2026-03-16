import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppShell } from "@/components/layout/AppShell";
import { Navbar } from "@/components/layout/Navbar";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import SymptomAnalyzer from "./pages/SymptomAnalyzer";
import DrugChecker from "./pages/DrugChecker";
import HealthReport from "./pages/HealthReport";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppPages = () => (
  <AppShell navbar={<Navbar />}>
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/analyzer" element={<SymptomAnalyzer />} />
      <Route path="/drug-checker" element={<DrugChecker />} />
      <Route path="/report" element={<HealthReport />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </AppShell>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/*" element={<AppPages />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
