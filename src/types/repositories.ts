import { User, Shift, ShiftStatus, Assignment, LocationPoint, ProofOfDelivery, DriverProfile, ShiftHistoryItem } from './domain';

export interface AuthRepo {
  requestOtp(phone: string): Promise<{ isRegistered: boolean }>;
  verifyOtp(phone: string, otp: string): Promise<User>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
}

export interface ShiftRepo {
  startShift(driverId: string): Promise<Shift>;
  endShift(shiftId: string): Promise<void>;
  updateStatus(shiftId: string, status: ShiftStatus): Promise<Shift>;
  getCurrentShift(): Promise<Shift | null>;
}

export interface AssignmentsRepo {
  getPendingAssignments(): Promise<Assignment[]>;
  getActiveAssignment(): Promise<Assignment | null>;
  acceptAssignment(id: string): Promise<Assignment>;
  completeAssignment(id: string): Promise<void>;
}

export interface LocationRepo {
  startTracking(shiftId: string): Promise<void>;
  stopTracking(): Promise<void>;
  recordLocation(point: LocationPoint): Promise<void>;
}

export interface ProofRepo {
  submitProof(proof: ProofOfDelivery): Promise<void>;
}

export interface ProfileRepo {
  getProfile(driverId: string): Promise<DriverProfile>;
  getShiftHistory(driverId: string): Promise<ShiftHistoryItem[]>;
}
