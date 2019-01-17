/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { settings } from 'carbon-components';
import Link from '../Link';

const { prefix } = settings;

const newChild = (children, href, prefix) => {
  if (typeof children === 'string' && !(href === undefined)) {
    return <Link href={href}>{children}</Link>;
  } else {
    return React.cloneElement(React.Children.only(children), {
      className: `${prefix}--link`,
    });
  }
};

const BreadcrumbItem = ({ children, className, href, ...other }) => {
  const classNames = classnames(`${prefix}--breadcrumb-item`, className);
  return (
    <div className={classNames} {...other}>
      {newChild(children, href, prefix)}
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
};

export default BreadcrumbItem;
