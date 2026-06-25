/**
 * Copyright IBM Corp. 2023, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Button } from '@carbon/react';
// Other standard imports.
import PropTypes from 'prop-types';
// Import portions of React that are needed.
import React from 'react';
import cx from 'classnames';
import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg } from '../../settings';
import { useCoachmark } from '../Coachmark';

// Carbon and package components we use.
/* TODO: @import(s) of carbon components and other package components. */

export interface CoachmarkButtonProps {
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className?: string;
  /**
   * The aria label.
   */
  label: string;
}

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--coachmark-button`;
const componentName = 'CoachmarkButton';

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
 * Use CoachmarkButton for the target prop of a Coachmark component.
 * @deprecated This component is deprecated.
 */
export const CoachmarkButton = React.forwardRef<
  HTMLButtonElement,
  CoachmarkButtonProps
>(({ className, label, ...rest }, ref) => {
  const coachmark = useCoachmark();
  if (!coachmark) {
    return (
      <div>
        CoachmarkButton is to be use exclusively within the target prop of
        Coachmark
      </div>
    );
  }
  return (
    <Button
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
      role="button"
      aria-label={label}
      {...getDevtoolsProps(componentName)}
      {...coachmark.buttonProps}
    >
      {label}
    </Button>
  );
});

/**@ts-ignore*/
CoachmarkButton.deprecated = {
  level: 'warn',
  details: `${componentName} is deprecated.`,
};

// Return a placeholder if not released and not enabled by feature flag

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
CoachmarkButton.displayName = componentName;

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
CoachmarkButton.propTypes = {
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,
  /**
   * The aria label.
   */
  label: PropTypes.string.isRequired,
};
