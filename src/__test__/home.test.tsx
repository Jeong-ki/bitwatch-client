// HomePage.test.tsx
import React from 'react';
import { screen } from '@testing-library/react';
import render from '@/utils/test/render'; // 커스텀 렌더 함수 경로에 맞춰 수정
import '@testing-library/jest-dom';
import HomePage from '@/app/home/page';
import useTestStore from '@/store/input';
import userEvent from '@testing-library/user-event';

const resetTestStore = () => {
  const store = useTestStore.getState();
  store.setTestInput('');
};

beforeEach(() => {
  resetTestStore(); // 상태 초기화
});

afterEach(() => {
  resetTestStore(); // 테스트 후 상태 초기화
});

test('zustand store test', async () => {
  render(<HomePage />);

  const testInput = await screen.findByRole('textbox', { name: /testInput/i });
  expect(testInput).toBeInTheDocument();
  expect(testInput).toHaveValue(''); // 초기 상태 확인

  await userEvent.type(testInput, 'Hello Zustand');
  expect(testInput).toHaveValue('Hello Zustand');

  const store = useTestStore.getState();
  expect(store.testInput).toBe('Hello Zustand'); // 상태 확인
});

test('api test by msw mocking', async () => {
  await render(<HomePage />);

  // email 요소가 올바른 텍스트로 렌더링되는지 확인
  const emailText = await screen.findByTestId('email');
  console.log('Email text found:', emailText.textContent); // 요소 텍스트 확인

  expect(emailText).toHaveTextContent('jeong@hotmail.com');
});
