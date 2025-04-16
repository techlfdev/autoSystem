import {
  User, InsertUser, Client, InsertClient, Vehicle, InsertVehicle,
  Service, InsertService, Appointment, InsertAppointment,
  InventoryItem, InsertInventoryItem, Alert, InsertAlert,
  Revenue, InsertRevenue, serviceStatusEnum
} from "@shared/schema";

// Interface for all storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;

  // Client operations
  getClient(id: number): Promise<Client | undefined>;
  createClient(client: InsertClient): Promise<Client>;
  getAllClients(): Promise<Client[]>;

  // Vehicle operations
  getVehicle(id: number): Promise<Vehicle | undefined>;
  getVehiclesByClientId(clientId: number): Promise<Vehicle[]>;
  createVehicle(vehicle: InsertVehicle): Promise<Vehicle>;

  // Service operations
  getService(id: number): Promise<Service | undefined>;
  getServicesByStatus(status: string): Promise<Service[]>;
  getServicesInProgress(): Promise<Service[]>;
  createService(service: InsertService): Promise<Service>;
  updateServiceStatus(id: number, status: string, progress?: number): Promise<Service | undefined>;
  updateServiceProgress(id: number, progress: number): Promise<Service | undefined>;
  
  // Appointment operations
  getAppointment(id: number): Promise<Appointment | undefined>;
  getAppointmentsByDate(date: Date): Promise<Appointment[]>;
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  
  // Inventory operations
  getInventoryItem(id: number): Promise<InventoryItem | undefined>;
  getAllInventoryItems(): Promise<InventoryItem[]>;
  getLowStockItems(): Promise<InventoryItem[]>;
  createInventoryItem(item: InsertInventoryItem): Promise<InventoryItem>;
  updateInventoryItemQuantity(id: number, quantity: number): Promise<InventoryItem | undefined>;
  
  // Alert operations
  getAlert(id: number): Promise<Alert | undefined>;
  getCriticalAlerts(): Promise<Alert[]>;
  createAlert(alert: InsertAlert): Promise<Alert>;
  resolveAlert(id: number): Promise<Alert | undefined>;
  
  // Revenue operations
  getMonthlyRevenue(month: number, year: number): Promise<Revenue | undefined>;
  getAllRevenue(): Promise<Revenue[]>;
  createRevenue(revenue: InsertRevenue): Promise<Revenue>;
}

