import React from 'react';
import { useLocation, Link } from 'wouter';
import { 
  LayoutDashboard, 
  Calendar, 
  Wrench, 
  UserRound,
  Box,
  DollarSign, 
  BarChart3,
  Settings, 
  HelpCircle,
  LogOut,
  Car
} from 'lucide-react';
import { 
  Sidebar, 
  SidebarProvider,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarTrigger,
} from '@/components/blocks/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

// Custom menu button component that uses wouter's navigation without nested anchor tags
const MenuItemButton = ({ 
  href, 
  icon, 
  label, 
  isActive 
}: { 
  href: string; 
  icon: React.ReactNode; 
  label: string; 
  isActive: boolean 
}) => {
  const [, navigate] = useLocation();
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(href);
  };
  
  return (
    <SidebarMenuButton 
      isActive={isActive}
      tooltip={label}
      onClick={handleClick}
    >
      {icon}
      <span>{label}</span>
    </SidebarMenuButton>
  );
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [location] = useLocation();
  
  // Define sidebar menu items grouped by sections
  const mainMenu = [
    { icon: <LayoutDashboard />, label: 'Dashboard', href: '/' },
    { icon: <Calendar />, label: 'Agendamentos', href: '/agendamentos' },
    { icon: <Wrench />, label: 'Ordens de Serviço', href: '/ordens' },
    { icon: <UserRound />, label: 'Clientes', href: '/clientes' },
    { icon: <Box />, label: 'Estoque', href: '/estoque' },
  ];
  
  const financialMenu = [
    { icon: <DollarSign />, label: 'Faturamento', href: '/faturamento' },
    { icon: <BarChart3 />, label: 'Relatórios', href: '/relatorios' },
  ];
  
  const systemMenu = [
    { icon: <Settings />, label: 'Configurações', href: '/configuracoes' },
    { icon: <HelpCircle />, label: 'Ajuda', href: '/ajuda' },
  ];
  
  return (
    <SidebarProvider>
      <div className="min-h-svh flex">
        <Sidebar collapsible="icon">
          <SidebarHeader className="pb-2">
            <div className="flex items-center px-2 py-3">
              <Car className="h-5 w-5 text-primary mr-2" />
              <span className="text-xl font-semibold">AutoGestão</span>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            {/* Main menu group */}
            <SidebarGroup>
              <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {mainMenu.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <MenuItemButton
                        href={item.href}
                        icon={item.icon}
                        label={item.label}
                        isActive={location === item.href}
                      />
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarSeparator />
            
            {/* Financial menu group */}
            <SidebarGroup>
              <SidebarGroupLabel>Financeiro</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {financialMenu.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <MenuItemButton
                        href={item.href}
                        icon={item.icon}
                        label={item.label}
                        isActive={location === item.href}
                      />
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarSeparator />
            
            {/* System menu group */}
            <SidebarGroup>
              <SidebarGroupLabel>Sistema</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {systemMenu.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <MenuItemButton
                        href={item.href}
                        icon={item.icon}
                        label={item.label}
                        isActive={location === item.href}
                      />
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter>
            <SidebarGroup>
              <SidebarMenuButton className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage 
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" 
                    alt="Carlos Silva" 
                  />
                  <AvatarFallback>CS</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Carlos Silva</span>
                  <span className="text-xs text-muted-foreground">Gerente</span>
                </div>
                <LogOut className="ml-auto h-4 w-4 text-muted-foreground" />
              </SidebarMenuButton>
            </SidebarGroup>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex items-center h-16 px-4 border-b">
            <SidebarTrigger className="mr-4" />
            <h1 className="text-lg font-semibold">Dashboard Operacional</h1>
          </div>
          
          <main className="flex-1 p-4 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}