/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  useRef,
  useContext,
  useState,
  FocusEvent,
  ForwardedRef,
  MouseEvent,
  ReactNode,
} from 'react';
import { useSelect, UseSelectProps, UseSelectState } from 'downshift';
import cx from 'classnames';
import PropTypes from 'prop-types';
import {
  Checkmark,
  WarningAltFilled,
  WarningFilled,
} from '@carbon/icons-react';
import ListBox, {
  ListBoxSize,
  ListBoxType,
  PropTypes as ListBoxPropTypes,
} from '../ListBox';
import mergeRefs from '../../tools/mergeRefs';
import deprecate from '../../prop-types/deprecate';
import { usePrefix } from '../../internal/usePrefix';
import { FormContext } from '../FluidForm';
import { ReactAttr } from '../../types/common';
import setupGetInstanceId from '../../tools/setupGetInstanceId';

const getInstanceId = setupGetInstanceId();

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

type ExcludedAttributes = 'id' | 'onChange';

export interface OnChangeData<ItemType> {
  selectedItem: ItemType | null;
}

export interface DropdownProps<ItemType>
  extends Omit<ReactAttr<HTMLDivElement>, ExcludedAttributes> {
  /**
   * Specify a label to be read by screen readers on the container node
   * 'aria-label' of the ListBox component.
   */
  ['aria-label']?: string;

  /**
   * @deprecated please use `aria-label` instead.
   * Specify a label to be read by screen readers on the container note.
   */
  ariaLabel?: string;

  /**
   * Specify the direction of the dropdown. Can be either top or bottom.
   */
  direction?: 'top' | 'bottom';

  /**
   * Disable the control
   */
  disabled?: boolean;

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
  invalidText?: React.ReactNode;

  /**
   * Function to render items as custom components instead of strings.
   * Defaults to null and is overridden by a getter
   */
  itemToElement?: React.JSXElementConstructor<ItemType> | null;

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
   * @deprecated The `light` prop for `Dropdown` has been deprecated
   * in favor of the new `Layer` component. It will be removed in the next major release.
   */
  light?: boolean;

  /**
   * `onChange` is a utility for this controlled component to communicate to a
   * consuming component what kind of internal state changes are occurring.
   */
  onChange?(data: OnChangeData<ItemType>): void;

  /**
   * Whether or not the Dropdown is readonly
   */
  readOnly?: boolean;

  /**
   * An optional callback to render the currently selected item as a react element instead of only
   * as a string.
   */
  renderSelectedItem?(item: ItemType): string;

  /**
   * In the case you want to control the dropdown selection entirely.
   */
  selectedItem?: ItemType;

  /**
   * Specify the size of the ListBox. Currently supports either `sm`, `md` or `lg` as an option.
   */
  size?: ListBoxSize;

  /**
   * Provide the title text that will be read by a screen reader when
   * visiting this control
   */
  titleText?: React.ReactNode;

  /**
   * Callback function for translating ListBoxMenuIcon SVG title
   */
  translateWithId?(messageId: string, args?: Record<string, unknown>): string;

  /**
   * The dropdown type, `default` or `inline`
   */
  type?: ListBoxType;

  /**
   * Specify whether the control is currently in warning state
   */
  warn?: boolean;

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText?: React.ReactNode;
}

