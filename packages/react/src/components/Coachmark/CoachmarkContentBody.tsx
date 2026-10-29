/**
 * Copyright IBM Corp. 2024, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { forwardRef, ReactNode } from 'react';
import cx from 'classnames';
import { blockClass } from './context';

export interface CoachmarkContentBodyProps {
  /**
   * Provide the content for the body section of the Coachmark.
   */
  children: ReactNode;
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className?: string;
}

export type EnrichedChildren = {
  children: ReactNode;
};

export const CoachmarkContentBody = forwardRef<
  HTMLDivElement,
  CoachmarkContentBodyProps
>((props, ref) => {
  const { children, className = '', ...rest } = props;
  const ContentBodyBlockClass = `${blockClass}--content-body`;
  return (
    <div
      ref={ref}
      className={cx(ContentBodyBlockClass, className)}
      {...rest}
      data-component-name="CoachmarkContentBody">
      {children}
    </div>
  );
});

export default CoachmarkContentBody;

CoachmarkContentBody.displayName = 'CoachmarkContentBody';
