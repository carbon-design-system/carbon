/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import styles from './progress-indicator.scss';

const { prefix } = settings;

/**
 * Skeleton of progress step.
 */
@customElement(`${prefix}-progress-step-skeleton`)
class BXProgressStepSkeleton extends LitElement {
  /**
   * `true` if the progress indicator should be vertical. Corresponds to the attribute with the same name.
   */
  @property({ type: Boolean, reflect: true })
  vertical = false;

  render() {
    return html`
      <div
        class="${prefix}--progress-step-button ${prefix}--progress-step-button--unclickable"
      >
        <svg>
          <path d="M 7, 7 m -7, 0 a 7,7 0 1,0 14,0 a 7,7 0 1,0 -14,0" />
        </svg>
        <p class="${prefix}--progress-label"></p>
        <span class="${prefix}--progress-line"></span>
      </div>
    `;
  }

  static styles = styles;
}

export default BXProgressStepSkeleton;
