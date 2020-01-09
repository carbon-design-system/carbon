/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';
import classnames from 'classnames';
import debounce from 'lodash.debounce';
import { settings } from 'carbon-components';
import { Copy16 } from '@carbon/icons-react';

const { prefix } = settings;

export default function CopyButton({
  iconDescription,
  className,
  feedback,
  feedbackTimeout,
  onAnimationEnd,
  onClick,
  ...other
}) {
  const [animation, setAnimation] = useState('');
  const classNames = classnames(`${prefix}--copy-btn`, className, {
    [`${prefix}--copy-btn--animating`]: animation,
    [`${prefix}--copy-btn--${animation}`]: animation,
  });
  const handleFadeOut = useCallback(
    debounce(() => {
      setAnimation('fade-out');
    }, feedbackTimeout),
    [feedbackTimeout]
  );
  const handleClick = useCallback(
    event => {
      setAnimation('fade-in');
      onClick(event);
      handleFadeOut();
    },
    [onClick, handleFadeOut]
  );
  const handleAnimationEnd = event => {
    if (event.animationName === 'hide-feedback') {
      setAnimation('');
    }
    if (onAnimationEnd) {
      onAnimationEnd(event);
    }
  };

  useEffect(
    () => () => {
      handleFadeOut.cancel();
    },
    [handleFadeOut]
  );

  return (
    <button
      type="button"
      className={classNames}
      onClick={handleClick}
      aria-label={iconDescription}
      title={iconDescription}
      onAnimationEnd={handleAnimationEnd}
      {...other}>
      <span
        className={`${prefix}--assistive-text ${prefix}--copy-btn__feedback`}>
        {feedback}
      </span>
      <Copy16 className={`${prefix}--snippet__icon`} />
    </button>
  );
}

CopyButton.propTypes = {
  /**
   * Specify an optional className to be applied to the underlying <button>
   */
  className: PropTypes.string,

  /**
   * Provide a description for the icon representing the copy action that can
   * be read by screen readers
   */
  iconDescription: PropTypes.string,

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
   * Specify an optional `onClick` handler that is called when the underlying
   * <button> is clicked
   */
  onClick: PropTypes.func,
};

CopyButton.defaultProps = {
  iconDescription: 'Copy to clipboard',
  feedback: 'Copied!',
  feedbackTimeout: 2000,
  onClick: () => {},
};
