/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { prefix } from '../../globals/settings';
import styles from './modal.scss?lit';

/**
 * Modal body content
 *
 * @element cds-modal-body-content
 */
class CDSModalBodyContent extends LitElement {
  static is = `${prefix}-modal-body-content`;

  render() {
    return html`<slot></slot>`;
  }

  static styles = styles;
}

export default CDSModalBodyContent;
