/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import { useCombobox, UseComboboxProps, UseComboboxActions } from 'downshift';
import PropTypes from 'prop-types';
import React, {
  cloneElement,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type FocusEvent,
  type ForwardedRef,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type PropsWithChildren,
  type PropsWithRef,
  type ReactElement,
  type ReactNode,
  type RefAttributes,
} from 'react';
import { Text } from '../Text';
import {
  Checkmark,
  WarningAltFilled,
  WarningFilled,
} from '@carbon/icons-react';
import isEqual from 'react-fast-compare';
import ListBox, {
  ListBoxSizePropType,
  type ListBoxMenuIconTranslationKey,
  type ListBoxSelectionTranslationKey,
  type ListBoxSize,
} from '../ListBox';
import { ListBoxTrigger, ListBoxSelection } from '../ListBox/next';
import { match, keys } from '../../internal/keyboard';
import { useId } from '../../internal/useId';
import { mergeRefs } from '../../tools/mergeRefs';
import { deprecate } from '../../prop-types/deprecate';
import { usePrefix } from '../../internal/usePrefix';
import { FormContext } from '../FluidForm';
import { autoUpdate, flip, hide, useFloating } from '@floating-ui/react';
import type { TranslateWithId } from '../../types/common';
import { useFeatureFlag } from '../FeatureFlags';
import { AILabel } from '../AILabel';
import { defaultItemToString, isComponentElement } from '../../internal';

const {
  InputBlur,
  InputKeyDownEnter,
  FunctionToggleMenu,
  ToggleButtonClick,
  ItemMouseMove,
  InputKeyDownArrowUp,
  InputKeyDownArrowDown,
  MenuMouseLeave,
  ItemClick,
  FunctionSelectItem,
} = useCombobox.stateChangeTypes;

const defaultShouldFilterItem = () => true;

const autocompleteCustomFilter = ({
  item,
  inputValue,
}: {
  item: string;
  inputValue: string | null;
}): boolean => {
  if (inputValue === null || inputValue === '') {
    return true; // Show all items if there's no input
  }

  const lowercaseItem = item.toLowerCase();
  const lowercaseInput = inputValue.toLowerCase();

  return lowercaseItem.startsWith(lowercaseInput);
};

