/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react';
import cx from 'classnames';

import { keys, match } from '../../internal/keyboard';
import { useDelayedState } from '../../internal/useDelayedState';
import { useId } from '../../internal/useId';
import { usePrefix } from '../../internal/usePrefix';
import ButtonBase from '../Button/ButtonBase';
import { Popover, PopoverContent } from '../Popover';

interface ModalCloseButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  label: string;
}

// eslint-disable-next-line react/display-name
export const ModalCloseButton = forwardRef<
  HTMLButtonElement,
  ModalCloseButtonProps
>((props, ref) => {
  const {
    children,
    className,
    label,
    onBlur,
    onClick,
    onFocus,
    onMouseDown,
    ...rest
  } = props;
  const prefix = usePrefix();
  const id = useId('tooltip');
  const [open, setOpen] = useDelayedState(false);
  const [focusByMouse, setFocusByMouse] = useState(false);
  const suppressInitialFocus = useRef(true);
  const tooltipRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (match(event, keys.Escape)) {
        event.stopPropagation();
        setOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, setOpen]);

  return (
    <Popover
      align="left"
      className={cx(`${prefix}--tooltip`, `${prefix}--icon-tooltip`)}
      highContrast
      onMouseLeave={() => setOpen(false, 100)}
      open={open}>
      <div className={`${prefix}--tooltip-trigger__wrapper`}>
        <ButtonBase
          {...rest}
          ref={ref}
          hasIconOnly
          className={className}
          aria-label={rest['aria-label'] ?? label}
          onBlur={(event) => {
            setOpen(false);
            setFocusByMouse(false);
            suppressInitialFocus.current = false;
            onBlur?.(event);
          }}
          onClick={onClick}
          onFocus={(event) => {
            if (suppressInitialFocus.current) {
              suppressInitialFocus.current = false;
            } else if (!focusByMouse) {
              setOpen(true, 100);
            }
            onFocus?.(event);
          }}
          onMouseDown={(event) => {
            setFocusByMouse(true);
            suppressInitialFocus.current = false;
            onMouseDown?.(event);
          }}
          onMouseEnter={() => setOpen(true, 100)}>
          {children}
        </ButtonBase>
      </div>
      <PopoverContent
        aria-hidden={open ? 'false' : 'true'}
        className={`${prefix}--tooltip-content`}
        id={id}
        onMouseEnter={() => setOpen(true, 100)}
        ref={tooltipRef}
        role="tooltip">
        {label}
      </PopoverContent>
    </Popover>
  );
});
