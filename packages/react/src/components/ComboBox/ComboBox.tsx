/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import Downshift, {
  ControllerStateAndHelpers,
  StateChangeOptions,
} from 'downshift';
import PropTypes from 'prop-types';
import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  forwardRef,
  type ComponentProps,
  type ReactNode,
  type ComponentType,
  type ForwardedRef,
  type ReactElement,
  type RefAttributes,
  type PropsWithChildren,
  type PropsWithoutRef,
  type InputHTMLAttributes,
  type MouseEvent,
  type KeyboardEvent,
  type FocusEvent,
} from 'react';
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
import deprecate from '../../prop-types/deprecate';
import { usePrefix } from '../../internal/usePrefix';
import { FormContext } from '../FluidForm';

const {
  keyDownArrowDown,
  keyDownArrowUp,
  keyDownEscape,
  clickButton,
  blurButton,
  changeInput,
} = Downshift.stateChangeTypes;

const defaultItemToString = <ItemType,>(item: ItemType | null) => {
  if (typeof item === 'string') {
    return item;
  }
  if (typeof item === 'number') {
    return `${item}`;
  }
  if (
    item !== null &&
    typeof item === 'object' &&
    'label' in item &&
    typeof item['label'] === 'string'
  ) {
    return item['label'];
  }
  return '';
};

const defaultShouldFilterItem = () => true;

const getInputValue = <ItemType,>({
  initialSelectedItem,
  inputValue,
  itemToString,
  selectedItem,
}: {
  initialSelectedItem?: ItemType | null;
  inputValue: string;
  itemToString: ItemToStringHandler<ItemType>;
  selectedItem?: ItemType | null;
}) => {
  if (selectedItem) {
    return itemToString(selectedItem);
  }

  if (initialSelectedItem) {
    return itemToString(initialSelectedItem);
  }

  return inputValue || '';
};

