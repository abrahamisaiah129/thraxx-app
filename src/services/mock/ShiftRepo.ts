import { ShiftRepo } from '../../types/repositories';
import { Shift, ShiftStatus } from '../../types/domain';
import { simulateNetwork } from './utils';

let currentShift: Shift | null = null;

export class MockShiftRepo implements ShiftRepo {
  async startShift(driverId: string): Promise<Shift> {
    await simulateNetwork();
    currentShift = {
      id: `shift_${Date.now()}`,
      driverId,
      status: 'idle',
      startTime: new Date()
    };
    return currentShift;
  }

  async endShift(shiftId: string): Promise<void> {
    await simulateNetwork();
    if (currentShift && currentShift.id === shiftId) {
      currentShift.status = 'offline';
      currentShift.endTime = new Date();
    }
  }

  async updateStatus(shiftId: string, status: ShiftStatus): Promise<Shift> {
    await simulateNetwork();
    if (!currentShift || currentShift.id !== shiftId) {
      throw new Error('Shift not found');
    }
    currentShift.status = status;
    return currentShift;
  }

  async getCurrentShift(): Promise<Shift | null> {
    await simulateNetwork(500, 0);
    return currentShift;
  }
}

export const shiftRepo = new MockShiftRepo();
