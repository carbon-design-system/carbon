/**
 * Copyright IBM Corp. 2023, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Import portions of React that are needed.
import React, { PropsWithChildren, ReactNode } from 'react';

// Other standard imports.
import PropTypes from 'prop-types';
import { pkg } from '../../settings';

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--interstitial-screen-view`;
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
>(
  (
    {
      children,
      className,
      stepTitle,
      translateWithId,
      // Collect any other property values passed in.
      ...rest
    },
    ref
  ) => {
    return (
      <div
        {
          // Pass through any other property values as HTML attributes.
          ...rest
        }
        className={`${blockClass} ${className}`}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
InterstitialScreenView.displayName = componentName;

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
InterstitialScreenView.propTypes = {
  /**
   * Provide the contents of the InterstitialScreenView.
   */
  children: PropTypes.node,

  /**
   * Optional class name for this component.
   */
  className: PropTypes.string,

  /**
   * The label to pass to the ProgressStep component.
   */
  stepTitle: PropTypes.string.isRequired,

  /**
   * Optional method that takes in a message id and returns an internationalized string.
   */
  translateWithId: PropTypes.func,
};
