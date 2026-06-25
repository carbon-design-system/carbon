/**
 * Copyright IBM Corp. 2021, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { PropsWithChildren, ReactNode, forwardRef } from 'react';
import { node, string } from 'prop-types';

import { blockClass } from './Toolbar';
import cx from 'classnames';
import { pkg } from '../../settings';

export interface ToolbarGroupProps {
  /** Provide the content of the `ToolbarGroup` */
  children?: ReactNode;

  /** Provide an optional class to be applied to the containing node */
  className?: string;
}

/** Toolbar groups organize the commands within a toolbar into related groups. */
export const ToolbarGroup = forwardRef(
  (
    { className, children, ...rest }: PropsWithChildren<ToolbarGroupProps>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    return (
      <div
        {...rest}
        ref={ref}
        className={cx(`${blockClass}__group`, className)}
      >
        {children}
      </div>
    );
  }
);

const componentName = 'ToolbarGroup';
ToolbarGroup.displayName = componentName;

ToolbarGroup.propTypes = {
  /** Provide the content of the `ToolbarGroup` */
  children: node.isRequired,

  /** Provide an optional class to be applied to the containing node */
  className: string,
};
