/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { usePrefix } from '../../../internal/usePrefix';

function ContainedListItem({ children, className }) {
  const prefix = usePrefix();

  const classes = classNames(`${prefix}--contained-list-item`, className);

  return <li className={classes}>{children}</li>;
}

ContainedListItem.propTypes = {
  /**
   * The content of this ContainedListItem
   */
  children: PropTypes.node,

  /**
   * Additional CSS class names.
   */
  className: PropTypes.string,
};

export default ContainedListItem;
