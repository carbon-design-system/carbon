/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { keys, matches } from '../../internal/keyboard';
import {
  CheckmarkOutline,
  Warning,
  CircleDash,
  Incomplete,
} from '@carbon/icons-react';
import { usePrefix } from '../../internal/usePrefix';
import { Text } from '../Text';

const defaultTranslations = {
  'carbon.progress-step.complete': 'Complete',
  'carbon.progress-step.incomplete': 'Incomplete',
  'carbon.progress-step.current': 'Current',
  'carbon.progress-step.invalid': 'Invalid',
};

function translateWithId(messageId) {
  return defaultTranslations[messageId];
}
function ProgressIndicator({
  children,
  className: customClassName,
  currentIndex: controlledIndex = 0,
  onChange,
  spaceEqually,
  vertical,
  ...rest
}) {
  const prefix = usePrefix();
  const [currentIndex, setCurrentIndex] = useState(controlledIndex);
  const [prevControlledIndex, setPrevControlledIndex] =
    useState(controlledIndex);
  const className = cx({
    [`${prefix}--progress`]: true,
    [`${prefix}--progress--vertical`]: vertical,
    [`${prefix}--progress--space-equal`]: spaceEqually && !vertical,
    [customClassName]: customClassName,
  });

  if (controlledIndex !== prevControlledIndex) {
    setCurrentIndex(controlledIndex);
    setPrevControlledIndex(controlledIndex);
  }

  return (
    <ul className={className} {...rest}>
      {React.Children.map(children, (child, index) => {
        // only setup click handlers if onChange event is passed
        const onClick = onChange ? () => onChange(index) : undefined;
        if (index === currentIndex) {
          return React.cloneElement(child, {
            complete: child.props.complete,
            current: child.props.complete ? false : true,
            index,
            onClick,
          });
        }
        if (index < currentIndex) {
          return React.cloneElement(child, {
            complete: true,
            index,
            onClick,
          });
        }
        if (index > currentIndex) {
          return React.cloneElement(child, {
            complete: child.props.complete || false,
            index,
            onClick,
          });
        }
        return null;
      })}
    </ul>
  );
}

ProgressIndicator.propTypes = {
  /**
   * Provide `<ProgressStep>` components to be rendered in the
   * `<ProgressIndicator>`
   */
  children: PropTypes.node,

  /**
   * Provide an optional className to be applied to the containing node
   */
  className: PropTypes.string,

  /**
   * Optionally specify the current step array index
   */
  currentIndex: PropTypes.number,

  /**
   * Optional callback called if a ProgressStep is clicked on.  Returns the index of the step.
   */
  onChange: PropTypes.func,

  /**
   * Specify whether the progress steps should be split equally in size in the div
   */
  spaceEqually: PropTypes.bool,
  /**
   * Determines whether or not the ProgressIndicator should be rendered vertically.
   */
  vertical: PropTypes.bool,
};

function ProgressStep({
  label,
  description,
  className,
  current,
  complete,
  invalid,
  secondaryLabel,
  disabled,
  onClick,
  translateWithId: t = translateWithId,
  ...rest
}) {
  const prefix = usePrefix();
  const classes = cx({
    [`${prefix}--progress-step`]: true,
    [`${prefix}--progress-step--current`]: current,
    [`${prefix}--progress-step--complete`]: complete,
    [`${prefix}--progress-step--incomplete`]: !complete && !current,
    [`${prefix}--progress-step--disabled`]: disabled,
    [className]: className,
  });

  const handleKeyDown = (e) => {
    if (matches(e, [keys.Enter, keys.Space])) {
      onClick();
    }
  };

  // eslint-disable-next-line react/prop-types
  const SVGIcon = ({ complete, current, description, invalid, prefix }) => {
    if (invalid) {
      return (
        <Warning className={`${prefix}--progress__warning`}>
          <title>{description}</title>
        </Warning>
      );
    }
    if (current) {
      return (
        <Incomplete>
          <title>{description}</title>
        </Incomplete>
      );
    }
    if (complete) {
      return (
        <CheckmarkOutline>
          <title>{description}</title>
        </CheckmarkOutline>
      );
    }
    return (
      <CircleDash>
        <title>{description}</title>
      </CircleDash>
    );
  };

  let message = t('carbon.progress-step.incomplete');

  if (current) {
    message = t('carbon.progress-step.current');
  }

  if (complete) {
    message = t('carbon.progress-step.complete');
  }

  if (invalid) {
    message = t('carbon.progress-step.invalid');
  }

  return (
    <li className={classes}>
      <button
        type="button"
        className={cx(`${prefix}--progress-step-button`, {
          [`${prefix}--progress-step-button--unclickable`]: !onClick || current,
        })}
        disabled={disabled}
        aria-disabled={disabled}
        tabIndex={!current && onClick && !disabled ? 0 : -1}
        onClick={!current ? onClick : undefined}
        onKeyDown={handleKeyDown}
        title={label}
        {...rest}>
        <SVGIcon
          complete={complete}
          current={current}
          description={description}
          invalid={invalid}
          prefix={prefix}
        />
        <div className={`${prefix}--progress-text`}>
          <Text as="p" className={`${prefix}--progress-label`}>
            {label}
          </Text>
          {secondaryLabel !== null && secondaryLabel !== undefined ? (
            <Text as="p" className={`${prefix}--progress-optional`}>
              {secondaryLabel}
            </Text>
          ) : null}
        </div>
        <span className={`${prefix}--assistive-text`}>{message}</span>
        <span className={`${prefix}--progress-line`} />
      </button>
    </li>
  );
}

ProgressStep.propTypes = {
  /**
   * Provide an optional className to be applied to the containing `<li>` node
   */
  className: PropTypes.string,

  /**
   * Specify whether the step has been completed
   */
  complete: PropTypes.bool,

  /**
   * Specify whether the step is the current step
   */
  current: PropTypes.bool,

  /**
   * Provide a description for the `<ProgressStep>`
   */
  description: PropTypes.string,

  /**
   * Specify whether the step is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Index of the current step within the ProgressIndicator
   */
  index: PropTypes.number,

  /**
   * Specify whether the step is invalid
   */
  invalid: PropTypes.bool,

  /**
   * Provide the label for the `<ProgressStep>`
   */
  label: PropTypes.node.isRequired,

  /**
   * A callback called if the step is clicked or the enter key is pressed
   */
  onClick: PropTypes.func,

  /**
   * Provide the props that describe a progress step tooltip
   */
  overflowTooltipProps: PropTypes.object,

  /**
   * Provide an optional secondary label
   */
  secondaryLabel: PropTypes.string,

  /**
   * The ID of the tooltip content.
   */
  tooltipId: PropTypes.string,

  /**
   * Optional method that takes in a message id and returns an
   * internationalized string.
   */
  translateWithId: PropTypes.func,
};

export { ProgressIndicator, ProgressStep };
