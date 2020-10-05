/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { settings } from 'carbon-components';
import {
  CheckmarkOutline16,
  Warning16,
  RadioButton16,
  CircleFilled16,
} from '@carbon/icons-react';
import { keys, matches } from '../../internal/keyboard';

const { prefix } = settings;

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
  renderLabel: ProgressStepLabel,
  translateWithId: t,
  ...rest
}) {
  const classes = classnames({
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
      return <Warning16 className={`${prefix}--progress__warning`} />;
    }
    if (current) {
      return (
        <CircleFilled16>
          <title>{description}</title>
        </CircleFilled16>
      );
    }
    if (complete) {
      return (
        <CheckmarkOutline16>
          <title>{description}</title>
        </CheckmarkOutline16>
      );
    }
    return (
      <RadioButton16>
        <title>{description}</title>
      </RadioButton16>
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
        className={classnames(`${prefix}--progress-step-button`, {
          [`${prefix}--progress-step-button--unclickable`]: !onClick || current,
        })}
        disabled={disabled}
        aria-disabled={disabled}
        tabIndex={!current && onClick && !disabled ? 0 : -1}
        onClick={!current ? onClick : undefined}
        onKeyDown={handleKeyDown}
        title={label}
        {...rest}>
        <span className={`${prefix}--assistive-text`}>{message}</span>
        <SVGIcon
          complete={complete}
          current={current}
          description={description}
          invalid={invalid}
          prefix={prefix}
        />
        <ProgressStepLabel className={`${prefix}--progress-label`}>
          {label}
        </ProgressStepLabel>
        {secondaryLabel !== null && secondaryLabel !== undefined ? (
          <p className={`${prefix}--progress-optional`}>{secondaryLabel}</p>
        ) : null}
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
   * Provide a description for the <ProgressStep>
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
   * Provide the label for the <ProgressStep>
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

  /*
   * An optional parameter to allow for overflow content to be rendered in a
   * tooltip.
   */
  renderLabel: PropTypes.func,

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

const defaultRenderLabel = (props) => <p {...props} />;

const defaultTranslations = {
  'carbon.progress-step.complete': 'Complete',
  'carbon.progress-step.incomplete': 'Incomplete',
  'carbon.progress-step.current': 'Current',
  'carbon.progress-step.invalid': 'Invalid',
};

function translateWithId(messageId) {
  return defaultTranslations[messageId];
}

ProgressStep.defaultProps = {
  renderLabel: defaultRenderLabel,
  translateWithId,
};

export default ProgressStep;
