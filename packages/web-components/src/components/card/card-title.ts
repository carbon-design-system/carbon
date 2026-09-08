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
   */
  @property({ attribute: 'label-truncate', reflect: true })
  labelTruncate: string | null = null;

  /**
   * Optional description text rendered below the title (plain string).
   */
  @property({ type: String, reflect: true })
  description!: string;

  /**
   * Enable truncation on the description.
   */
  @property({ attribute: 'description-truncate', reflect: true })
  descriptionTruncate: string | null = null;

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
        <slot name="label">
          ${this.label
            ? html`<div class=${labelClasses} style=${styleMap(labelVars)}>
                ${this.label}
              </div>`
            : nothing}
        </slot>

        <span class=${textRowClasses} style=${styleMap(titleVars)}>
          <slot name="title-start"></slot>
          <slot></slot>
          <slot name="title-end"></slot>
        </span>

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
