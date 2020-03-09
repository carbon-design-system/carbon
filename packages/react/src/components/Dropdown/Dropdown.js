import React from 'react';
import { useSelect } from 'downshift';
import { settings } from 'carbon-components';
import cx from 'classnames';
import ListBox from '../ListBox';
import { Checkmark16, WarningFilled16 } from '@carbon/icons-react';

const { prefix } = settings;

const defaultItemToString = item => {
  if (typeof item === 'string') {
    return item;
  }

  return item ? item.label : '';
};

export default function Dropdown(props) {
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
    translateWithId,
    initialSelectedItem,
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

  const handleOnChange = selectedItem => {
    if (props.onChange) {
      props.onChange({ selectedItem });
    }
  };

  return (
    <div className={wrapperClasses}>
      <DropdownLabel
        className={titleClasses}
        titleText={titleText}
        {...getLabelProps()}>
        <DropdownHelper id={helperId} className={helperClasses}>
          {helperText}
        </DropdownHelper>
        <ListBox
          onChange={handleOnChange}
          itemToString={itemToString}
          initialSelectedItem={initialSelectedItem}
          aria-label={ariaLabel}
          type={type}
          size={size}
          className={className({ isOpen })}
          invalid={invalid}
          invalidText={invalidText}
          light={light}
          selectedItem={selectedItem}
          isOpen={isOpen}>
          {invalid && (
            <WarningFilled16 className={`${prefix}--list-box__invalid-icon`} />
          )}
          <button
            id={id}
            disabled={disabled}
            aria-disabled={disabled}
            {...getToggleButtonProps()}>
            <span className={`${prefix}--list-box__label`}>
              {selectedItem ? itemToString(selectedItem) : label}
            </span>
            <ListBox.MenuIcon
              isOpen={isOpen}
              translateWithId={translateWithId}
            />
          </button>
          <ListBox.Menu {...getMenuProps()}>
            {isOpen &&
              items.map((item, index) => {
                const itemProps = getItemProps({ item, index });
                return (
                  <ListBox.MenuItem
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
                  </ListBox.MenuItem>
                );
              })}
          </ListBox.Menu>
        </ListBox>
      </DropdownLabel>
    </div>
  );
}

const DropdownLabel = props => {
  const { children, titleText, ...rest } = props;
  return titleText ? (
    <label {...rest}>
      {titleText}
      {children}
    </label>
  ) : (
    <>{children}</>
  );
};

const DropdownHelper = ({ children, ...rest }) => (
  <div {...rest}>{children}</div>
);

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
