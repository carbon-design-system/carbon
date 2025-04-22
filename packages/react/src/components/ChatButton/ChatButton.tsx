/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { type ComponentType, type FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from '../Button';
import { usePrefix } from '../../internal/usePrefix';

export type ChatButtonKind =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'ghost'
  | 'tertiary';
export type ChatButtonSize = 'sm' | 'md' | 'lg';

export interface ChatButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Provide the contents of your Select
   */
  children?: React.ReactNode;
  /**
   * Specify an optional className to be applied to the node containing the label and the select box
   */
  className?: string;
  /**
   * Specify whether the `ChatButton` should be disabled
   */
  disabled?: boolean;
  /**
   * Specify whether the `ChatButton` should be rendered as a quick action button
   */
  isQuickAction?: boolean;
  /**
   * Specify whether the quick action `ChatButton` should be rendered as selected. This disables the input
   */
  isSelected?: boolean;
  /**
   * Specify the kind of `ChatButton` you want to create
   */
  kind?: ChatButtonKind;

  /**
   * A component used to render an icon.
   */
  renderIcon?: ComponentType | FunctionComponent;
  /**
   * Specify the size of the `ChatButton`, from the following list of sizes:
   */
  size?: ChatButtonSize;
}

const ChatButton = React.forwardRef<HTMLButtonElement, ChatButtonProps>(
  function ChatButton(
    {
      className,
      children,
      disabled,
      isQuickAction,
      isSelected,
      kind,
      renderIcon,
      size,
      ...other
    }: ChatButtonProps,
    ref
  ) {
    const prefix = usePrefix();
    const classNames = classnames(className, {
      [`${prefix}--chat-btn`]: true,
      [`${prefix}--chat-btn--with-icon`]: renderIcon,
      [`${prefix}--chat-btn--quick-action`]: isQuickAction,
      [`${prefix}--chat-btn--quick-action--selected`]: isSelected,
    });

    const allowedSizes: ChatButtonSize[] = ['sm', 'md', 'lg'];

    if (isQuickAction) {
      kind = 'ghost';
      size = 'sm';
    } else {
      // Check if size is valid and warn if not
      if (size && !allowedSizes.includes(size as ChatButtonSize)) {
        console.error(
          `Invalid size "${size}" provided to ChatButton. Size must be one of: ${allowedSizes.join(
            ', '
          )}. Defaulting to "lg".`
        );
        size = 'lg';
      }
    }

    return (
      <Button
        disabled={disabled}
        className={classNames}
        kind={kind}
        ref={ref}
        size={size as ChatButtonSize}
        renderIcon={renderIcon}
        {...other}>
        {children}
      </Button>
    );
  }
);

ChatButton.propTypes = {
  /**
   * Provide the contents of your Select
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the node containing the label and the select box
   */
  className: PropTypes.string,

  /**
   * Specify whether the `ChatButton` should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify whether the `ChatButton` should be rendered as a quick action button
   */
  isQuickAction: PropTypes.bool,

  /**
   * Specify whether the quick action `ChatButton` should be rendered as selected. This disables the input
   */
  isSelected: PropTypes.bool,

  /**
   * Specify the kind of `ChatButton` you want to create
   */
  kind: PropTypes.oneOf([
    'primary',
    'secondary',
    'danger',
    'ghost',
    'tertiary',
  ]),

  /**
   * A component used to render an icon.
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Specify the size of the `ChatButton`, from the following list of sizes:
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export default ChatButton;
