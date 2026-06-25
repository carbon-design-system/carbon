/**
 * Copyright IBM Corp. 2023, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Import portions of React that are needed.
import React, { ReactNode } from 'react';

// Other standard imports.
import PropTypes from 'prop-types';
import cx from 'classnames';
import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg } from '../../settings';

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--coachmark-overlay-element`;
const componentName = 'CoachmarkOverlayElement';

export interface CoachmarkOverlayElementProps {
  /**
   * An optional button can be rendered below the description.
   * This can be a link, button, Coachmark button, etc.
   */
  button?: ReactNode;
  /**
   * Optional class name for this component.
   */
  className?: string;
  /**
   * The description of the Coachmark.
   */
  description: ReactNode;
  /**
   * The title of the Coachmark.
   */
  title: string;
}

/**
 * Component to be displayed within a CoachmarkOverlayElements container.
 * Can be used 1 to N number, to display content in a Coachmark's overlay
 * in a carousel fashion.
 * @deprecated This component is deprecated.
 */
export const CoachmarkOverlayElement = React.forwardRef<
  HTMLDivElement,
  CoachmarkOverlayElementProps
>(
  (
    {
      button,
      className,
      description,
      title,

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
        <div className={`${blockClass}__content`}>
          {title && <h2 className={`${blockClass}__title`}>{title}</h2>}
          {description && (
            <p className={`${blockClass}__body`}>{description}</p>
          )}
        </div>
        {button && <div className={`${blockClass}__button`}>{button}</div>}
      </div>
    );
  }
);

/**@ts-ignore*/
CoachmarkOverlayElement.deprecated = {
  level: 'warn',
  details: `${componentName} is deprecated.`,
};

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
CoachmarkOverlayElement.displayName = componentName;

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
CoachmarkOverlayElement.propTypes = {
  /**
   * An optional button can be rendered below the description.
   * This can be a link, button, Coachmark button, etc.
   */
  button: PropTypes.node,
  /**
   * Optional class name for this component.
   */
  className: PropTypes.string,
  /**
   * The description of the Coachmark.
   */
  description: PropTypes.node.isRequired,
  /**
   * The title of the Coachmark.
   */
  title: PropTypes.string.isRequired,
};
