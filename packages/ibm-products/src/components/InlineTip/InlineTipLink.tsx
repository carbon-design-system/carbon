/**
 * Copyright IBM Corp. 2023, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Import portions of React that are needed.
import React, { ForwardedRef, PropsWithChildren, ReactNode } from 'react';

import { Launch } from '@carbon/react/icons';
import { Link } from '@carbon/react';
// Other standard imports.
import PropTypes from 'prop-types';
import cx from 'classnames';
import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg } from '../../settings';

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--inline-tip__link`;
const componentName = 'InlineTipLink';

// NOTE: the component SCSS is not imported here: it is rolled up separately.

export interface InlineTipLinkProps extends PropsWithChildren {
  /**
   * Provide the contents of the InlineTipLink.
   */
  children: ReactNode;

  /**
   * Provide an optional class to be applied to the containing node.
   */
  className?: string;

  /* TODO: add types and DocGen for all props. */
}

/**
 * This is a standard Carbon link, styled specifically for use inside InlineTip.
 */
export const InlineTipLink = React.forwardRef(
  (
    { children, className, ...rest }: InlineTipLinkProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <Link
        {...rest}
        className={cx(blockClass, className)}
        ref={ref}
        {...getDevtoolsProps(componentName)}
        renderIcon={() => <Launch size={16} />}
      >
        {children}
      </Link>
    );
  }
);

InlineTipLink.displayName = componentName;

InlineTipLink.propTypes = {
  /**
   * Provide the contents of the InlineTipLink.
   */
  children: PropTypes.node.isRequired,

  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,

  /* TODO: add types and DocGen for all props. */
};
