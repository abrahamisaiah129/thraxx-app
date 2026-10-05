import { LocationRepo } from '../../types/repositories';
import { LocationPoint } from '../../types/domain';
import { simulateNetwork } from './utils';

export class MockLocationRepo implements LocationRepo {
  private trackingInterval: any = null;

  async startTracking(shiftId: string): Promise<void> {
    await simulateNetwork();
    if (this.trackingInterval) {
      clearInterval(this.trackingInterval);
    }
    
    // Simulate background location updates
    this.trackingInterval = setInterval(() => {
      console.log(`[MockLocationRepo] Location recorded for shift ${shiftId}`);
    }, 10000);
  }

  async stopTracking(): Promise<void> {
    await simulateNetwork();
    if (this.trackingInterval) {
      clearInterval(this.trackingInterval);
      this.trackingInterval = null;
    }
  }

  async recordLocation(point: LocationPoint): Promise<void> {
    // Fire and forget usually
    console.log('[MockLocationRepo] Manual location recorded', point);
  }
}

export const locationRepo = new MockLocationRepo();
