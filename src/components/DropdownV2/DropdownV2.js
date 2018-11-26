import cx from 'classnames';
import Downshift from 'downshift';
import PropTypes from 'prop-types';
import React from 'react';
import ListBox, { PropTypes as ListBoxPropTypes } from '../ListBox';

const defaultItemToString = item => {
  if (typeof item === 'string') {
    return item;
  }

  return item ? item.label : '';
};

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
     * Allow users to pass in an arbitrary item or a string (in case their items are an array of strings)
     * from their collection that are pre-selected
     */
    initialSelectedItem: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
    ]),

    /**
     * Helper function passed to downshift that allows the library to render a
     * given item to a string label. By default, it extracts the `label` field
     * from a given item to serve as the item label in the list.
     */
    itemToString: PropTypes.func,

    /**
     * Function to render items as custom components instead of strings.
     * Defaults to null and is overriden by a getter
     */
    itemToElement: PropTypes.func,

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

    /**
     * 'aria-label' of the ListBox component.
     */
    ariaLabel: PropTypes.string,

    /**
     * The dropdown type, `default` or `inline`
     */
    type: ListBoxPropTypes.ListBoxType,

    /**
     * In the case you want to control the dropdown selection entirely.
     */
    selectedItem: PropTypes.object,

    /**
     * `true` to use the light version.
     */
    light: PropTypes.bool,
  };

  static defaultProps = {
    disabled: false,
    type: 'default',
    itemToString: defaultItemToString,
    itemToElement: null,
    light: false,
  };

  handleOnChange = selectedItem => {
    if (this.props.onChange) {
      this.props.onChange({ selectedItem });
    }
  };

  get itemToElement() {
    const { itemToString, itemToElement } = this.props;
    return itemToElement || itemToString;
  }

  render() {
    const {
      className: containerClassName,
      disabled,
      items,
      label,
      ariaLabel,
      itemToString,
      type,
      initialSelectedItem,
      selectedItem,
      light,
      id,
    } = this.props;
    const className = cx('bx--dropdown', containerClassName, {
      'bx--dropdown--light': light,
    });
    const ItemToElement = this.itemToElement;
    return (
      <Downshift
        id={id}
        onChange={this.handleOnChange}
        itemToString={itemToString}
        defaultSelectedItem={initialSelectedItem}
        selectedItem={selectedItem}>
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
            ariaLabel={ariaLabel}
            {...getRootProps({ refKey: 'innerRef' })}>
            <ListBox.Field {...getButtonProps({ disabled })}>
              <span className="bx--list-box__label" {...getLabelProps()}>
                {selectedItem ? this.itemToElement(selectedItem) : label}
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
                    <ItemToElement key={itemToString(item)} {...item} />
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
