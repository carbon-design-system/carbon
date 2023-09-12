/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { WarningFilled, WarningAltFilled } from '@carbon/icons-react';
import cx from 'classnames';
import Downshift, {
  useCombobox,
  type UseComboboxProps,
  useMultipleSelection,
  type UseMultipleSelectionProps,
} from 'downshift';
import isEqual from 'lodash.isequal';
import PropTypes from 'prop-types';
import React, {
  useContext,
  useState,
  useRef,
  useEffect,
  forwardRef,
  type ForwardedRef,
  type ReactNode,
  type FunctionComponent,
  type SyntheticEvent,
  type KeyboardEvent,
  type ReactElement,
} from 'react';
import { defaultFilterItems } from '../ComboBox/tools/filter';
import {
  sortingPropTypes,
  type ItemBase,
  type SortingPropTypes,
} from './MultiSelectPropTypes';
import ListBox, { PropTypes as ListBoxPropTypes } from '../ListBox';
import { ListBoxTrigger, ListBoxSelection } from '../ListBox/next';
import { match, keys } from '../../internal/keyboard';
import { defaultItemToString } from './tools/itemToString';
import mergeRefs from '../../tools/mergeRefs';
import deprecate from '../../prop-types/deprecate';
import { useId } from '../../internal/useId';
import { defaultSortItems, defaultCompareItems } from './tools/sorting';
import { usePrefix } from '../../internal/usePrefix';
import { FormContext } from '../FluidForm';

