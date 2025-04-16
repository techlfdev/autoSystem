
import { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';

interface AppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate?: Date | null;
  onAppointmentCreated?: () => void;
}

export function AppointmentDialog({ 
  open, 
  onOpenChange,
  selectedDate,
  onAppointmentCreated
}: AppointmentDialogProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAppointmentCreated?.();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Novo Agendamento</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Cliente</label>
              <Input required placeholder="Nome do cliente" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Telefone</label>
              <Input required type="tel" placeholder="(00) 00000-0000" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Mecânico</label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o mecânico" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Pedro Santos</SelectItem>
                  <SelectItem value="2">Maria Silva</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Box</label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o box" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Box 1</SelectItem>
                  <SelectItem value="2">Box 2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Data</label>
              <Input 
                required 
                type="date" 
                defaultValue={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : undefined}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Horário</label>
              <Input required type="time" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Duração (minutos)</label>
              <Input required type="number" min="30" step="30" defaultValue="60" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Tipo de Serviço</label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o serviço" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="troca-oleo">Troca de Óleo</SelectItem>
                  <SelectItem value="revisao">Revisão Geral</SelectItem>
                  <SelectItem value="alinhamento">Alinhamento</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Observações</label>
            <Textarea placeholder="Adicione observações sobre o agendamento" />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              Confirmar Agendamento
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
