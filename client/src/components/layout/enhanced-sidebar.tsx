
import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
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
  Car,
  ShieldCheck,
  Crown,
  Timer,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

interface SidebarProps {
  className?: string;
  user?: {
    name: string;
    email?: string;
    avatar?: string;
  };
}

const SIDEBAR_STATE_KEY = 'sidebar_expanded';

export function EnhancedSidebar({ className, user = { name: 'Carlos Silva', email: 'carlos@autogestao.com' } }: SidebarProps) {
  const [location, navigate] = useLocation();
  const isMobile = useIsMobile();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [expanded, setExpanded] = useState(() => {
    if (isMobile) return false;
    const savedState = localStorage.getItem(SIDEBAR_STATE_KEY);
    return savedState !== null ? savedState === 'true' : true;
  });
  
  const subscriptionPlan = 'intermediario';
  const registrationDate = new Date('2023-04-10');

  const menuSections: MenuSection[] = [
    {
      title: 'Menu Principal',
      items: [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', href: '/' },
        { icon: <Calendar size={20} />, label: 'Agendamentos', href: '/agendamentos' },
        { icon: <Wrench size={20} />, label: 'Ordens de Serviço', href: '/ordens' },
        { icon: <UserRound size={20} />, label: 'Clientes', href: '/clientes' },
        { icon: <Box size={20} />, label: 'Estoque', href: '/estoque' },
      ]
    },
    {
      title: 'Financeiro',
      items: [
        { icon: <DollarSign size={20} />, label: 'Faturamento', href: '/faturamento' },
        { icon: <BarChart3 size={20} />, label: 'Relatórios', href: '/relatorios' },
      ]
    },
    {
      title: 'Sistema',
      items: [
        { icon: <Settings size={20} />, label: 'Configurações', href: '/configuracoes' },
        { icon: <HelpCircle size={20} />, label: 'Ajuda', href: '/ajuda' },
      ]
    }
  ];

  useEffect(() => {
    if (!isMobile) {
      localStorage.setItem(SIDEBAR_STATE_KEY, expanded.toString());
    }
  }, [expanded, isMobile]);

  const handleNavClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(href);
    if (isMobile) {
      setIsSheetOpen(false);
    }
  };

  const PlanIcon = () => {
    switch(subscriptionPlan) {
      case 'gratuito':
        return <Timer className="h-4 w-4 text-gray-400" />;
      case 'intermediario':
        return <ShieldCheck className="h-4 w-4 text-blue-500" />;
      case 'avancado':
        return <Crown className="h-4 w-4 text-amber-500" />;
    }
  };

  const getPlanName = () => {
    switch(subscriptionPlan) {
      case 'gratuito':
        const daysLeft = Math.ceil((new Date(registrationDate).getTime() + (30 * 24 * 60 * 60 * 1000) - new Date().getTime()) / (24 * 60 * 60 * 1000));
        return `Plano Gratuito - ${daysLeft} dias restantes`;
      case 'intermediario':
        return 'Plano Intermediário';
      case 'avancado':
        return 'Plano Avançado';
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white font-sans tracking-tight">
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center">
          <Car className="h-6 w-6 text-black" />
          <span className={cn("ml-3 text-xl font-semibold text-black", !expanded && "hidden")}>AutoGestão</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3">
        {menuSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-6">
            <h2 className={cn(
              "text-xs uppercase tracking-wider mb-2 text-gray-500 font-medium",
              expanded ? "px-3" : "text-center"
            )}>
              {expanded ? section.title : "•••"}
            </h2>

            <div className="space-y-1">
              {section.items.map((item, itemIndex) => {
                const isActive = location === item.href;
                return (
                  <button
                    key={itemIndex}
                    onClick={handleNavClick(item.href)}
                    className={cn(
                      "flex items-center w-full gap-3 py-2 px-3 text-black transition-colors rounded-md",
                      isActive ? "bg-gray-100" : "hover:bg-gray-50",
                      !expanded && "justify-center"
                    )}
                  >
                    <div className={cn("text-black", isActive && "text-blue-600")}>
                      {item.icon}
                    </div>
                    {expanded && <span className="text-sm font-medium">{item.label}</span>}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-100 p-4">
        <div className={cn("flex items-center", expanded ? "gap-3" : "justify-center")}>
          <Avatar className="h-9 w-9 border border-gray-200">
            <AvatarImage 
              src={user.avatar || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"}
              alt={user.name} 
            />
            <AvatarFallback>{user.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          {expanded && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-black truncate">{user.name}</p>
              <div className="flex items-center gap-2">
                <PlanIcon />
                <span className="text-xs text-gray-600 truncate">{getPlanName()}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className="fixed top-4 right-4 z-50 md:hidden bg-white shadow-sm"
            >
              <LayoutDashboard className="h-5 w-5 text-black" />
            </Button>
          </SheetTrigger>
          <SheetContent 
            side="right" 
            className="w-[280px] p-0 border-l transition-transform ease-in-out duration-300 shadow-none"
          >
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </>
    );
  }

  return (
    <>
      <motion.div
        className={cn(
          "hidden md:block fixed h-screen z-30 bg-white border-r border-gray-100",
          expanded ? "w-[240px]" : "w-[70px]",
          className
        )}
      >
        <SidebarContent />
      </motion.div>

      <div className={cn(
        "hidden md:block transition-all duration-300 ease-in-out",
        expanded ? "ml-[240px]" : "ml-[70px]"
      )} />
    </>
  );
}
