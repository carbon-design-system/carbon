/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import CheckmarkOutline16 from '@carbon/icons/es/checkmark--outline/16.js';
import CircleDash16 from '@carbon/icons/es/circle-dash/16.js';
import Warning16 from '@carbon/icons/es/warning/16.js';
import Incomplete16 from '@carbon/icons/es/incomplete/16.js';
import FocusMixin from '../../globals/mixins/focus';
import { PROGRESS_STEP_STAT } from './defs';
import styles from './progress-indicator.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { iconLoader } from '../../globals/internal/icon-loader';

export { PROGRESS_STEP_STAT };

/**
 * Icons, keyed by state.
 */
const icons = {
  [PROGRESS_STEP_STAT.COMPLETE]: CheckmarkOutline16,
  [PROGRESS_STEP_STAT.INCOMPLETE]: CircleDash16,
  [PROGRESS_STEP_STAT.INVALID]: Warning16,
  [PROGRESS_STEP_STAT.CURRENT]: Incomplete16,
};

/**
 * Progress step.
 *
 * @element cds-progress-step
 * @slot secondary-label-text - The secondary progress label.
 */
@customElement(`${prefix}-progress-step`)
export default class CDSProgressStep extends FocusMixin(LitElement) {
  /**
   * `true` if the progress step should be disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * The a11y text for the icon.
   */
  @property({ attribute: 'icon-label' })
  iconLabel!: string;

  @property({ reflect: true })
  description!: string;

  @property()
  label!: string;

  /**
   * The secondary progress label.
   * @deprecated Use `secondaryLabel` instead
   */
  @property({ attribute: 'secondary-label-text' })
  secondaryLabelText!: string;

  @property({ attribute: 'secondary-label' })
  secondaryLabel!: string;

  /**
   * `true` if the progress step should grow equally to fill space.
   *
   * @private
   */
  @property({ type: Boolean, reflect: true })
  spaceEqually = false;

  /**
   * The progress state.
   */
  @property({ reflect: true })
  state = PROGRESS_STEP_STAT.INCOMPLETE;

  /**
   * `true` if the progress step should be vertical.
   *
   * @private
   */
  @property({ type: Boolean, reflect: true })
  vertical = false;

  /**
   * Set by the parent indicator. If true, the step is interactive unless it is
   * current or disabled. This mirrors React's "onChange prop exists" semantics.
   */
  @property({ type: Boolean })
  clickable = false;

  /**
   * Internal flag to indicate if the state was manually set
   */
  _manualState = false;

  /** React-like boolean props mapped to `state` */
  @property({ type: Boolean, reflect: true })
  get complete() {
    return this.state === PROGRESS_STEP_STAT.COMPLETE;
  }
  set complete(val: boolean) {
    if (val) {
      this.state = PROGRESS_STEP_STAT.COMPLETE;
      this._manualState = true;
    }
  }

  @property({ type: Boolean, reflect: true })
  get current() {
    return this.state === PROGRESS_STEP_STAT.CURRENT;
  }
  set current(val: boolean) {
    if (val) {
      this.state = PROGRESS_STEP_STAT.CURRENT;
      this._manualState = true;
    }
  }

  @property({ type: Boolean, reflect: true })
  get invalid() {
    return this.state === PROGRESS_STEP_STAT.INVALID;
  }
  set invalid(val: boolean) {
    if (val) {
      this.state = PROGRESS_STEP_STAT.INVALID;
      this._manualState = true;
    }
  }

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'listitem');
    }
    super.connectedCallback();
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('disabled')) {
      this.setAttribute('aria-disabled', String(Boolean(this.disabled)));
    }
  }

  // Fire internal click only when interactive
  private _fireStepClick = () => {
    const isUnclickable =
      this.state === PROGRESS_STEP_STAT.CURRENT ||
      this.disabled ||
      !this.clickable;
    if (isUnclickable) return;

    this.dispatchEvent(
      new CustomEvent(`${prefix}-progress-step-click`, {
        bubbles: true,
        composed: true,
        detail: {},
      })
    );
  };

  private _onKeyDown = (ev: KeyboardEvent) => {
    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      this._fireStepClick();
    }
  };

  render() {
    const {
      description,
      iconLabel,
      label,
      secondaryLabelText,
      secondaryLabel,
      state,
    } = this;
    const svgLabel = iconLabel || description;
    const optionalLabel = secondaryLabel || secondaryLabelText;

    // Unclickable if current OR disabled OR no onChange upstream (to match React)
    const isUnclickable =
      state === PROGRESS_STEP_STAT.CURRENT || this.disabled || !this.clickable;

    return html`
      <div
        class="${prefix}--progress-step-button ${isUnclickable
          ? `${prefix}--progress-step-button--unclickable`
          : ''}"
        tabindex="${isUnclickable ? -1 : 0}"
        @click=${this._fireStepClick}
        @keydown=${this._onKeyDown}
        role="button"
        aria-disabled="${String(isUnclickable)}"
        title="${label}">
        ${iconLoader(icons[state], {
          class:
            state === PROGRESS_STEP_STAT.INVALID
              ? `${prefix}--progress__warning`
              : '',
          title: svgLabel,
        })}
        <slot name="label-text">
          <p
            class="${prefix}--progress-label"
            aria-describedby="label-tooltip"
            title="${label}">
            ${label}
          </p>
        </slot>
        <slot name="secondary-label-text">
          ${!optionalLabel
            ? undefined
            : html`<p class="${prefix}--progress-optional">
                ${optionalLabel}
              </p>`}
        </slot>
        <span class="${prefix}--progress-line"></span>
      </div>
    `;
  }

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static styles = styles;
}