const findHighlightedIndex = <ItemType,>(
  {
    items,
    itemToString = defaultItemToString,
  }: { items: ItemType[]; itemToString?: ItemToStringHandler<ItemType> },
  inputValue?: string | null
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

interface OnChangeData<ItemType> {
  selectedItem: ItemType | null;
}

type ItemToStringHandler<ItemType> = (item: ItemType | null) => string;

export interface ComboBoxProps<ItemType>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, ExcludedAttributes> {
  /**
   * Specify a label to be read by screen readers on the container node
   * 'aria-label' of the ListBox component.
   */
  ['aria-label']?: string;

  /**
   * @deprecated please use `aria-label` instead.
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
  downshiftProps?: ComponentProps<typeof Downshift<ItemType>>;

  /**
   * Provide helper text that is used alongside the control label for
   * additional help
   */
  helperText?: ReactNode;

  /**
   * Specify a custom `id` for the input
   */
  id: string;

  /**
   * Allow users to pass in an arbitrary item or a string (in case their items are an array of strings)
   * from their collection that are pre-selected
   */
  initialSelectedItem?: ItemType;

  /**
   * Specify if the currently selected value is invalid.
   */
  invalid?: boolean;

  /**
   * Message which is displayed if the value is invalid.
   */
  invalidText?: ReactNode;

  /**
   * Optional function to render items as custom components instead of strings.
   * Defaults to null and is overridden by a getter
   */
  itemToElement?: ComponentType<ItemType> | null;

  /**
   * Helper function passed to downshift that allows the library to render a
   * given item to a string label. By default, it extracts the `label` field
   * from a given item to serve as the item label in the list
   */
  itemToString?: ItemToStringHandler<ItemType>;

  /**
   * We try to stay as generic as possible here to allow individuals to pass
   * in a collection of whatever kind of data structure they prefer
   */
  items: ItemType[];

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
  onChange: (data: OnChangeData<ItemType>) => void;

  /**
   * Callback function to notify consumer when the text input changes.
   * This provides support to change available items based on the text.
   * `(inputText) => void`
   * @param {string} inputText
   */
  onInputChange?: (inputText: string) => void;

  /**
   * Callback function that fires when the combobox menu toggle is clicked
   * `(evt) => void`
   * @param {MouseEvent} event
   */
  onToggleClick?: (evt: MouseEvent<HTMLButtonElement>) => void;

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
  selectedItem?: ItemType | null;

  /**
   * Specify your own filtering logic by passing in a `shouldFilterItem`
   * function that takes in the current input and an item and passes back
   * whether or not the item should be filtered.
   */
  shouldFilterItem?: (input: {
    item: ItemType;
    itemToString?: ItemToStringHandler<ItemType>;
    inputValue: string | null;
  }) => boolean;

  /**
   * Specify the size of the ListBox. Currently supports either `sm`, `md` or `lg` as an option.
   */
  size?: ListBoxSize;

  /**
   * Provide text to be used in a `<label>` element that is tied to the
   * combobox via ARIA attributes.
   */
  titleText?: ReactNode;

  /**
   * Specify a custom translation function that takes in a message identifier
   * and returns the localized string for the message
   */
  translateWithId?: (id: string) => string;

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
  warnText?: ReactNode;
}

const ComboBox = forwardRef(
  <ItemType,>(
    props: ComboBoxProps<ItemType>,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const {
      ['aria-label']: ariaLabel = 'Choose an item',
      ariaLabel: deprecatedAriaLabel,
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
      itemToString = defaultItemToString,
      light,
      onChange,
      onInputChange,
      onToggleClick,
      placeholder,
      readOnly,
      selectedItem,
      shouldFilterItem = defaultShouldFilterItem,
      size,
      titleText,
      translateWithId,
      type: _type,
      warn,
      warnText,
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
    const [prevSelectedItem, setPrevSelectedItem] = useState<ItemType | null>();
    const [doneInitialSelectedItem, setDoneInitialSelectedItem] =
      useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState<number | null>();
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

    const filterItems = (
      items: ItemType[],
      itemToString: ItemToStringHandler<ItemType>,
      inputValue: string | null
    ) =>
      items.filter((item) =>
        shouldFilterItem
          ? shouldFilterItem({
              item,
              itemToString,
              inputValue,
            })
          : defaultShouldFilterItem()
      );

    const handleOnChange = (selectedItem: ItemType | null) => {
      if (onChange) {
        onChange({ selectedItem });
      }
    };

    const handleOnInputValueChange = (inputValue?: string) => {
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

    const getHighlightedIndex = (changes: StateChangeOptions<ItemType>) => {
      if (Object.prototype.hasOwnProperty.call(changes, 'inputValue')) {
        const { inputValue } = changes;
        const filteredItems = filterItems(
          items,
          itemToString,
          inputValue || null
        );
        const indexToHighlight = findHighlightedIndex(
          {
            ...props,
            items: filteredItems,
          },
          inputValue
        );
        setHighlightedIndex(indexToHighlight);
        return indexToHighlight;
      }
      return highlightedIndex || 0;
    };

    const handleOnStateChange = (
      changes: StateChangeOptions<ItemType>,
      {
        setHighlightedIndex: updateHighlightedIndex,
      }: ControllerStateAndHelpers<ItemType>
    ) => {
      const { type } = changes;
      switch (type) {
        case keyDownArrowDown:
        case keyDownArrowUp:
          setHighlightedIndex(changes.highlightedIndex);
          break;
        case blurButton:
        case keyDownEscape:
          setHighlightedIndex(changes.highlightedIndex);
          break;
        case clickButton:
          setHighlightedIndex(changes.highlightedIndex);
          break;
        case changeInput:
          updateHighlightedIndex(getHighlightedIndex(changes));
          break;
      }
    };

    const handleToggleClick =
      (isOpen: boolean) =>
      (
        event: MouseEvent<HTMLButtonElement> & {
          preventDownshiftDefault: boolean;
        }
      ) => {
        if (onToggleClick) {
          onToggleClick(event);
        }

        if (event.target === textInput.current && isOpen) {
          event.preventDownshiftDefault = true;
          event?.persist?.();
        }
      };

    const showWarning = !invalid && warn;
    const className = cx(`${prefix}--combo-box`, {
      [`${prefix}--list-box--up`]: direction === 'top',
      [`${prefix}--combo-box--warning`]: showWarning,
      [`${prefix}--combo-box--readonly`]: readOnly,
    });

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
      containerClassName,
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
            disabled,
            placeholder,
            onClick(): void {
              toggleMenu();
            },
            onKeyDown: (
              event: KeyboardEvent<HTMLInputElement> & {
                preventDownshiftDefault: boolean;
                target: {
                  value: string;
                  setSelectionRange: (start: number, end: number) => void;
                };
              }
            ): void => {
              if (match(event, keys.Space)) {
                event.stopPropagation();
              }

              if (match(event, keys.Enter) && !inputValue) {
                toggleMenu();
              }

              if (match(event, keys.Escape) && inputValue) {
                if (event.target === textInput.current && isOpen) {
                  toggleMenu();
                  event.preventDownshiftDefault = true;
                  event?.persist?.();
                }
              }

              if (match(event, keys.Home) && event.code !== 'Numpad7') {
                event.target.setSelectionRange(0, 0);
              }

              if (match(event, keys.End) && event.code !== 'Numpad1') {
                event.target.setSelectionRange(
                  event.target.value.length,
                  event.target.value.length
                );
              }
            },
          });

          const handleFocus = (evt: FocusEvent<HTMLDivElement>) => {
            setIsFocused(evt.type === 'focus');
          };

          const readOnlyEventHandlers = readOnly
            ? {
                onKeyDown: (evt: KeyboardEvent<HTMLInputElement>) => {
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
                    tabIndex={0}
                    aria-autocomplete="list"
                    aria-expanded={rootProps['aria-expanded']}
                    aria-haspopup="listbox"
                    aria-controls={inputProps['aria-controls']}
                    aria-owns={getMenuProps().id}
                    title={textInput?.current?.value}
                    {...inputProps}
                    {...rest}
                    {...readOnlyEventHandlers}
                    readOnly={readOnly}
                    ref={mergeRefs(textInput, ref)}
                    aria-describedby={
                      helperText && !invalid && !warn && !isFluid
                        ? comboBoxHelperId
                        : undefined
                    }
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
                <ListBox.Menu
                  {...getMenuProps({
                    'aria-label': deprecatedAriaLabel || ariaLabel,
                  })}>
                  {isOpen
                    ? filterItems(items, itemToString, inputValue).map(
                        (item, index) => {
                          const isObject =
                            item !== null && typeof item === 'object';
                          const title =
                            isObject && 'text' in item && itemToElement
                              ? item.text?.toString()
                              : itemToString(item);
                          const disabled =
                            isObject && 'disabled' in item
                              ? !!item.disabled
                              : undefined;
                          const itemProps = getItemProps({
                            item,
                            index,
                            ['aria-current']:
                              selectedItem === item ? 'true' : 'false',
                            ['aria-selected']:
                              highlightedIndex === index ? 'true' : 'false',
                            disabled,
                          });
                          return (
                            <ListBox.MenuItem
                              key={itemProps.id}
                              isActive={selectedItem === item}
                              isHighlighted={highlightedIndex === index}
                              title={title}
                              {...itemProps}>
                              {ItemToElement ? (
                                <ItemToElement key={itemProps.id} {...item} />
                              ) : (
                                itemToString(item)
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
  }
);

ComboBox.displayName = 'ComboBox';
ComboBox.propTypes = {
  /**
   * 'aria-label' of the ListBox component.
   * Specify a label to be read by screen readers on the container node
   */
  ['aria-label']: PropTypes.string,

  /**
   * Deprecated, please use `aria-label` instead.
   * Specify a label to be read by screen readers on the container note.
   * 'aria-label' of the ListBox component.
   */
  ariaLabel: deprecate(
    PropTypes.string,
    'This prop syntax has been deprecated. Please use the new `aria-label`.'
  ),

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
  helperText: PropTypes.node,

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
  ['aria-label']: 'Choose an item',
  direction: 'bottom',
};

type ComboboxComponentProps<ItemType> = PropsWithoutRef<
  PropsWithChildren<ComboBoxProps<ItemType>> & RefAttributes<HTMLInputElement>
>;

interface ComboBoxComponent {
  <ItemType>(props: ComboboxComponentProps<ItemType>): ReactElement | null;
}

export default ComboBox as ComboBoxComponent;
