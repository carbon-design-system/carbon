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
import styles from './progress-indicator.scss?lit';
import CircleDash from '@carbon/icons/lib/circle-dash/16';
import '../skeleton-text';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Skeleton of progress step.
 */
@customElement(`${prefix}-progress-step-skeleton`)
export default class CDSProgressStepSkeleton extends LitElement {
  /**
   * `true` if the progress indicator should be vertical. Corresponds to the attribute with the same name.
   */
  @property({ type: Boolean, reflect: true })
  vertical = false;

  render() {
    return html`
      <div
        class="${prefix}--progress-step-button ${prefix}--progress-step-button--unclickable">
        ${CircleDash()}
        <p class="${prefix}--progress-label">
          <cds-skeleton-text width="40px" linecount="1"></cds-skeleton-text>
        </p>
        <span class="${prefix}--progress-line"></span>
      </div>
    `;
  }

  static styles = styles;
}
