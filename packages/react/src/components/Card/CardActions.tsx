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
import { createOverflowHandler } from '@carbon/utilities';
import { usePrefix } from '../../internal/usePrefix';
import { CardActionProps } from './CardAction';

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
  label?: string;
}

/**
 * CardActions is a container for action buttons in the card header.
 * Positioned in the top-right corner with 8px gap between actions.
 * When actions exceed 50% of available header space, overflow menu is shown.
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

  // Build action items only when children change.
  // Label resolution order (matches source):
  //   1. CardAction.label explicit prop
  //   2. Direct child button props: label → iconDescription → text children
  //   3. Fallback ordinal string
  const actionItems = useMemo(() => {
    const items: ActionItem[] = [];
    Children.forEach(children, (child, index) => {
      if (React.isValidElement(child)) {
        const actionProps = child.props as CardActionProps;
        const button = actionProps.children;
        type ButtonLikeProps = {
          label?: string;
          iconDescription?: string;
          children?: React.ReactNode;
        };
        const buttonProps = React.isValidElement(button)
          ? (button.props as ButtonLikeProps)
          : null;

        const label =
          actionProps.label ??
          buttonProps?.label ??
          buttonProps?.iconDescription ??
          (typeof buttonProps?.children === 'string'
            ? buttonProps.children
            : `Action ${index + 1}`);

        const id = `${label}-${index}`;
        items.push({ id, element: child, label });
      }
    });
    return items;
  }, [children]);

  useEffect(() => {
    if (!containerRef.current || actionItems.length === 0) {
      return;
    }

    const handler = createOverflowHandler({
      container: containerRef.current,
      onChange: (_visible, hidden) => {
        const hiddenIds = hidden.map((el) => el.dataset.id);
        setHiddenItems(
          actionItems.filter((item) => hiddenIds.includes(item.id))
        );
      },
    });

    return () => handler.disconnect();
  }, [actionItems]);

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
        <OverflowMenu size="sm" aria-label={overflowMenuLabel}>
          {hiddenItems.map((item) => (
            <MenuItem
              key={item.id}
              label={item.label || 'Action'}
              onClick={() => {
                type ClickableProps = { onClick?: () => void };
                type ActionChildren = { children?: React.ReactNode };
                const elementProps = item.element.props as ActionChildren;
                const button = elementProps.children;
                if (button && React.isValidElement(button)) {
                  const buttonProps = button.props as ClickableProps;
                  if (buttonProps.onClick) {
                    buttonProps.onClick();
                  }
                }
              }}
            />
          ))}
        </OverflowMenu>
      </div>
    </div>
  );
};

CardActions.displayName = componentName;
