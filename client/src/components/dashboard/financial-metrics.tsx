import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { formatCurrency, formatPercentage } from '@/lib/utils/date-utils';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FinancialData {
  monthlyRevenue: {
    total: number;
    growth: string;
    serviceCount: number;
    averageTicket: number;
    goalProgress: number;
  };
  revenueChart: {
    labels: string[];
    currentYearData: number[];
    previousYearData: number[];
  };
}

interface FinancialMetricsProps {
  data: FinancialData;
  isLoading?: boolean;
  className?: string;
}

type TimeFrame = 'week' | 'month' | 'quarter';

export function FinancialMetrics({ data, isLoading = false, className }: FinancialMetricsProps) {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('month');

  // Format chart data for Recharts
  const chartData = data.revenueChart.labels.map((month, index) => ({
    name: month,
    atual: data.revenueChart.currentYearData[index],
    anterior: data.revenueChart.previousYearData[index],
  }));

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-md shadow-md p-3">
          <p className="font-medium text-sm">{label}</p>
          <p className="text-sm text-emerald-500">
            {formatCurrency(payload[0].value as number)} <span className="text-xs">(atual)</span>
          </p>
          <p className="text-sm text-muted-foreground">
            {formatCurrency(payload[1].value as number)} <span className="text-xs">(anterior)</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const currentYearTotal = data.revenueChart.currentYearData.reduce((a, b) => a + b, 0);
  const previousYearTotal = data.revenueChart.previousYearData.reduce((a, b) => a + b, 0);
  const isPositiveGrowth = currentYearTotal > previousYearTotal;

  const chartColors = {
    positive: {
      stroke: '#22C55E',
      fill: '#D1FAE5'
    },
    negative: {
      stroke: '#EF4444',
      fill: '#FECACA'
    }
  };

  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Faturamento</CardTitle>
          <Tabs 
            defaultValue="month" 
            value={timeFrame} 
            onValueChange={(value) => setTimeFrame(value as TimeFrame)}
            className="hidden sm:block"
          >
            <TabsList className="bg-muted/30">
              <TabsTrigger value="week" className="text-xs">Semana</TabsTrigger>
              <TabsTrigger value="month" className="text-xs">Mês</TabsTrigger>
              <TabsTrigger value="quarter" className="text-xs">Trimestre</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Mobile Tabs */}
        <Tabs 
          defaultValue="month" 
          value={timeFrame} 
          onValueChange={(value) => setTimeFrame(value as TimeFrame)}
          className="sm:hidden mt-2"
        >
          <TabsList className="w-full bg-muted/30">
            <TabsTrigger value="week" className="text-xs flex-1">Semana</TabsTrigger>
            <TabsTrigger value="month" className="text-xs flex-1">Mês</TabsTrigger>
            <TabsTrigger value="quarter" className="text-xs flex-1">Trimestre</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <>
            <div className="h-64 mb-4 bg-muted/30 animate-pulse rounded-lg"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-muted/30 h-24 rounded-lg animate-pulse"></div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="h-64 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorAtual" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={isPositiveGrowth ? chartColors.positive.stroke : chartColors.negative.stroke} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={isPositiveGrowth ? chartColors.positive.stroke : chartColors.negative.stroke} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorAnterior" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={{ stroke: 'hsl(var(--border))' }}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12}
                    tickFormatter={(value) => `R$ ${(value / 1000)}k`}
                    tickLine={false}
                    axisLine={{ stroke: 'hsl(var(--border))' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="atual" 
                    stroke={isPositiveGrowth ? chartColors.positive.stroke : chartColors.negative.stroke}
                    fillOpacity={0.2}
                    fill={isPositiveGrowth ? chartColors.positive.fill : chartColors.negative.fill}
                    strokeWidth={2}
                    dot={{ 
                      stroke: isPositiveGrowth ? chartColors.positive.stroke : chartColors.negative.stroke, 
                      r: 4, 
                      strokeWidth: 2, 
                      fill: 'hsl(var(--background))' 
                    }}
                    activeDot={{ r: 6 }}
                    name="Atual"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="anterior" 
                    stroke="hsl(var(--chart-2))" 
                    fillOpacity={1}
                    fill="url(#colorAnterior)"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ stroke: 'hsl(var(--chart-2))', r: 4, strokeWidth: 2, fill: 'hsl(var(--background))' }}
                    name="Anterior"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-muted/10 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Ticket Médio</p>
                <p className="text-xl font-semibold mt-1">{formatCurrency(data.monthlyRevenue.averageTicket)}</p>
                <div className="flex items-center mt-2">
                  <span className="text-emerald-500 text-xs flex items-center">
                    <TrendingUp className="h-3 w-3 mr-0.5" /> 7.2%
                  </span>
                </div>
              </div>

              <div className="bg-muted/10 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Total de Serviços</p>
                <p className="text-xl font-semibold mt-1">{data.monthlyRevenue.serviceCount}</p>
                <div className="flex items-center mt-2">
                  <span className="text-emerald-500 text-xs flex items-center">
                    <TrendingUp className="h-3 w-3 mr-0.5" /> 3.4%
                  </span>
                </div>
              </div>

              <div className="bg-muted/10 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Meta Mensal</p>
                <p className="text-xl font-semibold mt-1">{data.monthlyRevenue.goalProgress}%</p>
                <div className="w-full bg-muted/50 rounded-full h-1.5 mt-2">
                  <div 
                    className="bg-primary h-1.5 rounded-full" 
                    style={{ width: `${data.monthlyRevenue.goalProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}