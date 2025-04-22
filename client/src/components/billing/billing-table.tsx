
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils/date-utils";
import { Badge } from "@/components/ui/badge";

interface BillingTableProps {
  data?: any[];
  isLoading?: boolean;
}

export function BillingTable({ data, isLoading }: BillingTableProps) {
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <Card>
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Histórico de Faturamento</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>OS</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Veículo</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Recebido</TableHead>
              <TableHead>Pendente</TableHead>
              <TableHead>Forma</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.orderNumber}</TableCell>
                <TableCell>{invoice.client}</TableCell>
                <TableCell>{invoice.vehicle}</TableCell>
                <TableCell>{formatCurrency(invoice.total)}</TableCell>
                <TableCell>{formatCurrency(invoice.received)}</TableCell>
                <TableCell>{formatCurrency(invoice.pending)}</TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>
                  <Badge variant={invoice.status === 'Pago' ? 'success' : 'warning'}>
                    {invoice.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
