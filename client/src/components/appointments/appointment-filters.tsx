import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function AppointmentFilters() {
  return (
    <div className="flex items-center gap-4 px-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Buscar agendamentos..." 
          className="pl-9"
        />
      </div>
      <Select defaultValue="all">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="scheduled">Agendados</SelectItem>
          <SelectItem value="completed">Concluídos</SelectItem>
          <SelectItem value="canceled">Cancelados</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}