/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { Copy16 } from '@carbon/icons-react';
import Copy from '../Copy';
import { usePrefix } from '../../internal/usePrefix';
import deprecate from '../../prop-types/deprecate';

export default function CopyButton({
  iconDescription,
  className,
  label,
  ...other
}) {
  const prefix = usePrefix();
  return (
    <Copy
      className={classnames(className, `${prefix}--copy-btn`)}
      aria-label={iconDescription}
      title={iconDescription}
      label={label}
      {...other}>
      <Copy16 className={`${prefix}--snippet__icon`} />
    </Copy>
  );
}

CopyButton.propTypes = {
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
   * The iconDescription prop is deprecated. Use aria-label, aria-labelledby, or aria-describedby to label your component.
   */
  iconDescription: deprecate(
    PropTypes.string,
    'The iconDescription prop is no longer needed and can be safely removed. This prop will be removed in the next major release of Carbon.'
  ),

  /**
   * Use the label prop to describe the copy button. This is needed for accessibility.
   */
  label: PropTypes.string,

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
