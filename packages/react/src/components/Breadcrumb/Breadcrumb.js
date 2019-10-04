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
  ariaLabel,
  children,
  className: customClassName,
  noTrailingSlash,
}) => {
  const className = cx({
    [`${prefix}--breadcrumb`]: true,
    [`${prefix}--breadcrumb--no-trailing-slash`]: noTrailingSlash,
    [customClassName]: !!customClassName,
  });

  return (
    <nav aria-label={ariaLabel ? ariaLabel : 'Breadcrumb'}>
      <ol className={className}>{children}</ol>
    </nav>
  );
};

Breadcrumb.propTypes = {
  /**
   * Specify the label for the control
   */
  ariaLabel: PropTypes.string,

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
