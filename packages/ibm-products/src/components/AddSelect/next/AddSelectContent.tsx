/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  forwardRef,
  ForwardedRef,
  ReactNode,
  useContext,
  useRef,
  useEffect,
  KeyboardEvent,
} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { blockClass, AddSelectContext } from './context';

/**
 * ----------------
 * AddSelectContent
 * ----------------
 */

export interface AddSelectContentProps {
  children?: ReactNode;
  /**
   * Optional class name
   */
  className?: string;
  /**
   * Layout direction for columns: 'vertical' (default) or 'horizontal' (for hierarchy)
   */
  layout?: 'vertical' | 'horizontal';
}

const AddSelectContent = forwardRef<HTMLDivElement, AddSelectContentProps>(
  (
    { children, className, layout = 'vertical', ...rest },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const { multi } = useContext(AddSelectContext);
    const listRef = useRef<HTMLDivElement>(null);
    const focusedIndexRef = useRef(0);

    // Get all item elements
    const getItems = (): HTMLElement[] => {
      if (!listRef.current) {
        return [];
      }
      return Array.from(
        listRef.current.querySelectorAll('[role="row"]')
      ) as HTMLElement[];
    };

    // Update focus on items - only one item should have tabindex="0"
    const updateItemFocus = (focusIndex: number, shouldFocus = true) => {
      const items = getItems();
      if (items.length === 0) {
        return;
      }

      // Ensure focusIndex is within bounds
      focusedIndexRef.current = Math.max(
        0,
        Math.min(focusIndex, items.length - 1)
      );

      items.forEach((item, index) => {
        if (index === focusedIndexRef.current) {
          item.setAttribute('tabindex', '0');
          if (shouldFocus) {
            item.focus();
          }
        } else {
          item.setAttribute('tabindex', '-1');
        }
      });
    };

    // Handle keyboard navigation
    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      const items = getItems();
      if (items.length === 0) {
        return;
      }

      const currentItem = items[focusedIndexRef.current];
      let handled = false;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          updateItemFocus(focusedIndexRef.current + 1);
          handled = true;
          break;

        case 'ArrowUp':
          event.preventDefault();
          updateItemFocus(focusedIndexRef.current - 1);
          handled = true;
          break;

        case 'ArrowRight':
          // Check if current item has children
          if (currentItem && currentItem.hasAttribute('data-has-children')) {
            event.preventDefault();
            // Trigger navigation by clicking the nav indicator
            const navIndicator = currentItem.querySelector(
              `.${blockClass}-row__nav-indicator`
            ) as HTMLElement;
            navIndicator?.click();
            handled = true;
          }
          break;

        case 'Enter':
        case ' ':
          event.preventDefault();
          // Trigger the item's selection by clicking the checkbox/radio
          if (currentItem) {
            const input = currentItem.querySelector(
              'input[type="checkbox"], input[type="radio"]'
            ) as HTMLInputElement;
            input?.click();
          }
          handled = true;
          break;

        case 'Home':
          if (event.ctrlKey) {
            event.preventDefault();
            updateItemFocus(0);
            handled = true;
          }
          break;

        case 'End':
          if (event.ctrlKey) {
            event.preventDefault();
            updateItemFocus(items.length - 1);
            handled = true;
          }
          break;
      }

      if (handled) {
        event.stopPropagation();
      }
    };

    // Initialize focus management after mount
    useEffect(() => {
      updateItemFocus(0, false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [children]);

    const listClasses = cx(`${blockClass}-list`, className);
    const listBodyClasses = cx(`${blockClass}-list-body`, {
      [`${blockClass}-list-body--horizontal`]: layout === 'horizontal',
    });

    return (
      <div
        className={listClasses}
        ref={(node) => {
          listRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        role="grid"
        aria-multiselectable={multi}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        <div className={listBodyClasses}>{children}</div>
      </div>
    );
  }
);

AddSelectContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  /**@ts-ignore */
  layout: PropTypes.oneOf(['vertical', 'horizontal']),
};

AddSelectContent.displayName = 'AddSelectContent';

export default AddSelectContent;
