/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { forwardRef, ForwardedRef, ReactNode } from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import { IconButton, type IconButtonProps } from '../IconButton';
import { Close } from '@carbon/icons-react';
import type { AddSelectItem } from '@carbon/utilities';

/**
 * ----------------
 * AddSelectItemPanel
 * ----------------
 */

export interface AddSelectItemPanelProps {
  /**
   * Panel title
   */
  title?: string;
  /**
   * Item data
   */
  item?: AddSelectItem;
  /**
   * Close button handler
   */
  onClose?: () => void;
  /**
   * Close button aria-label
   */
  closeIconDescription?: string;
  /**
   * Custom content - takes highest priority
   */
  children?: ReactNode;
  /**
   * Custom template for rendering the entire panel body content
   * Takes precedence over default rendering
   */
  renderItem?: (item: AddSelectItem) => ReactNode;
  /**
   * Optional class name
   */
  className?: string;
  /**
   * Controls visibility of the panel by toggling the open CSS modifier class.
   * Use this instead of conditional rendering when you need CSS-driven
   * slide-in/out transitions.
   */
  open?: boolean;
  /**
   * Additional props to pass to the close IconButton
   */
  closeIconButtonProps?: Omit<
    IconButtonProps,
    'label' | 'onClick' | 'kind' | 'size' | 'className' | 'children'
  >;
}

/**
 * AddSelectItemPanel - Displays detailed information about a specific item
 */
const AddSelectItemPanel = forwardRef<HTMLDivElement, AddSelectItemPanelProps>(
  (
    {
      title = 'Item details',
      item,
      onClose,
      closeIconDescription = 'Close',
      children,
      renderItem,
      className,
      open,
      closeIconButtonProps,
      ...rest
    },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const prefix = usePrefix();
    const blockClass = `${prefix}--add-select`;

    const panelClasses = cx(`${blockClass}__item-summary-panel`, className, {
      [`${blockClass}__item-summary-panel--open`]: open,
    });

    // Default content rendering — renders only labelled itemDetails tuples.
    const defaultContent = () => {
      if (!item) {
        return null;
      }

      const { itemDetails } = item;

      if (
        !itemDetails ||
        !Array.isArray(itemDetails) ||
        itemDetails.length === 0
      ) {
        return null;
      }

      return (
        <>
          {(
            itemDetails as Array<{ label: string; value: string | number }>
          ).map(({ label, value: val }) => (
            <div
              key={label}
              className={`${blockClass}__item-summary-panel-entry`}>
              <p className={`${blockClass}__item-summary-panel-entry-title`}>
                {label}
              </p>
              <p className={`${blockClass}__item-summary-panel-entry-body`}>
                {String(val)}
              </p>
            </div>
          ))}
        </>
      );
    };

    // Render content based on priority
    const renderItemContent = () => {
      // Priority 1: children takes highest precedence
      if (children) {
        return children;
      }

      // Priority 2: renderItem
      if (renderItem && item) {
        return renderItem(item);
      }

      // Priority 3: default template
      return defaultContent();
    };

    return (
      <div className={panelClasses} ref={ref} {...rest}>
        {/* Header with title and close button */}
        <div className={`${blockClass}__item-summary-panel-header`}>
          <p className={`${blockClass}__item-summary-panel-title`}>{title}</p>
          {onClose && (
            <IconButton
              label={closeIconDescription}
              onClick={onClose}
              kind="ghost"
              size="sm"
              autoAlign
              className={`${blockClass}__item-summary-panel-close`}
              {...closeIconButtonProps}>
              <Close size={16} />
            </IconButton>
          )}
        </div>

        {/* Body content */}
        <div className={`${blockClass}__item-summary-panel-body`}>
          {renderItemContent()}
        </div>
      </div>
    );
  }
);

AddSelectItemPanel.displayName = 'AddSelectItemPanel';

export default AddSelectItemPanel;
