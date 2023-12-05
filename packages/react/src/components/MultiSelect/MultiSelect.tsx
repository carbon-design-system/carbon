/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { WarningFilled, WarningAltFilled } from '@carbon/icons-react';
import cx from 'classnames';
import {
  useSelect,
  UseSelectInterface,
  UseSelectProps,
  UseSelectStateChangeTypes,
} from 'downshift';
import isEqual from 'lodash.isequal';
import PropTypes, { ReactNodeLike } from 'prop-types';
import React, { ForwardedRef, useContext, useRef, useState } from 'react';
import ListBox, {
  ListBoxSize,
  ListBoxType,
  PropTypes as ListBoxPropTypes,
} from '../ListBox';
import { sortingPropTypes } from './MultiSelectPropTypes';
import { defaultSortItems, defaultCompareItems } from './tools/sorting';
import { useSelection } from '../../internal/Selection';
import setupGetInstanceId from '../../tools/setupGetInstanceId';
import mergeRefs from '../../tools/mergeRefs';
import deprecate from '../../prop-types/deprecate';
import { keys, match } from '../../internal/keyboard';
import { usePrefix } from '../../internal/usePrefix';
import { FormContext } from '../FluidForm';
import { ListBoxProps } from '../ListBox/ListBox';
import { OnChangeData } from '../Dropdown';
import type { InternationalProps } from '../../types/common';
import { noopFn } from '../../internal/noopFn';

const getInstanceId = setupGetInstanceId();
const {
  ItemClick,
  ToggleButtonBlur,
  ToggleButtonKeyDownArrowDown,
  ToggleButtonKeyDownArrowUp,
  ToggleButtonKeyDownEnter,
  ToggleButtonKeyDownEscape,
  ToggleButtonKeyDownSpaceButton,
  ItemMouseMove,
  ToggleButtonClick,
  ToggleButtonKeyDownHome,
  ToggleButtonKeyDownEnd,
} = useSelect.stateChangeTypes as UseSelectInterface['stateChangeTypes'] & {
  ToggleButtonClick: UseSelectStateChangeTypes.ToggleButtonClick;
};

