import { AssignmentsRepo } from '@/types/repositories';
import { Assignment } from '@/types/domain';
import { simulateNetwork } from './utils';

const MOCK_ASSIGNMENTS: Assignment[] = [
  {
    id: 'assig_1',
    pickupLocation: '123 Main St, Springfield',
    dropoffLocation: '456 Elm St, Springfield',
    status: 'pending',
    passengerName: 'John Smith',
    scheduledTime: new Date(Date.now() + 3600000)
  },
  {
    id: 'assig_2',
    pickupLocation: '789 Oak Ave, Springfield',
    dropoffLocation: '101 Pine Rd, Springfield',
    status: 'pending',
    passengerName: 'Alice Johnson',
    scheduledTime: new Date(Date.now() + 7200000)
  }
];

let assignments = [...MOCK_ASSIGNMENTS];

export class MockAssignmentsRepo implements AssignmentsRepo {
  async getPendingAssignments(): Promise<Assignment[]> {
    await simulateNetwork();
    return assignments.filter(a => a.status === 'pending');
  }

  async getActiveAssignment(): Promise<Assignment | null> {
    await simulateNetwork();
    return assignments.find(a => ['accepted', 'in_progress'].includes(a.status)) || null;
  }

  async acceptAssignment(id: string): Promise<Assignment> {
    await simulateNetwork();
    const idx = assignments.findIndex(a => a.id === id);
    if (idx === -1) throw new Error('Assignment not found');
    
    assignments[idx] = { ...assignments[idx], status: 'accepted' };
    return assignments[idx];
  }

  async completeAssignment(id: string): Promise<void> {
    await simulateNetwork();
    const idx = assignments.findIndex(a => a.id === id);
    if (idx === -1) throw new Error('Assignment not found');
    
    assignments[idx] = { ...assignments[idx], status: 'completed' };
  }
}

export const assignmentsRepo = new MockAssignmentsRepo();
