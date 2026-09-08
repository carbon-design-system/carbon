/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import cx from 'classnames';
import { AspectRatio } from '../AspectRatio';
import { type AspectRatioProps } from '../AspectRatio/AspectRatio';
import { usePrefix } from '../../internal/usePrefix';
import { useCardContext } from './CardContext';

const componentName = 'CardMedia';

export interface CardMediaProps extends Omit<AspectRatioProps, 'className'> {
  /**
   * Provide the contents of the CardMedia.
   */
  children?: React.ReactNode;

  /**
   * Provide an optional class to be applied to the containing node.
   */
  className?: string;

  /**
   * Width of the media column when the card is in horizontal layout.
   * Accepts any valid CSS width value (e.g. '200px', '40%').
   * Defaults to '33.33%'. Has no effect in vertical (default) layout.
   */
  mediaWidth?: string;
}

/**
 * CardMedia is a media slot component that maintains aspect ratio.
 *
 * In vertical (default) mode it delegates to Carbon's AspectRatio.
 * In horizontal mode it renders a plain div sized to `mediaWidth` (default
 * 33.33%) that stretches to the full card height — no aspect-ratio math needed.
 */
export const CardMedia = ({
  children,
  className,
  ratio,
  mediaWidth = '33.33%',
  ...rest
}: CardMediaProps) => {
  const prefix = usePrefix();
  const blockClass = `${prefix}--card`;
  const { horizontal } = useCardContext();
  const classes = cx(`${blockClass}__media`, className);

  if (horizontal) {
    return (
      <div
        className={`${blockClass}__media ${blockClass}__media--horizontal`}
        style={
          {
            [`--${prefix}--card--media-width`]: mediaWidth,
          } as React.CSSProperties
        }>
        {children}
      </div>
    );
  }

  return (
    <AspectRatio ratio={ratio} {...rest} className={classes}>
      {children}
    </AspectRatio>
  );
};

CardMedia.displayName = componentName;
