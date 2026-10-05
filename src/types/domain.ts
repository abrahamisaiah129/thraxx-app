// Auth
export interface User {
  id: string;
  name: string;
  role: 'driver';
  token: string;
}

// Shift
export type ShiftStatus = 'offline' | 'idle' | 'onTrip' | 'flagged';

export interface Shift {
  id: string;
  driverId: string;
  status: ShiftStatus;
  startTime?: Date;
  endTime?: Date;
}

// Assignment
export type AssignmentStatus = 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';

export interface Assignment {
  id: string;
  pickupLocation: string;
  dropoffLocation: string;
  status: AssignmentStatus;
  passengerName: string;
  scheduledTime: Date;
}

// Location
export interface LocationPoint {
  latitude: number;
  longitude: number;
  timestamp: Date;
  speed?: number;
  heading?: number;
}

// Proof of Delivery
export interface ProofOfDelivery {
  assignmentId: string;
  signatureUrl?: string;
  photoUrl?: string;
  notes?: string;
  timestamp: Date;
}

// Profile
export interface DriverProfile {
  id: string;
  name: string;
  completedTrips: number;
  onTimeRate: number; // Percentage 0-100
}

export interface ShiftHistoryItem {
  id: string;
  date: Date;
  durationHours: number;
  completedTrips: number;
}