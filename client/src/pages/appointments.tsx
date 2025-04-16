
import { useState, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AppointmentDialog } from '@/components/appointments/appointment-dialog';
import { AppointmentFilters } from '@/components/appointments/appointment-filters';
import { EnhancedDashboardLayout } from '@/components/layout/enhanced-dashboard-layout';

export default function AppointmentsPage() {
  const [view, setView] = useState('timeGridWeek');
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  const handleEventClick = useCallback((info) => {
    setSelectedEvent(info.event);
  }, []);

  const handleDateSelect = useCallback((selectInfo) => {
    setSelectedEvent({ start: selectInfo.start, end: selectInfo.end });
  }, []);

  return (
    <EnhancedDashboardLayout>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Agendamentos</h1>
          <AppointmentFilters />
        </div>

        <Card className="p-4">
          <div className="flex justify-end mb-4">
            <Select value={view} onValueChange={setView}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Visualização" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="timeGridDay">Diário</SelectItem>
                <SelectItem value="timeGridWeek">Semanal</SelectItem>
                <SelectItem value="dayGridMonth">Mensal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={view}
            selectable={true}
            editable={true}
            dayMaxEvents={true}
            weekends={true}
            slotMinTime="07:00:00"
            slotMaxTime="19:00:00"
            businessHours={{
              daysOfWeek: [1, 2, 3, 4, 5, 6],
              startTime: '07:00',
              endTime: '19:00',
            }}
            headerToolbar={false}
            eventClick={handleEventClick}
            select={handleDateSelect}
            locale="pt-br"
          />
        </Card>

        <AppointmentDialog
          appointment={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      </div>
    </EnhancedDashboardLayout>
  );
}
