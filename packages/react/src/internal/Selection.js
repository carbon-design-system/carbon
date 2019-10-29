/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';

export default class Selection extends React.Component {
  static propTypes = {
    initialSelectedItems: PropTypes.array.isRequired,
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

  handleSelectItem = item => {
    const items = Array.isArray(item) ? item : [item];
    this.internalSetState(prevState => ({
      selectedItems: [...prevState.selectedItems, ...items],
    }));
  };

  handleRemoveItem = item => {
    const items = Array.isArray(item) ? item : [item];
    this.internalSetState(prevState => {
      const newState = {
        selectedItems: prevState.selectedItems.filter(
          itemOnState => items.indexOf(itemOnState) === -1
        ),
      };
      return newState;
    });
  };

  handleOnItemChange = item => {
    if (this.props.disabled) {
      return;
    }
    const { selectedItems } = this.state;

    const itemsToProcess = Array.isArray(item) ? item : [item];
    const result = itemsToProcess.reduce(
      (acc, theItem) => {
        let selectedIndex;
        selectedItems.some((selectedItem, index) => {
          if (isEqual(selectedItem, theItem)) {
            selectedIndex = index;
            return true;
          }
          return false;
        });
        if (selectedIndex === undefined) {
          acc.itemsToSelect.push(theItem);
        } else {
          acc.itemsToRemove.push(selectedItems[selectedIndex]);
        }
        return acc;
      },
      {
        itemsToSelect: [],
        itemsToRemove: [],
      }
    );

    if (result.itemsToSelect.length > 0) {
      this.handleSelectItem(result.itemsToSelect);
    }
    if (result.itemsToRemove.length > 0) {
      this.handleRemoveItem(result.itemsToRemove);
    }
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
export const removeAtIndex = (array, index) => {
  const result = array.slice();
  result.splice(index, 1);
  return result;
};
