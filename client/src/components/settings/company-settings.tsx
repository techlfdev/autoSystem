
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function CompanySettings() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Configurações salvas",
      description: "As informações da oficina foram atualizadas com sucesso."
    });
    
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Informações Básicas</h2>
        
        <div className="grid gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/placeholder-logo.png" alt="Logo da Oficina" />
              <AvatarFallback>OF</AvatarFallback>
            </Avatar>
            <Button variant="outline">Alterar Logo</Button>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="name">Nome da Oficina</Label>
            <Input id="name" placeholder="Auto Centro Silva" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="cnpj">CNPJ</Label>
            <Input id="cnpj" placeholder="00.000.000/0000-00" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="address">Endereço Completo</Label>
            <Textarea id="address" placeholder="Rua, número, bairro, cidade, estado e CEP" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input id="phone" placeholder="(00) 0000-0000" />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" placeholder="contato@oficina.com" />
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Horário de Funcionamento</h2>
        
        <div className="grid gap-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label>Modalidade de Atendimento</Label>
              <Select defaultValue="presencial">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="presencial">Presencial</SelectItem>
                  <SelectItem value="delivery">Delivery</SelectItem>
                  <SelectItem value="plantao">Plantão Técnico</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="opening">Horário de Abertura</Label>
              <Input id="opening" type="time" defaultValue="08:00" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="closing">Horário de Fechamento</Label>
              <Input id="closing" type="time" defaultValue="18:00" />
            </div>
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Salvar Alterações"}
        </Button>
      </div>
    </form>
  );
}
