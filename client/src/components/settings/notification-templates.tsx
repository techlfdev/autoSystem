import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function NotificationTemplates() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSaveTemplate = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Template salvo",
        description: "O modelo de notificação foi atualizado com sucesso."
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível salvar o template.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Modelos de Notificação</h2>
          <Button onClick={handleSaveTemplate} disabled={loading}>
            {loading ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <Label>Tipo de Notificação</Label>
            <Select defaultValue="appointment">
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="appointment">Lembrete de Agendamento</SelectItem>
                <SelectItem value="maintenance">Alerta de Manutenção</SelectItem>
                <SelectItem value="payment">Cobrança</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Canal de Envio</Label>
            <Select defaultValue="whatsapp">
              <SelectTrigger>
                <SelectValue placeholder="Selecione o canal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
                <SelectItem value="email">E-mail</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Dias de Antecedência</Label>
            <Input type="number" min={1} defaultValue={3} />
          </div>

          <div>
            <Label>Conteúdo da Mensagem</Label>
            <Textarea 
              rows={5}
              placeholder="Digite o conteúdo da mensagem. Use {cliente}, {data}, {carro} para variáveis dinâmicas."
              defaultValue="Olá {cliente}, lembrando do seu agendamento para {data}. Modelo do veículo: {carro}"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}