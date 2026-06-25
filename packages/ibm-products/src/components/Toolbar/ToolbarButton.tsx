/**
 * Copyright IBM Corp. 2021, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { forwardRef, useContext } from 'react';
import { ToolbarContext, blockClass as toolbarClass } from './Toolbar';
import { bool, func, node, string } from 'prop-types';

import { IconButton } from '@carbon/react';
import cx from 'classnames';
import { pkg } from '../../settings';

export const blockClass = `${toolbarClass}__button`;

export interface ToolbarButtonProps
  extends React.ComponentProps<typeof IconButton> {
  /** Determines whether the caret is rendered */
  caret?: boolean;
  /** Provide an optional class to be applied to the containing node */
  className?: string;
  /**
   * @deprecated use `label` instead
   * Specifies the label for the icon button */
  iconDescription?: string;

  /** Specifies the label for the icon button */
  label: string;

  /** Specifies the icon to be used by the ToolbarButton component */
  renderIcon: React.ElementType;
}

/** Toolbar buttons are common functions performed as part of a products interface or an open window.  */
export const ToolbarButton = forwardRef(
  (
    {
      caret = false,
      children,
      className,
      renderIcon,
      iconDescription: deprecated_iconDescription = '',
      label,
      ...rest
    }: React.PropsWithChildren<ToolbarButtonProps>,
    ref
  ) => {
    const Icon = renderIcon;
    return (
      <IconButton
        align={useContext(ToolbarContext)?.vertical ? 'right' : 'top'}
        {...rest}
        label={label ?? deprecated_iconDescription}
        ref={ref}
        className={cx(className, { [`${blockClass}--caret`]: caret })}
        kind="ghost"
        size="md"
      >
        <>
          {Icon ? <Icon /> : null}
          {children}

          {caret && <span className={`${blockClass}__caret`} />}
        </>
      </IconButton>
    );
  }
);

const componentName = 'ToolbarButton';
ToolbarButton.displayName = componentName;

export const deprecatedProps = {
  /**
   * **Deprecated**
   * Specifies the label for the icon button
   *  */
  iconDescription: string,
};

ToolbarButton.propTypes = {
  /** Determines whether the caret is rendered */
  caret: bool,

  /** Provide the content of the `ToolbarButton` */
  children: node,

  /** Provide an optional class to be applied to the containing node */
  className: string,

  /** Specifies the label for the icon button */
  label: string.isRequired,

  /** Specifies the icon to be used by the ToolbarButton component */
  renderIcon: func.isRequired,

  ...deprecatedProps,
};
