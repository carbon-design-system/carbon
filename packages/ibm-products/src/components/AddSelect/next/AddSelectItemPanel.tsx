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
  isValidElement,
} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { IconButton, type IconButtonProps } from '@carbon/react';
import { Close } from '@carbon/react/icons';
import type { AddSelectItem } from '@carbon/ibm-products';
import { blockClass } from './context';

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
   * Additional props to pass to the close IconButton
   */
  closeIconButtonProps?: Omit<
    IconButtonProps,
    'label' | 'onClick' | 'kind' | 'size' | 'className' | 'children'
  >;
}

/**
 * AddSelectItemPanel - Displays detailed information about a specific item
 * @example
 * ```jsx
 * <AddSelect.ItemPanel
 *   title="Item details"
 *   item={item}
 *   onClose={handleClose}
 *   closeIconDescription="Close details"
 * />
 * ```
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
      closeIconButtonProps,
      ...rest
    },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const panelClasses = cx(`${blockClass}__item-summary-panel`, className);

    // Default content rendering - show all key-value data from itemDetails
    const defaultContent = () => {
      if (!item) {
        return null;
      }

      const { itemDetails } = item;

      if (!itemDetails || Object.keys(itemDetails).length === 0) {
        return null;
      }

      const entries = Object.entries(itemDetails);

      return (
        <>
          {entries.map(([key, val]) => (
            <div
              key={key}
              className={`${blockClass}__item-summary-panel-entry`}
            >
              <p className={`${blockClass}__item-summary-panel-entry-title`}>
                {key}
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
              {...closeIconButtonProps}
            >
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

AddSelectItemPanel.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  /**@ts-ignore */
  closeIconButtonProps: PropTypes.object,
  closeIconDescription: PropTypes.string,
  /**@ts-ignore */
  item: PropTypes.object,
  /**@ts-ignore */
  onClose: PropTypes.func,
  /**@ts-ignore */
  renderItem: PropTypes.func,
  title: PropTypes.string,
};

AddSelectItemPanel.displayName = 'AddSelectItemPanel';

export default AddSelectItemPanel;
