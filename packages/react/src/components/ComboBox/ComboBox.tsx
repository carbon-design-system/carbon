/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import Downshift from 'downshift';
import PropTypes, { ReactNodeLike } from 'prop-types';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { Text } from '../Text';
import {
  Checkmark,
  WarningAltFilled,
  WarningFilled,
} from '@carbon/icons-react';
import ListBox, {
  PropTypes as ListBoxPropTypes,
  ListBoxType,
  ListBoxSize,
} from '../ListBox';
import { ListBoxTrigger, ListBoxSelection } from '../ListBox/next';
import { match, keys } from '../../internal/keyboard';
import setupGetInstanceId from '../../tools/setupGetInstanceId';
import mergeRefs from '../../tools/mergeRefs';
import { useFeatureFlag } from '../FeatureFlags';
import deprecate from '../../prop-types/deprecate';
import { usePrefix } from '../../internal/usePrefix';
import { FormContext } from '../FluidForm';

const defaultItemToString = (item) => {
  if (typeof item === 'string') {
    return item;
  }

  return item && item.label;
};

const defaultShouldFilterItem = () => true;

const getInputValue = ({
  initialSelectedItem,
  inputValue,
  itemToString,
  selectedItem,
}) => {
  if (selectedItem) {
    return itemToString(selectedItem);
  }

  if (initialSelectedItem) {
    return itemToString(initialSelectedItem);
  }

  return inputValue || '';
};

