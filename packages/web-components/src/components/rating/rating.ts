/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { prefix } from '../../globals/settings';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { RATING_VARIANT, RATING_SIZE } from './defs';
import { iconLoader } from '../../globals/internal/icon-loader';
import styles from './rating.scss?lit';
import ThumbsUp16 from '@carbon/icons/es/thumbs-up/16.js';
import ThumbsDown16 from '@carbon/icons/es/thumbs-down/16.js';
import ThumbsUpFilled16 from '@carbon/icons/es/thumbs-up--filled/16.js';
import ThumbsDownFilled16 from '@carbon/icons/es/thumbs-down--filled/16.js';
import Star16 from '@carbon/icons/es/star/16.js';
import StarFilled16 from '@carbon/icons/es/star--filled/16.js';

export { RATING_VARIANT, RATING_SIZE };

/**
 * Rating component.
 *
 * @element cds-rating
 * @fires cds-rating-changed - The custom event fired after the rating value changes.
 * @slot label-text - The label text.
 */
@customElement(`${prefix}-rating`)
class CDSRating extends LitElement {
  /**
   * Whether to show animations on interaction.
   */
  @property({ type: Boolean, attribute: 'animated', reflect: true })
  animated = true;

  /**
   * The aria-label for the rating group when no label-text is provided.
   */
  @property({ attribute: 'aria-label' })
  ariaLabel = 'Rating';

  /**
   * Whether the rating is disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Label for the highest value (right side of the NPS scale).
   */
  @property({ attribute: 'label-max' })
  labelMax = 'Very likely';

  /**
   * Label for the lowest value (left side of the NPS scale).
   */
  @property({ attribute: 'label-min' })
  labelMin = 'Not likely';

  /**
   * The label text for accessibility.
   */
  @property({ attribute: 'label-text' })
  labelText = '';

  /**
   * The label for the thumb down button.
   */
  @property({ attribute: 'label-thumbs-down' })
  labelThumbsDown = 'Not useful';

  /**
   * The label for the thumb up button.
   */
  @property({ attribute: 'label-thumbs-up' })
  labelThumbsUp = 'Useful';

  /**
   * The maximum rating value (used by star variant).
   */
  @property({ type: Number })
  max = 5;

  /**
   * Whether the rating is read-only.
   */
  @property({ reflect: true, attribute: 'read-only', type: Boolean })
  readOnly = false;

  /**
   * The size of the rating component.
   */
  @property({ reflect: true })
  size = RATING_SIZE.MEDIUM;

  /**
   * The aria-label format for each star button.
   * Use {value} and {max} as placeholders.
   */
  @property({ attribute: 'star-label-format', reflect: true })
  starLabelFormat = '{value} out of {max}';

  /**
   * The current rating value.
   */
  @property({ type: Number, reflect: true })
  value: number | null = null;

  /**
   * The rating variant.
   */
  @property({ reflect: true })
  variant = RATING_VARIANT.STAR;

  /**
   * Internal animation state for the currently animating star.
   */
  @state()
  private _animatingStarValue: number | null = null;

  /**
   * Internal animation state for the thumb down button.
   */
  @state()
  private _animatingThumbDown = false;

  /**
   * Internal animation state for the thumb up button.
   */
  @state()
  private _animatingThumbUp = false;

  /**
   * Internal hover state for thumb variant preview.
   */
  @state()
  private _hoverThumb: 'up' | 'down' | null = null;

  /**
   * Internal hover state for star variant preview.
   */
  @state()
  private _hoverValue: number | null = null;

  /**
   * Timer for star and thumb up animations.
   */
  private _animationTimer: ReturnType<typeof setTimeout> | null = null;

  /**
   * Timer for thumb down animations.
   */
  private _thumbDownAnimTimer: ReturnType<typeof setTimeout> | null = null;

