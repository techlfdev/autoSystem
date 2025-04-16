
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EnhancedDashboardLayout } from '@/components/layout/enhanced-dashboard-layout';
import { ClientsTable } from '@/components/clients/clients-table';
import { ClientDetails } from '@/components/clients/client-details';
import { ClientFilters } from '@/components/clients/client-filters';
import { ClientForm } from '@/components/clients/client-form';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function ClientsPage() {
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  
  const { data: clients, isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: () => fetch('/api/clients').then(res => res.json())
  });

  const [isNewClientFormOpen, setIsNewClientFormOpen] = useState(false);

  return (
    <EnhancedDashboardLayout>
      <div className="h-full flex flex-col gap-4 p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold tracking-tighter">Clientes</h1>
          <Button onClick={() => setIsNewClientFormOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Cliente
          </Button>
        </div>
        
        <ClientFilters />
        
        <div className="flex flex-1 gap-4 min-h-0">
          <motion.div 
            className="flex-1"
            animate={{ width: selectedClientId ? '60%' : '100%' }}
          >
            <ClientsTable 
              onClientSelect={setSelectedClientId}
              selectedClientId={selectedClientId}
            />
          </motion.div>
          
          <AnimatePresence>
            {selectedClientId && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '40%', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="bg-white rounded-lg shadow-lg"
              >
                <ClientDetails clientId={selectedClientId} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <ClientForm 
        open={isNewClientFormOpen}
        onOpenChange={setIsNewClientFormOpen}
      />
    </EnhancedDashboardLayout>
  );
}
