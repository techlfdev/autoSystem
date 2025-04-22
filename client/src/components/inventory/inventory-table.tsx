
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Eye, Trash } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function InventoryTable() {
  const mockData = [
    {
      id: 1,
      code: 'OL001',
      name: 'Óleo Sintético 5W30',
      category: 'Óleo',
      supplier: 'AutoParts Ltda',
      quantity: 45,
      minQuantity: 20,
      location: 'A1-23',
      unit: 'Litros',
      cost: 89.90,
      price: 149.90,
      status: 'available',
      lastEntry: '2024-01-15',
      lastExit: '2024-01-20',
      expiryDate: '2025-01-15',
      batch: 'L2024011501'
    },
    // Add more mock items as needed
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 flex-1 max-w-sm">
          <Input placeholder="Buscar item..." />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas Categorias</SelectItem>
              <SelectItem value="oil">Óleos</SelectItem>
              <SelectItem value="parts">Peças</SelectItem>
              <SelectItem value="tools">Ferramentas</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Localização</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Validade</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.code}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p>{item.quantity} {item.unit}</p>
                    <p className="text-sm text-muted-foreground">Min: {item.minQuantity}</p>
                  </div>
                </TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>
                  <Badge variant={item.status === 'available' ? 'default' : 'destructive'}>
                    {item.status === 'available' ? 'Disponível' : 'Crítico'}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(item.expiryDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
