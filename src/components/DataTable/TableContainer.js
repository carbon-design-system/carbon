/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';

const { prefix } = settings;

const TableContainer = ({ className, children, title, ...rest }) => {
  const tableContainerClasses = cx(
    className,
    `${prefix}--data-table-v2-container`
  );
  return (
    <div {...rest} className={tableContainerClasses}>
      {title && <h4 className={`${prefix}--data-table-v2-header`}>{title}</h4>}
      {children}
    </div>
  );
};

TableContainer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  /**
   * Provide a title for the Table
   */
  title: PropTypes.node,
};

export default TableContainer;
