/**
 * Copyright IBM Corp. 2023, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { PropsWithChildren, ReactNode } from 'react';
import { usePrefix } from '../../internal/usePrefix';

const componentName = 'InterstitialScreenView';

export interface InterstitialScreenViewProps extends PropsWithChildren {
  /**
   * Provide the contents of the InterstitialScreenView.
   */
  children?: ReactNode;

  /**
   * Optional class name for this component.
   */
  className?: string;

  /**
   * The label to pass to the ProgressStep component.
   */
  stepTitle?: string;

  /**
   * Optional method that takes in a message id and returns an internationalized string.
   */
  translateWithId?: (id: string) => string;
}

/**
 * An Onboarding component intended to be used as the child elements of the InterstitialScreen body component.
 */
export const InterstitialScreenView = React.forwardRef<
  HTMLDivElement,
  InterstitialScreenViewProps
>(({ children, className, stepTitle, translateWithId, ...rest }, ref) => {
  const prefix = usePrefix();
  const blockClass = `${prefix}--interstitial-screen-view`;

  return (
    <div
      {...rest}
      className={className ? `${blockClass} ${className}` : blockClass}
      ref={ref}>
      {children}
    </div>
  );
});

InterstitialScreenView.displayName = componentName;
