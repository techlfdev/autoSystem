
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useQuery } from '@tanstack/react-query';
import { Car, Phone, Mail, MapPin, Tags, FileText, WhatsappIcon, Calendar, Clock, Tool, AlertTriangle, Upload, Pencil, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ClientDetailsProps {
  clientId: number;
}

export function ClientDetails({ clientId }: ClientDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { data: client, isLoading } = useQuery({
    queryKey: ['client', clientId],
    queryFn: () => fetch(`/api/clients/${clientId}`).then(res => res.json())
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const maintenanceHistory = [
    {
      id: 1,
      date: '2024-03-10',
      type: 'Troca de Óleo',
      mechanic: 'João Silva',
      status: 'Concluído',
      value: 250.0,
      notes: 'Óleo 5W30 sintético + filtro de óleo',
      vehicle: 'Honda Civic (ABC-1234)'
    },
    // Add more history items...
  ];

  const renderMaintenanceTimeline = () => (
    <div className="space-y-4">
      {maintenanceHistory.map((item) => (
        <Card key={item.id} className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-lg"></div>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-medium">{item.type}</h4>
                <p className="text-sm text-muted-foreground">{item.vehicle}</p>
              </div>
              <Badge variant={item.status === 'Concluído' ? 'default' : 'secondary'}>
                {item.status}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm mt-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{item.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tool className="h-4 w-4 text-muted-foreground" />
                <span>{item.mechanic}</span>
              </div>
            </div>
            <p className="text-sm mt-2">{item.notes}</p>
            <div className="flex justify-between items-center mt-3">
              <span className="font-medium">R$ {item.value.toFixed(2)}</span>
              <Button variant="outline" size="sm">Ver Detalhes</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <ScrollArea className="h-full">
      <div className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={client?.avatar} />
              <AvatarFallback>{client?.name?.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold tracking-tight">{client?.name}</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">{client?.email}</p>
              <div className="flex gap-2 mt-2">
                {client?.tags?.map((tag: string) => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
            </div>
          </div>
          <Button className="flex items-center gap-2">
            <WhatsappIcon className="h-4 w-4" />
            Enviar Mensagem
          </Button>
        </div>

        <Tabs defaultValue="info" className="space-y-4">
          <TabsList className="w-full">
            <TabsTrigger value="info">Informações</TabsTrigger>
            <TabsTrigger value="vehicles">Veículos</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
            <TabsTrigger value="files">Anexos</TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Dados Cadastrais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>CPF/CNPJ</Label>
                      <p className="text-sm text-muted-foreground">{client?.document}</p>
                    </div>
                    <div>
                      <Label>Telefone</Label>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">{client?.phone}</p>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <Label>Endereço</Label>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">{client?.address}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Observações Internas</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea 
                    placeholder="Adicione observações sobre o cliente..."
                    className="min-h-[100px]"
                    value={client?.notes}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="vehicles">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Veículos Cadastrados</h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Novo Veículo
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Cadastrar Novo Veículo</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="plate">Placa</Label>
                          <Input id="plate" placeholder="ABC-1234" />
                        </div>
                        <div>
                          <Label htmlFor="type">Tipo</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="car">Carro</SelectItem>
                              <SelectItem value="motorcycle">Moto</SelectItem>
                              <SelectItem value="truck">Caminhonete</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="make">Marca</Label>
                          <Input id="make" />
                        </div>
                        <div>
                          <Label htmlFor="model">Modelo</Label>
                          <Input id="model" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="year">Ano</Label>
                          <Input id="year" type="number" />
                        </div>
                        <div>
                          <Label htmlFor="color">Cor</Label>
                          <Input id="color" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="mileage">Quilometragem Atual</Label>
                        <Input id="mileage" type="number" />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Cancelar</Button>
                      <Button>Salvar</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {client?.vehicles?.map((vehicle: any) => (
                <Card key={vehicle.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Car className="h-5 w-5 text-primary" />
                        <div>
                          <h4 className="font-medium">{vehicle.make} {vehicle.model}</h4>
                          <p className="text-sm text-muted-foreground">{vehicle.licensePlate}</p>
                        </div>
                      </div>
                      <Badge variant="outline">{vehicle.type}</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div>
                        <Label>Ano</Label>
                        <p className="text-sm">{vehicle.year}</p>
                      </div>
                      <div>
                        <Label>Cor</Label>
                        <p className="text-sm">{vehicle.color}</p>
                      </div>
                      <div>
                        <Label>Quilometragem</Label>
                        <p className="text-sm">{vehicle.mileage} km</p>
                      </div>
                    </div>
                    {vehicle.alerts && (
                      <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="flex items-center gap-2 text-yellow-700">
                          <AlertTriangle className="h-4 w-4" />
                          <span className="text-sm font-medium">Alertas de Manutenção</span>
                        </div>
                        <ul className="mt-2 space-y-1">
                          {vehicle.alerts.map((alert: any, index: number) => (
                            <li key={index} className="text-sm text-yellow-600">
                              • {alert}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline" size="sm">Ver Histórico</Button>
                      <Button size="sm">Agendar Serviço</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Histórico de Manutenções</CardTitle>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filtrar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os Serviços</SelectItem>
                      <SelectItem value="completed">Concluídos</SelectItem>
                      <SelectItem value="pending">Pendentes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                {renderMaintenanceTimeline()}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="files">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Documentos e Anexos</CardTitle>
                  <Button>
                    <Upload className="h-4 w-4 mr-2" />
                    Novo Arquivo
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {client?.files?.map((file: any) => (
                    <Card key={file.id} className="p-4">
                      <div className="flex items-start gap-3">
                        <FileText className="h-8 w-8 text-primary" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{file.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {file.size} • {file.uploadedAt}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 mt-3">
                        <Button variant="outline" size="sm">Visualizar</Button>
                        <Button variant="outline" size="sm">Download</Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}
