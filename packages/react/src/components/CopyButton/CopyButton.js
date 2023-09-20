/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { Copy as CopyIcon } from '@carbon/icons-react';
import Copy from '../Copy';
import { LayoutConstraint } from '../Layout';
import { usePrefix } from '../../internal/usePrefix';

export default function CopyButton({
  align = 'bottom',
  iconDescription,
  className,
  ...other
}) {
  const prefix = usePrefix();
  return (
    <LayoutConstraint size={{ default: 'md', max: 'lg' }}>
      <Copy
        align={align}
        className={classnames(className, `${prefix}--copy-btn`)}
        aria-label={iconDescription}
        {...other}>
        <CopyIcon className={`${prefix}--snippet__icon`} />
      </Copy>
    </LayoutConstraint>
  );
}

CopyButton.propTypes = {
  /**
   * Specify how the trigger should align with the tooltip
   */
  align: PropTypes.oneOf([
    'top',
    'top-left',
    'top-right',
    'bottom',
    'bottom-left',
    'bottom-right',
    'left',
    'right',
  ]),

  /**
   * Specify an optional className to be applied to the underlying `<button>`
   */
  className: PropTypes.string,

  /**
   * Specify the string that is displayed when the button is clicked and the
   * content is copied
   */
  feedback: PropTypes.string,

  /**
   * Specify the time it takes for the feedback message to timeout
   */
  feedbackTimeout: PropTypes.number,

  /**
   * Provide a description for the icon representing the copy action that can
   * be read by screen readers
   */
  iconDescription: PropTypes.string,

  /**
   * Specify an optional `onClick` handler that is called when the underlying
   * `<button>` is clicked
   */
  onClick: PropTypes.func,
};

CopyButton.defaultProps = {
  iconDescription: 'Copy to clipboard',
  feedback: 'Copied!',
  feedbackTimeout: 2000,
  onClick: () => {},
};
