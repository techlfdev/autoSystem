import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/ui/data-table';
import { Calendar, Users, Search, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { EnhancedDashboardLayout } from '@/components/layout/enhanced-dashboard-layout';
import { FullscreenCalendar } from '@/components/ui/fullscreen-calendar';
import { ClientsTable } from '@/components/appointments/clients-table';
import { NewAppointmentDialog } from '@/components/appointments/new-appointment-dialog';

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState('calendar');
  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false);
  const { toast } = useToast();

  const handleNewAppointment = (date?: Date) => {
    setIsNewAppointmentOpen(true);
  };

  return (
    <EnhancedDashboardLayout>
      <div className="flex flex-col h-full gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Agendamentos</h1>
          {activeTab === 'clients' && (
            <Button onClick={handleNewAppointment}>Novo Agendamento</Button>
          )}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
          <TabsList>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Calendário
            </TabsTrigger>
            <TabsTrigger value="clients" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Clientes Cadastrados
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="flex-1">
            <FullscreenCalendar data={[]} onDateSelect={handleNewAppointment} />
          </TabsContent>

          <TabsContent value="clients" className="flex-1">
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Buscar por nome, telefone, placa ou documento" className="pl-10" />
                </div>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filtros
                </Button>
              </div>
              <ClientsTable />
            </div>
          </TabsContent>
        </Tabs>

        <NewAppointmentDialog 
          open={isNewAppointmentOpen} 
          onOpenChange={setIsNewAppointmentOpen}
        />
      </div>
    </EnhancedDashboardLayout>
  );
}