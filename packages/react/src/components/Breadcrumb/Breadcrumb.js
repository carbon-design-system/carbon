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
  children,
  className: customClassName,
  classNameNav: customClassNameNav,
  noTrailingSlash,
  ...rest
}) => {
  const className = cx({
    [`${prefix}--breadcrumb`]: true,
    [`${prefix}--breadcrumb--no-trailing-slash`]: noTrailingSlash,
    [customClassName]: !!customClassName,
  });

  const classNameNav = cx({
    [customClassNameNav]: !!customClassNameNav,
  });

  return (
    <nav className={classNameNav} aria-label="Breadcrumb">
      <ol className={className} {...rest}>
        {children}
      </ol>
    </nav>
  );
};

Breadcrumb.propTypes = {
  /**
   * Pass in the BreadcrumbItem's for your Breadcrumb
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Specify an optional className to be applied to the outer container node
   */
  classNameNav: PropTypes.string,

  /**
   * Optional prop to omit the trailing slash for the breadcrumbs
   */
  noTrailingSlash: PropTypes.bool,
};

export default Breadcrumb;
