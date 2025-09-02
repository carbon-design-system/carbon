/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import { forEach } from '../../globals/internal/collection-helpers';
import CDSProgressStep, { PROGRESS_STEP_STAT } from './progress-step';
import styles from './progress-indicator.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Progress indicator.
 *
 * @element cds-progress-indicator
 */
@customElement(`${prefix}-progress-indicator`)
export default class CDSProgressIndicator extends LitElement {
  /**
   * Determines whether or not the progress indicator should be rendered
   * vertically.
   */
  @property({ type: Boolean, reflect: true })
  vertical = false;

  /**
   * Specify whether the progress steps should be split equally in size in the
   * div
   */
  @property({ type: Boolean, reflect: true, attribute: 'space-equally' })
  spaceEqually = false;

  /**
   * Optionally specify the current step array index.
   */
  @property({ type: Number, attribute: 'current-index' })
  currentIndex = 0;

  /**
   * React-like property handler (NOT an attribute).
   * If set to a function, steps become clickable and this handler will be called
   * with a CustomEvent whose detail is `{ index: number }`.
   */
  @property({ attribute: false })
  onChange?: (e: CustomEvent<{ index: number }>) => void;

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'list');
    }
    super.connectedCallback();

    // Listen for internal step click events
    this.addEventListener(
      `${prefix}-progress-step-click`,
      this._handleStepClick as EventListener
    );
  }

  disconnectedCallback() {
    this.removeEventListener(
      `${prefix}-progress-step-click`,
      this._handleStepClick as EventListener
    );
    super.disconnectedCallback();
  }

  private _handleStepClick = (evt: Event) => {
    // Steps are clickable only if onChange is a function
    const clickable = typeof this.onChange === 'function';
    if (!clickable) return;

    const steps = Array.from(
      this.querySelectorAll(
        (this.constructor as typeof CDSProgressIndicator).selectorStep
      )
    );

    const targetStep = (
      evt.composedPath
        ? (evt.composedPath()[0] as Element)
        : (evt.target as Element)
    )?.closest(
      (this.constructor as typeof CDSProgressIndicator).selectorStep
    ) as Element | null;

    if (!targetStep) return;

    const index = steps.indexOf(targetStep);
    if (index < 0) return;

    const detail = { index };

    // Standard DOM event
    const changeEvt = new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail,
    });
    this.dispatchEvent(changeEvt);

    // Alias event name for convenience (@onChange in Lit or addEventListener('onChange', ...))
    this.dispatchEvent(
      new CustomEvent('onChange', { bubbles: true, composed: true, detail })
    );

    // Call property handler if provided (to match React)
    try {
      this.onChange?.(changeEvt as CustomEvent<{ index: number }>);
    } catch {
      /* no-op */
    }
  };

  updated(changedProperties: Map<string, unknown>) {
    const spacingValue = this.vertical ? false : this.spaceEqually;
    const selector = (this.constructor as typeof CDSProgressIndicator)
      .selectorStep;
    const clickable = typeof this.onChange === 'function';

    const steps = this.querySelectorAll(selector);

    if (changedProperties.has('vertical')) {
      // Propagate `vertical` attribute to descendants until :host-context() is widely supported
      forEach(steps, (item) => {
        (item as CDSProgressStep).vertical = this.vertical;
        (item as CDSProgressStep).spaceEqually = spacingValue;
        (item as CDSProgressStep).clickable = clickable;
      });
    }

    if (changedProperties.has('spaceEqually')) {
      // Propagate `spaceEqually` attribute to descendants
      forEach(steps, (item) => {
        (item as CDSProgressStep).spaceEqually = spacingValue;
      });
    }

    // Propagate clickability whenever onChange changes
    if (changedProperties.has('onChange')) {
      forEach(steps, (item) => {
        (item as CDSProgressStep).clickable = clickable;
      });
    }

    if (changedProperties.has('currentIndex')) {
      steps.forEach((step, i) => {
        const stepEl = step as CDSProgressStep;

        if (
          (stepEl as any)._manualState ||
          stepEl.state === PROGRESS_STEP_STAT.INVALID
        ) {
          return;
        }

        if (i < this.currentIndex!) {
          stepEl.state = PROGRESS_STEP_STAT.COMPLETE;
        } else if (i === this.currentIndex) {
          stepEl.state = PROGRESS_STEP_STAT.CURRENT;
        } else {
          stepEl.state = PROGRESS_STEP_STAT.INCOMPLETE;
        }
      });
    }
  }

  render() {
    return html`<slot></slot>`;
  }

  /**
   * A selector that will return progress steps.
   */
  static get selectorStep() {
    return `${prefix}-progress-step`;
  }

  static styles = styles;
}
