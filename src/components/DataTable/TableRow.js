/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash.omit';
import cx from 'classnames';
import { settings } from 'carbon-components';

const { prefix } = settings;

const TableRow = props => {
  // Remove unnecessary props if provided to this component, these are
  // only useful in `TableExpandRow`
  const className = cx(props.className, {
    [`${prefix}--data-table--selected`]: props.isSelected,
  });
  const cleanProps = {
    ...omit(props, ['ariaLabel', 'onExpand', 'isExpanded', 'isSelected']),
    className: className || undefined,
  };
  return <tr {...cleanProps} />;
};

TableRow.propTypes = {
  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,
};

export default TableRow;
