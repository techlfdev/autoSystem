import { useQuery } from '@tanstack/react-query';
import { EnhancedDashboardLayout } from '@/components/layout/enhanced-dashboard-layout';
import { MetricCard } from '@/components/dashboard/metric-card';
import { ServicesInProgress, Service } from '@/components/dashboard/services-in-progress';
import { DailySchedule, Appointment } from '@/components/dashboard/daily-schedule';
import { FinancialMetrics, FinancialData } from '@/components/dashboard/financial-metrics';
import { Alerts, AlertItem } from '@/components/dashboard/alerts';
import { formatCurrency, formatTimeRemaining } from '@/lib/utils/date-utils';

// Import icons
import {
  Wrench,
  CalendarCheck,
  DollarSign,
  AlertCircle
} from 'lucide-react';

// Define the dashboard summary data interface
interface DashboardSummary {
  servicesInProgress: {
    count: number;
    items: Service[];
  };
  todayAppointments: {
    count: number;
    items: Appointment[];
    nextAppointment?: {
      id: number;
      timeRemaining: number;
    };
  };
  monthlyRevenue: {
    total: number;
    growth: string;
    serviceCount: number;
    averageTicket: number;
    goalProgress: number;
  };
  criticalAlerts: {
    count: number;
    items: AlertItem[];
  };
  revenueChart: {
    labels: string[];
    currentYearData: number[];
    previousYearData: number[];
  };
}

// Mock user data - in a real app, this would come from an auth context or API
const currentUser = {
  name: 'Carlos Silva',
  email: 'carlos@autogestao.com',
  role: 'Gerente',
  avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
};

export default function Dashboard() {
  // Fetch dashboard data
  const { data, isLoading, error } = useQuery<DashboardSummary>({
    queryKey: ['/api/dashboard-summary'],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Handle errors
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h1 className="text-xl font-bold mb-2">Erro ao carregar o dashboard</h1>
        <p className="text-muted-foreground mb-4">Não foi possível carregar os dados. Tente novamente mais tarde.</p>
      </div>
    );
  }

  // Create financial data for the FinancialMetrics component
  const financialData: FinancialData = {
    monthlyRevenue: {
      total: data?.monthlyRevenue?.total || 0,
      growth: data?.monthlyRevenue?.growth || "0.0",
      serviceCount: data?.monthlyRevenue?.serviceCount || 0,
      averageTicket: data?.monthlyRevenue?.averageTicket || 0,
      goalProgress: data?.monthlyRevenue?.goalProgress || 0
    },
    revenueChart: {
      labels: data?.revenueChart?.labels || [],
      currentYearData: data?.revenueChart?.currentYearData || [],
      previousYearData: data?.revenueChart?.previousYearData || []
    }
  };

  return (
    <EnhancedDashboardLayout 
      user={currentUser}
      todayAppointmentsCount={data?.todayAppointments?.count || 0}
    >
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard
          title="Serviços em andamento"
          value={isLoading ? "..." : data?.servicesInProgress?.count || 0}
          icon={<Wrench className="h-6 w-6 text-primary" />}
          trend={{
            value: "+8.2%",
            positive: true,
            label: "em relação a ontem"
          }}
        />
        
        <MetricCard
          title="Agendamentos hoje"
          value={isLoading ? "..." : data?.todayAppointments?.count || 0}
          icon={<CalendarCheck className="h-6 w-6 text-emerald-500" />}
          trend={{
            value: isLoading || !data?.todayAppointments?.nextAppointment 
              ? "Nenhum agendamento próximo" 
              : formatTimeRemaining(data.todayAppointments.nextAppointment.timeRemaining),
            label: "Próximo em"
          }}
        />
        
        <MetricCard
          title="Faturamento do mês"
          value={isLoading ? "..." : formatCurrency(data?.monthlyRevenue?.total || 0)}
          icon={<DollarSign className="h-6 w-6 text-amber-500" />}
          trend={{
            value: isLoading ? "..." : `+${data?.monthlyRevenue?.growth || "0.0"}%`,
            positive: true,
            label: "vs mês anterior"
          }}
        />
        
        <MetricCard
          title="Alertas críticos"
          value={isLoading ? "..." : data?.criticalAlerts?.count || 0}
          icon={<AlertCircle className="h-6 w-6 text-destructive" />}
          pulsingIcon={!!data?.criticalAlerts?.count}
          className={!!data?.criticalAlerts?.count ? "text-destructive" : ""}
        />
      </div>
      
      {/* Services Status and Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <ServicesInProgress 
          services={data?.servicesInProgress?.items || []}
          isLoading={isLoading}
          className="lg:col-span-2"
        />
        
        <DailySchedule 
          appointments={data?.todayAppointments?.items || []}
          isLoading={isLoading}
        />
      </div>
      
      {/* Financial Overview and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <FinancialMetrics 
          data={financialData}
          isLoading={isLoading}
          className="lg:col-span-2"
        />
        
        <Alerts 
          alerts={data?.criticalAlerts?.items || []}
          isLoading={isLoading}
        />
      </div>
    </EnhancedDashboardLayout>
  );
}
