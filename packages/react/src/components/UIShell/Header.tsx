/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import React, { ReactNode } from 'react';
import { usePrefix } from '../../internal/usePrefix';

interface AriaLabelPropType {
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

interface HeaderProps extends AriaLabelPropType {
  className?: string;
  children?: ReactNode;
}

const Header: React.FC<HeaderProps> = ({
  className: customClassName,
  children,
  ...rest
}) => {
  if (!rest['aria-label'] && !rest['aria-labelledby']) {
    throw new Error(
      'You must provide either an aria-label or aria-labelledby prop to the Header component.'
    );
  }
  const prefix = usePrefix();
  const className = cx(`${prefix}--header`, customClassName);

  return (
    <header {...rest} className={className}>
      {children}
    </header>
  );
};

export default Header;
