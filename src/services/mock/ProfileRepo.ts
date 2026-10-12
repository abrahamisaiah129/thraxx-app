import { ProfileRepo } from '@/types/repositories';
import { DriverProfile, ShiftHistoryItem } from '@/types/domain';

const mockProfile: DriverProfile = {
  id: 'driver_123',
  name: 'John Doe',
  completedTrips: 142,
  onTimeRate: 98,
};

const mockHistory: ShiftHistoryItem[] = [
  {
    id: 'shift_1',
    date: new Date('2026-10-01T08:00:00Z'),
    durationHours: 8.5,
    completedTrips: 12,
  },
  {
    id: 'shift_2',
    date: new Date('2026-10-02T09:00:00Z'),
    durationHours: 7.2,
    completedTrips: 9,
  },
];

export class MockProfileRepo implements ProfileRepo {
  async getProfile(driverId: string): Promise<DriverProfile> {
    return new Promise((resolve) => setTimeout(() => resolve(mockProfile), 500));
  }

  async getShiftHistory(driverId: string): Promise<ShiftHistoryItem[]> {
    return new Promise((resolve) => setTimeout(() => resolve(mockHistory), 500));
  }
}

export const profileRepo = new MockProfileRepo();