export interface FilterableMultiSelectProps<Item extends ItemBase>
  extends SortingPropTypes<Item> {
  /**
   * Specify a label to be read by screen readers on the container node
   * @deprecated
   */
  'aria-label'?: string;
  /** @deprecated */
  ariaLabel?: string;

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
   * Specify the direction of the multiselect dropdown.
   */
  direction?: 'top' | 'bottom';

  /**
   * Disable the control
   */
  disabled?: boolean;

  /**
   * Additional props passed to Downshift
   */
  downshiftProps?: UseMultipleSelectionProps<Item>;

  /**
   * Default sorter is assigned if not provided.
   */
  filterItems(
    items: readonly Item[],
    extra: {
      inputValue: string | null;
      itemToString: NonNullable<
        UseMultipleSelectionProps<Item>['itemToString']
      >;
    }
  ): Item[];

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
  initialSelectedItems?: Item[];

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
  itemToElement?: FunctionComponent<Item>;

  /**
   * Helper function passed to downshift that allows the library to render
   * a given item to a string label.
   *
   * By default, it extracts the `label` field from a given item
   * to serve as the item label in the list.
   */
  itemToString(item: Item | null): string;

  /**
   * We try to stay as generic as possible here to allow individuals to pass
   * in a collection of whatever kind of data structure they prefer
   */
  items: Item[];

  /**
   * Specify the locale of the control.
   * Used for the default `compareItems`,
   * which is used for sorting the list of items in the control.
   */
  locale: string;

  /**
   * `onChange` is a utility for this controlled component to communicate to a
   * consuming component what kind of internal state changes are occurring.
   */
  onChange?(changes: { selectedItems: Item[] }): void;

  /**
   * A utility for this controlled component
   * to communicate to the currently typed input.
   */
  onInputValueChange?: UseComboboxProps<Item>['onInputValueChange'];

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
   * Specify feedback (mode) of the selection.
   * `top`: selected item jumps to top
   * `fixed`: selected item stays at its position
   * `top-after-reopen`: selected item jump to top after reopen dropdown
   */
  selectionFeedback: 'top' | 'fixed' | 'top-after-reopen';

  /**
   * Specify the size of the ListBox.
   * Currently, supports either `sm`, `md` or `lg` as an option.
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Provide text to be used in a `<label>` element that is tied to the
   * combobox via ARIA attributes.
   */
  titleText?: ReactNode;

  /**
   * Callback function for translating ListBoxMenuIcon SVG title
   */
  translateWithId?(messageId: string, args?: Record<string, unknown>): string;

  type?: 'default' | 'inline';

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

const FilterableMultiSelect = forwardRef(function FilterableMultiSelect<
  Item extends ItemBase
>(
  {
    ['aria-label']: ariaLabel,
    ariaLabel: deprecatedAriaLabel,
    className: containerClassName,
    clearSelectionDescription,
    clearSelectionText,
    compareItems,
    direction,
    disabled,
    downshiftProps,
    filterItems,
    helperText,
    hideLabel,
    id,
    initialSelectedItems,
    invalid,
    invalidText,
    items,
    itemToElement: ItemToElement, // needs to be capitalized for react to render it correctly
    itemToString,
    // @ts-expect-error: deprecated prop
    light,
    locale,
    onInputValueChange,
    open,
    onChange,
    onMenuChange,
    placeholder,
    titleText,
    type,
    selectionFeedback,
    size,
    sortItems,
    translateWithId,
    useTitleInItem,
    warn,
    warnText,
  }: FilterableMultiSelectProps<Item>,
  ref: ForwardedRef<HTMLDivElement>
) {
  const prefix = usePrefix();
  const filterableMultiSelectInstanceId = useId();

  const { isFluid } = useContext(FormContext);
  const textInput = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(!!open);
  const [prevOpen, setPrevOpen] = useState<boolean>(!!open);
  const [inputValue, setInputValue] = useState<string>('');
  const [topItems, setTopItems] = useState<Item[]>(initialSelectedItems ?? []);
  const [inputFocused, setInputFocused] = useState<boolean>(false);

  const $selectionState = useState(initialSelectedItems ?? []);
  const selectedItems = $selectionState[0];
  const setSelectedItems = (items: Item[]) => {
    $selectionState[1](items);
    onChange?.({ selectedItems: items });
  };

  if (prevOpen !== open) {
    setIsOpen(!!open);
    setPrevOpen(!!open);
  }

  const inline = type === 'inline';
  const showWarning = !invalid && warn;

  const wrapperClasses = cx(
    `${prefix}--multi-select__wrapper`,
    `${prefix}--multi-select--filterable__wrapper`,
    `${prefix}--list-box__wrapper`,
    inline && `${prefix}--multi-select__wrapper--inline`,
    inline && `${prefix}--list-box__wrapper--inline`,
    inline && invalid && `${prefix}--multi-select__wrapper--inline--invalid`,
    inline && invalid && `${prefix}--list-box__wrapper--inline--invalid`,
    direction === 'top' && `${prefix}--list-box--up`,
    isFluid && invalid && `${prefix}--list-box__wrapper--fluid--invalid`,
    isFluid && isFocused && `${prefix}--list-box__wrapper--fluid--focus`,
    containerClassName
  );
  const helperId = !helperText
    ? undefined
    : `filterablemultiselect-helper-text-${filterableMultiSelectInstanceId}`;
  const labelId = `${id}-label`;
  const titleClasses = cx(
    `${prefix}--label`,
    disabled && `${prefix}--label--disabled`,
    hideLabel && `${prefix}--visually-hidden`
  );
  const helperClasses = cx(
    `${prefix}--form__helper-text`,
    disabled && `${prefix}--form__helper-text--disabled`
  );
  const inputClasses = cx(
    `${prefix}--text-input`,
    !inputValue && `${prefix}--text-input--empty`,
    light && `${prefix}--text-input--light`
  );

  const helper = helperText ? (
    <div id={helperId} className={helperClasses}>
      {helperText}
    </div>
  ) : null;
  const menuId = `${id}__menu`;
  const inputId = `${id}-input`;

  useEffect(() => {
    if (!isOpen) {
      setTopItems(selectedItems);
    }
  }, [selectedItems, isOpen, setTopItems]);

  const handleFocus = (evt: SyntheticEvent<HTMLElement>) => {
    const el = evt.target as HTMLElement;
    if (
      el.classList.contains(`${prefix}--tag__close-icon`) ||
      el.classList.contains(`${prefix}--list-box__selection`)
    ) {
      setIsFocused(false);
    } else {
      setIsFocused(evt.type === 'focus');
    }
  };
  function handleMenuChange(forceIsOpen: boolean): void {
    const nextIsOpen = forceIsOpen ?? !isOpen;
    setIsOpen(nextIsOpen);
    if (onMenuChange) {
      onMenuChange(nextIsOpen);
    }
  }
  function clearInputValue(event?: SyntheticEvent) {
    const $value = textInput.current?.value;
    if ($value?.length === 1 || (event && match(event, keys.Escape))) {
      setInputValue('');
    } else {
      setInputValue($value ?? '');
    }

    textInput.current?.focus();
  }

  const {
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    openMenu,
    isOpen: isMenuOpen,
  } = useCombobox<Item>({
    isOpen,
    items,
    itemToString,
    defaultHighlightedIndex: 0, // after selection, highlight the first item.
    id,
    labelId,
    menuId,
    inputId,
    inputValue,
    stateReducer(state, actionAndChanges) {
      const { changes, type } = actionAndChanges;
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          return {
            ...changes,
            isOpen: true, // keep the menu open after selection.
            highlightedIndex: 0, // with the first option highlighted.
          };
        default:
          return changes;
      }
    },
    onStateChange(changes) {
      switch (changes.type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur: {
          if (changes.selectedItem) {
            setSelectedItems([...selectedItems, changes.selectedItem]);
            setInputValue('');
          }
          break;
        }

        case useCombobox.stateChangeTypes.InputChange: {
          setInputValue(changes.inputValue ?? '');
          break;
        }

        case useCombobox.stateChangeTypes.InputKeyDownArrowDown: {
          if (!isOpen) {
            handleMenuChange(true);
          }
          break;
        }
        case useCombobox.stateChangeTypes.InputKeyDownEscape: {
          handleMenuChange(false);
          break;
        }
      }
    },
    onInputValueChange(changes) {
      onInputValueChange?.(changes);

      if (Array.isArray(inputValue)) {
        clearInputValue();
      } else {
        setInputValue(inputValue);
      }

      if (inputValue && !isOpen) {
        handleMenuChange(true);
      } else if (!inputValue && isOpen) {
        handleMenuChange(false);
      }
    },
  });
  const { getDropdownProps } = useMultipleSelection<Item>({
    ...downshiftProps,
    activeIndex: highlightedIndex,
    initialSelectedItems,
    selectedItems: selectedItems,
    itemToString,
    onStateChange(changes) {
      switch (changes.type) {
        case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownBackspace:
        case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownDelete:
        case useMultipleSelection.stateChangeTypes.DropdownKeyDownBackspace:
        case useMultipleSelection.stateChangeTypes.FunctionRemoveSelectedItem: {
          setSelectedItems(changes.selectedItems ?? []);
          break;
        }
      }
    },
    // FIXME: missing `onOuterClick: () => handleOnMenuChange(false)`
  });

  useEffect(() => {
    if (isOpen && !isMenuOpen) {
      openMenu();
    }
  });

  const className = cx(
    `${prefix}--multi-select`,
    `${prefix}--combo-box`,
    `${prefix}--multi-select--filterable`,
    invalid && `${prefix}--multi-select--invalid`,
    invalid && inputFocused && `${prefix}--multi-select--invalid--focused`,
    isOpen && `${prefix}--multi-select--open`,
    inline && `${prefix}--multi-select--inline`,
    selectedItems.length > 0 && `${prefix}--multi-select--selected`,
    inputFocused && `${prefix}--multi-select--filterable--input-focused`
  );
  const labelProps = getLabelProps();
  const buttonProps = getToggleButtonProps({
    disabled,
    onClick() {
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
              setSelectedItems([]);
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
      onBlur() {
        setInputFocused(false);
        setInputValue('');
      },
    })
  );
  const menuProps = getMenuProps({}, { suppressRefError: true });

  const clearSelectionContent =
    selectedItems.length > 0 ? (
      <span className={`${prefix}--visually-hidden`}>
        {clearSelectionDescription} {selectedItems.length},{clearSelectionText}
      </span>
    ) : (
      <span className={`${prefix}--visually-hidden`}>
        {clearSelectionDescription}: 0
      </span>
    );
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
        aria-label={deprecatedAriaLabel || ariaLabel}
        onFocus={isFluid ? handleFocus : undefined}
        onBlur={isFluid ? handleFocus : undefined}
        className={className}
        disabled={disabled}
        light={light}
        ref={ref}
        invalid={invalid}
        invalidText={invalidText}
        warn={warn}
        warnText={warnText}
        isOpen={isOpen}
        size={size}>
        <div className={`${prefix}--list-box__field`}>
          {selectedItems.length > 0 && (
            <ListBoxSelection
              clearSelection={() => {
                setSelectedItems([]);
                if (textInput.current) {
                  textInput.current.focus();
                }
              }}
              selectionCount={selectedItems.length}
              translateWithId={translateWithId}
              disabled={disabled}
              // Invalid typedef or derivation from prop-types
              // since optional prop should be ommisable.
              onClearSelection={undefined}
            />
          )}
          <input
            {...inputProps}
            className={inputClasses}
            ref={mergeRefs(textInput, inputProps.ref)}
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
              onMouseUp={(event) => {
                // If we do not stop this event from propagating,
                // it seems like Downshift takes our event and
                // prevents us from getting `onClick` /
                // `clearSelection` from the underlying <button> in
                // ListBoxSelection
                event.stopPropagation();
              }}
              // Invalid typedef or derivation from prop-types
              // since optional prop should be ommisable.
              selectionCount={undefined}
              onClearSelection={undefined}
            />
          )}
          <ListBoxTrigger
            {...buttonProps}
            ref={null}
            isOpen={isOpen}
            translateWithId={translateWithId}
          />
        </div>
        {isOpen ? (
          <ListBox.Menu {...menuProps}>
            {sortItems(filterItems(items, { itemToString, inputValue }), {
              selectedItems: {
                top: selectedItems,
                fixed: [],
                'top-after-reopen': topItems,
              }[selectionFeedback],
              itemToString,
              compareItems,
              locale,
            }).map((item, index) => {
              const isChecked =
                selectedItems.filter((selected) => isEqual(selected, item))
                  .length > 0;
              const itemProps = getItemProps({
                item,
                disabled: item.disabled,
                ['aria-selected']: isChecked,
              });
              const itemText = itemToString(item);

              return (
                <ListBox.MenuItem
                  key={itemProps.id}
                  aria-label={itemText}
                  isActive={isChecked}
                  isHighlighted={highlightedIndex === index}
                  title={itemText}
                  {...itemProps}>
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
            })}
          </ListBox.Menu>
        ) : null}
      </ListBox>
      {!inline && !invalid && !warn ? helper : null}
    </div>
  );
}) as {
  <Item extends ItemBase>(
    props: FilterableMultiSelectProps<Item>
  ): ReactElement;
  propTypes?: any;
  contextTypes?: any;
  defaultProps?: any;
  displayName?: any;
};

