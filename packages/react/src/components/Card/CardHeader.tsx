/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { forwardRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { CardHeaderProps } from './Card.types';
import { useCardContext } from './CardContext';
import { usePrefix } from '../../internal/usePrefix';

const componentName = 'CardHeader';

/**
 * CardHeader — header section of the card.
 *
 * Layout is handled entirely by CSS Grid on __header:
 *   - CardHeaderMedia spans both columns (full-width row above the title area)
 *   - CardTitleMedia occupies column 1 (left icon slot)
 *   - CardTitle occupies column 2 (right text slot), or spans full width when
 *     CardTitleMedia is absent — detected by the :has selector in SCSS.
 * No child-scanning or wrapper injection is needed.
 */
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...rest }, ref) => {
    const prefix = usePrefix();
    const blockClass = `${prefix}--card`;
    const context = useCardContext();

    const handleDecoratorClick = useCallback(
      (e: React.MouseEvent) => e.stopPropagation(),
      []
    );

    const handleDecoratorKeyDown = useCallback(
      (e: React.KeyboardEvent) => e.stopPropagation(),
      []
    );

    return (
      <div
        {...rest}
        ref={ref}
        className={cx(`${blockClass}__header`, className)}>
        {children}
        {context.decorator && (
          <div
            className={`${blockClass}__decorator`}
            role="presentation"
            onClick={handleDecoratorClick}
            onKeyDown={handleDecoratorKeyDown}>
            {context.decorator}
          </div>
        )}
      </div>
    );
  }
);

CardHeader.displayName = componentName;

CardHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
