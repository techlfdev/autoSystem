
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/use-debounce";

interface Client {
  id: number;
  name: string;
  document: string;
}

interface ClientAutocompleteProps {
  onSelect: (client: Client) => void;
}

export function ClientAutocomplete({ onSelect }: ClientAutocompleteProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [selectedClient, setSelectedClient] = React.useState<Client | null>(null);
  
  const debouncedSearch = useDebounce(search, 300);

  const { data: clients, isLoading } = useQuery({
    queryKey: ['clients', debouncedSearch],
    queryFn: () => 
      fetch(`/api/clients/search?q=${encodeURIComponent(debouncedSearch)}`)
        .then(res => res.json()),
    enabled: debouncedSearch.length > 0
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedClient ? selectedClient.name : "Selecionar cliente..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder="Buscar cliente..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandEmpty>Nenhum cliente encontrado.</CommandEmpty>
          <CommandGroup>
            {clients?.map((client: Client) => (
              <CommandItem
                key={client.id}
                value={client.name}
                onSelect={() => {
                  setSelectedClient(client);
                  onSelect(client);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedClient?.id === client.id ? "opacity-100" : "opacity-0"
                  )}
                />
                <div className="flex flex-col">
                  <span>{client.name}</span>
                  <span className="text-sm text-muted-foreground">
                    CPF/CNPJ: {client.document}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
