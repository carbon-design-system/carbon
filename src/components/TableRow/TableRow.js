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

const { prefix } = settings;

const TableRow = props => {
  const { even, header, className, children, ...other } = props;

  const tableRowClasses = classNames(className, `${prefix}--table-row`, {
    [`${prefix}--parent-row`]: !header,
    [`${prefix}--parent-row--even`]: even,
  });

  return (
    <tr {...other} className={tableRowClasses}>
      {children}
    </tr>
  );
};

TableRow.propTypes = {
  /**
   * Specify whether your TableRow should be used as a header row
   */
  header: PropTypes.bool,

  /**
   * Specify an optional className to be applied to your TableRow
   */
  className: PropTypes.string,

  /**
   * Provide the contents of your TableRow
   */
  children: PropTypes.node,

  /**
   * Specify whether the TableRow is at an even position
   */
  even: PropTypes.bool,
};

TableRow.defaultProps = {
  header: false,
};

export default TableRow;
