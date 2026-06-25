/**
 * @license
 *
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import { iconLoader } from '@carbon/web-components/es/globals/internal/icon-loader.js';
import { CarbonIcon } from '@carbon/web-components/es/globals/internal/icon-loader-utils';
import ArrowUp16 from '@carbon/icons/es/arrow--up/16';
import ArrowUp20 from '@carbon/icons/es/arrow--up/20';
import ArrowUp24 from '@carbon/icons/es/arrow--up/24';

import { prefix } from '../../globals/settings';
import { getSupportedLocale } from '../../globals/js/utils/getSupportedLocale';
import './big-number-skeleton';
import {
  BigNumberSize,
  BigNumberSizeValues,
  Characters,
  DefaultLocale,
  UNKNOWN,
} from './constants';
import styles from './big-number.scss?lit';

const blockClass = `${prefix}--big-number`;

/**
 * @element c4p-big-number
 * @slot label - Header area that displays the label above the value. This slot can be customized to include an info icon and a tooltip for additional context.
 * @slot trending-icon - Displays an icon indicating trend direction. Can be customized to show a downward arrow when the trend is not upward.
 * @slot icon-button - Displays an icon button next to `value`.
 */
@customElement(`${prefix}-big-number`)
class CDSBigNumber extends LitElement {
  @property({ type: Number, attribute: 'fraction-digits' })
  fractionDigits = 1;

  @property({ type: String })
  label: string | undefined;

  @property({ type: Boolean })
  loading = false;

  @property({ type: String })
  locale = DefaultLocale;

  @property({ type: Boolean })
  percentage = false;

  @property({ type: String })
  size: BigNumberSizeValues = BigNumberSize.Default;

  @property({ type: Number })
  total?: number;

  @property({ type: Boolean })
  trending = false;

  @property({ type: Boolean })
  truncate = true;

  @property({ type: Number })
  value?: number;

  private _getSupportedLocale(
    locale: Intl.LocalesArgument
  ): Intl.LocalesArgument {
    return getSupportedLocale(locale, DefaultLocale);
  }

  private _formatValue(
    locale: Intl.LocalesArgument,
    value: number | null | undefined,
    fractionDigits: number,
    truncate: boolean
  ): string | null | undefined {
    if (value === null || value === undefined || typeof value !== 'number') {
      return null;
    }

    return truncate
      ? Intl.NumberFormat(locale, {
          notation: 'compact',
          minimumFractionDigits: fractionDigits,
          maximumFractionDigits: Math.round(fractionDigits),
        }).format(value)
      : Intl.NumberFormat(locale).format(value);
  }

  private _getTruncatedValue(
    value: number | undefined,
    placeholder: string
  ): string {
    const supportedLocale = this._getSupportedLocale(this.locale);
    const truncatedValue = this._formatValue(
      supportedLocale,
      value,
      this.fractionDigits,
      this.truncate
    );
    return truncatedValue ?? placeholder;
  }

  private _shouldDisplayDenominator(
    truncatedValue: string,
    truncatedTotal: string
  ): boolean {
    return (
      !this.percentage &&
      !!this.total &&
      !!this.value &&
      this.total > this.value &&
      truncatedValue !== truncatedTotal
    );
  }

  private _getTrendingIcon(): CarbonIcon {
    switch (this.size) {
      case BigNumberSize.Large:
        return ArrowUp20;
      case BigNumberSize.XLarge:
        return ArrowUp24;
      default:
        return ArrowUp16;
    }
  }

  render() {
    const { loading, label, percentage, size, total, trending, value } = this;

    const bigNumberClasses = classMap({
      [`${blockClass}`]: true,
      [`${blockClass}--lg`]: size === 'lg',
      [`${blockClass}--xl`]: size === 'xl',
    });

    const truncatedValue = this._getTruncatedValue(value, Characters.Dash);
    const truncatedTotal = this._getTruncatedValue(total, UNKNOWN);
    const shouldDisplayDenominator: boolean = this._shouldDisplayDenominator(
      truncatedValue,
      truncatedTotal
    );

    if (loading) {
      return html`
        <c4p-big-number-skeleton .size=${size}></c4p-big-number-skeleton>
      `;
    }

    return html`
      <div class=${bigNumberClasses}>
        <!-- Label and tooltip  -->
        <span class="${blockClass}__row">
          <slot name="label">
            <h4 class="${blockClass}__label">${label}</h4>
          </slot>
        </span>
        <span class="${blockClass}__row" role="math">
          <!-- Trending up arrow  -->
          ${trending
            ? html`<slot name="trending-icon"
                >${iconLoader(this._getTrendingIcon(), {
                  slot: 'icon',
                  class: `${blockClass}__trend`,
                })}
              </slot>`
            : nothing}

          <!-- Numerator  -->
          <span class="${blockClass}__value">
            ${percentage
              ? html`<div class="${blockClass}__percentage">
                  ${truncatedValue}<span class="${blockClass}__percentage-mark"
                    >${Characters.Percentage}</span
                  >
                </div>`
              : truncatedValue}
          </span>

          <!-- Denominator -->
          ${shouldDisplayDenominator
            ? html`<span class="${blockClass}__total">
                <span>${`${Characters.Slash}${truncatedTotal}`}</span>
              </span>`
            : nothing}

          <!-- Icon button -->
          <span class="${blockClass}__icon-button">
            <slot name="icon-button"></slot>
          </span>
        </span>
      </div>
    `;
  }

  static styles = styles;
}

export default CDSBigNumber;
