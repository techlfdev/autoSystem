import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Main entities for the auto repair shop

// Users (mechanics, admins, etc.)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  role: text("role").notNull(),
  avatar: text("avatar"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  fullName: true,
  role: true,
  avatar: true,
});

// Clients
export const clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  address: text("address"),
});

export const insertClientSchema = createInsertSchema(clients).pick({
  name: true,
  phone: true,
  email: true,
  address: true,
});

// Vehicles
export const vehicles = pgTable("vehicles", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").notNull(),
  make: text("make").notNull(),
  model: text("model").notNull(),
  year: text("year").notNull(),
  licensePlate: text("license_plate").notNull(),
  color: text("color"),
});

export const insertVehicleSchema = createInsertSchema(vehicles).pick({
  clientId: true,
  make: true,
  model: true,
  year: true,
  licensePlate: true,
  color: true,
});

// Service status enum
export const serviceStatusEnum = z.enum([
  "PENDING",
  "IN_PROGRESS",
  "WAITING_PARTS",
  "WAITING_APPROVAL",
  "COMPLETED",
  "CANCELED",
]);

// Services
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  vehicleId: integer("vehicle_id").notNull(),
  clientId: integer("client_id").notNull(),
  mechanicId: integer("mechanic_id").notNull(),
  status: text("status").notNull(),
  description: text("description").notNull(),
  startDate: timestamp("start_date").notNull(),
  estimatedEndDate: timestamp("estimated_end_date"),
  actualEndDate: timestamp("actual_end_date"),
  progress: integer("progress").notNull().default(0),
  cost: integer("cost").notNull().default(0),
});

export const insertServiceSchema = createInsertSchema(services).pick({
  vehicleId: true,
  clientId: true,
  mechanicId: true,
  status: true,
  description: true,
  startDate: true,
  estimatedEndDate: true,
  cost: true,
});

// Appointments
export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").notNull(),
  vehicleId: integer("vehicle_id").notNull(),
  serviceType: text("service_type").notNull(),
  date: timestamp("date").notNull(),
  status: text("status").notNull(), // SCHEDULED, COMPLETED, CANCELED
  notes: text("notes"),
});

export const insertAppointmentSchema = createInsertSchema(appointments).pick({
  clientId: true,
  vehicleId: true,
  serviceType: true,
  date: true,
  status: true,
  notes: true,
});

// Inventory
export const inventory = pgTable("inventory", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  quantity: integer("quantity").notNull().default(0),
  minQuantity: integer("min_quantity").notNull().default(5),
  price: integer("price").notNull().default(0),
  category: text("category"),
});

export const insertInventorySchema = createInsertSchema(inventory).pick({
  name: true,
  description: true,
  quantity: true,
  minQuantity: true,
  price: true,
  category: true,
});

// Alerts
export const alerts = pgTable("alerts", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // INVENTORY, VEHICLE, SERVICE, CERTIFICATION
  message: text("message").notNull(),
  severity: text("severity").notNull(), // LOW, MEDIUM, HIGH, CRITICAL
  relatedId: integer("related_id"),
  relatedType: text("related_type"),
  isResolved: boolean("is_resolved").notNull().default(false),
  createdAt: timestamp("created_at").notNull(),
});

export const insertAlertSchema = createInsertSchema(alerts).pick({
  type: true,
  message: true,
  severity: true,
  relatedId: true,
  relatedType: true,
  isResolved: true,
  createdAt: true,
});

// Monthly revenue
export const revenue = pgTable("revenue", {
  id: serial("id").primaryKey(),
  month: integer("month").notNull(),
  year: integer("year").notNull(),
  amount: integer("amount").notNull(),
  serviceCount: integer("service_count").notNull(),
  averageTicket: integer("average_ticket").notNull(),
});

export const insertRevenueSchema = createInsertSchema(revenue).pick({
  month: true,
  year: true,
  amount: true,
  serviceCount: true,
  averageTicket: true,
});

// Export types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Client = typeof clients.$inferSelect;
export type InsertClient = z.infer<typeof insertClientSchema>;

export type Vehicle = typeof vehicles.$inferSelect;
export type InsertVehicle = z.infer<typeof insertVehicleSchema>;

export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;
export type ServiceStatus = z.infer<typeof serviceStatusEnum>;

export type Appointment = typeof appointments.$inferSelect;
export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;

export type InventoryItem = typeof inventory.$inferSelect;
export type InsertInventoryItem = z.infer<typeof insertInventorySchema>;

export type Alert = typeof alerts.$inferSelect;
export type InsertAlert = z.infer<typeof insertAlertSchema>;

export type Revenue = typeof revenue.$inferSelect;
export type InsertRevenue = z.infer<typeof insertRevenueSchema>;
