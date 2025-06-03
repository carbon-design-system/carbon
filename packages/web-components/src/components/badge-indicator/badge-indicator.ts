/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';

import styles from './badge-indicator.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Badge Indicator.
 *
 * @element cds-badge-indicator
 */
@customElement(`${prefix}-badge-indicator`)
class CDSBadgeIndicator extends LitElement {
  /**
   * Count of badge indicator
   */
  @property({ type: Number })
  count;

  /**
   * The shadow slot the badge-indicator should be in.
   */
  @property({ reflect: true })
  slot = 'badge-indicator';

  render() {
    const displayCount = this.count && this.count > 999 ? '999+' : this.count;
    return html`${displayCount}`;
  }

  static styles = styles;
}

export default CDSBadgeIndicator;
