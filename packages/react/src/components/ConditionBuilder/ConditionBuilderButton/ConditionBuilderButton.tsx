/**
 * Copyright IBM Corp. 2024, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useContext } from 'react';
import cx from 'classnames';

import type { PopoverAlignment } from '../../Popover';
import { Tooltip } from '../../Tooltip';
import { type CarbonIconType, WarningAltFilled } from '@carbon/icons-react';
import { usePrefix } from '../../../internal/usePrefix';
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
  const blockClass = `${carbonPrefix}--condition-builder`;

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
        {...rest}>
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
      leaveDelayMs={0}>
      {Button()}
    </Tooltip>
  ) : (
    <>{Button()}</>
  );
};
