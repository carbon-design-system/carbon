/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Downshift from 'downshift';
import isEqual from 'lodash.isequal';
import { settings } from 'carbon-components';
import { WarningFilled16 } from '@carbon/icons-react';
import ListBox, { PropTypes as ListBoxPropTypes } from '../ListBox';
import Checkbox from '../Checkbox';
import Selection from '../../internal/Selection';
import { sortingPropTypes } from './MultiSelectPropTypes';
import { defaultItemToString } from './tools/itemToString';
import { defaultSortItems, defaultCompareItems } from './tools/sorting';
import { defaultFilterItems } from '../ComboBox/tools/filter';

const { prefix } = settings;

export default class FilterableMultiSelect extends React.Component {
  static propTypes = {
    ...sortingPropTypes,
    /**
     * 'aria-label' of the ListBox component.
     */
    ariaLabel: PropTypes.string,

    /**
     * Disable the control
     */
    disabled: PropTypes.bool,

    /**
     * Specify a custom `id`
     */
    id: PropTypes.string.isRequired,

    /**
     * We try to stay as generic as possible here to allow individuals to pass
     * in a collection of whatever kind of data structure they prefer
     */
    items: PropTypes.array.isRequired,

    /**
     * Allow users to pass in arbitrary items from their collection that are
     * pre-selected
     */
    initialSelectedItems: PropTypes.array,

    /**
     * Helper function passed to downshift that allows the library to render a
     * given item to a string label. By default, it extracts the `label` field
     * from a given item to serve as the item label in the list.
     */
    itemToString: PropTypes.func,

    /**
     * Specify the locale of the control. Used for the default `compareItems`
     * used for sorting the list of items in the control.
     */
    locale: PropTypes.string,

    /**
     * Specify the size of the ListBox. Currently supports either `sm`, `lg` or `xl` as an option.
     */
    size: ListBoxPropTypes.ListBoxSize,

    /**
     * `onChange` is a utility for this controlled component to communicate to a
     * consuming component what kind of internal state changes are occuring.
     */
    onChange: PropTypes.func,

    /**
     * Generic `placeholder` that will be used as the textual representation of
     * what this field is for
     */
    placeholder: PropTypes.string.isRequired,

    /**
     * Specify title to show title on hover
     */
    useTitleInItem: PropTypes.bool,

    /**
     * `true` to use the light version.
     */
    light: PropTypes.bool,

    /**
     * Is the current selection invalid?
     */
    invalid: PropTypes.bool,

    /**
     * If invalid, what is the error?
     */
    invalidText: PropTypes.string,

    /**
     * Initialize the component with an open(`true`)/closed(`false`) menu.
     */
    open: PropTypes.bool,

    /**
     * Specify feedback (mode) of the selection.
     * `top`: selected item jumps to top
     * `fixed`: selected item stays at it's position
     * `top-after-reopen`: selected item jump to top after reopen dropdown
     */
    selectionFeedback: PropTypes.oneOf(['top', 'fixed', 'top-after-reopen']),

    /**
     * Callback function for translating ListBoxMenuIcon SVG title
     */
    translateWithId: PropTypes.func,

    /**
     * Additional props passed to Downshift
     */
    downshiftProps: PropTypes.shape(Downshift.propTypes),
  };

  static getDerivedStateFromProps({ open }, state) {
    /**
     * programmatically control this `open` prop
     */
    const { prevOpen } = state;
    return prevOpen === open
      ? null
      : {
          isOpen: open,
          prevOpen: open,
        };
  }

  static defaultProps = {
    ariaLabel: 'Choose an item',
    compareItems: defaultCompareItems,
    disabled: false,
    filterItems: defaultFilterItems,
    initialSelectedItems: [],
    itemToString: defaultItemToString,
    locale: 'en',
    sortItems: defaultSortItems,
    light: false,
    open: false,
    selectionFeedback: 'top-after-reopen',
  };

  constructor(props) {
    super(props);
    this.state = {
      highlightedIndex: null,
      isOpen: props.open,
      inputValue: '',
      topItems: [],
    };
  }

  handleOnChange = changes => {
    if (this.props.onChange) {
      this.props.onChange(changes);
    }
  };

  handleOnToggleMenu = () => {
    this.setState(state => ({
      isOpen: !state.isOpen,
    }));
  };

  handleOnOuterClick = () => {
    this.setState({
      isOpen: false,
      inputValue: '',
    });
  };

  handleOnStateChange = (changes, downshift) => {
    if (changes.isOpen && !this.state.isOpen) {
      this.setState({ topItems: downshift.selectedItem });
    }

    const { type } = changes;
    switch (type) {
      case Downshift.stateChangeTypes.keyDownArrowUp:
      case Downshift.stateChangeTypes.itemMouseEnter:
        this.setState({ highlightedIndex: changes.highlightedIndex });
        break;
      case Downshift.stateChangeTypes.keyDownArrowDown:
        this.setState({
          highlightedIndex: changes.highlightedIndex,
          isOpen: true,
        });
        break;
      case Downshift.stateChangeTypes.keyDownEscape:
      case Downshift.stateChangeTypes.mouseUp:
        this.setState({ isOpen: false });
        break;
      // Opt-in to some cases where we should be toggling the menu based on
      // a given key press or mouse handler
      // Reference: https://github.com/paypal/downshift/issues/206
      case Downshift.stateChangeTypes.clickButton:
      case Downshift.stateChangeTypes.keyDownSpaceButton:
        this.setState(() => {
          let nextIsOpen = changes.isOpen || false;
          if (changes.isOpen === false) {
            // If Downshift is trying to close the menu, but we know the input
            // is the active element in thedocument, then keep the menu open
            if (this.inputNode === document.activeElement) {
              nextIsOpen = true;
            }
          }
          return {
            isOpen: nextIsOpen,
          };
        });
        break;
    }
  };

