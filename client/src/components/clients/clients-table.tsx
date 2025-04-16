import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Phone, Car, Calendar, Edit, Trash2, MessageSquare } from 'lucide-react';
import { formatDate } from '@/lib/utils/date-utils';

interface ClientsTableProps {
  onClientSelect: (id: number) => void;
  selectedClientId: number | null;
}

export function ClientsTable({ onClientSelect, selectedClientId }: ClientsTableProps) {
  const columns = [
    {
      accessorKey: 'name',
      header: 'Nome',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span className="font-medium">{row.original.name}</span>
          {row.original.loyalty_level && (
            <Badge variant={row.original.loyalty_level.toLowerCase()}>
              {row.original.loyalty_level}
            </Badge>
          )}
        </div>
      ),
    },
    {
      accessorKey: 'phone',
      header: 'Telefone',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <span>{row.original.phone}</span>
        </div>
      ),
    },
    {
      accessorKey: 'vehicles_count',
      header: 'Veículos',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Car className="h-4 w-4 text-muted-foreground" />
          <span>{row.original.vehicles_count}</span>
        </div>
      ),
    },
    {
      accessorKey: 'last_service',
      header: 'Último Serviço',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>{formatDate(row.original.last_service)}</span>
        </div>
      ),
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <MessageSquare className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="overflow-auto custom-scrollbar"> {/* Added custom-scrollbar class */}
      <DataTable 
        columns={columns}
        data={[]}
        onRowClick={(row) => onClientSelect(row.original.id)}
        selectedRowId={selectedClientId}
      />
    </div>
  );
}