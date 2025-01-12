import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

interface User {
  email: string;
  nickname: string;
}

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
}

const store: StateCreator<UserState> = (set) => ({
  user: null,
  setUser: (user) => set({ user }),
});

const useUserStore = create<UserState>()(
  devtools(store, { enabled: process.env.NODE_ENV === 'development' }),
);

export default useUserStore;
