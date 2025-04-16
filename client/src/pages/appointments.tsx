import { useState } from 'react';
import { EnhancedDashboardLayout } from '@/components/layout/enhanced-dashboard-layout';
import { AppointmentDialog } from '@/components/appointments/appointment-dialog';
import { FullScreenCalendar } from '@/components/ui/fullscreen-calendar';

const dummyEvents = [
  {
    day: new Date("2024-01-02"),
    events: [
      {
        id: 1,
        name: "Troca de Óleo - João Silva",
        time: "10:00",
        datetime: "2024-01-02T10:00",
      },
      {
        id: 2,
        name: "Revisão Geral - Maria Santos",
        time: "14:00",
        datetime: "2024-01-02T14:00",
      },
    ],
  },
  {
    day: new Date("2024-01-07"),
    events: [
      {
        id: 3,
        name: "Alinhamento - Pedro Oliveira",
        time: "14:00",
        datetime: "2024-01-07T14:00",
      },
      {
        id: 4,
        name: "Troca de Pneus - Ana Costa",
        time: "11:00",
        datetime: "2024-01-07T11:00",
      },
    ],
  },
];

export default function AppointmentsPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <EnhancedDashboardLayout>
      <div className="flex h-full flex-col">
        <FullScreenCalendar data={dummyEvents} />
        <AppointmentDialog
          appointment={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      </div>
    </EnhancedDashboardLayout>
  );
}