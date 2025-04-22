
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings } from "lucide-react";

export function BillingSettings() {
  return (
    <Card className="mt-6">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Configurações de Faturamento</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Meta Mensal</Label>
            <Input type="number" placeholder="Digite o valor da meta" />
          </div>
          <div>
            <Label>Dia de Fechamento</Label>
            <Input type="number" min="1" max="31" placeholder="Dia do mês" />
          </div>
        </div>
        <Button className="mt-4">Salvar Configurações</Button>
      </div>
    </Card>
  );
}
