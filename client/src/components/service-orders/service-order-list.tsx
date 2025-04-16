
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pencil, Trash2, Eye, Clock, Upload, SendHorizontal, FileText, Camera } from 'lucide-react';
import { Timeline } from '@/components/service-orders/timeline';
import { ServiceOrderDetails } from '@/components/service-orders/service-order-details';
import { ServiceStatus, type ServiceOrder } from '@/types/service-order';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ServiceOrderListProps {
  orders?: ServiceOrder[];
  onStatusChange: (orderId: number, status: ServiceStatus) => void;
  onDelete: (id: number) => void;
  onSendWhatsApp: (orderId: number, type: 'status' | 'budget' | 'completion') => void;
}

export function ServiceOrderList({ orders = [], onStatusChange, onDelete, onSendWhatsApp }: ServiceOrderListProps) {
  const [selectedOrder, setSelectedOrder] = useState<ServiceOrder | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const getStatusColor = (status: ServiceStatus) => {
    const colors = {
      'WAITING': 'bg-amber-500/20 text-amber-500',
      'IN_PROGRESS': 'bg-blue-500/20 text-blue-500',
      'WAITING_PARTS': 'bg-purple-500/20 text-purple-500',
      'COMPLETED': 'bg-emerald-500/20 text-emerald-500',
      'CANCELLED': 'bg-red-500/20 text-red-500'
    };
    return colors[status] || 'bg-slate-500/20 text-slate-500';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      'LOW': 'bg-slate-500/20 text-slate-500',
      'MEDIUM': 'bg-blue-500/20 text-blue-500',
      'HIGH': 'bg-amber-500/20 text-amber-500',
      'URGENT': 'bg-red-500/20 text-red-500'
    };
    return colors[priority] || colors.MEDIUM;
  };

  const handleViewOrder = (order: ServiceOrder) => {
    setSelectedOrder(order);
    setSheetOpen(true);
  };

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {orders.map((order) => (
          <Card key={order.id} className="p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={cn(getStatusColor(order.status))}>
                    {order.status}
                  </Badge>
                  <Badge variant="outline" className={cn(getPriorityColor(order.priority))}>
                    {order.priority}
                  </Badge>
                </div>
                <h3 className="font-semibold">OS #{order.id}</h3>
                <p className="text-sm text-muted-foreground">{order.vehicle?.plate} - {order.vehicle?.model}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {format(new Date(order.createdAt), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                </div>
              </div>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" onClick={() => handleViewOrder(order)}>
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
              <Progress value={order.progress} className="h-2" />
              <div className="flex justify-between mt-1 text-sm">
                <span className="text-muted-foreground">Progresso</span>
                <span>{order.progress}%</span>
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm">
                <p className="font-medium">{order.client?.name}</p>
                <p className="text-muted-foreground">{order.mechanic?.name}</p>
              </div>
              <Select 
                value={order.status} 
                onValueChange={(value) => onStatusChange(order.id, value as ServiceStatus)}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WAITING">Aguardando</SelectItem>
                  <SelectItem value="IN_PROGRESS">Em execução</SelectItem>
                  <SelectItem value="WAITING_PARTS">Aguardando Peça</SelectItem>
                  <SelectItem value="COMPLETED">Finalizada</SelectItem>
                  <SelectItem value="CANCELLED">Cancelada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>
        ))}
      </div>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-full sm:max-w-3xl">
          <SheetHeader>
            <SheetTitle>Ordem de Serviço #{selectedOrder?.id}</SheetTitle>
          </SheetHeader>
          <Tabs defaultValue="details" className="mt-6">
            <TabsList>
              <TabsTrigger value="details">Detalhes</TabsTrigger>
              <TabsTrigger value="checklist">Checklist</TabsTrigger>
              <TabsTrigger value="parts">Peças</TabsTrigger>
              <TabsTrigger value="photos">Fotos</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>
            <ScrollArea className="h-[calc(100vh-12rem)] mt-4">
              {selectedOrder && (
                <>
                  <TabsContent value="details">
                    <ServiceOrderDetails order={selectedOrder} />
                  </TabsContent>
                  <TabsContent value="timeline">
                    <Timeline events={selectedOrder.timeline} />
                  </TabsContent>
                </>
              )}
            </ScrollArea>
          </Tabs>
          <div className="absolute bottom-4 right-4 flex gap-2">
            <Button onClick={() => onSendWhatsApp(selectedOrder?.id!, 'status')}>
              <SendHorizontal className="h-4 w-4 mr-2" />
              Enviar Status
            </Button>
            <Button onClick={() => onSendWhatsApp(selectedOrder?.id!, 'budget')}>
              <FileText className="h-4 w-4 mr-2" />
              Gerar PDF
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
