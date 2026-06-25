/**
 * Copyright IBM Corp. 2023, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Import portions of React that are needed.
import React, { PropsWithChildren } from 'react';

// Other standard imports.
import PropTypes from 'prop-types';
import cx from 'classnames';
import { pkg } from '../../settings';

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--tooltip-trigger`;
const componentName = 'TooltipTrigger';

// NOTE: the component SCSS is not imported here: it is rolled up separately.

export interface TooltipTriggerProps extends PropsWithChildren {
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className?: string;
}

/**
 * This is an tooltip trigger as Carbon Tooltip requires an active element to work but provides
 * no blanked button.
 */
export const TooltipTrigger = React.forwardRef<
  HTMLButtonElement,
  TooltipTriggerProps
>(
  (
    {
      children,
      className,
      // Collect any other property values passed in.
      ...rest
    },
    ref
  ) => {
    return (
      <button
        type="button"
        ref={ref}
        {...rest}
        className={cx(
          blockClass, // Apply the block class to the main HTML element
          className // Apply any supplied class names to the main HTML element.
        )}
      >
        {children}
      </button>
    );
  }
);

// Return a placeholder if not released and not enabled by feature flag.

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
TooltipTrigger.displayName = componentName;

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
TooltipTrigger.propTypes = {
  /**
   * Child content of tooltip trigger
   */
  children: PropTypes.node,

  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,
};
