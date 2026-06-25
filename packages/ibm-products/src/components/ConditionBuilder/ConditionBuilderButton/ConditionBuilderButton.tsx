/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useContext } from 'react';
import cx from 'classnames';

import PropTypes from 'prop-types';
import { PopoverAlignment, Tooltip } from '@carbon/react';
import { CarbonIconType, WarningAltFilled } from '@carbon/react/icons';
import { usePrefix } from '@carbon/react';
import { blockClass } from '../utils/util';
import { ConditionBuilderContext } from '../ConditionBuilderContext/ConditionBuilderProvider';

interface ConditionBuilderButtonProps {
  className?: string;
  label: string;
  hideLabel?: boolean;
  tooltipAlign?: PopoverAlignment;
  renderIcon?: CarbonIconType;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
  onFocus?: React.FocusEventHandler<HTMLButtonElement>;
  onMouseEnter?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  showToolTip?: boolean;
  wrapperProps?: object;
  isInvalid?: boolean;
  wrapperClassName?: string;
  tabIndex?: number;
  description?: string;
}

export const ConditionBuilderButton = ({
  className,
  label,
  hideLabel,
  tooltipAlign,
  renderIcon: Icon,
  onClick,
  showToolTip,
  wrapperProps,
  onBlur,
  onFocus,
  onMouseEnter,
  onMouseLeave,
  isInvalid,
  wrapperClassName,
  tabIndex,
  description,
  ...rest
}: ConditionBuilderButtonProps) => {
  const tooltipText = description || label;

  const carbonPrefix = usePrefix();

  const Button = () => {
    const dataName = rest['data-name'] ?? '';
    const { readOnly } = useContext(ConditionBuilderContext);
    const handleClick = (e) => {
      if (readOnly) {
        return;
      }
      onClick?.(e);
    };
    return (
      <button
        tabIndex={tabIndex !== undefined ? tabIndex : -1}
        className={cx([
          className,
          `${blockClass}__button`,
          {
            [`${blockClass}__text-ellipsis`]:
              showToolTip && !hideLabel && !isInvalid,
          },
          { [`${blockClass}__invalid-input`]: isInvalid },
        ])}
        type="button"
        onClick={handleClick}
        onBlur={onBlur}
        onFocus={onFocus}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        data-name={dataName}
        aria-disabled={readOnly}
        {...rest}
      >
        {Icon && <Icon />}
        {!hideLabel && <span>{label}</span>}
        {isInvalid && <WarningAltFilled />}
      </button>
    );
  };

  return hideLabel || showToolTip || description ? (
    <Tooltip
      label={tooltipText}
      align={tooltipAlign}
      className={`${wrapperClassName} ${blockClass}__tooltip ${carbonPrefix}--icon-tooltip`}
      {...wrapperProps}
      leaveDelayMs={0}
    >
      {Button()}
    </Tooltip>
  ) : (
    <>{Button()}</>
  );
};

ConditionBuilderButton.propTypes = {
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,

  /**
   * decides if label and tooltip to be hidden
   */
  hideLabel: PropTypes.bool,
  /**
   * boolean to know the updated value in not valid
   */
  isInvalid: PropTypes.bool,
  /**
   * label of the button
   */
  label: PropTypes.string,
  /**
   * mouse events callbacks
   */
  onBlur: PropTypes.func,
  /**
   * callback triggered on click of add button
   */
  onClick: PropTypes.func,
  onFocus: PropTypes.func,

  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  /**
   * Optional prop to allow overriding the icon rendering.
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   */
  /**
   *decides if  tooltip to be shown
   */
  showToolTip: PropTypes.bool,
  /**
   * Tab index
   */
  tabIndex: PropTypes.number,
  /**
   * tooltip position
   */
  tooltipAlign: PropTypes.string,
  /**
   * classname applies to the wrapper of popover
   */
  wrapperClassName: PropTypes.string,
  /**
   * optional props for tree grid to add role and aria-label to wrapper span
   */
  wrapperProps: PropTypes.object,
};
