/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';

const TableBody = ({ children, className, ...rest }) => (
  <tbody className={className} {...rest}>
    {children}
  </tbody>
);

TableBody.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,

  /**
   * `polite` Adjust the notification behavior of screen readers
   */
  'aria-live': PropTypes.oneOf(['polite', 'assertive', 'off']),
};

TableBody.defaultProps = {
  'aria-live': 'polite',
};

export default TableBody;
