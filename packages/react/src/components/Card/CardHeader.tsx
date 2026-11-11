/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { forwardRef, useCallback } from 'react';
import cx from 'classnames';
import { CardHeaderProps } from './Card.types';
import { useCardContext } from './CardContext';
import { usePrefix } from '../../internal/usePrefix';

const componentName = 'CardHeader';

/**
 * CardHeader — header section of the card.
 *
 * Pass `headerMedia` for the icon/avatar/tag row above the title, and
 * `actions` for the end-aligned action buttons. Both slots participate in the
 * CSS Grid layout so no JS measurement is needed to size the title correctly.
 */
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, headerMedia, actions, ...rest }, ref) => {
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

    const actionsSlot = actions && (
      <div className={`${blockClass}__actions-slot`}>{actions}</div>
    );

    return (
      <div
        {...rest}
        ref={ref}
        className={cx(`${blockClass}__header`, className)}>
        {headerMedia ? (
          // With headerMedia: top row holds media + actions, title below full-width
          <>
            <div className={`${blockClass}__header-top-row`}>
              <div className={`${blockClass}__header-media`}>{headerMedia}</div>
              {actionsSlot}
            </div>
            {children}
          </>
        ) : (
          // No headerMedia: title and actions share a single flex row
          <>
            {children}
            {actionsSlot}
          </>
        )}
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
