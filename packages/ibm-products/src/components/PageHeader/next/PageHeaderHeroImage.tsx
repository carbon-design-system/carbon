/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { AspectRatio } from '@carbon/react';
import { breakpoints } from '@carbon/layout';
import { blockClass } from '../PageHeaderUtils';

/**
 * ----------------
 * PageHeaderHeroImage
 * ----------------
 */
export interface PageHeaderHeroImageProps {
  /**
   * Provide child elements to be rendered inside PageHeaderHeroImage.
   */
  children?: React.ReactNode;
  /**
   * Specify an optional className to be added to your PageHeaderHeroImage
   */
  className?: string;
  /**
   * Specify how the image should fit within the container.
   * - 'cover': Image fills container, may crop edges (default for hero images)
   * - 'contain': Image fits within container, may show empty space
   * - 'fill': Image stretches to fill container
   * - 'none': Image uses its natural size
   */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
}

export const PageHeaderHeroImage = ({
  className,
  children,
  objectFit = 'cover',
  ...other
}: PageHeaderHeroImageProps) => {
  const [lgBreakpoint, setLgBreakpoint] = useState(false);

  const classNames = classnames(
    {
      [`${blockClass}__hero-image`]: true,
      [`${blockClass}__hero-image--object-fit-${objectFit}`]: objectFit,
    },
    className
  );

  const lgMediaQuery = `(min-width: ${breakpoints.lg.width})`;

  useEffect(() => {
    const listener = (event: MediaQueryListEvent) => {
      setLgBreakpoint(event.matches);
    };

    const mediaQueryList = window.matchMedia(lgMediaQuery);

    mediaQueryList.addEventListener('change', listener);

    setLgBreakpoint(mediaQueryList.matches);

    return () => {
      mediaQueryList.removeEventListener('change', listener);
    };
  }, [lgMediaQuery]);

  return (
    <AspectRatio
      className={classNames}
      {...other}
      ratio={lgBreakpoint ? '2x1' : '3x2'}
    >
      {children}
    </AspectRatio>
  );
};

PageHeaderHeroImage.displayName = 'PageHeaderHeroImage';

PageHeaderHeroImage.propTypes = {
  /**
   * Provide child elements to be rendered inside PageHeaderHeroImage.
   */
  children: PropTypes.node,
  /**
   * Specify an optional className to be added to your PageHeaderHeroImage
   */
  className: PropTypes.string,
  /**
   * Specify how the image should fit within the container.
   */
  objectFit: PropTypes.oneOf(['cover', 'contain', 'fill', 'none']),
};
