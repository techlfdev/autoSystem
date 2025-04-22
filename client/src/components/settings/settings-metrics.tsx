
import { Card } from '@/components/ui/card';
import { Users, Clock, CreditCard, MessageSquare, Activity } from 'lucide-react';

export function SettingsMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="p-4">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Usuários Ativos</span>
        </div>
        <p className="mt-2 text-2xl font-bold">12</p>
      </Card>
      
      <Card className="p-4">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Última Alteração</span>
        </div>
        <p className="mt-2 text-sm">Hoje às 14:30 por Carlos Silva</p>
      </Card>
      
      <Card className="p-4">
        <div className="flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Assinatura</span>
        </div>
        <p className="mt-2 text-sm">28 dias restantes</p>
      </Card>
      
      <Card className="p-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Notificações Hoje</span>
        </div>
        <p className="mt-2 text-2xl font-bold">45</p>
      </Card>
    </div>
  );
}
