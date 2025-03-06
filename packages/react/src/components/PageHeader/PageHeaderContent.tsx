/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

export interface PageHeaderContentProps {
  children?: React.ReactNode;
  className?: string;
}

export default function PageHeaderContent({
  children,
  className,
  ...other
}: PageHeaderContentProps) {
  const prefix = usePrefix();
  const classNames = classnames(
    {
      [`${prefix}--page-header__content`]: true,
    },
    className
  );
  return (
    <div {...other}>
      <p>page header content</p>
      {children}
    </div>
  );
}

PageHeaderContent.propTypes = {
  /**
   * Provide list items to be rendered in the ordered list
   */
  children: PropTypes.node,

  /**
   * Provide an optional className to be applied to the containing <ol> node
   */
  className: PropTypes.string,
};
