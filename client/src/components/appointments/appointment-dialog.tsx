
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
              <label className="text-sm font-medium">Data</label>
              <Input 
                type="date" 
                required
                value={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Horário</label>
              <Input type="time" required />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Tipo de Serviço</label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o serviço" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="oil">Troca de Óleo</SelectItem>
                  <SelectItem value="maintenance">Revisão</SelectItem>
                  <SelectItem value="repair">Reparo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Mecânico</label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o mecânico" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mechanic1">João Silva</SelectItem>
                  <SelectItem value="mechanic2">Pedro Santos</SelectItem>
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
                  <SelectItem value="box1">Box 1</SelectItem>
                  <SelectItem value="box2">Box 2</SelectItem>
                  <SelectItem value="box3">Box 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Observações</label>
            <Textarea placeholder="Adicione observações importantes sobre o serviço..." />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              Criar Agendamento
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
