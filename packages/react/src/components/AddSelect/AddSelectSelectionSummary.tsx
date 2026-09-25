/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { forwardRef, ForwardedRef, ReactNode } from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import { Tag } from '../Tag';
import type { TagProps } from '../Tag/Tag';
import { IconButton, type IconButtonProps } from '../IconButton';
import { Edit } from '@carbon/icons-react';

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
   * Number of selected items — shown as a badge next to the title when
   * provided. The badge is hidden when `selectedItemCount` is omitted.
   */
  selectedItemCount?: number;
  /**
   * Custom content or SelectionSummaryItem components
   */
  children?: ReactNode;
  /**
   * Custom empty state component — shown when `selectedItemCount` is `0` or
   * not provided.
   */
  emptyState?: ReactNode;
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
 * AddSelectSelectionSummary - Displays list of selected items.
 *
 * - Pass `selectedItemCount` to show a numeric badge next to the title; omit it to hide the badge.
 * - Pass `emptyState` to show a placeholder when `selectedItemCount` is `0` or not provided.
 */
const AddSelectSelectionSummary = forwardRef<
  HTMLDivElement,
  AddSelectSelectionSummaryProps
>(
  (
    {
      title = 'Selected items',
      selectedItemCount,
      children,
      emptyState,
      showEditIcon = false,
      onEdit,
      editIconDescription = 'Edit selections',
      className,
      headerContent,
      headerActions,
      tagProps,
      editIconButtonProps,
      ...rest
    },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const prefix = usePrefix();
    const blockClass = `${prefix}--add-select`;

    const panelClasses = cx(`${blockClass}__selection-summary`, className);

    return (
      <div className={panelClasses} ref={ref} {...rest}>
        {/* Header with title, count, and optional edit icon */}
        <div className={`${blockClass}__selection-summary-header`}>
          {headerContent || (
            <>
              <p className={`${blockClass}__selection-summary-title`}>
                {title}
              </p>
              {selectedItemCount !== undefined && (
                <Tag type="gray" size="sm" {...tagProps}>
                  {selectedItemCount}
                </Tag>
              )}
              {(showEditIcon || headerActions) && (
                <div
                  className={`${blockClass}__selection-summary-header-actions`}>
                  {headerActions}
                  {showEditIcon && (
                    <IconButton
                      label={editIconDescription}
                      onClick={onEdit}
                      kind="ghost"
                      size="sm"
                      autoAlign
                      className={`${blockClass}__selection-summary-edit-button`}
                      {...editIconButtonProps}>
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
          {!selectedItemCount ? emptyState : children}
        </div>
      </div>
    );
  }
);

AddSelectSelectionSummary.displayName = 'AddSelectSelectionSummary';

export default AddSelectSelectionSummary;
