/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { forwardRef, ForwardedRef, ReactNode } from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import { AddSelectContext } from './context';
import AddSelectBody, { AddSelectBodyProps } from './AddSelectBody';
import AddSelectColumn, { AddSelectColumnProps } from './AddSelectColumn';
import AddSelectRow, { AddSelectRowProps } from './AddSelectRow';
import AddSelectSelectionSummary, {
  AddSelectSelectionSummaryProps,
} from './AddSelectSelectionSummary';
import AddSelectSelectionSummaryItem, {
  AddSelectSelectionSummaryItemProps,
} from './AddSelectSelectionSummaryItem';
import AddSelectItemPanel, {
  AddSelectItemPanelProps,
} from './AddSelectItemPanel';

/**
 * ----------
 * AddSelect
 * ----------
 */

export interface AddSelectProps {
  /**
   * Optional children
   */
  children?: ReactNode;
  /**
   * Optional class name
   */
  className?: string;
  /**
   * Callback when an item is selected/deselected
   */
  onItemSelect?: (itemId: string, selected: boolean, value: string) => void;
  /**
   * Set of selected item IDs
   */
  selectedItems?: Set<string>;
}

export type AddSelectComponentType = React.ForwardRefExoticComponent<
  AddSelectProps & React.RefAttributes<HTMLDivElement>
> & {
  Body: React.ForwardRefExoticComponent<
    AddSelectBodyProps & React.RefAttributes<HTMLDivElement>
  >;
  Column: React.ForwardRefExoticComponent<
    AddSelectColumnProps & React.RefAttributes<HTMLDivElement>
  >;
  Row: React.ForwardRefExoticComponent<
    AddSelectRowProps & React.RefAttributes<HTMLDivElement>
  >;
  SelectionSummary: React.ForwardRefExoticComponent<
    AddSelectSelectionSummaryProps & React.RefAttributes<HTMLDivElement>
  >;
  SelectionSummaryItem: React.ForwardRefExoticComponent<
    AddSelectSelectionSummaryItemProps & React.RefAttributes<HTMLDivElement>
  >;
  ItemPanel: React.ForwardRefExoticComponent<
    AddSelectItemPanelProps & React.RefAttributes<HTMLDivElement>
  >;
};

const componentName = 'AddSelect';

/**
 * AddSelect - Composable component for adding/selecting items
 * @example
 * ```jsx
 * <AddSelect onItemSelect={handleSelect}>
 *   <AddSelect.Body
 *     itemsLabel="Items"
 *     globalSearchLabel="Search"
 *     itemCount={items.length}
 *   >
 *     <AddSelect.Column multi={true} title="Categories">
 *       {items.map(item => (
 *         <AddSelect.Row
 *           key={item.id}
 *           itemId={item.id}
 *           title={item.title}
 *           value={item.value}
 *         />
 *       ))}
 *     </AddSelect.Column>
 *   </AddSelect.Body>
 * </AddSelect>
 * ```
 */
export const AddSelect = forwardRef<HTMLDivElement, AddSelectProps>(
  (
    { children, className, onItemSelect, selectedItems, ...rest },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const prefix = usePrefix();
    const blockClass = `${prefix}--add-select`;

    return (
      <AddSelectContext.Provider
        value={{
          onItemSelect,
          selectedItems,
        }}>
        <div
          className={cx(blockClass, className)}
          ref={ref}
          data-component-name={componentName}
          {...rest}>
          {children}
        </div>
      </AddSelectContext.Provider>
    );
  }
) as AddSelectComponentType;

AddSelect.Body = AddSelectBody;
AddSelect.Column = AddSelectColumn;
AddSelect.Row = AddSelectRow;
AddSelect.SelectionSummary = AddSelectSelectionSummary;
AddSelect.SelectionSummaryItem = AddSelectSelectionSummaryItem;
AddSelect.ItemPanel = AddSelectItemPanel;

AddSelect.displayName = componentName;
