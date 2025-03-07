/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import {
  Critical,
  CriticalSeverity,
  DiamondFill,
  LowSeverity,
  Caution,
  CircleFill,
  CircleStroke,
} from '@carbon/icons-react';

export const ShapeIndicatorKinds = [
  'failed',
  'critical',
  'high',
  'medium',
  'low',
  'cautious',
  'undefined',
  'stable',
  'informative',
  'incomplete',
  'draft',
];

// TODO: update to import '@carbon/icons-react'
const incompleteIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    aria-hidden="true"
    {...props}>
    <path
      fill="#fff"
      fillOpacity={0.01}
      d="M0 0h16v16H0z"
      style={{
        mixBlendMode: 'multiply',
      }}
    />
    <path
      fill="#161616"
      d="M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2Zm0 2a4.004 4.004 0 0 1 4 4H4a4.004 4.004 0 0 1 4-4Z"
    />
  </svg>
);

const shapeTypes = {
  failed: Critical,
  critical: CriticalSeverity,
  high: Caution,
  medium: DiamondFill,
  low: LowSeverity,
  cautious: Caution,
  undefined: DiamondFill,
  stable: CircleFill,
  informative: LowSeverity,
  incomplete: incompleteIcon,
  draft: CircleStroke,
};

export type ShapeIndicatorKind = (typeof ShapeIndicatorKinds)[number];

export interface ShapeIndicatorProps {
  /**
   * Specify an optional className to add.
   */
  className?: string;

  /**
   * Specify the kind of shape to be used
   */
  kind: ShapeIndicatorKind;

  /**
   * Label next to the shape
   */
  label: string;

  /**
   * Specify the text size of the Shape Indicator. Defaults to 12.
   */
  textSize?: 12 | 14;
}

export const ShapeIndicator = React.forwardRef(function ShapeIndicatorContent(
  {
    className: customClassName,
    kind,
    label,
    textSize = 12,
    ...rest
  }: ShapeIndicatorProps,
  ref: React.Ref<HTMLDivElement>
) {
  const prefix = usePrefix();
  const classNames = cx(`${prefix}--shape-indicator`, customClassName, {
    [`${prefix}--shape-indicator--14`]: textSize == 14,
  });

  const ShapeForKind = shapeTypes[kind];
  if (!ShapeForKind) {
    return null;
  }
  return (
    <div className={classNames} ref={ref}>
      <ShapeForKind
        size={16}
        className={`${prefix}--shape-indicator--${kind}`}
      />
      {label}
    </div>
  );
});

ShapeIndicator.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,

  /**
   * Specify the kind of the Shape Indicator
   */
  kind: PropTypes.oneOf(ShapeIndicatorKinds).isRequired,

  /**
   * Label next to the shape.
   */
  label: PropTypes.string.isRequired,

  /**
   * Specify the text size of the Shape Indicator. Defaults to 12.
   */
  textSize: PropTypes.oneOf([12, 14]),
};

export default ShapeIndicator;
