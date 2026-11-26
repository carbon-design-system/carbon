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
import '@carbon/web-components/es/components/link/index.js';
import exampleLogo from './assets/example-logo.svg';
import grafanaLogo from './assets/grafana-logo.svg';
import ansibleLogo from './assets/ansible-logo.svg';
import jsLogo from './assets/js-logo.svg';
import styles from './about-modal.scss?lit';

const blockClass = 'c4p--about-modal';

const content =
  "This Web site contains proprietary notices and copyright information, the terms of which must be observed and followed. Please see the tab entitled 'Copyright and trademark information' for related information. IBM grants you a non-exclusive, non-transferable, limited permission to access and display the Web pages within this site as a customer or potential customer of IBM provided you comply with these Terms of Use, and all copyright, trademark, and other proprietary notices remain intact.";

/**
 * About modal pattern with links, legal copy, and technology logos in the
 * footer, composed from Carbon web components.
 *
 * @element about-modal-with-additional-content
 */
@customElement('about-modal-with-additional-content')
class AboutModalWithAdditionalContent extends LitElement {
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
            IBM
            <span class=${`${blockClass}__title-emphasis`}>Product name</span>
          </cds-modal-heading>
        </cds-modal-header>
        <cds-modal-body>
          <div class=${`${blockClass}__version`}>Version 0.0.0</div>
          <div class=${`${blockClass}__links-container`}>
            <cds-link href="#">Link action</cds-link>
            <cds-link href="#">Link action</cds-link>
            <cds-link href="#">Link action</cds-link>
          </div>
          <p class=${`${blockClass}__content`}>${content}</p>
          <p class=${`${blockClass}__copyright-text`}>
            Copyright © IBM Corp. 2020, 2026
          </p>
        </cds-modal-body>
        <cds-modal-footer>
          <p class=${`${blockClass}__footer-label`}>Powered by</p>
          <img
            src=${grafanaLogo}
            alt="Grafana"
            class=${`${blockClass}__tech-logo`}
          />
          <img
            src=${ansibleLogo}
            alt="Ansible"
            class=${`${blockClass}__tech-logo`}
          />
          <img
            src=${jsLogo}
            alt="JavaScript"
            class=${`${blockClass}__tech-logo`}
          />
        </cds-modal-footer>
      </cds-modal>
    `;
  }
}

export default AboutModalWithAdditionalContent;
