import PropTypes from 'prop-types';
import React from 'react';

const InlineCheckbox = ({
  id,
  checked,
  ariaLabel,
  name,
  onClick,
  onKeyDown,
}) => (
  <React.Fragment>
    <input
      id={id}
      className="bx--checkbox"
      type="checkbox"
      name={name}
      checked={checked}
      onClick={onClick}
      onKeyDown={onKeyDown}
    />
    <label htmlFor={id} className="bx--checkbox-label" aria-label={ariaLabel} />
  </React.Fragment>
);

InlineCheckbox.propTypes = {
  /**
   * Provide an `id` for the underlying input control
   */
  id: PropTypes.string.isRequired,

  /**
   * Provide a `name` for the underlying input control
   */
  name: PropTypes.string.isRequired,

  /**
   * Specify the label for the control
   */
  ariaLabel: PropTypes.string.isRequired,

  /**
   * Provide a handler that is invoked when a user clicks on the control
   */
  onClick: PropTypes.func,

  /**
   * Provide a handler that is invoked on the key down event for the control
   */
  onKeyDown: PropTypes.func,

  /**
   * Specify whether the underlying control is checked, or not
   */
  checked: PropTypes.bool.isRequired,
};

export default InlineCheckbox;
