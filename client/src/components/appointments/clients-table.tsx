
import React, { useState } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Eye, Car, Edit, Trash2 } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

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
      const { toast } = useToast();
      const [showDeleteDialog, setShowDeleteDialog] = useState(false);

      const handleViewHistory = () => {
        toast({
          title: "Histórico",
          description: `Visualizando histórico de ${row.original.name}`,
        });
      };

      const handleEdit = () => {
        toast({
          title: "Editar",
          description: `Editando cliente ${row.original.name}`,
        });
      };

      const handleDelete = () => {
        toast({
          title: "Sucesso",
          description: `Cliente ${row.original.name} excluído com sucesso`,
        });
        setShowDeleteDialog(false);
      };

      return (
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            className="hover:bg-muted/50 transition-colors"
            onClick={handleViewHistory}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="hover:bg-muted/50 transition-colors"
            onClick={handleEdit}
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
                  onClick={handleDelete}
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

export function ClientsTable() {
  const mockData = [
    {
      name: 'João Silva',
      phone: '(11) 99999-9999',
      document: '123.456.789-00',
      vehicles: ['Honda Civic 2020', 'Fiat Uno 2015'],
      lastService: 'Troca de Óleo',
      lastAppointment: '15/01/2024',
      id: 1,
    },
    // Add more mock data as needed
  ];

  return (
    <DataTable
      columns={columns}
      data={mockData}
      pagination
    />
  );
}
