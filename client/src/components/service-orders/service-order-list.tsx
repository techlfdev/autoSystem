
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, Eye, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceOrderListProps {
  onStatusChange: (orderId: number, status: string) => void;
  onDelete: (id: number) => void;
}

export function ServiceOrderList({ onStatusChange, onDelete }: ServiceOrderListProps) {
  const getStatusColor = (status: string) => {
    const colors = {
      'RECEIVED': 'bg-blue-500/20 text-blue-500',
      'DIAGNOSING': 'bg-amber-500/20 text-amber-500',
      'WAITING_PARTS': 'bg-purple-500/20 text-purple-500',
      'IN_PROGRESS': 'bg-indigo-500/20 text-indigo-500',
      'COMPLETED': 'bg-emerald-500/20 text-emerald-500',
      'DELIVERED': 'bg-green-500/20 text-green-500'
    };
    return colors[status] || 'bg-slate-500/20 text-slate-500';
  };

  return (
    <div className="space-y-4">
      {[1, 2].map((id) => (
        <Card key={id} className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={cn(getStatusColor('IN_PROGRESS'))}>
                  Em Execução
                </Badge>
                <span className="text-sm text-muted-foreground">OS #{id}</span>
              </div>
              <h3 className="text-lg font-semibold mt-2">Honda Civic 2020 - Revisão Completa</h3>
              <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                <span>Cliente: João Silva</span>
                <span>Mecânico: Pedro Santos</span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Iniciado há 2h
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost">
                <Eye className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost">
                <Pencil className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="mt-4">
            <Progress value={65} className="h-2" />
            <div className="flex justify-between mt-1 text-sm">
              <span className="text-muted-foreground">Progresso</span>
              <span className="text-primary">65%</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
