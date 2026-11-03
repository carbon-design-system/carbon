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
  MouseEvent,
} from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import Checkbox, { type CheckboxProps } from '../Checkbox';
import { RadioButton, type RadioButtonProps } from '../RadioButton';
import { IconButton, type IconButtonProps } from '../IconButton';
import { SkeletonText } from '../SkeletonText';
import { SkeletonIcon } from '../SkeletonIcon';
import { ChevronRight, View } from '@carbon/icons-react';
import { AddSelectContext } from './context';

/**
 * ----------------
 * AddSelectRow
 * ----------------
 */

export interface AddSelectRowProps {
  /**
   * Unique identifier for the item
   */
  itemId: string;
  /**
   * Item title
   */
  title: string;
  /**
   * Item subtitle
   */
  subtitle?: string;
  /**
   * Item value
   */
  value: string;
  /**
   * Whether the item is selected
   */
  selected?: boolean;
  /**
   * Whether the item is in an indeterminate state (for hierarchical selections)
   */
  indeterminate?: boolean;
  /**
   * Whether the item is disabled
   */
  disabled?: boolean;
  /**
   * Whether the item has children (for navigation)
   */
  hasChildren?: boolean;
  /**
   * Parent ID for hierarchical navigation
   */
  parentId?: string;
  /**
   * Optional icon slot
   */
  icon?: ReactNode;
  /**
   * Custom content to render after the title/subtitle section.
   * Useful for adding badges, tags, or other metadata to the row.
   */
  children?: ReactNode;
  /**
   * Custom row content (slot) - replaces the entire row content section
   * (title, subtitle, and children).
   * When provided, only the selection control and navigation indicators remain.
   */
  rowContent?: ReactNode;
  /**
   * Whether to show the item panel view icon for this item
   */
  hasItemPanel?: boolean;
  /**
   * Callback when item panel view icon is clicked
   */
  onItemPanelClick?: (itemId: string) => void;
  /**
   * Description for the item panel icon button
   */
  itemPanelIconDescription?: string;
  /**
   * Whether the item panel is currently open for this item
   */
  itemPanelOpen?: boolean;
  /**
   * Whether to render the row as a skeleton (loading state).
   * When true, real content is replaced with Carbon skeleton placeholders.
   * The row is non-interactive and hidden from assistive technology.
   */
  skeleton?: boolean;
  /**
   * Optional class name
   */
  className?: string;
  /**
   * Additional props to pass to the Checkbox component (when multi=true)
   */
  checkboxProps?: Omit<
    CheckboxProps,
    | 'id'
    | 'className'
    | 'checked'
    | 'disabled'
    | 'labelText'
    | 'hideLabel'
    | 'onChange'
  >;
  /**
   * Additional props to pass to the RadioButton component (when multi=false)
   */
  radioButtonProps?: Omit<
    RadioButtonProps,
    | 'id'
    | 'className'
    | 'checked'
    | 'disabled'
    | 'labelText'
    | 'hideLabel'
    | 'value'
    | 'onChange'
  >;
  /**
   * Accessible label for the navigation indicator button.
   * Defaults to `Navigate into <title>` when not provided.
   * Override this prop to localize the label.
   */
  navIndicatorLabel?: string;
  /**
   * Additional props to pass to the IconButton component (info panel)
   */
  itemPanelIconButtonProps?: Omit<
    IconButtonProps,
    'label' | 'onClick' | 'kind' | 'size' | 'className' | 'children'
  >;
}

