
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Receipt, AlertCircle, DollarSign, Calculator, Wallet } from 'lucide-react';
import { formatCurrency } from '@/lib/utils/date-utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface BillingMetricsProps {
  data?: any;
  isLoading?: boolean;
}

export function BillingMetrics({ data, isLoading }: BillingMetricsProps) {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const revenueGrowth = data?.currentMonthRevenue > data?.previousMonthRevenue;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Faturamento Mensal</p>
              <h3 className="text-2xl font-semibold mt-1">
                {formatCurrency(data?.currentMonthRevenue || 0)}
              </h3>
            </div>
            {revenueGrowth ? (
              <TrendingUp className="h-8 w-8 text-emerald-500" />
            ) : (
              <TrendingDown className="h-8 w-8 text-destructive" />
            )}
          </div>
        </Card>
        
        {/* Add more metric cards */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">Distribuição por Forma de Pagamento</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data?.paymentMethods}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="method" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">Faturamento por Serviço</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data?.serviceRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="service" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
