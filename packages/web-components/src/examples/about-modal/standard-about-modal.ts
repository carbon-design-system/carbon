/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import '@carbon/web-components/es/components/modal/index.js';
import '@carbon/web-components/es/components/button/index.js';
import exampleLogo from './assets/example-logo.svg';
import styles from './about-modal.scss?lit';

const blockClass = 'c4p--about-modal';

/**
 * Standard about modal pattern, composed from Carbon web components.
 *
 * @element standard-about-modal
 */
@customElement('standard-about-modal')
class StandardAboutModal extends LitElement {
  static styles = styles;

  @state()
  private _open = false;

  render() {
    return html`
      <cds-button kind="primary" @click=${() => (this._open = true)}>
        Launch modal
      </cds-button>
      <cds-modal
        class=${blockClass}
        aria-label="About this product"
        ?open=${this._open}
        @cds-modal-closed=${() => (this._open = false)}
      >
        <div class=${`${blockClass}__logo`}>
          <img
            src=${exampleLogo}
            alt="Example product or service logo"
            style="max-inline-size: 6rem"
          />
        </div>
        <cds-modal-header>
          <cds-modal-close-button
            close-button-label="Close"
          ></cds-modal-close-button>
          <cds-modal-heading>
            IBM Product name example that is longer than one line
          </cds-modal-heading>
        </cds-modal-header>
        <cds-modal-body>
          <div class=${`${blockClass}__version`}>Version 0.0.0</div>
          <p class=${`${blockClass}__copyright-text`}>
            Copyright © IBM Corp. 2020, 2026
          </p>
        </cds-modal-body>
      </cds-modal>
    `;
  }
}

export default StandardAboutModal;
