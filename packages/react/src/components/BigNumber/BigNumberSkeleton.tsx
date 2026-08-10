/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { forwardRef } from 'react';
import cx from 'classnames';

import { usePrefix } from '../../internal/usePrefix';
import SkeletonText from '../SkeletonText';
import { BigNumberProps } from './BigNumber';
import { BigNumberSize } from './constants';

const componentName = 'BigNumberSkeleton';

/**
 * BigNumberSkeleton is used to display a skeleton version while
 * content is loading (handled by the BigNumber prop `loading`).
 *
 * Note: This component is only used within BigNumber.
 */

// Use the same properties and values as parent BigNumberProps
export type BigNumberSkeletonProps = Pick<
  BigNumberProps,
  'className' | 'size'
> &
  React.HTMLAttributes<HTMLDivElement>;

export const BigNumberSkeleton = forwardRef<
  HTMLDivElement,
  BigNumberSkeletonProps
>(({ className, size, ...rest }, ref) => {
  const prefix = usePrefix();
  const blockClass = `${prefix}--big-number-skeleton`;

  const bigNumberSkeletonClasses = cx(blockClass, className, {
    [`${blockClass}--lg`]: size === BigNumberSize.Large,
    [`${blockClass}--xl`]: size === BigNumberSize.XLarge,
  });

  return (
    <div
      {...rest}
      className={bigNumberSkeletonClasses}
      ref={ref}
      data-component-name={componentName}>
      <SkeletonText className={`${blockClass}__label`} />
      <SkeletonText heading className={`${blockClass}__value`} width="80%" />
    </div>
  );
});

BigNumberSkeleton.displayName = componentName;
