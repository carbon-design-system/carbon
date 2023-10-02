/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import React, { ReactNode } from 'react';
import { usePrefix } from '../../internal/usePrefix';

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

export default SideNavLinkText;
