/**
 * @license
 *
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@carbon/ibm-products-web-components/es/components/side-panel/index.js';
import '@carbon/web-components/es/components/text-input/index.js';
import '@carbon/web-components/es/components/button/index.js';
import '@carbon/web-components/es/components/number-input/index.js';
import '@carbon/web-components/es/components/form/form-item.js';
import '@carbon/web-components/es/components/form/form.js';
import styles from './styles.scss?lit';

const blockClass = 'c4p--create-side-panel';

@customElement('create-side-panel-default')
export class CreateSidepanelDefault extends LitElement {
  @state()
  open: boolean = true;

  private _openHandler() {
    this.open = !this.open;
  }

  render() {
    return html`
      <style>
        ${styles}
      </style>
      <div>
        <cds-button @click=${this._openHandler}>Create partitions</cds-button>
        <c4p-side-panel
          @c4p-side-panel-closed=${this._openHandler}
          class="${blockClass}"
          ?animate-title=${false}
          include-overlay
          ?open=${this.open}
          size="md"
          title="Create partitions"
        >
          <div slot="subtitle">
            Specify the details of the partitions you're creating
          </div>
          <h3
            class="${blockClass}__form-title-text ${blockClass}__content-text"
          >
            Core configuration
          </h3>
          <p
            class="${blockClass}__form-description-text ${blockClass}__content-text"
          >
            We recommend you fill out and evaluate these details at a minimum
            before deploying your topic.
          </p>
          <cds-form id="example-form" class="${blockClass}__form">
            <cds-form-item>
              <cds-text-input value="Topic" label="Topic name"></cds-text-input>
            </cds-form-item>
            <cds-form-item>
              <cds-number-input
                value="50"
                min="0"
                max="100"
                step="1"
                label="Partitions"
                size="md"
              >
              </cds-number-input>
            </cds-form-item>
            <cds-form-item>
              <cds-number-input
                value="50"
                min="0"
                max="100"
                step="1"
                label="Replicas"
                size="md"
              >
              </cds-number-input>
            </cds-form-item>
          </cds-form>
          <cds-button
            slot="actions"
            kind="secondary"
            @click=${this._openHandler}
            >Cancel</cds-button
          >
          <cds-button slot="actions" kind="primary" @click=${this._openHandler}
            >Create</cds-button
          >
        </c4p-side-panel>
      </div>
    `;
  }
}

export default CreateSidepanelDefault;
