import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
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
  Car,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Crown,
  Timer
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';
import { PlanCard, SubscriptionPlan } from '@/components/subscription/plan-card';

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
    role?: string;
    avatar?: string;
  };
}

// LocalStorage key for sidebar expanded state
const SIDEBAR_STATE_KEY = 'sidebar_expanded';

export function EnhancedSidebar({ className, user = { name: 'Carlos Silva', role: 'Gerente', email: 'carlos@autogestao.com' } }: SidebarProps) {
  const [location, navigate] = useLocation();
  const isMobile = useIsMobile();
  const [expanded, setExpanded] = useState(() => {
    const savedState = localStorage.getItem(SIDEBAR_STATE_KEY);
    return savedState !== null ? savedState === 'true' : !isMobile;
  });
  const [isHovering, setIsHovering] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  const subscriptionPlan: SubscriptionPlan = 'intermediario';
  const registrationDate = new Date('2023-04-10');

  const renderForPlan = (
    plan: SubscriptionPlan,
    gratuito: React.ReactNode,
    intermediario: React.ReactNode,
    avancado: React.ReactNode
  ) => {
    switch (plan) {
      case 'gratuito':
        return gratuito;
      case 'intermediario':
        return intermediario;
      case 'avancado':
        return avancado;
      default:
        return null;
    }
  };

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
    localStorage.setItem(SIDEBAR_STATE_KEY, expanded.toString());
  }, [expanded]);

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    if (!expanded) {
      hoverTimerRef.current = setTimeout(() => {
        setExpanded(true);
      }, 300);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    if (expanded) {
      hoverTimerRef.current = setTimeout(() => {
        setExpanded(false);
      }, 500);
    }
  };

  const handleNavClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(href);
    if (isMobile) {
      setIsSheetOpen(false);
    }
  };

  const toggleSidebar = () => {
    setExpanded(prev => !prev);
  };

  const sidebarVariants = {
    expanded: {
      width: '240px',
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    collapsed: {
      width: '70px',
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  const contentVariants = {
    expanded: { 
      opacity: 1,
      transition: { delay: 0.1, duration: 0.2 }
    },
    collapsed: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white">
      {/* Logo Section */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Car className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold tracking-tight">AutoGestão</span>
        </div>
      </div>

      {/* Navigation Section */}
      <div className="flex-1 overflow-y-auto py-4">
        <TooltipProvider delayDuration={300}>
          {menuSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-6 px-3">
              <h2 className="text-xs uppercase tracking-tight ml-2 mb-3 text-gray-500 font-medium">
                {section.title}
              </h2>

              <div className="space-y-1">
                {section.items.map((item, itemIndex) => {
                  const isActive = location === item.href;
                  return (
                    <motion.button
                      key={itemIndex}
                      className={cn(
                        "flex items-center w-full rounded-xl py-3 px-4 transition-colors gap-3",
                        isActive 
                          ? "bg-blue-50 text-blue-700" 
                          : "text-neutral-900 hover:bg-gray-100",
                        "text-sm font-medium tracking-tight"
                      )}
                      onClick={handleNavClick(item.href)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className={cn(
                        "flex items-center justify-center",
                        isActive && "text-blue-700"
                      )}>
                        {item.icon}
                      </div>
                      <span>{item.label}</span>
                    </motion.button>
                  );
                })}
              </div>

              {sectionIndex < menuSections.length - 1 && (
                <Separator className="my-4 bg-gray-100" />
              )}
            </div>
          ))}
        </TooltipProvider>
      </div>

      {/* User Profile Footer */}
      <div className="border-t border-gray-100 p-4">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors">
          <Avatar className="h-10 w-10 border border-gray-100">
            <AvatarImage 
              src={user.avatar || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"} 
              alt={user.name} 
            />
            <AvatarFallback>{user.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-neutral-900 tracking-tight truncate">
              {user.name}
            </p>
            {user.email && (
              <p className="text-xs text-gray-500 truncate">
                {user.email}
              </p>
            )}
          </div>

          <LogOut size={18} className="text-gray-400 hover:text-gray-700 transition-colors" />
        </div>

        <div className="mt-3 p-3 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-2">
            {renderForPlan(
              subscriptionPlan,
              <Timer className="h-5 w-5 text-gray-400" />,
              <ShieldCheck className="h-5 w-5 text-blue-500" />,
              <Crown className="h-5 w-5 text-amber-500" />
            )}
            <span className="text-sm font-medium tracking-tight">
              {renderForPlan(
                subscriptionPlan,
                'Plano Gratuito',
                'Plano Intermediário',
                'Plano Avançado'
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 flex items-center px-4 z-40">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="mr-4"
              >
                <LayoutDashboard className="h-5 w-5 text-neutral-900" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] p-0">
              <SheetTitle className="sr-only">Menu de Navegação</SheetTitle>
              <SidebarContent />
            </SheetContent>
          </Sheet>
          <Car className="h-6 w-6 text-primary" />
          <span className="ml-3 text-xl font-semibold tracking-tight">AutoGestão</span>
        </div>
        <div className="h-16" /> {/* Spacer for fixed header */}
      </>
    );
  }

  return (
    <>
      <motion.div
        ref={sidebarRef}
        variants={sidebarVariants}
        initial={expanded ? "expanded" : "collapsed"}
        animate={expanded ? "expanded" : "collapsed"}
        className={cn(
          "fixed h-screen z-30 bg-white border-r border-gray-100",
          className
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <SidebarContent />
      </motion.div>

      <div className={cn(
        "transition-all duration-300 ease-in-out",
        expanded ? "ml-[240px]" : "ml-[70px]"
      )} />
    </>
  );
}