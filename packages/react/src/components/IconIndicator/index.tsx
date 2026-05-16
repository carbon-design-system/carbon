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
            align="right"
            autoAlign
            definition={label}
            openOnHover
            triggerClassName={`${prefix}--icon-indicator--trigger`}
            aria-label={`Icon`}>
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
