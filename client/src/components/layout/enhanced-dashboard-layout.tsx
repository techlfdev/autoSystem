import React from 'react';
import { EnhancedSidebar } from './enhanced-sidebar';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface EnhancedDashboardLayoutProps {
  children: React.ReactNode;
  user?: {
    name: string;
    email?: string;
    role?: string;
    avatar?: string;
  };
  todayAppointmentsCount?: number;
}

// Helper function to get greeting based on time of day
export function getGreetingByTime(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
}

export function EnhancedDashboardLayout({ 
  children, 
  user = { name: 'Carlos Silva', email: 'carlos@autogestao.com', role: 'Gerente' }, 
  todayAppointmentsCount = 0 
}: EnhancedDashboardLayoutProps) {
  const isMobile = useIsMobile();
  
  const greeting = getGreetingByTime();
  
  // Animation variants for welcome message
  const welcomeVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <EnhancedSidebar user={user} />
      
      {/* Main Content */}
      <div className={cn(
        "flex-1 flex flex-col",
        isMobile ? "w-full" : "ml-[70px]", // Default collapsed sidebar width
        "transition-all duration-300"
      )}>
        {/* Main content area */}
        <main className="flex-1 p-6">
          {/* Welcome message with animation */}
          <motion.div
            className="mb-8"
            initial="hidden"
            animate="visible"
            variants={welcomeVariants}
          >
            <h1 className="text-2xl font-semibold mb-2">
              {greeting}, {user.name}! {todayAppointmentsCount > 0 && (
                <span>Você tem {todayAppointmentsCount} agendamento{todayAppointmentsCount !== 1 ? 's' : ''} hoje.</span>
              )}
            </h1>
            <p className="text-muted-foreground">
              {todayAppointmentsCount > 0 
                ? "Confira o Dashboard para uma visão geral de hoje."
                : "Não há agendamentos para hoje. Aproveite para colocar as tarefas em dia."}
            </p>
          </motion.div>
          
          {/* Dashboard content */}
          {children}
        </main>
      </div>
    </div>
  );
}