
import { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Edit2, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface Appointment {
  id: number;
  clientName: string;
  phone: string;
  serviceType: string;
  vehicle: string;
  mechanic: string;
  box: string;
  datetime: string;
  duration: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELED';
}

interface AppointmentListProps {
  appointments: Appointment[];
  onEditAppointment: (appointment: Appointment) => void;
  onDeleteAppointment: (id: number) => void;
}

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'SCHEDULED':
      return { label: 'Agendado', variant: 'default' };
    case 'COMPLETED':
      return { label: 'Concluído', variant: 'success' };
    case 'CANCELED':
      return { label: 'Cancelado', variant: 'destructive' };
    default:
      return { label: status, variant: 'secondary' };
  }
};

export function AppointmentList({ appointments, onEditAppointment, onDeleteAppointment }: AppointmentListProps) {
  return (
    <Card className="mt-6">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Agendamentos do Mês</h2>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <Card key={appointment.id} className="p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center justify-between md:justify-start gap-2">
                      <h3 className="font-medium">{appointment.clientName}</h3>
                      <Badge 
                        variant={getStatusConfig(appointment.status).variant as any}
                        className="ml-2"
                      >
                        {getStatusConfig(appointment.status).label}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                      <div>📱 {appointment.phone}</div>
                      <div>🔧 {appointment.serviceType}</div>
                      <div>🚗 {appointment.vehicle}</div>
                      <div>👨‍🔧 {appointment.mechanic}</div>
                      <div>📍 {appointment.box}</div>
                      <div>⏱️ {appointment.duration}</div>
                      <div className="md:col-span-2">
                        📅 {format(new Date(appointment.datetime), "dd 'de' MMMM 'às' HH:mm", { locale: ptBR })}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 md:flex-col">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 md:w-full"
                      onClick={() => onEditAppointment(appointment)}
                    >
                      <Edit2 className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 md:w-full text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Excluir
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                          <AlertDialogDescription>
                            Tem certeza que deseja excluir este agendamento? Esta ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => onDeleteAppointment(appointment.id)}
                          >
                            Confirmar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </Card>
  );
}
