/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useCallback, useEffect, useState, useRef } from 'react';
import isEqual from 'react-fast-compare';

const callOnChangeHandler = <ItemType,>({
  isControlled,
  isMounted,
  onChangeHandlerControlled,
  onChangeHandlerUncontrolled,
  selectedItems,
}: {
  isControlled: boolean;
  isMounted: boolean;
  onChangeHandlerControlled?: (data: { selectedItems: ItemType[] }) => void;
  onChangeHandlerUncontrolled: (selectedItems: ItemType[]) => void;
  selectedItems: ItemType[];
}) => {
  if (isControlled) {
    if (isMounted && onChangeHandlerControlled) {
      // Use setTimeout to defer the controlled onChange call,
      // avoiding React’s warning: "Cannot update a component while rendering a different component".
      // This ensures the parent state updates after rendering completes.
      setTimeout(() => {
        onChangeHandlerControlled({ selectedItems });
      }, 0);
    }
  } else {
    onChangeHandlerUncontrolled(selectedItems);
  }
};

interface UseSelectionProps<ItemType> {
  disabled?: boolean;
  filteredItems?: ItemType[];
  initialSelectedItems?: ItemType[];
  onChange?: (data: { selectedItems: ItemType[] }) => void;
  selectAll?: boolean;
  selectedItems?: ItemType[];
}

export const useSelection = <ItemType,>({
  disabled,
  onChange,
  initialSelectedItems = [],
  selectedItems: controlledItems,
  selectAll = false,
  filteredItems = [],
}: UseSelectionProps<ItemType>) => {
  const isMounted = useRef(false);
  const savedOnChange = useRef(onChange);
  const [uncontrolledItems, setUncontrolledItems] =
    useState(initialSelectedItems);
  const isControlled = !!controlledItems;
  const selectedItems = isControlled ? controlledItems! : uncontrolledItems;
  const onItemChange = useCallback(
    (item: ItemType) => {
      if (disabled) return;

      // Assert special properties (e.g., `disabled`, `isSelectAll`, etc.) are
      // `any` since those properties aren’t part of the generic type.
      const allSelectableItems = filteredItems.filter(
        (item) => !(item as any)?.disabled
      );
      const disabledItemCount = filteredItems.filter(
        (item) => (item as any)?.disabled
      ).length;

      let newSelectedItems: ItemType[];

      // deselect all on click to All/indeterminate option
      if ((item as any)?.isSelectAll && selectedItems.length > 0) {
        newSelectedItems = [];
      }
      // select all options
      else if ((item as any)?.isSelectAll && selectedItems.length === 0) {
        newSelectedItems = allSelectableItems;
      } else {
        const selectedIndex = selectedItems.findLastIndex((selectedItem) =>
          isEqual(selectedItem, item)
        );

        if (selectedIndex === -1) {
          newSelectedItems = selectedItems.concat(item);
          // checking if all items are selected then We should select mark the 'select All' option as well
          if (
            selectAll &&
            filteredItems.length - 1 ===
              newSelectedItems.length + disabledItemCount
          ) {
            newSelectedItems = allSelectableItems;
          }
        } else {
          newSelectedItems = removeAtIndex(selectedItems, selectedIndex);
          newSelectedItems = newSelectedItems.filter(
            (item) => !(item as any)?.isSelectAll
          );
        }
      }

      callOnChangeHandler<ItemType>({
        isControlled,
        isMounted: isMounted.current,
        onChangeHandlerControlled: savedOnChange.current,
        onChangeHandlerUncontrolled: setUncontrolledItems,
        selectedItems: newSelectedItems,
      });
    },
    [disabled, selectedItems, filteredItems, selectAll, isControlled]
  );

  const clearSelection = useCallback(() => {
    if (disabled) return;

    callOnChangeHandler<ItemType>({
      isControlled,
      isMounted: isMounted.current,
      onChangeHandlerControlled: savedOnChange.current,
      onChangeHandlerUncontrolled: setUncontrolledItems,
      selectedItems: [],
    });
  }, [disabled, isControlled]);

  useEffect(() => {
    savedOnChange.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (isMounted.current && savedOnChange.current && !isControlled) {
      savedOnChange.current({ selectedItems });
    }
  }, [isControlled, selectedItems]);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return {
    clearSelection,
    onItemChange,
    selectedItems,
  };
};

interface SelectionRenderProps<ItemType> {
  clearSelection: () => void;
  onItemChange: (item: ItemType) => void;
  selectedItems: ItemType[];
}

interface SelectionProps<ItemType> {
  children?: (renderProps: SelectionRenderProps<ItemType>) => React.ReactNode;
  disabled?: boolean;
  initialSelectedItems: ItemType[];
  onChange?: (state: { selectedItems: ItemType[] }) => void;
  render?: (renderProps: SelectionRenderProps<ItemType>) => React.ReactNode;
}

export const Selection = <ItemType,>({
  children,
  disabled,
  initialSelectedItems,
  onChange,
  render,
}: SelectionProps<ItemType>) => {
  const [selectedItems, setSelectedItems] = useState(initialSelectedItems);

  useEffect(() => {
    if (onChange) {
      onChange({ selectedItems });
    }
  }, [selectedItems, onChange]);

  const handleClearSelection = useCallback(() => {
    if (disabled) return;
    setSelectedItems([]);
  }, [disabled]);

  const handleSelectItem = useCallback((item: ItemType) => {
    setSelectedItems((prev) => prev.concat(item));
  }, []);

  const handleRemoveItem = useCallback((index: number) => {
    setSelectedItems((prev) => removeAtIndex(prev, index));
  }, []);

  const handleOnItemChange = useCallback(
    (item: ItemType) => {
      if (disabled) return;

      let selectedIndex: number | undefined;
      selectedItems.forEach((selectedItem, index) => {
        if (isEqual(selectedItem, item)) {
          selectedIndex = index;
        }
      });

      if (typeof selectedIndex === 'undefined') {
        handleSelectItem(item);
      } else {
        handleRemoveItem(selectedIndex);
      }
    },
    [disabled, selectedItems, handleSelectItem, handleRemoveItem]
  );

  const renderProps: SelectionRenderProps<ItemType> = {
    clearSelection: handleClearSelection,
    onItemChange: handleOnItemChange,
    selectedItems,
  };

  if (typeof render !== 'undefined') {
    return <>{render(renderProps)}</>;
  }

  if (typeof children !== 'undefined') {
    return <>{children(renderProps)}</>;
  }

  return null;
};

/**
 * Generic utility for safely removing an element at a given index from an
 * array.
 */
const removeAtIndex = <ItemType,>(array: ItemType[], index: number) => {
  const result = array.slice();
  result.splice(index, 1);
  return result;
};
