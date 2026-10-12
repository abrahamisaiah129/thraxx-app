import { create } from 'zustand';
// just a simulation
// Types for our user and authentication state
export type UserRole = 'fleet_manager' | 'rider' | 'admin' | null;

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  login: (email: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

// Global Auth Store using Zustand
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email: string, role: UserRole) => {
    set({ isLoading: true });
    
    // MOCK DELAY: Simulate an API call taking 1.5 seconds
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // MOCK LOGIN: Set the user in global state
    set({
      user: {
        id: 'mock_user_123',
        name: email.split('@')[0],
        email: email,
        role: role,
      },
      isAuthenticated: true,
      isLoading: false,
    });
  },

  logout: () => {
    // Clear everything back to initial state
    set({ user: null, isAuthenticated: false, isLoading: false });
  },
}));
