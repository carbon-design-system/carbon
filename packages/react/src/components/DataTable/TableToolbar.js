/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { AriaLabelPropType } from '../../prop-types/AriaPropTypes';
import { usePrefix } from '../../internal/usePrefix';

const TableToolbar = ({ children, size, ...rest }) => {
  const prefix = usePrefix();
  const className = cx({
    [`${prefix}--table-toolbar`]: true,
    [`${prefix}--table-toolbar--${size}`]: size,
  });
  return (
    <section {...rest} className={className}>
      {children}
    </section>
  );
};

TableToolbar.propTypes = {
  /**
   * Required props for the accessibility label of the TableToolbar
   */
  ...AriaLabelPropType,

  /**
   * Pass in the children that will be rendered inside the TableToolbar
   */
  children: PropTypes.node,

  /**
   * `lg` Change the row height of table
   */
  size: PropTypes.oneOf(['sm', 'lg']),
};

TableToolbar.defaultProps = {
  'aria-label': 'data table toolbar',
};

export default TableToolbar;
