
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Filter } from 'lucide-react';

export function AppointmentFilters() {
  return (
    <div className="flex items-center gap-2">
      <Select defaultValue="all">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Mecânico" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="1">Pedro Santos</SelectItem>
          <SelectItem value="2">Maria Silva</SelectItem>
        </SelectContent>
      </Select>

      <Select defaultValue="all">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Box" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="1">Box 1</SelectItem>
          <SelectItem value="2">Box 2</SelectItem>
        </SelectContent>
      </Select>

      <Select defaultValue="all">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="scheduled">Agendado</SelectItem>
          <SelectItem value="confirmed">Confirmado</SelectItem>
          <SelectItem value="in_progress">Em Andamento</SelectItem>
          <SelectItem value="completed">Concluído</SelectItem>
          <SelectItem value="canceled">Cancelado</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="outline">
        <Filter className="h-4 w-4 mr-2" />
        Mais Filtros
      </Button>

      <Button>
        <Plus className="h-4 w-4 mr-2" />
        Novo Agendamento
      </Button>
    </div>
  );
}
