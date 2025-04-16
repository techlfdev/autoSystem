import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { MetricCard } from '@/components/dashboard/metric-card';
import { ServicesInProgress } from '@/components/dashboard/services-in-progress';
import { DailySchedule } from '@/components/dashboard/daily-schedule';
import { FinancialMetrics } from '@/components/dashboard/financial-metrics';
import { Alerts } from '@/components/dashboard/alerts';
import { formatCurrency, formatTimeRemaining } from '@/lib/utils/date-utils';
import { useIsMobile } from '@/hooks/use-media-query';

// Import icons
import {
  Wrench,
  CalendarCheck,
  DollarSign,
  AlertCircle
} from 'lucide-react';

export default function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const isMobile = useIsMobile();

  // Fetch dashboard data
  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/dashboard-summary'],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Toggle sidebar collapse
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Effect to automatically collapse sidebar on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarCollapsed(true);
    }
  }, [isMobile]);

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

  return (
    <div className="min-h-screen bg-background text-foreground flex relative">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggleCollapse={toggleSidebar}
      />
      
      <div className="flex-1 flex flex-col">
        <Header onToggleSidebar={toggleSidebar} />
        
        <main className={`flex-1 transition-all duration-200 p-4 md:p-6 lg:p-8 ${sidebarCollapsed ? 'md:ml-[70px]' : 'md:ml-[240px]'}`}>
          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <MetricCard
              title="Serviços em andamento"
              value={isLoading ? "..." : data?.servicesInProgress.count || 0}
              icon={<Wrench className="h-6 w-6 text-primary" />}
              trend={{
                value: "+8.2%",
                positive: true,
                label: "em relação a ontem"
              }}
            />
            
            <MetricCard
              title="Agendamentos hoje"
              value={isLoading ? "..." : data?.todayAppointments.count || 0}
              icon={<CalendarCheck className="h-6 w-6 text-emerald-500" />}
              trend={{
                value: isLoading || !data?.todayAppointments.nextAppointment 
                  ? "Nenhum agendamento próximo" 
                  : formatTimeRemaining(data.todayAppointments.nextAppointment.timeRemaining),
                label: "Próximo em"
              }}
            />
            
            <MetricCard
              title="Faturamento do mês"
              value={isLoading ? "..." : formatCurrency(data?.monthlyRevenue.total || 0)}
              icon={<DollarSign className="h-6 w-6 text-amber-500" />}
              trend={{
                value: isLoading ? "..." : `+${data?.monthlyRevenue.growth || "0.0"}%`,
                positive: true,
                label: "vs mês anterior"
              }}
            />
            
            <MetricCard
              title="Alertas críticos"
              value={isLoading ? "..." : data?.criticalAlerts.count || 0}
              icon={<AlertCircle className="h-6 w-6 text-destructive" />}
              pulsingIcon={!!data?.criticalAlerts.count}
              className={!!data?.criticalAlerts.count ? "text-destructive" : ""}
            />
          </div>
          
          {/* Services Status and Schedule */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <ServicesInProgress 
              services={data?.servicesInProgress.items || []}
              isLoading={isLoading}
              className="lg:col-span-2"
            />
            
            <DailySchedule 
              appointments={data?.todayAppointments.items || []}
              isLoading={isLoading}
            />
          </div>
          
          {/* Financial Overview and Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <FinancialMetrics 
              data={data || { 
                monthlyRevenue: { total: 0, growth: "0.0", serviceCount: 0, averageTicket: 0, goalProgress: 0 },
                revenueChart: { labels: [], currentYearData: [], previousYearData: [] }
              }}
              isLoading={isLoading}
              className="lg:col-span-2"
            />
            
            <Alerts 
              alerts={data?.criticalAlerts.items || []}
              isLoading={isLoading}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
