
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { ServiceOrder } from '@/types/service-order';

interface ServiceOrderDetailsProps {
  order: ServiceOrder;
}

export function ServiceOrderDetails({ order }: ServiceOrderDetailsProps) {
  return (
    <div className="space-y-6">
      <Card className="p-4">
        <h3 className="font-semibold mb-2">Informações Gerais</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Cliente</Label>
            <p className="text-sm">{order.client?.name}</p>
          </div>
          <div>
            <Label>Veículo</Label>
            <p className="text-sm">{order.vehicle?.model} - {order.vehicle?.plate}</p>
          </div>
          <div>
            <Label>Mecânico Responsável</Label>
            <p className="text-sm">{order.mechanic?.name}</p>
          </div>
          <div>
            <Label>Data de Entrada</Label>
            <p className="text-sm">
              {format(new Date(order.createdAt), "dd/MM/yyyy HH:mm", { locale: ptBR })}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold mb-2">Descrição do Problema</h3>
        <Textarea 
          value={order.description} 
          readOnly 
          className="min-h-[100px]"
        />
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold mb-4">Checklist Técnico</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {Object.entries(order.checklist || {}).map(([key, value]) => (
            <div key={key} className="flex items-center space-x-2">
              <Checkbox id={key} checked={value} />
              <Label htmlFor={key}>{key}</Label>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold mb-2">Peças Utilizadas</h3>
        <div className="space-y-2">
          {order.parts?.map((part) => (
            <div key={part.id} className="flex justify-between items-center">
              <span>{part.name}</span>
              <div className="flex items-center gap-4">
                <span className="text-sm">Qtd: {part.quantity}</span>
                <span className="text-sm">R$ {part.price.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <span className="font-semibold">
            Total: R$ {order.parts?.reduce((acc, part) => acc + (part.price * part.quantity), 0).toFixed(2)}
          </span>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold mb-2">Observações Técnicas</h3>
        <Textarea 
          value={order.technicalNotes} 
          readOnly 
          className="min-h-[100px]"
        />
      </Card>
    </div>
  );
}
