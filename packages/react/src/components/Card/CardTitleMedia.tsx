/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { forwardRef, ReactNode } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

const componentName = 'CardTitleMedia';

export interface CardTitleMediaProps {
  /**
   * Content to be rendered in the title media slot (typically an icon or small image)
   */
  children?: ReactNode;

  /**
   * Optional class name for custom styling
   */
  className?: string;
}

/**
 * CardTitleMedia provides a media slot positioned to the left of the card title.
 * The media slot adapts to the heading area height (min 48px, max 64px) and stays
 * top-aligned when the title wraps to multiple lines.
 */
export const CardTitleMedia = forwardRef<HTMLDivElement, CardTitleMediaProps>(
  ({ className, children, ...rest }, ref) => {
    const prefix = usePrefix();
    const titleMediaClasses = cx(`${prefix}--card__title-media`, className);

    return (
      <div {...rest} ref={ref} className={titleMediaClasses}>
        {children}
      </div>
    );
  }
);

CardTitleMedia.displayName = componentName;

CardTitleMedia.propTypes = {
  /**
   * Content to be rendered in the title media slot (typically an icon or small image)
   */
  children: PropTypes.node,

  /**
   * Optional class name for custom styling
   */
  className: PropTypes.string,
};
