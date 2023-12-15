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
import CDSProgressStepSkeleton from './progress-step-skeleton';
import styles from './progress-indicator.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Skeleton of progress indicator.
 */
@customElement(`${prefix}-progress-indicator-skeleton`)
export default class CDSProgressIndicatorSkeleton extends LitElement {
  /**
   * `true` if the progress indicator should be vertical. Corresponds to the attribute with the same name.
   */
  @property({ type: Boolean, reflect: true })
  vertical = false;

  updated(changedProperties) {
    if (changedProperties.has('vertical')) {
      // Propagate `vertical` attribute to descendants until `:host-context()` gets supported in all major browsers
      forEach(
        this.querySelectorAll(
          (this.constructor as typeof CDSProgressIndicatorSkeleton).selectorStep
        ),
        (item) => {
          (item as CDSProgressStepSkeleton).vertical = this.vertical;
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
    return `${prefix}-progress-step-skeleton`;
  }

  static styles = styles;
}
