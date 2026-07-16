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

const iconTypes = {
  failed: ErrorFilled,
  'caution-major': WarningAltInvertedFilled,
  'caution-minor': WarningAltFilled,
  undefined: UndefinedFilled,
  succeeded: CheckmarkFilled,
  normal: CheckmarkOutline,
  'in-progress': InProgress,
  incomplete: Incomplete,
  'not-started': CircleDash,
  pending: PendingFilled,
  unknown: UnknownFilled,
  informative: WarningSquareFilled,
} as const;

export const IconIndicatorKinds = Object.keys(
  iconTypes
) as (keyof typeof iconTypes)[];

export type IconIndicatorKind = (typeof IconIndicatorKinds)[number];

export interface IconIndicatorProps {
  /**
   * Specify how the tooltip should align with the icon in compact mode
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
   * When true, displays only the icon with the label in a tooltip
   */
  compact?: boolean;

  /**
   * Description for the icon announced to screen readers in compact mode.
   * Defaults to `label` when not provided.
   */
  iconDescription?: string;

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
      autoAlign = false,
      className: customClassName,
      compact = false,
      iconDescription,
      kind,
      label,
      size = 16,
    }: IconIndicatorProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const prefix = usePrefix();
    const classNames = cx(`${prefix}--icon-indicator`, customClassName, {
      [`${prefix}--icon-indicator--20`]: size === 20,
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

    const content = compact ? (
      <DefinitionTooltip
        align={align}
        autoAlign={autoAlign}
        openOnHover
        definition={label}
        triggerClassName={`${prefix}--icon-indicator__button`}>
        {iconElement}
        <span className={`${prefix}--visually-hidden`}>
          {iconDescription ?? label}
        </span>
      </DefinitionTooltip>
    ) : (
      <>
        {iconElement}
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

IconIndicator.propTypes = {
  /**
   * Specify how the tooltip should align with the icon in compact mode
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
   * When true, displays only the icon with the label in a tooltip
   */
  compact: PropTypes.bool,

  /**
   * Description for the icon announced to screen readers in compact mode.
   * Defaults to `label` when not provided.
   */
  iconDescription: PropTypes.string,

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
