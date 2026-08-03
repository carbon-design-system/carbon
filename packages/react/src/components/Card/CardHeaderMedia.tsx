/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

const componentName = 'CardHeaderMedia';

export interface CardHeaderMediaProps {
  /**
   * Provide the contents of the CardHeaderMedia.
   */
  children?: ReactNode;

  /**
   * Provide an optional class to be applied to the containing node.
   */
  className?: string;
}

export const CardHeaderMedia = ({
  children,
  className,
  ...rest
}: CardHeaderMediaProps) => {
  const prefix = usePrefix();
  const classes = cx(`${prefix}--card__header-media`, className);

  return (
    <div {...rest} className={classes}>
      {children}
    </div>
  );
};

CardHeaderMedia.propTypes = {
  /**
   * Provide the contents of the CardHeaderMedia.
   */
  children: PropTypes.node,

  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,
};

CardHeaderMedia.displayName = componentName;
