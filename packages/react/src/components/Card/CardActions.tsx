/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
  Children,
} from 'react';
import cx from 'classnames';
import { OverflowMenu } from '../OverflowMenu/next';
import { MenuItem } from '../Menu';
import { createOverflowHandler, getSize } from '@carbon/utilities';
import { usePrefix } from '../../internal/usePrefix';

const componentName = 'CardActions';

export interface CardActionsProps {
  /**
   * Provide the contents of the CardActions (typically CardAction components).
   */
  children?: ReactNode;

  /**
   * Provide an optional class to be applied to the containing node.
   */
  className?: string;

  /**
   * Aria label for the overflow menu
   */
  overflowMenuLabel?: string;
}

interface ActionItem {
  id: string;
  element: React.ReactElement;
  label: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent | React.KeyboardEvent) => void;
}

/**
 * Extracts plain text content from a ReactNode tree (strings, numbers, nested elements).
 */
const extractTextContent = (node: unknown): string => {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(extractTextContent).join(' ').trim();
  }
  if (
    React.isValidElement(node) &&
    node.props &&
    typeof node.props === 'object'
  ) {
    const props = node.props as { children?: unknown };
    if (props.children) {
      return extractTextContent(props.children);
    }
  }
  return '';
};

/**
 * CardActions is a container for action buttons in the card header.
 * Positioned in the top-right corner with flush spacing (no gap) between actions.
 * The actions slot is as wide as the actions need, capped at 50% of the header;
 * the title uses all remaining space. When the actions exceed the cap, the
 * overflow menu is shown.
 */
export const CardActions = ({
  children,
  className,
  overflowMenuLabel = 'More actions',
  ...rest
}: CardActionsProps) => {
  const prefix = usePrefix();
  const blockClass = `${prefix}--card`;
  const containerRef = useRef<HTMLDivElement>(null);
  const [hiddenItems, setHiddenItems] = useState<ActionItem[]>([]);
  const classes = cx(`${blockClass}__actions`, className);

  // Build action items from any passed button type (CardAction, Button, IconButton, custom button).
  const actionItems = useMemo(() => {
    const items: ActionItem[] = [];
    Children.forEach(children, (child, index) => {
      if (React.isValidElement(child)) {
        const childProps = (child.props || {}) as Record<string, unknown>;
        const innerElement = React.isValidElement(childProps.children)
          ? (childProps.children as React.ReactElement)
          : null;
        const innerProps = (innerElement?.props || {}) as Record<
          string,
          unknown
        >;

        // Label resolution hierarchy for any button type:
        // 1. Explicit label on wrapper (CardAction label)
        // 2. Explicit label on inner element (Button / IconButton label)
        // 3. aria-label on inner or wrapper
        // 4. iconDescription on inner or wrapper
        // 5. title on inner or wrapper
        // 6. Text content extracted from children
        // 7. Fallback "Action {index + 1}"
        const rawLabel =
          (typeof childProps.label === 'string' && childProps.label) ||
          (typeof innerProps.label === 'string' && innerProps.label) ||
          (typeof innerProps['aria-label'] === 'string' &&
            innerProps['aria-label']) ||
          (typeof childProps['aria-label'] === 'string' &&
            childProps['aria-label']) ||
          (typeof innerProps.iconDescription === 'string' &&
            innerProps.iconDescription) ||
          (typeof childProps.iconDescription === 'string' &&
            childProps.iconDescription) ||
          (typeof innerProps.title === 'string' && innerProps.title) ||
          (typeof childProps.title === 'string' && childProps.title) ||
          extractTextContent(innerProps.children) ||
          extractTextContent(childProps.children) ||
          `Action ${index + 1}`;

        const label = rawLabel.trim() || `Action ${index + 1}`;
        const disabled = Boolean(
          childProps.disabled ||
            innerProps.disabled ||
            childProps['aria-disabled'] ||
            innerProps['aria-disabled']
        );

        const onClickHandler = ((typeof innerProps.onClick === 'function'
          ? innerProps.onClick
          : null) ||
          (typeof childProps.onClick === 'function'
            ? childProps.onClick
            : null)) as
          | ((event: React.MouseEvent | React.KeyboardEvent) => void)
          | undefined;

        const id = `${label}-${index}`;
        items.push({
          id,
          element: child,
          label,
          disabled,
          onClick: onClickHandler,
        });
      }
    });
    return items;
  }, [children]);

  useEffect(() => {
    if (!containerRef.current || actionItems.length === 0) {
      return;
    }

    const container = containerRef.current;
    const gap = parseFloat(getComputedStyle(container).columnGap || '0');

    // Publish the width needed to show every action. The slot sizes itself to
    // this value (capped at 50% in CSS), so the title can use whatever the
    // actions don't need. It is measured from all items, including collapsed
    // ones, so it never depends on the current overflow state.
    const itemElements = Array.from(container.children).filter(
      (el): el is HTMLElement =>
        el instanceof HTMLElement && !el.hasAttribute('data-offset')
    );
    const publishNaturalSize = () => {
      const natural = itemElements.reduce(
        (sum, el) => sum + getSize(el, 'width', gap),
        -gap
      );
      container.style.setProperty(
        `--${prefix}--card--actions-inline-size`,
        `${Math.ceil(natural)}px`
      );
    };
    publishNaturalSize();
    document.fonts?.ready?.then(publishNaturalSize);

    const handler = createOverflowHandler({
      container: containerRef.current,
      gap,
      // `clientWidth` is rounded to an integer, while item widths can be
      // fractional (e.g. 121.19px). Allow 1px of tolerance so an item that
      // exactly fills the slot is not flipped in and out every frame.
      offsetValue: -1,
      onChange: (_visible, hidden) => {
        const hiddenIds = hidden.map((el) => el.dataset.id);
        setHiddenItems(
          actionItems.filter((item) => hiddenIds.includes(item.id))
        );
      },
    });

    return () => {
      handler.disconnect();
      container.style.removeProperty(`--${prefix}--card--actions-inline-size`);
    };
  }, [actionItems, prefix]);

  return (
    <div ref={containerRef} className={classes} {...rest}>
      {actionItems.map((item) => (
        <div key={item.id} data-id={item.id}>
          {item.element}
        </div>
      ))}
      <div
        data-offset
        data-hidden
        data-floating-menu-container
        style={{
          position: 'relative',
        }}>
        <OverflowMenu size="sm" label={overflowMenuLabel}>
          {hiddenItems.map((item) => (
            <MenuItem
              key={item.id}
              label={item.label}
              disabled={item.disabled}
              onClick={(
                e:
                  | React.MouseEvent<HTMLLIElement>
                  | React.KeyboardEvent<HTMLLIElement>
              ) => {
                item.onClick?.(e);
              }}
            />
          ))}
        </OverflowMenu>
      </div>
    </div>
  );
};

CardActions.displayName = componentName;
