
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export function BillingReports() {
  return (
    <Card>
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Relatórios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Button variant="outline" className="w-full flex items-center gap-2">
            <Download className="h-4 w-4" />
            Relatório Mensal
          </Button>
          <Button variant="outline" className="w-full flex items-center gap-2">
            <Download className="h-4 w-4" />
            Relatório Anual
          </Button>
          <Button variant="outline" className="w-full flex items-center gap-2">
            <Download className="h-4 w-4" />
            Relatório Personalizado
          </Button>
        </div>
      </div>
    </Card>
  );
}
