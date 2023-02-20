/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { usePrefix } from '../../internal/usePrefix';
import { useMergedRefs } from '../../internal/useMergedRefs';

/** @type any */
const InlineCheckbox = React.forwardRef(function InlineCheckbox(
  props,
  forwardRef
) {
  const {
    ariaLabel,
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
  const inputRef = useRef(null);
  const ref = useMergedRefs([inputRef, forwardRef]);
  const inputProps = {
    checked,
    className: `${prefix}--checkbox`,
    disabled,
    id,
    name,
    onClick,
    onChange: (evt) => {
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
    inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <div className={`${prefix}--checkbox--inline`}>
      <input {...inputProps} />
      {
        /* eslint-disable jsx-a11y/label-has-for,jsx-a11y/label-has-associated-control,jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */
        <label
          htmlFor={id}
          className={`${prefix}--checkbox-label`}
          aria-label={ariaLabel}
          title={title}
          onClick={(evt) => {
            evt.stopPropagation();
          }}
        />
      }
    </div>
  );
});

InlineCheckbox.propTypes = {
  /**
   * Specify the label for the control
   */
  ariaLabel: PropTypes.string.isRequired,

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
