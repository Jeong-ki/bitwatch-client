import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface ITestlState {
  testInput: string;
  setTestInput: (token: string) => void;
}

const store: StateCreator<ITestlState> = (set) => ({
  testInput: '',
  setTestInput: (state) => set({ testInput: state }),
});

const useTestStore = create<ITestlState>()(
  devtools(store, { enabled: process.env.NODE_ENV === 'development' }),
);

export default useTestStore;
