import React, { useState } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Eye, Car, Edit, Trash2 } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';


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
    cell: ({ row }) => {
        const [showDeleteDialog, setShowDeleteDialog] = useState(false);

        return (
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              className="hover:bg-muted/50 transition-colors"
              onClick={() => row.original.onViewHistory?.(row.original)}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="hover:bg-muted/50 transition-colors"
              onClick={() => row.original.onEdit?.(row.original)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-destructive/10 text-destructive transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                  <AlertDialogDescription>
                    Tem certeza que deseja excluir este cliente? Esta ação não pode ser desfeita.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      row.original.onDelete?.(row.original.id);
                      setShowDeleteDialog(false);
                    }}
                    className="bg-destructive hover:bg-destructive/90"
                  >
                    Excluir
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );
      },
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
    onViewHistory: (client) => console.log('Ver histórico', client),
    onEdit: (client) => console.log('Editar', client),
    onDelete: (id) => console.log('Deletar', id),
    id: 1,
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