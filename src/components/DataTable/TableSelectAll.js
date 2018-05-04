import PropTypes from 'prop-types';
import React from 'react';
import InlineCheckbox from '../InlineCheckbox';

const TableSelectAll = ({
  ariaLabel,
  checked,
  id,
  indeterminate,
  name,
  onSelect,
}) => (
  <th scope="col">
    <InlineCheckbox
      ariaLabel={ariaLabel}
      checked={checked}
      id={id}
      indeterminate={indeterminate}
      name={name}
      onClick={onSelect}
    />
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
};

TableSelectAll.defaultProps = {
  ariaLabel: 'Select all rows in the table',
};

export default TableSelectAll;
