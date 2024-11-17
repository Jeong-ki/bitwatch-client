import { render, screen, fireEvent } from '@testing-library/react';

import { mockRouter } from '@/utils/test/next-router-utils';
import { MockRouterComponent } from './mock-router';

describe('MockRouterComponent', () => {
  beforeEach(() => {
    // 테스트마다 초기화
    mockRouter.setCurrentUrl('/initial'); // 초기 경로 설정
  });

  it('renders the component with the correct initial route', () => {
    render(<MockRouterComponent href="/new-route" />);

    // 버튼이 제대로 렌더링되었는지 확인
    expect(screen.getByText('The current route is: /new-route')).toBeInTheDocument();
  });

  it('navigates to the correct route when the button is clicked', () => {
    render(<MockRouterComponent href="/new-route" />);

    const button = screen.getByText('The current route is: /new-route');
    fireEvent.click(button); // 버튼 클릭

    // 라우터가 새 경로로 이동했는지 확인
    expect(mockRouter.asPath).toBe('/new-route');
  });
});
