// HomePage.test.tsx
import HomePage from '@/app/home/page';
import render from '@/lib/jest/render';
import { screen } from '@testing-library/react';
import { useRouter } from 'next/router';

test('renders the HomePage component with the correct path', () => {
  (useRouter as jest.Mock).mockReturnValue({
    ...useRouter(),
    pathname: '/home',
    asPath: '/home',
  });

  render(<HomePage />);

  // 기본적으로 모킹된 pathname이 '/'로 설정됨
  expect(screen.getByText('Welcome to the Home Page')).toBeInTheDocument();
  expect(screen.getByText('Current path: /home')).toBeInTheDocument();
});
