/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

const componentName = 'CardAction';

export interface CardActionProps {
  /**
   * Provide the contents of the CardAction (typically a Button or IconButton).
   * Wrapping content in CardAction opts into action-set layout: no footer
   * padding, automatic top border, and stretch/fixed-width button behavior.
   */
  children?: ReactNode;

  /**
   * Provide an optional class to be applied to the containing node.
   */
  className?: string;

  /**
   * Label shown in the overflow menu when this action is hidden.
   * If not provided, CardActions will attempt to read it from the
   * direct child's props (label, iconDescription, or children text).
   */
  label?: string;
}

/**
 * CardAction is a wrapper for interactive elements in the card footer.
 * Its presence signals action-set layout to the footer (no padding, auto
 * border, stretch behavior).
 *
 * Note: do not use CardAction inside a clickable card — clickable cards
 * should not contain interactive elements (see usage guidelines).
 */
export const CardAction = ({
  children,
  className,
  ...rest
}: CardActionProps) => {
  const prefix = usePrefix();
  return (
    <div {...rest} className={cx(`${prefix}--card__action`, className)}>
      {children}
    </div>
  );
};

CardAction.propTypes = {
  /**
   * Provide the contents of the CardAction.
   */
  children: PropTypes.node,

  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,

  /**
   * Label shown in the overflow menu when this action is hidden.
   */
  label: PropTypes.string,
};

CardAction.displayName = componentName;
