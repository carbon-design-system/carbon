/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { settings } from 'carbon-components';

const { prefix } = settings;

const Breadcrumb = ({
  'aria-label': ariaLabel,
  children,
  className: customClassNameNav,
  noTrailingSlash,
}) => {
  const className = cx({
    [`${prefix}--breadcrumb`]: true,
    [`${prefix}--breadcrumb--no-trailing-slash`]: noTrailingSlash,
  });

  return (
    <nav
      className={customClassNameNav}
      aria-label={ariaLabel ? ariaLabel : 'Breadcrumb'}>
      <ol className={className}>{children}</ol>
    </nav>
  );
};

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