// In-memory implementation of the storage interface
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private clients: Map<number, Client>;
  private vehicles: Map<number, Vehicle>;
  private services: Map<number, Service>;
  private appointments: Map<number, Appointment>;
  private inventory: Map<number, InventoryItem>;
  private alerts: Map<number, Alert>;
  private revenues: Map<number, Revenue>;
  
  private currentIds: {
    users: number;
    clients: number;
    vehicles: number;
    services: number;
    appointments: number;
    inventory: number;
    alerts: number;
    revenues: number;
  };

  constructor() {
    this.users = new Map();
    this.clients = new Map();
    this.vehicles = new Map();
    this.services = new Map();
    this.appointments = new Map();
    this.inventory = new Map();
    this.alerts = new Map();
    this.revenues = new Map();
    
    this.currentIds = {
      users: 1,
      clients: 1,
      vehicles: 1,
      services: 1,
      appointments: 1,
      inventory: 1,
      alerts: 1,
      revenues: 1,
    };

    // Init with sample data for development
    this.initSampleData();
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentIds.users++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  // Client operations
  async getClient(id: number): Promise<Client | undefined> {
    return this.clients.get(id);
  }

  async createClient(client: InsertClient): Promise<Client> {
    const id = this.currentIds.clients++;
    const newClient: Client = { ...client, id };
    this.clients.set(id, newClient);
    return newClient;
  }

  async getAllClients(): Promise<Client[]> {
    return Array.from(this.clients.values());
  }

  // Vehicle operations
  async getVehicle(id: number): Promise<Vehicle | undefined> {
    return this.vehicles.get(id);
  }

  async getVehiclesByClientId(clientId: number): Promise<Vehicle[]> {
    return Array.from(this.vehicles.values()).filter(
      vehicle => vehicle.clientId === clientId
    );
  }

  async createVehicle(vehicle: InsertVehicle): Promise<Vehicle> {
    const id = this.currentIds.vehicles++;
    const newVehicle: Vehicle = { ...vehicle, id };
    this.vehicles.set(id, newVehicle);
    return newVehicle;
  }

  // Service operations
  async getService(id: number): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async getServicesByStatus(status: string): Promise<Service[]> {
    return Array.from(this.services.values()).filter(
      service => service.status === status
    );
  }

  async getServicesInProgress(): Promise<Service[]> {
    return Array.from(this.services.values()).filter(
      service => service.status === "IN_PROGRESS" || service.status === "WAITING_PARTS"
    );
  }

  async createService(service: InsertService): Promise<Service> {
    const id = this.currentIds.services++;
    const newService: Service = { 
      ...service, 
      id, 
      actualEndDate: null,
      progress: service.progress || 0
    };
    this.services.set(id, newService);
    return newService;
  }

  async updateServiceStatus(id: number, status: string, progress?: number): Promise<Service | undefined> {
    const service = this.services.get(id);
    if (!service) return undefined;

    const updatedService: Service = { 
      ...service, 
      status,
      progress: progress !== undefined ? progress : service.progress
    };
    
    if (status === "COMPLETED" && !service.actualEndDate) {
      updatedService.actualEndDate = new Date();
    }
    
    this.services.set(id, updatedService);
    return updatedService;
  }

  async updateServiceProgress(id: number, progress: number): Promise<Service | undefined> {
    const service = this.services.get(id);
    if (!service) return undefined;

    const updatedService: Service = { ...service, progress };
    this.services.set(id, updatedService);
    return updatedService;
  }

  // Appointment operations
  async getAppointment(id: number): Promise<Appointment | undefined> {
    return this.appointments.get(id);
  }

  async getAppointmentsByDate(date: Date): Promise<Appointment[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    
    return Array.from(this.appointments.values()).filter(appointment => {
      const appointmentDate = new Date(appointment.date);
      return appointmentDate >= startOfDay && appointmentDate <= endOfDay;
    });
  }

  async createAppointment(appointment: InsertAppointment): Promise<Appointment> {
    const id = this.currentIds.appointments++;
    const newAppointment: Appointment = { ...appointment, id };
    this.appointments.set(id, newAppointment);
    return newAppointment;
  }

  // Inventory operations
  async getInventoryItem(id: number): Promise<InventoryItem | undefined> {
    return this.inventory.get(id);
  }

  async getAllInventoryItems(): Promise<InventoryItem[]> {
    return Array.from(this.inventory.values());
  }

  async getLowStockItems(): Promise<InventoryItem[]> {
    return Array.from(this.inventory.values()).filter(
      item => item.quantity < item.minQuantity
    );
  }

  async createInventoryItem(item: InsertInventoryItem): Promise<InventoryItem> {
    const id = this.currentIds.inventory++;
    const newItem: InventoryItem = { ...item, id };
    this.inventory.set(id, newItem);
    return newItem;
  }

  async updateInventoryItemQuantity(id: number, quantity: number): Promise<InventoryItem | undefined> {
    const item = this.inventory.get(id);
    if (!item) return undefined;

    const updatedItem: InventoryItem = { ...item, quantity };
    this.inventory.set(id, updatedItem);
    
    // Create an alert if quantity is below minimum
    if (quantity < item.minQuantity) {
      this.createAlert({
        type: "INVENTORY",
        message: `Estoque crítico: ${item.name}`,
        severity: "HIGH",
        relatedId: id,
        relatedType: "inventory",
        isResolved: false,
        createdAt: new Date()
      });
    }
    
    return updatedItem;
  }

  // Alert operations
  async getAlert(id: number): Promise<Alert | undefined> {
    return this.alerts.get(id);
  }

  async getCriticalAlerts(): Promise<Alert[]> {
    return Array.from(this.alerts.values()).filter(
      alert => alert.severity === "HIGH" || alert.severity === "CRITICAL"
    );
  }

  async createAlert(alert: InsertAlert): Promise<Alert> {
    const id = this.currentIds.alerts++;
    const newAlert: Alert = { ...alert, id };
    this.alerts.set(id, newAlert);
    return newAlert;
  }

  async resolveAlert(id: number): Promise<Alert | undefined> {
    const alert = this.alerts.get(id);
    if (!alert) return undefined;

    const resolvedAlert: Alert = { ...alert, isResolved: true };
    this.alerts.set(id, resolvedAlert);
    return resolvedAlert;
  }

  // Revenue operations
  async getMonthlyRevenue(month: number, year: number): Promise<Revenue | undefined> {
    return Array.from(this.revenues.values()).find(
      revenue => revenue.month === month && revenue.year === year
    );
  }

  async getAllRevenue(): Promise<Revenue[]> {
    return Array.from(this.revenues.values());
  }

  async createRevenue(revenue: InsertRevenue): Promise<Revenue> {
    const id = this.currentIds.revenues++;
    const newRevenue: Revenue = { ...revenue, id };
    this.revenues.set(id, newRevenue);
    return newRevenue;
  }

  // Initialize with sample data for development
  private initSampleData() {
    // Sample user (mechanic)
    const user1: User = {
      id: this.currentIds.users++,
      username: "carlos.silva",
      password: "password123",
      fullName: "Carlos Silva",
      role: "Gerente",
      avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    };
    this.users.set(user1.id, user1);

    // Sample clients
    const client1: Client = {
      id: this.currentIds.clients++,
      name: "Marcos Oliveira",
      phone: "(11) 98765-4321",
      email: "marcos@email.com",
      address: "Rua das Flores, 123"
    };
    this.clients.set(client1.id, client1);

    const client2: Client = {
      id: this.currentIds.clients++,
      name: "Ana Ferreira",
      phone: "(11) 91234-5678",
      email: "ana@email.com",
      address: "Av. Paulista, 1000"
    };
    this.clients.set(client2.id, client2);

    const client3: Client = {
      id: this.currentIds.clients++,
      name: "João Pereira",
      phone: "(11) 99876-5432",
      email: "joao@email.com",
      address: "Rua dos Pinheiros, 500"
    };
    this.clients.set(client3.id, client3);

    const client4: Client = {
      id: this.currentIds.clients++,
      name: "Ricardo Alves",
      phone: "(11) 94567-8901",
      email: "ricardo@email.com",
      address: "Av. Brasil, 200"
    };
    this.clients.set(client4.id, client4);

    // Sample vehicles
    const vehicle1: Vehicle = {
      id: this.currentIds.vehicles++,
      clientId: client1.id,
      make: "Honda",
      model: "Civic",
      year: "2020",
      licensePlate: "ABC-1234",
      color: "Preto"
    };
    this.vehicles.set(vehicle1.id, vehicle1);

    const vehicle2: Vehicle = {
      id: this.currentIds.vehicles++,
      clientId: client2.id,
      make: "Fiat",
      model: "Argo",
      year: "2021",
      licensePlate: "DEF-5678",
      color: "Vermelho"
    };
    this.vehicles.set(vehicle2.id, vehicle2);

    const vehicle3: Vehicle = {
      id: this.currentIds.vehicles++,
      clientId: client3.id,
      make: "Toyota",
      model: "Corolla",
      year: "2019",
      licensePlate: "GHI-9012",
      color: "Prata"
    };
    this.vehicles.set(vehicle3.id, vehicle3);

    const vehicle4: Vehicle = {
      id: this.currentIds.vehicles++,
      clientId: client4.id,
      make: "Honda",
      model: "Fit",
      year: "2018",
      licensePlate: "JKL-3456",
      color: "Azul"
    };
    this.vehicles.set(vehicle4.id, vehicle4);

    // Sample services
    const today = new Date();
    
    const service1: Service = {
      id: this.currentIds.services++,
      vehicleId: vehicle1.id,
      clientId: client1.id,
      mechanicId: user1.id,
      status: "IN_PROGRESS",
      description: "Troca de Óleo + Revisão",
      startDate: new Date(today.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
      estimatedEndDate: new Date(today.getTime() + 1 * 60 * 60 * 1000), // 1 hour from now
      actualEndDate: null,
      progress: 70,
      cost: 25000 // R$ 250.00 (stored in cents)
    };
    this.services.set(service1.id, service1);

    const service2: Service = {
      id: this.currentIds.services++,
      vehicleId: vehicle2.id,
      clientId: client2.id,
      mechanicId: user1.id,
      status: "WAITING_PARTS",
      description: "Substituição de Pastilhas de Freio",
      startDate: new Date(today.getTime() - 4 * 60 * 60 * 1000), // 4 hours ago
      estimatedEndDate: new Date(today.getTime() + 2 * 60 * 60 * 1000), // 2 hours from now
      actualEndDate: null,
      progress: 40,
      cost: 35000 // R$ 350.00
    };
    this.services.set(service2.id, service2);

    const service3: Service = {
      id: this.currentIds.services++,
      vehicleId: vehicle3.id,
      clientId: client3.id,
      mechanicId: user1.id,
      status: "COMPLETED",
      description: "Alinhamento e Balanceamento",
      startDate: new Date(today.getTime() - 3 * 60 * 60 * 1000), // 3 hours ago
      estimatedEndDate: new Date(today.getTime() - 1 * 60 * 60 * 1000), // 1 hour ago
      actualEndDate: new Date(today.getTime() - 30 * 60 * 1000), // 30 minutes ago
      progress: 100,
      cost: 15000 // R$ 150.00
    };
    this.services.set(service3.id, service3);

    // Sample appointments
    const appointment1: Appointment = {
      id: this.currentIds.appointments++,
      clientId: client1.id,
      vehicleId: vehicle1.id,
      serviceType: "Troca de Óleo",
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8, 30), // Today at 8:30 AM
      status: "SCHEDULED",
      notes: "Cliente solicitou verificação dos filtros"
    };
    this.appointments.set(appointment1.id, appointment1);

    const appointment2: Appointment = {
      id: this.currentIds.appointments++,
      clientId: client2.id,
      vehicleId: vehicle2.id,
      serviceType: "Revisão Completa",
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 15), // Today at 10:15 AM
      status: "SCHEDULED",
      notes: ""
    };
    this.appointments.set(appointment2.id, appointment2);

    const appointment3: Appointment = {
      id: this.currentIds.appointments++,
      clientId: client3.id,
      vehicleId: vehicle3.id,
      serviceType: "Freios e Suspensão",
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13, 0), // Today at 1:00 PM
      status: "SCHEDULED",
      notes: "Cliente relatou barulho ao frear"
    };
    this.appointments.set(appointment3.id, appointment3);

    const appointment4: Appointment = {
      id: this.currentIds.appointments++,
      clientId: client4.id,
      vehicleId: vehicle4.id,
      serviceType: "Diagnóstico Eletrônico",
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 15, 30), // Today at 3:30 PM
      status: "SCHEDULED",
      notes: "Luz do motor acendendo intermitentemente"
    };
    this.appointments.set(appointment4.id, appointment4);

    // Sample inventory items
    const inventoryItem1: InventoryItem = {
      id: this.currentIds.inventory++,
      name: "Óleo 5W30",
      description: "Óleo sintético para motor",
      quantity: 2,
      minQuantity: 5,
      price: 8500, // R$ 85.00
      category: "Lubrificantes"
    };
    this.inventory.set(inventoryItem1.id, inventoryItem1);

    const inventoryItem2: InventoryItem = {
      id: this.currentIds.inventory++,
      name: "Filtro de Óleo",
      description: "Filtro de óleo para veículos leves",
      quantity: 10,
      minQuantity: 5,
      price: 2500, // R$ 25.00
      category: "Filtros"
    };
    this.inventory.set(inventoryItem2.id, inventoryItem2);

    // Sample alerts
    const alert1: Alert = {
      id: this.currentIds.alerts++,
      type: "INVENTORY",
      message: "Estoque Crítico: Óleo 5W30",
      severity: "HIGH",
      relatedId: inventoryItem1.id,
      relatedType: "inventory",
      isResolved: false,
      createdAt: new Date()
    };
    this.alerts.set(alert1.id, alert1);

    const alert2: Alert = {
      id: this.currentIds.alerts++,
      type: "VEHICLE",
      message: "Veículo em Espera: 7+ dias",
      severity: "MEDIUM",
      relatedId: vehicle4.id,
      relatedType: "vehicle",
      isResolved: false,
      createdAt: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
    };
    this.alerts.set(alert2.id, alert2);

    const alert3: Alert = {
      id: this.currentIds.alerts++,
      type: "SERVICE",
      message: "Revisões Pendentes",
      severity: "HIGH",
      relatedId: null,
      relatedType: null,
      isResolved: false,
      createdAt: new Date()
    };
    this.alerts.set(alert3.id, alert3);

    const alert4: Alert = {
      id: this.currentIds.alerts++,
      type: "CERTIFICATION",
      message: "Certificação Vencendo",
      severity: "HIGH",
      relatedId: null,
      relatedType: null,
      isResolved: false,
      createdAt: new Date()
    };
    this.alerts.set(alert4.id, alert4);

    // Sample revenue data
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    const revenue1: Revenue = {
      id: this.currentIds.revenues++,
      month: currentMonth - 5,
      year: currentYear,
      amount: 3200000, // R$ 32,000.00
      serviceCount: 89,
      averageTicket: 35955 // R$ 359.55
    };
    this.revenues.set(revenue1.id, revenue1);

    const revenue2: Revenue = {
      id: this.currentIds.revenues++,
      month: currentMonth - 4,
      year: currentYear,
      amount: 2900000, // R$ 29,000.00
      serviceCount: 81,
      averageTicket: 35802 // R$ 358.02
    };
    this.revenues.set(revenue2.id, revenue2);

    const revenue3: Revenue = {
      id: this.currentIds.revenues++,
      month: currentMonth - 3,
      year: currentYear,
      amount: 3500000, // R$ 35,000.00
      serviceCount: 97,
      averageTicket: 36082 // R$ 360.82
    };
    this.revenues.set(revenue3.id, revenue3);

    const revenue4: Revenue = {
      id: this.currentIds.revenues++,
      month: currentMonth - 2,
      year: currentYear,
      amount: 3800000, // R$ 38,000.00
      serviceCount: 105,
      averageTicket: 36190 // R$ 361.90
    };
    this.revenues.set(revenue4.id, revenue4);

    const revenue5: Revenue = {
      id: this.currentIds.revenues++,
      month: currentMonth - 1,
      year: currentYear,
      amount: 4100000, // R$ 41,000.00
      serviceCount: 112,
      averageTicket: 36607 // R$ 366.07
    };
    this.revenues.set(revenue5.id, revenue5);

    const revenue6: Revenue = {
      id: this.currentIds.revenues++,
      month: currentMonth,
      year: currentYear,
      amount: 4585000, // R$ 45,850.00
      serviceCount: 119,
      averageTicket: 38529 // R$ 385.29
    };
    this.revenues.set(revenue6.id, revenue6);
  }
}

export const storage = new MemStorage();
