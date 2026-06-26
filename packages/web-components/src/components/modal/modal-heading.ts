/**
 * Copyright IBM Corp. 2019, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import styles from './modal.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Modal heading.
 *
 * @element cds-modal-heading
 */
@customElement(`${prefix}-modal-heading`)
class CDSModalHeading extends LitElement {
  /**
   * The unique identifier for this heading element
   */
  @property({ type: String, reflect: true })
  id = `${prefix}--modal-heading--id-${Math.random().toString(16).slice(2)}`;

  render() {
    return html` <slot></slot> `;
  }

  static styles = styles;
}

export default CDSModalHeading;
