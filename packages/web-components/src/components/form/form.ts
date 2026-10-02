/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { prefix } from '../../globals/settings';
import styles from './form.scss?lit';

/**
 * Presentational element for form
 *
 * @element cds-form
 */
class CDSForm extends LitElement {
  static is = `${prefix}-form`;

  render() {
    return html`<form class="${prefix}--form">
      <slot></slot>
    </form>`;
  }

  static styles = styles;
}

export default CDSForm;
