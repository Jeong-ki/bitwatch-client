import { useEffect, useState } from 'react';
import { OptionItem } from '@/@types/element';
import useMemoizedFn from '@/hooks/useMemoizedFn';
import cn from 'classnames';
import { OptionListProps } from './types';

export const OptionList = ({
  value,
  isOpened = false,
  handleClose = () => {},
  items = [],
  noDataText,
  compareValue,
  onClick,
  onEnter = () => {}
}: OptionListProps) => {
  const [focusedIdx, setFocusedIdx] = useState<number>(-1);

  const initState = () => {
    setFocusedIdx(-1);
  };

  const handleClickOption = (itemData: OptionItem) => {
    onClick(itemData);
  };

  const doSelectOption = () => {
    if (focusedIdx === -1) {
      handleClose();
      return;
    }
    handleClickOption(items[focusedIdx]);
  };

  const toMove = useMemoizedFn((isArrowUp: boolean) => {
    if (items.length === 0) return;

    setFocusedIdx(focusedIdx => {
      const optionLength = items.length;
      const isFocused = focusedIdx !== -1;
      const targetIdx = isArrowUp
        ? isFocused
          ? Number(focusedIdx) - 1
          : optionLength - 1
        : isFocused
          ? Number(focusedIdx) + 1
          : Number(focusedIdx) + 1;
      return (targetIdx + optionLength) % optionLength;
    });
  });

  const handleKeydown = useMemoizedFn((e: KeyboardEvent) => {
    const { key, isComposing } = e;
    if (isComposing) return;

    const checkKeyCodeList = ['Enter', 'Escape', 'ArrowUp', 'ArrowDown'];
    if (checkKeyCodeList.includes(key)) {
      e.preventDefault();
      switch (key) {
        case 'Enter':
          onEnter(e);
          doSelectOption();
          break;
        case 'Escape':
          handleClose();
          break;
        case 'ArrowUp':
          toMove(true);
          break;
        case 'ArrowDown':
          toMove(false);
          break;
        default:
          break;
      }
    }
  });

  useEffect(() => {
    if (isOpened) {
      window.addEventListener('keydown', handleKeydown);
    } else {
      window.removeEventListener('keydown', handleKeydown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [handleKeydown, isOpened]);

  useEffect(() => {
    if (!isOpened) {
      initState();
    }
  }, [isOpened]);

  return (
    <div
      className="box_opt"
      aria-hidden={!isOpened}>
      <ul className="list_opt">
        {items.length > 0 ? (
          (() => {
            let isFirstOn = false;
            return items.map((item, index) => {
              const isOn = !isFirstOn && compareValue(value, item);
              if (isOn) {
                isFirstOn = true;
              }
              return (
                <li
                  key={`option_item_${index}`}
                  className={cn({ on: isOn })}
                  style={{
                    background: index === focusedIdx ? '#f0f0f0' : undefined
                  }}>
                  <button
                    type="button"
                    className="link_opt"
                    onClick={() => handleClickOption(item)}
                    disabled={item?.disabled}>
                    <span className="txt_opt txt_ellipsis">
                      {item.text ?? '-'}
                    </span>
                  </button>
                </li>
              );
            });
          })()
        ) : (
          <li>
            <button
              type="button"
              className="link_opt">
              <span className="txt_opt txt_ellipsis">{noDataText ?? '-'}</span>
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};
