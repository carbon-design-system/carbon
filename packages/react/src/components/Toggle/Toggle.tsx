/**
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  type KeyboardEventHandler,
  type MouseEventHandler,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useControllableState } from '../../internal/useControllableState';
import { usePrefix } from '../../internal/usePrefix';
import { Text } from '../Text';

type ExcludedAttributes =
  | 'aria-labelledby'
  | 'aria-checked'
  | 'type'
  | 'role'
  | 'id'
  | 'size'
  | 'onClick';

export interface ToggleProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    ExcludedAttributes
  > {
  /**
   * Specify another element's id to be used as the label for this toggle
   */
  'aria-labelledby'?: string;

  /**
   * Provide an id that unique represents the underlying `<button>`
   */

  id: string;

  /**
   * Specify the label for the "off" position
   */
  labelA?: string;

  /**
   * Specify the label for the "on" position
   */
  labelB?: string;

  /**
   * Provide the text that will be read by a screen reader when visiting this
   * control. This should be provided unless 'aria-labelledby' is set instead
   * or you use an external <label> element with its "for" attribute set to the
   * toggle's id.
   */
  labelText?: string;

  /**
   * If true, the side labels (props.labelA and props.labelB) will be replaced by
   * props.labelText (if passed), so that the toggle doesn't render a top label.
   */
  hideLabel?: boolean;

  /**
   * Provide an event listener that is called when the control is toggled
   */
  onClick?:
    | MouseEventHandler<HTMLDivElement>
    | KeyboardEventHandler<HTMLDivElement>;

  /**
   * Provide an event listener that is called when the control is toggled
   */
  onToggle?(checked: boolean): void;

  /**
   * Specify the size of the Toggle. Currently only supports 'sm' or 'md' (default)
   */
  size?: 'sm' | 'md';

  /**
   * Whether the toggle should be read-only
   */
  readOnly?: boolean;

  /**
   * Specify whether the toggle should be on by default
   */
  defaultToggled?: boolean;

  /**
   * Specify whether the control is toggled
   */
  toggled?: boolean;
}

export function Toggle({
  'aria-labelledby': ariaLabelledby,
  className,
  defaultToggled = false,
  disabled = false,
  hideLabel = false,
  id,
  labelA = 'Off',
  labelB = 'On',
  labelText,
  onClick,
  onToggle,
  readOnly,
  size = 'md',
  toggled,
  ...other
}: ToggleProps) {
  const prefix = usePrefix();
  const buttonElement = useRef<HTMLButtonElement>(null);
  const [checked, setChecked] = useControllableState({
    value: toggled,
    onChange: onToggle,
    defaultValue: defaultToggled,
  });

  function handleClick(e) {
    if (!readOnly) {
      setChecked(!checked);
    }
    if (onClick) {
      onClick(e);
    }
  }

  const isSm = size === 'sm';
  const sideLabel = hideLabel ? labelText : checked ? labelB : labelA;
  const renderSideLabel = !(hideLabel && !labelText);
  const LabelComponent = labelText ? 'label' : 'div';

  const wrapperClasses = classNames(
    `${prefix}--toggle`,
    {
      [`${prefix}--toggle--disabled`]: disabled,
      [`${prefix}--toggle--readonly`]: readOnly,
    },
    className
  );

  const labelTextClasses = classNames(`${prefix}--toggle__label-text`, {
    [`${prefix}--visually-hidden`]: hideLabel,
  });

  const appearanceClasses = classNames(`${prefix}--toggle__appearance`, {
    [`${prefix}--toggle__appearance--sm`]: isSm,
  });

  const switchClasses = classNames(`${prefix}--toggle__switch`, {
    [`${prefix}--toggle__switch--checked`]: checked,
  });

  const labelId = `${id}_label`;

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={wrapperClasses}
      onClick={
        !labelText
          ? (e) => {
              // the underlying <button> can only be activated by keyboard as it is visually hidden;
              // therefore, if this event's target is the <button>, it had to be triggered by
              // the keyboard event which already calls handleClick. if we wouldn't catch this, the
              // onClick and onToggle functions would be called twice whenever the user activates the
              // toggle by keyboard and props['aria-labelledby'] is passed.
              if (
                buttonElement.current &&
                e.target !== buttonElement.current &&
                !disabled
              ) {
                handleClick(e);
                buttonElement.current.focus();
              }
            }
          : undefined
      }>
      <button
        {...other}
        ref={buttonElement}
        id={id}
        className={`${prefix}--toggle__button`}
        role="switch"
        type="button"
        aria-checked={checked}
        aria-labelledby={ariaLabelledby ?? labelId}
        disabled={disabled}
        onClick={handleClick}
      />
      <LabelComponent
        id={labelId}
        htmlFor={ariaLabelledby ? undefined : id}
        className={`${prefix}--toggle__label`}>
        {labelText && <Text className={labelTextClasses}>{labelText}</Text>}
        <div className={appearanceClasses}>
          <div className={switchClasses}>
            {isSm && (
              <svg
                className={`${prefix}--toggle__check`}
                width="6px"
                height="5px"
                viewBox="0 0 6 5">
                <path d="M2.2 2.7L5 0 6 1 2.2 5 0 2.7 1 1.5z" />
              </svg>
            )}
          </div>
          {renderSideLabel && (
            <Text className={`${prefix}--toggle__text`} aria-hidden="true">
              {sideLabel}
            </Text>
          )}
        </div>
      </LabelComponent>
    </div>
  );
}

Toggle.propTypes = {
  /**
   * Specify another element's id to be used as the label for this toggle
   */
  'aria-labelledby': PropTypes.string,

  /**
   * Specify a custom className to apply to the form-item node
   */
  className: PropTypes.string,

  /**
   * Specify whether the toggle should be on by default
   */
  defaultToggled: PropTypes.bool,

  /**
   * Whether this control should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * If true, the side labels (props.labelA and props.labelB) will be replaced by
   * props.labelText (if passed), so that the toggle doesn't render a top label.
   */
  hideLabel: PropTypes.bool,

  /**
   * Provide an id that unique represents the underlying `<button>`
   */
  id: PropTypes.string.isRequired,

  /**
   * Specify the label for the "off" position
   */
  labelA: PropTypes.node,

  /**
   * Specify the label for the "on" position
   */
  labelB: PropTypes.node,

  /**
   * Provide the text that will be read by a screen reader when visiting this
   * control. This should be provided unless 'aria-labelledby' is set instead
   * or you use an external <label> element with its "for" attribute set to the
   * toggle's id.
   */
  labelText: PropTypes.string,

  /**
   * Provide an event listener that is called when the control is clicked
   */
  onClick: PropTypes.func,

  /**
   * Provide an event listener that is called when the control is toggled
   */
  onToggle: PropTypes.func,

  /**
   * Whether the toggle should be read-only
   */
  readOnly: PropTypes.bool,

  /**
   * Specify the size of the Toggle. Currently only supports 'sm' or 'md' (default)
   */
  size: PropTypes.oneOf(['sm', 'md']),

  /**
   * Specify whether the control is toggled
   */
  toggled: PropTypes.bool,
};

export default Toggle;
