/**
 * Copyright IBM Corp. 2023, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Import portions of React that are needed.
import React, { ReactNode } from 'react';

import Link from '../Link';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

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
  HTMLAnchorElement,
  GuidebannerElementLinkProps
>(({ children, className, ...rest }, ref) => {
  const prefix = usePrefix();
  const blockClass = `${prefix}--guidebanner__element-link`;

  return (
    <Link
      {...rest}
      className={cx(blockClass, className)}
      ref={ref}
      role="link"
      size="md"
      data-component-name={componentName}>
      {children}
    </Link>
  );
});

GuidebannerElementLink.displayName = componentName;
