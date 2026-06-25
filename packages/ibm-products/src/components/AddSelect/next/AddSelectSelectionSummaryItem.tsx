/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Children, forwardRef, ForwardedRef, ReactNode } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  Accordion,
  AccordionItem,
  IconButton,
  type AccordionProps,
  type AccordionItemProps,
  type IconButtonProps,
} from '@carbon/react';
import { SubtractAlt } from '@carbon/react/icons';
import type { AddSelectItem } from '@carbon/ibm-products';
import { blockClass } from './context';

/**
 * ----------------
 * AddSelectSelectionSummaryItem
 * ----------------
 */

export interface AddSelectSelectionSummaryItemProps {
  /**
   * Item data
   */
  item: AddSelectItem;
  /**
   * Custom title renderer (only works with useAccordion mode)
   */
  renderAccordionTitle?: (item: AddSelectItem) => ReactNode;
  /**
   * Custom content renderer (only works with useAccordion mode)
   */
  renderAccordionBody?: (item: AddSelectItem) => ReactNode;
  /**
   * Custom renderer for rendering the entire item content
   * Takes precedence over all other rendering props
   */
  renderItem?: (
    item: AddSelectItem,
    onRemove?: (id: string) => void
  ) => ReactNode;
  /**
   * Custom content - takes highest priority
   */
  children?: ReactNode;
  /**
   * Remove button handler
   */
  onRemove?: (itemId: string) => void;
  /**
   * Remove button aria-label
   */
  removeButtonLabel?: string;
  /**
   * Use accordion pattern (default: false)
   */
  useAccordion?: boolean;
  /**
   * Optional class name
   */
  className?: string;
  /**
   * Additional props to pass to the Accordion component
   */
  accordionProps?: Omit<AccordionProps, 'align' | 'children'>;
  /**
   * Additional props to pass to the AccordionItem component
   */
  accordionItemProps?: Omit<AccordionItemProps, 'title' | 'children'>;
  /**
   * Additional props to pass to the remove IconButton
   */
  removeIconButtonProps?: Omit<
    IconButtonProps,
    'label' | 'onClick' | 'kind' | 'className' | 'children'
  >;
}

/**
 * AddSelectSelectionSummaryItem - Individual selected item display
 * @example
 * ```jsx
 * <AddSelect.SelectionSummaryItem
 *   item={item}
 *   useAccordion
 *   onRemove={handleRemove}
 * />
 * ```
 */
const AddSelectSelectionSummaryItem = forwardRef<
  HTMLDivElement,
  AddSelectSelectionSummaryItemProps
