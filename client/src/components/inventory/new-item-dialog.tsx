
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';

interface NewItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewItemDialog({ open, onOpenChange }: NewItemDialogProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    onOpenChange(false);
  };

  return (
    <>
      <Button onClick={() => onOpenChange(true)}>
        <Plus className="h-4 w-4 mr-2" />
        Novo Item
      </Button>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Cadastrar Novo Item</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nome do Item</Label>
                <Input required />
              </div>
              <div className="space-y-2">
                <Label>Código</Label>
                <Input required />
              </div>
              <div className="space-y-2">
                <Label>Categoria</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="oil">Óleo</SelectItem>
                    <SelectItem value="parts">Peças</SelectItem>
                    <SelectItem value="tools">Ferramentas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Fornecedor</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="supplier1">AutoParts Ltda</SelectItem>
                    <SelectItem value="supplier2">Peças & Cia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Quantidade Inicial</Label>
                <Input type="number" min="0" required />
              </div>
              <div className="space-y-2">
                <Label>Quantidade Mínima</Label>
                <Input type="number" min="0" required />
              </div>
              <div className="space-y-2">
                <Label>Localização</Label>
                <Input placeholder="Ex: A1-23" required />
              </div>
              <div className="space-y-2">
                <Label>Unidade de Medida</Label>
                <Input placeholder="Ex: Litros, Unidades" required />
              </div>
              <div className="space-y-2">
                <Label>Custo Unitário</Label>
                <Input type="number" min="0" step="0.01" required />
              </div>
              <div className="space-y-2">
                <Label>Preço de Venda</Label>
                <Input type="number" min="0" step="0.01" required />
              </div>
              <div className="space-y-2">
                <Label>Data de Validade</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Número do Lote</Label>
                <Input />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Descrição Técnica</Label>
              <Textarea />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
              <Button type="submit">Salvar</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
