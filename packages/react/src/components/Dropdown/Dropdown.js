import React from 'react';
import { useSelect } from 'downshift';
import { settings } from 'carbon-components';
import cx from 'classnames';
import { Checkmark16, WarningFilled16 } from '@carbon/icons-react';

const { prefix } = settings;

const defaultItemToString = item => {
  if (typeof item === 'string') {
    return item;
  }

  return item ? item.label : '';
};

export default function Dropdown(props) {
  /**
   * JTBD
   * - translateWithId,
   * - initialSelectedItem,
   */
  const {
    className: containerClassName,
    disabled,
    items,
    label,
    ariaLabel,
    itemToString,
    itemToElement,
    type,
    size,
    id,
    titleText,
    helperText,
    light,
    invalid,
    invalidText,
  } = props;

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getItemProps,
    highlightedIndex,
  } = useSelect({ items });

  const inline = type === 'inline';

  const className = ({ isOpen }) =>
    cx(`${prefix}--dropdown`, containerClassName, {
      [`${prefix}--dropdown--invalid`]: invalid,
      [`${prefix}--dropdown--open`]: isOpen,
      [`${prefix}--dropdown--inline`]: inline,
      [`${prefix}--dropdown--disabled`]: disabled,
      [`${prefix}--dropdown--light`]: light,
      [`${prefix}--dropdown--${size}`]: size,
    });

  const titleClasses = cx(`${prefix}--label`, {
    [`${prefix}--label--disabled`]: disabled,
  });

  const helperId =
    !id || !helperText ? undefined : `dropdown-helper-text-${id}`;

  const helperClasses = cx(`${prefix}--form__helper-text`, {
    [`${prefix}--form__helper-text--disabled`]: disabled,
  });

  const wrapperClasses = cx(
    `${prefix}--dropdown__wrapper`,
    `${prefix}--list-box__wrapper`,
    {
      [`${prefix}--dropdown__wrapper--inline`]: inline,
      [`${prefix}--list-box__wrapper--inline`]: inline,
      [`${prefix}--dropdown__wrapper--inline--invalid`]: inline && invalid,
      [`${prefix}--list-box__wrapper--inline--invalid`]: inline && invalid,
    }
  );

  const ItemToElement = itemToElement;

  return (
    <div className={wrapperClasses}>
      {titleText ? (
        <label
          {...getLabelProps}
          className={titleClasses}
          id={`dropdown-label-${id}`}>
          {titleText}
        </label>
      ) : null}
      {helperText ? (
        <div id={helperId} className={helperClasses}>
          {helperText}
        </div>
      ) : null}
      <button
        className={className({ isOpen })}
        invalid={invalid}
        invalidText={invalidText}
        disabled={disabled}
        aria-label={!titleText && ariaLabel}
        {...getToggleButtonProps()}>
        <span className={`${prefix}--list-box__label`}>
          {selectedItem ? itemToString(selectedItem) : label}
        </span>
      </button>
      {invalid && (
        <WarningFilled16 className={`${prefix}--list-box__invalid-icon`} />
      )}
      <ul
        size={size}
        {...getMenuProps}
        aria-labelledby={titleText && `dropdown-label-${id}`}>
        {isOpen &&
          items.map((item, index) => {
            const itemProps = getItemProps({ item, index });
            return (
              <li
                key={itemProps.id}
                isActive={selectedItem === item}
                isHighlighted={
                  highlightedIndex === index || selectedItem === item
                }
                title={itemToElement ? item.text : itemToString(item)}
                {...itemProps}>
                {itemToElement ? (
                  <ItemToElement key={itemProps.id} {...item} />
                ) : (
                  itemToString(item)
                )}
                {selectedItem === item && (
                  <Checkmark16
                    className={`${prefix}--list-box__menu-item__selected-icon`}
                  />
                )}
              </li>
            );
          })}
      </ul>
    </div>
  );
}

Dropdown.defaultProps = {
  disabled: false,
  type: 'default',
  itemToString: defaultItemToString,
  itemToElement: null,
  light: false,
  titleText: '',
  helperText: '',
  size: 'sm',
};
