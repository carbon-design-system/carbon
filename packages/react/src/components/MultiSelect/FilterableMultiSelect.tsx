/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { WarningFilled, WarningAltFilled } from '@carbon/icons-react';
import cx from 'classnames';
import Downshift, {
  useCombobox,
  useMultipleSelection,
  type UseComboboxProps,
  type UseMultipleSelectionProps,
  UseComboboxInterface,
  UseComboboxStateChangeTypes,
  UseMultipleSelectionInterface,
} from 'downshift';
import isEqual from 'react-fast-compare';
import PropTypes from 'prop-types';
import React, {
  cloneElement,
  forwardRef,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type FocusEvent,
  type ForwardedRef,
  type FunctionComponent,
  type KeyboardEvent,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from 'react';
import { defaultFilterItems } from './filter';
import {
  type MultiSelectSortingProps,
  sortingPropTypes,
} from './MultiSelectPropTypes';
import ListBox, {
  ListBoxSizePropType,
  ListBoxTypePropType,
  type ListBoxSize,
  type ListBoxType,
} from '../ListBox';
import { ListBoxTrigger, ListBoxSelection } from '../ListBox/next';
import { match, keys } from '../../internal/keyboard';
import { defaultItemToString } from './tools/itemToString';
import mergeRefs from '../../tools/mergeRefs';
import deprecate from '../../prop-types/deprecate';
import { useId } from '../../internal/useId';
import { defaultSortItems, defaultCompareItems } from './tools/sorting';
import { usePrefix } from '../../internal/usePrefix';
import { FormContext } from '../FluidForm';
import { useSelection } from '../../internal/Selection';
import {
  useFloating,
  flip,
  hide,
  size as floatingSize,
  autoUpdate,
} from '@floating-ui/react';
import { TranslateWithId } from '../../types/common';
import { AILabel } from '../AILabel';
import { isComponentElement } from '../../internal';

const {
  InputBlur,
  InputKeyDownEnter,
  ItemClick,
  MenuMouseLeave,
  InputKeyDownArrowUp,
  InputKeyDownArrowDown,
  ItemMouseMove,
  InputClick,
  ToggleButtonClick,
  FunctionToggleMenu,
  InputChange,
  InputKeyDownEscape,
  FunctionSetHighlightedIndex,
} = useCombobox.stateChangeTypes as UseComboboxInterface['stateChangeTypes'] & {
  ToggleButtonClick: UseComboboxStateChangeTypes.ToggleButtonClick;
};

const {
  SelectedItemKeyDownBackspace,
  SelectedItemKeyDownDelete,
  DropdownKeyDownBackspace,
  FunctionRemoveSelectedItem,
} =
  useMultipleSelection.stateChangeTypes as UseMultipleSelectionInterface['stateChangeTypes'];

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

export interface FilterableMultiSelectProps<ItemType>
  extends MultiSelectSortingProps<ItemType>,
    React.RefAttributes<HTMLDivElement>,
    TranslateWithId<TranslationKey> {
  /**
   * Specify a label to be read by screen readers on the container node
   * @deprecated
   */
  'aria-label'?: string;
  /** @deprecated */
  ariaLabel?: string;

  /**
   * **Experimental**: Will attempt to automatically align the floating
   * element to avoid collisions with the viewport and being clipped by
   * ancestor elements.
   */
  autoAlign?: boolean;

  className?: string;

  /**
   * Specify the text that should be read for screen readers that describes total items selected
   */
  clearSelectionDescription?: string;

  /**
   * Specify the text that should be read for screen readers to clear selection.
   */
  clearSelectionText?: string;

  /**
   * **Experimental**: Provide a `decorator` component to be rendered inside the `FilterableMultiSelect` component
   */
  decorator?: ReactNode;

  /**
   * Specify the direction of the multiselect dropdown.
   */
  direction?: 'top' | 'bottom';

  /**
   * Disable the control
   */
  disabled?: boolean;

  /**
   * Additional props passed to Downshift.
   *
   * **Use with caution:** anything you define here overrides the components'
   * internal handling of that prop. Downshift APIs and internals are subject to
   * change, and in some cases they can not be shimmed by Carbon to shield you
   * from potentially breaking changes.
   */
  downshiftProps?: UseMultipleSelectionProps<ItemType>;

  /**
   * Default sorter is assigned if not provided.
   */
  filterItems?(
    items: readonly ItemType[],
    extra: {
      inputValue: string | null;
      itemToString: NonNullable<UseComboboxProps<ItemType>['itemToString']>;
    }
  ): ItemType[];

  /**
   * Specify whether the title text should be hidden or not
   */
  hideLabel?: boolean;

  /**
   * Provide helper text that is used alongside
   * the control label for additional help
   */
  helperText?: ReactNode;

  /**
   * Specify a custom `id`
   */
  id: string;

  /**
   * Allow users to pass in arbitrary items from their collection that are
   * pre-selected
   */
  initialSelectedItems?: ItemType[];

  /**
   * Is the current selection invalid?
   */
  invalid?: boolean;

  /**
   * If invalid, what is the error?
   */
  invalidText?: ReactNode;

  /**
   * Function to render items as custom components instead of strings.
   * Defaults to null and is overridden by a getter
   */
  itemToElement?: FunctionComponent<ItemType>;

  /**
   * Helper function passed to downshift that allows the library to render
   * a given item to a string label.
   *
   * By default, it extracts the `label` field from a given item
   * to serve as the item label in the list.
   */
  itemToString?(item: ItemType | null): string;

  /**
   * We try to stay as generic as possible here to allow individuals to pass
   * in a collection of whatever kind of data structure they prefer
   */
  items: ItemType[];

  /**
   * @deprecated `true` to use the light version.
   */
  light?: boolean;

  /**
   * Specify the locale of the control.
   * Used for the default `compareItems`,
   * which is used for sorting the list of items in the control.
   */
  locale?: string;

  /**
   * `onChange` is a utility for this controlled component to communicate to a
   * consuming component what kind of internal state changes are occurring.
   */
  onChange?(changes: { selectedItems: ItemType[] }): void;

  /**
   * A utility for this controlled component
   * to communicate to the currently typed input.
   */
  onInputValueChange?: UseComboboxProps<ItemType>['onInputValueChange'];

  /**
   * `onMenuChange` is a utility for this controlled component to communicate to a
   * consuming component that the menu was opened(`true`)/closed(`false`).
   */
  onMenuChange?(open: boolean): void;

  /**
   * Initialize the component with an open(`true`)/closed(`false`) menu.
   */
  open?: boolean;

  /**
   * Generic `placeholder` that will be used as the textual representation of
   * what this field is for
   */
  placeholder?: string;

  /**
   * Whether or not the filterable multiselect is readonly
   */
  readOnly?: boolean;

  /**
   * Specify feedback (mode) of the selection.
   * `top`: selected item jumps to top
   * `fixed`: selected item stays at its position
   * `top-after-reopen`: selected item jump to top after reopen dropdown
   */
  selectionFeedback?: 'top' | 'fixed' | 'top-after-reopen';

  /**
   * For full control of the selected items
   */
  selectedItems?: ItemType[];

  /**
   * Specify the size of the ListBox.
   * Currently, supports either `sm`, `md` or `lg` as an option.
   */
  size?: ListBoxSize;

  /**
   * @deprecated please use decorator instead.
   * **Experimental**: Provide a `Slug` component to be rendered inside the `Checkbox` component
   */
  slug?: ReactNode;

  /**
   * Provide text to be used in a `<label>` element that is tied to the
   * combobox via ARIA attributes.
   */
  titleText?: ReactNode;

  type?: ListBoxType;

  /**
   * Specify title to show title on hover
   */
  useTitleInItem?: boolean;

  /**
   * Specify whether the control is currently in warning state
   */
  warn?: boolean;

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText?: ReactNode;
}

export const FilterableMultiSelect = forwardRef(function FilterableMultiSelect<
  ItemType,
>(
  {
    autoAlign = false,
    className: containerClassName,
    clearSelectionDescription = 'Total items selected: ',
    clearSelectionText = 'To clear selection, press Delete or Backspace',
    compareItems = defaultCompareItems,
    decorator,
    direction = 'bottom',
    disabled = false,
    downshiftProps,
    filterItems = defaultFilterItems,
    helperText,
    hideLabel,
    id,
    initialSelectedItems = [],
    invalid,
    invalidText,
    items,
    itemToElement: ItemToElement, // needs to be capitalized for react to render it correctly
    itemToString = defaultItemToString,
    light,
    locale = 'en',
    onInputValueChange,
    open = false,
    onChange,
    onMenuChange,
    placeholder,
    readOnly,
    titleText,
    type,
    selectionFeedback = 'top-after-reopen',
    selectedItems: selected,
    size,
    sortItems = defaultSortItems as FilterableMultiSelectProps<ItemType>['sortItems'],
    translateWithId,
    useTitleInItem,
    warn,
    warnText,
    slug,
  }: FilterableMultiSelectProps<ItemType>,
  ref: ForwardedRef<HTMLDivElement>
) {
  const { isFluid } = useContext(FormContext);
  const isFirstRender = useRef(true);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(!!open);
  const [prevOpen, setPrevOpen] = useState<boolean>(!!open);
  const [inputValue, setInputValue] = useState<string>('');
  const [topItems, setTopItems] = useState<ItemType[]>(
    initialSelectedItems ?? []
  );
  const [inputFocused, setInputFocused] = useState<boolean>(false);

  const {
    selectedItems: controlledSelectedItems,
    onItemChange,
    clearSelection,
  } = useSelection({
    disabled,
    initialSelectedItems,
    onChange,
    selectedItems: selected,
  });

  const { refs, floatingStyles, middlewareData } = useFloating(
    autoAlign
      ? {
          placement: direction,

          // The floating element is positioned relative to its nearest
          // containing block (usually the viewport). It will in many cases also
          // “break” the floating element out of a clipping ancestor.
          // https://floating-ui.com/docs/misc#clipping
          strategy: 'fixed',

          // Middleware order matters, arrow should be last
          middleware: [
            flip({ crossAxis: false }),
            floatingSize({
              apply({ rects, elements }) {
                Object.assign(elements.floating.style, {
                  width: `${rects.reference.width}px`,
                });
              },
            }),
            hide(),
          ],
          whileElementsMounted: autoUpdate,
        }
      : {}
  );

  useLayoutEffect(() => {
    if (autoAlign) {
      const updatedFloatingStyles = {
        ...floatingStyles,
        visibility: middlewareData.hide?.referenceHidden ? 'hidden' : 'visible',
      };
      Object.keys(updatedFloatingStyles).forEach((style) => {
        if (refs.floating.current) {
          refs.floating.current.style[style] = updatedFloatingStyles[style];
        }
      });
    }
  }, [autoAlign, floatingStyles, refs.floating, middlewareData, open]);

  const textInput = useRef<HTMLInputElement>(null);
  const filterableMultiSelectInstanceId = useId();

  const prefix = usePrefix();

  if (prevOpen !== open) {
    setIsOpen(open);
    setPrevOpen(open);
  }

  // memoize sorted items to reduce unnecessary expensive sort on rerender
  const sortedItems = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return sortItems!(filterItems(items, { itemToString, inputValue }), {
      selectedItems: {
        top: controlledSelectedItems,
        fixed: [],
        'top-after-reopen': topItems,
      }[selectionFeedback],
      itemToString,
      compareItems,
      locale,
    });
  }, [
    items,
    inputValue,
    controlledSelectedItems,
    topItems,
    selectionFeedback,
    itemToString,
    compareItems,
    locale,
  ]);

  const inline = type === 'inline';
  const showWarning = !invalid && warn;

  const wrapperClasses = cx(
    `${prefix}--multi-select__wrapper`,
    `${prefix}--multi-select--filterable__wrapper`,
    `${prefix}--list-box__wrapper`,
    containerClassName,
    {
      [`${prefix}--multi-select__wrapper--inline`]: inline,
      [`${prefix}--list-box__wrapper--inline`]: inline,
      [`${prefix}--multi-select__wrapper--inline--invalid`]: inline && invalid,
      [`${prefix}--list-box__wrapper--inline--invalid`]: inline && invalid,
      [`${prefix}--list-box--up`]: direction === 'top',
      [`${prefix}--list-box__wrapper--fluid--invalid`]: isFluid && invalid,
      [`${prefix}--list-box__wrapper--slug`]: slug,
      [`${prefix}--list-box__wrapper--decorator`]: decorator,
      [`${prefix}--autoalign`]: autoAlign,
    }
  );
  const helperId = !helperText
    ? undefined
    : `filterablemultiselect-helper-text-${filterableMultiSelectInstanceId}`;
  const labelId = `${id}-label`;
  const titleClasses = cx({
    [`${prefix}--label`]: true,
    [`${prefix}--label--disabled`]: disabled,
    [`${prefix}--visually-hidden`]: hideLabel,
  });
  const helperClasses = cx({
    [`${prefix}--form__helper-text`]: true,
    [`${prefix}--form__helper-text--disabled`]: disabled,
  });
  const inputClasses = cx({
    [`${prefix}--text-input`]: true,
    [`${prefix}--text-input--empty`]: !inputValue,
    [`${prefix}--text-input--light`]: light,
  });
  const helper = helperText ? (
    <div id={helperId} className={helperClasses}>
      {helperText}
    </div>
  ) : null;
  const menuId = `${id}__menu`;
  const inputId = `${id}-input`;

  useEffect(() => {
    if (!isOpen) {
      setTopItems(controlledSelectedItems);
    }
  }, [controlledSelectedItems, isOpen, setTopItems]);

  const validateHighlightFocus = () => {
    if (controlledSelectedItems.length > 0) {
      setHighlightedIndex(0);
    }
  };

  function handleMenuChange(forceIsOpen: boolean): void {
    if (!readOnly) {
      const nextIsOpen = forceIsOpen ?? !isOpen;
      setIsOpen(nextIsOpen);
      validateHighlightFocus();
    }
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;

      if (open) {
        onMenuChange?.(isOpen);
      }
    } else {
      onMenuChange?.(isOpen);
    }
  }, [isOpen, onMenuChange, open]);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      const target = event.target as HTMLElement;
      const wrapper = document
        .getElementById(id)
        ?.closest(`.${prefix}--multi-select__wrapper`);

      // If click is outside our component and menu is open or input is focused
      if (wrapper && !wrapper.contains(target)) {
        if (isOpen || inputFocused) {
          setIsOpen(false);
          setInputFocused(false);
          setInputValue('');
        }
      }
    };

    if (inputFocused || isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, inputFocused]);

  const {
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    setHighlightedIndex,
    getItemProps,
    openMenu,
    isOpen: isMenuOpen,
  } = useCombobox<ItemType>({
    isOpen,
    items: sortedItems,
    // defaultHighlightedIndex: 0, // after selection, highlight the first item.
    itemToString,
    id,
    labelId,
    menuId,
    inputId,
    inputValue,
    stateReducer,
    isItemDisabled(item, _index) {
      return (item as any)?.disabled;
    },
  });
  function stateReducer(state, actionAndChanges) {
    const { type, props, changes } = actionAndChanges;
    const { highlightedIndex } = changes;

    if (changes.isOpen && !isOpen) {
      setTopItems(controlledSelectedItems);
    }
    switch (type) {
      case InputKeyDownEnter:
        if (changes.selectedItem && changes.selectedItem.disabled !== true) {
          onItemChange(changes.selectedItem);
        }
        setHighlightedIndex(changes.selectedItem);

        return { ...changes, highlightedIndex: state.highlightedIndex };
      case ItemClick:
        if (changes.selectedItem) {
          onItemChange(changes.selectedItem);
        }
        setHighlightedIndex(changes.selectedItem);
        return changes;
      case InputBlur:
      case InputKeyDownEscape:
        setIsOpen(false);
        return changes;
      case FunctionToggleMenu:
      case ToggleButtonClick:
        validateHighlightFocus();
        if (changes.isOpen && !changes.selectedItem) {
          return { ...changes };
        }

        return { ...changes, highlightedIndex: null };
      case InputChange:
        if (onInputValueChange) {
          onInputValueChange(changes.inputValue);
        }
        setInputValue(changes.inputValue ?? '');
        setIsOpen(true);
        return { ...changes, highlightedIndex: 0 };

      case InputClick:
        validateHighlightFocus();
        if (changes.isOpen && !changes.selectedItem) {
          return { ...changes };
        }
        return {
          ...changes,
          isOpen: false,
          highlightedIndex: null,
        };
      case MenuMouseLeave:
        return { ...changes, highlightedIndex: state.highlightedIndex };
      case InputKeyDownArrowUp:
      case InputKeyDownArrowDown:
        if (InputKeyDownArrowDown === type && !isOpen) {
          setIsOpen(true);
          return {
            ...changes,
            highlightedIndex: 0,
          };
        }
        if (highlightedIndex > -1) {
          const itemArray = document.querySelectorAll(
            `li.${prefix}--list-box__menu-item[role="option"]`
          );
          props.scrollIntoView(itemArray[highlightedIndex]);
        }
        if (highlightedIndex === -1) {
          return {
            ...changes,
            highlightedIndex: 0,
          };
        }
        return changes;
      case ItemMouseMove:
        return { ...changes, highlightedIndex: state.highlightedIndex };
      case FunctionSetHighlightedIndex:
        if (!isOpen) {
          return {
            ...changes,
            highlightedIndex: 0,
          };
        } else {
          return {
            ...changes,
            highlightedIndex: props.items.indexOf(highlightedIndex),
          };
        }
      default:
        return changes;
    }
  }

  const { getDropdownProps } = useMultipleSelection<ItemType>({
    activeIndex: highlightedIndex,
    initialSelectedItems,
    selectedItems: controlledSelectedItems,
    onStateChange(changes) {
      switch (changes.type) {
        case SelectedItemKeyDownBackspace:
        case SelectedItemKeyDownDelete:
        case DropdownKeyDownBackspace:
        case FunctionRemoveSelectedItem: {
          clearSelection();
          break;
        }
      }
    },
    ...downshiftProps,
  });

  useEffect(() => {
    if (isOpen && !isMenuOpen) {
      openMenu();
    }
  });

  function clearInputValue(
    event?: KeyboardEvent<Element> | MouseEvent<HTMLButtonElement>
  ) {
    const value = textInput.current?.value;
    if (
      value?.length === 1 ||
      (event && 'key' in event && match(event, keys.Escape))
    ) {
      setInputValue('');
    } else {
      setInputValue(value ?? '');
    }

    if (textInput.current) {
      textInput.current.focus();
    }
  }

  // AILabel always size `mini`
  const candidate = slug ?? decorator;
  const candidateIsAILabel = isComponentElement(candidate, AILabel);
  const normalizedDecorator = candidateIsAILabel
    ? cloneElement(candidate, { size: 'mini' })
    : null;

  const className = cx(
    `${prefix}--multi-select`,
    `${prefix}--combo-box`,
    `${prefix}--multi-select--filterable`,
    {
      [`${prefix}--multi-select--invalid`]: invalid,
      [`${prefix}--multi-select--invalid--focused`]: invalid && inputFocused,
      [`${prefix}--multi-select--open`]: isOpen,
      [`${prefix}--multi-select--inline`]: inline,
      [`${prefix}--multi-select--selected`]:
        controlledSelectedItems?.length > 0,
      [`${prefix}--multi-select--filterable--input-focused`]: inputFocused,
      [`${prefix}--multi-select--readonly`]: readOnly,
    }
  );

  const labelProps = getLabelProps();

  const buttonProps = getToggleButtonProps({
    disabled,
    onClick: () => {
      handleMenuChange(!isOpen);
      textInput.current?.focus();
    },
    // When we moved the "root node" of Downshift to the <input> for
    // ARIA 1.2 compliance, we unfortunately hit this branch for the
    // "mouseup" event that downshift listens to:
    // https://github.com/downshift-js/downshift/blob/v5.2.1/src/downshift.js#L1051-L1065
    //
    // As a result, it will reset the state of the component and so we
    // stop the event from propagating to prevent this. This allows the
    // toggleMenu behavior for the toggleButton to correctly open and
    // close the menu.
    onMouseUp(event) {
      if (isOpen) {
        event.stopPropagation();
      }
    },
  });

  const inputProps = getInputProps(
    getDropdownProps({
      'aria-controls': isOpen ? menuId : undefined,
      'aria-describedby': helperText ? helperId : undefined,
      'aria-haspopup': 'listbox',
      // Remove excess aria `aria-labelledby`. HTML <label for>
      // provides this aria information.
      'aria-labelledby': undefined,
      disabled,
      placeholder,
      preventKeyAction: isOpen,

      onClick: () => handleMenuChange(true),
      onKeyDown(event: KeyboardEvent<HTMLElement>) {
        const $input = event.target as HTMLInputElement;
        const $value = $input.value;

        if (match(event, keys.Space)) {
          event.stopPropagation();
        }

        if (match(event, keys.Enter)) {
          handleMenuChange(true);
        }

        if (!disabled) {
          if (match(event, keys.Delete) || match(event, keys.Escape)) {
            if (isOpen) {
              handleMenuChange(true);
              clearInputValue(event);
              event.stopPropagation();
            } else if (!isOpen) {
              clearInputValue(event);
              clearSelection();
              event.stopPropagation();
            }
          }
        }

        if (match(event, keys.Tab)) {
          handleMenuChange(false);
        }

        if (match(event, keys.Home)) {
          $input.setSelectionRange(0, 0);
        }

        if (match(event, keys.End)) {
          $input.setSelectionRange($value.length, $value.length);
        }
      },
      onFocus: () => setInputFocused(true),
      onBlur: () => {
        !isOpen && setInputFocused(false);
        setInputValue('');
      },
    })
  );

  // Memoize the value of getMenuProps to avoid an infinite loop
  const menuProps = useMemo(
    () =>
      getMenuProps(
        {
          ref: autoAlign ? refs.setFloating : null,
        },
        { suppressRefError: true }
      ),
    [autoAlign, getMenuProps, refs.setFloating]
  );

  const handleFocus = (evt: FocusEvent<HTMLDivElement> | undefined) => {
    if (
      evt?.target.classList.contains(`${prefix}--tag__close-icon`) ||
      evt?.target.classList.contains(`${prefix}--list-box__selection`)
    ) {
      setIsFocused(false);
    } else {
      setIsFocused(evt?.type === 'focus' ? true : false);
    }
  };

  const mergedRef = mergeRefs(textInput, inputProps.ref);

  const readOnlyEventHandlers = readOnly
    ? {
        onClick: (evt: React.MouseEvent<HTMLInputElement>) => {
          // NOTE: does not prevent click
          evt.preventDefault();
          // focus on the element as per readonly input behavior
          if (mergedRef.current !== undefined) {
            mergedRef.current.focus();
          }
        },
        onKeyDown: (evt: React.KeyboardEvent<HTMLInputElement>) => {
          const selectAccessKeys = ['ArrowDown', 'ArrowUp', ' ', 'Enter'];
          // This prevents the select from opening for the above keys
          if (selectAccessKeys.includes(evt.key)) {
            evt.preventDefault();
          }
        },
      }
    : {};

  const clearSelectionContent =
    controlledSelectedItems.length > 0
      ? `${clearSelectionDescription} ${controlledSelectedItems.length}. ${clearSelectionText}.`
      : `${clearSelectionDescription} 0.`;

  return (
    <div className={wrapperClasses}>
      {titleText ? (
        <label className={titleClasses} {...labelProps}>
          {titleText}
          <span className={`${prefix}--visually-hidden`}>
            {clearSelectionContent}
          </span>
        </label>
      ) : null}
      <ListBox
        onFocus={isFluid ? handleFocus : undefined}
        onBlur={isFluid ? handleFocus : undefined}
        className={className}
        disabled={disabled}
        light={light}
        ref={ref}
        id={id}
        invalid={invalid}
        invalidText={invalidText}
        warn={warn}
        warnText={warnText}
        isOpen={!readOnly && isOpen}
        size={size}>
        <div
          className={`${prefix}--list-box__field`}
          ref={autoAlign ? refs.setReference : null}>
          {controlledSelectedItems.length > 0 && (
            <ListBoxSelection
              readOnly={readOnly}
              clearSelection={() => {
                clearSelection();
                if (textInput.current) {
                  textInput.current.focus();
                }
              }}
              selectionCount={controlledSelectedItems.length}
              translateWithId={translateWithId}
              disabled={disabled}
            />
          )}
          <input
            className={inputClasses}
            {...inputProps}
            ref={mergedRef}
            {...readOnlyEventHandlers}
            readOnly={readOnly}
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
              clearSelection={clearInputValue}
              disabled={disabled}
              translateWithId={translateWithId}
              readOnly={readOnly}
              onMouseUp={(event: MouseEvent) => {
                // If we do not stop this event from propagating,
                // it seems like Downshift takes our event and
                // prevents us from getting `onClick` /
                // `clearSelection` from the underlying <button> in
                // ListBoxSelection
                event.stopPropagation();
              }}
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
            {normalizedDecorator}
          </div>
        ) : (
          ''
        )}

        <ListBox.Menu {...menuProps}>
          {isOpen
            ? sortedItems.map((item, index) => {
                const isChecked =
                  controlledSelectedItems.filter((selected) =>
                    isEqual(selected, item)
                  ).length > 0;
                const itemProps = getItemProps({
                  item,
                  ['aria-selected']: isChecked,
                });
                const itemText = itemToString(item);

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
                    aria-label={itemText}
                    isActive={isChecked}
                    isHighlighted={highlightedIndex === index}
                    title={itemText}
                    disabled={disabled}
                    {...modifiedItemProps}>
                    <div className={`${prefix}--checkbox-wrapper`}>
                      <span
                        title={useTitleInItem ? itemText : undefined}
                        className={`${prefix}--checkbox-label`}
                        data-contained-checkbox-state={isChecked}
                        id={`${itemProps.id}-item`}>
                        {ItemToElement ? (
                          <ItemToElement key={itemProps.id} {...item} />
                        ) : (
                          itemText
                        )}
                      </span>
                    </div>
                  </ListBox.MenuItem>
                );
              })
            : null}
        </ListBox.Menu>
      </ListBox>
      {!inline && !invalid && !warn ? helper : null}
    </div>
  );
}) as {
  <ItemType>(props: FilterableMultiSelectProps<ItemType>): ReactElement<any>;
  propTypes?: any;
  contextTypes?: any;
  defaultProps?: any;
  displayName?: any;
};

