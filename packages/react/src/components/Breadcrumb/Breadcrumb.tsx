/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { PropsWithChildren } from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import { ForwardRefReturn } from '../../types/common';

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Specify the label for the breadcrumb container
   */
  'aria-label'?: string;

  /**
   * Specify an optional className to be applied to the container node
   */
  className?: string;

  /**
   * Optional prop to omit the trailing slash for the breadcrumbs
   */
  noTrailingSlash?: boolean;
}

const Breadcrumb: ForwardRefReturn<HTMLElement, BreadcrumbProps> =
  React.forwardRef(function Breadcrumb(
    {
      'aria-label': ariaLabel,
      children,
      className: customClassNameNav,
      noTrailingSlash,
      ...rest
    }: PropsWithChildren<BreadcrumbProps>,
    ref: React.Ref<HTMLElement>
  ) {
    const prefix = usePrefix();
    const className = cx({
      [`${prefix}--breadcrumb`]: true,
      [`${prefix}--breadcrumb--no-trailing-slash`]: noTrailingSlash,
    });

    return (
      <nav
        className={customClassNameNav}
        aria-label={ariaLabel ? ariaLabel : 'Breadcrumb'}
        ref={ref}
        {...rest}>
        <ol className={className}>{children}</ol>
      </nav>
    );
  });

Breadcrumb.displayName = 'Breadcrumb';
Breadcrumb.propTypes = {
  /**
   * Specify the label for the breadcrumb container
   */
  'aria-label': PropTypes.string,

  /**
   * Pass in the BreadcrumbItem's for your Breadcrumb
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Optional prop to omit the trailing slash for the breadcrumbs
   */
  noTrailingSlash: PropTypes.bool,
};

export default Breadcrumb;
