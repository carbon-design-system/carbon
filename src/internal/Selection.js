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
    this.internalSetState(state => ({
      selectedItems: state.selectedItems.concat(item),
    }));
  };

  handleRemoveItem = index => {
    this.internalSetState(state => ({
      selectedItems: removeAtIndex(state.selectedItems, index),
    }));
  };
  handleOnItemChange = item => {
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
