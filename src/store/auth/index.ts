import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  clearAuth: () => void;
  refreshAccessToken: () => Promise<string | null>;
}

const store: StateCreator<AuthState> = (set) => ({
  accessToken: null,
  setAccessToken: (state) => set({ accessToken: state }),
  clearAuth: () => set({ accessToken: null }),
  refreshAccessToken: async () => {
    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const data = await response.json();
      set({ accessToken: data.accessToken });
      return data.accessToken;
    } catch (error) {
      console.error('Error refreshing token:', error);
      set({ accessToken: null });
      return null;
    }
  },
});

const useAuthStore = create<AuthState>()(
  devtools(store, { enabled: process.env.NODE_ENV === 'development' }),
);

export default useAuthStore;
