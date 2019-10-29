/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';

const { prefix } = settings;

const TableToolbar = ({ ariaLabel, children }) => (
  <section aria-label={ariaLabel} className={`${prefix}--table-toolbar`}>
    {children}
  </section>
);

TableToolbar.propTypes = {
  /**
   * The `aria-label` attribute for the TableToolbar
   */
  ariaLabel: PropTypes.string,

  /**
   * Pass in the children that will be rendered inside the TableToolbar
   */
  children: PropTypes.node,
};

TableToolbar.defaultProps = {
  ariaLabel: 'data table toolbar',
};

export default TableToolbar;
