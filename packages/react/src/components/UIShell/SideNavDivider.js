/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { usePrefix } from '../../internal/usePrefix';

function SideNavDivider({ className }) {
  const prefix = usePrefix();
  const classNames = cx(`${prefix}--side-nav__divider`, className);
  return <li role="separator" className={classNames} />;
}

SideNavDivider.propTypes = {
  /**
   * Provide an optional class to be applied to the containing node
   */
  className: PropTypes.string,
};

export default SideNavDivider;
