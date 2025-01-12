import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

interface GlobalState {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const store: StateCreator<GlobalState> = (set) => ({
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
});

const useGlobalStore = create<GlobalState>()(
  devtools(store, { enabled: process.env.NODE_ENV === 'development' }),
);

export default useGlobalStore;
