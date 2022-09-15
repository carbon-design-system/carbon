/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import { forEach } from '../../globals/internal/collection-helpers';
import BXProgressStepSkeleton from './progress-step-skeleton';
import styles from './progress-indicator.scss';

const { prefix } = settings;

/**
 * Skeleton of progress indicator.
 */
@customElement(`${prefix}-progress-indicator-skeleton`)
class BXProgressIndicatorSkeleton extends LitElement {
  /**
   * `true` if the progress indicator should be vertical. Corresponds to the attribute with the same name.
   */
  @property({ type: Boolean, reflect: true })
  vertical = false;

  updated(changedProperties) {
    if (changedProperties.has('vertical')) {
      // Propagate `vertical` attribute to descendants until `:host-context()` gets supported in all major browsers
      forEach(this.querySelectorAll((this.constructor as typeof BXProgressIndicatorSkeleton).selectorStep), item => {
        (item as BXProgressStepSkeleton).vertical = this.vertical;
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
    return `${prefix}-progress-step-skeleton`;
  }

  static styles = styles;
}

export default BXProgressIndicatorSkeleton;
