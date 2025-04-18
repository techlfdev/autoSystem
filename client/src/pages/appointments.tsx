import { useState } from 'react';
import { EnhancedDashboardLayout } from '@/components/layout/enhanced-dashboard-layout';
import { AppointmentDialog } from '@/components/appointments/appointment-dialog';
import { AppointmentFilters } from '@/components/appointments/appointment-filters';
import { AppointmentList } from '@/components/appointments/appointment-list';
import { FullScreenCalendar } from '@/components/ui/fullscreen-calendar';
import { Card } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";

// Mock data and types - replace with API integration later
const dummyEvents = [
  {
    day: new Date("2024-01-02"),
    events: [
      {
        id: 1,
        name: "Troca de Óleo - João Silva",
        time: "10:00",
        datetime: "2024-01-02T10:00",
        status: "SCHEDULED",
        mechanic: "Pedro Santos",
        service: "Troca de Óleo",
        box: "Box 1"
      },
    ],
  },
];

const metrics = {
  weeklyAppointments: 24,
  completionRate: 92,
  topService: "Troca de Óleo",
  topMechanic: "Pedro Santos"
};

export default function AppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false);
  const { toast } = useToast();

  const handleNewAppointment = (selectedDate?: Date) => {
    setSelectedDate(selectedDate || null);
    setIsNewAppointmentOpen(true);
  };

  const handleAppointmentCreated = () => {
    setIsNewAppointmentOpen(false);
    toast({
      title: "Agendamento criado",
      description: "Notificação enviada ao cliente via WhatsApp.",
    });
    // Simulated notification log
    console.log("📱 WhatsApp notification sent to client");
  };

  return (
    <EnhancedDashboardLayout>
      <div className="flex h-full flex-col gap-4">
        {/* Metrics Section */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Card className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground">Agendamentos Semana</h3>
            <p className="mt-2 text-2xl font-bold">{metrics.weeklyAppointments}</p>
          </Card>
          <Card className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground">Taxa de Conclusão</h3>
            <p className="mt-2 text-2xl font-bold">{metrics.completionRate}%</p>
          </Card>
          <Card className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground">Serviço Mais Agendado</h3>
            <p className="mt-2 text-2xl font-bold">{metrics.topService}</p>
          </Card>
          <Card className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground">Mecânico Mais Alocado</h3>
            <p className="mt-2 text-2xl font-bold">{metrics.topMechanic}</p>
          </Card>
        </div>

        <div className="flex flex-1 gap-4">
          <div className="flex-1">
            <FullScreenCalendar 
              data={dummyEvents}
              onDateSelect={handleNewAppointment}
            />
            
            <AppointmentList
              appointments={[
                {
                  id: 1,
                  clientName: "João Silva",
                  phone: "(11) 98765-4321",
                  serviceType: "Troca de Óleo",
                  vehicle: "Honda Civic - ABC-1234",
                  mechanic: "Pedro Santos",
                  box: "Box 1",
                  datetime: "2024-01-15T10:00:00",
                  duration: "1 hora",
                  status: "SCHEDULED"
                },
                {
                  id: 2,
                  clientName: "Maria Oliveira",
                  phone: "(11) 91234-5678",
                  serviceType: "Revisão Completa",
                  vehicle: "Toyota Corolla - XYZ-9876",
                  mechanic: "Carlos Ferreira",
                  box: "Box 2",
                  datetime: "2024-01-15T14:30:00",
                  duration: "2 horas",
                  status: "COMPLETED"
                }
              ]}
              onEditAppointment={(appointment) => {
                console.log('Editar agendamento:', appointment);
                setSelectedDate(new Date(appointment.datetime));
                setIsNewAppointmentOpen(true);
              }}
              onDeleteAppointment={(id) => {
                console.log('Excluir agendamento:', id);
                toast({
                  title: "Agendamento excluído",
                  description: "O agendamento foi removido com sucesso.",
                });
              }}
            />
          </div>
        </div>

        <AppointmentDialog
          open={isNewAppointmentOpen}
          onOpenChange={(open) => {
            setIsNewAppointmentOpen(open);
            if (!open) setSelectedDate(null);
          }}
          selectedDate={selectedDate}
          onAppointmentCreated={handleAppointmentCreated}
        />
      </div>
    </EnhancedDashboardLayout>
  );
}