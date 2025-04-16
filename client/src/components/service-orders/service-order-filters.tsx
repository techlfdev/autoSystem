
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

export function ServiceOrderFilters() {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Input 
        placeholder="Buscar por cliente, veículo ou OS..." 
        className="sm:max-w-[300px]" 
      />
      <Select defaultValue="all">
        <SelectTrigger className="sm:w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os Status</SelectItem>
          <SelectItem value="RECEIVED">Recebida</SelectItem>
          <SelectItem value="DIAGNOSING">Em Diagnóstico</SelectItem>
          <SelectItem value="WAITING_PARTS">Aguardando Peça</SelectItem>
          <SelectItem value="IN_PROGRESS">Em Execução</SelectItem>
          <SelectItem value="COMPLETED">Finalizada</SelectItem>
          <SelectItem value="DELIVERED">Entregue</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
