import { ProofRepo } from '@/types/repositories';
import { ProofOfDelivery } from '@/types/domain';
import { simulateNetwork } from './utils';

export class MockProofRepo implements ProofRepo {
  async submitProof(proof: ProofOfDelivery): Promise<void> {
    await simulateNetwork(2000); // Takes a bit longer to upload
    console.log('[MockProofRepo] Proof submitted', proof);
  }
}

export const proofRepo = new MockProofRepo();