const findHighlightedIndex = (
  { items, itemToString = defaultItemToString },
  inputValue
) => {
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

type ExcludedAttributes = 'id' | 'onChange' | 'onClick' | 'type' | 'size';

export interface ComboBoxProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    ExcludedAttributes
  > {
  /**
   * 'aria-label' of the ListBox component.
   */
  ariaLabel?: string;

  /**
   * An optional className to add to the container node
   */
  className?: string;

  /**
   * Specify the direction of the combobox dropdown. Can be either top or bottom.
   */
  direction?: 'top' | 'bottom';

  /**
   * Specify if the control should be disabled, or not
   */
  disabled?: boolean;

  /**
   * Additional props passed to Downshift
   */
  downshiftProps?: React.ComponentProps<typeof Downshift>;

  /**
   * Provide helper text that is used alongside the control label for
   * additional help
   */
  helperText?: string;

  /**
   * Specify a custom `id` for the input
   */
  id: string;

  /**
   * Allow users to pass in an arbitrary item or a string (in case their items are an array of strings)
   * from their collection that are pre-selected
   */
  initialSelectedItem?: object | string | number;

  /**
   * Specify if the currently selected value is invalid.
   */
  invalid?: boolean;

  /**
   * Message which is displayed if the value is invalid.
   */
  invalidText?: ReactNodeLike;

  /**
   * Optional function to render items as custom components instead of strings.
   * Defaults to null and is overridden by a getter
   */
  itemToElement?: React.ComponentType | null;

  /**
   * Helper function passed to downshift that allows the library to render a
   * given item to a string label. By default, it extracts the `label` field
   * from a given item to serve as the item label in the list
   */
  itemToString?: (item: unknown) => string;

  /**
   * We try to stay as generic as possible here to allow individuals to pass
   * in a collection of whatever kind of data structure they prefer
   */
  items: (object | string | number)[];

  /**
   * @deprecated
   * should use "light theme" (white background)?
   */
  light?: boolean;

  /**
   * `onChange` is a utility for this controlled component to communicate to a
   * consuming component when a specific dropdown item is selected.
   * `({ selectedItem }) => void`
  //  * @param {{ selectedItem }}
   */
  onChange: (data: { selectedItem: any }) => void;

  /**
   * Callback function to notify consumer when the text input changes.
   * This provides support to change available items based on the text.
   * `(inputText) => void`
   * @param {string} inputText
   */
  onInputChange?: (inputText: string) => void;

  /**
   * Helper function passed to Downshift that allows the user to observe internal
   * state changes
   * `(changes, stateAndHelpers) => void`
   */
  onStateChange?: (changes: object, stateAndHelpers: object) => void;

  /**
   * Callback function that fires when the combobox menu toggle is clicked
   * `(evt) => void`
   * @param {MouseEvent} event
   */
  onToggleClick?: (evt: MouseEvent) => void;

  /**
   * Used to provide a placeholder text node before a user enters any input.
   * This is only present if the control has no items selected
   */
  placeholder?: string;

  /**
   * Is the ComboBox readonly?
   */
  readOnly?: boolean;

  /**
   * For full control of the selection
   */
  selectedItem?: object | string | number;

  /**
   * Specify your own filtering logic by passing in a `shouldFilterItem`
   * function that takes in the current input and an item and passes back
   * whether or not the item should be filtered.
   */
  shouldFilterItem?: (input: any) => boolean;

  /**
   * Specify the size of the ListBox. Currently supports either `sm`, `md` or `lg` as an option.
   */
  size?: ListBoxSize;

  /**
   * Provide text to be used in a `<label>` element that is tied to the
   * combobox via ARIA attributes.
   */
  titleText?: ReactNodeLike;

  /**
   * Specify a custom translation function that takes in a message identifier
   * and returns the localized string for the message
   */
  translateWithId?: (id: any) => string;

  /**
   * Currently supports either the default type, or an inline variant
   */
  type?: ListBoxType;

  /**
   * Specify whether the control is currently in warning state
   */
  warn?: boolean;

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText?: ReactNodeLike;
}

const ComboBox = React.forwardRef((props: ComboBoxProps, ref) => {
  const {
    ariaLabel,
    className: containerClassName,
    direction,
    disabled,
    downshiftProps,
    helperText,
    id,
    initialSelectedItem,
    invalid,
    invalidText,
    items,
    itemToElement,
    itemToString,
    light,
    onChange,
    onInputChange,
    onToggleClick,
    placeholder,
    readOnly,
    selectedItem,
    shouldFilterItem,
    size,
    titleText,
    translateWithId,
    type: _type,
    warn,
    warnText,
    onStateChange: _onStateChange,
    ...rest
  } = props;
  const prefix = usePrefix();
  const { isFluid } = useContext(FormContext);
  const textInput = useRef<HTMLInputElement>(null);
  const comboBoxInstanceId = getInstanceId();
  const [inputValue, setInputValue] = useState(
    getInputValue({
      initialSelectedItem,
      inputValue: '',
      itemToString,
      selectedItem,
    })
  );
  const [isFocused, setIsFocused] = useState(false);
  const [prevSelectedItem, setPrevSelectedItem] = useState<any>();
  const [doneInitialSelectedItem, setDoneInitialSelectedItem] = useState(false);
  const savedOnInputChange = useRef(onInputChange);

  if (!doneInitialSelectedItem || prevSelectedItem !== selectedItem) {
    setDoneInitialSelectedItem(true);
    setPrevSelectedItem(selectedItem);
    setInputValue(
      getInputValue({
        initialSelectedItem,
        inputValue,
        itemToString,
        selectedItem,
      })
    );
  }

  const filterItems = (items, itemToString, inputValue) =>
    items.filter((item) =>
      shouldFilterItem
        ? shouldFilterItem({
            item,
            itemToString,
            inputValue,
          })
        : defaultShouldFilterItem()
    );

  const handleOnChange = (selectedItem) => {
    if (onChange) {
      onChange({ selectedItem });
    }
  };

  const handleOnInputValueChange = (inputValue) => {
    setInputValue(inputValue || '');
  };

  useEffect(() => {
    savedOnInputChange.current = onInputChange;
  }, [onInputChange]);

  useEffect(() => {
    if (savedOnInputChange.current) {
      savedOnInputChange.current(inputValue);
    }
  }, [inputValue]);

  const handleSelectionClear = () => {
    if (textInput?.current) {
      textInput.current.focus();
    }
  };

  const handleOnStateChange = (newState, { setHighlightedIndex }) => {
    if (Object.prototype.hasOwnProperty.call(newState, 'inputValue')) {
      const { inputValue } = newState;
      const filteredItems = filterItems(items, itemToString, inputValue);
      setHighlightedIndex(
        findHighlightedIndex(
          {
            ...props,
            items: filteredItems,
          },
          inputValue
        )
      );
    }
  };

  const handleToggleClick = (isOpen) => (event) => {
    if (onToggleClick) {
      onToggleClick(event);
    }

    if (event.target === textInput.current && isOpen) {
      event.preventDownshiftDefault = true;
      event.persist();
    }
  };

  const enabled = useFeatureFlag('enable-v11-release');

  const showWarning = !invalid && warn;
  const className = cx(
    `${prefix}--combo-box`,
    [enabled ? null : containerClassName],
    {
      [`${prefix}--list-box--up`]: direction === 'top',
      [`${prefix}--combo-box--warning`]: showWarning,
      [`${prefix}--combo-box--readonly`]: readOnly,
    }
  );
  const titleClasses = cx(`${prefix}--label`, {
    [`${prefix}--label--disabled`]: disabled,
  });
  const comboBoxHelperId = !helperText
    ? undefined
    : `combobox-helper-text-${comboBoxInstanceId}`;
  const helperClasses = cx(`${prefix}--form__helper-text`, {
    [`${prefix}--form__helper-text--disabled`]: disabled,
  });
  const wrapperClasses = cx(`${prefix}--list-box__wrapper`, [
    enabled ? containerClassName : null,
    {
      [`${prefix}--list-box__wrapper--fluid--invalid`]: isFluid && invalid,
      [`${prefix}--list-box__wrapper--fluid--focus`]: isFluid && isFocused,
    },
  ]);

  const inputClasses = cx(`${prefix}--text-input`, {
    [`${prefix}--text-input--empty`]: !inputValue,
    [`${prefix}--combo-box--input--focus`]: isFocused && !isFluid,
  });

  // needs to be Capitalized for react to render it correctly
  const ItemToElement = itemToElement;
  return (
    <Downshift
      {...downshiftProps}
      onChange={handleOnChange}
      onInputValueChange={handleOnInputValueChange}
      onStateChange={(...args) => {
        handleOnStateChange(...args);
        downshiftProps?.onStateChange?.(...args);
      }}
      inputValue={inputValue || ''}
      itemToString={itemToString}
      initialSelectedItem={initialSelectedItem}
      inputId={id}
      selectedItem={selectedItem}>
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        getRootProps,
        getToggleButtonProps,
        isOpen,
        inputValue,
        selectedItem,
        highlightedIndex,
        clearSelection,
        toggleMenu,
      }) => {
        const rootProps = getRootProps(
          // @ts-ignore this is not supposed to be a required property
          {},
          {
            suppressRefError: true,
          }
        );
        const labelProps = getLabelProps();
        const buttonProps = getToggleButtonProps({
          disabled: disabled || readOnly,
          onClick: handleToggleClick(isOpen),
          // When we moved the "root node" of Downshift to the <input> for
          // ARIA 1.2 compliance, we unfortunately hit this branch for the
          // "mouseup" event that downshift listens to:
          // https://github.com/downshift-js/downshift/blob/v5.2.1/src/downshift.js#L1051-L1065
          //
          // As a result, it will reset the state of the component and so we
          // stop the event from propagating to prevent this if the menu is already open.
          // This allows the toggleMenu behavior for the toggleButton to correctly open and
          // close the menu.
          onMouseUp(event) {
            if (isOpen) {
              event.stopPropagation();
            }
          },
        });
        const inputProps: any = getInputProps({
          // Remove excess aria `aria-labelledby`. HTML <label for> provides this aria information.
          'aria-labelledby': null,
          disabled,
          placeholder,
          onClick() {
            toggleMenu();
          },
          onKeyDown: (event) => {
            if (match(event, keys.Space)) {
              event.stopPropagation();
            }

            if (match(event, keys.Enter) && !inputValue) {
              toggleMenu();
            }
          },
        });

        const handleFocus = (evt) => {
          setIsFocused(evt.type === 'focus');
        };

        const readOnlyEventHandlers = readOnly
          ? {
              onKeyDown: (evt) => {
                // This prevents the select from opening for the above keys
                if (evt.key !== 'Tab') {
                  evt.preventDefault();
                }
              },
            }
          : {};

        return (
          <div className={wrapperClasses}>
            {titleText && (
              <Text as="label" className={titleClasses} {...labelProps}>
                {titleText}
              </Text>
            )}
            <ListBox
              onFocus={handleFocus}
              onBlur={handleFocus}
              className={className}
              disabled={disabled}
              invalid={invalid}
              invalidText={invalidText}
              isOpen={isOpen}
              light={light}
              size={size}
              warn={warn}
              warnText={warnText}>
              <div className={`${prefix}--list-box__field`}>
                <input
                  role="combobox"
                  disabled={disabled}
                  className={inputClasses}
                  type="text"
                  tabIndex="0"
                  aria-autocomplete="list"
                  aria-expanded={rootProps['aria-expanded']}
                  aria-haspopup="listbox"
                  aria-controls={inputProps['aria-controls']}
                  title={textInput?.current?.value}
                  {...inputProps}
                  {...rest}
                  {...readOnlyEventHandlers}
                  readOnly={readOnly}
                  ref={mergeRefs(textInput, ref)}
                />
                {invalid && (
                  <WarningFilled
                    className={`${prefix}--list-box__invalid-icon`}
                  />
                )}
                {showWarning && (
                  <WarningAltFilled
                    className={`${prefix}--list-box__invalid-icon ${prefix}--list-box__invalid-icon--warning`}
                  />
                )}
                {inputValue && (
                  <ListBoxSelection
                    clearSelection={clearSelection}
                    translateWithId={translateWithId}
                    disabled={disabled || readOnly}
                    onClearSelection={handleSelectionClear}
                    selectionCount={0}
                  />
                )}
                <ListBoxTrigger
                  {...buttonProps}
                  isOpen={isOpen}
                  translateWithId={translateWithId}
                />
              </div>
              <ListBox.Menu {...getMenuProps({ 'aria-label': ariaLabel })}>
                {isOpen
                  ? filterItems(items, itemToString, inputValue).map(
                      (item, index) => {
                        const itemProps = getItemProps({
                          item,
                          index,
                          ['aria-current']:
                            selectedItem === item ? 'true' : 'false',
                          ['aria-selected']:
                            highlightedIndex === index ? 'true' : 'false',
                          disabled: item.disabled,
                        });
                        return (
                          <ListBox.MenuItem
                            key={itemProps.id}
                            isActive={selectedItem === item}
                            isHighlighted={
                              highlightedIndex === index ||
                              ((selectedItem as any)?.id &&
                                (selectedItem as any)?.id === item.id) ||
                              false
                            }
                            title={
                              itemToElement
                                ? item.text
                                : itemToString
                                ? itemToString(item)
                                : undefined
                            }
                            {...itemProps}>
                            {itemToElement ? (
                              // @ts-ignore
                              <ItemToElement key={itemProps.id} {...item} />
                            ) : itemToString ? (
                              itemToString(item)
                            ) : (
                              defaultItemToString(item)
                            )}
                            {selectedItem === item && (
                              <Checkmark
                                className={`${prefix}--list-box__menu-item__selected-icon`}
                              />
                            )}
                          </ListBox.MenuItem>
                        );
                      }
                    )
                  : null}
              </ListBox.Menu>
            </ListBox>
            {helperText && !invalid && !warn && !isFluid && (
              <Text as="div" id={comboBoxHelperId} className={helperClasses}>
                {helperText}
              </Text>
            )}
          </div>
        );
      }}
    </Downshift>
  );
});

