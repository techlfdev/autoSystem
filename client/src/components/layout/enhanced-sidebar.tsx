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
  Timer,
  Menu,
  User
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
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
    name: string;Button
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
    // Get initial state from localStorage, default to true on desktop and false on mobile
    const savedState = localStorage.getItem(SIDEBAR_STATE_KEY);
    return savedState !== null ? savedState === 'true' : !isMobile;
  });
  const [isHovering, setIsHovering] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Current subscription plan - in a real app, this would come from a user context or API
  const subscriptionPlan: SubscriptionPlan = 'intermediario';
  const registrationDate = new Date('2023-04-10');

  // Helper function to render content based on plan type
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

  // Define menu sections
  const menuSections: MenuSection[] = [
    {
      title: 'Menu Principal',
      items: [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', href: '/' },
        { icon: <Calendar size={20} />, label: 'Agendamentos', href: '/agendamentos' },
        { icon: <Wrench size={20} />, label: 'Ordens de Serviço', href: '/ordens' },
        { icon: <Box size={20} />, label: 'Estoque', href: '/estoque' },
      ]
    },
    {
      title: 'Financeiro',
      items: [
        { icon: <DollarSign size={20} />, label: 'Faturamento', href: '/faturamento' },
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

  // Update localStorage when expanded state changes
  useEffect(() => {
    localStorage.setItem(SIDEBAR_STATE_KEY, expanded.toString());
  }, [expanded]);

  // Mouse enter/leave handlers with delay
  const handleMouseEnter = () => {
    setIsHovering(true);
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    if (!expanded) {
      hoverTimerRef.current = setTimeout(() => {
        setExpanded(true);
      }, 300); // Delay expanding for better UX
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
      }, 500); // Delay collapsing for better UX
    }
  };

  // Handle navigation click
  const handleNavClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(href);
    if (isMobile) {
      setIsSheetOpen(false);
    }
  };

  // Toggle sidebar expanded state
  const toggleSidebar = () => {
    setExpanded(prev => !prev);
  };

  // Animation variants
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

  // Render sidebar content
  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo Section */}
      <div className="flex items-center justify-center p-4">
        <div className="flex items-center">
          <Car className="h-6 w-6 text-primary" />
          <AnimatePresence>
            {expanded && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="ml-3 text-xl font-semibold"
              >
                AutoGestão
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        {expanded && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-3 h-8 w-8 rounded-full"
            onClick={toggleSidebar}
          >
            <ChevronLeft size={18} />
          </Button>
        )}
      </div>

      <Separator className="my-2 bg-gray-200" />

      {/* Navigation Section */}
      <div className="flex-1 overflow-y-auto py-2 px-3">
        <TooltipProvider delayDuration={300}>
          {menuSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-6">
              {/* Section Title */}
              {expanded && (
                <h2 className="text-xs uppercase tracking-wider ml-2 mb-3 text-gray-500 font-medium">
                  {section.title}
                </h2>
              )}

              {/* Section Items */}
              <div className="space-y-1">
                {section.items.map((item, itemIndex) => {
                  const isActive = location === item.href;

                  return (
                    <Tooltip key={itemIndex}>
                      <TooltipTrigger asChild>
                        <motion.button
                          className={cn(
                            "flex items-center w-full rounded-xl py-3 px-4 transition-colors gap-3",
                            isActive 
                              ? "bg-blue-50 text-blue-700" 
                              : "text-neutral-800 hover:bg-gray-100 hover:text-blue-700",
                            (!expanded && !isMobile) && "justify-center"
                          )}
                          onClick={handleNavClick(item.href)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className={cn(
                            "flex items-center justify-center",
                            isActive && "text-primary"
                          )}>
                            {item.icon}
                          </div>

                          {expanded && (
                            <motion.span
                              variants={contentVariants}
                              initial="collapsed"
                              animate="expanded"
                              className="text-sm font-medium"
                            >
                              {item.label}
                            </motion.span>
                          )}
                        </motion.button>
                      </TooltipTrigger>
                      {!expanded && (
                        <TooltipContent side="right">
                          {item.label}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  );
                })}
              </div>

              {expanded && sectionIndex < menuSections.length - 1 && (
                <Separator className="my-4 bg-gray-200" />
              )}
            </div>
          ))}
        </TooltipProvider>
      </div>

      {/* User Profile Footer */}
      <div className="border-t border-gray-200 p-3">
        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.div 
              className={cn(
                "flex items-center p-2 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer",
                !expanded && "justify-center"
              )}
              whileHover={{ scale: 1.02 }}
            >
              <Avatar className="h-9 w-9 border border-gray-200">
                <AvatarImage 
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" 
                  alt={user.name} 
                />
                <AvatarFallback>{user.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>

              {expanded && (
                <motion.div
                  variants={contentVariants}
                  initial="collapsed"
                  animate="expanded"
                  className="ml-3 flex-1 min-w-0"
                >
                  <p className="text-sm font-medium truncate">{user.name}</p>
                  {user.email && (
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  )}
                </motion.div>
              )}

              {expanded && (
                <motion.div
                  variants={contentVariants}
                  initial="collapsed"
                  animate="expanded"
                >
                  <ChevronRight size={18} className="text-gray-400" />
                </motion.div>
              )}
            </motion.div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={() => {
              navigate('/configuracoes');
              // Add small delay to ensure navigation completes
              setTimeout(() => {
                const profileSection = document.getElementById('profile-section');
                if (profileSection) {
                  profileSection.scrollIntoView({ behavior: 'smooth' });
                  profileSection.focus();
                }
              }, 100);
            }}>
              <User className="mr-2 h-4 w-4" />
              <span>Editar Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => {
                // Clear all session data
                localStorage.clear();
                sessionStorage.clear();
                // Clear cookies
                document.cookie.split(";").forEach((c) => {
                  document.cookie = c
                    .replace(/^ +/, "")
                    .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
                });
                // Redirect to login
                window.location.href = '/login';
              }}
              className="text-red-600 focus:text-red-600"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Subscription Plan Card - Clickable */}
        <div 
          onClick={() => {
            navigate('/configuracoes');
            setTimeout(() => {
              const subscriptionSection = document.getElementById('subscription-section');
              if (subscriptionSection) {
                subscriptionSection.scrollIntoView({ behavior: 'smooth' });
                subscriptionSection.focus();
              }
            }, 100);
          }}
          className="cursor-pointer transition-all hover:opacity-80"
        >
          {expanded ? (
            <PlanCard 
              plan={subscriptionPlan} 
              registrationDate={registrationDate} 
              className="mx-1 mt-3"
            />
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex justify-center mt-3">
                    {renderForPlan(
                      subscriptionPlan,
                      <Timer className="h-5 w-5 text-gray-400" />,
                      <ShieldCheck className="h-5 w-5 text-blue-500" />,
                      <Crown className="h-5 w-5 text-amber-500" />
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">
                  {renderForPlan(
                    subscriptionPlan,
                    'Plano Gratuito',
                    'Plano Intermediário',
                    'Plano Avançado'
                  )}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
    </div>
  );

  // Mobile sidebar
  if (isMobile) {
    return (
      <>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-4 right-4 z-50 md:hidden"
            >
              <LayoutDashboard className="h-5 w-5 text-neutral-800" />
            </Button>
          </SheetTrigger>
          <SheetContent 
            side="right" 
            className="w-[280px] p-0 bg-white border-l shadow-none transition-transform duration-300 font-manrope tracking-tight"
          >
            <div className="flex flex-col h-full">
              {/* Logo Section */}
              <div className="p-4 flex items-center justify-between border-b">
                <div className="flex items-center gap-3">
                  <Car className="h-6 w-6 text-primary" />
                  <span className="text-lg font-semibold text-black">AutoGestão</span>
                </div>
              </div>

              {/* Navigation Menu */}
              <div className="flex-1 overflow-y-auto py-4">
                {menuSections.map((section, idx) => (
                  <div key={idx} className="mb-6">
                    <h2 className="text-xs uppercase tracking-wider px-4 mb-2 text-gray-500 font-medium">
                      {section.title}
                    </h2>
                    <div className="space-y-1">
                      {section.items.map((item, itemIdx) => {
                        const isActive = location === item.href;
                        return (
                          <button
                            key={itemIdx}
                            onClick={handleNavClick(item.href)}
                            className={cn(
                              "flex items-center w-full py-2 px-4 gap-3 transition-colors",
                              "text-sm font-medium",
                              isActive 
                                ? "bg-blue-50 text-blue-700" 
                                : "text-black hover:bg-gray-50"
                            )}
                          >
                            {React.cloneElement(item.icon as React.ReactElement, {
                              className: cn(
                                "h-5 w-5",
                                isActive ? "text-blue-700" : "text-gray-600"
                              )
                            })}
                            <span>{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* User Profile Footer */}
              <div className="border-t p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="h-10 w-10 border border-gray-100">
                    <AvatarImage 
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" 
                      alt={user.name} 
                    />
                    <AvatarFallback>{user.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-black truncate">{user.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      {renderForPlan(
                        subscriptionPlan,
                        <Timer className="h-4 w-4" />,
                        <ShieldCheck className="h-4 w-4 text-blue-500" />,
                        <Crown className="h-4 w-4 text-amber-500" />
                      )}
                      <span>
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
            </div>
          </SheetContent>
        </Sheet>
      </>
    );
  }

  // Desktop sidebar
  return (
    <>
      <motion.div
        ref={sidebarRef}
        variants={sidebarVariants}
        initial={expanded ? "expanded" : "collapsed"}
        animate={expanded ? "expanded" : "collapsed"}
        className={cn(
          "fixed h-screen z-30 bg-white border-r border-gray-200 shadow-md",
          expanded ? "border-opacity-20" : "border-opacity-0",
          !expanded && !isHovering && "hover:border-opacity-20",
          className
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <SidebarContent />
      </motion.div>

      {/* Main content offset */}
      <div className={cn(
        "transition-all duration-300 ease-in-out",
        expanded ? "ml-[240px]" : "ml-[70px]",
        isMobile && "ml-0"
      )}>
        {/* This div makes space for the sidebar */}
      </div>
    </>
  );
}