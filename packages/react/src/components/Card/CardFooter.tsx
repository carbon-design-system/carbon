/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { CardFooterProps } from './Card.types';
import { useCardContext } from './CardContext';
import { usePrefix } from '../../internal/usePrefix';

const componentName = 'CardFooter';

/**
 * CardFooter component - Footer section of the card.
 *
 * Not supported inside a `clickable` card. A clickable card renders its own
 * built-in footer affordance automatically. Use the `renderFooterIcon` prop on
 * `Card` to customize the icon.
 */
export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...rest }, ref) => {
    const prefix = usePrefix();
    const { clickable } = useCardContext();

    if (clickable) {
      // eslint-disable-next-line no-console
      console.error(
        '[Card] `Card.Footer` cannot be used inside a `clickable` card. ' +
          'A clickable card renders its own footer affordance automatically. ' +
          'Use the `renderFooterIcon` prop on `Card` to customize the icon.'
      );
      return null;
    }

    const footerClasses = cx(`${prefix}--card__footer`, className);

    return (
      <div {...rest} ref={ref} className={footerClasses}>
        {children}
      </div>
    );
  }
);

CardFooter.displayName = componentName;

CardFooter.propTypes = {
  /**
   * Footer content
   */
  children: PropTypes.node,
  /**
   * Additional CSS class names
   */
  className: PropTypes.string,
};
