/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, {
  useState,
  useEffect,
  useCallback,
  AnimationEventHandler,
  MouseEventHandler,
  PropsWithChildren,
} from 'react';
import debounce from 'lodash.debounce';
import classnames from 'classnames';
import { composeEventHandlers } from '../../tools/events';
import { usePrefix } from '../../internal/usePrefix';
import { IconButton } from '../IconButton';
import { noopFn } from '../../internal/noopFn';

interface CopyProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Specify how the trigger should align with the tooltip
   */
  align?:
    | 'top'
    | 'top-left'
    | 'top-right'
    | 'bottom'
    | 'bottom-left'
    | 'bottom-right'
    | 'left'
    | 'right';

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
   * Specify an optional `onAnimationEnd` handler that is called when the underlying
   * animation ends
   */
  onAnimationEnd?: AnimationEventHandler<HTMLButtonElement>;

  /**
   * Specify an optional `onClick` handler that is called when the underlying
   * `<button>` is clicked
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Copy({
  align = 'bottom',
  children,
  className,
  feedback = 'Copied!',
  feedbackTimeout = 2000,
  onAnimationEnd,
  onClick = noopFn,
  ...other
}: PropsWithChildren<CopyProps>) {
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
    if (event.animationName === `${prefix}--hide-feedback`) {
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
      align={align}
      className={classNames}
      label={animation ? feedback : initialLabel}
      onClick={composeEventHandlers([onClick, handleClick])}
      onAnimationEnd={composeEventHandlers([
        onAnimationEnd,
        handleAnimationEnd,
      ])}
      {...other}
      aria-label={
        (!children && (animation ? feedback : other['aria-label'])) || undefined
      }>
      {children}
    </IconButton>
  );
}

Copy.propTypes = {
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
