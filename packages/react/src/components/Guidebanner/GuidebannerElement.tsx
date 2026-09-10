/**
 * Copyright IBM Corp. 2023, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Import portions of React that are needed.
import React, { ReactNode } from 'react';

import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

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
 * and acts as a container for a carousel item.
 */
export const GuidebannerElement = React.forwardRef<
  HTMLDivElement,
  GuidebannerElementProps
>(({ button, className, description, title, ...rest }, ref) => {
  const prefix = usePrefix();
  const blockClass = `${prefix}--guidebanner__element`;

  return (
    <div
      {...rest}
      className={cx(blockClass, className)}
      data-component-name={componentName}
      ref={ref}>
      {title && <h2 className={`${blockClass}-title`}>{title}</h2>}
      {description && <p className={`${blockClass}-content`}>{description}</p>}
      {button && <div className={`${blockClass}-buttons`}>{button}</div>}
    </div>
  );
});

GuidebannerElement.displayName = componentName;
