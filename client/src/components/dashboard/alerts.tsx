import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BellRing, CircleX, Clock, Calendar, BadgeCheck, ExternalLink, Filter } from 'lucide-react';

export interface AlertItem {
  id: number;
  type: 'INVENTORY' | 'VEHICLE' | 'SERVICE' | 'CERTIFICATION';
  message: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  createdAt: Date | string;
}

interface AlertsProps {
  alerts: AlertItem[];
  isLoading?: boolean;
  className?: string;
}

export function Alerts({ alerts = [], isLoading = false, className }: AlertsProps) {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'INVENTORY':
        return <CircleX className="text-xl text-destructive" />;
      case 'VEHICLE':
        return <Clock className="text-xl text-amber-500" />;
      case 'SERVICE':
        return <Calendar className="text-xl text-amber-500" />;
      case 'CERTIFICATION':
        return <BadgeCheck className="text-xl text-destructive" />;
      default:
        return <CircleX className="text-xl text-destructive" />;
    }
  };

  const getAlertStyle = (type: string, severity: string) => {
    switch (severity) {
      case 'HIGH':
      case 'CRITICAL':
        return type === 'INVENTORY' || type === 'CERTIFICATION'
          ? 'bg-red-50 border-red-300 text-red-900'
          : 'bg-amber-50 border-amber-300 text-amber-900';
      default:
        return 'bg-yellow-50 border-yellow-300 text-yellow-900';
    }
  };

  const getAlertTitle = (type: string) => {
    switch (type) {
      case 'INVENTORY':
        return 'Estoque Crítico';
      case 'VEHICLE':
        return 'Veículo em Espera';
      case 'SERVICE':
        return 'Revisões Pendentes';
      case 'CERTIFICATION':
        return 'Certificação Vencendo';
      default:
        return 'Alerta';
    }
  };

  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold flex items-center">
            <BellRing className="text-destructive mr-2 h-5 w-5" /> Alertas Críticos
          </CardTitle>
          <span className="text-xs bg-destructive text-destructive-foreground px-2 py-0.5 rounded-full font-medium">
            {alerts.length}
          </span>
        </div>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="space-y-4 max-h-80">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-muted/30 h-24 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <BellRing className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">Nenhum alerta crítico</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Todas as operações estão funcionando normalmente.
            </p>
          </div>
        ) : (
          <div className="space-y-4 max-h-80 overflow-y-auto scrollbar-hide">
            {alerts.map((alert) => {
              const icon = getAlertIcon(alert.type);
              const style = getAlertStyle(alert.type, alert.severity);
              const title = getAlertTitle(alert.type);

              return (
                <div 
                  key={alert.id} 
                  className={cn(
                    "border rounded-lg p-3",
                    style
                  )}
                >
                  <div className="flex items-start">
                    <div className="mr-3 mt-0.5 flex-shrink-0">
                      {icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-inherit">{title}: {alert.message.split(':')[1] || ''}</h4>
                      <p className="text-sm text-foreground/70 mt-1">
                        {alert.message.includes(':') ? alert.message.split(':')[1] : alert.message}
                      </p>
                      <div className="flex mt-2 gap-2">
                        <Button 
                          size="sm" 
                          className={cn(
                            "h-7 px-3 text-xs",
                            alert.type === 'INVENTORY' || alert.type === 'CERTIFICATION'
                              ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                              : "bg-amber-500 hover:bg-amber-600 text-white"
                          )}
                        >
                          {alert.type === 'INVENTORY' ? 'Solicitar' : 
                           alert.type === 'VEHICLE' ? 'Contatar' : 
                           alert.type === 'SERVICE' ? 'Ver lista' : 'Renovar'}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-7 px-3 text-xs bg-background/50"
                        >
                          {alert.type === 'INVENTORY' || alert.type === 'CERTIFICATION' ? 'Ignorar' : 'Detalhes'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-4">
          <Button 
            variant="outline" 
            className="w-full text-sm"
            size="sm"
          >
            <Filter className="h-4 w-4 mr-1" /> Filtrar Alertas
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}