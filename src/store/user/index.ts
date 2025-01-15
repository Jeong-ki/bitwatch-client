import { create, StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface User {
  email: string;
  nickname: string;
}

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

const store: StateCreator<UserState> = (set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
});

const useUserStore = create<UserState>()(
  devtools(persist(store, { name: 'user-storage' }), {
    enabled: process.env.NODE_ENV === 'development',
  }),
);

export default useUserStore;