FilterableMultiSelect.displayName = 'FilterableMultiSelect';
FilterableMultiSelect.propTypes = {
  /**
   * Deprecated, aria-label is no longer needed
   * Specify a label to be read by screen readers on the container node
   */
  ['aria-label']: deprecate(
    PropTypes.string,
    'ariaLabel / aria-label props are no longer required for FilterableMultiSelect'
  ),

  /**
   * Deprecated, please use `aria-label` instead.
   * Specify a label to be read by screen readers on the container note.
   */
  ariaLabel: deprecate(
    PropTypes.string,
    'ariaLabel / aria-label props are no longer required for FilterableMultiSelect'
  ),

  /**
   * **Experimental**: Will attempt to automatically align the floating
   * element to avoid collisions with the viewport and being clipped by
   * ancestor elements.
   */
  autoAlign: PropTypes.bool,

  /**
   * Specify the text that should be read for screen readers that describes total items selected
   */
  clearSelectionDescription: PropTypes.string,

  /**
   * Specify the text that should be read for screen readers to clear selection.
   */
  clearSelectionText: PropTypes.string,

  /**
   * **Experimental**: Provide a decorator component to be rendered inside the `FilterableMultiSelect` component
   */
  decorator: PropTypes.node,

  /**
   * Specify the direction of the multiselect dropdown. Can be either top or bottom.
   */
  direction: PropTypes.oneOf(['top', 'bottom']),

  /**
   * Disable the control
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
  // @ts-ignore
  downshiftProps: PropTypes.shape(Downshift.propTypes),

  /**
   * Specify whether the title text should be hidden or not
   */
  hideLabel: PropTypes.bool,

  /**
   * Specify a custom `id`
   */
  id: PropTypes.string.isRequired,

  /**
   * Allow users to pass in arbitrary items from their collection that are
   * pre-selected
   */
  initialSelectedItems: PropTypes.array,

  /**
   * Is the current selection invalid?
   */
  invalid: PropTypes.bool,

  /**
   * If invalid, what is the error?
   */
  invalidText: PropTypes.node,

  /**
   * Function to render items as custom components instead of strings.
   * Defaults to null and is overridden by a getter
   */
  itemToElement: PropTypes.func,

  /**
   * Helper function passed to downshift that allows the library to render a
   * given item to a string label. By default, it extracts the `label` field
   * from a given item to serve as the item label in the list.
   */
  itemToString: PropTypes.func,

  /**
   * We try to stay as generic as possible here to allow individuals to pass
   * in a collection of whatever kind of data structure they prefer
   */
  items: PropTypes.array.isRequired,

  /**
   * `true` to use the light version.
   */
  light: deprecate(
    PropTypes.bool,
    'The `light` prop for `FilterableMultiSelect` has ' +
      'been deprecated in favor of the new `Layer` component. It will be removed in the next major release.'
  ),

  /**
   * Specify the locale of the control. Used for the default `compareItems`
   * used for sorting the list of items in the control.
   */
  locale: PropTypes.string,

  /**
   * `onChange` is a utility for this controlled component to communicate to a
   * consuming component what kind of internal state changes are occurring.
   */
  onChange: PropTypes.func,

  /**
   * `onInputValueChange` is a utility for this controlled component to communicate to
   * the currently typed input.
   */
  onInputValueChange: PropTypes.func,

  /**
   * `onMenuChange` is a utility for this controlled component to communicate to a
   * consuming component that the menu was opened(`true`)/closed(`false`).
   */
  onMenuChange: PropTypes.func,

  /**
   * Initialize the component with an open(`true`)/closed(`false`) menu.
   */
  open: PropTypes.bool,

  /**
   * Generic `placeholder` that will be used as the textual representation of
   * what this field is for
   */
  placeholder: PropTypes.string,

  /**
   * Specify feedback (mode) of the selection.
   * `top`: selected item jumps to top
   * `fixed`: selected item stays at it's position
   * `top-after-reopen`: selected item jump to top after reopen dropdown
   */
  selectionFeedback: PropTypes.oneOf(['top', 'fixed', 'top-after-reopen']),

  /**
   * Specify the size of the ListBox. Currently supports either `sm`, `md` or `lg` as an option.
   */
  size: ListBoxSizePropType,

  slug: deprecate(
    PropTypes.node,
    'The `slug` prop has been deprecated and will be removed in the next major version. Use the decorator prop instead.'
  ),

  ...sortingPropTypes,

  /**
   * Provide text to be used in a `<label>` element that is tied to the
   * combobox via ARIA attributes.
   */
  titleText: PropTypes.node,

  /**
   * Callback function for translating ListBoxMenuIcon SVG title
   */
  translateWithId: PropTypes.func,

  type: ListBoxTypePropType,

  /**
   * Specify title to show title on hover
   */
  useTitleInItem: PropTypes.bool,

  /**
   * Specify whether the control is currently in warning state
   */
  warn: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText: PropTypes.node,
};
