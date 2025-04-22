
import { useQuery } from '@tanstack/react-query';
import { EnhancedDashboardLayout } from '@/components/layout/enhanced-dashboard-layout';
import { BillingMetrics } from '@/components/billing/billing-metrics';
import { BillingTable } from '@/components/billing/billing-table';
import { BillingReports } from '@/components/billing/billing-reports';
import { BillingSettings } from '@/components/billing/billing-settings';
import { useToast } from '@/hooks/use-toast';

export default function BillingPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['billing-summary'],
    queryFn: async () => {
      // TODO: Implement API call
      return mockData;
    },
  });

  return (
    <EnhancedDashboardLayout>
      <div className="space-y-6 p-6">
        <BillingMetrics data={data?.metrics} isLoading={isLoading} />
        <BillingTable data={data?.invoices} isLoading={isLoading} />
        <BillingReports />
      </div>
      <BillingSettings />
    </EnhancedDashboardLayout>
  );
}

// Temporary mock data
const mockData = {
  metrics: {
    currentMonthRevenue: 125000,
    previousMonthRevenue: 115000,
    averageTicket: 850,
    completedOrders: 147,
    pendingOrders: 23,
    totalReceived: 98500,
    totalPending: 26500,
    projectedRevenue: 145000,
    paymentMethods: [
      { method: 'PIX', value: 45000 },
      { method: 'Cartão', value: 35000 },
      { method: 'Dinheiro', value: 12000 },
      { method: 'Boleto', value: 6500 },
    ],
    serviceRevenue: [
      { service: 'Revisão Completa', value: 45000 },
      { service: 'Troca de Óleo', value: 25000 },
      { service: 'Alinhamento', value: 15000 },
      { service: 'Outros', value: 40000 },
    ],
  },
  invoices: [
    {
      id: 1,
      orderNumber: 'OS-2024-001',
      client: 'João Silva',
      vehicle: 'Honda Civic 2020',
      total: 1250.00,
      received: 1250.00,
      pending: 0,
      paymentMethod: 'PIX',
      date: '2024-01-15',
      status: 'Pago',
    },
    // Add more mock invoices...
  ],
};
