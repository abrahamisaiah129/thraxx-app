import { create } from 'zustand';
import { DriverProfile, ShiftHistoryItem } from '@/types/domain';
import { profileRepo } from '@/services/mock';

interface ProfileStore {
  profile: DriverProfile | null;
  shiftHistory: ShiftHistoryItem[];
  isLoading: boolean;
  error: string | null;
  fetchProfileData: (driverId: string) => Promise<void>;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  profile: null,
  shiftHistory: [],
  isLoading: false,
  error: null,
  fetchProfileData: async (driverId: string) => {
    set({ isLoading: true, error: null });
    try {
      const [profile, shiftHistory] = await Promise.all([
        profileRepo.getProfile(driverId),
        profileRepo.getShiftHistory(driverId),
      ]);
      set({ profile, shiftHistory, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch profile', isLoading: false });
    }
  },
}));