const defaultItemToString = <ItemType,>(item?: ItemType): string => {
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

interface SharedOptions {
  locale: string;
}

interface DownshiftTypedProps<ItemType> {
  itemToString?(item: ItemType): string;
}

interface SortItemsOptions<ItemType>
  extends SharedOptions,
    DownshiftTypedProps<ItemType> {
  compareItems(
    item1: ItemType,
    item2: ItemType,
    options: SharedOptions
  ): number;
  selectedItems: ItemType[];
}

interface MultiSelectSortingProps<ItemType> {
  /**
   * Provide a compare function that is used to determine the ordering of
   * options. See 'sortItems' for more control.
   */
  compareItems?(
    item1: ItemType,
    item2: ItemType,
    options: SharedOptions
  ): number;

  /**
   * Provide a method that sorts all options in the control. Overriding this
   * prop means that you also have to handle the sort logic for selected versus
   * un-selected items. If you just want to control ordering, consider the
   * `compareItems` prop instead.
   *
   * The return value should be a number whose sign indicates the relative order
   * of the two elements: negative if a is less than b, positive if a is greater
   * than b, and zero if they are equal.
   *
   * sortItems :
   *   (items: Array<Item>, {
   *     selectedItems: Array<Item>,
   *     itemToString: Item => string,
   *     compareItems: (itemA: string, itemB: string, {
   *       locale: string
   *     }) => number,
   *     locale: string,
   *   }) => Array<Item>
   */
  sortItems?(
    items: ReadonlyArray<ItemType>,
    options: SortItemsOptions<ItemType>
  ): ItemType[];
}

export interface MultiSelectProps<ItemType>
  extends MultiSelectSortingProps<ItemType>,
    InternationalProps<
      'close.menu' | 'open.menu' | 'clear.all' | 'clear.selection'
    > {
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
   * Specify the direction of the multiselect dropdown. Can be either top or bottom.
   */
  direction?: 'bottom' | 'top';

  /**
   * Disable the control
   */
  disabled?: ListBoxProps['disabled'];

  /**
   * Additional props passed to Downshift
   */
  downshiftProps?: Partial<UseSelectProps<ItemType>>;

  /**
   * Provide helper text that is used alongside the control label for
   * additional help
   */
  helperText?: React.ReactNode;

  /**
   * Specify whether the title text should be hidden or not
   */
  hideLabel?: boolean;

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
  invalidText?: React.ReactNode;

  /**
   * Function to render items as custom components instead of strings.
   * Defaults to null and is overridden by a getter
   */
  itemToElement?: React.JSXElementConstructor<ItemType>;

  /**
   * Helper function passed to downshift that allows the library to render a
   * given item to a string label. By default, it extracts the `label` field
   * from a given item to serve as the item label in the list.
   */
  itemToString?(item: ItemType): string;

  /**
   * We try to stay as generic as possible here to allow individuals to pass
   * in a collection of whatever kind of data structure they prefer
   */
  items: ItemType[];

  /**
   * Generic `label` that will be used as the textual representation of what
   * this field is for
   */
  label: NonNullable<React.ReactNode>;

  /**
   * `true` to use the light version.
   *
   * @deprecated The `light` prop for `MultiSelect` has
   *     been deprecated in favor of the new `Layer` component. It will be removed in the next major release.
   */
  light?: boolean;

  /**
   * Specify the locale of the control. Used for the default `compareItems`
   * used for sorting the list of items in the control.
   */
  locale?: string;

  /**
   * `onChange` is a utility for this controlled component to communicate to a
   * consuming component what kind of internal state changes are occurring.
   */
  onChange?(data: OnChangeData<ItemType>): void;

  /**
   * `onMenuChange` is a utility for this controlled component to communicate to a
   * consuming component that the menu was open(`true`)/closed(`false`).
   */
  onMenuChange?(open: boolean): void;

  /**
   * Initialize the component with an open(`true`)/closed(`false`) menu.
   */
  open?: boolean;

  /**
   * Whether or not the Dropdown is readonly
   */
  readOnly?: boolean;

  /**
   * For full control of the selected items
   */
  selectedItems?: ItemType[];

  /**
   * Specify feedback (mode) of the selection.
   * `top`: selected item jumps to top
   * `fixed`: selected item stays at it's position
   * `top-after-reopen`: selected item jump to top after reopen dropdown
   */
  selectionFeedback?: 'fixed' | 'top' | 'top-after-reopen';

  /**
   * Specify the size of the ListBox. Currently supports either `sm`, `md` or `lg` as an option.
   */
  size?: ListBoxSize;

  /**
   * **Experimental**: Provide a `Slug` component to be rendered inside the `MultiSelect` component
   */
  slug?: ReactNodeLike;

  /**
   * Provide text to be used in a `<label>` element that is tied to the
   * multiselect via ARIA attributes.
   */
  titleText?: React.ReactNode;

  /**
   * Specify 'inline' to create an inline multi-select.
   */
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
  warnText?: React.ReactNode;
}

const MultiSelect = React.forwardRef(
  <ItemType,>(
    {
      className: containerClassName,
      id,
      items,
      itemToElement,
      itemToString = defaultItemToString,
      titleText = false,
      hideLabel,
      helperText,
      label,
      type = 'default',
      size,
      disabled = false,
      initialSelectedItems = [],
      sortItems = defaultSortItems as MultiSelectProps<ItemType>['sortItems'],
      compareItems = defaultCompareItems,
      clearSelectionText = 'To clear selection, press Delete or Backspace',
      clearSelectionDescription = 'Total items selected: ',
      light,
      invalid,
      invalidText,
      warn,
      warnText,
      useTitleInItem,
      translateWithId,
      downshiftProps,
      open = false,
      selectionFeedback = 'top-after-reopen',
      onChange,
      onMenuChange,
      direction = 'bottom',
      selectedItems: selected,
      readOnly,
      locale = 'en',
      slug,
    }: MultiSelectProps<ItemType>,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const prefix = usePrefix();
    const { isFluid } = useContext(FormContext);
    const { current: multiSelectInstanceId } = useRef(getInstanceId());
    const [isFocused, setIsFocused] = useState(false);
    const [inputFocused, setInputFocused] = useState(false);
    const [isOpen, setIsOpen] = useState(open || false);
    const [prevOpenProp, setPrevOpenProp] = useState(open);
    const [topItems, setTopItems] = useState([]);
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

    const selectProps: UseSelectProps<ItemType> = {
      ...downshiftProps,
      stateReducer,
      isOpen,
      itemToString: (items) => {
        return (
          (Array.isArray(items) &&
            items
              .map(function (item) {
                return itemToString(item);
              })
              .join(', ')) ||
          ''
        );
      },
      selectedItem: controlledSelectedItems,
      items,
      isItemDisabled(item, _index) {
        return (item as any).disabled;
      },
    };

    const {
      getToggleButtonProps,
      getLabelProps,
      getMenuProps,
      getItemProps,
      selectedItem,
      highlightedIndex,
    } = useSelect<ItemType>(selectProps);

    const toggleButtonProps = getToggleButtonProps({
      onFocus: () => {
        setInputFocused(true);
      },
      onBlur: () => {
        setInputFocused(false);
      },
      onKeyDown: (e) => {
        if (!disabled) {
          if ((match(e, keys.Delete) || match(e, keys.Escape)) && !isOpen) {
            clearSelection();
            e.stopPropagation();
          }

          if (
            (match(e, keys.Space) ||
              match(e, keys.ArrowDown) ||
              match(e, keys.Enter)) &&
            !isOpen
          ) {
            setIsOpenWrapper(true);
          }
        }
      },
    });
    const mergedRef = mergeRefs(toggleButtonProps.ref, ref);

    const selectedItems = selectedItem as ItemType[];

    /**
     * wrapper function to forward changes to consumer
     */
    const setIsOpenWrapper = (open) => {
      setIsOpen(open);
      if (onMenuChange) {
        onMenuChange(open);
      }
    };

    /**
     * programmatically control this `open` prop
     */
    if (prevOpenProp !== open) {
      setIsOpenWrapper(open);
      setPrevOpenProp(open);
    }

    const inline = type === 'inline';
    const showWarning = !invalid && warn;

    const wrapperClasses = cx(
      `${prefix}--multi-select__wrapper`,
      `${prefix}--list-box__wrapper`,
      containerClassName,
      {
        [`${prefix}--multi-select__wrapper--inline`]: inline,
        [`${prefix}--list-box__wrapper--inline`]: inline,
        [`${prefix}--multi-select__wrapper--inline--invalid`]:
          inline && invalid,
        [`${prefix}--list-box__wrapper--inline--invalid`]: inline && invalid,
        [`${prefix}--list-box__wrapper--fluid--invalid`]: isFluid && invalid,
        [`${prefix}--list-box__wrapper--fluid--focus`]:
          !isOpen && isFluid && isFocused,
        [`${prefix}--list-box__wrapper--slug`]: slug,
      }
    );
    const titleClasses = cx(`${prefix}--label`, {
      [`${prefix}--label--disabled`]: disabled,
      [`${prefix}--visually-hidden`]: hideLabel,
    });
    const helperId = !helperText
      ? undefined
      : `multiselect-helper-text-${multiSelectInstanceId}`;
    const fieldLabelId = `multiselect-field-label-${multiSelectInstanceId}`;
    const helperClasses = cx(`${prefix}--form__helper-text`, {
      [`${prefix}--form__helper-text--disabled`]: disabled,
    });

    const className = cx(`${prefix}--multi-select`, {
      [`${prefix}--multi-select--invalid`]: invalid,
      [`${prefix}--multi-select--invalid--focused`]: invalid && inputFocused,
      [`${prefix}--multi-select--warning`]: showWarning,
      [`${prefix}--multi-select--inline`]: inline,
      [`${prefix}--multi-select--selected`]:
        selectedItems && selectedItems.length > 0,
      [`${prefix}--list-box--up`]: direction === 'top',
      [`${prefix}--multi-select--readonly`]: readOnly,
    });

    // needs to be capitalized for react to render it correctly
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const ItemToElement = itemToElement!;

    const sortOptions = {
      selectedItems: controlledSelectedItems,
      itemToString,
      compareItems,
      locale,
    };

    if (selectionFeedback === 'fixed') {
      sortOptions.selectedItems = [];
    } else if (selectionFeedback === 'top-after-reopen') {
      sortOptions.selectedItems = topItems;
    }

    function stateReducer(state, actionAndChanges) {
      const { changes, props, type } = actionAndChanges;
      const { highlightedIndex } = changes;

      if (changes.isOpen && !isOpen) {
        setTopItems(controlledSelectedItems);
      }

      switch (type) {
        case ItemClick:
        case ToggleButtonKeyDownSpaceButton:
        case ToggleButtonKeyDownEnter:
          if (changes.selectedItem === undefined) {
            break;
          }
          onItemChange(changes.selectedItem);
          return { ...changes, highlightedIndex: state.highlightedIndex };
        case ToggleButtonBlur:
        case ToggleButtonKeyDownEscape:
          setIsOpenWrapper(false);
          break;
        case ToggleButtonClick:
          setIsOpenWrapper(changes.isOpen || false);
          break;
        case ToggleButtonKeyDownArrowDown:
        case ToggleButtonKeyDownArrowUp:
        case ToggleButtonKeyDownHome:
        case ToggleButtonKeyDownEnd:
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
      }
      return changes;
    }

    const multiSelectFieldWrapperClasses = cx(
      `${prefix}--list-box__field--wrapper`,
      {
        [`${prefix}--list-box__field--wrapper--input-focused`]: inputFocused,
      }
    );

    const handleFocus = (evt: React.FocusEvent<HTMLDivElement>) => {
      evt.target.classList.contains(`${prefix}--tag__close-icon`)
        ? setIsFocused(false)
        : setIsFocused(evt.type === 'focus' ? true : false);
    };

    const readOnlyEventHandlers = readOnly
      ? {
          onClick: (evt: React.MouseEvent<HTMLButtonElement>) => {
            // NOTE: does not prevent click
            evt.preventDefault();
            // focus on the element as per readonly input behavior
            if (mergedRef.current !== undefined) {
              mergedRef.current.focus();
            }
          },
          onKeyDown: (evt: React.KeyboardEvent<HTMLButtonElement>) => {
            const selectAccessKeys = ['ArrowDown', 'ArrowUp', ' ', 'Enter'];
            // This prevents the select from opening for the above keys
            if (selectAccessKeys.includes(evt.key)) {
              evt.preventDefault();
            }
          },
        }
      : {};

    // Slug is always size `mini`
    let normalizedSlug;
    if (slug) {
      normalizedSlug = React.cloneElement(slug as React.ReactElement<any>, {
        size: 'mini',
      });
    }

    return (
      <div className={wrapperClasses}>
        <label className={titleClasses} {...getLabelProps()}>
          {titleText && titleText}
          {selectedItems.length > 0 && (
            <span className={`${prefix}--visually-hidden`}>
              {clearSelectionDescription} {selectedItems.length},
              {clearSelectionText}
            </span>
          )}
        </label>
        <ListBox
          onFocus={isFluid ? handleFocus : undefined}
          onBlur={isFluid ? handleFocus : undefined}
          type={type}
          size={size}
          className={className}
          disabled={disabled}
          light={light}
          invalid={invalid}
          invalidText={invalidText}
          warn={warn}
          warnText={warnText}
          isOpen={isOpen}
          id={id}>
          {invalid && (
            <WarningFilled className={`${prefix}--list-box__invalid-icon`} />
          )}
          {showWarning && (
            <WarningAltFilled
              className={`${prefix}--list-box__invalid-icon ${prefix}--list-box__invalid-icon--warning`}
            />
          )}
          <div className={multiSelectFieldWrapperClasses}>
            {selectedItems.length > 0 && (
              <ListBox.Selection
                readOnly={readOnly}
                clearSelection={
                  !disabled && !readOnly ? clearSelection : noopFn
                }
                selectionCount={selectedItems.length}
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                translateWithId={translateWithId!}
                disabled={disabled}
              />
            )}
            <button
              type="button"
              className={`${prefix}--list-box__field`}
              disabled={disabled}
              aria-disabled={disabled || readOnly}
              aria-describedby={
                !inline && !invalid && !warn && helperText
                  ? helperId
                  : undefined
              }
              {...toggleButtonProps}
              ref={mergedRef}
              {...readOnlyEventHandlers}>
              <span id={fieldLabelId} className={`${prefix}--list-box__label`}>
                {label}
              </span>
              <ListBox.MenuIcon
                isOpen={isOpen}
                translateWithId={translateWithId}
              />
            </button>
            {normalizedSlug}
          </div>
          <ListBox.Menu {...getMenuProps()}>
            {isOpen &&
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              sortItems!(items, sortOptions as SortItemsOptions<ItemType>).map(
                (item, index) => {
                  const isChecked =
                    selectedItems.filter((selected) => isEqual(selected, item))
                      .length > 0;

                  const itemProps = getItemProps({
                    item,
                    // we don't want Downshift to set aria-selected for us
                    // we also don't want to set 'false' for reader verbosity's sake
                    ['aria-selected']: isChecked,
                  });
                  const itemText = itemToString(item);

                  return (
                    <ListBox.MenuItem
                      key={itemProps.id}
                      isActive={isChecked}
                      aria-label={itemText}
                      isHighlighted={highlightedIndex === index}
                      title={itemText}
                      disabled={itemProps['aria-disabled']}
                      {...itemProps}>
                      <div className={`${prefix}--checkbox-wrapper`}>
                        <span
                          title={useTitleInItem ? itemText : undefined}
                          className={`${prefix}--checkbox-label`}
                          data-contained-checkbox-state={isChecked}
                          id={`${itemProps.id}__checkbox`}>
                          {itemToElement ? (
                            <ItemToElement key={itemProps.id} {...item} />
                          ) : (
                            itemText
                          )}
                        </span>
                      </div>
                    </ListBox.MenuItem>
                  );
                }
              )}
          </ListBox.Menu>
        </ListBox>
        {!inline && !invalid && !warn && helperText && (
          <div id={helperId} className={helperClasses}>
            {helperText}
          </div>
        )}
      </div>
    );
  }
);

type MultiSelectComponentProps<ItemType> = React.PropsWithChildren<
  MultiSelectProps<ItemType>
> &
  React.RefAttributes<HTMLButtonElement>;

interface MultiSelectComponent {
  <ItemType>(
    props: MultiSelectComponentProps<ItemType>
  ): React.ReactElement | null;
}

MultiSelect.displayName = 'MultiSelect';
MultiSelect.propTypes = {
  ...sortingPropTypes,

  /**
   * Provide a custom class name to be added to the outermost node in the
   * component
   */
  className: PropTypes.string,

  /**
   * Specify the text that should be read for screen readers that describes total items selected
   */
  clearSelectionDescription: PropTypes.string,

  /**
   * Specify the text that should be read for screen readers to clear selection.
   */
  clearSelectionText: PropTypes.string,

  /**
   * Provide a compare function that is used to determine the ordering of
   * options. See 'sortItems' for more control.
   */
  compareItems: PropTypes.func,

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
   */
  downshiftProps: PropTypes.object as React.Validator<UseSelectProps<unknown>>,

  /**
   * Provide helper text that is used alongside the control label for
   * additional help
   */
  helperText: PropTypes.node,

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
   * Generic `label` that will be used as the textual representation of what
   * this field is for
   */
  label: PropTypes.node.isRequired,

  /**
   * `true` to use the light version.
   */
  light: deprecate(
    PropTypes.bool,
    'The `light` prop for `MultiSelect` has ' +
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
   * `onMenuChange` is a utility for this controlled component to communicate to a
   * consuming component that the menu was open(`true`)/closed(`false`).
   */
  onMenuChange: PropTypes.func,

  /**
   * Initialize the component with an open(`true`)/closed(`false`) menu.
   */
  open: PropTypes.bool,

  /**
   * Whether or not the Dropdown is readonly
   */
  readOnly: PropTypes.bool,

  /**
   * For full control of the selected items
   */
  selectedItems: PropTypes.array,

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

  /**
   * **Experimental**: Provide a `Slug` component to be rendered inside the `MultiSelect` component
   */
  slug: PropTypes.node,

  /**
   * Provide a method that sorts all options in the control. Overriding this
   * prop means that you also have to handle the sort logic for selected versus
   * un-selected items. If you just want to control ordering, consider the
   * `compareItems` prop instead.
   *
   * The return value should be a number whose sign indicates the relative order
   * of the two elements: negative if a is less than b, positive if a is greater
   * than b, and zero if they are equal.
   *
   * sortItems :
   *   (items: Array<Item>, {
   *     selectedItems: Array<Item>,
   *     itemToString: Item => string,
   *     compareItems: (itemA: string, itemB: string, {
   *       locale: string
   *     }) => number,
   *     locale: string,
   *   }) => Array<Item>
   */
  sortItems: PropTypes.func,

  /**
   * Provide text to be used in a `<label>` element that is tied to the
   * multiselect via ARIA attributes.
   */
  titleText: PropTypes.node,

  /**
   * Callback function for translating ListBoxMenuIcon SVG title
   */
  translateWithId: PropTypes.func,

  /**
   * Specify 'inline' to create an inline multi-select.
   */
  type: PropTypes.oneOf(['default', 'inline']),

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

export default MultiSelect as MultiSelectComponent;
