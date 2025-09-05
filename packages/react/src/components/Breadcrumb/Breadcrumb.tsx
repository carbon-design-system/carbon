/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

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

  /**
   * Specify the size of the Breadcrumb. Currently
   * supports the following: `sm` & `md` (default: 'md')
   */
  size?: 'sm' | 'md';

  /**
   * Optional prop to override the default separator
   * between breadcrumb items (default: `'/'`)
   */
  separator?: string;
}

function escapeSpecialCharacters(value: string): string {
  return value
    .replace(/\\/g, '\\\\') // escape backslashes
    .replace(/"/g, '\\"'); // escape double quotes
}

const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>((props, ref) => {
  const {
    'aria-label': ariaLabel,
    children,
    className: customClassNameNav,
    noTrailingSlash,
    size,
    separator,
    ...rest
  } = props;
  const prefix = usePrefix();
  const className = cx({
    [`${prefix}--breadcrumb`]: true,
    [`${prefix}--breadcrumb--no-trailing-slash`]: noTrailingSlash,
    [`${prefix}--breadcrumb--sm`]: size === 'sm',
  });
  const customBreadcrumbStyle: React.CSSProperties = separator
    ? {
        ['--breadcrumb-separator' as any]: `"${escapeSpecialCharacters(separator)}"`,
      }
    : {};

  return (
    <nav
      className={customClassNameNav}
      aria-label={ariaLabel ? ariaLabel : 'Breadcrumb'}
      ref={ref}
      style={customBreadcrumbStyle}
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

  /**
   * Specify the size of the Breadcrumb. Currently supports the following:
   */
  size: PropTypes.oneOf(['sm', 'md']),

  /**
   * Optional prop to override the default separator
   * between breadcrumb items (default: `'/'`)
   */
  separator: PropTypes.string,
};

export default Breadcrumb;
