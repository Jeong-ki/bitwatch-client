// HomePage.test.tsx
import React from 'react';
import { screen } from '@testing-library/react';
import render from '@/utils/test/render'; // 커스텀 렌더 함수 경로에 맞춰 수정
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { mockUseInputStore } from '@/utils/test/mockZustandStore';
import Home from '@/app/(main)/page';

test('zustand store test', async () => {
  render(<Home />);

  const testInput = await screen.findByRole('textbox', { name: /testInput/i });
  expect(testInput).toBeInTheDocument();
  expect(testInput).toHaveValue(''); // 초기 상태 확인

  await userEvent.type(testInput, 'Hello Zustand');
  expect(testInput).toHaveValue('Hello Zustand');
});

test('api test by msw mocking', async () => {
  await render(<Home />);

  // email 요소가 올바른 텍스트로 렌더링되는지 확인
  const emailText = await screen.findByTestId('email');
  console.log('Email text found:', emailText.textContent); // 요소 텍스트 확인

  expect(emailText).toHaveTextContent('jeong@hotmail.com');
});

describe('useMockStore Test', () => {
  beforeEach(() => {
    mockUseInputStore({ testInput: 'mocked input' });
  });

  it('renders with mocked input', async () => {
    await render(<Home />);
    expect(await screen.findByText('입력값: mocked input')).toBeInTheDocument();
  });

  it('updates input on button click', async () => {
    const { user } = await render(<Home />);
    user.click(await screen.findByText('입력값: mocked input'));
    expect(await screen.findByText('입력값: mocked input')).toBeInTheDocument();
  });
});
