import useTestStore, { ITestlState } from '@/store/input';

import { UseBoundStore, StoreApi } from 'zustand';

type MockState<T> = Partial<T>;

const mockStore = <T>(store: UseBoundStore<StoreApi<T>>, state: Partial<T>): void => {
  const initState = store.getState();
  store.setState({ ...initState, ...state }, true);
};

export const mockUseInputStore = (state: MockState<ITestlState>) => {
  mockStore(useTestStore, state);
};
