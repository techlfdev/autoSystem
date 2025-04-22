
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export function IntegrationSettings() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Integrações atualizadas",
        description: "As configurações de integração foram salvas."
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível salvar as integrações.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Integrações</h2>

        <div className="space-y-6">
          <div className="p-4 border rounded-lg space-y-4">
            <h3 className="font-medium">WhatsApp Business</h3>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label>Número WhatsApp</Label>
                <Input placeholder="+55 (11) 99999-9999" />
              </div>
              <div className="space-y-2">
                <Label>Chave API</Label>
                <Input type="password" />
              </div>
            </div>
          </div>

          <div className="p-4 border rounded-lg space-y-4">
            <h3 className="font-medium">Gateway de Pagamento</h3>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label>Provedor</Label>
                <Input placeholder="MercadoPago" />
              </div>
              <div className="space-y-2">
                <Label>Chave de Acesso</Label>
                <Input type="password" />
              </div>
            </div>
          </div>
        </div>

        <Button onClick={handleSave} disabled={loading}>
          {loading ? "Salvando..." : "Salvar Integrações"}
        </Button>
      </div>
    </Card>
  );
}
