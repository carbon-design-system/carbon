/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  forwardRef,
} from 'react';
import { rem } from '@carbon/layout';
import { usePrefix } from '../../internal/usePrefix';
import cx from 'classnames';
import debounce from '../../internal/debounce';

export const DEBOUNCE_DELAY = 100;

export interface ResizerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether the resizer handle is oriented horizontally (resize up/down) or vertically (resize left/right). */
  orientation: 'horizontal' | 'vertical';
  /**
   * Called on every resize movement with the delta (px) from the drag/key start position.
   * When provided the component becomes fully controlled — sibling sizes are NOT updated automatically.
   */
  onResize?: (
    event:
      | React.MouseEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLDivElement>,
    delta: number
  ) => void;
  /** Called once when a resize interaction ends (mouse-up or key-up debounced). Receives the resizer ref. */
  onResizeEnd?: (
    event:
      | React.MouseEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLDivElement>,
    ref: React.RefObject<HTMLDivElement>
  ) => void;
  /** Called on double-click. When provided the default reset-to-initial-sizes behavior is suppressed. */
  onDoubleClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /** Additional className applied to the root element. */
  className?: string;
  /** Optional children rendered inside the handle (e.g. custom drag icons). */
  children?: React.ReactNode;
  /** Thickness of the handle in px. Defaults to 4. */
  thickness?: number;
}

const componentName = 'Resizer';

const getRefElement = <T extends HTMLElement>(
  ref: React.RefObject<T> | React.ForwardedRef<T>
): T | null => {
  if (!ref || !('current' in ref)) {
    return null;
  }
  return ref.current;
};

