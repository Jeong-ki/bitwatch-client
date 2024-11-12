import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

interface IGlobalState {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const store: StateCreator<IGlobalState> = (set) => ({
  accessToken: null,
  setAccessToken: (state) => set({ accessToken: state }),
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
});

const useGlobalStore = create<IGlobalState>()(
  devtools(store, { enabled: process.env.NODE_ENV === 'development' }),
);

export default useGlobalStore;
