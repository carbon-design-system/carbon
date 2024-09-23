/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import { useCombobox, UseComboboxProps, UseComboboxActions } from 'downshift';
import PropTypes from 'prop-types';
import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useMemo,
  forwardRef,
  type ReactNode,
  type ComponentType,
  type ForwardedRef,
  type ReactElement,
  type RefAttributes,
  type PropsWithChildren,
  type PropsWithRef,
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
import { useId } from '../../internal/useId';
import mergeRefs from '../../tools/mergeRefs';
import deprecate from '../../prop-types/deprecate';
import { usePrefix } from '../../internal/usePrefix';
import { FormContext } from '../FluidForm';
import { useFloating, flip, autoUpdate } from '@floating-ui/react';
import { hide } from '@floating-ui/dom';
import { TranslateWithId } from '../../types/common';
import { useFeatureFlag } from '../FeatureFlags';

const {
  InputBlur,
  InputKeyDownEnter,
  FunctionToggleMenu,
  ToggleButtonClick,
  ItemMouseMove,
  InputKeyDownArrowUp,
  InputKeyDownArrowDown,
  MenuMouseLeave,
  FunctionSelectItem,
} = useCombobox.stateChangeTypes;

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
    if (!items[i]['disabled'] && item.indexOf(searchValue) !== -1) {
      return i;
    }
  }

  return -1;
};

type ExcludedAttributes = 'id' | 'onChange' | 'onClick' | 'type' | 'size';

interface OnChangeData<ItemType> {
  selectedItem: ItemType | null | undefined;
  inputValue?: string | null;
}

/**
 * Message ids that will be passed to translateWithId().
 * Combination of message ids from ListBox/next/ListBoxSelection.js and
 * ListBox/next/ListBoxTrigger.js, but we can't access those values directly
 * because those components aren't Typescript.  (If you try, TranslationKey
 * ends up just being defined as "string".)
 */
type TranslationKey =
  | 'close.menu'
  | 'open.menu'
  | 'clear.all'
  | 'clear.selection';

