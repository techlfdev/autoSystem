
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useQuery } from '@tanstack/react-query';

interface ClientDetailsProps {
  clientId: number;
}

export function ClientDetails({ clientId }: ClientDetailsProps) {
  const { data: client, isLoading } = useQuery({
    queryKey: ['client', clientId],
    queryFn: () => fetch(`/api/clients/${clientId}`).then(res => res.json())
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ScrollArea className="h-full">
      <div className="p-6">
        <div className="flex items-start gap-4 mb-6">
          <Avatar className="h-16 w-16">
            <AvatarFallback>{client?.name?.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold tracking-tighter">{client?.name}</h2>
            <p className="text-sm text-muted-foreground">{client?.email}</p>
            <div className="flex gap-2 mt-2">
              {client?.tags?.map((tag: string) => (
                <Badge key={tag} variant="outline">{tag}</Badge>
              ))}
            </div>
          </div>
        </div>

        <Tabs defaultValue="info">
          <TabsList className="w-full">
            <TabsTrigger value="info">Informações</TabsTrigger>
            <TabsTrigger value="vehicles">Veículos</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
            <TabsTrigger value="files">Anexos</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Dados Cadastrais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <label className="text-sm font-medium">CPF/CNPJ</label>
                  <p className="text-sm text-muted-foreground">{client?.document}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Telefone</label>
                  <p className="text-sm text-muted-foreground">{client?.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Endereço</label>
                  <p className="text-sm text-muted-foreground">{client?.address}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Other tabs content will be implemented similarly */}
        </Tabs>
      </div>
    </ScrollArea>
  );
}
