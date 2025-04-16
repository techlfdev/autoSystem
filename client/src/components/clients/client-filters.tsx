
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Tags, Car, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function ClientFilters() {
  const availableTags = [
    { id: 1, name: 'VIP', color: 'bg-amber-500' },
    { id: 2, name: 'Fidelizado', color: 'bg-green-500' },
    { id: 3, name: 'Em Negociação', color: 'bg-blue-500' },
    { id: 4, name: 'Inadimplente', color: 'bg-red-500' }
  ];

  return (
    <div className="flex flex-wrap gap-3 mb-4">
      <div className="flex-1 min-w-[200px]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Buscar por nome, telefone, placa..." 
            className="pl-9"
          />
        </div>
      </div>
      
      <Select defaultValue="all">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="active">Ativos</SelectItem>
          <SelectItem value="pending">Pendentes</SelectItem>
          <SelectItem value="inactive">Inativos</SelectItem>
        </SelectContent>
      </Select>

      <Select defaultValue="all">
        <SelectTrigger className="w-[180px]">
          <div className="flex items-center gap-2">
            <Tags className="h-4 w-4" />
            <span>Tags</span>
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas as Tags</SelectItem>
          {availableTags.map(tag => (
            <SelectItem key={tag.id} value={tag.id.toString()}>
              <div className="flex items-center gap-2">
                <Badge className={tag.color}>{tag.name}</Badge>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="flex gap-2">
            <Filter className="h-4 w-4" />
            Mais Filtros
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filtros Avançados</SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label>Tipo de Cliente</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="justify-start">
                  Pessoa Física
                </Button>
                <Button variant="outline" className="justify-start">
                  Pessoa Jurídica
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label>Apenas com Veículos Ativos</Label>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <Label>Com Serviços em Andamento</Label>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <Label>Com Pagamentos Pendentes</Label>
              <Switch />
            </div>

            <div className="space-y-2">
              <Label>Período de Cadastro</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Últimos 7 dias</SelectItem>
                  <SelectItem value="30">Últimos 30 dias</SelectItem>
                  <SelectItem value="90">Últimos 90 dias</SelectItem>
                  <SelectItem value="365">Último ano</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4">
              <Button className="w-full">Aplicar Filtros</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
