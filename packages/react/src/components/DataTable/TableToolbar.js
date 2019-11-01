/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';
import { AriaLabelPropType } from '../../prop-types/AriaPropTypes';

const { prefix } = settings;

const TableToolbar = ({ children, ...rest }) => (
  <section {...rest} className={`${prefix}--table-toolbar`}>
    {children}
  </section>
);

TableToolbar.propTypes = {
  /**
   * Pass in the children that will be rendered inside the TableToolbar
   */
  children: PropTypes.node,

  /**
   * Required props for the accessibility label of the TableToolbar
   */
  ...AriaLabelPropType,
};

TableToolbar.defaultProps = {
  'aria-label': 'data table toolbar',
};

export default TableToolbar;
