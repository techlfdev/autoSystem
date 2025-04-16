import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Menu, 
  Search, 
  Bell, 
  Settings,
  ChevronDown,
  Filter
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onToggleSidebar: () => void;
  title?: string;
  className?: string;
}

export function Header({ onToggleSidebar, title = "Dashboard Operacional", className }: HeaderProps) {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className={cn(
      "bg-background border-b sticky top-0 z-20 w-full",
      className
    )}>
      <div className="h-16 px-4 flex items-center justify-between gap-4">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggleSidebar}
            className="mr-2"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">{title}</h1>
        </div>

        <div className="flex items-center gap-2">
          {/* Search input - Hidden on mobile unless activated */}
          <div className={cn(
            "relative transition-all duration-200",
            showSearch ? "w-full md:w-64" : "w-0 md:w-64 hidden md:block"
          )}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input 
              placeholder="Buscar OS, clientes, veículos..."
              className="pl-10 h-9 w-full"
            />
          </div>

          {/* Search toggle for mobile */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setShowSearch(!showSearch)}
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Notification bell */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1.5 block h-2 w-2 rounded-full bg-destructive"></span>
          </Button>

          {/* Settings */}
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>

          {/* Filter dropdown for smaller screens */}
          <Button 
            variant="outline" 
            size="sm" 
            className="hidden sm:flex items-center gap-1 text-sm"
          >
            <Filter className="h-4 w-4" />
            Filtros
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </header>
  );
}
