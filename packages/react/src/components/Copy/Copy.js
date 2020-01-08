/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';
import classnames from 'classnames';
import { settings } from 'carbon-components';
import { composeEventHandlers } from '../../tools/events';

const { prefix } = settings;

export default function Copy({
  children,
  className,
  feedback,
  feedbackTimeout,
  onAnimationEnd,
  onClick,
  ...other
}) {
  const [animation, setAnimation] = useState('');
  const classNames = classnames(className, {
    [`${prefix}--copy-btn--animating`]: animation,
    [`${prefix}--copy-btn--${animation}`]: animation,
  });
  const handleFadeOut = useCallback(
    debounce(() => {
      setAnimation('fade-out');
    }, feedbackTimeout),
    [feedbackTimeout]
  );
  const handleClick = useCallback(() => {
    setAnimation('fade-in');
    handleFadeOut();
  }, [handleFadeOut]);
  const handleAnimationEnd = event => {
    if (event.animationName === 'hide-feedback') {
      setAnimation('');
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
      onClick={composeEventHandlers([onClick, handleClick])}
      onAnimationEnd={composeEventHandlers([
        onAnimationEnd,
        handleAnimationEnd,
      ])}
      {...other}>
      {children}
      <span
        className={`${prefix}--assistive-text ${prefix}--copy-btn__feedback`}>
        {feedback}
      </span>
    </button>
  );
}

Copy.propTypes = {
  /**
   * Pass in content to be rendred in the underlying <button>
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the underlying <button>
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
   * Specify an optional `onClick` handler that is called when the underlying
   * <button> is clicked
   */
  onClick: PropTypes.func,
};

Copy.defaultProps = {
  feedback: 'Copied!',
  feedbackTimeout: 2000,
  onClick: () => {},
};