const Dropdown = React.forwardRef(
  <ItemType,>(
    {
      className: containerClassName,
      disabled,
      direction,
      items,
      label,
      ['aria-label']: ariaLabel,
      ariaLabel: deprecatedAriaLabel,
      itemToString = defaultItemToString,
      itemToElement,
      renderSelectedItem,
      type,
      size,
      onChange,
      id,
      titleText,
      hideLabel,
      helperText,
      translateWithId,
      light,
      invalid,
      invalidText,
      warn,
      warnText,
      initialSelectedItem,
      selectedItem: controlledSelectedItem,
      downshiftProps,
      readOnly,
      ...other
    }: DropdownProps<ItemType>,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const prefix = usePrefix();
    const { isFluid } = useContext(FormContext);
    const selectProps: UseSelectProps<ItemType> = {
      ...downshiftProps,
      items,
      itemToString,
      initialSelectedItem,
      onSelectedItemChange,
    };
    const { current: dropdownInstanceId } = useRef(getInstanceId());

    // only set selectedItem if the prop is defined. Setting if it is undefined
    // will overwrite default selected items from useSelect
    if (controlledSelectedItem !== undefined) {
      selectProps.selectedItem = controlledSelectedItem;
    }

    const {
      isOpen,
      getToggleButtonProps,
      getLabelProps,
      getMenuProps,
      getItemProps,
      highlightedIndex,
      selectedItem,
    } = useSelect(selectProps);
    const inline = type === 'inline';
    const showWarning = !invalid && warn;

    const [isFocused, setIsFocused] = useState(false);

    const className = cx(`${prefix}--dropdown`, {
      [`${prefix}--dropdown--invalid`]: invalid,
      [`${prefix}--dropdown--warning`]: showWarning,
      [`${prefix}--dropdown--open`]: isOpen,
      [`${prefix}--dropdown--inline`]: inline,
      [`${prefix}--dropdown--disabled`]: disabled,
      [`${prefix}--dropdown--light`]: light,
      [`${prefix}--dropdown--readonly`]: readOnly,
      [`${prefix}--dropdown--${size}`]: size,
      [`${prefix}--list-box--up`]: direction === 'top',
    });

    const titleClasses = cx(`${prefix}--label`, {
      [`${prefix}--label--disabled`]: disabled,
      [`${prefix}--visually-hidden`]: hideLabel,
    });

    const helperClasses = cx(`${prefix}--form__helper-text`, {
      [`${prefix}--form__helper-text--disabled`]: disabled,
    });

    const wrapperClasses = cx(
      `${prefix}--dropdown__wrapper`,
      `${prefix}--list-box__wrapper`,
      containerClassName,
      {
        [`${prefix}--dropdown__wrapper--inline`]: inline,
        [`${prefix}--list-box__wrapper--inline`]: inline,
        [`${prefix}--dropdown__wrapper--inline--invalid`]: inline && invalid,
        [`${prefix}--list-box__wrapper--inline--invalid`]: inline && invalid,
        [`${prefix}--list-box__wrapper--fluid--invalid`]: isFluid && invalid,
        [`${prefix}--list-box__wrapper--fluid--focus`]:
          isFluid && isFocused && !isOpen,
      }
    );

    const helperId = !helperText
      ? undefined
      : `dropdown-helper-text-${dropdownInstanceId}`;

    // needs to be Capitalized for react to render it correctly
    const ItemToElement = itemToElement;
    const toggleButtonProps = getToggleButtonProps();
    const helper =
      helperText && !isFluid ? (
        <div id={helperId} className={helperClasses}>
          {helperText}
        </div>
      ) : null;

    function onSelectedItemChange({
      selectedItem,
    }: Partial<UseSelectState<ItemType>>) {
      setIsFocused(false);
      if (onChange) {
        onChange({ selectedItem: selectedItem ?? null });
      }
    }

    const menuItemOptionRefs = useRef(items.map((_) => React.createRef()));

    const handleFocus = (evt: FocusEvent<HTMLDivElement>) => {
      setIsFocused(evt.type === 'focus' ? true : false);
    };

    const mergedRef = mergeRefs(toggleButtonProps.ref, ref);

    const readOnlyEventHandlers = readOnly
      ? {
          onClick: (evt: MouseEvent<HTMLButtonElement>) => {
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

    return (
      <div className={wrapperClasses} {...other}>
        {titleText && (
          <label className={titleClasses} {...getLabelProps()}>
            {titleText}
          </label>
        )}
        <ListBox
          onFocus={handleFocus}
          onBlur={handleFocus}
          aria-label={deprecatedAriaLabel || ariaLabel}
          size={size}
          className={className}
          invalid={invalid}
          invalidText={invalidText}
          warn={warn}
          warnText={warnText}
          light={light}
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
          <button
            type="button"
            // aria-expanded is already being passed through {...toggleButtonProps}
            role="combobox" // eslint-disable-line jsx-a11y/role-has-required-aria-props
            aria-controls={getMenuProps().id}
            className={`${prefix}--list-box__field`}
            disabled={disabled}
            aria-disabled={readOnly ? true : undefined} // aria-disabled to remain focusable
            aria-describedby={
              !inline && !invalid && !warn && helper ? helperId : undefined
            }
            title={
              selectedItem && itemToString !== undefined
                ? itemToString(selectedItem)
                : label
            }
            {...toggleButtonProps}
            {...readOnlyEventHandlers}
            ref={mergedRef}>
            <span className={`${prefix}--list-box__label`}>
              {selectedItem
                ? renderSelectedItem
                  ? renderSelectedItem(selectedItem)
                  : itemToString(selectedItem)
                : label}
            </span>
            <ListBox.MenuIcon
              isOpen={isOpen}
              translateWithId={translateWithId}
            />
          </button>
          <ListBox.Menu {...getMenuProps()}>
            {isOpen &&
              items.map((item, index) => {
                const isObject = item !== null && typeof item === 'object';
                const disabled =
                  isObject && 'disabled' in item && item.disabled === true;
                const itemProps = getItemProps({
                  item,
                  index,
                  disabled,
                });
                const title =
                  isObject && 'text' in item && itemToElement
                    ? item.text
                    : itemToString(item);
                return (
                  <ListBox.MenuItem
                    key={itemProps.id}
                    isActive={selectedItem === item}
                    isHighlighted={
                      highlightedIndex === index || selectedItem === item
                    }
                    title={title}
                    ref={{
                      menuItemOptionRef: menuItemOptionRefs.current[index],
                    }}
                    {...itemProps}>
                    {typeof item === 'object' &&
                    ItemToElement !== undefined &&
                    ItemToElement !== null ? (
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
              })}
          </ListBox.Menu>
        </ListBox>
        {!inline && !invalid && !warn && helper}
      </div>
    );
  }
);

type DropdownComponentProps<ItemType> = React.PropsWithoutRef<
  React.PropsWithChildren<DropdownProps<ItemType>> &
    React.RefAttributes<HTMLButtonElement>
>;

interface DropdownComponent {
  <ItemType>(
    props: DropdownComponentProps<ItemType>
  ): React.ReactElement | null;
}

Dropdown.displayName = 'Dropdown';
Dropdown.propTypes = {
  /**
   * 'aria-label' of the ListBox component.
   * Specify a label to be read by screen readers on the container node
   */
  ['aria-label']: PropTypes.string,

  /**
   * Deprecated, please use `aria-label` instead.
   * Specify a label to be read by screen readers on the container note.
   */
  ariaLabel: deprecate(
    PropTypes.string,
    'This prop syntax has been deprecated. Please use the new `aria-label`.'
  ),

  /**
   * Provide a custom className to be applied on the bx--dropdown node
   */
  className: PropTypes.string,

  /**
   * Specify the direction of the dropdown. Can be either top or bottom.
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
    'The `light` prop for `Dropdown` has ' +
      'been deprecated in favor of the new `Layer` component. It will be removed in the next major release.'
  ),

  /**
   * `onChange` is a utility for this controlled component to communicate to a
   * consuming component what kind of internal state changes are occurring.
   */
  onChange: PropTypes.func,

  /**
   * Whether or not the Dropdown is readonly
   */
  readOnly: PropTypes.bool,

  /**
   * An optional callback to render the currently selected item as a react element instead of only
   * as a string.
   */
  renderSelectedItem: PropTypes.func,

  /**
   * In the case you want to control the dropdown selection entirely.
   */
  selectedItem: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number,
  ]),

  /**
   * Specify the size of the ListBox. Currently supports either `sm`, `md` or `lg` as an option.
   */
  size: ListBoxPropTypes.ListBoxSize,

  /**
   * Provide the title text that will be read by a screen reader when
   * visiting this control
   */
  titleText: PropTypes.node.isRequired,

  /**
   * Callback function for translating ListBoxMenuIcon SVG title
   */
  translateWithId: PropTypes.func,

  /**
   * The dropdown type, `default` or `inline`
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

Dropdown.defaultProps = {
  disabled: false,
  type: 'default',
  itemToString: defaultItemToString,
  itemToElement: null,
  titleText: '',
  helperText: '',
  direction: 'bottom',
} as DropdownProps<unknown>;

export default Dropdown as DropdownComponent;
