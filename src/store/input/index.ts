import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface TestlState {
  testInput: string;
  setTestInput: (token: string) => void;
}

const store: StateCreator<TestlState> = (set) => ({
  testInput: '',
  setTestInput: (state) => set({ testInput: state }),
});

const useTestStore = create<TestlState>()(
  devtools(store, { enabled: process.env.NODE_ENV === 'development' }),
);

export default useTestStore;
