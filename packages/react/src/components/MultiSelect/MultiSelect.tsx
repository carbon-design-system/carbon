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
import isEqual from 'react-fast-compare';
import PropTypes from 'prop-types';
import React, {
  ForwardedRef,
  useContext,
  useState,
  useMemo,
  ReactNode,
  useLayoutEffect,
} from 'react';
import ListBox, {
  ListBoxSize,
  ListBoxType,
  PropTypes as ListBoxPropTypes,
} from '../ListBox';
import {
  MultiSelectSortingProps,
  SortItemsOptions,
  sortingPropTypes,
} from './MultiSelectPropTypes';
import { defaultSortItems, defaultCompareItems } from './tools/sorting';
import { useSelection } from '../../internal/Selection';
import { useId } from '../../internal/useId';
import mergeRefs from '../../tools/mergeRefs';
import deprecate from '../../prop-types/deprecate';
import { keys, match } from '../../internal/keyboard';
import { usePrefix } from '../../internal/usePrefix';
import { FormContext } from '../FluidForm';
import { ListBoxProps } from '../ListBox/ListBox';
import Checkbox from '../Checkbox';
import type { InternationalProps } from '../../types/common';
import type { TranslateWithId } from '../../types/common';
import { noopFn } from '../../internal/noopFn';
import {
  useFloating,
  flip,
  size as floatingSize,
  autoUpdate,
} from '@floating-ui/react';
import { hide } from '@floating-ui/dom';
import { useFeatureFlag } from '../FeatureFlags';

