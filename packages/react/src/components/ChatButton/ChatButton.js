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
    size,
    kind,
    ...other
  },
  ref
) {
  const prefix = usePrefix();
  const classNames = classnames(className, {
    [`${prefix}--chat-btn`]: true,
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
      disabled={isSelected ? isSelected : disabled}
      className={classNames}
      kind={kind}
      ref={ref}
      size={size}
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
};

export default ChatButton;
