import cx from 'classnames';
import Downshift from 'downshift';
import PropTypes from 'prop-types';
import React from 'react';
import ListBox, { PropTypes as ListBoxPropTypes } from '../ListBox';

export default class DropdownV2 extends React.Component {
  static propTypes = {
    /**
     * Disable the control
     */
    disabled: PropTypes.bool,

    /**
     * We try to stay as generic as possible here to allow individuals to pass
     * in a collection of whatever kind of data structure they prefer
     */
    items: PropTypes.array.isRequired,

    /**
     * Allow users to pass in arbitrary items from their collection that are
     * pre-selected
     */
    initialSelectedItem: PropTypes.object,

    /**
     * Helper function passed to downshift that allows the library to render a
     * given item to a string label. By default, it extracts the `label` field
     * from a given item to serve as the item label in the list.
     */
    itemToString: PropTypes.func,

    /**
     * `onChange` is a utility for this controlled component to communicate to a
     * consuming component what kind of internal state changes are occuring.
     */
    onChange: PropTypes.func,

    /**
     * Generic `label` that will be used as the textual representation of what
     * this field is for
     */
    label: PropTypes.node.isRequired,

    type: ListBoxPropTypes.ListBoxType,
  };

  static defaultProps = {
    disabled: false,
    type: 'default',
    itemToString: item => (item ? item.label : ''),
  };

  handleOnChange = selectedItem => {
    if (this.props.onChange) {
      this.props.onChange({ selectedItem });
    }
  };

  render() {
    const {
      className: containerClassName,
      disabled,
      items,
      label,
      itemToString,
      type,
      initialSelectedItem,
    } = this.props;
    const className = cx('bx--dropdown-v2', containerClassName);
    return (
      <Downshift
        onChange={this.handleOnChange}
        itemToString={itemToString}
        defaultSelectedItem={initialSelectedItem}>
        {({
          isOpen,
          itemToString,
          selectedItem,
          highlightedIndex,
          getRootProps,
          getButtonProps,
          getItemProps,
          getLabelProps,
        }) => (
          <ListBox
            type={type}
            className={className}
            disabled={disabled}
            {...getRootProps({ refKey: 'innerRef' })}>
            <ListBox.Field {...getButtonProps({ disabled })}>
              <span className="bx--list-box__label" {...getLabelProps()}>
                {selectedItem ? itemToString(selectedItem) : label}
              </span>
              <ListBox.MenuIcon isOpen={isOpen} />
            </ListBox.Field>
            {isOpen && (
              <ListBox.Menu>
                {items.map((item, index) => (
                  <ListBox.MenuItem
                    key={itemToString(item)}
                    isActive={selectedItem === item}
                    isHighlighted={highlightedIndex === index}
                    {...getItemProps({ item, index })}>
                    {itemToString(item)}
                  </ListBox.MenuItem>
                ))}
              </ListBox.Menu>
            )}
          </ListBox>
        )}
      </Downshift>
    );
  }
}
