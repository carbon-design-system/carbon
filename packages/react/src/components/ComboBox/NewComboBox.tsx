/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import Downshift, {
  // ControllerStateAndHelpers,
  UseComboboxStateChange,
  useCombobox,
} from 'downshift';
import PropTypes, { ReactNodeLike } from 'prop-types';
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
  ListBoxSize,
} from '../ListBox';
import { ListBoxTrigger, ListBoxSelection } from '../ListBox/next';
import { match, keys } from '../../internal/keyboard';
import setupGetInstanceId from '../../tools/setupGetInstanceId';
import mergeRefs from '../../tools/mergeRefs';
import deprecate from '../../prop-types/deprecate';
import { usePrefix } from '../../internal/usePrefix';
import { FormContext } from '../FluidForm';

const defaultItemToString = <ItemType,>(item?: ItemType | null): string => {
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
  selectedItem: ItemType | null | undefined;
  inputValue?: string | null;
}

type ItemToStringHandler<ItemType> = (item: ItemType | null) => string;

export interface ComboBoxProps<ItemType>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, ExcludedAttributes> {
  /**
   * Specify whether or not the ComboBox should allow a value that is
   * not in the list to be entered in the input
   */
  allowCustomValue?: boolean;

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
   * **Experimental**: Provide a `Slug` component to be rendered inside the `ComboBox` component
   */
  slug?: ReactNodeLike;

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
      direction = 'bottom',
      disabled = false,
      downshiftProps,
      helperText,
      id,
      initialSelectedItem,
      invalid,
      invalidText,
      items,
      itemToElement = null,
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
      warn,
      warnText,
      allowCustomValue = false,
      slug,
      ...rest
    } = props;
    const prefix = usePrefix();
    const { isFluid } = useContext(FormContext);
    const [isFocused, setIsFocused] = useState(false);

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
      : `combobox-helper-text-${getInstanceId()}`;
    const helperClasses = cx(`${prefix}--form__helper-text`, {
      [`${prefix}--form__helper-text--disabled`]: disabled,
    });
    const wrapperClasses = cx(`${prefix}--list-box__wrapper`, [
      containerClassName,
      {
        [`${prefix}--list-box__wrapper--fluid--invalid`]: isFluid && invalid,
        [`${prefix}--list-box__wrapper--fluid--focus`]: isFluid && isFocused,
        [`${prefix}--list-box__wrapper--slug`]: slug,
      },
    ]);

    const inputClasses = cx(`${prefix}--text-input`, {
      // [`${prefix}--text-input--empty`]: !inputValue,
      [`${prefix}--combo-box--input--focus`]: isFocused && !isFluid,
    });

    const handleFocus = (evt: FocusEvent<HTMLDivElement>) => {
      setIsFocused(evt.type === 'focus');
    };

    const textInput = useRef<HTMLInputElement>(null);

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

    // needs to be Capitalized for react to render it correctly
    const ItemToElement = itemToElement;

    // Slug is always size `mini`
    let normalizedSlug;
    if (slug && slug['type']?.displayName === 'Slug') {
      normalizedSlug = React.cloneElement(slug as React.ReactElement<any>, {
        size: 'mini',
      });
    }

    const {
      getInputProps,
      getItemProps,
      getLabelProps,
      getMenuProps,
      getToggleButtonProps,
      isOpen,
      inputValue,
      highlightedIndex,
      // selectedItem,
      // clearSelection,
      // toggleMenu,
      // setHighlightedIndex,
    } = useCombobox({
      // onInputValueChange: ({ inputValue }) => {
      //   handleOnInputValueChange(inputValue);
      // },
      items,
      itemToString: (item) => {
        return itemToString(item);
      },
      // onStateChange: (...args) => {
      //   handleOnStateChange(...args);
      //   downshiftProps?.onStateChange?.(...args); // TODO this is kind of a breaking change, we previously passed both the `changes` and the `stateAndHelpers`. We might be able to provide both if we refactor to use `stateReducer` instead of `onStateChange`
      // },
    });

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
          <Text as="label" className={titleClasses} {...getLabelProps()}>
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
              className={inputClasses}
              type="text"
              tabIndex={0}
              aria-haspopup="listbox"
              {...getInputProps({
                disabled,
                placeholder,
                ref: ref,
              })}
              {...rest}
              {...readOnlyEventHandlers}
              readOnly={readOnly}
              aria-describedby={
                helperText && !invalid && !warn && !isFluid
                  ? comboBoxHelperId
                  : undefined
              }
            />
            {invalid && (
              <WarningFilled className={`${prefix}--list-box__invalid-icon`} />
            )}
            {showWarning && (
              <WarningAltFilled
                className={`${prefix}--list-box__invalid-icon ${prefix}--list-box__invalid-icon--warning`}
              />
            )}
            {inputValue && (
              <ListBoxSelection
                clearSelection={() => {
                  console.log(TODO);
                }}
                translateWithId={translateWithId}
                disabled={disabled || readOnly}
                onClearSelection={handleSelectionClear}
                selectionCount={0}
              />
            )}
            <ListBoxTrigger
              {...getToggleButtonProps({
                disabled: disabled || readOnly,
                onClick(event) {
                  if (onToggleClick) {
                    onToggleClick(event);
                  }
                },
              })}
              isOpen={isOpen}
              translateWithId={translateWithId}
            />
          </div>
          {normalizedSlug}
          <ListBox.Menu
            {...getMenuProps({
              'aria-label': deprecatedAriaLabel || ariaLabel,
            })}>
            {isOpen
              ? filterItems(items, itemToString, inputValue).map(
                  (item, index) => {
                    const isObject = item !== null && typeof item === 'object';
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
                        {...getItemProps}>
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
  }
);

ComboBox.displayName = 'ComboBox';
ComboBox.propTypes = {
  /**
   * Specify whether or not the ComboBox should allow a value that is
   * not in the list to be entered in the input
   */
  allowCustomValue: PropTypes.bool,

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
   * **Experimental**: Provide a `Slug` component to be rendered inside the `ComboBox` component
   */
  slug: PropTypes.node,

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
   * Specify whether the control is currently in warning state
   */
  warn: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText: PropTypes.node,
};

type ComboboxComponentProps<ItemType> = PropsWithoutRef<
  PropsWithChildren<ComboBoxProps<ItemType>> & RefAttributes<HTMLInputElement>
>;

interface ComboBoxComponent {
  <ItemType>(props: ComboboxComponentProps<ItemType>): ReactElement | null;
}

export default ComboBox as ComboBoxComponent;