  /**
   * Cleans up animation timers when the component is disconnected.
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._animationTimer) {
      clearTimeout(this._animationTimer);
      this._animationTimer = null;
    }
    if (this._thumbDownAnimTimer) {
      clearTimeout(this._thumbDownAnimTimer);
      this._thumbDownAnimTimer = null;
    }
  }

  /**
   * Handles value change and dispatches the change event.
   */
  private _handleChange(newValue: number | null) {
    if (this.disabled || this.readOnly) return;
    this.value = newValue;
    const { eventChange } = this.constructor as typeof CDSRating;
    this.dispatchEvent(
      new CustomEvent(eventChange, {
        bubbles: true,
        composed: true,
        detail: { value: this.value },
      })
    );
  }

  /**
   * Handles star button click and triggers pop animation.
   */
  private _handleStarClick(starValue: number) {
    if (this.disabled || this.readOnly) return;
    this._handleChange(starValue);
    if (this._animationTimer) clearTimeout(this._animationTimer);
    this._animatingStarValue = starValue;
    this._animationTimer = setTimeout(() => {
      this._animatingStarValue = null;
      this._animationTimer = null;
    }, 600);
  }

  /**
   * Handles thumb up button click and triggers animation.
   */
  private _handleThumbUpClick = () => {
    if (this.disabled || this.readOnly) return;
    const isLiking = this.value !== 1;
    this._handleChange(isLiking ? 1 : null);
    if (!isLiking) return;
    if (this._animationTimer) clearTimeout(this._animationTimer);
    this._animatingThumbUp = true;
    this._animationTimer = setTimeout(() => {
      this._animatingThumbUp = false;
      this._animationTimer = null;
    }, 600);
  };

  /**
   * Handles thumb down button click and triggers animation.
   */
  private _handleThumbDownClick = () => {
    if (this.disabled || this.readOnly) return;
    const isDisliking = this.value !== 0;
    this._handleChange(isDisliking ? 0 : null);
    if (!isDisliking) return;
    if (this._thumbDownAnimTimer) clearTimeout(this._thumbDownAnimTimer);
    this._animatingThumbDown = true;
    this._thumbDownAnimTimer = setTimeout(() => {
      this._animatingThumbDown = false;
      this._thumbDownAnimTimer = null;
    }, 600);
  };

