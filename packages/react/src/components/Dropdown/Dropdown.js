import React from 'react';
import { useSelect } from 'downshift';
import { settings } from 'carbon-components';
import cx from 'classnames';
import PropTypes from 'prop-types';
import ListBox, { PropTypes as ListBoxPropTypes } from '../ListBox';
import { Checkmark16, WarningFilled16 } from '@carbon/icons-react';

const { prefix } = settings;

const defaultItemToString = item => {
  if (typeof item === 'string') {
    return item;
  }

  return item ? item.label : '';
};

Dropdown.propTypes = {
  /**
   * Disable the control
   */
  disabled: PropTypes.bool,

  /**
   * We try to stay as generic as possible here to allow individuals to pass
   * in a collection of whatever kind of data structure they prefer
   */
  items: PropTypes.array.isRequired,

  /**
   * Allow users to pass in an arbitrary item or a string (in case their items are an array of strings)
   * from their collection that are pre-selected
   */
  initialSelectedItem: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),

  /**
   * Specify a custom `id`
   */
  id: PropTypes.string.isRequired,

  /**
   * Specify whether you want the inline version of this control
   */
  inline: PropTypes.bool,

  /**
   * Specify if the currently selected value is invalid.
   */
  invalid: PropTypes.bool,

  /**
   * Message which is displayed if the value is invalid.
   */
  invalidText: PropTypes.string,

  /**
   * Helper function passed to downshift that allows the library to render a
   * given item to a string label. By default, it extracts the `label` field
   * from a given item to serve as the item label in the list.
   */
  itemToString: PropTypes.func,

  /**
   * Function to render items as custom components instead of strings.
   * Defaults to null and is overriden by a getter
   */
  itemToElement: PropTypes.func,

  /**
   * `onChange` is a utility for this controlled component to communicate to a
   * consuming component what kind of internal state changes are occuring.
   */
  onChange: PropTypes.func,

  /**
   * Generic `label` that will be used as the textual representation of what
   * this field is for
   */
  label: PropTypes.node.isRequired,

  /**
   * Callback function for translating ListBoxMenuIcon SVG title
   */
  translateWithId: PropTypes.func,

  /**
   * 'aria-label' of the ListBox component.
   */
  ariaLabel: PropTypes.string,

  /**
   * The dropdown type, `default` or `inline`
   */
  type: ListBoxPropTypes.ListBoxType,

  /**
   * Specify the size of the ListBox. Currently supports either `sm`, `lg` or `xl` as an option.
   */
  size: ListBoxPropTypes.ListBoxSize,

  /**
   * In the case you want to control the dropdown selection entirely.
   */
  selectedItem: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),

  /**
   * `true` to use the light version.
   */
  light: PropTypes.bool,

  /**
   * Provide the title text that will be read by a screen reader when
   * visiting this control
   */
  titleText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

  /**
   * Provide helper text that is used alongside the control label for
   * additional help
   */
  helperText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
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
    //initialSelectedItem,
    // selectedItem,
    id,
    titleText,
    helperText,
    translateWithId,
    light,
    invalid,
    invalidText,
    // mapDownshiftProps
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

  // needs to be Capitalized for react to render it correctly
  const ItemToElement = itemToElement;

  const handleOnChange = ({ onChange }, selectedItem) => {
    console.log('checking checking');
    if (onChange) {
      props.onChange({ selectedItem });
    }
  };

  return (
    <div className={wrapperClasses}>
      {titleText ? (
        <label className={titleClasses} {...getLabelProps()}>
          {titleText}
        </label>
      ) : null}
      {helperText ? <div className={helperClasses}>{helperText}</div> : null}
      <ListBox
        onChange={handleOnChange}
        //itemToString={itemToString}
        //initialSelectedItem={initialSelectedItem}
        aria-label={ariaLabel}
        type={type}
        size={size}
        className={className({ isOpen })}
        invalid={invalid}
        invalidText={invalidText}
        light={light}
        isOpen={isOpen}>
        {invalid && (
          <WarningFilled16 className={`${prefix}--list-box__invalid-icon`} />
        )}
        <button
          id={id}
          className={`${prefix}--list-box__field`}
          disabled={disabled}
          aria-disabled={disabled}
          {...getToggleButtonProps()}>
          <span className={`${prefix}--list-box__label`}>
            {selectedItem ? itemToString(selectedItem) : label}
          </span>
          <ListBox.MenuIcon isOpen={isOpen} translateWithId={translateWithId} />
        </button>
        <ListBox.Menu {...getMenuProps()}>
          {isOpen &&
            items.map((item, index) => {
              const itemProps = getItemProps({ item, index });
              return (
                <ListBox.MenuItem
                  selectedItem={selectedItem}
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
  size: 'lg',
};
