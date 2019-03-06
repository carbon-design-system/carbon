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
import ListBox from '../ListBox';
import Checkbox from '../Checkbox';
import Selection from '../../internal/Selection';
import { sortingPropTypes } from './MultiSelectPropTypes';
import { defaultItemToString } from './tools/itemToString';
import { defaultSortItems, defaultCompareItems } from './tools/sorting';
import { defaultFilterItems } from '../ComboBox/tools/filter';
import { componentsX } from '../../internal/FeatureFlags';

const { prefix } = settings;

export default class FilterableMultiSelect extends React.Component {
  static propTypes = {
    ...sortingPropTypes,
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
    compareItems: defaultCompareItems,
    disabled: false,
    filterItems: defaultFilterItems,
    initialSelectedItems: [],
    itemToString: defaultItemToString,
    locale: 'en',
    sortItems: defaultSortItems,
    light: false,
    open: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      highlightedIndex: null,
      isOpen: props.open,
      inputValue: '',
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

  handleOnStateChange = changes => {
    const { type } = changes;
    switch (type) {
      case Downshift.stateChangeTypes.keyDownArrowDown:
      case Downshift.stateChangeTypes.keyDownArrowUp:
      case Downshift.stateChangeTypes.itemMouseEnter:
        this.setState({ highlightedIndex: changes.highlightedIndex });
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
      className: containerClassName,
      disabled,
      filterItems,
      items,
      itemToString,
      initialSelectedItems,
      id,
      locale,
      placeholder,
      sortItems,
      compareItems,
      light,
      invalid,
      invalidText,
    } = this.props;
    const className = cx(
      `${prefix}--multi-select`,
      `${prefix}--combo-box`,
      containerClassName,
      {
        [`${prefix}--list-box--light`]: light,
      }
    );
    return (
      <Selection
        onChange={this.handleOnChange}
        initialSelectedItems={initialSelectedItems}
        render={({ selectedItems, onItemChange, clearSelection }) => (
          <Downshift
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
            }) => (
              <ListBox
                className={className}
                disabled={disabled}
                invalid={invalid}
                invalidText={invalidText}
                {...getRootProps({ refKey: 'innerRef' })}>
                <ListBox.Field {...getButtonProps({ disabled })}>
                  {selectedItem.length > 0 && (
                    <ListBox.Selection
                      clearSelection={clearSelection}
                      selectionCount={selectedItem.length}
                    />
                  )}
                  <input
                    className={`${prefix}--text-input`}
                    ref={el => (this.inputNode = el)}
                    {...getInputProps({
                      disabled,
                      id,
                      placeholder,
                      onKeyDown: this.handleOnInputKeyDown,
                    })}
                  />
                  {inputValue && isOpen && (
                    <ListBox.Selection clearSelection={this.clearInputValue} />
                  )}
                  <ListBox.MenuIcon isOpen={isOpen} />
                </ListBox.Field>
                {isOpen && (
                  <ListBox.Menu>
                    {componentsX
                      ? filterItems(items, { itemToString, inputValue }).map(
                          (item, index) => {
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
                                  name={itemText}
                                  checked={isChecked}
                                  readOnly={true}
                                  tabIndex="-1"
                                  labelText={itemText}
                                />
                              </ListBox.MenuItem>
                            );
                          }
                        )
                      : sortItems(
                          filterItems(items, { itemToString, inputValue }),
                          {
                            selectedItems,
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
                                name={itemText}
                                checked={isChecked}
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
            )}
          />
        )}
      />
    );
  }
}
