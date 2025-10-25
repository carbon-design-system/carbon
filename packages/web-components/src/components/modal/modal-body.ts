/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { prefix } from '../../globals/settings';
import styles from './modal.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Modal body.
 *
 * @element cds-modal-body
 */
@customElement(`${prefix}-modal-body`)
class CDSModalBody extends LitElement {
  private userDefinedTabindex: string | null = null;

  connectedCallback() {
    super.connectedCallback?.();
    // Store the tabindex if user set it initially
    if (this.hasAttribute('tabindex')) {
      this.userDefinedTabindex = this.getAttribute('tabindex');
    }
  }

  checkScroll() {
    const hasScroll = this.scrollHeight > this.clientHeight;

    // Respect user-defined tabindex
    if (this.userDefinedTabindex !== null) return;

    if (hasScroll) {
      this.setAttribute('tabindex', '0');
    } else {
      this.removeAttribute('tabindex');
    }
  }

  render() {
    return html` <slot @slotchange=${this.checkScroll}></slot> `;
  }

  static styles = styles;
}

export default CDSModalBody;
