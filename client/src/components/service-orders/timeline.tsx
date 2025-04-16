
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Check, Clock, Wrench, Package, AlertCircle } from 'lucide-react';

interface TimelineEvent {
  id: number;
  type: string;
  description: string;
  timestamp: string;
  user: {
    name: string;
  };
}

interface TimelineProps {
  events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'STATUS_CHANGE':
        return <Clock className="h-4 w-4" />;
      case 'PART_ADDED':
        return <Package className="h-4 w-4" />;
      case 'MECHANIC_ASSIGNED':
        return <Wrench className="h-4 w-4" />;
      case 'COMPLETED':
        return <Check className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event.id} className="flex gap-4">
          <div className="mt-1">{getEventIcon(event.type)}</div>
          <div>
            <p className="font-medium">{event.description}</p>
            <div className="flex gap-2 text-sm text-muted-foreground">
              <span>{event.user.name}</span>
              <span>•</span>
              <span>{format(new Date(event.timestamp), "dd/MM HH:mm", { locale: ptBR })}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
