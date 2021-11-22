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

const TableContainer = ({
  className,
  children,
  title,
  description,
  stickyHeader,
  useStaticWidth,
  ...rest
}) => {
  const tableContainerClasses = cx(
    className,
    `${prefix}--data-table-container`,
    {
      [`${prefix}--data-table--max-width`]: stickyHeader,
      [`${prefix}--data-table-container--static`]: useStaticWidth,
    }
  );

  return (
    <div {...rest} className={tableContainerClasses}>
      {title && (
        <div className={`${prefix}--data-table-header`}>
          <h4 className={`${prefix}--data-table-header__title`}>{title}</h4>
          <p className={`${prefix}--data-table-header__description`}>
            {description}
          </p>
        </div>
      )}
      {children}
    </div>
  );
};

TableContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  /**
   * Optional description text for the Table
   */
  description: PropTypes.node,

  /**
   * Specify whether the table should have a sticky header
   */
  stickyHeader: PropTypes.bool,

  /**
   * Provide a title for the Table
   */
  title: PropTypes.node,

  /**
   * If true, will use a width of 'fit-content' to match the inner table width
   */
  useStaticWidth: PropTypes.bool,
};

export default TableContainer;
