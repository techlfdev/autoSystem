import { format, formatDistance, formatRelative, addMinutes } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Format date to display in the dashboard
export const formatDate = (date: Date | string | number): string => {
  if (!date) return '';
  const dateObj = new Date(date);
  return format(dateObj, 'dd MMM, yyyy', { locale: ptBR });
};

// Format time HH:MM
export const formatTime = (date: Date | string | number): string => {
  if (!date) return '';
  const dateObj = new Date(date);
  return format(dateObj, 'HH:mm', { locale: ptBR });
};

// Format relative time (e.g., "há 5 minutos", "em 3 horas")
export const formatRelativeTime = (date: Date | string | number): string => {
  if (!date) return '';
  const dateObj = new Date(date);
  return formatRelative(dateObj, new Date(), { locale: ptBR });
};

// Format time remaining (e.g., "5 min", "3 horas")
export const formatTimeRemaining = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} min`;
  } else {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h ${remainingMinutes}min`;
    }
  }
};

// Format date as "Hoje" or the actual date if not today
export const formatDayOrDate = (date: Date | string | number): string => {
  if (!date) return '';
  
  const dateObj = new Date(date);
  const today = new Date();
  
  if (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  ) {
    return 'Hoje';
  }
  
  return format(dateObj, 'dd/MM/yyyy', { locale: ptBR });
};

// Format currency in Brazilian Real (R$)
export const formatCurrency = (value: number): string => {
  // Value is stored in cents
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value / 100);
};

// Format percentage with one decimal place
export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

// Get current month and year string
export const getCurrentMonthYear = (): string => {
  const date = new Date();
  return format(date, 'MMMM, yyyy', { locale: ptBR });
};