const getInputValue = <ItemType,>({
  initialSelectedItem,
  itemToString,
  selectedItem,
  prevSelectedItem,
}: {
  initialSelectedItem?: ItemType | null;
  itemToString: ItemToStringHandler<ItemType>;
  selectedItem?: ItemType | null;
  prevSelectedItem?: ItemType | null;
}) => {
  // If there's a current selection (even if it's an object or string), use it.
  if (selectedItem !== null && typeof selectedItem !== 'undefined') {
    return itemToString(selectedItem);
  }

  // On the very first render (when no previous value exists), use
  // `initialSelectedItem`.
  if (
    typeof prevSelectedItem === 'undefined' &&
    initialSelectedItem !== null &&
    typeof initialSelectedItem !== 'undefined'
  ) {
    return itemToString(initialSelectedItem);
  }

  // Otherwise (i.e., after the user has cleared the selection), return an empty
  // string.
  return '';
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

export interface OnChangeData<ItemType> {
  selectedItem: ItemType | null | undefined;
  inputValue?: string | null;
}

export type ItemToStringHandler<ItemType> = (item: ItemType | null) => string;

export interface ComboBoxProps<ItemType>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, ExcludedAttributes>,
    TranslateWithId<
      ListBoxMenuIconTranslationKey | ListBoxSelectionTranslationKey
    > {
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
   * ancestor elements. Requires React v17+
   * @see https://github.com/carbon-design-system/carbon/issues/18714
   */
  autoAlign?: boolean;

  /**
   * An optional className to add to the container node
   */
  className?: string;

  /**
   * **Experimental**: Provide a `decorator` component to be rendered inside the `ComboBox` component
   */
  decorator?: ReactNode;

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
   * Whether or not the component is read-only
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
   * this prop will be ignored if `typeahead` prop is enabled
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
   * @deprecated please use decorator instead.
   * **Experimental**: Provide a `Slug` component to be rendered inside the `ComboBox` component
   */
  slug?: ReactNode;

  /**
   * Provide text to be used in a `<label>` element that is tied to the
   * combobox via ARIA attributes.
   */
  titleText?: ReactNode;

  /**
   * **Experimental**: will enable autocomplete and typeahead for the input field
   */
  typeahead?: boolean;

  /**
   * Specify whether the control is currently in warning state
   */
  warn?: boolean;

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText?: ReactNode;

  /**
   * Specify native input attributes to place on the `<input>`, like maxLength.
   * These are passed to downshift's getInputProps() and will override the
   * internal input props.
   * https://github.com/downshift-js/downshift?tab=readme-ov-file#getinputprops
   */
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}

const ComboBox = forwardRef(
  <ItemType,>(
    props: ComboBoxProps<ItemType>,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const prevInputLengthRef = useRef(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const {
      ['aria-label']: ariaLabel = 'Choose an item',
      ariaLabel: deprecatedAriaLabel,
      autoAlign = false,
      className: containerClassName,
      decorator,
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
      typeahead = false,
      warn,
      warnText,
      allowCustomValue = false,
      slug,
      inputProps,
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
      // eslint-disable-next-line  react-hooks/exhaustive-deps -- https://github.com/carbon-design-system/carbon/issues/20452
    }, [enableFloatingStyles, floatingStyles, refs.floating, parentWidth]);

    const [inputValue, setInputValue] = useState(
      getInputValue({
        initialSelectedItem,
        itemToString,
        selectedItem: selectedItemProp,
      })
    );

    const [typeaheadText, setTypeaheadText] = useState('');

    useEffect(() => {
      if (typeahead) {
        if (inputValue.length >= prevInputLengthRef.current) {
          if (inputValue) {
            const filteredItems = items.filter((item) =>
              autocompleteCustomFilter({
                item: itemToString(item),
                inputValue: inputValue,
              })
            );
            if (filteredItems.length > 0) {
              const suggestion = itemToString(filteredItems[0]);
              setTypeaheadText(suggestion.slice(inputValue.length));
            } else {
              setTypeaheadText('');
            }
          } else {
            setTypeaheadText('');
          }
        } else {
          setTypeaheadText('');
        }
        prevInputLengthRef.current = inputValue.length;
      }
      // eslint-disable-next-line  react-hooks/exhaustive-deps -- https://github.com/carbon-design-system/carbon/issues/20452
    }, [typeahead, inputValue, items, itemToString, autocompleteCustomFilter]);
    const isManualClearingRef = useRef(false);
    const [isClearing, setIsClearing] = useState(false);
    const prefix = usePrefix();
    const { isFluid } = useContext(FormContext);
    const textInput = useRef<HTMLInputElement>(null);
    const comboBoxInstanceId = useId();
    const [isFocused, setIsFocused] = useState(false);
    const prevInputValue = useRef(inputValue);
    const prevSelectedItemProp = useRef<ItemType | null | undefined>(
      selectedItemProp
    );
    useEffect(() => {
      isManualClearingRef.current = isClearing;

      // Reset flag after render cycle
      if (isClearing) {
        setIsClearing(false);
      }
    }, [isClearing]);

    // fully controlled combobox: handle changes to selectedItemProp
    useEffect(() => {
      if (prevSelectedItemProp.current !== selectedItemProp) {
        const currentInputValue = getInputValue({
          initialSelectedItem,
          itemToString,
          selectedItem: selectedItemProp,
          prevSelectedItem: prevSelectedItemProp.current,
        });
        // selectedItem has been updated externally, need to update state and call onChange
        if (inputValue !== currentInputValue) {
          setInputValue(currentInputValue);
          onChange({
            selectedItem: selectedItemProp,
            inputValue: currentInputValue,
          });
        }
        prevSelectedItemProp.current = selectedItemProp;
      }
      // eslint-disable-next-line  react-hooks/exhaustive-deps -- https://github.com/carbon-design-system/carbon/issues/20452
    }, [selectedItemProp]);

    const filterItems = (
      items: ItemType[],
      itemToString: ItemToStringHandler<ItemType>,
      inputValue: string | null
    ) =>
      items.filter((item) =>
        typeahead
          ? autocompleteCustomFilter({ item: itemToString(item), inputValue })
          : shouldFilterItem
            ? shouldFilterItem({
                item,
                itemToString,
                inputValue,
              })
            : defaultShouldFilterItem()
      );

    // call onInputChange whenever inputValue is updated
    useEffect(() => {
      if (prevInputValue.current !== inputValue) {
        prevInputValue.current = inputValue;
        // eslint-disable-next-line  @typescript-eslint/no-unused-expressions -- https://github.com/carbon-design-system/carbon/issues/20452
        onInputChange && onInputChange(inputValue);
      }
      // eslint-disable-next-line  react-hooks/exhaustive-deps -- https://github.com/carbon-design-system/carbon/issues/20452
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

    const stateReducer = useCallback(
      (state, actionAndChanges) => {
        const { type, changes } = actionAndChanges;
        const { highlightedIndex } = changes;

        switch (type) {
          case InputBlur: {
            // If custom values are allowed, treat whatever the user typed as
            // the value.
            if (allowCustomValue && highlightedIndex === -1) {
              const inputValue = state.inputValue ?? '';
              const currentSelectedItem =
                typeof changes.selectedItem === 'undefined'
                  ? state.selectedItem
                  : changes.selectedItem;
              const isMatchingSelection =
                currentSelectedItem !== null &&
                typeof currentSelectedItem !== 'undefined' &&
                itemToString(currentSelectedItem) === inputValue &&
                items.some((item) => isEqual(item, currentSelectedItem));

              if (isMatchingSelection) {
                return changes;
              }
              const nextSelectedItem =
                items.find((item) => itemToString(item) === inputValue) ??
                inputValue;

              if (!isEqual(currentSelectedItem, nextSelectedItem) && onChange) {
                onChange({ selectedItem: nextSelectedItem, inputValue });
              }

              return {
                ...changes,
                selectedItem: nextSelectedItem,
              };
            }

            // If a new item was selected, keep its label in the input.
            if (
              state.inputValue &&
              highlightedIndex === -1 &&
              changes.selectedItem
            ) {
              return {
                ...changes,
                inputValue: itemToString(changes.selectedItem),
              };
            }

            // If custom values are not allowed, normalize any non-matching
            // text. If the input isn’t an exact item label, restore the
            // selected label if there is one, or clear it.
            if (!allowCustomValue) {
              const currentInput = state.inputValue ?? '';
              const hasExactMatch =
                !!currentInput &&
                items.some((item) => itemToString(item) === currentInput);

              if (!hasExactMatch) {
                const restoredInput =
                  state.selectedItem !== null
                    ? itemToString(state.selectedItem)
                    : '';

                return { ...changes, inputValue: restoredInput };
              }
            }

            return changes;
          }

          case InputKeyDownEnter:
            if (!allowCustomValue) {
              if (state.highlightedIndex !== -1) {
                const filteredList = filterItems(
                  items,
                  itemToString,
                  inputValue
                );
                const highlightedItem = filteredList[state.highlightedIndex];

                // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
                if (highlightedItem && !(highlightedItem as any).disabled) {
                  return {
                    ...changes,
                    selectedItem: highlightedItem,
                    inputValue: itemToString(highlightedItem),
                  };
                }
              } else {
                const autoIndex = indexToHighlight(inputValue);
                if (autoIndex !== -1) {
                  const matchingItem = items[autoIndex];

                  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
                  if (matchingItem && !(matchingItem as any).disabled) {
                    return {
                      ...changes,
                      selectedItem: matchingItem,
                      inputValue: itemToString(matchingItem),
                    };
                  }
                }

                // If no matching item is found and there is an existing
                // selection, clear the selection.
                if (state.selectedItem !== null) {
                  return {
                    ...changes,
                    selectedItem: null,
                    inputValue,
                  };
                }
              }
            }

            // For `allowCustomValue` or if no matching item is found, keep the
            // menu open.
            return { ...changes, isOpen: true };
          case FunctionToggleMenu:
          case ToggleButtonClick:
            // When closing the menu, apply the same normalization as blur.
            if (state.isOpen && !changes.isOpen && !allowCustomValue) {
              const currentInput = state.inputValue ?? '';
              const hasExactMatch =
                !!currentInput &&
                items.some((item) => itemToString(item) === currentInput);

              if (!hasExactMatch) {
                const restoredInput =
                  state.selectedItem !== null
                    ? itemToString(state.selectedItem)
                    : '';

                return { ...changes, inputValue: restoredInput };
              }
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
      [allowCustomValue, inputValue, itemToString, items, onChange]
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
        if (readOnly) {
          // Prevent the list from opening if readOnly is true
          event.preventDownshiftDefault = true;
          event?.persist?.();
          return;
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
        [`${prefix}--list-box__wrapper--slug`]: slug,
        [`${prefix}--list-box__wrapper--decorator`]: decorator,
      },
    ]);

    const inputClasses = cx(`${prefix}--text-input`, {
      [`${prefix}--text-input--empty`]: !inputValue,
      [`${prefix}--combo-box--input--focus`]: isFocused,
    });

    // needs to be Capitalized for react to render it correctly
    const ItemToElement = itemToElement;

    // AILabel always size `mini`
    const candidate = slug ?? decorator;
    const candidateIsAILabel = isComponentElement(candidate, AILabel);
    const normalizedDecorator = candidateIsAILabel
      ? cloneElement(candidate, { size: 'mini' })
      : candidate;

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
        const normalizedInput = inputValue || '';
        setInputValue(normalizedInput);
        setHighlightedIndex(indexToHighlight(normalizedInput));
      },
      onHighlightedIndexChange: ({ highlightedIndex }) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion , valid-typeof , no-constant-binary-expression -- https://github.com/carbon-design-system/carbon/issues/20452
        if (highlightedIndex! > -1 && typeof window !== undefined) {
          const itemArray = document.querySelectorAll(
            `li.${prefix}--list-box__menu-item[role="option"]`
          );
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20452
      isItemDisabled(item, _index) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
        return (item as any)?.disabled;
      },
      ...downshiftProps,
      onStateChange: ({ type, selectedItem: newSelectedItem }) => {
        downshiftProps?.onStateChange?.({
          type,
          selectedItem: newSelectedItem,
        });
        if (isManualClearingRef.current) {
          return;
        }
        if (
          (type === ItemClick ||
            type === FunctionSelectItem ||
            type === InputKeyDownEnter) &&
          typeof newSelectedItem !== 'undefined' &&
          !isEqual(selectedItemProp, newSelectedItem)
        ) {
          onChange({ selectedItem: newSelectedItem });
        }
      },
    });

    // Keep the dropdown highlight in sync with either the controlled value or
    // Downshift's own selection when uncontrolled.
    const menuSelectedItem =
      typeof selectedItemProp !== 'undefined' ? selectedItemProp : selectedItem;

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
      // eslint-disable-next-line  react-hooks/exhaustive-deps -- https://github.com/carbon-design-system/carbon/issues/20452
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
      if (!inputRef.current?.value && evt.type === 'blur') {
        selectItem(null);
      }
    };

    const readOnlyEventHandlers = readOnly
      ? {
          onKeyDown: (evt: KeyboardEvent<HTMLInputElement>) => {
            // This prevents the select from opening for the above keys
            if (evt.key !== 'Tab') {
              evt.preventDefault();
            }
          },
          onClick: (evt: MouseEvent<HTMLInputElement>) => {
            // Prevent the default behavior which would open the list
            evt.preventDefault();
            // Focus on the element as per readonly input behavior
            evt.currentTarget.focus();
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
          ref: enableFloatingStyles ? refs.setFloating : null,
        }),
      // eslint-disable-next-line  react-hooks/exhaustive-deps -- https://github.com/carbon-design-system/carbon/issues/20452
      [
        enableFloatingStyles,
        deprecatedAriaLabel,
        ariaLabel,
        getMenuProps,
        refs.setFloating,
      ]
    );

    useEffect(() => {
      if (textInput.current) {
        if (inputRef.current && typeaheadText) {
          const selectionStart = inputValue.length;
          const selectionEnd = selectionStart + typeaheadText.length;

          inputRef.current.value = inputValue + typeaheadText;
          inputRef.current.setSelectionRange(selectionStart, selectionEnd);
        }
      }
    }, [inputValue, typeaheadText]);
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
                'aria-label': titleText
                  ? undefined
                  : deprecatedAriaLabel || ariaLabel,
                'aria-controls': menuProps.id,
                placeholder,
                value: inputValue,
                ...inputProps,
                onChange: (e) => {
                  const newValue = e.target.value;
                  setInputValue(newValue);
                  downshiftSetInputValue(newValue);
                },
                ref: mergeRefs(textInput, ref, inputRef),
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
                    if (
                      allowCustomValue &&
                      isOpen &&
                      inputValue &&
                      highlightedIndex === -1
                    ) {
                      onChange({ selectedItem: null, inputValue });
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
                  if (
                    !inputValue &&
                    highlightedIndex == -1 &&
                    event.key == 'Enter'
                  ) {
                    if (!isOpen) toggleMenu();
                    selectItem(null);
                    event.preventDownshiftDefault = true;
                    if (event.currentTarget.ariaExpanded === 'false')
                      openMenu();
                  }
                  if (typeahead && event.key === 'Tab') {
                    //  event.preventDefault();
                    const matchingItem = items.find((item) =>
                      itemToString(item)
                        .toLowerCase()
                        .startsWith(inputValue.toLowerCase())
                    );
                    if (matchingItem) {
                      const newValue = itemToString(matchingItem);
                      downshiftSetInputValue(newValue);
                      selectItem(matchingItem);
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
                  setIsClearing(true); // This updates the state which syncs to the ref
                  setInputValue('');
                  onChange({ selectedItem: null });
                  selectItem(null);
                  handleSelectionClear();
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
          {slug ? (
            normalizedDecorator
          ) : decorator ? (
            <div className={`${prefix}--list-box__inner-wrapper--decorator`}>
              {/* wrap only when NOT an AILabel */}
              {candidateIsAILabel ? (
                normalizedDecorator
              ) : (
                <span>{normalizedDecorator}</span>
              )}
            </div>
          ) : (
            ''
          )}
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
                        isActive={isEqual(menuSelectedItem, item)}
                        isHighlighted={highlightedIndex === index}
                        title={title}
                        disabled={disabled}
                        {...modifiedItemProps}>
                        {ItemToElement ? (
                          <ItemToElement key={itemProps.id} {...item} />
                        ) : (
                          itemToString(item)
                        )}
                        {isEqual(menuSelectedItem, item) && (
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
   * ancestor elements. Requires React v17+
   * @see https://github.com/carbon-design-system/carbon/issues/18714
   */
  autoAlign: PropTypes.bool,

  /**
   * An optional className to add to the container node
   */
  className: PropTypes.string,

  /**
   * **Experimental**: Provide a decorator component to be rendered inside the `ComboBox` component
   */
  decorator: PropTypes.node,

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
  downshiftProps: PropTypes.object as PropTypes.Validator<
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
   * this prop will be ignored if `typeahead` prop is enabled
   */
  shouldFilterItem: PropTypes.func,

  /**
   * Specify the size of the ListBox. Currently supports either `sm`, `md` or `lg` as an option.
   */
  size: ListBoxSizePropType,

  slug: deprecate(
    PropTypes.node,
    'The `slug` prop has been deprecated and will be removed in the next major version. Use the decorator prop instead.'
  ),

  /**
   * Provide text to be used in a `<label>` element that is tied to the
   * combobox via ARIA attributes.
   */
  titleText: PropTypes.node,

  /**
   * Translates component strings using your i18n tool.
   */
  translateWithId: PropTypes.func,

  /**
   * **Experimental**: will enable autocomplete and typeahead for the input field
   */
  typeahead: PropTypes.bool,

  /**
   * Specify whether the control is currently in warning state
   */
  warn: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText: PropTypes.node,

  /**
   * Specify native input attributes to place on the `<input>`, like maxLength.
   * These are passed to downshift's getInputProps() and will override the
   * internal input props.
   * https://github.com/downshift-js/downshift?tab=readme-ov-file#getinputprops
   */
  inputProps: PropTypes.object,
};

type ComboboxComponentProps<ItemType> = PropsWithRef<
  PropsWithChildren<ComboBoxProps<ItemType>> & RefAttributes<HTMLInputElement>
>;

export interface ComboBoxComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  <ItemType>(props: ComboboxComponentProps<ItemType>): ReactElement<any> | null;
}

export default ComboBox as ComboBoxComponent;
