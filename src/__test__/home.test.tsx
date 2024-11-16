// HomePage.test.tsx
import React from 'react';
import { screen } from '@testing-library/react';
import render from '@/utils/test/render'; // 커스텀 렌더 함수 경로에 맞춰 수정
import '@testing-library/jest-dom';
import HomePage from '@/app/home/page';

test('fetches and displays user email on the home page', async () => {
  await render(<HomePage />);

  // email 요소가 올바른 텍스트로 렌더링되는지 확인
  const emailText = await screen.findByTestId('email');
  console.log('Email text found:', emailText.textContent); // 요소 텍스트 확인

  expect(emailText).toHaveTextContent('jeong@hotmail.com');
});
