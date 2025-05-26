// Firebase schema definitions
// These are just type definitions for our Firebase collections

export interface Service {
  id: string;
  name: string;
  description?: string;
  estimatedPrice?: string;
  createdAt: Date;
}

export interface Booking {
  id: string;
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleYear?: string;
  vehicleVin?: string;
  serviceId: string;
  appointmentDate: Date;
  status: string; // pending, confirmed, completed, cancelled
  message?: string;
  totalAmount?: string;
  isPaid: boolean;
  createdAt: Date;
}

// Export collection names for consistency
export const services = "services";
export const bookings = "bookings";
