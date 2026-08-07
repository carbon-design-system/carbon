/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { forwardRef, ReactNode } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { usePrefix } from '../../internal/usePrefix';
import { getSupportedLocale } from '../../internal/getSupportedLocale';
import { ArrowUp, Information } from '@carbon/icons-react';
import { Tooltip } from '../Tooltip';
import { BigNumberSkeleton } from './BigNumberSkeleton';
import {
  BigNumberSizeValues,
  Characters,
  DefaultLocale,
  formatValue,
  getIconSize,
} from './constants';

const componentName = 'BigNumber';

// NOTE: the component SCSS is not imported here: it is rolled up separately.

export interface BigNumberProps {
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className?: string;

  /**
   * The default behavior will hide `total` if `undefined` or is the same as `value`.
   *
   * Set to `true` to ignore the default behavior and show the `total`.
   */
  forceShowTotal?: boolean;

  /**
   * Specifies the number of fraction digits when truncating `value` and `total`.
   */
  fractionDigits?: number;

  /**
   * Displays an icon button next to `value`.
   */
  iconButton?: ReactNode;

  /**
   * Text label above the `value`.
   */
  label: string;

  /**
   * When `true`, will show the loading state.
   */
  loading?: boolean;

  /**
   * Determines how `value` and `total` will be formatted.
   */
  locale?: string;

  /**
   * Appends a percent sign (_%_) after `value` and hides `total`.
   */
  percentage?: boolean;

  /**
   * Controls the visual size of the component.
   */
  size?: BigNumberSizeValues;

  /**
   * When applied, an information icon will be rendered next to the
   * `label` and the description will be applied to its tooltip.
   */
  tooltipDescription?: string;

  /**
   * The number that will appear after the slash (i.e. the "denominator" of a fraction).
   *
   * This number will not be rendered if it's the same as `value` or
   * `percentage` is true. See also the **forceShowTotal** prop.
   */
  total?: number;

  /**
   * When `true`, will render a "trending up" icon.
   */
  trending?: boolean;

  /**
   * Abbreviates the number when `true`. E.g. from _1,000_ to _1K_.
   */
  truncate?: boolean;

  /**
   * The primary value to display (or the "numerator" of a fraction).
   */
  value?: number;
}

/**
 * BigNumber is used to display large values in a small area. The display of
 * values can be the value itself, or grouped in a `numerator/denominator` fashion.
 * Control over the total fraction decimals displayed as well as how the
 * values/totals are displayed are done via a locale prop. Other optional props
 * allow control over size, truncation, if the value is a percentage, the addition
 * of a button as well as tooltip functionality.
 * The default locale is English (`en-US`) if one is not provided or if the provided one is not supported.
 */
export const BigNumber = forwardRef<HTMLDivElement, BigNumberProps>(
  (
    {
      // The component props, in alphabetical order (for consistency).
      className,
      forceShowTotal = false,
      fractionDigits = 1,
      iconButton,
      label,
      loading = false,
      locale = DefaultLocale,
      percentage = false,
      size = 'default',
      tooltipDescription,
      total,
      trending = false,
      truncate = true,
      value,
      // Collect any other property values passed in.
      ...rest
    },
    ref
  ) => {
    const prefix = usePrefix();
    const blockClass = `${prefix}--big-number`;

    const bigNumberClasses = cx(blockClass, className, {
      [`${blockClass}--lg`]: size === 'lg',
      [`${blockClass}--xl`]: size === 'xl',
    });

    const supportedLocale = getSupportedLocale(locale, DefaultLocale);

    const truncatedValue =
      formatValue(supportedLocale, value, fractionDigits, truncate) ??
      Characters.Dash;

    const truncatedTotal =
      formatValue(supportedLocale, total, fractionDigits, truncate) ??
      'Unknown';

    const shouldDisplayDenominator =
      forceShowTotal ||
      (!percentage &&
        total &&
        value &&
        total > value &&
        truncatedValue !== truncatedTotal);

    if (loading) {
      return (
        <BigNumberSkeleton
          {...rest}
          ref={ref}
          className={className}
          size={size}
          data-component-name={componentName}
        />
      );
    }

    return (
      <figure
        {...rest}
        className={bigNumberClasses}
        ref={ref}
        data-component-name={componentName}>
        {/* Label and tooltip */}
        <span className={`${blockClass}__row`}>
          <figcaption className={`${blockClass}__label`}>{label}</figcaption>
          {tooltipDescription && (
            <Tooltip
              description={tooltipDescription}
              align="right"
              className={`${blockClass}__info`}>
              <button
                type="button"
                className={`${blockClass}__tooltip-trigger`}
                aria-label={tooltipDescription}>
                <Information size={16} />
              </button>
            </Tooltip>
          )}
        </span>

        {/* Value row */}
        <span className={`${blockClass}__row`} role="math">
          {/* Trending up arrow */}
          {trending && (
            <ArrowUp
              className={`${blockClass}__trend`}
              size={getIconSize(size)}
            />
          )}

          {/* Numerator */}
          <span className={`${blockClass}__value`}>
            {percentage ? (
              <div className={`${blockClass}__percentage`}>
                {truncatedValue}
                <span className={`${blockClass}__percentage-mark`}>%</span>
              </div>
            ) : (
              truncatedValue
            )}
          </span>

          {/* Denominator */}
          {shouldDisplayDenominator && (
            <span className={`${blockClass}__total`}>
              <span>{`${Characters.Slash}${truncatedTotal}`}</span>
            </span>
          )}

          <span className={`${blockClass}__icon-button`}>{iconButton}</span>
        </span>
      </figure>
    );
  }
);

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
BigNumber.displayName = componentName;

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
BigNumber.propTypes = {
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,

  /**
   * The default behavior will hide `total` if `undefined` or is the same as `value`.
   *
   * Set to `true` to ignore the default behavior and show the `total`.
   */
  forceShowTotal: PropTypes.bool,

  /**
   * Specifies the number of fraction digits when truncating `value` and `total`.
   */
  fractionDigits: PropTypes.number,

  /**
   * Displays an icon button next to `value`.
   */
  iconButton: PropTypes.node,

  /**
   * Text label above the `value`.
   */
  label: PropTypes.string.isRequired,

  /**
   * When `true`, will show the loading state.
   */
  loading: PropTypes.bool,

  /**
   * Determines how `value` and `total` will be formatted.
   */
  locale: PropTypes.string,

  /**
   * Appends a percent sign (_%_) after `value` and hides `total`.
   */
  percentage: PropTypes.bool,

  /**
   * Controls the visual size of the component.
   */
  size: PropTypes.oneOf(['default', 'lg', 'xl']),

  /**
   * When applied, an information icon will be rendered next to the
   * `label` and the description will be applied to its tooltip.
   */
  tooltipDescription: PropTypes.string,

  /**
   * The number that will appear after the slash (i.e. the "denominator" of a fraction).
   *
   * This number will not be rendered if it's the same as `value` or
   * `percentage` is true. See also the **forceShowTotal** prop.
   */
  total: PropTypes.number,

  /**
   * When `true`, will render a "trending up" icon.
   */
  trending: PropTypes.bool,

  /**
   * Abbreviates the number when `true`. E.g. from _1,000_ to _1K_.
   */
  truncate: PropTypes.bool,

  /**
   * The primary value to display (or the "numerator" of a fraction).
   */
  value: PropTypes.number,
};
