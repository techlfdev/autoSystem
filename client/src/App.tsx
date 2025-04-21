import { lazy, Suspense } from "react";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { PageLoader } from "@/components/ui/page-loader";

// Lazy load components
const Dashboard = lazy(() => import("@/pages/dashboard"));
const Clients = lazy(() => import("@/pages/clients"));
const Appointments = lazy(() => import("@/pages/appointments"));
const ServiceOrders = lazy(() => import("@/pages/service-orders"));
const NotFound = lazy(() => import("@/pages/not-found"));

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <ErrorBoundary>
        <Switch>
          <Route path="/" component={Dashboard} />
          <Route path="/clientes" component={Clients} />
          <Route path="/agendamentos" component={Appointments} />
          <Route path="/ordens" component={ServiceOrders} />
          <Route component={NotFound} />
        </Switch>
      </ErrorBoundary>
    </Suspense>
  );
}

import { Toaster } from "@/components/ui/toaster";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;