const {
  ItemClick,
  ToggleButtonBlur,
  ToggleButtonKeyDownArrowDown,
  ToggleButtonKeyDownArrowUp,
  ToggleButtonKeyDownEnter,
  ToggleButtonKeyDownEscape,
  ToggleButtonKeyDownSpaceButton,
  ItemMouseMove,
  MenuMouseLeave,
  ToggleButtonClick,
  ToggleButtonKeyDownPageDown,
  ToggleButtonKeyDownPageUp,
  FunctionSetHighlightedIndex,
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

interface selectedItemType {
  text: string;
}

interface OnChangeData<ItemType> {
  selectedItems: ItemType[] | null;
}

export interface MultiSelectProps<ItemType>
  extends MultiSelectSortingProps<ItemType>,
    TranslateWithId<
      'close.menu' | 'open.menu' | 'clear.all' | 'clear.selection'
    > {
  /**
   * **Experimental**: Will attempt to automatically align the floating
   * element to avoid collisions with the viewport and being clipped by
   * ancestor elements.
   */
  autoAlign?: boolean;

  className?: string;

  /**
   * Specify the text that should be read for screen readers that describes that all items are deleted
   */
  clearAnnouncement?: string;

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
   * Additional props passed to Downshift.
   *
   * **Use with caution:** anything you define here overrides the components'
   * internal handling of that prop. Downshift APIs and internals are subject to
   * change, and in some cases they can not be shimmed by Carbon to shield you
   * from potentially breaking changes.
   */
  downshiftProps?: Partial<UseSelectProps<ItemType>>;

  /**
   * Provide helper text that is used alongside the control label for
   * additional help
   */
  helperText?: ReactNode;

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
  invalidText?: ReactNode;

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
  label: NonNullable<ReactNode>;

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
  slug?: ReactNode;

  /**
   * Provide text to be used in a `<label>` element that is tied to the
   * multiselect via ARIA attributes.
   */
  titleText?: ReactNode;

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
  warnText?: ReactNode;
}

const MultiSelect = React.forwardRef(
  <ItemType,>(
    {
      autoAlign = false,
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
      clearAnnouncement = 'all items have been cleared',
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
    const filteredItems = useMemo(() => {
      return items.filter((item) => {
        if (typeof item === 'object' && item !== null) {
          for (const key in item) {
            if (Object.hasOwn(item, key) && item[key] === undefined) {
              return false; // Return false if any property has an undefined value
            }
          }
        }
        return true; // Return true if item is not an object with undefined values
      });
    }, [items]);

    let selectAll = filteredItems.some((item) => (item as any).isSelectAll);
    if ((selected ?? []).length > 0 && selectAll) {
      console.warn(
        'Warning: `selectAll` should not be used when `selectedItems` is provided. Please pass either `selectAll` or `selectedItems`, not both.'
      );
      selectAll = false;
    }
    const prefix = usePrefix();
    const { isFluid } = useContext(FormContext);
    const multiSelectInstanceId = useId();
    const [isFocused, setIsFocused] = useState(false);
    const [inputFocused, setInputFocused] = useState(false);
    const [isOpen, setIsOpen] = useState(open || false);
    const [prevOpenProp, setPrevOpenProp] = useState(open);
    const [topItems, setTopItems] = useState([]);
    const [itemsCleared, setItemsCleared] = useState(false);

    const enableFloatingStyles =
      useFeatureFlag('enable-v12-dynamic-floating-styles') || autoAlign;

    const { refs, floatingStyles, middlewareData } = useFloating(
      enableFloatingStyles
        ? {
            placement: direction,

            // The floating element is positioned relative to its nearest
            // containing block (usually the viewport). It will in many cases also
            // “break” the floating element out of a clipping ancestor.
            // https://floating-ui.com/docs/misc#clipping
            strategy: 'fixed',

            // Middleware order matters, arrow should be last
            middleware: [
              autoAlign && flip({ crossAxis: false }),
              floatingSize({
                apply({ rects, elements }) {
                  Object.assign(elements.floating.style, {
                    width: `${rects.reference.width}px`,
                  });
                },
              }),
              autoAlign && hide(),
            ],
            whileElementsMounted: autoUpdate,
          }
        : {}
    );

    useLayoutEffect(() => {
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
      }
    }, [
      enableFloatingStyles,
      floatingStyles,
      refs.floating,
      middlewareData,
      open,
    ]);

    const {
      selectedItems: controlledSelectedItems,
      onItemChange,
      clearSelection,
    } = useSelection({
      disabled,
      initialSelectedItems,
      onChange,
      selectedItems: selected,
      selectAll,
      filteredItems,
    });

    const sortOptions = {
      selectedItems: controlledSelectedItems,
      itemToString,
      compareItems,
      locale,
    };

    const selectProps: UseSelectProps<ItemType> = {
      stateReducer,
      isOpen,
      itemToString: (filteredItems) => {
        return (
          (Array.isArray(filteredItems) &&
            filteredItems
              .map(function (item) {
                return itemToString(item);
              })
              .join(', ')) ||
          ''
        );
      },
      selectedItem: controlledSelectedItems,
      items: filteredItems as ItemType[],
      isItemDisabled(item, _index) {
        return (item as any).disabled;
      },
      ...downshiftProps,
    };

    const {
      getToggleButtonProps,
      getLabelProps,
      getMenuProps,
      getItemProps,
      selectedItem,
      highlightedIndex,
      setHighlightedIndex,
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

          if (!isOpen && match(e, keys.Delete) && selectedItems.length > 0) {
            setItemsCleared(true);
          }

          if (
            (match(e, keys.Space) ||
              match(e, keys.ArrowDown) ||
              match(e, keys.Enter)) &&
            !isOpen
          ) {
            setHighlightedIndex(0);
            setItemsCleared(false);
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
      [`${prefix}--autoalign`]: enableFloatingStyles,
      [`${prefix}--multi-select--selectall`]: selectAll,
    });

    // needs to be capitalized for react to render it correctly
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const ItemToElement = itemToElement!;

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
        case ToggleButtonKeyDownSpaceButton:
        case ToggleButtonKeyDownEnter:
          if (changes.selectedItem === undefined) {
            break;
          }
          if (Array.isArray(changes.selectedItem)) {
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
          return {
            ...changes,
            highlightedIndex:
              controlledSelectedItems.length > 0 ? 0 : undefined,
          };
        case ItemClick:
          setHighlightedIndex(changes.selectedItem);
          onItemChange(changes.selectedItem);
          return { ...changes, highlightedIndex: state.highlightedIndex };
        case MenuMouseLeave:
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
              highlightedIndex: filteredItems.indexOf(highlightedIndex),
            };
          }
        case ToggleButtonKeyDownArrowDown:
        case ToggleButtonKeyDownArrowUp:
        case ToggleButtonKeyDownPageDown:
        case ToggleButtonKeyDownPageUp:
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
    if (slug && slug['type']?.displayName === 'AILabel') {
      normalizedSlug = React.cloneElement(slug as React.ReactElement<any>, {
        size: 'mini',
      });
    }

    const itemsSelectedText =
      selectedItems.length > 0 &&
      selectedItems.map((item) => (item as selectedItemType)?.text);

    const selectedItemsLength = selectAll
      ? selectedItems.filter((item: any) => !item.isSelectAll).length
      : selectedItems.length;

    // Memoize the value of getMenuProps to avoid an infinite loop
    const menuProps = useMemo(
      () =>
        getMenuProps({
          ref: enableFloatingStyles ? refs.setFloating : null,
        }),
      [enableFloatingStyles, getMenuProps, refs.setFloating]
    );

    return (
      <div className={wrapperClasses}>
        <label className={titleClasses} {...getLabelProps()}>
          {titleText && titleText}
          {selectedItems.length > 0 && (
            <span className={`${prefix}--visually-hidden`}>
              {clearSelectionDescription} {selectedItems.length}{' '}
              {itemsSelectedText},{clearSelectionText}
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
          <div
            className={multiSelectFieldWrapperClasses}
            ref={enableFloatingStyles ? refs.setReference : null}>
            {selectedItems.length > 0 && (
              <ListBox.Selection
                readOnly={readOnly}
                clearSelection={
                  !disabled && !readOnly ? clearSelection : noopFn
                }
                selectionCount={selectedItemsLength}
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
          <ListBox.Menu {...menuProps}>
            {isOpen &&
              sortItems!(
                filteredItems,
                sortOptions as SortItemsOptions<ItemType>
              ).map((item, index) => {
                const isChecked =
                  selectedItems.filter((selected) => isEqual(selected, item))
                    .length > 0;

                const isIndeterminate =
                  selectedItems.length !== 0 &&
                  item['isSelectAll'] &&
                  !isChecked;

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
                    isActive={isChecked && !item['isSelectAll']}
                    aria-label={itemText}
                    isHighlighted={highlightedIndex === index}
                    title={itemText}
                    disabled={itemProps['aria-disabled']}
                    {...itemProps}>
                    <div className={`${prefix}--checkbox-wrapper`}>
                      <Checkbox
                        id={`${itemProps.id}__checkbox`}
                        labelText={
                          itemToElement ? (
                            <ItemToElement key={itemProps.id} {...item} />
                          ) : (
                            itemText
                          )
                        }
                        checked={isChecked}
                        title={useTitleInItem ? itemText : undefined}
                        indeterminate={isIndeterminate}
                        disabled={disabled}
                      />
                    </div>
                  </ListBox.MenuItem>
                );
              })}
          </ListBox.Menu>
          {itemsCleared && (
            <span aria-live="assertive" aria-label={clearAnnouncement} />
          )}
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
   * **Experimental**: Will attempt to automatically align the floating
   * element to avoid collisions with the viewport and being clipped by
   * ancestor elements.
   */
  autoAlign: PropTypes.bool,

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
   * options. See 'sortItems' for more control. Consider
   * declaring function with `useCallback` to prevent unnecessary re-renders.
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
   * Additional props passed to Downshift.
   *
   * **Use with caution:** anything you define here overrides the components'
   * internal handling of that prop. Downshift APIs and internals are subject to
   * change, and in some cases they can not be shimmed by Carbon to shield you
   * from potentially breaking changes.
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
   * from a given item to serve as the item label in the list. Consider
   * declaring function with `useCallback` to prevent unnecessary re-renders.
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
