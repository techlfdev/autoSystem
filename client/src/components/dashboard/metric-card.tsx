import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Clock } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: string;
    positive?: boolean;
    label?: string;
  };
  pulsingIcon?: boolean;
  onClick?: () => void;
  className?: string;
}

export function MetricCard({
  title,
  value,
  icon,
  trend,
  pulsingIcon = false,
  onClick,
  className
}: MetricCardProps) {
  return (
    <Card 
      className={cn(
        "transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-semibold mt-1">{value}</p>
          </div>
          <div 
            className={cn(
              "rounded-full p-3 text-foreground",
              pulsingIcon && "animate-pulse"
            )}
          >
            {icon}
          </div>
        </div>
        
        {trend && (
          <div className="mt-4">
            <div className="flex items-center">
              {trend.value && trend.positive !== undefined ? (
                <>
                  <span 
                    className={cn(
                      "text-sm flex items-center",
                      trend.positive ? "text-emerald-500" : "text-rose-500"
                    )}
                  >
                    {trend.positive ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                    {trend.value}
                  </span>
                  {trend.label && <span className="text-muted-foreground text-xs ml-2">{trend.label}</span>}
                </>
              ) : (
                <>
                  <span className="text-muted-foreground text-xs">{trend.label}</span>
                  <span className="text-amber-500 text-sm ml-2 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {trend.value}
                  </span>
                </>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
