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
import Link, { LinkPropTypes } from './Link';

const { prefix: selectorPrefix } = settings;

const HeaderName = ({
  children,
  className: customClassName,
  prefix,
  href,
  ...rest
}) => {
  const className = cx(`${selectorPrefix}--header__name`, customClassName);
  return (
    <Link {...rest} className={className} href={href}>
      {prefix && (
        <>
          <span className={`${selectorPrefix}--header__name--prefix`}>
            {prefix}
          </span>
          &nbsp;
        </>
      )}
      {children}
    </Link>
  );
};

HeaderName.propTypes = {
  /**
   * Pass in a valid `element` to replace the underlying `<a>` tag with a
   * custom `Link` element
   */
  ...LinkPropTypes,

  /**
   * Pass in children that are either a string or can be read as a string by
   * screen readers
   */
  children: PropTypes.node.isRequired,

  /**
   * Optionally provide a custom class to apply to the underlying <li> node
   */
  className: PropTypes.string,

  /**
   * Optionally specify a prefix to your header name. Useful for companies, for
   * example: IBM [Product Name] versus solely [Product Name]
   */
  prefix: PropTypes.string,

  /**
   * Provide an href for the name to link to
   */
  href: PropTypes.string,
};

HeaderName.defaultProps = {
  prefix: 'IBM',
};

export default HeaderName;
