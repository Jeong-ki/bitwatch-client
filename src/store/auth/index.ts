import { create, StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  clearAuth: () => void;
}

const store: StateCreator<AuthState> = (set) => ({
  accessToken: null,
  setAccessToken: (state) => set({ accessToken: state }),
  clearAuth: () => set({ accessToken: null }),
});

const useAuthStore = create<AuthState>()(
  devtools(persist(store, { name: 'auth-storage' }), {
    enabled: process.env.NODE_ENV === 'development',
  }),
);

export default useAuthStore;
