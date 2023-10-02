/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import React, { ReactNode } from 'react';
import { usePrefix } from '../../internal/usePrefix';
import PropTypes from 'prop-types';

export interface SideNavLinkTextProps {
  children: ReactNode;
  className?: string;
}

function SideNavLinkText({
  className: customClassName,
  children,
  ...rest
}: SideNavLinkTextProps) {
  const prefix = usePrefix();
  const className = cx(`${prefix}--side-nav__link-text`, customClassName);
  return (
    <span {...rest} className={className}>
      {children}
    </span>
  );
}

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
