
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, AlertCircle, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type Plan = {
  id: string;
  name: string;
  price: { monthly: number; yearly: number };
  features: string[];
  highlight?: boolean;
};

const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Básico',
    price: { monthly: 99, yearly: 990 },
    features: ['Até 50 agendamentos/mês', 'Gestão básica de clientes', 'Relatórios essenciais'],
  },
  {
    id: 'intermediate',
    name: 'Intermediário',
    price: { monthly: 199, yearly: 1990 },
    features: ['Até 200 agendamentos/mês', 'CRM completo', 'Relatórios avançados', 'Integrações'],
    highlight: true,
  },
  {
    id: 'professional',
    name: 'Profissional',
    price: { monthly: 299, yearly: 2990 },
    features: ['Agendamentos ilimitados', 'Multi-usuários', 'API access', 'Suporte prioritário'],
  },
];

export function SubscriptionSettings() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showPlans, setShowPlans] = useState(false);
  const [yearlyBilling, setYearlyBilling] = useState(false);
  const currentPlan = 'intermediate';

  const handleUpgrade = async (planId: string) => {
    setLoading(true);
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Plano atualizado com sucesso!",
        description: "Seu novo plano já está ativo.",
      });
      setShowPlans(false);
    } catch (error) {
      toast({
        title: "Erro ao atualizar plano",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Assinatura e Plano</h2>
            <Button variant="outline" onClick={() => setShowPlans(true)}>
              Fazer Upgrade
            </Button>
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

      <Dialog open={showPlans} onOpenChange={setShowPlans}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Escolha seu plano</DialogTitle>
          </DialogHeader>
          
          <div className="flex justify-end mb-6">
            <Button
              variant="outline"
              onClick={() => setYearlyBilling(!yearlyBilling)}
            >
              {yearlyBilling ? 'Ver preços mensais' : 'Ver preços anuais'}
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`border rounded-lg p-6 space-y-4 relative ${
                  plan.highlight ? 'border-primary shadow-lg' : ''
                }`}
              >
                {plan.id === currentPlan && (
                  <Badge className="absolute top-4 right-4">Plano Atual</Badge>
                )}
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <div className="text-3xl font-bold">
                  R$ {yearlyBilling ? plan.price.yearly : plan.price.monthly}
                  <span className="text-sm font-normal text-muted-foreground">
                    /{yearlyBilling ? 'ano' : 'mês'}
                  </span>
                </div>
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={plan.id === currentPlan ? 'outline' : 'default'}
                  disabled={plan.id === currentPlan || loading}
                  onClick={() => handleUpgrade(plan.id)}
                >
                  {plan.id === currentPlan ? 'Plano Atual' : 'Selecionar Plano'}
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
