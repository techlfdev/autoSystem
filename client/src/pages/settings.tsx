
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { EnhancedDashboardLayout } from '@/components/layout/enhanced-dashboard-layout';
import { SettingsMetrics } from '@/components/settings/settings-metrics';
import { CompanySettings } from '@/components/settings/company-settings';
import { UserPermissions } from '@/components/settings/user-permissions';
import { SystemPreferences } from '@/components/settings/system-preferences';
import { IntegrationSettings } from '@/components/settings/integration-settings';
import { NotificationTemplates } from '@/components/settings/notification-templates';
import { SubscriptionSettings } from '@/components/settings/subscription-settings';
import { SecuritySettings } from '@/components/settings/security-settings';
import { Badge } from '@/components/ui/badge';

export default function SettingsPage() {
  return (
    <EnhancedDashboardLayout>
      <div className="container mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-semibold tracking-tight">Configurações</h1>
        
        <SettingsMetrics />
        
        <Tabs defaultValue="company" className="space-y-6">
          <TabsList className="bg-white">
            <TabsTrigger value="company">Informações da Oficina</TabsTrigger>
            <TabsTrigger value="users">Usuários e Permissões</TabsTrigger>
            <TabsTrigger value="preferences">Preferências</TabsTrigger>
            <TabsTrigger value="integrations">Integrações</TabsTrigger>
            <TabsTrigger value="notifications">Notificações</TabsTrigger>
            <TabsTrigger value="subscription">Assinatura</TabsTrigger>
            <TabsTrigger value="security">Segurança</TabsTrigger>
            </TabsList>

          <TabsContent value="company">
            <CompanySettings />
          </TabsContent>
          
          <TabsContent value="users">
            <UserPermissions />
          </TabsContent>
          
          <TabsContent value="preferences">
            <SystemPreferences />
          </TabsContent>
          
          <TabsContent value="integrations">
            <IntegrationSettings />
          </TabsContent>
          
          <TabsContent value="notifications">
            <NotificationTemplates />
          </TabsContent>
          
          <TabsContent value="subscription">
            <SubscriptionSettings />
          </TabsContent>
          
          <TabsContent value="security">
            <SecuritySettings />
          </TabsContent>
          
          
        </Tabs>
      </div>
    </EnhancedDashboardLayout>
  );
}
