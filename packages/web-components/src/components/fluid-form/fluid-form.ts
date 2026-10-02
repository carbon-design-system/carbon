/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { prefix } from '../../globals/settings';
import styles from './fluid-form.scss?lit';

/**
 * Presentational element for fluid form
 *
 * @element cds-fluid-form
 */
class CDSFluidForm extends LitElement {
  static is = `${prefix}-fluid-form`;

  connectedCallback() {
    super.connectedCallback();
    this.toggleAttribute('in-modal', !!this.closest(`${prefix}-modal-body`));
  }

  render() {
    return html`<form class="${prefix}--form ${prefix}--form--fluid">
      <slot></slot>
    </form>`;
  }

  static styles = styles;
}

export default CDSFluidForm;
