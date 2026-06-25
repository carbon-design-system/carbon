/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { forwardRef, ForwardedRef, ReactNode } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  Tag,
  IconButton,
  type TagProps,
  type IconButtonProps,
} from '@carbon/react';
import { Edit } from '@carbon/react/icons';
import type { AddSelectItem } from '@carbon/ibm-products';
import { blockClass } from './context';

/**
 * ----------------
 * AddSelectSelectionSummary
 * ----------------
 */

export interface AddSelectSelectionSummaryProps {
  /**
   * Panel title
   */
  title?: string;
  /**
   * Array of selected items
   */
  selectedItems?: AddSelectItem[];
  /**
   * Custom content or SelectionSummaryPanelItem components
   */
  children?: ReactNode;
  /**
   * Custom empty state component (user provides)
   */
  emptyState?: ReactNode;
  /**
   * Show count badge
   */
  showCount?: boolean;
  /**
   * Show edit icon next to count
   */
  showEditIcon?: boolean;
  /**
   * Edit icon click handler
   */
  onEdit?: () => void;
  /**
   * Edit icon aria-label
   */
  editIconDescription?: string;
  /**
   * Optional class name
   */
  className?: string;
  /**
   * Custom item renderer
   */
  renderItem?: (item: AddSelectItem) => ReactNode;
  /**
   * Custom header content (slot) - replaces entire header section
   */
  headerContent?: ReactNode;
  /**
   * Header actions slot - adds custom actions alongside the edit icon
   */
  headerActions?: ReactNode;
  /**
   * Additional props to pass to the Tag component
   */
  tagProps?: Omit<TagProps<'div'>, 'type' | 'size' | 'children'>;
  /**
   * Additional props to pass to the edit IconButton
   */
  editIconButtonProps?: Omit<
    IconButtonProps,
    'label' | 'onClick' | 'kind' | 'size' | 'className' | 'children'
  >;
}

/**
 * AddSelectSelectionSummary - Displays list of selected items
 * @example
 * Basic usage:
 * ```jsx
 * <AddSelect.SelectionSummaryPanel
 *   title="Selected items"
 *   selectedItems={items}
 *   showCount
 *   showEditIcon
 *   onEdit={handleEdit}
 * />
 * ```
 *
 * With custom header actions:
 * ```jsx
 * <AddSelect.SelectionSummaryPanel
 *   title="Selected items"
 *   selectedItems={items}
 *   showCount
 *   headerActions={
 *     <>
 *       <IconButton label="Filter" kind="ghost" size="sm">
 *         <Filter />
 *       </IconButton>
 *       <IconButton label="Sort" kind="ghost" size="sm">
 *         <Sort />
 *       </IconButton>
 *     </>
 *   }
 * />
 * ```
 *
 * With fully custom header:
 * ```jsx
 * <AddSelect.SelectionSummaryPanel
 *   selectedItems={items}
 *   headerContent={
 *     <div className="custom-header">
 *       <h3>My Custom Header</h3>
 *       <Button>Custom Action</Button>
 *     </div>
 *   }
 * />
 * ```
 */
const AddSelectSelectionSummary = forwardRef<
  HTMLDivElement,
  AddSelectSelectionSummaryProps
>(
  (
    {
      title = 'Selected items',
      selectedItems = [],
      children,
      emptyState,
      showCount = true,
      showEditIcon = false,
      onEdit,
      editIconDescription = 'Edit selections',
      className,
      renderItem,
      headerContent,
      headerActions,
      tagProps,
      editIconButtonProps,
      ...rest
    },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const panelClasses = cx(`${blockClass}__selection-summary`, className);

    const hasSelections = selectedItems.length > 0;

    return (
      <div className={panelClasses} ref={ref} {...rest}>
        {/* Header with title, count, and optional edit icon */}
        <div className={`${blockClass}__selection-summary-header`}>
          {headerContent || (
            <>
              <p className={`${blockClass}__selection-summary-title`}>
                {title}
              </p>
              {showCount && (
                <Tag type="gray" size="sm" {...tagProps}>
                  {selectedItems.length}
                </Tag>
              )}
              {(showEditIcon || headerActions) && (
                <div
                  className={`${blockClass}__selection-summary-header-actions`}
                >
                  {headerActions}
                  {showEditIcon && (
                    <IconButton
                      label={editIconDescription}
                      onClick={onEdit}
                      kind="ghost"
                      size="sm"
                      autoAlign
                      className={`${blockClass}__selection-summary-edit-button`}
                      {...editIconButtonProps}
                    >
                      <Edit size={16} />
                    </IconButton>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Body content */}
        <div className={`${blockClass}__selection-summary-body`}>
          {hasSelections ? (
            children ? (
              children
            ) : renderItem ? (
              selectedItems.map((item) => (
                <div key={item.id}>{renderItem(item)}</div>
              ))
            ) : (
              // Default rendering - simple list
              <div>
                {selectedItems.map((item) => (
                  <div
                    key={item.id}
                    className={`${blockClass}__selection-summary-item-default`}
                  >
                    <div
                      className={`${blockClass}__selection-summary-item-default-title`}
                    >
                      {item.title}
                    </div>
                    {item.subtitle && (
                      <div
                        className={`${blockClass}__selection-summary-item-default-subtitle`}
                      >
                        {item.subtitle}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )
          ) : (
            emptyState
          )}
        </div>
      </div>
    );
  }
);

AddSelectSelectionSummary.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  /**@ts-ignore */
  editIconButtonProps: PropTypes.object,
  editIconDescription: PropTypes.string,
  emptyState: PropTypes.node,
  headerActions: PropTypes.node,
  headerContent: PropTypes.node,
  /**@ts-ignore */
  onEdit: PropTypes.func,
  /**@ts-ignore */
  renderItem: PropTypes.func,
  /**@ts-ignore */
  selectedItems: PropTypes.arrayOf(PropTypes.object),
  showCount: PropTypes.bool,
  showEditIcon: PropTypes.bool,
  /**@ts-ignore */
  tagProps: PropTypes.object,
  title: PropTypes.string,
};

AddSelectSelectionSummary.displayName = 'AddSelectSelectionSummary';

export default AddSelectSelectionSummary;
