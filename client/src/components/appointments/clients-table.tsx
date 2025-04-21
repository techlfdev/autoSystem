
import React from 'react';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Eye, Car } from 'lucide-react';

const columns = [
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'phone',
    header: 'Telefone',
  },
  {
    accessorKey: 'document',
    header: 'Documento',
  },
  {
    accessorKey: 'vehicles',
    header: 'Veículos',
    cell: ({ row }) => (
      <div className="flex gap-1">
        {row.original.vehicles.map((vehicle: string, i: number) => (
          <div key={i} className="flex items-center text-xs bg-muted px-2 py-1 rounded">
            <Car className="h-3 w-3 mr-1" />
            {vehicle}
          </div>
        ))}
      </div>
    ),
  },
  {
    accessorKey: 'lastService',
    header: 'Último Serviço',
  },
  {
    accessorKey: 'lastAppointment',
    header: 'Último Agendamento',
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <Button variant="ghost" size="sm" onClick={() => console.log('Ver histórico', row.original)}>
        <Eye className="h-4 w-4 mr-2" />
        Ver Histórico
      </Button>
    ),
  },
];

const data = [
  {
    name: 'João Silva',
    phone: '(11) 99999-9999',
    document: '123.456.789-00',
    vehicles: ['Honda Civic 2020', 'Fiat Uno 2015'],
    lastService: 'Troca de Óleo',
    lastAppointment: '15/01/2024',
  },
  // Add more sample data as needed
];

export function ClientsTable() {
  return (
    <DataTable
      columns={columns}
      data={data}
      pagination
    />
  );
}
