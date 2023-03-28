/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import styles from './textarea.scss';

/**
 * Skeleton of text area.
 */
@customElement(`${prefix}-textarea-skeleton`)
class CDSTextareaSkeleton extends LitElement {
  render() {
    return html`
      <span class="${prefix}--label ${prefix}--skeleton"></span>
      <div class="${prefix}--skeleton ${prefix}--text-area"></div>
    `;
  }

  static styles = styles;
}

export default CDSTextareaSkeleton;
