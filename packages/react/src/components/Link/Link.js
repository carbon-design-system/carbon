/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { usePrefix } from '../../internal/usePrefix';

const Link = React.forwardRef(function Link(
  {
    children,
    className: customClassName,
    href,
    disabled = false,
    inline = false,
    visited = false,
    renderIcon: Icon,
    size,
    ...rest
  },
  ref
) {
  const prefix = usePrefix();
  const className = cx(`${prefix}--link`, customClassName, {
    [`${prefix}--link--disabled`]: disabled,
    [`${prefix}--link--inline`]: inline,
    [`${prefix}--link--visited`]: visited,
    [`${prefix}--link--${size}`]: size,
  });
  const rel = rest.target === '_blank' ? 'noopener' : null;
  const linkProps = {
    className,
    rel,
  };

  // Reference for disabled links:
  // https://www.scottohara.me/blog/2021/05/28/disabled-links.html
  if (!disabled) {
    linkProps.href = href;
  } else {
    linkProps.role = 'link';
    linkProps['aria-disabled'] = true;
  }

  return (
    <a ref={ref} {...linkProps} {...rest}>
      {children}
      {!inline && Icon && (
        <div className={`${prefix}--link__icon`}>
          <Icon />
        </div>
      )}
    </a>
  );
});

Link.displayName = 'Link';

Link.propTypes = {
  /**
   * Provide the content for the Link
   */
  children: PropTypes.node,

  /**
   * Provide a custom className to be applied to the containing `<a>` node
   */
  className: PropTypes.string,

  /**
   * Specify if the control should be disabled, or not
   */
  disabled: PropTypes.bool,

  /**
   * Provide the `href` attribute for the `<a>` node
   */
  href: PropTypes.string,

  /**
   * Specify whether you want the inline version of this control
   */
  inline: PropTypes.bool,

  /**
   * Optional prop to render an icon next to the link.
   * Can be a React component class
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Specify the size of the Link. Currently supports either `sm`, 'md' (default) or 'lg` as an option.
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),

  /**
   * Specify whether you want the link to receive visited styles after the link has been clicked
   */
  visited: PropTypes.bool,
};

export default Link;
