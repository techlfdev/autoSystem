import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  Car,
  LayoutDashboard,
  Calendar,
  Wrench,
  Users,
  Package,
  DollarSign,
  LineChart,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  ChevronRight,
} from 'lucide-react';

type MenuItem = {
  icon: React.ReactNode;
  label: string;
  href: string;
};

type MenuSection = {
  title: string;
  items: MenuItem[];
};

const mainMenu: MenuSection[] = [
  {
    title: 'Menu Principal',
    items: [
      { icon: <LayoutDashboard size={20} />, label: 'Dashboard', href: '/' },
      { icon: <Calendar size={20} />, label: 'Agendamentos', href: '/agendamentos' },
      { icon: <Wrench size={20} />, label: 'Ordens de Serviço', href: '/ordens' },
      { icon: <Users size={20} />, label: 'Clientes', href: '/clientes' },
      { icon: <Package size={20} />, label: 'Estoque', href: '/estoque' },
    ],
  },
  {
    title: 'Financeiro',
    items: [
      { icon: <DollarSign size={20} />, label: 'Faturamento', href: '/faturamento' },
      { icon: <LineChart size={20} />, label: 'Relatórios', href: '/relatorios' },
    ],
  },
  {
    title: 'Sistema',
    items: [
      { icon: <Settings size={20} />, label: 'Configurações', href: '/configuracoes' },
      { icon: <HelpCircle size={20} />, label: 'Ajuda', href: '/ajuda' },
    ],
  },
];

interface SidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  className?: string;
}

export function Sidebar({ collapsed = false, onToggleCollapse, className }: SidebarProps) {
  const [location] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 md:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-sidebar fixed inset-y-0 left-0 z-40 flex flex-col border-r border-sidebar-border transition-all duration-300",
          collapsed ? "w-[70px]" : "w-[240px]",
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          className
        )}
      >
        {/* Logo & Toggle */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
          <div className="flex items-center">
            <Car className="h-5 w-5 text-primary" />
            {!collapsed && <span className="ml-2 text-xl font-semibold text-sidebar-foreground">AutoGestão</span>}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggleCollapse} 
            className="hidden md:flex text-sidebar-foreground/70 hover:text-sidebar-foreground"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMobileMenu} 
            className="md:hidden text-sidebar-foreground/70 hover:text-sidebar-foreground"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4 px-3">
          {mainMenu.map((section, index) => (
            <div key={index} className="mb-6">
              {!collapsed && (
                <h2 className="text-xs text-sidebar-foreground/50 uppercase tracking-wider ml-2 mb-3">
                  {section.title}
                </h2>
              )}
              {section.items.map((item, itemIndex) => (
                <Link href={item.href} key={itemIndex}>
                  <a 
                    className={cn(
                      "flex items-center py-2 px-2 rounded-lg mb-1 transition-colors",
                      location === item.href
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                      collapsed && "justify-center"
                    )}
                  >
                    <span className="flex items-center justify-center w-8 h-8">{item.icon}</span>
                    {!collapsed && <span className="ml-2">{item.label}</span>}
                  </a>
                </Link>
              ))}
              {index < mainMenu.length - 1 && !collapsed && (
                <Separator className="my-4 bg-sidebar-border/60" />
              )}
            </div>
          ))}
        </div>

        {/* User Profile */}
        <div className="border-t border-sidebar-border p-3">
          <div className={cn("flex items-center", collapsed ? "justify-center" : "justify-between")}>
            <div className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" alt="Carlos Silva" />
                <AvatarFallback>CS</AvatarFallback>
              </Avatar>
              {!collapsed && (
                <div className="ml-3">
                  <p className="text-sm font-medium text-sidebar-foreground">Carlos Silva</p>
                  <p className="text-xs text-sidebar-foreground/60">Gerente</p>
                </div>
              )}
            </div>
            {!collapsed && (
              <Button variant="ghost" size="icon" className="text-sidebar-foreground/70 hover:text-sidebar-foreground">
                <LogOut className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Menu Toggle Button (visible on mobile only) */}
      <Button
        variant="outline"
        size="icon"
        onClick={toggleMobileMenu}
        className="fixed bottom-4 right-4 z-50 md:hidden shadow-lg rounded-full h-12 w-12 bg-primary text-primary-foreground border-primary"
      >
        <Menu className="h-5 w-5" />
      </Button>
    </>
  );
}
