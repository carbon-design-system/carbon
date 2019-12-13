/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import Downshift from 'downshift';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';
import { WarningFilled16 } from '@carbon/icons-react';
import ListBox, { PropTypes as ListBoxPropTypes } from '../ListBox';
import { match, keys } from '../../internal/keyboard';
import setupGetInstanceId from '../../tools/setupGetInstanceId';

const { prefix } = settings;

const defaultItemToString = item => {
  if (typeof item === 'string') {
    return item;
  }

  return item && item.label;
};

const defaultShouldFilterItem = () => true;

const getInputValue = (props, state) => {
  if (props.selectedItem) {
    return props.itemToString(props.selectedItem);
  }
  // TODO: consistent `initialSelectedItem` behavior with other listbox components in v11
  if (props.initialSelectedItem) {
    return props.itemToString(props.initialSelectedItem);
  }

  return state.inputValue || '';
};

const findHighlightedIndex = ({ items, itemToString }, inputValue) => {
  if (!inputValue) {
    return -1;
  }

  const searchValue = inputValue.toLowerCase();

  for (let i = 0; i < items.length; i++) {
    const item = itemToString(items[i]).toLowerCase();
    if (item.indexOf(searchValue) !== -1) {
      return i;
    }
  }

  return -1;
};

const getInstanceId = setupGetInstanceId();

export default class ComboBox extends React.Component {
  static propTypes = {
    /**
     * 'aria-label' of the ListBox component.
     */
    ariaLabel: PropTypes.string,

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
    id: PropTypes.string.isRequired,

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
     * Optional function to render items as custom components instead of strings.
     * Defaults to null and is overriden by a getter
     */
    itemToElement: PropTypes.func,

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
     * Specify if the currently selected value is invalid.
     */
    invalid: PropTypes.bool,

    /**
     * Message which is displayed if the value is invalid.
     */
    invalidText: PropTypes.string,

    /**
     * For full control of the selection
     */
    selectedItem: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),

    /**
     * Specify a custom translation function that takes in a message identifier
     * and returns the localized string for the message
     */
    translateWithId: PropTypes.func,

    /**
     * Currently supports either the default type, or an inline variant
     */
    type: ListBoxPropTypes.ListBoxType,

    /**
     * Specify the size of the ListBox. Currently supports either `sm`, `lg` or `xl` as an option.
     */
    size: ListBoxPropTypes.ListBoxSize,

    /**
     * Callback function to notify consumer when the text input changes.
     * This provides support to change available items based on the text.
     * @param {string} inputText
     */
    onInputChange: PropTypes.func,

    /**
     * should use "light theme" (white background)?
     */
    light: PropTypes.bool,

