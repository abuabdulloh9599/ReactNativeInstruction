import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  hasRegistered: boolean;
  login: () => void;
  logout: () => void;
  register: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  isAuthenticated: false,
  hasRegistered: true,
  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),
  register: () => set({ hasRegistered: true }),
}));