ComboBox.displayName = 'ComboBox';
ComboBox.propTypes = {
  /**
   * 'aria-label' of the ListBox component.
   */
  ariaLabel: PropTypes.string,

  /**
   * An optional className to add to the container node
   */
  className: PropTypes.string,

  /**
   * Specify the direction of the combobox dropdown. Can be either top or bottom.
   */
  direction: PropTypes.oneOf(['top', 'bottom']),

  /**
   * Specify if the control should be disabled, or not
   */
  disabled: PropTypes.bool,

  /**
   * Additional props passed to Downshift
   */
  // @ts-ignore
  downshiftProps: PropTypes.shape(Downshift.propTypes),
  /**
   * Provide helper text that is used alongside the control label for
   * additional help
   */
  helperText: PropTypes.string,

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
    PropTypes.number,
  ]),

  /**
   * Specify if the currently selected value is invalid.
   */
  invalid: PropTypes.bool,

  /**
   * Message which is displayed if the value is invalid.
   */
  invalidText: PropTypes.node,

  /**
   * Optional function to render items as custom components instead of strings.
   * Defaults to null and is overridden by a getter
   */
  itemToElement: PropTypes.func,

  /**
   * Helper function passed to downshift that allows the library to render a
   * given item to a string label. By default, it extracts the `label` field
   * from a given item to serve as the item label in the list
   */
  itemToString: PropTypes.func,

  /**
   * We try to stay as generic as possible here to allow individuals to pass
   * in a collection of whatever kind of data structure they prefer
   */
  items: PropTypes.array.isRequired,

  /**
   * should use "light theme" (white background)?
   */
  light: deprecate(
    PropTypes.bool,
    'The `light` prop for `Combobox` has ' +
      'been deprecated in favor of the new `Layer` component. It will be removed in the next major release.'
  ),

  /**
   * `onChange` is a utility for this controlled component to communicate to a
   * consuming component when a specific dropdown item is selected.
   * `({ selectedItem }) => void`
   * @param {{ selectedItem }}
   */
  onChange: PropTypes.func.isRequired,

  /**
   * Callback function to notify consumer when the text input changes.
   * This provides support to change available items based on the text.
   * `(inputText) => void`
   * @param {string} inputText
   */
  onInputChange: PropTypes.func,

  /**
   * Helper function passed to Downshift that allows the user to observe internal
   * state changes
   * `(changes, stateAndHelpers) => void`
   */
  onStateChange: PropTypes.func,

  /**
   * Callback function that fires when the combobox menu toggle is clicked
   * `(evt) => void`
   * @param {MouseEvent} event
   */
  onToggleClick: PropTypes.func,

  /**
   * Used to provide a placeholder text node before a user enters any input.
   * This is only present if the control has no items selected
   */
  placeholder: PropTypes.string,

  /**
   * Is the ComboBox readonly?
   */
  readOnly: PropTypes.bool,

  /**
   * For full control of the selection
   */
  selectedItem: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number,
  ]),

  /**
   * Specify your own filtering logic by passing in a `shouldFilterItem`
   * function that takes in the current input and an item and passes back
   * whether or not the item should be filtered.
   */
  shouldFilterItem: PropTypes.func,

  /**
   * Specify the size of the ListBox. Currently supports either `sm`, `md` or `lg` as an option.
   */
  size: ListBoxPropTypes.ListBoxSize,

  /**
   * Provide text to be used in a `<label>` element that is tied to the
   * combobox via ARIA attributes.
   */
  titleText: PropTypes.node,

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
   * Specify whether the control is currently in warning state
   */
  warn: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText: PropTypes.node,
};

ComboBox.defaultProps = {
  disabled: false,
  itemToString: defaultItemToString,
  itemToElement: null,
  shouldFilterItem: defaultShouldFilterItem,
  type: 'default',
  ariaLabel: 'Choose an item',
  direction: 'bottom',
};

export default ComboBox;