    /**
     * Additional props passed to Downshift
     */
    downshiftProps: PropTypes.shape(Downshift.propTypes),
  };

  static defaultProps = {
    disabled: false,
    itemToString: defaultItemToString,
    itemToElement: null,
    shouldFilterItem: defaultShouldFilterItem,
    type: 'default',
    ariaLabel: 'Choose an item',
    light: false,
  };

  constructor(props) {
    super(props);

    this.textInput = React.createRef();

    this.comboBoxInstanceId = getInstanceId();

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

  handleOnStateChange = (newState, { setHighlightedIndex }) => {
    if (Object.prototype.hasOwnProperty.call(newState, 'inputValue')) {
      const { inputValue } = newState;
      const { onInputChange } = this.props;

      setHighlightedIndex(findHighlightedIndex(this.props, inputValue));

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
    }
  };

  onToggleClick = isOpen => event => {
    if (event.target === this.textInput.current && isOpen) {
      event.preventDownshiftDefault = true;
      event.persist();
    }
  };

  render() {
    const {
      className: containerClassName,
      disabled,
      id,
      items,
      itemToString,
      itemToElement,
      titleText,
      helperText,
      placeholder,
      initialSelectedItem,
      selectedItem,
      ariaLabel,
      translateWithId,
      invalid,
      invalidText,
      light,
      type, // eslint-disable-line no-unused-vars
      size,
      shouldFilterItem, // eslint-disable-line no-unused-vars
      onChange, // eslint-disable-line no-unused-vars
      onInputChange, // eslint-disable-line no-unused-vars
      downshiftProps,
      ...rest
    } = this.props;
    const className = cx(`${prefix}--combo-box`, containerClassName);
    const titleClasses = cx(`${prefix}--label`, {
      [`${prefix}--label--disabled`]: disabled,
    });
    const title = titleText ? (
      <label htmlFor={id} className={titleClasses}>
        {titleText}
      </label>
    ) : null;
    const helperClasses = cx(`${prefix}--form__helper-text`, {
      [`${prefix}--form__helper-text--disabled`]: disabled,
    });
    const helper = helperText ? (
      <div className={helperClasses}>{helperText}</div>
    ) : null;
    const wrapperClasses = cx(`${prefix}--list-box__wrapper`);
    const comboBoxA11yId = `combobox-a11y-${this.comboBoxInstanceId}`;
    const inputClasses = cx(`${prefix}--text-input`, {
      [`${prefix}--text-input--empty`]: !this.state.inputValue,
    });

    // needs to be Capitalized for react to render it correctly
    const ItemToElement = itemToElement;
    const input = (
      <Downshift
        {...downshiftProps}
        onChange={this.handleOnChange}
        onStateChange={this.handleOnStateChange}
        inputValue={this.state.inputValue || ''}
        itemToString={itemToString}
        defaultSelectedItem={initialSelectedItem}
        selectedItem={selectedItem}>
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
          toggleMenu,
        }) => (
          <ListBox
            className={className}
            disabled={disabled}
            invalid={invalid}
            id={comboBoxA11yId}
            aria-label={ariaLabel}
            invalidText={invalidText}
            isOpen={isOpen}
            light={light}
            size={size}
            {...getRootProps({ refKey: 'innerRef' })}>
            <ListBox.Field
              id={id}
              disabled={disabled}
              translateWithId={translateWithId}
              {...getButtonProps({
                disabled,
                onClick: this.onToggleClick(isOpen),
              })}>
              <input
                className={inputClasses}
                aria-labelledby={comboBoxA11yId}
                tabIndex="0"
                aria-disabled={disabled}
                aria-controls={isOpen ? `${id}__menu` : null}
                aria-owns={isOpen ? `${id}__menu` : null}
                aria-autocomplete="list"
                ref={this.textInput}
                {...rest}
                {...getInputProps({
                  disabled,
                  id,
                  placeholder,
                  onKeyDown: event => {
                    event.stopPropagation();

                    if (match(event, keys.Enter)) {
                      toggleMenu();
                    }
                  },
                })}
              />
              {invalid && (
                <WarningFilled16
                  className={`${prefix}--list-box__invalid-icon`}
                />
              )}
              {inputValue && (
                <ListBox.Selection
                  clearSelection={clearSelection}
                  translateWithId={translateWithId}
                  disabled={disabled}
                />
              )}
              <ListBox.MenuIcon
                isOpen={isOpen}
                translateWithId={translateWithId}
              />
            </ListBox.Field>
            {isOpen && (
              <ListBox.Menu aria-label={ariaLabel} id={id}>
                {this.filterItems(items, itemToString, inputValue).map(
                  (item, index) => (
                    <ListBox.MenuItem
                      key={itemToString(item)}
                      isActive={selectedItem === item}
                      isHighlighted={
                        highlightedIndex === index ||
                        (selectedItem && selectedItem.id === item.id) ||
                        false
                      }
                      {...getItemProps({ item, index })}>
                      {itemToElement ? (
                        <ItemToElement key={itemToString(item)} {...item} />
                      ) : (
                        itemToString(item)
                      )}
                    </ListBox.MenuItem>
                  )
                )}
              </ListBox.Menu>
            )}
          </ListBox>
        )}
      </Downshift>
    );

    return (
      <div className={wrapperClasses}>
        {title}
        {helper}
        {input}
      </div>
    );
  }
}
