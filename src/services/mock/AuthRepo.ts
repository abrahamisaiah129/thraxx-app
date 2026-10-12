import { AuthRepo } from '@/types/repositories';
import { User } from '@/types/domain';
import { simulateNetwork } from './utils';

const MOCK_USER: User = {
  id: 'drv_123',
  name: 'Jane Doe',
  role: 'driver',
  token: 'mock-jwt-token'
};

let currentUser: User | null = null;

export class MockAuthRepo implements AuthRepo {
  async requestOtp(phone: string): Promise<{ isRegistered: boolean }> {
    await simulateNetwork();
    // Simulate checking if the phone is registered
    if (phone === '0000000000') {
      return { isRegistered: false };
    }
    return { isRegistered: true };
  }

  async verifyOtp(phone: string, otp: string): Promise<User> {
    await simulateNetwork();
    if (otp === '1234') {
      currentUser = MOCK_USER;
      return MOCK_USER;
    }
    throw new Error('Invalid OTP');
  }

  async logout(): Promise<void> {
    await simulateNetwork();
    currentUser = null;
  }

  async getCurrentUser(): Promise<User | null> {
    await simulateNetwork(500, 0); // Fast, no errors
    return currentUser;
  }
}

export const authRepo = new MockAuthRepo();
