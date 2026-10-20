/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement } from 'lit';
import { state } from 'lit/decorators.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element';
import '@carbon/ibm-products-web-components/es/components/side-panel/index.js';
import '@carbon/web-components/es/components/text-input/index.js';
import '@carbon/web-components/es/components/button/index.js';
import '@carbon/web-components/es/components/number-input/index.js';
import '@carbon/web-components/es/components/dropdown/index.js';
import '@carbon/web-components/es/components/form/form-item.js';
import '@carbon/web-components/es/components/form/form.js';
import styles from './styles.scss?lit';

const blockClass = 'c4p--create-side-panel';

@customElement('create-side-panel-with-form-validation')
export class CreateSidepanelWithFormValidation extends LitElement {
  @state()
  open: boolean = false;

  @state()
  private topicName: string = '';

  @state()
  private invalid: boolean = false;

  private _openHandler() {
    this.open = !this.open;
    // Reset form state when closing
    if (!this.open) {
      this.topicName = '';
      this.invalid = false;
    }
  }

  private _handleTopicNameInput(e: Event) {
    this.topicName = (e.target as HTMLInputElement).value;
    this.invalid = false;
  }

  private _handleTopicNameBlur() {
    if (this.topicName.length === 0) {
      this.invalid = true;
    }
  }

  render() {
    return html`
      <style>
        ${styles}
      </style>
      <div>
        <cds-button @click=${this._openHandler}>Open SidePanel</cds-button>
        <c4p-side-panel
          @c4p-side-panel-closed=${this._openHandler}
          class="${blockClass}"
          ?animate-title=${false}
          ?open=${this.open}
          size="md"
          title="Create partitions"
        >
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
          <cds-form id="validation-form" class="${blockClass}__form">
            <cds-form-item>
              <cds-text-input
                placeholder="Enter topic name"
                label="Topic name"
                value=${this.topicName}
                ?invalid=${this.invalid}
                invalid-text="This is a required field"
                @input=${this._handleTopicNameInput}
                @blur=${this._handleTopicNameBlur}
              ></cds-text-input>
            </cds-form-item>
            <cds-form-item>
              <cds-number-input
                value="1"
                min="0"
                max="50"
                step="1"
                label="Partitions"
                size="md"
              >
              </cds-number-input>
            </cds-form-item>
            <cds-form-item>
              <cds-number-input
                value="1"
                min="0"
                max="50"
                step="1"
                label="Replicas"
                size="md"
              >
              </cds-number-input>
            </cds-form-item>
            <cds-form-item>
              <cds-number-input
                value="1"
                min="0"
                max="50"
                step="1"
                label="Minimum in-sync replicas"
                size="md"
              >
              </cds-number-input>
            </cds-form-item>
            <cds-form-item class="${blockClass}__retention-row">
              <cds-number-input
                value="30"
                min="0"
                max="50"
                step="1"
                label="Retention time"
                size="md"
              >
              </cds-number-input>
              <cds-dropdown
                title-text="Options"
                label="Options"
                value="Day(s)"
              >
                <cds-dropdown-item value="Day(s)">Day(s)</cds-dropdown-item>
                <cds-dropdown-item value="Month(s)">Month(s)</cds-dropdown-item>
                <cds-dropdown-item value="Year(s)">Year(s)</cds-dropdown-item>
              </cds-dropdown>
            </cds-form-item>
            <cds-form-item>
              <cds-number-input
                value="1"
                min="0"
                max="50"
                step="1"
                label="Quantity"
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
          <cds-button
            slot="actions"
            kind="primary"
            ?disabled=${!this.topicName.length}
            @click=${this._openHandler}
            >Create</cds-button
          >
        </c4p-side-panel>
      </div>
    `;
  }
}

export default CreateSidepanelWithFormValidation;
