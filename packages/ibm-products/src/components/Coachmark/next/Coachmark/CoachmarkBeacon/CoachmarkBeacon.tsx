/**
 * Copyright IBM Corp. 2024, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Other standard imports.
import PropTypes from 'prop-types';
// Import portions of React that are needed.
import React, { ElementType, forwardRef } from 'react';
import cx from 'classnames';
import { getDevtoolsProps } from '../../../../../global/js/utils/devtools';
import { pkg } from '../../../../../settings';
import { ButtonProps, Button } from '@carbon/react';

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--coachmark-beacon`;
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
export interface CoachmarkBeaconPropsNext {
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
  /**
   * button props
   */
  buttonProps?: CoachmarkButtonProps;
}

/**
 * Use beacon for the target prop of a Coachmark component.
 */
export const CoachmarkBeacon = forwardRef<
  HTMLDivElement,
  CoachmarkBeaconPropsNext
>((props, ref) => {
  const { label, className, kind = 'default', buttonProps, ...rest } = props;

  return (
    <div
      className={cx(blockClass, `${blockClass}-${kind}`, className)}
      {...getDevtoolsProps(componentName)}
      {...rest}
      ref={ref}
    >
      <button
        type="button"
        {...buttonProps}
        className={`${blockClass}__target`}
        aria-label={label}
        title={label}
      >
        <svg
          className={`${blockClass}__center`}
          aria-hidden="true"
          focusable="false"
        >
          <circle r={1} cx={38} cy={38} />
        </svg>
      </button>
    </div>
  );
});

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
CoachmarkBeacon.displayName = componentName;

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
CoachmarkBeacon.propTypes = {
  /**
   * button props
   */
  buttonProps: PropTypes.shape({
    // @ts-ignore - Spreading Button.propTypes is not type-safe but necessary for PropTypes validation
    ...Button.propTypes,
    // @ts-ignore - Adding id to the shape after spreading Button.propTypes
    id: PropTypes.string,
    onClick: PropTypes.func,
    onDoubleClick: PropTypes.func,
    tabIndex: PropTypes.number,
    ['aria-expanded']: PropTypes.bool,
  }),
  /**
   * Optional class name for this component.
   */
  className: PropTypes.string,
  /**
   * What style of beacon.
   * BEACON_KIND is an exported enum from the Coachmark and can be used for this value.
   * @see {@link BEACON_KIND}
   */
  kind: PropTypes.oneOf(['default' as BEACON_KIND.DEFAULT]),
  /**
   * The aria label.
   */
  label: PropTypes.string.isRequired,
};
