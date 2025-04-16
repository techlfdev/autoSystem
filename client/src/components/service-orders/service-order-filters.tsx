
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';
import { Plus, Search, Filter } from 'lucide-react';

export function ServiceOrderFilters() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-1 gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar por OS, cliente, placa..." 
              className="pl-9"
            />
          </div>
          <Button>
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nova OS
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Select defaultValue="all">
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Status</SelectItem>
            <SelectItem value="WAITING">Aguardando</SelectItem>
            <SelectItem value="IN_PROGRESS">Em Execução</SelectItem>
            <SelectItem value="WAITING_PARTS">Aguardando Peça</SelectItem>
            <SelectItem value="COMPLETED">Finalizada</SelectItem>
            <SelectItem value="CANCELLED">Cancelada</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger>
            <SelectValue placeholder="Prioridade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as Prioridades</SelectItem>
            <SelectItem value="LOW">Baixa</SelectItem>
            <SelectItem value="MEDIUM">Média</SelectItem>
            <SelectItem value="HIGH">Alta</SelectItem>
            <SelectItem value="URGENT">Urgente</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger>
            <SelectValue placeholder="Mecânico" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Mecânicos</SelectItem>
          </SelectContent>
        </Select>

        <DatePicker />
      </div>
    </div>
  );
}