type ItemToStringHandler<ItemType> = (item: ItemType | null) => string;
export interface ComboBoxProps<ItemType>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, ExcludedAttributes>,
    TranslateWithId<TranslationKey> {
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
   * **Experimental**: Will attempt to automatically align the floating
   * element to avoid collisions with the viewport and being clipped by
   * ancestor elements.
   */
  autoAlign?: boolean;

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
   * Additional props passed to Downshift.
   *
   * **Use with caution:** anything you define here overrides the components'
   * internal handling of that prop. Downshift APIs and internals are subject to
   * change, and in some cases they can not be shimmed by Carbon to shield you
   * from potentially breaking changes.
   *
   */
  downshiftProps?: Partial<UseComboboxProps<ItemType>>;

  /**
   * Provide a ref that will be mutated to contain an object of downshift
   * action functions. These can be called to change the internal state of the
   * downshift useCombobox hook.
   *
   * **Use with caution:** calling these actions modifies the internal state of
   * downshift. It may conflict with or override the state management used within
   * Combobox. Downshift APIs and internals are subject to change, and in some
   * cases they can not be shimmed by Carbon to shield you from potentially breaking
   * changes.
   */
  downshiftActions?: React.MutableRefObject<
    UseComboboxActions<ItemType> | undefined
  >;

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
  slug?: ReactNode;

  /**
   * Provide text to be used in a `<label>` element that is tied to the
   * combobox via ARIA attributes.
   */
  titleText?: ReactNode;

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
      autoAlign = false,
      className: containerClassName,
      direction = 'bottom',
      disabled = false,
      downshiftActions,
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
      selectedItem: selectedItemProp,
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

    const enableFloatingStyles =
      useFeatureFlag('enable-v12-dynamic-floating-styles') || autoAlign;

    const { refs, floatingStyles, middlewareData } = useFloating(
      enableFloatingStyles
        ? {
            placement: direction,
            strategy: 'fixed',
            middleware: autoAlign ? [flip(), hide()] : undefined,
            whileElementsMounted: autoUpdate,
          }
        : {}
    );
    const parentWidth = (refs?.reference?.current as HTMLElement)?.clientWidth;

    useEffect(() => {
      if (enableFloatingStyles) {
        const updatedFloatingStyles = {
          ...floatingStyles,
          visibility: middlewareData.hide?.referenceHidden
            ? 'hidden'
            : 'visible',
        };
        Object.keys(updatedFloatingStyles).forEach((style) => {
          if (refs.floating.current) {
            refs.floating.current.style[style] = updatedFloatingStyles[style];
          }
        });
        if (parentWidth && refs.floating.current) {
          refs.floating.current.style.width = parentWidth + 'px';
        }
      }
    }, [enableFloatingStyles, floatingStyles, refs.floating, parentWidth]);
    const prefix = usePrefix();
    const { isFluid } = useContext(FormContext);
    const textInput = useRef<HTMLInputElement>(null);
    const comboBoxInstanceId = useId();
    const [inputValue, setInputValue] = useState(
      getInputValue({
        initialSelectedItem,
        inputValue: '',
        itemToString,
        selectedItem: selectedItemProp,
      })
    );
    const [isFocused, setIsFocused] = useState(false);
    const [prevSelectedItem, setPrevSelectedItem] = useState<ItemType | null>();
    const [doneInitialSelectedItem, setDoneInitialSelectedItem] =
      useState(false);
    const savedOnInputChange = useRef(onInputChange);

    if (!doneInitialSelectedItem || prevSelectedItem !== selectedItemProp) {
      setDoneInitialSelectedItem(true);
      setPrevSelectedItem(selectedItemProp);
      setInputValue(
        getInputValue({
          initialSelectedItem,
          inputValue,
          itemToString,
          selectedItem: selectedItemProp,
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

    const filteredItems = (inputValue) =>
      filterItems(items, itemToString, inputValue || null);

    const indexToHighlight = (inputValue) =>
      findHighlightedIndex(
        {
          ...props,
          items: filteredItems(inputValue),
        },
        inputValue
      );

    const stateReducer = React.useCallback(
      (state, actionAndChanges) => {
        const { type, changes } = actionAndChanges;
        const { highlightedIndex } = changes;

        switch (type) {
          case InputBlur: {
            if (allowCustomValue && highlightedIndex == '-1') {
              const customValue = inputValue as ItemType;
              changes.selectedItem = customValue;
              if (onChange) {
                onChange({ selectedItem: inputValue as ItemType, inputValue });
              }
              return changes;
            }
            if (
              state.inputValue &&
              highlightedIndex == '-1' &&
              changes.selectedItem
            ) {
              return {
                ...changes,
                inputValue: itemToString(changes.selectedItem),
              };
            }
            if (
              state.inputValue &&
              highlightedIndex == '-1' &&
              !allowCustomValue &&
              !changes.selectedItem
            ) {
              return { ...changes, inputValue: '' };
            }
            return changes;
          }

          case FunctionSelectItem:
            if (onChange) {
              onChange({
                selectedItem: changes.selectedItem,
                inputValue: changes.inputValue,
              });
            }
            return changes;

          case InputKeyDownEnter:
            if (allowCustomValue) {
              setInputValue(inputValue);
              setHighlightedIndex(changes.selectedItem);
              if (onChange) {
                onChange({ selectedItem: changes.selectedItem, inputValue });
              }
              return changes;
            } else if (changes.selectedItem && !allowCustomValue) {
              return changes;
            } else {
              return { ...changes, isOpen: true };
            }
          case FunctionToggleMenu:
          case ToggleButtonClick:
            if (changes.isOpen && !changes.selectedItem) {
              return { ...changes };
            }
            return changes;

          case MenuMouseLeave:
            return { ...changes, highlightedIndex: state.highlightedIndex };

          case InputKeyDownArrowUp:
          case InputKeyDownArrowDown:
            if (highlightedIndex === -1) {
              return {
                ...changes,
                highlightedIndex: 0,
              };
            }
            return changes;

          case ItemMouseMove:
            return { ...changes, highlightedIndex: state.highlightedIndex };

          default:
            return changes;
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [allowCustomValue, inputValue, onChange]
    );

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
      [`${prefix}--combo-box--invalid--focused`]: invalid && isFocused,
      [`${prefix}--list-box--up`]: direction === 'top',
      [`${prefix}--combo-box--warning`]: showWarning,
      [`${prefix}--combo-box--readonly`]: readOnly,
      [`${prefix}--autoalign`]: enableFloatingStyles,
    });

    const titleClasses = cx(`${prefix}--label`, {
      [`${prefix}--label--disabled`]: disabled,
    });
    const helperTextId = `combobox-helper-text-${comboBoxInstanceId}`;
    const warnTextId = `combobox-warn-text-${comboBoxInstanceId}`;
    const invalidTextId = `combobox-invalid-text-${comboBoxInstanceId}`;
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
      [`${prefix}--text-input--empty`]: !inputValue,
      [`${prefix}--combo-box--input--focus`]: isFocused,
    });

    // needs to be Capitalized for react to render it correctly
    const ItemToElement = itemToElement;

    // Slug is always size `mini`
    let normalizedSlug;
    if (slug && slug['type']?.displayName === 'AILabel') {
      normalizedSlug = React.cloneElement(slug as React.ReactElement<any>, {
        size: 'mini',
      });
    }

    const {
      // Prop getters
      getInputProps,
      getItemProps,
      getLabelProps,
      getMenuProps,
      getToggleButtonProps,

      // State
      isOpen,
      highlightedIndex,
      selectedItem,

      // Actions
      closeMenu,
      openMenu,
      reset,
      selectItem,
      setHighlightedIndex,
      setInputValue: downshiftSetInputValue,
      toggleMenu,
    } = useCombobox({
      items: filterItems(items, itemToString, inputValue),
      inputValue: inputValue,
      itemToString: (item) => {
        return itemToString(item);
      },
      onInputValueChange({ inputValue }) {
        setInputValue(inputValue || '');
        setHighlightedIndex(indexToHighlight(inputValue));
      },
      onSelectedItemChange({ selectedItem }) {
        onChange({ selectedItem });
      },
      onHighlightedIndexChange: ({ highlightedIndex }) => {
        if (highlightedIndex! > -1 && typeof window !== undefined) {
          const itemArray = document.querySelectorAll(
            `li.${prefix}--list-box__menu-item[role="option"]`
          );
          const highlightedItem = itemArray[highlightedIndex!];
          if (highlightedItem) {
            highlightedItem.scrollIntoView({
              behavior: 'smooth',
              block: 'nearest',
            });
          }
        }
      },
      initialSelectedItem: initialSelectedItem,
      inputId: id,
      stateReducer,
      isItemDisabled(item, _index) {
        return (item as any).disabled;
      },
      ...downshiftProps,
    });

    useEffect(() => {
      // Used to expose the downshift actions to consumers for use with downshiftProps
      // An odd pattern, here we mutate the value stored in the ref provided from the consumer.
      // A riff of https://gist.github.com/gaearon/1a018a023347fe1c2476073330cc5509
      if (downshiftActions) {
        downshiftActions.current = {
          closeMenu,
          openMenu,
          reset,
          selectItem,
          setHighlightedIndex,
          setInputValue: downshiftSetInputValue,
          toggleMenu,
        };
      }
    }, [
      closeMenu,
      openMenu,
      reset,
      selectItem,
      setHighlightedIndex,
      downshiftSetInputValue,
      toggleMenu,
    ]);

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

    // The input should be described by the appropriate message text id
    // when both the message is supplied *and* when the component is in
    // the matching state (invalid, warn, etc).
    const ariaDescribedBy =
      (invalid && invalidText && invalidTextId) ||
      (warn && warnText && warnTextId) ||
      (helperText && !isFluid && helperTextId) ||
      undefined;

    // Memoize the value of getMenuProps to avoid an infinite loop
    const menuProps = useMemo(
      () =>
        getMenuProps({
          'aria-label': deprecatedAriaLabel || ariaLabel,
          ref: enableFloatingStyles ? refs.setFloating : null,
        }),
      [
        enableFloatingStyles,
        deprecatedAriaLabel,
        ariaLabel,
        getMenuProps,
        refs.setFloating,
      ]
    );

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
          invalidTextId={invalidTextId}
          isOpen={isOpen}
          light={light}
          size={size}
          warn={warn}
          ref={enableFloatingStyles ? refs.setReference : null}
          warnText={warnText}
          warnTextId={warnTextId}>
          <div className={`${prefix}--list-box__field`}>
            <input
              disabled={disabled}
              className={inputClasses}
              type="text"
              tabIndex={0}
              aria-haspopup="listbox"
              title={textInput?.current?.value}
              {...getInputProps({
                'aria-controls': isOpen ? undefined : menuProps.id,
                placeholder,
                ref: mergeRefs(textInput, ref),
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
                  if (
                    match(event, keys.Enter) &&
                    (!inputValue || allowCustomValue)
                  ) {
                    toggleMenu();

                    if (highlightedIndex !== -1) {
                      selectItem(
                        filterItems(items, itemToString, inputValue)[
                          highlightedIndex
                        ]
                      );
                    }

                    // Since `onChange` does not normally fire when the menu is closed, we should
                    // manually fire it when `allowCustomValue` is provided, the menu is closing,
                    // and there is a value.
                    if (allowCustomValue && isOpen && inputValue) {
                      onChange({ selectedItem, inputValue });
                    }

                    event.preventDownshiftDefault = true;
                    event?.persist?.();
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

                  if (event.altKey && event.key == 'ArrowDown') {
                    event.preventDownshiftDefault = true;
                    if (!isOpen) {
                      toggleMenu();
                    }
                  }
                  if (event.altKey && event.key == 'ArrowUp') {
                    event.preventDownshiftDefault = true;
                    if (isOpen) {
                      toggleMenu();
                    }
                  }
                },
              })}
              {...rest}
              {...readOnlyEventHandlers}
              readOnly={readOnly}
              aria-describedby={ariaDescribedBy}
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
                  selectItem(null);
                }}
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
          {normalizedSlug}
          <ListBox.Menu {...menuProps}>
            {isOpen
              ? filterItems(items, itemToString, inputValue).map(
                  (item, index) => {
                    const isObject = item !== null && typeof item === 'object';
                    const title =
                      isObject && 'text' in item && itemToElement
                        ? item.text?.toString()
                        : itemToString(item);
                    const itemProps = getItemProps({
                      item,
                      index,
                    });

                    // The initial implementation using <Downshift> would place the disabled attribute
                    // on disabled menu items. Conversely, useCombobox places aria-disabled instead.
                    // To avoid any potential breaking changes, we avoid placing aria-disabled and
                    // instead match the old behavior of placing the disabled attribute.
                    const disabled = itemProps['aria-disabled'];
                    const {
                      'aria-disabled': unusedAriaDisabled, // eslint-disable-line @typescript-eslint/no-unused-vars
                      ...modifiedItemProps
                    } = itemProps;

                    return (
                      <ListBox.MenuItem
                        key={itemProps.id}
                        isActive={selectedItem === item}
                        isHighlighted={highlightedIndex === index}
                        title={title}
                        disabled={disabled}
                        {...modifiedItemProps}>
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
          <Text as="div" id={helperTextId} className={helperClasses}>
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
   * **Experimental**: Will attempt to automatically align the floating
   * element to avoid collisions with the viewport and being clipped by
   * ancestor elements.
   */
  autoAlign: PropTypes.bool,

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
   * Additional props passed to Downshift.
   *
   * **Use with caution:** anything you define here overrides the components'
   * internal handling of that prop. Downshift APIs and internals are subject to
   * change, and in some cases they can not be shimmed by Carbon to shield you
   * from potentially breaking changes.
   */
  downshiftProps: PropTypes.object as React.Validator<
    UseComboboxProps<unknown>
  >,

  /**
   * Provide a ref that will be mutated to contain an object of downshift
   * action functions. These can be called to change the internal state of the
   * downshift useCombobox hook.
   *
   * **Use with caution:** calling these actions modifies the internal state of
   * downshift. It may conflict with or override the state management used within
   * Combobox. Downshift APIs and internals are subject to change, and in some
   * cases they can not be shimmed by Carbon to shield you from potentially breaking
   * changes.
   */
  downshiftActions: PropTypes.exact({ current: PropTypes.any }),

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

type ComboboxComponentProps<ItemType> = PropsWithRef<
  PropsWithChildren<ComboBoxProps<ItemType>> & RefAttributes<HTMLInputElement>
>;

interface ComboBoxComponent {
  <ItemType>(props: ComboboxComponentProps<ItemType>): ReactElement | null;
}

export default ComboBox as ComboBoxComponent;
