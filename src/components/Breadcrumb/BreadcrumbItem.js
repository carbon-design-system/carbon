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
import Link from '../Link';

const { prefix } = settings;

const BreadcrumbItem = ({
  'aria-current': ariaCurrent,
  children,
  className: customClassName,
  href,
  isCurrentPage,
  ...rest
}) => {
  const className = cx({
    [`${prefix}--breadcrumb-item`]: true,
    // We set the current class only if `isCurrentPage` is passed in and we do
    // not have an `aria-current="page"` set for the breadcrumb item
    [`${prefix}--breadcrumb-item--current`]:
      isCurrentPage && ariaCurrent !== 'page',
    [customClassName]: !!customClassName,
  });

  if (typeof children === 'string' && href) {
    return (
      <div className={className} {...rest}>
        <Link href={href} aria-current={ariaCurrent}>
          {children}
        </Link>
      </div>
    );
  }

  return (
    <div className={className} {...rest}>
      {React.cloneElement(children, {
        'aria-current': ariaCurrent,
        className: `${prefix}--link`,
      })}
    </div>
  );
};

BreadcrumbItem.propTypes = {
  /**
   * Pass in content that will be inside of the BreadcrumbItem
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Optional string representing the link location for the BreadcrumbItem
   */
  href: PropTypes.string,

  /**
   * Provide if this breadcrumb item represents the current page
   */
  isCurrentPage: PropTypes.bool,
};

export default BreadcrumbItem;