// Specifying this allows later re-assignment without further type shenanigans
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
   * Specify the text that should be read for screen readers that describes total items selected
   */
  clearSelectionDescription: PropTypes.string,

  /**
   * Specify the text that should be read for screen readers to clear selection.
   */
  clearSelectionText: PropTypes.string,

  /**
   * Specify the direction of the multiselect dropdown. Can be either top or bottom.
   */
  direction: PropTypes.oneOf(['top', 'bottom']),

  /**
   * Disable the control
   */
  disabled: PropTypes.bool,

  /**
   * Additional props passed to Downshift
   * FIXME: Not true anymore…
   */
  downshiftProps: PropTypes.shape(
    // @ts-expect-error: invalid in typescipt, but apparently valid in runtime
    Downshift.propTypes
  ),

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
  size: ListBoxPropTypes.ListBoxSize,

  ...sortingPropTypes,

  /**
   * Callback function for translating ListBoxMenuIcon SVG title
   */
  translateWithId: PropTypes.func,

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
FilterableMultiSelect.defaultProps = {
  compareItems: defaultCompareItems,
  direction: 'bottom',
  disabled: false,
  filterItems: defaultFilterItems,
  initialSelectedItems: [],
  itemToString: defaultItemToString,
  locale: 'en',
  sortItems: defaultSortItems,
  open: false,
  selectionFeedback: 'top-after-reopen',
  clearSelectionText: 'To clear selection, press Delete or Backspace,',
  clearSelectionDescription: 'Total items selected: ',
};

export default FilterableMultiSelect;
