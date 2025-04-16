
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData> {
  columns: {
    accessorKey?: string;
    header: string;
    cell?: (props: { row: { original: TData } }) => React.ReactNode;
  }[];
  data: TData[];
  onRowClick?: (row: TData) => void;
  selectedRowId?: number | null;
}

export function DataTable<TData>({
  columns,
  data,
  onRowClick,
  selectedRowId,
}: DataTableProps<TData>) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead key={index}>{column.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row: any, rowIndex) => (
            <TableRow
              key={rowIndex}
              onClick={() => onRowClick?.(row)}
              className={cn(
                "cursor-pointer",
                selectedRowId === row.id && "bg-muted"
              )}
            >
              {columns.map((column, colIndex) => (
                <TableCell key={colIndex}>
                  {column.cell
                    ? column.cell({ row: { original: row } })
                    : column.accessorKey
                    ? row[column.accessorKey]
                    : null}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
