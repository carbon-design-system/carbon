/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import React, { ComponentProps } from 'react';
import PropTypes from 'prop-types';
import { usePrefix } from '../../internal/usePrefix';

type SkipToContentProps = Omit<ComponentProps<'a'>, 'children'> & {
  children?: string | undefined;
};

export default function SkipToContent({
  children = 'Skip to main content',
  className: customClassName,
  href = '#main-content',
  tabIndex = 0,
  ...rest
}: SkipToContentProps) {
  const prefix = usePrefix();
  const className = cx(`${prefix}--skip-to-content`, customClassName);
  return (
    <a {...rest} className={className} href={href} tabIndex={tabIndex}>
      {children}
    </a>
  );
}

SkipToContent.propTypes = {
  /**
   * A ReactNode to display in the SkipToContent `a` tag.
   * `'Skip to main content'` by default.
   */
  children: PropTypes.string,

  className: PropTypes.string,

  /**
   * Provide the `href` to the id of the element on your package that is the
   * main content. `#main-content` by default.
   */
  href: PropTypes.string,

  /**
   * Optionally override the default tabindex of 0
   */
  tabIndex: PropTypes.string,
};
