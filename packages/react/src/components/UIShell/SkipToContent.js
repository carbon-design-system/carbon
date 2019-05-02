/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { settings } from 'carbon-components';
import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const { prefix } = settings;

const SkipToContent = ({
  children,
  className: customClassName,
  href,
  tabIndex,
  ...rest
}) => {
  const className = cx(`${prefix}--skip-to-content`, customClassName);
  return (
    <a {...rest} className={className} href={href} tabIndex={tabIndex}>
      {children}
    </a>
  );
};

SkipToContent.propTypes = {
  /**
   * Provide an optional class to be applied to the containing node
   */
  children: PropTypes.string.isRequired,

  /**
   * Provide the `href` to the id of the element on your package that is the
   * main content.
   */
  href: PropTypes.string.isRequired,

  /**
   * Optionally override the default tabindex of 0
   */
  tabIndex: PropTypes.string.isRequired,
};

SkipToContent.defaultProps = {
  children: 'Skip to main content',
  href: '#main-content',
  tabIndex: '0',
};

export default SkipToContent;
