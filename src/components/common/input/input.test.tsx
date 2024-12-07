import render from '@/utils/test/render';
import { fireEvent, screen } from '@testing-library/react';
import { Input } from '.';

describe('Input 컴포넌트 테스트', () => {
  const defaultProps = {
    onChange: jest.fn(),
    onBlur: jest.fn(),
    errorMsg: '',
    showErrorMsg: false,
    showSuccessMsg: false,
    successMsg: '',
    autoComplete: 'off',
    inputSizeType: undefined,
    sizeType: undefined,
    itemClassName: '',
    children: null,
    boxChildren: null,
    itemChildren: null,
    refProp: undefined,
  };

  it('Input 렌더링 및 placeholder 기본 값 검증', () => {
    render(<Input {...defaultProps} />);
    const inputElement = screen.getByPlaceholderText('입력해 주세요.');
    expect(inputElement).toBeInTheDocument();
  });

  it('사이즈 및 에러 클래스명 입력 검증', () => {
    render(
      <Input
        {...defaultProps}
        errorMsg="Error message"
        sizeType="large"
        inputSizeType="medium"
        itemClassName="custom-class"
      />,
    );
    const containerElement = screen.getByPlaceholderText('입력해 주세요.').closest('.item_form');
    expect(containerElement).toHaveClass('item_form', 'form_large', 'custom-class');
    const inputElement = screen.getByPlaceholderText('입력해 주세요.');
    expect(inputElement).toHaveClass('tf_comm', 'type_medium', 'error');
  });

  it('에러/성공 클래스명 적용 검증', () => {
    render(
      <Input
        {...defaultProps}
        errorMsg="This is an error"
        showErrorMsg
        successMsg="This is a success"
        showSuccessMsg
      />,
    );
    expect(screen.getByText('This is an error')).toHaveClass('desc_error');
    expect(screen.getByText('This is a success')).toHaveClass('desc_success');
  });

  it('onChange, onBlur 이벤트 핸들러 검증', () => {
    const onChangeMock = jest.fn();
    const onBlurMock = jest.fn();
    render(<Input {...defaultProps} onChange={onChangeMock} onBlur={onBlurMock} />);
    const inputElement = screen.getByPlaceholderText('입력해 주세요.');

    fireEvent.change(inputElement, { target: { value: 'new value' } });
    expect(onChangeMock).toHaveBeenCalledWith('new value');

    fireEvent.blur(inputElement);
    expect(onBlurMock).toHaveBeenCalled();
  });

  it('maxLength 초과 시 이벤트 핸들러 미호출 검증', () => {
    const onChangeMock = jest.fn();
    render(<Input {...defaultProps} onChange={onChangeMock} maxLength={5} />);
    const inputElement = screen.getByPlaceholderText('입력해 주세요.');

    fireEvent.change(inputElement, { target: { value: 'exceeding' } });
    expect(onChangeMock).not.toHaveBeenCalled();
  });

  it('추가적인 children 렌더링 검증', () => {
    render(
      <Input
        {...defaultProps}
        boxChildren={<span>Box Child</span>}
        itemChildren={<span>Item Child</span>}>
        <span>Inner Child</span>
      </Input>,
    );
    expect(screen.getByText('Box Child')).toBeInTheDocument();
    expect(screen.getByText('Item Child')).toBeInTheDocument();
    expect(screen.getByText('Inner Child')).toBeInTheDocument();
  });
});
