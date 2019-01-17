/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { settings } from 'carbon-components';

const { prefix } = settings;

export const Table = ({
  zebra,
  className,
  children,
  short,
  shouldShowBorder,
  ...other
}) => {
  const componentClass = cx(`${prefix}--data-table-v2`, className, {
    [`${prefix}--data-table-v2--zebra`]: zebra,
    [`${prefix}--data-table-v2--short`]: short,
    [`${prefix}--data-table-v2--no-border`]: !shouldShowBorder,
  });
  return (
    <table {...other} className={componentClass}>
      {children}
    </table>
  );
};

Table.propTypes = {
  /**
   * The CSS class names.
   */
  className: PropTypes.string,

  /**
   * `true` to add zebra striping.
   */
  zebra: PropTypes.bool,

  /**
   * `true` for short data table.
   */
  short: PropTypes.bool,

  /**
   * `true` for data table without borders.
   */
  shouldShowBorder: PropTypes.bool,
};

Table.defaultProps = {
  zebra: true,
  short: false,
  shouldShowBorder: true,
};

export default Table;
