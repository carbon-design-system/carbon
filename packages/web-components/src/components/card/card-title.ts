/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { prefix } from '../../globals/settings';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import styles from './card.scss?lit';

/**
 * Card title — primary heading within cds-card-header.
 *
 * Typography is driven by the density set on the parent cds-card:
 * - `productive` (default): $heading-compact-02
 * - `expressive`: $heading-03
 *
 * Truncation is controlled via CSS custom properties that the shared
 * @carbon/styles card mixin reads with `var()`.
 *
 * @element cds-card-title
 * @slot - Title text (required).
 * @slot label - Rich label content rendered above the title (overrides `label` attr).
 * @slot title-start - Leading icon/content (16px productive, 24px expressive).
 * @slot title-end - Trailing icon/content.
 * @slot description - Rich description rendered below the title (overrides `description` attr).
 */
@customElement(`${prefix}-card-title`)
class CDSCardTitle extends LitElement {
  /**
   * Enable truncation on the title text row.
   * - Empty attribute / `true`: single-line ellipsis.
   * - Positive integer string: multi-line `-webkit-line-clamp` value.
   *
   * Stored as a raw string so the attribute value `"3"` is preserved
   * as-is for the CSS custom property.
   */
  @property({ attribute: 'title-truncate', reflect: true })
  titleTruncate: string | null = null;

  /**
   * Maximum width applied to the title text row when truncation is active.
   * @default '100%'
   */
  @property({ attribute: 'max-width', reflect: true })
  maxWidth = '100%';

  /**
   * Optional label text rendered above the title (plain string).
   * Slot `label` takes precedence when populated.
   */
  @property({ type: String, reflect: true })
  label!: string;

  /**
   * Enable truncation on the label.
   * Same semantics as `title-truncate`.
   */
  @property({ attribute: 'label-truncate', reflect: true })
  labelTruncate: string | null = null;

  /**
   * Optional description text rendered below the title (plain string).
   * Slot `description` takes precedence when populated.
   */
  @property({ type: String, reflect: true })
  description!: string;

  /**
   * Enable truncation on the description.
   * Same semantics as `title-truncate`.
   */
  @property({ attribute: 'description-truncate', reflect: true })
  descriptionTruncate: string | null = null;

  // ─── Helpers ─────────────────────────────────────────────────────────────

  /**
   * Parse a truncation attribute value:
   * - `null` / empty string → no truncation
   * - `""` (boolean attr present) | `"true"` → single-line
   * - numeric string → multi-line clamp
   */
  private _parseTruncate(value: string | null): false | true | number {
    if (value === null) return false;
    const num = Number(value);
    if (!isNaN(num) && num > 0) return num;
    return true; // boolean attr present
  }

  render() {
    const blockClass = `${prefix}--card`;

    const titleTruncate = this._parseTruncate(this.titleTruncate);
    const labelTruncate = this._parseTruncate(this.labelTruncate);
    const descTruncate = this._parseTruncate(this.descriptionTruncate);

    const isTitleMulti = typeof titleTruncate === 'number';
    const isLabelMulti = typeof labelTruncate === 'number';
    const isDescMulti = typeof descTruncate === 'number';

    // CSS custom properties for truncation — read by the shared SCSS mixin.
    const titleVars =
      titleTruncate !== false
        ? {
            [`--${prefix}--card--title-max-width`]: this.maxWidth,
            ...(isTitleMulti && {
              [`--${prefix}--card--title-line-clamp`]: String(titleTruncate),
            }),
          }
        : {};

    const labelVars = isLabelMulti
      ? { [`--${prefix}--card--label-line-clamp`]: String(labelTruncate) }
      : {};

    const descVars = isDescMulti
      ? {
          [`--${prefix}--card--description-line-clamp`]: String(descTruncate),
        }
      : {};

    const textRowClasses = classMap({
      [`${blockClass}__title-text-row`]: true,
      [`${blockClass}__title-text-row--truncate`]: titleTruncate === true,
      [`${blockClass}__title-text-row--truncate-multi`]: isTitleMulti,
    });

    const labelClasses = classMap({
      [`${blockClass}__label`]: true,
      [`${blockClass}__label--truncate`]: labelTruncate === true,
      [`${blockClass}__label--truncate-multi`]: isLabelMulti,
    });

    const descClasses = classMap({
      [`${blockClass}__description`]: true,
      [`${blockClass}__description--truncate`]: descTruncate === true,
      [`${blockClass}__description--truncate-multi`]: isDescMulti,
    });

    return html`
      <div class="${blockClass}__title">
        <!-- Label row (slot takes precedence over attr) -->
        <slot name="label">
          ${this.label
            ? html`<div class=${labelClasses} style=${styleMap(labelVars)}>
                ${this.label}
              </div>`
            : nothing}
        </slot>

        <!-- Title text row with optional leading/trailing icons -->
        <span class=${textRowClasses} style=${styleMap(titleVars)}>
          <slot name="title-start"></slot>
          <slot></slot>
          <slot name="title-end"></slot>
        </span>

        <!-- Description row (slot takes precedence over attr) -->
        <slot name="description">
          ${this.description
            ? html`<div class=${descClasses} style=${styleMap(descVars)}>
                ${this.description}
              </div>`
            : nothing}
        </slot>
      </div>
    `;
  }

  static styles = styles;
}

export default CDSCardTitle;
