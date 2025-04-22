
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Trash2, UserPlus } from 'lucide-react';

export function UserPermissions() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSavePermissions = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Permissões atualizadas",
        description: "As permissões foram salvas com sucesso."
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível salvar as permissões.",
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
          <h2 className="text-xl font-semibold">Usuários e Permissões</h2>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Novo Usuário
          </Button>
        </div>

        <div className="space-y-4">
          {['Administrador', 'Gerente', 'Mecânico', 'Atendente'].map((role) => (
            <div key={role} className="p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">{role}</h3>
                <Button variant="outline" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor={`view-${role}`}>Visualizar Agendamentos</Label>
                  <Switch id={`view-${role}`} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor={`edit-${role}`}>Editar Estoque</Label>
                  <Switch id={`edit-${role}`} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor={`delete-${role}`}>Excluir Ordens de Serviço</Label>
                  <Switch id={`delete-${role}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button onClick={handleSavePermissions} disabled={loading}>
          {loading ? "Salvando..." : "Salvar Permissões"}
        </Button>
      </div>
    </Card>
  );
}
