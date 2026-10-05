import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useShiftStore, ShiftState } from '../store/useShiftStore';
import { useActiveTripStore } from '../store/useActiveTripStore';
import { Assignment } from '../types/domain';

// Mock API functions
const fetchCurrentShift = async (): Promise<ShiftState> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve('off_shift'), 500);
  });
};

const fetchActiveTrip = async (): Promise<Assignment | null> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(null), 500);
  });
};

export const useShiftQueries = () => {
  const queryClient = useQueryClient();
  const shiftStore = useShiftStore();

  const { data: shiftState, isLoading: isShiftLoading } = useQuery({
    queryKey: ['shift'],
    queryFn: async () => {
      // In a real app, this would fetch the shift state from the backend
      return shiftStore.state;
    },
  });

  const startShiftMutation = useMutation({
    mutationFn: async () => {
      // API call to start shift
      return 'on_shift' as ShiftState;
    },
    onSuccess: () => {
      shiftStore.startShift();
      queryClient.invalidateQueries({ queryKey: ['shift'] });
    },
  });

  return {
    shiftState,
    isShiftLoading,
    startShift: startShiftMutation.mutate,
    isStartingShift: startShiftMutation.isPending,
    // Add other mutations as needed
  };
};

export const useActiveTripQueries = () => {
  const queryClient = useQueryClient();
  const tripStore = useActiveTripStore();

  const { data: activeTrip, isLoading: isTripLoading } = useQuery({
    queryKey: ['activeTrip'],
    queryFn: async () => {
      // Return local state or fetch from backend
      return tripStore.activeTrip;
    },
  });

  const startTripMutation = useMutation({
    mutationFn: async (trip: Assignment) => {
      return trip;
    },
    onSuccess: (trip) => {
      tripStore.setActiveTrip({ ...trip, status: 'in_progress' });
      useShiftStore.getState().startTrip();
      queryClient.invalidateQueries({ queryKey: ['activeTrip'] });
      queryClient.invalidateQueries({ queryKey: ['shift'] });
    }
  });

  const completeTripMutation = useMutation({
    mutationFn: async () => {
      return true;
    },
    onSuccess: () => {
      tripStore.updateTripStatus('completed');
      useShiftStore.getState().endTrip();
      queryClient.invalidateQueries({ queryKey: ['activeTrip'] });
      queryClient.invalidateQueries({ queryKey: ['shift'] });
    }
  });

  return {
    activeTrip,
    isTripLoading,
    startTrip: startTripMutation.mutate,
    completeTrip: completeTripMutation.mutate,
  };
};
