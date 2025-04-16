import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { formatTimeRemaining } from '@/lib/utils/date-utils';
import { ChevronRight, User, Clock, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ServiceStatus = 'IN_PROGRESS' | 'WAITING_PARTS' | 'COMPLETED' | 'PENDING' | 'WAITING_APPROVAL';

export interface Service {
  id: number;
  status: ServiceStatus;
  description: string;
  progress: number;
  startDate: Date | string;
  client?: {
    id: number;
    name: string;
  };
  vehicle?: {
    id: number;
    make: string;
    model: string;
    year: string;
  };
  mechanic?: {
    id: number;
    name: string;
  };
}

interface ServicesInProgressProps {
  services: Service[];
  isLoading?: boolean;
  className?: string;
}

export function ServicesInProgress({ services = [], isLoading = false, className }: ServicesInProgressProps) {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredServices = activeTab === 'all' 
    ? services 
    : services.filter(service => {
        if (activeTab === 'in_progress') return service.status === 'IN_PROGRESS';
        if (activeTab === 'waiting') return service.status === 'WAITING_PARTS' || service.status === 'WAITING_APPROVAL';
        return true;
      });

  const getServiceTime = (startDate: Date | string) => {
    const start = new Date(startDate);
    const now = new Date();
    const minutes = Math.floor((now.getTime() - start.getTime()) / (1000 * 60));
    return formatTimeRemaining(minutes);
  };

  const getStatusLabel = (status: ServiceStatus) => {
    switch (status) {
      case 'IN_PROGRESS':
        return { label: 'EM ATENDIMENTO', color: 'bg-primary text-primary-foreground', border: 'border-primary' };
      case 'WAITING_PARTS':
        return { label: 'AGUARDANDO PEÇA', color: 'bg-amber-500/20 text-amber-500', border: 'border-amber-500' };
      case 'COMPLETED':
        return { label: 'FINALIZADO', color: 'bg-emerald-500/20 text-emerald-500', border: 'border-emerald-500' };
      case 'PENDING':
        return { label: 'PENDENTE', color: 'bg-slate-500/20 text-slate-400', border: 'border-slate-500' };
      case 'WAITING_APPROVAL':
        return { label: 'AGUARDANDO APROVAÇÃO', color: 'bg-blue-500/20 text-blue-500', border: 'border-blue-500' };
      default:
        return { label: 'DESCONHECIDO', color: 'bg-slate-500/20 text-slate-400', border: 'border-slate-500' };
    }
  };

  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Serviços em Andamento</CardTitle>
          <Tabs 
            defaultValue="all" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="hidden sm:block"
          >
            <TabsList className="bg-muted/30">
              <TabsTrigger value="all" className="text-xs">Todos</TabsTrigger>
              <TabsTrigger value="in_progress" className="text-xs">Em progresso</TabsTrigger>
              <TabsTrigger value="waiting" className="text-xs">Aguardando</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Mobile Tabs */}
        <Tabs 
          defaultValue="all" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="sm:hidden mt-2"
        >
          <TabsList className="w-full bg-muted/30">
            <TabsTrigger value="all" className="text-xs flex-1">Todos</TabsTrigger>
            <TabsTrigger value="in_progress" className="text-xs flex-1">Em progresso</TabsTrigger>
            <TabsTrigger value="waiting" className="text-xs flex-1">Aguardando</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-muted/30 h-32 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="rounded-full bg-muted/50 p-3 mb-3">
              <Info className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">Nenhum serviço</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {activeTab === 'all' ? 'Não há serviços em andamento no momento.' 
                : activeTab === 'in_progress' ? 'Não há serviços em progresso no momento.'
                : 'Não há serviços aguardando no momento.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4 max-h-[450px] overflow-y-auto">
            {filteredServices.map((service) => {
              const status = getStatusLabel(service.status);
              return (
                <div 
                  key={service.id} 
                  className={cn(
                    "bg-muted/10 rounded-lg p-4 border-l-4 transition-all hover:translate-y-[-3px] hover:shadow-md", 
                    status.border
                  )}
                >
                  <div className="flex justify-between">
                    <div>
                      <div className="flex items-center">
                        <span className={cn("uppercase text-xs font-semibold px-2 py-0.5 rounded", status.color)}>
                          {status.label}
                        </span>
                        <span className="ml-2 text-xs text-muted-foreground">OS #{service.id}</span>
                      </div>
                      <h3 className="font-medium mt-2">
                        {service.vehicle?.make} {service.vehicle?.model} {service.vehicle?.year} - {service.description}
                      </h3>
                      <div className="flex items-center mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          {service.client?.name || 'Cliente não informado'}
                        </span>
                        <span className="flex items-center ml-4">
                          <Clock className="h-3 w-3 mr-1" />
                          {getServiceTime(service.startDate)}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-medium">Responsável:</span>
                      <span className="mt-1 text-sm text-muted-foreground">
                        {service.mechanic?.name || 'Não atribuído'}
                      </span>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-3 h-8 text-xs"
                      >
                        <Info className="h-3 w-3 mr-1" /> Detalhes
                      </Button>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Progress value={service.progress} className="h-1.5" />
                    <div className="flex justify-between mt-1 text-xs">
                      <span className="text-muted-foreground">Progresso</span>
                      <span className={cn(
                        service.status === 'IN_PROGRESS' ? 'text-primary' : 
                        service.status === 'COMPLETED' ? 'text-emerald-500' : 
                        'text-amber-500'
                      )}>
                        {service.progress}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        <div className="mt-4 flex justify-center">
          <Button 
            variant="link" 
            className="text-primary hover:text-primary/80 text-sm"
          >
            Ver todos os serviços <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
