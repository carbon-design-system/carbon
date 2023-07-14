/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html, svg } from 'lit';
import { property } from 'lit/decorators.js';
import CheckmarkOutline16 from '@carbon/icons/lib/checkmark--outline/16';
import CircleDash16 from '@carbon/icons/lib/circle-dash/16';
import Incomplete16 from '@carbon/icons/lib/incomplete/16';
import Warning16 from '@carbon/icons/lib/warning/16';
import { prefix } from '../../globals/settings';
import FocusMixin from '../../globals/mixins/focus';
import { PROGRESS_STEP_STAT } from './defs';
import styles from './progress-indicator.scss';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

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

  /**
   * The primary progress label.
   */
  @property({ attribute: 'label-text' })
  labelText!: string;

  @property()
  label!: string;

  /**
   * The secondary progress label.
   */
  @property({ attribute: 'secondary-label-text' })
  secondaryLabelText!: string;

  @property({ attribute: 'secondary-label' })
  secondaryLabel!: string;

  /**
   * The progress state.
   */
  @property()
  state = PROGRESS_STEP_STAT.INCOMPLETE;

  /**
   * `true` if the progress step should be vertical.
   *
   * @private
   */
  @property({ type: Boolean, reflect: true })
  vertical = false;

  /**
   * `true` if the progress step should be spaced equally.
   *
   * @private
   */
  @property({ type: Boolean, reflect: true })
  spaceEqually = false;

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'listitem');
    }
    super.connectedCallback();
  }

  updated(changedProperties) {
    if (changedProperties.has('disabled')) {
      this.setAttribute('aria-disabled', String(Boolean(this.disabled)));
    }
  }

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
    const optionalLabel = secondaryLabelText || secondaryLabel;
    return html`
      <div class="${prefix}--progress-step-button" tabindex="0">
        ${icons[state]({
          class: {
            [PROGRESS_STEP_STAT.INVALID]: `${prefix}--progress__warning`,
          }[state],
          children: svgLabel ? svg`<title>${svgLabel}</title>` : undefined,
        })}
        <slot>
          <p
            role="button"
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
