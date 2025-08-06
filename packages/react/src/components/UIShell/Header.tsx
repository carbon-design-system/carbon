/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { ReactNode } from 'react';
import { usePrefix } from '../../internal/usePrefix';

export interface HeaderProps {
  children?: ReactNode;

  /**
   * Optionally provide aria-label
   */
  'aria-label'?: string;

  /**
   * Optionally provide aria-labelledby
   */
  'aria-labelledby'?: string;

  /**
   * Optionally provide a custom class name that is applied to the underlying header
   */
  className?: string;
}

const Header: React.FC<HeaderProps> = ({
  className: customClassName,
  children,
  ...rest
}) => {
  const prefix = usePrefix();
  const className = cx(`${prefix}--header`, customClassName as string);

  return (
    <header {...rest} className={className}>
      {children}
    </header>
  );
};

Header.propTypes = {
  /**
   * Optionally provide aria-label
   */
  'aria-label': PropTypes.string,

  /**
   * Optionally provide aria-labelledby
   */
  'aria-labelledby': PropTypes.string,

  /**
   * Optionally provide a custom class name that is applied to the underlying header
   */
  className: PropTypes.string,
};

export default Header;
