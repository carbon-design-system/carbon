/**
 * Copyright IBM Corp. 2023, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Import portions of React that are needed.
import React, { ReactNode } from 'react';

import PropTypes from 'prop-types';
import cx from 'classnames';
import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg } from '../../settings';

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--guidebanner__element`;
const componentName = 'GuidebannerElement';

export interface GuidebannerElementProps {
  /**
   * An optional button can be rendered below the description.
   * This can be a link, button, Coachmark button, etc.
   */
  button?: ReactNode;
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className?: string;
  /**
   * The description of the element.
   */
  description: ReactNode;
  /**
   * The title of the element.
   */
  title?: string;
}

/**
 * The GuidebannerElement is a required child component of the Guidebanner,
 * and acts as a container for a CarouselItem.
 */
export const GuidebannerElement = React.forwardRef<
  HTMLDivElement,
  GuidebannerElementProps
>(({ button, className, description, title, ...rest }, ref) => {
  return (
    <div
      {...rest}
      className={cx(blockClass, className)}
      ref={ref}
      {...getDevtoolsProps(componentName)}
    >
      {title && <h2 className={`${blockClass}-title`}>{title}</h2>}
      {description && <p className={`${blockClass}-content`}>{description}</p>}
      {button && <div className={`${blockClass}-buttons`}>{button}</div>}
    </div>
  );
});

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
GuidebannerElement.displayName = componentName;

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
GuidebannerElement.propTypes = {
  /**
   * An optional button can be rendered below the description.
   * This can be a link, button, Coachmark button, etc.
   */
  button: PropTypes.node,

  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,

  /**
   * The description of the element.
   */

  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
    .isRequired,

  /**
   * The title of the element.
   */
  title: PropTypes.string,
};
