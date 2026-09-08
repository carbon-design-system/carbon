/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { forwardRef } from 'react';
import cx from 'classnames';
import { CardBodyProps } from './Card.types';
import { usePrefix } from '../../internal/usePrefix';

const componentName = 'CardBody';

/**
 * CardBody component - Body section of the card for free-form content
 */
export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, children, isFlush = false, ...rest }, ref) => {
    const prefix = usePrefix();
    const bodyClasses = cx(`${prefix}--card__body`, className, {
      [`${prefix}--card__body--flush`]: isFlush,
    });

    return (
      <div {...rest} ref={ref} className={bodyClasses}>
        {children}
      </div>
    );
  }
);

CardBody.displayName = componentName;
