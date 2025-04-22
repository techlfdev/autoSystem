
import React from 'react';
import { EnhancedDashboardLayout } from '@/components/layout/enhanced-dashboard-layout';
import { InventoryMetrics } from '@/components/inventory/inventory-metrics';
import { InventoryTable } from '@/components/inventory/inventory-table';
import { NewItemDialog } from '@/components/inventory/new-item-dialog';
import { useToast } from '@/hooks/use-toast';

export default function InventoryPage() {
  const { toast } = useToast();
  const [isNewItemDialogOpen, setIsNewItemDialogOpen] = React.useState(false);

  return (
    <EnhancedDashboardLayout>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Controle de Estoque</h1>
          <NewItemDialog open={isNewItemDialogOpen} onOpenChange={setIsNewItemDialogOpen} />
        </div>
        <InventoryMetrics />
        <InventoryTable />
      </div>
    </EnhancedDashboardLayout>
  );
}
