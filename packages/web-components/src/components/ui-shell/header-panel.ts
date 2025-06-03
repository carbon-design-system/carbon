/**
 * Copyright IBM Corp. 2023, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import styles from './header.scss?lit';
import { prefix } from '../../globals/settings';

/**
 * Header panel
 *
 * @element cds-header-panel
 */
@customElement(`${prefix}-header-panel`)
class CDSHeaderPanel extends LitElement {
  /**
   * Specify whether the panel is expanded
   */
  @property({ type: Boolean, reflect: true })
  expanded;

  render() {
    return html`<slot></slot>`;
  }

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static styles = styles;
}

export default CDSHeaderPanel;