export const Resizer = forwardRef<HTMLDivElement, ResizerProps>(
  (
    {
      orientation,
      onResize,
      onResizeEnd,
      onDoubleClick,
      className,
      children,
      thickness = 4,
      ...rest
    },
    forwardedRef
  ) => {
    const prefix = usePrefix();
    const blockClass = `${prefix}--resizer`;

    const internalRef = useRef<HTMLDivElement>(null);
    const ref = forwardedRef || internalRef;
    const [isResizing, setIsResizing] = useState(false);
    const startPos = useRef({ x: 0, y: 0 });
    const sizes = useRef({
      prevSiblingSize: { width: 0, height: 0 },
      nextSiblingSize: { width: 0, height: 0 },
    });
    const initialSizes = useRef({
      prevSiblingSize: { width: 0, height: 0 },
      nextSiblingSize: { width: 0, height: 0 },
    });

    const debouncedResizeEnd = useRef(
      debounce((event) => {
        const element = getRefElement(ref);
        if (element && onResizeEnd) {
          onResizeEnd(event, ref as React.RefObject<HTMLDivElement>);
        }
      }, DEBOUNCE_DELAY)
    );

    useEffect(() => {
      const element = getRefElement(ref);
      if (!element) {
        return;
      }

      element.style[orientation === 'horizontal' ? 'blockSize' : 'inlineSize'] =
        rem(thickness);

      const prevSibling = element.previousElementSibling as HTMLElement;
      const nextSibling = element.nextElementSibling as HTMLElement;
      const rect = (el: Element) => el?.getBoundingClientRect();

      initialSizes.current = {
        prevSiblingSize: prevSibling
          ? { width: rect(prevSibling).width, height: rect(prevSibling).height }
          : { width: 0, height: 0 },
        nextSiblingSize: nextSibling
          ? { width: rect(nextSibling).width, height: rect(nextSibling).height }
          : { width: 0, height: 0 },
      };
    }, [ref, thickness, orientation]);

    const updateSizes = useCallback(
      (event, delta: number) => {
        const element = getRefElement(ref);
        if (!element) {
          return;
        }

        if (onResize) {
          onResize(event, delta);
          return;
        }

        const prevSibling = element.previousElementSibling as HTMLElement;
        const nextSibling = element.nextElementSibling as HTMLElement;
        const prop = orientation === 'horizontal' ? 'height' : 'width';

        if (prevSibling) {
          prevSibling.style[prop] =
            `${sizes.current.prevSiblingSize[prop] + delta}px`;
        }
        if (nextSibling) {
          nextSibling.style[prop] =
            `${sizes.current.nextSiblingSize[prop] - delta}px`;
        }
      },
      [onResize, orientation, ref]
    );

    const handleMouseMove = useCallback(
      (event) => {
        event.preventDefault();
        event.stopPropagation();
        const delta =
          orientation === 'horizontal'
            ? event.clientY - startPos.current.y
            : event.clientX - startPos.current.x;
        updateSizes(event, delta);
      },
      [orientation, updateSizes]
    );

    const handleMouseUp = useCallback(
      (event) => {
        const element = getRefElement(ref);
        if (!element) {
          return;
        }
        setIsResizing(false);
        if (onResizeEnd) {
          onResizeEnd(event, ref as React.RefObject<HTMLDivElement>);
        }
        const prevSibling = element.previousElementSibling as HTMLElement;
        const nextSibling = element.nextElementSibling as HTMLElement;
        if (prevSibling) {
          prevSibling.style.transition = '';
        }
        if (nextSibling) {
          nextSibling.style.transition = '';
        }
      },
      [onResizeEnd, ref]
    );

    useEffect(() => {
      if (!isResizing) {
        return;
      }
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }, [isResizing, handleMouseMove, handleMouseUp]);

    const handleMouseDown = useCallback(
      (event) => {
        const element = getRefElement(ref);
        if (!element || event.button !== 0) {
          return;
        }
        const prevSibling = element.previousElementSibling as HTMLElement;
        const nextSibling = element.nextElementSibling as HTMLElement;
        const rect = (el: Element) => el?.getBoundingClientRect();

        if (prevSibling) {
          prevSibling.style.transition = 'none';
        }
        if (nextSibling) {
          nextSibling.style.transition = 'none';
        }

        setIsResizing(true);
        startPos.current = { x: event.clientX, y: event.clientY };
        sizes.current = {
          prevSiblingSize: prevSibling
            ? {
                width: rect(prevSibling).width,
                height: rect(prevSibling).height,
              }
            : { width: 0, height: 0 },
          nextSiblingSize: nextSibling
            ? {
                width: rect(nextSibling).width,
                height: rect(nextSibling).height,
              }
            : { width: 0, height: 0 },
        };
      },
      [ref]
    );

    const handleKeyDown = useCallback(
      (event) => {
        const navigationKeys = [
          'ArrowUp',
          'ArrowDown',
          'ArrowLeft',
          'ArrowRight',
          'Home',
          'End',
        ];

        if (![...navigationKeys, 'PageUp', 'PageDown'].includes(event.key)) {
          return;
        }

        const element = getRefElement(ref);
        if (!element) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();

        const prevSibling = element.previousElementSibling as HTMLElement;
        const nextSibling = element.nextElementSibling as HTMLElement;

        const getSize = (el: Element | null) => {
          const r = el?.getBoundingClientRect();
          return { width: r?.width || 0, height: r?.height || 0 };
        };

        sizes.current = {
          prevSiblingSize: getSize(prevSibling),
          nextSiblingSize: getSize(nextSibling),
        };

        const step = event.shiftKey ? 25 : 5;
        let delta = 0;
        const isHorizontal = orientation === 'horizontal';

        const keyMap: Record<string, () => void> = {
          ArrowUp: () => {
            if (isHorizontal) {
              delta = -step;
            }
          },
          ArrowDown: () => {
            if (isHorizontal) {
              delta = step;
            }
          },
          ArrowLeft: () => {
            if (!isHorizontal) {
              delta = -step;
            }
          },
          ArrowRight: () => {
            if (!isHorizontal) {
              delta = step;
            }
          },
          Home: () => {
            delta = isHorizontal
              ? -sizes.current.prevSiblingSize.height
              : -sizes.current.prevSiblingSize.width;
          },
          End: () => {
            delta = isHorizontal
              ? sizes.current.nextSiblingSize.height
              : sizes.current.nextSiblingSize.width;
          },
        };

        keyMap[event.key]?.();
        updateSizes(event, delta);
        debouncedResizeEnd?.current(event);
      },
      [orientation, updateSizes, debouncedResizeEnd, ref]
    );

    const handleDoubleClick = (event) => {
      event.preventDefault();
      const element = getRefElement(ref);
      if (!element) {
        return;
      }
      const prevSibling = element.previousElementSibling as HTMLElement;
      const nextSibling = element.nextElementSibling as HTMLElement;

      if (onDoubleClick) {
        onDoubleClick(event);
      } else {
        const prop = orientation === 'horizontal' ? 'height' : 'width';
        if (prevSibling) {
          prevSibling.style[prop] =
            `${initialSizes.current.prevSiblingSize[prop]}px`;
        }
        if (nextSibling) {
          nextSibling.style[prop] =
            `${initialSizes.current.nextSiblingSize[prop]}px`;
        }
      }
    };

    return (
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      <div
        {...rest}
        ref={ref as React.RefObject<HTMLDivElement>}
        role="separator"
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        aria-orientation={orientation}
        aria-live="assertive"
        onMouseDown={handleMouseDown}
        onDoubleClick={handleDoubleClick}
        onKeyDown={handleKeyDown}
        data-component-name={componentName}
        className={cx(blockClass, `${blockClass}--${orientation}`, className)}>
        <span className={`${prefix}--visually-hidden`}>
          Use arrow keys to resize, hold Shift for larger steps. Double-click to
          reset.
        </span>
        {children}
      </div>
    );
  }
);

Resizer.displayName = componentName;
