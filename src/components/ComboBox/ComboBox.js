import cx from 'classnames';
import Downshift from 'downshift';
import PropTypes from 'prop-types';
import React from 'react';
import ListBox, { PropTypes as ListBoxPropTypes } from '../ListBox';

const defaultItemToString = item => {
  if (typeof item === 'string') {
    return item;
  }

  return item && item.label;
};

const defaultShouldFilterItem = ({ inputValue, item, itemToString }) =>
  !inputValue ||
  itemToString(item)
    .toLowerCase()
    .includes(inputValue.toLowerCase());

const getInputValue = (props, state) => {
  if (props.initialSelectedItem) {
    return props.itemToString(props.initialSelectedItem);
  }

  return state.inputValue || '';
};

export default class ComboBox extends React.Component {
  static propTypes = {
    /**
     * An optional className to add to the container node
     */
    className: PropTypes.string,

    /**
     * Specify if the control should be disabled, or not
     */
    disabled: PropTypes.bool,

    /**
     * Specify a custom `id` for the input
     */
    id: PropTypes.string,

    /**
     * Allow users to pass in an arbitrary item or a string (in case their items are an array of strings)
     * from their collection that are pre-selected
     */
    initialSelectedItem: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
    ]),

    /**
     * We try to stay as generic as possible here to allow individuals to pass
     * in a collection of whatever kind of data structure they prefer
     */
    items: PropTypes.array.isRequired,

    /**
     * Helper function passed to downshift that allows the library to render a
     * given item to a string label. By default, it extracts the `label` field
     * from a given item to serve as the item label in the list
     */
    itemToString: PropTypes.func,

    /**
     * `onChange` is a utility for this controlled component to communicate to a
     * consuming component when a specific dropdown item is selected.
     * @param {{ selectedItem }}
     */
    onChange: PropTypes.func.isRequired,

    /**
     * Used to provide a placeholder text node before a user enters any input.
     * This is only present if the control has no items selected
     */
    placeholder: PropTypes.string.isRequired,

    /**
     * Specify your own filtering logic by passing in a `shouldFilterItem`
     * function that takes in the current input and an item and passes back
     * whether or not the item should be filtered.
     */
    shouldFilterItem: PropTypes.func,

    /**
     * Currently supports either the default type, or an inline variant
     */
    type: ListBoxPropTypes.ListBoxType,
    /**
     * Callback function to notify consumer when the text input changes.
     * This provides support to change available items based on the text.
     * @param {string} inputText
     */
    onInputChange: PropTypes.func,
  };

  static defaultProps = {
    disabled: false,
    itemToString: defaultItemToString,
    shouldFilterItem: defaultShouldFilterItem,
    type: 'default',
    ariaLabel: 'ListBox input field',
  };

  constructor(props) {
    super(props);
    this.state = {
      inputValue: getInputValue(props, {}),
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState(state => ({
      inputValue: getInputValue(nextProps, state),
    }));
  }

  filterItems = (items, itemToString, inputValue) =>
    items.filter(item =>
      this.props.shouldFilterItem({
        item,
        itemToString,
        inputValue,
      })
    );

  handleOnChange = selectedItem => {
    if (this.props.onChange) {
      this.props.onChange({ selectedItem });
    }
  };

  handleOnInputKeyDown = event => {
    event.stopPropagation();
  };

  handleOnInputValueChange = inputValue => {
    const { onInputChange } = this.props;
    this.setState(
      () => ({
        // Default to empty string if we have a false-y `inputValue`
        inputValue: inputValue || '',
      }),
      () => {
        if (onInputChange) {
          onInputChange(inputValue);
        }
      }
    );
  };

  render() {
    const {
      className: containerClassName,
      disabled,
      id,
      items,
      itemToString,
      placeholder,
      initialSelectedItem,
      ariaLabel,
    } = this.props;
    const className = cx('bx--combo-box', containerClassName);
    return (
      <Downshift
        onChange={this.handleOnChange}
        onInputValueChange={this.handleOnInputValueChange}
        inputValue={this.state.inputValue || ''}
        itemToString={itemToString}
        defaultSelectedItem={initialSelectedItem}>
        {({
          getButtonProps,
          getInputProps,
          getItemProps,
          getRootProps,
          isOpen,
          inputValue,
          selectedItem,
          highlightedIndex,
          clearSelection,
        }) => (
          <ListBox
            className={className}
            disabled={disabled}
            {...getRootProps({ refKey: 'innerRef' })}>
            <ListBox.Field {...getButtonProps({ disabled })}>
              <input
                className="bx--text-input"
                aria-label={ariaLabel}
                {...getInputProps({
                  disabled,
                  id,
                  placeholder,
                  onKeyDown: this.handleOnInputKeyDown,
                })}
              />
              {inputValue &&
                isOpen && <ListBox.Selection clearSelection={clearSelection} />}
              <ListBox.MenuIcon isOpen={isOpen} />
            </ListBox.Field>
            {isOpen && (
              <ListBox.Menu>
                {this.filterItems(items, itemToString, inputValue).map(
                  (item, index) => (
                    <ListBox.MenuItem
                      key={itemToString(item)}
                      isActive={selectedItem === item}
                      isHighlighted={highlightedIndex === index}
                      {...getItemProps({ item, index })}>
                      {itemToString(item)}
                    </ListBox.MenuItem>
                  )
                )}
              </ListBox.Menu>
            )}
          </ListBox>
        )}
      </Downshift>
    );
  }
}
