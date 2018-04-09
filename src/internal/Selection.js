import React from 'react';
import PropTypes from 'prop-types';

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
    const { selectedItems } = this.state;
    const selectedIndex = selectedItems.indexOf(item);

    if (selectedIndex === -1) {
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
