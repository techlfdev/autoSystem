
import React from 'react';
import { EnhancedDashboardLayout } from '@/components/layout/enhanced-dashboard-layout';
import { ServiceOrderList } from '@/components/service-orders/service-order-list';
import { ServiceOrderFilters } from '@/components/service-orders/service-order-filters';
import { useToast } from "@/hooks/use-toast";
import type { ServiceOrder } from '@/types/service-order';

export default function ServiceOrdersPage() {
  const { toast } = useToast();
  
  const handleStatusChange = (orderId: number, status: string) => {
    toast({
      title: "Status atualizado",
      description: "A ordem de serviço foi atualizada com sucesso.",
    });
    // Simulated WhatsApp notification
    console.log("📱 WhatsApp notification sent to client about status change");
  };

  return (
    <EnhancedDashboardLayout>
      <div className="flex h-full flex-col gap-4">
        <ServiceOrderFilters />
        <ServiceOrderList 
          onStatusChange={handleStatusChange}
          onDelete={(id) => {
            toast({
              title: "Ordem de serviço excluída",
              description: "A ordem foi removida com sucesso.",
            });
          }}
        />
      </div>
    </EnhancedDashboardLayout>
  );
}
