/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { settings } from 'carbon-components';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const { prefix } = settings;

const SideNavLinkText = ({ className: customClassName, children, ...rest }) => {
  const className = cx(`${prefix}--side-nav__link-text`, customClassName);
  return (
    <span {...rest} className={className}>
      {children}
    </span>
  );
};

SideNavLinkText.propTypes = {
  /**
   * Provide the content for the link text
   */
  children: PropTypes.node.isRequired,

  /**
   * Provide an optional class to be applied to the containing node
   */
  className: PropTypes.string,
};

export default SideNavLinkText;
