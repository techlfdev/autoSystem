import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDate, formatTime } from '@/lib/utils/date-utils';

export interface Appointment {
  id: number;
  time: Date | string;
  serviceType: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELED';
  client?: {
    id: number;
    name: string;
  };
  vehicle?: {
    id: number;
    make: string;
    model: string;
  };
}

interface DailyScheduleProps {
  appointments: Appointment[];
  currentDate?: Date;
  isLoading?: boolean;
  className?: string;
}

export function DailySchedule({ 
  appointments = [], 
  currentDate = new Date(), 
  isLoading = false,
  className 
}: DailyScheduleProps) {
  const sortedAppointments = [...appointments].sort((a, b) => {
    return new Date(a.time).getTime() - new Date(b.time).getTime();
  });

  const isUpcoming = (appointmentTime: Date | string) => {
    const now = new Date();
    const time = new Date(appointmentTime);
    return time > now && time.getTime() - now.getTime() < 60 * 60 * 1000; // Within the next hour
  };

  const getStatusClass = (status: 'SCHEDULED' | 'COMPLETED' | 'CANCELED', time: Date | string) => {
    if (status === 'CANCELED') return 'bg-destructive/20 text-destructive';
    if (status === 'COMPLETED') return 'bg-emerald-500/20 text-emerald-500';
    return isUpcoming(time) 
      ? 'bg-primary/20 text-primary' 
      : 'bg-muted text-muted-foreground';
  };

  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Agendamentos do Dia</CardTitle>
          <div className="flex items-center space-x-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground/70">{formatDate(currentDate)}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex">
                <div className="w-12 flex-shrink-0 flex flex-col items-center mr-4">
                  <div className="bg-muted/50 rounded-full h-8 w-8 animate-pulse"></div>
                  <div className="h-full w-0.5 bg-muted/30 mt-1"></div>
                </div>
                <div className="bg-muted/30 h-20 flex-1 rounded-lg animate-pulse"></div>
              </div>
            ))}
          </div>
        ) : sortedAppointments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">Nenhum agendamento</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Não há agendamentos para hoje.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedAppointments.map((appointment, index) => {
              const isLast = index === sortedAppointments.length - 1;
              const upcoming = isUpcoming(appointment.time);
              const timeFormatted = formatTime(appointment.time);
              const statusClass = getStatusClass(appointment.status, appointment.time);
              
              return (
                <div key={appointment.id} className="relative">
                  <div className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div 
                        className={cn(
                          "rounded-full h-8 w-8 flex items-center justify-center",
                          upcoming ? "bg-primary text-white" : "bg-muted/50 text-muted-foreground"
                        )}
                      >
                        <span className="text-xs font-medium">{timeFormatted}</span>
                      </div>
                      {!isLast && <div className="h-full w-0.5 bg-muted/30 mt-1"></div>}
                    </div>
                    <div className="bg-muted/10 rounded-lg p-3 flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{appointment.serviceType}</h4>
                          <div className="text-sm text-muted-foreground mt-1">
                            {appointment.vehicle?.make} {appointment.vehicle?.model} - {appointment.client?.name}
                          </div>
                        </div>
                        <span 
                          className={cn(
                            "uppercase text-xs font-semibold px-2 py-0.5 rounded",
                            statusClass
                          )}
                        >
                          {upcoming ? 'EM BREVE' : 'RESERVADO'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        <div className="mt-6">
          <Button 
            variant="outline" 
            className="w-full"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-1" /> Novo Agendamento
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
