/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
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

interface IconIndicatorProps {
  /**
   * Specify an optional className to add.
   */
  className?: string;

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

export const IconIndicator = React.forwardRef(function IconIndicatorContent(
  {
    className: customClassName,
    kind,
    label,
    size = 16,
    ...rest
  }: IconIndicatorProps,
  ref: React.Ref<HTMLDivElement>
) {
  const prefix = usePrefix();
  const classNames = cx(`${prefix}--icon-indicator`, customClassName, {
    [`${prefix}--icon-indicator--20`]: size == 20,
  });

  const IconForKind = iconTypes[kind];
  if (!IconForKind) {
    return null;
  }
  return (
    <div className={classNames} ref={ref}>
      <IconForKind
        size={size}
        className={`${prefix}--icon-indicator--${kind}`}
      />
      {label}
    </div>
  );
});

IconIndicator.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,

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
