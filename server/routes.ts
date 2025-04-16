import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API ROUTES
  const apiRouter = "/api";

  // User routes
  app.get(`${apiRouter}/users`, async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users" });
    }
  });

  app.get(`${apiRouter}/users/:id`, async (req, res) => {
    try {
      const user = await storage.getUser(parseInt(req.params.id));
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user" });
    }
  });

  // Client routes
  app.get(`${apiRouter}/clients`, async (req, res) => {
    try {
      const clients = await storage.getAllClients();
      res.json(clients);
    } catch (error) {
      res.status(500).json({ message: "Error fetching clients" });
    }
  });

  // Service routes
  app.get(`${apiRouter}/services/in-progress`, async (req, res) => {
    try {
      const services = await storage.getServicesInProgress();
      
      // Enhanced service data with client and vehicle information
      const enhancedServices = await Promise.all(services.map(async (service) => {
        const client = await storage.getClient(service.clientId);
        const vehicle = await storage.getVehicle(service.vehicleId);
        const mechanic = await storage.getUser(service.mechanicId);
        
        return {
          ...service,
          client: client ? { id: client.id, name: client.name } : undefined,
          vehicle: vehicle ? { 
            id: vehicle.id, 
            make: vehicle.make, 
            model: vehicle.model, 
            year: vehicle.year,
            licensePlate: vehicle.licensePlate
          } : undefined,
          mechanic: mechanic ? { id: mechanic.id, name: mechanic.fullName } : undefined
        };
      }));
      
      res.json(enhancedServices);
    } catch (error) {
      res.status(500).json({ message: "Error fetching services in progress" });
    }
  });

  app.patch(`${apiRouter}/services/:id/status`, async (req, res) => {
    try {
      const { status, progress } = req.body;
      const service = await storage.updateServiceStatus(
        parseInt(req.params.id),
        status,
        progress
      );
      
      if (!service) return res.status(404).json({ message: "Service not found" });
      res.json(service);
    } catch (error) {
      res.status(500).json({ message: "Error updating service status" });
    }
  });

  app.patch(`${apiRouter}/services/:id/progress`, async (req, res) => {
    try {
      const { progress } = req.body;
      const service = await storage.updateServiceProgress(
        parseInt(req.params.id),
        progress
      );
      
      if (!service) return res.status(404).json({ message: "Service not found" });
      res.json(service);
    } catch (error) {
      res.status(500).json({ message: "Error updating service progress" });
    }
  });

  // Appointment routes
  app.get(`${apiRouter}/appointments/today`, async (req, res) => {
    try {
      const today = new Date();
      const appointments = await storage.getAppointmentsByDate(today);
      
      // Enhanced appointment data with client and vehicle information
      const enhancedAppointments = await Promise.all(appointments.map(async (appointment) => {
        const client = await storage.getClient(appointment.clientId);
        const vehicle = await storage.getVehicle(appointment.vehicleId);
        
        return {
          ...appointment,
          client: client ? { id: client.id, name: client.name } : undefined,
          vehicle: vehicle ? { 
            id: vehicle.id, 
            make: vehicle.make, 
            model: vehicle.model 
          } : undefined
        };
      }));
      
      res.json(enhancedAppointments);
    } catch (error) {
      res.status(500).json({ message: "Error fetching today's appointments" });
    }
  });

  // Inventory routes
  app.get(`${apiRouter}/inventory/low-stock`, async (req, res) => {
    try {
      const items = await storage.getLowStockItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Error fetching low stock items" });
    }
  });

  // Alert routes
  app.get(`${apiRouter}/alerts/critical`, async (req, res) => {
    try {
      const alerts = await storage.getCriticalAlerts();
      res.json(alerts);
    } catch (error) {
      res.status(500).json({ message: "Error fetching critical alerts" });
    }
  });

  app.patch(`${apiRouter}/alerts/:id/resolve`, async (req, res) => {
    try {
      const alert = await storage.resolveAlert(parseInt(req.params.id));
      if (!alert) return res.status(404).json({ message: "Alert not found" });
      res.json(alert);
    } catch (error) {
      res.status(500).json({ message: "Error resolving alert" });
    }
  });

  // Revenue routes
  app.get(`${apiRouter}/revenue`, async (req, res) => {
    try {
      const revenues = await storage.getAllRevenue();
      res.json(revenues);
    } catch (error) {
      res.status(500).json({ message: "Error fetching revenue data" });
    }
  });

  app.get(`${apiRouter}/revenue/current-month`, async (req, res) => {
    try {
      const today = new Date();
      const currentMonth = today.getMonth() + 1;
      const currentYear = today.getFullYear();
      
      const revenue = await storage.getMonthlyRevenue(currentMonth, currentYear);
      res.json(revenue);
    } catch (error) {
      res.status(500).json({ message: "Error fetching current month revenue" });
    }
  });

  // Dashboard summary
  app.get(`${apiRouter}/dashboard-summary`, async (req, res) => {
    try {
      // Get all the data for the dashboard in a single request
      const servicesInProgress = await storage.getServicesInProgress();
      
      const today = new Date();
      const todayAppointments = await storage.getAppointmentsByDate(today);
      
      const currentMonth = today.getMonth() + 1;
      const currentYear = today.getFullYear();
      const monthlyRevenue = await storage.getMonthlyRevenue(currentMonth, currentYear);
      const previousMonthRevenue = await storage.getMonthlyRevenue(currentMonth - 1, currentYear);
      
      const criticalAlerts = await storage.getCriticalAlerts();
      const lowStockItems = await storage.getLowStockItems();
      
      const allRevenue = await storage.getAllRevenue();
      
      // Calculate growth percentages
      let revenueGrowth = 0;
      if (previousMonthRevenue && monthlyRevenue) {
        revenueGrowth = ((monthlyRevenue.amount - previousMonthRevenue.amount) / previousMonthRevenue.amount) * 100;
      }
      
      // Format response data
      const response = {
        servicesInProgress: {
          count: servicesInProgress.length,
          // Only return necessary data for the dashboard
          items: servicesInProgress.map(service => ({
            id: service.id,
            status: service.status,
            description: service.description,
            progress: service.progress,
            startDate: service.startDate,
            clientId: service.clientId,
            vehicleId: service.vehicleId,
            mechanicId: service.mechanicId
          }))
        },
        todayAppointments: {
          count: todayAppointments.length,
          items: todayAppointments.map(app => ({
            id: app.id,
            time: app.date,
            serviceType: app.serviceType,
            clientId: app.clientId,
            vehicleId: app.vehicleId,
            status: app.status
          })),
          nextAppointment: todayAppointments.length > 0 ? {
            id: todayAppointments[0].id,
            timeRemaining: Math.floor((new Date(todayAppointments[0].date).getTime() - new Date().getTime()) / (1000 * 60)) // minutes
          } : null
        },
        monthlyRevenue: {
          total: monthlyRevenue ? monthlyRevenue.amount : 0,
          growth: revenueGrowth.toFixed(1),
          serviceCount: monthlyRevenue ? monthlyRevenue.serviceCount : 0,
          averageTicket: monthlyRevenue ? monthlyRevenue.averageTicket : 0,
          goalProgress: monthlyRevenue ? 78 : 0 // Mocked goal progress for now
        },
        criticalAlerts: {
          count: criticalAlerts.length,
          items: criticalAlerts.map(alert => ({
            id: alert.id,
            type: alert.type,
            message: alert.message,
            severity: alert.severity,
            createdAt: alert.createdAt
          }))
        },
        inventory: {
          lowStockCount: lowStockItems.length,
          lowStockItems: lowStockItems.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            minQuantity: item.minQuantity
          }))
        },
        revenueChart: {
          labels: allRevenue.map(rev => {
            const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
            return monthNames[rev.month - 1];
          }),
          currentYearData: allRevenue.map(rev => rev.amount),
          previousYearData: allRevenue.map(rev => Math.round(rev.amount * 0.85)) // Mock previous year data
        }
      };
      
      res.json(response);
    } catch (error) {
      res.status(500).json({ message: "Error fetching dashboard summary" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
