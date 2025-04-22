
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, AlertCircle } from 'lucide-react';

export function SubscriptionSettings() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Assinatura e Plano</h2>
          <Button variant="outline">Ver Planos</Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Plano Intermediário</p>
                <p className="text-sm text-muted-foreground">Próxima cobrança em 15 dias</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-primary/10">Ativo</Badge>
          </div>

          <div className="border rounded-lg divide-y">
            <div className="p-4">
              <p className="font-medium">Histórico de Pagamentos</p>
            </div>
            {[1,2,3].map((i) => (
              <div key={i} className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium">Fatura #{i}</p>
                  <p className="text-sm text-muted-foreground">01/0{i}/2024</p>
                </div>
                <Badge variant="outline" className="bg-success/10">Pago</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
