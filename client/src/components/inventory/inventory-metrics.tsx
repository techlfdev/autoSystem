
import { Card } from '@/components/ui/card';
import { AlertTriangle, ArrowDown, ArrowUp, Box, DollarSign, Package, PackageCheck } from 'lucide-react';

export function InventoryMetrics() {
  const metrics = [
    {
      title: 'Total de Itens',
      value: '1,234',
      icon: Package,
      trend: '+12%',
      trendUp: true
    },
    {
      title: 'Itens Críticos',
      value: '23',
      icon: AlertTriangle,
      trend: '-5',
      trendUp: false,
      alert: true
    },
    {
      title: 'Valor em Estoque',
      value: 'R$ 45.678,90',
      icon: DollarSign,
      trend: '+R$ 5.432,10',
      trendUp: true
    },
    {
      title: 'Entradas (Mês)',
      value: '156',
      icon: ArrowDown,
      trend: '+23%',
      trendUp: true
    },
    {
      title: 'Saídas (Mês)',
      value: '143',
      icon: ArrowUp,
      trend: '+18%',
      trendUp: true
    },
    {
      title: 'Taxa de Giro',
      value: '3.2x',
      icon: PackageCheck,
      trend: '+0.4x',
      trendUp: true
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {metrics.map((metric) => (
        <Card key={metric.title} className="p-4">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-full ${metric.alert ? 'bg-destructive/20 text-destructive' : 'bg-primary/20 text-primary'}`}>
                <metric.icon className="h-5 w-5" />
              </div>
            </div>
          </div>
          <div className="mt-3">
            <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
            <h3 className="text-2xl font-bold">{metric.value}</h3>
            <p className={`text-xs ${metric.trendUp ? 'text-green-500' : 'text-red-500'} mt-1`}>
              {metric.trend} em relação ao mês anterior
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}
