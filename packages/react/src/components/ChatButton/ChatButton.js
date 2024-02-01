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
  { className, children, isQuickAction, size, kind, ...other },
  ref
) {
  const prefix = usePrefix();
  const classNames = classnames(className, { [`${prefix}--chat-btn`]: true });

  const allowedSizes = ['sm', 'md', 'lg'];
  const normalizedSize = allowedSizes.includes(size) ? size : 'lg';

  return (
    <Button
      className={classNames}
      kind={kind}
      ref={ref}
      size={normalizedSize}
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
