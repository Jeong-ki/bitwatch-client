import { OptionItem } from '@/@types/element';
import render from '@/utils/test/render';
import { screen, within } from '@testing-library/react';
import { Select } from '.';

describe('Select 컴포넌트', () => {
  const mockOnChange = jest.fn();
  const mockSuggestList: OptionItem[] = [
    { value: '1', text: 'Option 1' },
    { value: '2', text: 'Option 2' },
    { value: '3', text: 'Option 3', disabled: true },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('값이 선택되지 않았을 때 placeholder가 렌더링된다.', () => {
    render(
      <Select
        value=""
        placeholder="선택해 주세요."
        suggestList={mockSuggestList}
        onChange={mockOnChange}
      />,
    );
    expect(screen.getByText('선택해 주세요.')).toBeInTheDocument();
  });

  test('값이 선택되었을 때 선택된 옵션의 텍스트가 렌더링된다.', () => {
    render(<Select value="2" suggestList={mockSuggestList} onChange={mockOnChange} />);
    const button = screen.getByRole('button', { name: /선택됨/i });
    const { getByText } = within(button);

    expect(getByText('Option 2')).toBeInTheDocument();
  });

  test('클릭 시 옵션 리스트가 열리고 외부 클릭 시 닫힌다.', async () => {
    const { user } = await render(
      <Select value="" suggestList={mockSuggestList} onChange={mockOnChange} />,
    );

    const button = screen.getByRole('button', { name: /선택됨/i });
    const container = button.parentElement;
    expect(container).toBeInTheDocument();

    // 초기 상태: opt_open 클래스가 없다.
    expect(container).not.toHaveClass('opt_open');

    // 버튼 클릭으로 opt_open 클래스 추가
    await user.click(screen.getByRole('button', { name: /선택됨/i }));
    expect(container).toHaveClass('opt_open');

    // 바깥 영역 클릭으로 opt_open 클래스 제거
    await user.click(document.body);
    expect(container).not.toHaveClass('opt_open');
  });

  test('옵션을 클릭하면 onChange가 올바른 값으로 호출된다.', async () => {
    const { user } = await render(
      <Select value="" suggestList={mockSuggestList} onChange={mockOnChange} />,
    );

    await user.click(screen.getByRole('button', { name: /선택됨/i }));
    await user.click(screen.getByText('Option 1'));

    expect(mockOnChange).toHaveBeenCalledWith('1', { value: '1', text: 'Option 1' });
  });

  test('비활성화된 옵션을 클릭하면 onChange가 호출되지 않는다.', async () => {
    const { user } = await render(
      <Select value="" suggestList={mockSuggestList} onChange={mockOnChange} />,
    );

    await user.click(screen.getByRole('button', { name: /선택됨/i }));
    await user.click(screen.getByText('Option 3'));

    expect(mockOnChange).not.toHaveBeenCalled();
  });

  test('키보드 네비게이션 및 선택이 동작한다.', async () => {
    const { user } = await render(
      <Select value="" suggestList={mockSuggestList} onChange={mockOnChange} />,
    );

    await user.click(screen.getByRole('button', { name: /선택됨/i }));
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{Enter}');

    expect(mockOnChange).toHaveBeenCalledWith('2', { value: '2', text: 'Option 2' });
  });

  test('옵션 리스트가 비어 있을 때 "데이터 없음" 메시지가 렌더링된다.', async () => {
    const { user } = await render(
      <Select value="" suggestList={[]} noDataText="옵션이 없습니다." onChange={mockOnChange} />,
    );
    await user.click(screen.getByRole('button', { name: /선택됨/i }));

    expect(screen.getByText('옵션이 없습니다.')).toBeInTheDocument();
  });

  test('비활성화 상태일 때 옵션 리스트가 열리지 않는다.', async () => {
    const { user } = await render(
      <Select value="" suggestList={mockSuggestList} disabled onChange={mockOnChange} />,
    );

    const button = screen.getByRole('button', { name: /선택됨/i });
    const container = button.parentElement;
    expect(container).toBeInTheDocument();

    await user.click(button);

    expect(container).not.toHaveClass('opt_open');
  });
});
