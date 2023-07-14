/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import { forEach } from '../../globals/internal/collection-helpers';
import CDSProgressStep from './progress-step';
import styles from './progress-indicator.scss';
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

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'list');
    }
    super.connectedCallback();
  }

  updated(changedProperties) {
    const spacingValue = this.vertical ? false : this.spaceEqually;
    if (changedProperties.has('vertical')) {
      // Propagate `vertical` attribute to descendants until
      // `:host-context()` gets supported in all major browsers
      forEach(
        this.querySelectorAll(
          (this.constructor as typeof CDSProgressIndicator).selectorStep
        ),
        (item) => {
          (item as CDSProgressStep).vertical = this.vertical;
          (item as CDSProgressStep).spaceEqually = spacingValue;
        }
      );
    }
    if (changedProperties.has('spaceEqually')) {
      // Propagate `spaceEqually` attribute to descendants until
      // `:host-context()` gets supported in all major browsers
      forEach(
        this.querySelectorAll(
          (this.constructor as typeof CDSProgressIndicator).selectorStep
        ),
        (item) => {
          (item as CDSProgressStep).spaceEqually = spacingValue;
        }
      );
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