const AddSelectRow = forwardRef<HTMLDivElement, AddSelectRowProps>(
  (
    {
      itemId,
      title,
      subtitle,
      value,
      selected = false,
      indeterminate = false,
      disabled = false,
      hasChildren = false,
      parentId = '',
      icon,
      children,
      rowContent,
      hasItemPanel = false,
      onItemPanelClick,
      itemPanelIconDescription = 'View details',
      itemPanelOpen = false,
      skeleton = false,
      className,
      checkboxProps,
      radioButtonProps,
      navIndicatorLabel,
      itemPanelIconButtonProps,
      ...rest
    },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const prefix = usePrefix();
    const blockClass = `${prefix}--add-select`;
    const { multi, onItemSelect, onNavigate, selectedItems } =
      useContext(AddSelectContext);

    // Use context's selected state if available
    const isSelected = selectedItems?.has(itemId) ?? selected;

    if (process.env.NODE_ENV !== 'production') {
      if (selectedItems !== undefined && selected !== false) {
        // eslint-disable-next-line no-console
        console.warn(
          `[AddSelectRow] Both the \`selected\` prop and \`selectedItems\` context are set ` +
            `on row "${itemId}". The context value takes precedence. ` +
            `Remove the \`selected\` prop when using controlled mode via AddSelect.`
        );
      }
    }

    const handleSelect = () => {
      if (disabled) {
        return;
      }
      const newSelected = !isSelected;
      onItemSelect?.(itemId, newSelected, value);
    };

    const handleNavigate = (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      if (!hasChildren) {
        return;
      }
      onNavigate?.(itemId, title, parentId);
    };

    const handleItemPanelClick = (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      onItemPanelClick?.(itemId);
    };

    const rowClasses = cx(`${blockClass}-row`, className, {
      [`${blockClass}-row--selected`]: isSelected,
      [`${blockClass}-row--disabled`]: disabled,
      [`${blockClass}-row-item-panel--selected`]: itemPanelOpen,
      [`${blockClass}-row--skeleton`]: skeleton,
    });

    // Skeleton (loading) state
    if (skeleton) {
      return (
        <div className={rowClasses} aria-hidden="true" ref={ref}>
          <div className={`${blockClass}-row__cell`}>
            <div className={`${blockClass}-row__cell-wrapper`}>
              {/* Skeleton checkbox/radio placeholder */}
              <div className={`${blockClass}-row__skeleton-control`} />

              <div className={`${blockClass}-row__content`}>
                {/* Skeleton icon circle — only if row has an icon */}
                {icon && (
                  <div className={`${blockClass}-row__icon`}>
                    <SkeletonIcon />
                  </div>
                )}

                {/* Skeleton text lines */}
                <div className={`${blockClass}-row__text`}>
                  <SkeletonText
                    className={`${blockClass}-row__skeleton-title`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        className={rowClasses}
        role="row"
        aria-selected={isSelected}
        tabIndex={-1}
        data-has-children={hasChildren || undefined}
        ref={ref}
        {...rest}>
        <div className={`${blockClass}-row__cell`} role="gridcell">
          <div className={`${blockClass}-row__cell-wrapper`}>
            {multi ? (
              <Checkbox
                id={`checkbox-${itemId}`}
                className={`${blockClass}-row__checkbox`}
                checked={isSelected}
                indeterminate={indeterminate}
                disabled={disabled}
                labelText={title}
                hideLabel
                onChange={handleSelect}
                {...checkboxProps}
              />
            ) : (
              <RadioButton
                id={`radio-${itemId}`}
                className={`${blockClass}-row__radio`}
                checked={isSelected}
                disabled={disabled}
                labelText={title}
                hideLabel
                value={itemId}
                onChange={handleSelect}
                {...radioButtonProps}
              />
            )}

            <div className={`${blockClass}-row__content`}>
              {icon && <div className={`${blockClass}-row__icon`}>{icon}</div>}
              {rowContent || (
                <>
                  <div className={`${blockClass}-row__text`}>
                    <div className={`${blockClass}-row__title`}>{title}</div>
                    {subtitle && (
                      <div className={`${blockClass}-row__subtitle`}>
                        {subtitle}
                      </div>
                    )}
                  </div>
                  {children}
                </>
              )}
            </div>

            {hasItemPanel && (
              <IconButton
                label={itemPanelIconDescription}
                onClick={handleItemPanelClick}
                kind="ghost"
                size="sm"
                autoAlign
                className={`${blockClass}-row__view-item-panel`}
                {...itemPanelIconButtonProps}>
                <View size={16} />
              </IconButton>
            )}

            {hasChildren && (
              <div
                className={`${blockClass}-row__nav-indicator`}
                onClick={handleNavigate}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.stopPropagation();
                    if (hasChildren) {
                      onNavigate?.(itemId, title, parentId);
                    }
                  }
                }}
                role="button"
                tabIndex={-1}
                aria-label={navIndicatorLabel ?? `Navigate into ${title}`}>
                <ChevronRight size={16} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

AddSelectRow.displayName = 'AddSelectRow';

export default AddSelectRow;
