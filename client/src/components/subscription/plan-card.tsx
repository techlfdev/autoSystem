import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Crown, Timer } from 'lucide-react';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';

export type SubscriptionPlan = 'gratuito' | 'intermediario' | 'avancado';

interface PlanCardProps {
  plan: SubscriptionPlan;
  registrationDate?: Date | string;
  className?: string;
}

export function PlanCard({ 
  plan, 
  registrationDate,
  className
}: PlanCardProps) {
  // Calculate remaining days for free plan (7 days from registration)
  const remainingDays = React.useMemo(() => {
    if (plan !== 'gratuito' || !registrationDate) return 0;
    
    const registrationDay = dayjs(registrationDate);
    const trialEndDay = registrationDay.add(7, 'day');
    const daysLeft = trialEndDay.diff(dayjs(), 'day');
    
    return Math.max(0, daysLeft);
  }, [plan, registrationDate]);
  
  // Get plan icon based on subscription level
  const PlanIcon = React.useMemo(() => {
    switch (plan) {
      case 'gratuito':
        return <Timer className="h-5 w-5 text-gray-500" />;
      case 'intermediario':
        return <ShieldCheck className="h-5 w-5 text-blue-500" />;
      case 'avancado':
        return <Crown className="h-5 w-5 text-amber-500" />;
      default:
        return <Timer className="h-5 w-5 text-gray-500" />;
    }
  }, [plan]);
  
  // Get background styles based on the plan
  const bgStyle = React.useMemo(() => {
    switch (plan) {
      case 'gratuito':
        return 'bg-gray-100 dark:bg-gray-800';
      case 'intermediario':
        return 'bg-blue-50 dark:bg-blue-950/30 shadow-[0_0_10px_rgba(59,130,246,0.2)] dark:shadow-[0_0_15px_rgba(59,130,246,0.15)]';
      case 'avancado':
        return 'bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20 shadow-[0_0_15px_rgba(245,158,11,0.15)] dark:shadow-[0_0_15px_rgba(245,158,11,0.1)]';
      default:
        return 'bg-gray-100 dark:bg-gray-800';
    }
  }, [plan]);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "mt-2 rounded-xl p-3 flex items-center gap-3 border border-border",
        bgStyle,
        className
      )}
    >
      <div className={cn(
        "p-2 rounded-lg bg-background shadow flex items-center justify-center",
        plan === 'intermediario' && "bg-blue-100 dark:bg-blue-900/40",
        plan === 'avancado' && "bg-amber-100 dark:bg-amber-900/40"
      )}>
        {PlanIcon}
      </div>
      
      <div className="flex flex-col">
        <span className="text-sm font-semibold leading-none">
          {plan === 'gratuito' && "Plano Gratuito"}
          {plan === 'intermediario' && "Plano Intermediário"}
          {plan === 'avancado' && "Plano Avançado"}
        </span>
        
        <span className="text-xs text-muted-foreground mt-1">
          {plan === 'gratuito' 
            ? remainingDays > 0 
              ? `Faltam ${remainingDays} dia${remainingDays !== 1 ? 's' : ''}` 
              : "Período expirado"
            : "Assinatura ativa"}
        </span>
        
        {plan === 'gratuito' && remainingDays > 0 && (
          <div className="mt-1.5 h-1.5 w-full bg-muted-foreground/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(remainingDays / 7) * 100}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}