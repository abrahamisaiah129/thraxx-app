import { create } from 'zustand';
import { Assignment } from '../types/domain';

interface ActiveTripStore {
  activeTrip: Assignment | null;
  setActiveTrip: (trip: Assignment | null) => void;
  updateTripStatus: (status: Assignment['status']) => void;
}

export const useActiveTripStore = create<ActiveTripStore>((set) => ({
  activeTrip: null,
  setActiveTrip: (trip) => set({ activeTrip: trip }),
  updateTripStatus: (status) =>
    set((state) => ({
      activeTrip: state.activeTrip ? { ...state.activeTrip, status } : null,
    })),
}));
