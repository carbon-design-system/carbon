/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import { prefix } from '../../globals/settings';
import styles from './add-select.scss?lit';

const blockClass = `${prefix}--add-select__next`;

/**
 * Add Select wrapper component - provides context for child components
 * @element c4p-add-select
 * @slot default - The main content area containing c4p-add-select-body
 */
@customElement(`${prefix}-add-select`)
class CDSAddSelect extends LitElement {
  /**
   * Whether this is a multi-select (checkboxes) or single-select (radio buttons)
   */
  @property({ type: Boolean, reflect: true })
  multi = false;

  render() {
    return html`
      <div class="${blockClass}">
        <slot></slot>
      </div>
    `;
  }

  static styles = styles;
}

export default CDSAddSelect;
