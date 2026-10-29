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
  useState,
  ChangeEvent,
} from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import { useId } from '../../internal/useId';
import Search, { type SearchProps } from '../Search';
import { Tag } from '../Tag';
import type { TagProps } from '../Tag/Tag';
import Checkbox, { type CheckboxProps } from '../Checkbox';
import { AddSelectContext } from './context';

/**
 * ----------------
 * AddSelectColumn
 * ----------------
 * A composable column component that wraps AddSelectRow items.
 * Provides optional search functionality with custom actions slot.
 * Lives inside AddSelect.Body and can have multiple instances.
 */

export interface AddSelectColumnProps {
  /**
   * AddSelectRow children
   */
  children?: ReactNode;
  /**
   * Column title displayed in the header
   */
  title?: string;
  /**
   * Label text for the search input
   */
  searchLabel?: string;
  /**
   * Placeholder text for the search input
   */
  searchPlaceholder?: string;
  /**
   * Called when this column's local search input changes.
   * Scoped to this column only — independent of AddSelectBody's global search.
   */
  onSearch?: (columnSearchTerm: string) => void;
  /**
   * Actions slot - adds custom actions (filter/sort) next to search
   */
  actionsSlot?: ReactNode;
  /**
   * Whether to hide the search input
   */
  hideSearch?: boolean;
  /**
   * Whether to enable multi-selection (checkboxes) or single selection (radio buttons)
   */
  multi?: boolean;
  /**
   * Whether to show the "Select All" checkbox (only applicable when multi is true)
   */
  showSelectAll?: boolean;
  /**
   * Total number of items in the column (for display in tag)
   */
  itemCount?: number;
  /**
   * Whether all items are currently selected
   */
  allSelected?: boolean;
  /**
   * Whether the "Select All" checkbox is in an indeterminate state
   */
  allIndeterminate?: boolean;
  /**
   * Callback when "Select All" is toggled
   */
  onSelectAll?: (checked: boolean) => void;
  /**
   * Callback when navigating to children
   */
  onNavigate?: (itemId: string, title: string, parentId: string) => void;
  /**
   * Optional class name
   */
  className?: string;
  /**
   * Additional props to pass to the Search component
   */
  searchProps?: Omit<
    SearchProps,
    'labelText' | 'placeholder' | 'size' | 'onChange' | 'value'
  >;
  /**
   * Additional props to pass to the Tag component
   */
  tagProps?: Omit<TagProps<'div'>, 'type' | 'size' | 'children'>;
  /**
   * Additional props to pass to the Checkbox component (Select All)
   */
  selectAllCheckboxProps?: Omit<
    CheckboxProps,
    'id' | 'className' | 'checked' | 'onChange' | 'labelText'
  >;
}

const AddSelectColumn = forwardRef<HTMLDivElement, AddSelectColumnProps>(
  (
    {
      children,
      title = '',
      searchLabel = 'Search',
      searchPlaceholder = 'Search',
      onSearch,
      actionsSlot,
      hideSearch = false,
      multi = false,
      showSelectAll = false,
      itemCount = 0,
      allSelected = false,
      allIndeterminate = false,
      onSelectAll,
      onNavigate,
      className,
      searchProps,
      tagProps,
      selectAllCheckboxProps,
      ...rest
    },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const prefix = usePrefix();
    const blockClass = `${prefix}--add-select`;
    const parentContext = React.useContext(AddSelectContext);
    const uid = useId();
    const [columnSearchTerm, setColumnSearchTerm] = useState('');

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setColumnSearchTerm(value);
      onSearch?.(value);
    };

    const handleSelectAll = (
      _event: React.ChangeEvent<HTMLInputElement>,
      { checked }: { checked: boolean }
    ) => {
      onSelectAll?.(checked);
    };

    const columnClasses = cx(`${blockClass}-column`, className);

    // Merge parent context with column-specific onNavigate
    const columnContext = {
      ...parentContext,
      multi,
      onNavigate,
    };

    return (
      <AddSelectContext.Provider value={columnContext}>
        <div className={columnClasses} ref={ref} {...rest}>
          {/* Search with optional actions */}
          {(!hideSearch || actionsSlot) && (
            <div
              className={cx(`${blockClass}-column__search`, {
                [`${blockClass}-column__search--with-actions`]: actionsSlot,
              })}>
              {!hideSearch && (
                <div
                  className={
                    actionsSlot ? `${blockClass}-column__search-input` : ''
                  }>
                  <Search
                    labelText={searchLabel}
                    placeholder={searchPlaceholder}
                    size="md"
                    onChange={handleSearch}
                    value={columnSearchTerm}
                    {...searchProps}
                  />
                </div>
              )}
              {actionsSlot && (
                <div className={`${blockClass}-column__actions`}>
                  {actionsSlot}
                </div>
              )}
            </div>
          )}

          {/* Header with Select All */}
          {(showSelectAll || title) && (
            <div className={`${blockClass}-column__header`}>
              {showSelectAll && multi ? (
                <Checkbox
                  id={`${blockClass}-select-all-${uid}`}
                  className={`${blockClass}-column__select-all`}
                  checked={allSelected}
                  indeterminate={allIndeterminate}
                  onChange={handleSelectAll}
                  labelText={
                    <>
                      <span className={`${blockClass}-column__title`}>
                        {title}
                      </span>
                      {itemCount > 0 && (
                        <Tag type="gray" size="sm" {...tagProps}>
                          {itemCount}
                        </Tag>
                      )}
                    </>
                  }
                  {...selectAllCheckboxProps}
                />
              ) : (
                <div className={`${blockClass}-column__title-wrapper`}>
                  <span className={`${blockClass}-column__title`}>{title}</span>
                  {itemCount > 0 && (
                    <Tag type="gray" size="sm" {...tagProps}>
                      {itemCount}
                    </Tag>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Rows Container */}
          <div className={`${blockClass}-column__rows`} role="rowgroup">
            {children}
          </div>
        </div>
      </AddSelectContext.Provider>
    );
  }
);

AddSelectColumn.displayName = 'AddSelectColumn';

export default AddSelectColumn;
