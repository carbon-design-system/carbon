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
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  Checkbox,
  RadioButton,
  IconButton,
  type CheckboxProps,
  type RadioButtonProps,
  type IconButtonProps,
} from '@carbon/react';
import { ChevronRight, View } from '@carbon/react/icons';
import { blockClass, AddSelectContext } from './context';

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
      className,
      checkboxProps,
      radioButtonProps,
      itemPanelIconButtonProps,
      ...rest
    },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const { multi, onItemSelect, onNavigate, selectedItems } =
      useContext(AddSelectContext);

    // Use context's selected state if available
    const isSelected = selectedItems?.has(itemId) ?? selected;

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
    });

    return (
      <div
        className={rowClasses}
        role="row"
        aria-selected={isSelected}
        tabIndex={-1}
        data-has-children={hasChildren || undefined}
        ref={ref}
        {...rest}
      >
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
                {...itemPanelIconButtonProps}
              >
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
                aria-label="Navigate to children"
              >
                <ChevronRight size={16} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

AddSelectRow.propTypes = {
  /**@ts-ignore */
  checkboxProps: PropTypes.object,
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  hasChildren: PropTypes.bool,
  hasItemPanel: PropTypes.bool,
  headerContent: PropTypes.node,
  icon: PropTypes.node,
  indeterminate: PropTypes.bool,
  itemId: PropTypes.string.isRequired,
  /**@ts-ignore */
  itemPanelIconButtonProps: PropTypes.object,
  itemPanelIconDescription: PropTypes.string,
  itemPanelOpen: PropTypes.bool,
  /**@ts-ignore */
  onItemPanelClick: PropTypes.func,
  parentId: PropTypes.string,
  /**@ts-ignore */
  radioButtonProps: PropTypes.object,
  selected: PropTypes.bool,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

AddSelectRow.displayName = 'AddSelectRow';

export default AddSelectRow;
