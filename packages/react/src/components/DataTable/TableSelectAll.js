/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import InlineCheckbox from '../InlineCheckbox';
import cx from 'classnames';

import { settings } from 'carbon-components';

const { prefix } = settings;

const TableSelectAll = ({
  ariaLabel,
  checked,
  id,
  indeterminate,
  name,
  onSelect,
  disabled,
  className,
  tooltipText,
}) => (
  <th scope="col" className={cx(`${prefix}--table-column-checkbox`, className)}>
    <div className={cx({ [`${prefix}--tooltip--definition`]: tooltipText })}>
      <div className={`${prefix}--tooltip__trigger`}>
        <InlineCheckbox
          ariaLabel={ariaLabel}
          checked={checked}
          id={id}
          indeterminate={indeterminate}
          name={name}
          onClick={onSelect}
          disabled={disabled}
        />
      </div>
      <div className={`${prefix}--tooltip--definition__bottom`}>
        <span className={`${prefix}--tooltip__caret`}></span>
        <p>{tooltipText}</p>
      </div>
    </div>
  </th>
);

TableSelectAll.propTypes = {
  /**
   * Specify the aria label for the underlying input control
   */
  ariaLabel: PropTypes.string.isRequired,

  /**
   * Specify whether all items are selected, or not
   */
  checked: PropTypes.bool.isRequired,

  /**
   * Provide an `id` for the underlying input control
   */
  id: PropTypes.string.isRequired,

  /**
   * Specify whether the selection only has a subset of all items
   */
  indeterminate: PropTypes.bool,

  /**
   * Provide a `name` for the underlying input control
   */
  name: PropTypes.string.isRequired,

  /**
   * Provide a handler to listen to when a user initiates a selection request
   */
  onSelect: PropTypes.func.isRequired,

  /**
   * The CSS class names of the cell that wraps the underlying input control
   */
  className: PropTypes.string,

  /**
   * Tooltip for Select All Checkbox.
   */
  tooltipText: PropTypes.string,
};

TableSelectAll.defaultProps = {
  ariaLabel: 'Select all rows in the table',
};

export default TableSelectAll;
