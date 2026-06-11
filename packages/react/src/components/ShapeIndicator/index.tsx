/**
 * Copyright IBM Corp. 2025, 2026
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

// TODO: update to import '@carbon/icons-react' https://github.com/carbon-design-system/carbon/issues/18630
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
   * Specify how the tooltip should align with the shape in compact mode
   */
  align?: PopoverAlignment;

  /**
   * Will auto-align the tooltip in compact mode.
   */
  autoAlign?: boolean;

  /**
   * Specify an optional className to add.
   */
  className?: string;

  /**
   * When true, displays only the shape with the label in a tooltip
   */
  compact?: boolean;

  /**
   * Specify the kind of shape to be used
   */
  kind: ShapeIndicatorKind;

  /**
   * Label next to the shape
   */
  label: string;

  /**
   * Additional Description for the shape, used for screen readers in compact mode
   */
  shapeDescription?: string;

  /**
   * Specify the text size of the Shape Indicator. Defaults to 12.
   */
  textSize?: 12 | 14;
}

// eslint-disable-next-line react/display-name -- https://github.com/carbon-design-system/carbon/issues/20452
export const ShapeIndicator = React.forwardRef(
  (
    {
      align = 'right',
      autoAlign = false,
      className: customClassName,
      compact = false,
      kind,
      label,
      shapeDescription = 'Shape',
      textSize = 12,
    }: ShapeIndicatorProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const prefix = usePrefix();
    const classNames = cx(`${prefix}--shape-indicator`, customClassName, {
      [`${prefix}--shape-indicator--14`]: textSize == 14,
    });

    const ShapeForKind = shapeTypes[kind];
    if (!ShapeForKind) {
      return null;
    }

    const shapeElement = (
      <ShapeForKind
        size={16}
        className={`${prefix}--shape-indicator--${kind}`}
      />
    );

    const content = compact ? (
      <DefinitionTooltip
        align={align}
        autoAlign={autoAlign}
        openOnHover
        definition={label}
        triggerClassName={`${prefix}--shape-indicator__button`}>
        {shapeElement}
        <span className={`${prefix}--visually-hidden`}>{shapeDescription}</span>
      </DefinitionTooltip>
    ) : (
      <>
        {shapeElement}
        {label}
      </>
    );

    return (
      <div className={classNames} ref={ref}>
        {content}
      </div>
    );
  }
);

ShapeIndicator.propTypes = {
  /**
   * Specify how the tooltip should align with the shape in compact mode
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
   * Will auto-align the tooltip in compact mode
   */
  autoAlign: PropTypes.bool,

  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,

  /**
   * When true, displays only the shape with the label in a tooltip
   */
  compact: PropTypes.bool,

  /**
   * Specify the kind of the Shape Indicator
   */
  kind: PropTypes.oneOf(ShapeIndicatorKinds).isRequired,

  /**
   * Label next to the shape.
   */
  label: PropTypes.string.isRequired,

  /**
   * Description for the shape, used for accessibility
   */
  shapeDescription: PropTypes.string,

  /**
   * Specify the text size of the Shape Indicator. Defaults to 12.
   */
  textSize: PropTypes.oneOf([12, 14]),
};

export default ShapeIndicator;
