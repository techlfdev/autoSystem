
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, Car, Tool, MapPin } from 'lucide-react';

export function AppointmentDialog({ appointment, onClose }) {
  const [activeTab, setActiveTab] = useState('details');

  if (!appointment) return null;

  return (
    <Dialog open={!!appointment} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detalhes do Agendamento</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="details">Detalhes</TabsTrigger>
            <TabsTrigger value="checklist">Checklist</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Cliente</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">João Silva</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Veículo</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o veículo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Fiat Uno - ABC-1234</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Mecânico</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o mecânico" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Pedro Santos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Box</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o box" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Box 1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Serviços</label>
              <div className="border rounded-lg p-4 space-y-2">
                {/* Lista de serviços aqui */}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Observações</label>
              <Textarea placeholder="Adicione observações sobre o agendamento" />
            </div>
          </TabsContent>

          <TabsContent value="checklist">
            {/* Checklist técnico aqui */}
          </TabsContent>

          <TabsContent value="history">
            {/* Histórico de alterações aqui */}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
