/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Other standard imports.
import PropTypes from 'prop-types';
// Import portions of React that are needed.
import React, { ForwardedRef } from 'react';
import cx from 'classnames';
import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg } from '../../settings';

// Carbon and package components we use.
/* TODO: @import(s) of carbon components and other package components. */

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--STYLE_NAME`;
const componentName = 'DISPLAY_NAME';

// NOTE: the component SCSS is not imported here: it is rolled up separately.

// Default values can be included here and then assigned to the prop params,
// e.g. prop = defaults.prop,
// This gathers default values together neatly and ensures non-primitive
// values are initialized early to avoid react making unnecessary re-renders.
// Note that default values are not required for props that are 'required',
// nor for props where the component can apply undefined values reasonably.
// Default values should be provided when the component needs to make a choice
// or assumption when a prop is not supplied.

// Default values for props
// const defaults = {
//   /* TODO: add defaults for relevant props if needed */
// };

/**
 * TODO: add component type props
 */

export interface DISPLAY_NAMEProps {
  children: React.ReactNode;
  className: string;
  [key: string]: any;
}

/**
 * TODO: A description of the component.
 */
export let DISPLAY_NAME = React.forwardRef(
  (
    {
      // The component props, in alphabetical order (for consistency).

      children /* TODO: remove if not needed. */,
      className,
      /* TODO: add other props for DISPLAY_NAME, with default values if needed */

      // Collect any other property values passed in.
      ...rest
    }: DISPLAY_NAMEProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        {
          // Pass through any other property values as HTML attributes.
          ...rest
        }
        className={cx(
          blockClass, // Apply the block class to the main HTML element
          className, // Apply any supplied class names to the main HTML element.
          // example: `${blockClass}__template-string-class-${kind}-n-${size}`,
          {
            // switched classes dependant on props or state
            // example: [`${blockClass}__here-if-small`]: size === 'sm',
          }
        )}
        ref={ref}
        {...getDevtoolsProps(componentName)}
      >
        {children}
      </div>
    );
  }
);

// Return a placeholder if not released and not enabled by feature flag
DISPLAY_NAME = pkg.checkComponentEnabled(DISPLAY_NAME, componentName);

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
DISPLAY_NAME.displayName = componentName;

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
DISPLAY_NAME.propTypes = {
  /**
   * Provide the contents of the DISPLAY_NAME.
   */
  children: PropTypes.node.isRequired,

  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,

  /* TODO: add types and DocGen for all props. */
};
