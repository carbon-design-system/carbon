/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';
import classnames from 'classnames';
import { composeEventHandlers } from '../../tools/events';
import { usePrefix } from '../../internal/usePrefix';
import { IconButton } from '../IconButton';

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
  const prefix = usePrefix();
  const classNames = classnames(className, `${prefix}--copy`, {
    [`${prefix}--copy-btn--animating`]: animation,
    [`${prefix}--copy-btn--${animation}`]: animation,
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleAnimationEnd = (event) => {
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

  const initialLabel = other['aria-label'] ?? '';

  return (
    <IconButton
      closeOnActivation={false}
      align="bottom"
      className={classNames}
      label={animation ? feedback : initialLabel}
      onClick={composeEventHandlers([onClick, handleClick])}
      onAnimationEnd={composeEventHandlers([
        onAnimationEnd,
        handleAnimationEnd,
      ])}
      {...other}
      aria-label={
        (!children && (animation ? feedback : other['aria-label'])) || null
      }>
      {children}
    </IconButton>
  );
}

Copy.propTypes = {
  /**
   * Pass in content to be rendered in the underlying `<button>`
   */
  children: PropTypes.node,

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
   * Specify an optional `onAnimationEnd` handler that is called when the underlying
   * animation ends
   */
  onAnimationEnd: PropTypes.func,

  /**
   * Specify an optional `onClick` handler that is called when the underlying
   * `<button>` is clicked
   */
  onClick: PropTypes.func,
};

Copy.defaultProps = {
  feedback: 'Copied!',
  feedbackTimeout: 2000,
  onClick: () => {},
};
