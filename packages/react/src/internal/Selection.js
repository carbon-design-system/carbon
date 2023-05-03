/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useCallback, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';

function callOnChangeHandler({
  isControlled,
  isMounted,
  onChangeHandlerControlled,
  onChangeHandlerUncontrolled,
  selectedItems,
}) {
  if (isControlled) {
    if (isMounted && onChangeHandlerControlled) {
      onChangeHandlerControlled({ selectedItems });
    }
  } else {
    onChangeHandlerUncontrolled(selectedItems);
  }
}

export function useSelection({
  disabled,
  onChange,
  initialSelectedItems = [],
  selectedItems: controlledItems,
}) {
  const isMounted = useRef(false);
  const savedOnChange = useRef(onChange);
  const [uncontrolledItems, setUncontrolledItems] =
    useState(initialSelectedItems);
  const isControlled = !!controlledItems;
  const selectedItems = isControlled ? controlledItems : uncontrolledItems;
  const onItemChange = useCallback(
    (item) => {
      if (disabled) {
        return;
      }

      let selectedIndex;
      selectedItems.forEach((selectedItem, index) => {
        if (isEqual(selectedItem, item)) {
          selectedIndex = index;
        }
      });
      let newSelectedItems;
      if (selectedIndex === undefined) {
        newSelectedItems = selectedItems.concat(item);
        callOnChangeHandler({
          isControlled,
          isMounted: isMounted.current,
          onChangeHandlerControlled: savedOnChange.current,
          onChangeHandlerUncontrolled: setUncontrolledItems,
          selectedItems: newSelectedItems,
        });
        return;
      }

      newSelectedItems = removeAtIndex(selectedItems, selectedIndex);
      callOnChangeHandler({
        isControlled,
        isMounted: isMounted.current,
        onChangeHandlerControlled: savedOnChange.current,
        onChangeHandlerUncontrolled: setUncontrolledItems,
        selectedItems: newSelectedItems,
      });
    },
    [disabled, isControlled, selectedItems]
  );

  const clearSelection = useCallback(() => {
    if (disabled) {
      return;
    }
    callOnChangeHandler({
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
    selectedItems,
    onItemChange,
    clearSelection,
  };
}

export default class Selection extends React.Component {
  static propTypes = {
    children: PropTypes.func,
    disabled: PropTypes.bool,
    initialSelectedItems: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    render: PropTypes.func,
  };

  static defaultProps = {
    initialSelectedItems: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedItems: props.initialSelectedItems,
    };
  }

  internalSetState = (stateToSet, callback) =>
    this.setState(stateToSet, () => {
      if (callback) {
        callback();
      }
      if (this.props.onChange) {
        this.props.onChange(this.state);
      }
    });

  handleClearSelection = () => {
    if (this.props.disabled) {
      return;
    }
    this.internalSetState({
      selectedItems: [],
    });
  };

  handleSelectItem = (item) => {
    this.internalSetState((state) => ({
      selectedItems: state.selectedItems.concat(item),
    }));
  };

  handleRemoveItem = (index) => {
    this.internalSetState((state) => ({
      selectedItems: removeAtIndex(state.selectedItems, index),
    }));
  };

  handleOnItemChange = (item) => {
    if (this.props.disabled) {
      return;
    }
    const { selectedItems } = this.state;

    let selectedIndex;
    selectedItems.forEach((selectedItem, index) => {
      if (isEqual(selectedItem, item)) {
        selectedIndex = index;
      }
    });

    if (selectedIndex === undefined) {
      this.handleSelectItem(item);
      return;
    }
    this.handleRemoveItem(selectedIndex);
  };

  render() {
    const { children, render } = this.props;
    const { selectedItems } = this.state;
    const renderProps = {
      selectedItems,
      onItemChange: this.handleOnItemChange,
      clearSelection: this.handleClearSelection,
    };

    if (render !== undefined) {
      return render(renderProps);
    }

    if (children !== undefined) {
      return children(renderProps);
    }

    return null;
  }
}

// Generic utility for safely removing an element at a given index from an
// array.
const removeAtIndex = (array, index) => {
  const result = array.slice();
  result.splice(index, 1);
  return result;
};
