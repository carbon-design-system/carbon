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
import { AriaLabelPropType } from '../../prop-types/AriaPropTypes';

const { prefix } = settings;

const TableToolbar = ({ children, size, ...rest }) => {
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
   * `normal` Change the row height of table
   * V11: remove small, normal
   */
  size: PropTypes.oneOf(['small', 'sm', 'normal', 'lg']),
};

TableToolbar.defaultProps = {
  'aria-label': 'data table toolbar',
};

export default TableToolbar;