  handleOnInputKeyDown = event => {
    event.stopPropagation();
  };

  handleOnInputValueChange = (inputValue, { type }) => {
    if (type === Downshift.stateChangeTypes.changeInput)
      this.setState(() => {
        if (Array.isArray(inputValue)) {
          return {
            inputValue: '',
          };
        }
        return {
          inputValue: inputValue || '',
        };
      });
  };

  clearInputValue = event => {
    event.stopPropagation();
    this.setState({ inputValue: '' });
    this.inputNode && this.inputNode.focus && this.inputNode.focus();
  };

  render() {
    const { highlightedIndex, isOpen, inputValue } = this.state;
    const {
      ariaLabel,
      className: containerClassName,
      disabled,
      filterItems,
      items,
      itemToString,
      titleText,
      helperText,
      type,
      initialSelectedItems,
      id,
      locale,
      size,
      placeholder,
      sortItems,
      compareItems,
      light,
      invalid,
      invalidText,
      useTitleInItem,
      translateWithId,
      downshiftProps,
    } = this.props;
    const inline = type === 'inline';
    const wrapperClasses = cx(
      `${prefix}--multi-select__wrapper`,
      `${prefix}--list-box__wrapper`,
      {
        [`${prefix}--multi-select__wrapper--inline`]: inline,
        [`${prefix}--list-box__wrapper--inline`]: inline,
        [`${prefix}--multi-select__wrapper--inline--invalid`]:
          inline && invalid,
        [`${prefix}--list-box__wrapper--inline--invalid`]: inline && invalid,
      }
    );
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
    const inputClasses = cx(`${prefix}--text-input`, {
      [`${prefix}--text-input--empty`]: !this.state.inputValue,
    });
    const input = (
      <Selection
        disabled={disabled}
        onChange={this.handleOnChange}
        initialSelectedItems={initialSelectedItems}
        render={({ selectedItems, onItemChange, clearSelection }) => (
          <Downshift
            {...downshiftProps}
            highlightedIndex={highlightedIndex}
            isOpen={isOpen}
            inputValue={inputValue}
            onInputValueChange={this.handleOnInputValueChange}
            onChange={onItemChange}
            itemToString={itemToString}
            onStateChange={this.handleOnStateChange}
            onOuterClick={this.handleOnOuterClick}
            selectedItem={selectedItems}
            render={({
              getButtonProps,
              getInputProps,
              getItemProps,
              getRootProps,
              isOpen,
              inputValue,
              selectedItem,
            }) => {
              const className = cx(
                `${prefix}--multi-select`,
                `${prefix}--combo-box`,
                `${prefix}--multi-select--filterable`,
                containerClassName,
                {
                  [`${prefix}--multi-select--invalid`]: invalid,
                  [`${prefix}--multi-select--open`]: isOpen,
                  [`${prefix}--multi-select--inline`]: inline,
                  [`${prefix}--multi-select--selected`]:
                    selectedItem.length > 0,
                }
              );
              return (
                <ListBox
                  className={className}
                  disabled={disabled}
                  light={light}
                  invalid={invalid}
                  invalidText={invalidText}
                  isOpen={isOpen}
                  size={size}
                  {...getRootProps({ refKey: 'innerRef' })}>
                  <ListBox.Field
                    id={id}
                    disabled={disabled}
                    translateWithId={translateWithId}
                    {...getButtonProps({ disabled })}>
                    {selectedItem.length > 0 && (
                      <ListBox.Selection
                        clearSelection={clearSelection}
                        selectionCount={selectedItem.length}
                        translateWithId={translateWithId}
                        disabled={disabled}
                      />
                    )}
                    <input
                      className={inputClasses}
                      aria-controls={`${id}__menu`}
                      aria-autocomplete="list"
                      ref={el => (this.inputNode = el)}
                      {...getInputProps({
                        disabled,
                        id,
                        placeholder,
                        onKeyDown: this.handleOnInputKeyDown,
                      })}
                    />
                    {invalid && (
                      <WarningFilled16
                        className={`${prefix}--list-box__invalid-icon`}
                      />
                    )}
                    {inputValue && isOpen && (
                      <ListBox.Selection
                        clearSelection={this.clearInputValue}
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
                      {sortItems(
                        filterItems(items, { itemToString, inputValue }),
                        {
                          selectedItems: {
                            top: selectedItems,
                            fixed: [],
                            'top-after-reopen': this.state.topItems,
                          }[this.props.selectionFeedback],
                          itemToString,
                          compareItems,
                          locale,
                        }
                      ).map((item, index) => {
                        const itemProps = getItemProps({ item });
                        const itemText = itemToString(item);
                        const isChecked =
                          selectedItem.filter(selected =>
                            isEqual(selected, item)
                          ).length > 0;
                        return (
                          <ListBox.MenuItem
                            key={itemProps.id}
                            isActive={isChecked}
                            isHighlighted={highlightedIndex === index}
                            {...itemProps}>
                            <Checkbox
                              id={itemProps.id}
                              title={useTitleInItem ? itemText : null}
                              name={itemText}
                              checked={isChecked}
                              disabled={disabled}
                              readOnly={true}
                              tabIndex="-1"
                              labelText={itemText}
                            />
                          </ListBox.MenuItem>
                        );
                      })}
                    </ListBox.Menu>
                  )}
                </ListBox>
              );
            }}
          />
        )}
      />
    );
    return (
      <div className={wrapperClasses}>
        {title}
        {!inline && helper}
        {input}
      </div>
    );
  }
}
