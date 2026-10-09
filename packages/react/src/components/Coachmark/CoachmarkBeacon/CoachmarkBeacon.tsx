/**
 * Copyright IBM Corp. 2024, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { ElementType, forwardRef } from 'react';
import cx from 'classnames';
import { usePrefix } from '../../../internal/usePrefix';
import { type ButtonProps } from '../../Button';

// The block part of our conventional BEM class names (blockClass__E--M).
const componentName = 'CoachmarkBeacon';

/**
 * Reserved for future expansion, i.e. "RING".
 */
export enum BEACON_KIND {
  DEFAULT = 'default',
}

export interface CoachmarkButtonProps extends ButtonProps<ElementType> {
  onClick?(): void;
  onDoubleClick?(): void;
  tabIndex?: number;
  ['aria-expanded']?: boolean;
  id?: string;
}

export interface CoachmarkBeaconProps {
  /**
   * button props
   */
  buttonProps?: CoachmarkButtonProps;
  /**
   * Optional class name for this component.
   */
  className?: string;
  /**
   * What style of beacon.
   * BEACON_KIND is an enum from the Coachmark and can be used for this value.
   * @see {@link BEACON_KIND}
   */
  kind?: BEACON_KIND;
  /**
   * The aria label.
   */
  label: string;
}

/**
 * Use beacon for the target prop of a Coachmark component.
 */
export const CoachmarkBeacon = forwardRef<HTMLDivElement, CoachmarkBeaconProps>(
  (props, ref) => {
    const { buttonProps, className, kind = 'default', label, ...rest } = props;
    const prefix = usePrefix();
    const blockClass = `${prefix}--coachmark-beacon`;

    return (
      <div
        className={cx(blockClass, `${blockClass}-${kind}`, className)}
        data-component-name={componentName}
        {...rest}
        ref={ref}>
        <button
          type="button"
          {...buttonProps}
          className={`${blockClass}__target`}
          aria-label={label}
          title={label}>
          <svg
            className={`${blockClass}__center`}
            aria-hidden="true"
            focusable="false">
            <circle r={1} cx={38} cy={38} />
          </svg>
        </button>
      </div>
    );
  }
);

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
CoachmarkBeacon.displayName = componentName;