>(
  (
    {
      item,
      renderAccordionTitle,
      renderAccordionBody,
      renderItem,
      children,
      onRemove,
      removeButtonLabel = 'Remove item',
      useAccordion = false,
      className,
      accordionProps,
      accordionItemProps,
      removeIconButtonProps,
      ...rest
    },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const itemClasses = cx(
      `${blockClass}__selection-summary-item`,
      {
        [`${blockClass}__selection-summary-item--accordion`]: useAccordion,
        [`${blockClass}__selection-summary-item--default`]: !useAccordion,
        [`${blockClass}__selection-summary-item--template`]:
          renderItem || Children.count(children) > 0,
      },
      className
    );

    // Remove button component (reusable in all modes)
    const RemoveButton = onRemove ? (
      <IconButton
        label={removeButtonLabel}
        onClick={(e) => {
          e.stopPropagation();
          onRemove(item.id);
        }}
        kind="ghost"
        autoAlign
        className={`${blockClass}__selection-summary-item-remove-button`}
        {...removeIconButtonProps}
      >
        <SubtractAlt size={16} />
      </IconButton>
    ) : null;

    // Default title rendering
    const defaultTitle = (
      <div className={`${blockClass}__selection-summary-item-title-wrapper`}>
        <div className={`${blockClass}__selection-summary-item-selected-item`}>
          <p className={`${blockClass}__selection-summary-item-title`}>
            {item.title}
          </p>
          {item.subtitle && (
            <p className={`${blockClass}__selection-summary-item-subtitle`}>
              {item.subtitle}
            </p>
          )}
        </div>
        {!useAccordion && onRemove && (
          <div
            className={`${blockClass}__selection-summary-item-remove-button-container`}
          >
            {RemoveButton}
          </div>
        )}
      </div>
    );

    // Default content rendering - show all props from item (except title, subtitle) and itemDetails
    const defaultContent = () => {
      // Collect all item props except title, subtitle, and itemDetails
      const itemProps = Object.entries(item).filter(
        ([key]) =>
          key !== 'title' &&
          key !== 'subtitle' &&
          key !== 'icon' &&
          key !== 'id' &&
          key !== 'children' &&
          key !== 'selected' &&
          key !== 'status' &&
          key !== 'disabled' &&
          key !== 'itemDetails'
      );

      // Collect itemDetails props if they exist
      const itemDetailsProps = item.itemDetails
        ? Object.entries(item.itemDetails)
        : [];

      // Combine both sets of properties
      const allEntries = [...itemProps, ...itemDetailsProps];

      if (allEntries.length === 0) {
        return null;
      }

      return (
        <>
          {allEntries.map(([key, val]) => (
            <div
              key={key}
              className={`${blockClass}__selection-summary-item-entry`}
            >
              <p className={`${blockClass}__selection-summary-item-header`}>
                {key}
              </p>
              <p className={`${blockClass}__selection-summary-item-body`}>
                {String(val)}
              </p>
            </div>
          ))}
        </>
      );
    };

    // Priority 1: If children provided, use them (works in all modes)
    if (Children.count(children) > 0) {
      return (
        <div className={itemClasses} ref={ref} {...rest}>
          {children}
        </div>
      );
    }

    // Priority 2: If custom item renderer provided, use it (works in all modes)
    if (renderItem) {
      return (
        <div className={itemClasses} ref={ref} {...rest}>
          {renderItem(item, onRemove)}
        </div>
      );
    }

    // Priority 3: Accordion mode
    if (useAccordion) {
      const titleContent = renderAccordionTitle
        ? renderAccordionTitle(item)
        : defaultTitle;
      const bodyContent = renderAccordionBody
        ? renderAccordionBody(item)
        : defaultContent();

      return (
        <div className={itemClasses} ref={ref} {...rest}>
          <Accordion align="start" {...accordionProps}>
            <AccordionItem
              title={
                <div
                  className={`${blockClass}__selection-summary-item-title-wrapper`}
                >
                  {titleContent}
                  {onRemove && (
                    <div
                      className={`${blockClass}__selection-summary-item-remove-button-container`}
                    >
                      {RemoveButton}
                    </div>
                  )}
                </div>
              }
              {...accordionItemProps}
            >
              {bodyContent}
            </AccordionItem>
          </Accordion>
        </div>
      );
    }

    // Priority 4: Non-accordion mode (default key-value rendering only)
    return (
      <div className={itemClasses} ref={ref} {...rest}>
        {defaultTitle}
        <div className={`${blockClass}__selection-summary-item-content`}>
          {defaultContent()}
        </div>
      </div>
    );
  }
);

AddSelectSelectionSummaryItem.propTypes = {
  /**@ts-ignore */
  accordionItemProps: PropTypes.object,
  /**@ts-ignore */
  accordionProps: PropTypes.object,
  /**@ts-ignore */
  children: PropTypes.node,
  className: PropTypes.string,
  /**@ts-ignore */
  item: PropTypes.object.isRequired,
  /**@ts-ignore */
  onRemove: PropTypes.func,
  removeButtonLabel: PropTypes.string,
  /**@ts-ignore */
  removeIconButtonProps: PropTypes.object,
  /**@ts-ignore */
  renderAccordionBody: PropTypes.func,
  /**@ts-ignore */
  renderAccordionTitle: PropTypes.func,
  /**@ts-ignore */
  renderItem: PropTypes.func,
  useAccordion: PropTypes.bool,
};

AddSelectSelectionSummaryItem.displayName = 'AddSelectSelectionSummaryItem';

export default AddSelectSelectionSummaryItem;
