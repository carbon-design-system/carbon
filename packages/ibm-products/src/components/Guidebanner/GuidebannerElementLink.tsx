/**
 * Copyright IBM Corp. 2023, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Import portions of React that are needed.
import React, { ReactNode } from 'react';

import { Link } from '@carbon/react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg } from '../../settings';

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--guidebanner__element-link`;
const componentName = 'GuidebannerElementLink';

export interface GuidebannerElementLinkProps {
  /**
   * Provide the contents of the GuidebannerElementLink.
   */
  children: ReactNode;

  /**
   * Provide an optional class to be applied to the containing node.
   */
  className?: string;
}

/**
 * A link styled specifically for the GuidebannerElement.
 */
export const GuidebannerElementLink = React.forwardRef<
  typeof Link,
  GuidebannerElementLinkProps
>(({ children, className, ...rest }: GuidebannerElementLinkProps, ref) => {
  return (
    <Link
      {...rest}
      className={cx(blockClass, className)}
      kind="ghost"
      ref={ref}
      role="link"
      size="md"
      {...getDevtoolsProps(componentName)}
    >
      {children}
    </Link>
  );
});

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
GuidebannerElementLink.displayName = componentName;

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
GuidebannerElementLink.propTypes = {
  /**
   * Provide the contents of the GuidebannerElementLink.
   */
  children: PropTypes.node.isRequired,

  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,
};