  render() {
    const {
      animated,
      ariaLabel,
      disabled,
      labelMax,
      labelMin,
      labelText,
      labelThumbsDown,
      labelThumbsUp,
      max,
      readOnly,
      size,
      starLabelFormat,
      value,
      variant,
    } = this;

    const classes = classMap({
      [`${prefix}--rating`]: true,
      [`${prefix}--rating--${size}`]: !!size,
    });

    if (variant === RATING_VARIANT.THUMB) {
      const thumbUpClasses = classMap({
        [`${prefix}--rating__thumb-btn`]: true,
        [`${prefix}--rating__thumb-btn--up`]:
          value === 1 || this._hoverThumb === 'up',
        [`${prefix}--rating__thumb-btn--animating`]: this._animatingThumbUp,
        [`${prefix}--rating__thumb-btn--animating-particles`]:
          this._animatingThumbUp && animated,
      });
      const thumbDownClasses = classMap({
        [`${prefix}--rating__thumb-btn`]: true,
        [`${prefix}--rating__thumb-btn--down`]:
          value === 0 || this._hoverThumb === 'down',
        [`${prefix}--rating__thumb-btn--animating-down`]:
          this._animatingThumbDown,
        [`${prefix}--rating__thumb-btn--animating-down-particles`]:
          this._animatingThumbDown && animated,
      });
      return html`
        <fieldset
          class=${classes}
          ?disabled=${disabled}
          aria-readonly=${readOnly}>
          <legend class="${prefix}--rating__label">
            <slot name="label-text">${labelText || ariaLabel}</slot>
          </legend>
          <div class="${prefix}--rating__thumb">
            <button
              class=${thumbUpClasses}
              aria-pressed=${value === 1}
              aria-label=${labelThumbsUp}
              @click=${this._handleThumbUpClick}
              @mouseenter=${() => {
                if (!readOnly && !disabled) this._hoverThumb = 'up';
              }}
              @mouseleave=${() => {
                this._hoverThumb = null;
              }}>
              ${value === 1
                ? iconLoader(ThumbsUpFilled16)
                : iconLoader(ThumbsUp16)}
            </button>
            <button
              class=${thumbDownClasses}
              aria-pressed=${value === 0}
              aria-label=${labelThumbsDown}
              @click=${this._handleThumbDownClick}
              @mouseenter=${() => {
                if (!readOnly && !disabled) this._hoverThumb = 'down';
              }}
              @mouseleave=${() => {
                this._hoverThumb = null;
              }}>
              ${value === 0
                ? iconLoader(ThumbsDownFilled16)
                : iconLoader(ThumbsDown16)}
            </button>
          </div>
        </fieldset>
      `;
    }
    if (variant === RATING_VARIANT.STAR) {
      const activeValue = this._hoverValue ?? value ?? 0;
      return html`
        <fieldset
          class=${classes}
          ?disabled=${disabled}
          aria-readonly=${readOnly}>
          <legend class="${prefix}--rating__label">
            <slot name="label-text">${labelText || ariaLabel}</slot>
          </legend>
          <div
            class="${prefix}--rating__stars"
            @mouseleave=${() => {
              this._hoverValue = null;
            }}>
            ${Array.from({ length: max }, (_, i) => {
              const starValue = i + 1;
              const isFilled = starValue <= activeValue;
              const starClasses = classMap({
                [`${prefix}--rating__star-btn`]: true,
                [`${prefix}--rating__star-btn--filled`]: isFilled,
                [`${prefix}--rating__star-btn--animating`]:
                  starValue === this._animatingStarValue,
                [`${prefix}--rating__star-btn--animating-particles`]:
                  starValue === this._animatingStarValue && animated,
              });
              return html`
                <button
                  class=${starClasses}
                  role="radio"
                  aria-checked=${value === starValue}
                  aria-label=${starLabelFormat
                    .replace('{value}', String(starValue))
                    .replace('{max}', String(max))}
                  @click=${() => this._handleStarClick(starValue)}
                  @mouseenter=${() => {
                    if (!readOnly && !disabled) this._hoverValue = starValue;
                  }}>
                  ${isFilled ? iconLoader(StarFilled16) : iconLoader(Star16)}
                </button>
              `;
            })}
          </div>
        </fieldset>
      `;
    }
    if (variant === RATING_VARIANT.NPS) {
      return html`
        <fieldset
          class=${classes}
          ?disabled=${disabled}
          aria-readonly=${readOnly}>
          <legend class="${prefix}--rating__label">
            <slot name="label-text">${labelText || ariaLabel}</slot>
          </legend>
          <div class="${prefix}--rating__nps-wrapper">
            <span class="${prefix}--rating__nps-label">${labelMin}</span>
            <div
              class="${prefix}--rating__nps"
              @mouseleave=${() => {
                this._hoverValue = null;
              }}>
              ${Array.from({ length: max + 1 }, (_, i) => {
                const isSelected = value === i;
                const isHovered = this._hoverValue === i;
                return html`
                  <button
                    class=${classMap({
                      [`${prefix}--rating__nps-btn`]: true,
                      [`${prefix}--rating__nps-btn--selected`]: isSelected,
                      [`${prefix}--rating__nps-btn--hovered`]:
                        isHovered && !isSelected,
                    })}
                    role="radio"
                    aria-checked=${isSelected}
                    aria-label=${`${i} out of ${max}`}
                    @click=${() => this._handleChange(i)}
                    @mouseenter=${() => {
                      if (!readOnly && !disabled) {
                        this._hoverValue = i;
                      }
                    }}>
                    ${i}
                  </button>
                `;
              })}
            </div>
            <span class="${prefix}--rating__nps-label">${labelMax}</span>
          </div>
        </fieldset>
      `;
    }
    return html``;
  }

  /**
   * The name of the custom event fired after the rating value changes.
   */
  static get eventChange() {
    return `${prefix}-rating-changed`;
  }

  static styles = styles;
}

export default CDSRating;
