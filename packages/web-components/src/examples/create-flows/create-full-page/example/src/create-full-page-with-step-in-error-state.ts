/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';
import HostListenerMixin from '@carbon/web-components/es/globals/mixins/host-listener';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element';
import '@carbon/web-components/es/components/text-input/index.js';
import './components/index.js';
import '@carbon/web-components/es/components/grid/index.js';
import styles from './styles.scss?lit';

const storyClass = 'create-full-page-stories';

/**
 * CreateFullPageWithStepInErrorState - Example demonstrating a step with error state.
 *
 * @element create-full-page-with-step-in-error-state
 */
@customElement(`create-full-page-with-step-in-error-state`)
class CreateFullPageWithStepInErrorState extends HostListenerMixin(LitElement) {
  @state()
  private textInput = '';

  @state()
  private isInvalid = true;

  @state()
  private isFirstStepInvalid = true;

  private handleTextInput = (evt: Event) => {
    const value = (evt.target as HTMLInputElement).value;
    this.textInput = value;
    this.isInvalid = value ? false : true;
    this.isFirstStepInvalid = value ? false : true;
  };

  private handleTextInputBlur = () => {
    if (this.textInput.length === 0) {
      this.isInvalid = true;
    }
  };

  private handleRequestSubmit = async () => {
    console.log('Form submitted');
  };

  private handleClose = () => {
    console.log('CreateFullPage closed');
  };

  firstUpdated() {
    this.setupHandlers();
  }

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);
    
    // When textInput or isFirstStepInvalid changes, trigger re-render of create-full-page
    if (changedProperties.has('textInput') || changedProperties.has('isFirstStepInvalid')) {
      const createFullPage = this.shadowRoot?.querySelector('create-full-page') as any;
      if (createFullPage) {
        // Re-extract step data to update the progress indicator with new invalid state
        if (createFullPage.extractStepData) {
          createFullPage.extractStepData();
        }
        createFullPage.requestUpdate();
      }
    }
  }

  private setupHandlers() {
    const createFullPage = this.shadowRoot?.querySelector('create-full-page');
    
    if (createFullPage) {
      (createFullPage as any).onRequestSubmit = this.handleRequestSubmit;
      (createFullPage as any).onClose = this.handleClose;
    }
  }

  render() {
    return html`
      <div class="${storyClass}__viewport">
        <create-full-page
          secondary-title="Create topic"
          next-button-text="Next"
          back-button-text="Back"
          cancel-button-text="Cancel"
          submit-button-text="Create"
          modal-title="Are you sure you want to cancel?"
          modal-description="If you cancel, the information you have entered won't be saved."
          modal-danger-button-text="Cancel partition"
          modal-secondary-button-text="Return to form"
        >
          <create-full-page-step
            slot="steps"
            title="Partition"
            subtitle="One or more partitions make up a topic. A partition is an ordered list of messages."
            ?disable-submit=${this.isFirstStepInvalid}
            ?invalid=${this.isFirstStepInvalid}
          >
            <cds-grid>
              <cds-column xlg="5" lg="5" md="4" sm="4">
                <div class="form-field-wrapper">
                  <cds-text-input
                    id="topic-name-input"
                    label="Topic name"
                    placeholder="Enter topic name"
                    value=${this.textInput}
                    ?invalid=${this.isInvalid}
                    invalid-text="A valid value is required"
                    @input=${this.handleTextInput}
                    @blur=${this.handleTextInputBlur}
                  >
                  </cds-text-input>
                </div>
              </cds-column>
            </cds-grid>
          </create-full-page-step>

          <create-full-page-step
            slot="steps"
            title="Core Configuration"
          >
            <cds-grid>
              <cds-column xlg="5" lg="5" md="4" sm="4">
                Test step
              </cds-column>
            </cds-grid>
          </create-full-page-step>
        </create-full-page>
      </div>
    `;
  }

  static styles = styles;
}

export default CreateFullPageWithStepInErrorState;