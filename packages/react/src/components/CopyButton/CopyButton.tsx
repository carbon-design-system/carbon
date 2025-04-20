/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { MouseEventHandler } from 'react';
import classnames from 'classnames';
import { Copy as CopyIcon } from '@carbon/icons-react';
import { ButtonProps } from '../Button';
import Copy from '../Copy';
import { LayoutConstraint } from '../Layout';
import { usePrefix } from '../../internal/usePrefix';
import { noopFn } from '../../internal/noopFn';
import deprecateValuesWithin from '../../prop-types/deprecateValuesWithin';
import { mapPopoverAlign } from '../../tools/mapPopoverAlign';

export type DeprecatedCopyButtonAlignment =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'left-bottom'
  | 'left-top'
  | 'right-bottom'
  | 'right-top';

export type NewCopyButtonAlignment =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-end'
  | 'left-start'
  | 'right-end'
  | 'right-start';

export type CopyButtonAlignment =
  | DeprecatedCopyButtonAlignment
  | NewCopyButtonAlignment;

export interface CopyButtonProps extends ButtonProps<'button'> {
  /**
   * Specify how the trigger should align with the tooltip
   */
  align?: CopyButtonAlignment;

  /**
   * **Experimental**: Will attempt to automatically align the tooltip
   */
  autoAlign?: boolean;

  /**
   * Specify an optional className to be applied to the underlying `<button>`
   */
  className?: string;

  /**
   * Specify the string that is displayed when the button is clicked and the
   * content is copied
   */
  feedback?: string;

  /**
   * Specify the time it takes for the feedback message to timeout
   */
  feedbackTimeout?: number;

  /**
   * Provide a description for the icon representing the copy action that can
   * be read by screen readers
   */
  iconDescription?: string;

  /**
   * Specify an optional `onClick` handler that is called when the underlying
   * `<button>` is clicked
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
export default function CopyButton({
  align = 'bottom',
  autoAlign = false,
  feedback = 'Copied!',
  feedbackTimeout = 2000,
  iconDescription = 'Copy to clipboard',
  className,
  onClick = noopFn,
  ...other
}: CopyButtonProps) {
  const prefix = usePrefix();
  return (
    <LayoutConstraint size={{ default: 'md', max: 'lg' }}>
      <Copy
        feedback={feedback}
        feedbackTimeout={feedbackTimeout}
        onClick={onClick}
        align={align}
        autoAlign={autoAlign}
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
  align: deprecateValuesWithin(
    PropTypes.oneOf([
      'top',
      'top-left', // deprecated use top-start instead
      'top-right', // deprecated use top-end instead

      'bottom',
      'bottom-left', // deprecated use bottom-start instead
      'bottom-right', // deprecated use bottom-end instead

      'left',
      'left-bottom', // deprecated use left-end instead
      'left-top', // deprecated use left-start instead

      'right',
      'right-bottom', // deprecated use right-end instead
      'right-top', // deprecated use right-start instead

      // new values to match floating-ui
      'top-start',
      'top-end',
      'bottom-start',
      'bottom-end',
      'left-end',
      'left-start',
      'right-end',
      'right-start',
    ]),
    [
      'top',
      'top-start',
      'top-end',
      'bottom',
      'bottom-start',
      'bottom-end',
      'left',
      'left-start',
      'left-end',
      'right',
      'right-start',
      'right-end',
    ],
    mapPopoverAlign
  ),

  /**
   * **Experimental**: Will attempt to automatically align the tooltip
   */
  autoAlign: PropTypes.bool,

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
