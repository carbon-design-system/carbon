/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { prefix } from '../../globals/settings';
import styles from './card.scss?lit';

/**
 * Card body — primary content area.
 *
 * @element cds-card-body
 * @slot - Default slot for free-form content.
 */
class CDSCardBody extends LitElement {
  static is = `${prefix}-card-body`;

  /**
   * Remove all padding so content sits flush to the card edges.
   */
  @property({ type: Boolean, attribute: 'is-flush', reflect: true })
  isFlush = false;

  render() {
    const { isFlush } = this;
    const classes = classMap({
      [`${prefix}--card__body`]: true,
      [`${prefix}--card__body--flush`]: isFlush,
    });
    return html`<div class=${classes}><slot></slot></div>`;
  }

  static styles = styles;
}

export default CDSCardBody;
