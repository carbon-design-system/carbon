/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Button from '../Button';
import { usePrefix } from '../../internal/usePrefix';

const ChatButton = React.forwardRef(function ChatButton(
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
  },
  ref
) {
  const prefix = usePrefix();
  const classNames = classnames(className, {
    [`${prefix}--chat-btn`]: true,
    [`${prefix}--chat-btn--with-icon`]: renderIcon,
    [`${prefix}--chat-btn--quick-action`]: isQuickAction,
    [`${prefix}--chat-btn--quick-action--selected`]: isSelected,
  });

  const allowedSizes = ['sm', 'md', 'lg'];

  if (isQuickAction) {
    kind = 'ghost';
    size = 'sm';
  } else {
    // Do not allow size larger than `lg`
    size = allowedSizes.includes(size) ? size : 'lg';
  }

  return (
    <Button
      disabled={disabled}
      className={classNames}
      kind={kind}
      ref={ref}
      size={size}
      renderIcon={renderIcon}
      {...other}>
      {children}
    </Button>
  );
});

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
   * Optional prop to specify an icon to be rendered.
   * Can be a React component class
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Specify the size of the `ChatButton`, from the following list of sizes:
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export default ChatButton;
