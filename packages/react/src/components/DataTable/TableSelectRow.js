/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { settings } from 'carbon-components';
import InlineCheckbox from '../InlineCheckbox';
import RadioButton from '../RadioButton';

const { prefix } = settings;
const TableSelectRow = ({
  ariaLabel,
  checked,
  id,
  name,
  onSelect,
  onChange,
  disabled,
  radio,
  className,
}) => {
  const selectionInputProps = {
    id,
    name,
    onClick: onSelect,
    onChange,
    checked,
    disabled,
  };
  const InlineInputComponent = radio ? RadioButton : InlineCheckbox;
  const tableSelectRowClasses = classNames(`${prefix}--table-column-checkbox`, {
    [className]: className,
    [`${prefix}--table-column-radio`]: radio,
  });
  return (
    <td className={tableSelectRowClasses}>
      <InlineInputComponent
        {...selectionInputProps}
        {...(radio && {
          labelText: ariaLabel,
          hideLabel: true,
        })}
        {...(!radio && { ariaLabel })}
      />
    </td>
  );
};
TableSelectRow.propTypes = {
  /**
   * Specify the aria label for the underlying input control
   */
  ariaLabel: PropTypes.string.isRequired,

  /**
   * Specify whether all items are selected, or not
   */
  checked: PropTypes.bool.isRequired,

  /**
   * The CSS class names of the cell that wraps the underlying input control
   */
  className: PropTypes.string,

  /**
   * Specify whether the control is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Provide an `id` for the underlying input control
   */
  id: PropTypes.string.isRequired,

  /**
   * Provide a `name` for the underlying input control
   */
  name: PropTypes.string.isRequired,

  /**
   * Provide an optional hook that is called each time the input is updated
   */
  onChange: PropTypes.func,

  /**
   * Provide a handler to listen to when a user initiates a selection request
   */
  onSelect: PropTypes.func.isRequired,

  /**
   * Specify whether the control should be a radio button or inline checkbox
   */
  radio: PropTypes.bool,
};

export default TableSelectRow;
