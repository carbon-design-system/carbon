/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Children, forwardRef, ForwardedRef, ReactNode } from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import { Accordion } from '../Accordion';
import { AccordionItem } from '../Accordion';
import { IconButton, type IconButtonProps } from '../IconButton';
import type { AccordionProps } from '../Accordion/Accordion';
import type { AccordionItemProps } from '../Accordion/AccordionItem';
import { SubtractAlt } from '@carbon/icons-react';
import type { AddSelectItem } from '@carbon/utilities';

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
    const prefix = usePrefix();
    const blockClass = `${prefix}--add-select`;

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
        size="sm"
        autoAlign
        className={`${blockClass}__selection-summary-item-remove-button`}
        {...removeIconButtonProps}>
        <SubtractAlt size={16} />
      </IconButton>
    ) : null;

    // Default title rendering
    const defaultTitle = (
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
    );

    // Non-accordion wrapper: title + remove button in a horizontal flex row
    const defaultTitleRow = (
      <div className={`${blockClass}__selection-summary-item-title-wrapper`}>
        {defaultTitle}
        {onRemove && (
          <div
            className={`${blockClass}__selection-summary-item-remove-button-container`}>
            {RemoveButton}
          </div>
        )}
      </div>
    );

    // Default content rendering — renders only labelled itemDetails tuples.
    const defaultContent = () => {
      if (!item?.itemDetails || !Array.isArray(item.itemDetails)) {
        return null;
      }
      if (item.itemDetails.length === 0) {
        return null;
      }
      return (
        <>
          {(
            item.itemDetails as Array<{ label: string; value: string | number }>
          ).map(({ label, value: val }) => (
            <div
              key={label}
              className={`${blockClass}__selection-summary-item-entry`}>
              <p className={`${blockClass}__selection-summary-item-header`}>
                {label}
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
                <>
                  {titleContent}
                  {onRemove && (
                    <div
                      className={`${blockClass}__selection-summary-item-remove-button-container`}>
                      {RemoveButton}
                    </div>
                  )}
                </>
              }
              {...accordionItemProps}>
              {bodyContent}
            </AccordionItem>
          </Accordion>
        </div>
      );
    }

    // Priority 4: Non-accordion mode (default key-value rendering only)
    return (
      <div className={itemClasses} ref={ref} {...rest}>
        {defaultTitleRow}
        <div className={`${blockClass}__selection-summary-item-content`}>
          {defaultContent()}
        </div>
      </div>
    );
  }
);

AddSelectSelectionSummaryItem.displayName = 'AddSelectSelectionSummaryItem';

export default AddSelectSelectionSummaryItem;
