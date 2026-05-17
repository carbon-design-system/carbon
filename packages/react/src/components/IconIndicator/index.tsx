/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import { DefinitionTooltip } from '../Tooltip';
import { PopoverAlignment } from '../Popover';
import {
  ErrorFilled,
  CheckmarkFilled,
  WarningAltFilled,
  WarningAltInvertedFilled,
  UndefinedFilled,
  InProgress,
  Incomplete,
  CircleDash,
  UnknownFilled,
  WarningSquareFilled,
  CheckmarkOutline,
  PendingFilled,
} from '@carbon/icons-react';

export const IconIndicatorKinds = [
  'failed',
  'caution-major',
  'caution-minor',
  'undefined',
  'succeeded',
  'normal',
  'in-progress',
  'incomplete',
  'not-started',
  'pending',
  'unknown',
  'informative',
];

const iconTypes = {
  failed: ErrorFilled,
  ['caution-major']: WarningAltInvertedFilled,
  ['caution-minor']: WarningAltFilled,
  undefined: UndefinedFilled,
  succeeded: CheckmarkFilled,
  normal: CheckmarkOutline,
  ['in-progress']: InProgress,
  incomplete: Incomplete,
  ['not-started']: CircleDash,
  pending: PendingFilled,
  unknown: UnknownFilled,
  informative: WarningSquareFilled,
};

export type IconIndicatorKind = (typeof IconIndicatorKinds)[number];

export interface IconIndicatorProps {
  /**
   * Specify how the tooltip should align with the icon in compact mode.
   * Only applies when compact is true.
   */
  align?: PopoverAlignment;

  /**
   * Specify the aria-label for the tooltip trigger in compact mode.
   * Only applies when compact is true.
   */
  ariaLabel?: string;

  /**
   * Will auto-align the tooltip in compact mode.
   * Only applies when compact is true.
   */
  autoAlign?: boolean;

  /**
   * Specify an optional className to add.
   */
  className?: string;

  /**
   * When true, displays only the icon with the label in a tooltip.
   * Use this when there is no enough space to display the label.
   */
  compact?: boolean;

  /**
   * Specify the kind of icon to be used
   */
  kind: IconIndicatorKind;

  /**
   * Label next to the icon
   */
  label: string;

  /**
   * Specify the size of the Icon Indicator. Defaults to 16.
   */
  size?: 16 | 20;
}

// eslint-disable-next-line react/display-name -- https://github.com/carbon-design-system/carbon/issues/20452
export const IconIndicator = React.forwardRef(
  (
    {
      align = 'right',
      ariaLabel = 'Icon',
      autoAlign = true,
      className: customClassName,
      compact = false,
      kind,
      label,
      size = 16,
    }: IconIndicatorProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const prefix = usePrefix();
    const classNames = cx(`${prefix}--icon-indicator`, customClassName, {
      [`${prefix}--icon-indicator--20`]: size == 20,
    });

    const IconForKind = iconTypes[kind];
    if (!IconForKind) {
      return null;
    }

    const iconElement = (
      <IconForKind
        size={size}
        className={`${prefix}--icon-indicator--${kind}`}
      />
    );

    if (compact) {
      return (
        <div className={classNames} ref={ref}>
          <DefinitionTooltip
            align={align}
            aria-label={ariaLabel}
            autoAlign={autoAlign}
            definition={label}
            openOnHover
            triggerClassName={`${prefix}--icon-indicator--trigger`}>
            {iconElement}
          </DefinitionTooltip>
        </div>
      );
    }

    return (
      <div className={classNames} ref={ref}>
        {iconElement}
        {label}
      </div>
    );
  }
);

IconIndicator.propTypes = {
  /**
   * Specify how the tooltip should align with the icon in compact mode.
   * Only applies when compact is true.
   */
  align: PropTypes.oneOf([
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
  ]),

  /**
   * Specify the aria-label for the tooltip trigger in compact mode.
   * Only applies when compact is true.
   */
  ariaLabel: PropTypes.string,

  /**
   * Will auto-align the tooltip in compact mode. This prop is currently experimental
   * and is subject to future changes.
   * Only applies when compact is true.
   */
  autoAlign: PropTypes.bool,

  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,

  /**
   * When true, displays only the icon with the label in a tooltip
   * Use this when there is no enough space to display the label.
   */
  compact: PropTypes.bool,

  /**
   * Specify the kind of the Icon Indicator
   */
  kind: PropTypes.oneOf(IconIndicatorKinds).isRequired,

  /**
   * Label next to the icon.
   */
  label: PropTypes.string.isRequired,

  /**
   * Specify the size of the Icon Indicator. Defaults to 16.
   */
  size: PropTypes.oneOf([16, 20]),
};

export default IconIndicator;
