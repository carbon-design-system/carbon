/**
 * Copyright IBM Corp. 2022, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { prefix } from '../../globals/settings';
import styles from './contained-list.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Contained list description text.
 *
 * @element cds-contained-list-description
 * @slot - The description text content
 */
@customElement(`${prefix}-contained-list-description`)
class CDSContainedListDescription extends LitElement {
  render() {
    return html`<slot></slot>`;
  }

  static styles = styles;
}

export default CDSContainedListDescription;
