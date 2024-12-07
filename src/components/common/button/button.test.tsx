import render from '@/utils/test/render';
import { screen } from '@testing-library/react';
import { Button } from '.';

describe('Button 컴포넌트 테스트', () => {
  it('버튼 렌더링 및 클릭 이벤트 테스트', async () => {
    const mockOnClick = jest.fn();
    const { user } = await render(
      <Button color="primary" size="medium" onClick={mockOnClick}>
        버튼
      </Button>,
    );
    const button = screen.getByText('버튼');
    expect(button).toBeEnabled();

    await user.click(button);
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('버튼 비활성화 테스트', () => {
    render(
      <Button color="primary" size="medium" disabled>
        버튼
      </Button>,
    );
    const button = screen.getByText('버튼');
    expect(button).toBeDisabled();
  });
});
