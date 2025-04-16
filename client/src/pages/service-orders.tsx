
import { useState } from 'react';
import { EnhancedDashboardLayout } from '@/components/layout/enhanced-dashboard-layout';
import { ServiceOrderList } from '@/components/service-orders/service-order-list';
import { ServiceOrderFilters } from '@/components/service-orders/service-order-filters';
import { useToast } from "@/hooks/use-toast";
import { ServiceStatus } from '@/types/service-order';

export default function ServiceOrdersPage() {
  const { toast } = useToast();
  const [orders] = useState([
    {
      id: 1,
      status: 'IN_PROGRESS' as ServiceStatus,
      priority: 'HIGH',
      description: 'Revisão completa - 30.000 km',
      progress: 65,
      createdAt: new Date().toISOString(),
      client: { id: 1, name: 'João Silva' },
      vehicle: { id: 1, plate: 'ABC-1234', model: 'Honda Civic 2020' },
      mechanic: { id: 1, name: 'Pedro Santos' },
      checklist: {
        'Óleo do Motor': true,
        'Filtro de Óleo': true,
        'Filtro de Ar': false,
        'Freios': true,
        'Suspensão': false,
        'Alinhamento': false,
      },
      parts: [
        { id: 1, name: 'Óleo Motor 5W30', quantity: 4, price: 45.90 },
        { id: 2, name: 'Filtro de Óleo', quantity: 1, price: 35.50 },
      ],
      technicalNotes: 'Desgaste acentuado nas pastilhas de freio. Recomendada troca em breve.',
      timeline: [
        {
          id: 1,
          type: 'STATUS_CHANGE',
          description: 'Status alterado para Em Execução',
          timestamp: new Date().toISOString(),
          user: { name: 'Pedro Santos' }
        }
      ]
    }
  ]);
  
  const handleStatusChange = (orderId: number, status: ServiceStatus) => {
    toast({
      title: "Status atualizado",
      description: "A ordem de serviço foi atualizada com sucesso.",
    });
    // Simulated WhatsApp notification
    console.log("📱 WhatsApp notification sent to client about status change");
  };

  const handleSendWhatsApp = (orderId: number, type: 'status' | 'budget' | 'completion') => {
    toast({
      title: "Mensagem enviada",
      description: "O cliente foi notificado via WhatsApp.",
    });
  };

  return (
    <EnhancedDashboardLayout>
      <div className="space-y-4">
        <ServiceOrderFilters />
        <ServiceOrderList 
          orders={orders}
          onStatusChange={handleStatusChange}
          onDelete={(id) => {
            toast({
              title: "Ordem de serviço excluída",
              description: "A ordem foi removida com sucesso.",
            });
          }}
          onSendWhatsApp={handleSendWhatsApp}
        />
      </div>
    </EnhancedDashboardLayout>
  );
}
