/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import deprecate from '../../prop-types/deprecate';
import { usePrefix } from '../../internal/usePrefix';
import { useMergedRefs } from '../../internal/useMergedRefs';

export interface InlineCheckboxProps {
  /*
   * Specify the label for the control
   */
  'aria-label': string;

  /**
   * Deprecated, please use `aria-label` instead.
   * Specify the label for the control
   */
  ariaLabel?: string;

  /**
   * Specify whether the underlying control is checked,
   * or not
   * @default false
   * */
  checked?: boolean;

  /**
   * Specify whether the underlying input control should be disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Provide an `id` for the underlying input control
   */
  id: string;

  /**
   * Specify whether the control is in an indeterminate state
   */
  indeterminate?: boolean;

  /**
   * Provide a `name` for the underlying input control
   */
  name: string;

  /**
   * Provide an optional hook that is called each time the input is updated
   */
  onChange?: (
    checked: boolean,
    id: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;

  /**
   * Provide a handler that is invoked when a user clicks on the control
   */
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;

  /**
   * Provide a handler that is invoked on the key down event for the control
   */
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;

  /**
   * Provide an optional tooltip for the InlineCheckbox
   */
  title?: string;
}

const InlineCheckbox = React.forwardRef<HTMLInputElement, InlineCheckboxProps>(
  function InlineCheckbox(props, forwardRef) {
    const {
      ['aria-label']: ariaLabel,
      ariaLabel: deprecatedAriaLabel,
      checked = false,
      disabled,
      id,
      indeterminate,
      name,
      onChange = () => {},
      onClick,
      onKeyDown,
      title,
    } = props;
    const prefix = usePrefix();
    const inputRef = useRef<HTMLInputElement>(null);
    const ref = useMergedRefs([inputRef, forwardRef]);

    const inputProps: React.InputHTMLAttributes<HTMLInputElement> & {
      ref: React.Ref<HTMLInputElement>;
    } = {
      checked,
      className: `${prefix}--checkbox`,
      disabled,
      id,
      name,
      onClick: onClick ? onClickCheckBoxInput : onClick,
      onChange: (evt: React.ChangeEvent<HTMLInputElement>) => {
        onChange(evt.target.checked, id, evt);
      },
      onKeyDown,
      ref,
      type: 'checkbox',
    };

    if (indeterminate) {
      inputProps.checked = false;
    }

    useEffect(() => {
      if (inputRef?.current) {
        inputRef.current.indeterminate = indeterminate || false;
      }
    }, [indeterminate]);

    function onClickCheckBoxInput(evt: React.MouseEvent<HTMLInputElement>) {
      if (indeterminate) {
        (evt.target as HTMLInputElement).checked = false;
      }
      onClick?.(evt);
    }

    return (
      <div className={`${prefix}--checkbox--inline`}>
        <input {...inputProps} />
        {
          /* eslint-disable jsx-a11y/label-has-for,jsx-a11y/label-has-associated-control,jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */
          <label
            htmlFor={id}
            className={`${prefix}--checkbox-label`}
            title={title}
            onClick={(evt: React.MouseEvent) => {
              evt.stopPropagation();
            }}>
            <span className={`${prefix}--visually-hidden`}>
              {deprecatedAriaLabel || ariaLabel}
            </span>
          </label>
        }
      </div>
    );
  }
);

InlineCheckbox.propTypes = {
  /**
   * Specify the label for the control
   */
  ['aria-label']: PropTypes.string.isRequired,

  /**
   * Deprecated, please use `aria-label` instead.
   * Specify the label for the control
   */
  ariaLabel: deprecate(
    PropTypes.string.isRequired,
    'The `ariaLabel` prop has been deprecated in favor of `aria-label`. This prop will be removed in the next major release.'
  ),

  /**
   * Specify whether the underlying control is checked, or not
   */
  checked: PropTypes.bool,

  /**
   * Specify whether the underlying input control should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Provide an `id` for the underlying input control
   */
  id: PropTypes.string.isRequired,

  /**
   * Specify whether the control is in an indterminate state
   */
  indeterminate: PropTypes.bool,

  /**
   * Provide a `name` for the underlying input control
   */
  name: PropTypes.string.isRequired,

  /**
   * Provide an optional hook that is called each time the input is updated
   */
  onChange: PropTypes.func,

  /**
   * Provide a handler that is invoked when a user clicks on the control
   */
  onClick: PropTypes.func,

  /**
   * Provide a handler that is invoked on the key down event for the control
   */
  onKeyDown: PropTypes.func,

  /**
   * Provide an optional tooltip for the InlineCheckbox
   */
  title: PropTypes.string,
};

export default InlineCheckbox;
