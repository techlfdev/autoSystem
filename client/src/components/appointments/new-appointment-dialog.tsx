
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface NewAppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewAppointmentDialog({ open, onOpenChange }: NewAppointmentDialogProps) {
  const [activeTab, setActiveTab] = useState('existing');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Novo Agendamento</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="existing">Cliente Existente</TabsTrigger>
            <TabsTrigger value="new">Novo Cliente</TabsTrigger>
          </TabsList>

          <TabsContent value="existing">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Selecionar Cliente</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Buscar cliente..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">João Silva</SelectItem>
                    <SelectItem value="2">Maria Santos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Appointment details fields */}
            </div>
          </TabsContent>

          <TabsContent value="new">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nome Completo</Label>
                  <Input />
                </div>
                <div className="space-y-2">
                  <Label>Telefone</Label>
                  <Input />
                </div>
                <div className="space-y-2">
                  <Label>CPF/CNPJ</Label>
                  <Input />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Endereço</Label>
                <Input placeholder="Rua, número" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Bairro</Label>
                  <Input />
                </div>
                <div className="space-y-2">
                  <Label>Cidade</Label>
                  <Input />
                </div>
                <div className="space-y-2">
                  <Label>CEP</Label>
                  <Input />
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <h4 className="font-medium mb-2">Veículo</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Marca/Modelo</Label>
                    <Input />
                  </div>
                  <div className="space-y-2">
                    <Label>Placa</Label>
                    <Input />
                  </div>
                  <div className="space-y-2">
                    <Label>Ano</Label>
                    <Input />
                  </div>
                  <div className="space-y-2">
                    <Label>KM Atual</Label>
                    <Input />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button>
            Criar Agendamento
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
