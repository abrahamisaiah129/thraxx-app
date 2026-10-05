import { create } from 'zustand';

export type ShiftState = 'off_shift' | 'on_shift' | 'trip_active' | 'signoff_pending' | 'signed_off';

interface ShiftStore {
  state: ShiftState;
  startShift: () => void;
  startTrip: () => void;
  endTrip: () => void;
  initiateSignOff: () => void;
  completeSignOff: () => void;
  resetShift: () => void;
}

export const useShiftStore = create<ShiftStore>((set, get) => ({
  state: 'off_shift',

  startShift: () => {
    if (get().state === 'off_shift' || get().state === 'signed_off') {
      set({ state: 'on_shift' });
    } else {
      console.warn(`Cannot start shift from state ${get().state}`);
    }
  },

  startTrip: () => {
    if (get().state === 'on_shift') {
      set({ state: 'trip_active' });
    } else {
      console.warn(`Cannot start trip from state ${get().state}`);
    }
  },

  endTrip: () => {
    if (get().state === 'trip_active') {
      set({ state: 'on_shift' });
    } else {
      console.warn(`Cannot end trip from state ${get().state}`);
    }
  },

  initiateSignOff: () => {
    if (get().state === 'on_shift') {
      set({ state: 'signoff_pending' });
    } else {
      console.warn(`Cannot initiate sign-off from state ${get().state}`);
    }
  },

  completeSignOff: () => {
    if (get().state === 'signoff_pending') {
      set({ state: 'signed_off' });
    } else {
      console.warn(`Cannot complete sign-off from state ${get().state}`);
    }
  },

  resetShift: () => {
    if (get().state === 'signed_off') {
      set({ state: 'off_shift' });
    } else {
      console.warn(`Cannot reset shift from state ${get().state}`);
    }
  }
}));

// Selectors
export const selectShiftState = (state: ShiftStore) => state.state;
export const selectIsOffShift = (state: ShiftStore) => state.state === 'off_shift';
export const selectIsOnShift = (state: ShiftStore) => state.state === 'on_shift';
export const selectIsTripActive = (state: ShiftStore) => state.state === 'trip_active';
export const selectIsSignoffPending = (state: ShiftStore) => state.state === 'signoff_pending';
export const selectIsSignedOff = (state: ShiftStore) => state.state === 'signed_off';

