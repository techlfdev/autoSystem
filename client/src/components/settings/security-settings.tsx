
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Shield, Smartphone, Download } from 'lucide-react';

export function SecuritySettings() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleToggle2FA = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "2FA Atualizado",
        description: "As configurações de autenticação foram atualizadas."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Segurança</h2>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar Dados
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Autenticação de Dois Fatores</Label>
              <p className="text-sm text-muted-foreground">
                Ative a verificação em dois passos para maior segurança
              </p>
            </div>
            <Switch onCheckedChange={handleToggle2FA} disabled={loading} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Backup Automático</Label>
              <p className="text-sm text-muted-foreground">
                Configure backup diário dos dados
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="border rounded-lg p-4 space-y-2">
            <h3 className="font-medium">Sessões Ativas</h3>
            <div className="space-y-3">
              {[1,2].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">
                        {i === 1 ? "Chrome - Windows" : "Safari - iPhone"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Último acesso: há {i} hora{i > 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Encerrar</Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
