/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html, nothing } from 'lit';
import { state } from 'lit/decorators.js';
import HostListenerMixin from '@carbon/web-components/es/globals/mixins/host-listener';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element';
import '@carbon/web-components/es/components/text-input/index.js';
import '@carbon/web-components/es/components/number-input/index.js';
import '@carbon/web-components/es/components/toggle/index.js';
import '@carbon/web-components/es/components/radio-button/index.js';
import '@carbon/web-components/es/components/notification/index.js';
import '@carbon/web-components/es/components/tooltip/index.js';
import '@carbon/web-components/es/components/form-group/index.js';
import './components/index.js';
import '@carbon/web-components/es/components/grid/index.js';
import styles from './styles.scss?lit';

const blockClass = 'create-full-page-pattern';
const storyClass = 'create-full-page-stories';

/**
 * CreateFullPageWithSections - Example with multiple sections within a single step.
 *
 * @element create-full-page-with-sections
 */
@customElement(`create-full-page-with-sections`)
class CreateFullPageWithSections extends HostListenerMixin(LitElement) {
  @state()
  private textInput = '';

  @state()
  private isInvalid = false;

  @state()
  private hasSubmitError = false;

  @state()
  private shouldReject = false;

  @state()
  private topicName2 = '';

  @state()
  private numberInput1 = 0;

  @state()
  private numberInput2 = 0;

  @state()
  private replicas = '';

  @state()
  private replicationFactor = 'standard';

  private simulatedDelay = 750;

  private handleTextInput = (evt: Event) => {
    this.textInput = (evt.target as HTMLInputElement).value;
    this.isInvalid = false;
  };

  private handleTextInputBlur = () => {
    if (this.textInput.length === 0) {
      this.isInvalid = true;
    }
  };

  private handleToggleChange = (evt: CustomEvent) => {
    this.shouldReject = evt.detail.toggled;
  };

  private handleTopicName2Input = (evt: Event) => {
    this.topicName2 = (evt.target as HTMLInputElement).value;
  };

  private handleNumberInput1Change = (evt: CustomEvent) => {
    this.numberInput1 = evt.detail.value;
  };

  private handleNumberInput2Change = (evt: CustomEvent) => {
    this.numberInput2 = evt.detail.value;
  };

  private handleReplicasInput = (evt: Event) => {
    this.replicas = (evt.target as HTMLInputElement).value;
  };

  private handleRadioGroupChange = (evt: CustomEvent) => {
    this.replicationFactor = evt.detail.value;
  };

  private handleNotificationClose = () => {
    this.hasSubmitError = false;
  };

  private handleStepNext = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.shouldReject) {
          this.hasSubmitError = true;
          reject();
        } else {
          this.isInvalid = false;
          resolve(undefined);
        }
      }, this.simulatedDelay);
    });
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
    
    // When textInput changes, trigger re-render of create-full-page to update button state
    if (changedProperties.has('textInput')) {
      const createFullPage = this.shadowRoot?.querySelector('create-full-page') as any;
      if (createFullPage) {
        createFullPage.requestUpdate();
      }
    }
  }

  private setupHandlers() {
    const createFullPage = this.shadowRoot?.querySelector('create-full-page');
    
    if (createFullPage) {
      (createFullPage as any).onRequestSubmit = this.handleRequestSubmit;
      (createFullPage as any).onClose = this.handleClose;
      
      setTimeout(() => {
        const steps = createFullPage.querySelectorAll('create-full-page-step');
        const firstStep = steps[0];
        
        if (firstStep) {
          (firstStep as any).onNext = this.handleStepNext;
        }
      }, 0);
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
            ?disable-submit=${!this.textInput}
          >
            <span slot="description">
              Partitions are distributed across the brokers in order to increase the scalability of your topic. You can also use them to distribute messages across the members of a consumer group.
              &nbsp;<cds-link href="#">Learn more.</cds-link>
            </span>
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
                  
                  ${this.hasSubmitError
                    ? html`
                        <cds-inline-notification
                          kind="error"
                          title="Error"
                          subtitle="Resolve errors to continue"
                          low-contrast
                          @cds-notification-closed=${this.handleNotificationClose}
                        >
                        </cds-inline-notification>
                      `
                    : nothing}
                  
                  <div class="form-field-wrapper">
                    <cds-definition-tooltip
                      class="${storyClass}__error--text"
                      align="bottom-left"
                      open-on-hover
                    >
                      <span slot="definition">
                        Once toggled on, an inline error notification will appear upon clicking next.
                        This is an example usage of how to prevent the next step if some kind of error
                        occurred during the onNext handler.
                      </span>
                      Simulate error
                    </cds-definition-tooltip>
                  </div>

                  <div class="form-field-wrapper">
                    <cds-toggle
                      id="simulated-error-toggle"
                      label-text="Simulate error"
                      hideLabel
                      size="sm"
                      @cds-toggle-changed=${this.handleToggleChange}
                    >
                    </cds-toggle>
                  </div>
                </fieldset>
              </cds-column>
            </cds-grid>

            <span class="${blockClass}__section-divider"></span>

            <cds-grid>
              <cds-column lg="8" md="4">
                <h5 class="${blockClass}__step-title">
                  Core configuration
                </h5>

                <h6 class="${blockClass}__step-subtitle">
                  This is how long messages are retained before they are deleted.
                </h6>
              </cds-column>
            </cds-grid>

            <cds-grid>
              <cds-column xlg="8" lg="8" md="4" sm="4">
                <cds-form-group
                  class="${blockClass}__step-fieldset ${storyClass}__step-fieldset--label"
                  legend-text="Core configuration"
                >
                  <cds-grid>
                  <cds-column xlg="8" lg="8" md="4" sm="4">
                      <p class="${blockClass}__step-description ${storyClass}__step-description">
                        If your messages are not read by a consumer within this time, they will be missed.
                      </p>
                    </cds-column>

                    <cds-column xlg="5" lg="5" md="4" sm="4">
                      <cds-grid>
                        <cds-column xlg="5" lg="5" md="4" sm="4">
                          <div class="form-field-wrapper">
                            <cds-text-input
                              id="topic-name-optional"
                              label="Topic name (optional)"
                              placeholder="Enter topic name"
                              value=${this.topicName2}
                              invalid-text="A valid value is required"
                              @input=${this.handleTopicName2Input}
                            >
                            </cds-text-input>
                          </div>
                        </cds-column>

                        <cds-column span="3">
                          <div class="form-field-wrapper">
                            <cds-number-input
                              id="number-input-1"
                              label="Label (optional)"
                              min="0"
                              max="100"
                              step="10"
                              value=${this.numberInput1}
                              invalid-text="Number is not valid"
                              @cds-number-input-changed=${this.handleNumberInput1Change}
                            >
                            </cds-number-input>
                          </div>

                          <div class="form-field-wrapper">
                            <cds-number-input
                              id="number-input-2"
                              label="Label (optional)"
                              min="0"
                              max="100"
                              step="10"
                              value=${this.numberInput2}
                              invalid-text="Number is not valid"
                              @cds-number-input-changed=${this.handleNumberInput2Change}
                            >
                            </cds-number-input>
                          </div>
                        </cds-column>

                        <cds-column xlg="5" lg="5" md="4" sm="4">
                          <div class="form-field-wrapper">
                            <cds-text-input
                              id="replicas-input"
                              label="Minimum in-sync replicas (optional)"
                              placeholder="Enter topic name"
                              value=${this.replicas}
                              invalid-text="A valid value is required"
                              @input=${this.handleReplicasInput}
                            >
                            </cds-text-input>
                          </div>
                        </cds-column>
                      </cds-grid>
                    </cds-column>
                  </cds-grid>
                </cds-form-group>
              </cds-column>
            </cds-grid>
          </create-full-page-step>

          <create-full-page-step
            slot="steps"
            title="Message retention"
            subtitle="This is how many copies of a topic will be made for high availability"
            description="The partitions of each topic can be replicated across a configurable number of brokers."
          >
            <cds-grid>
              <cds-column class="sb-column" span="100%">
                <cds-radio-button-group
                  legend-text="Group Legend"
                  name="radio-button-group"
                  value=${this.replicationFactor}
                  orientation="vertical"
                  @cds-radio-button-group-changed=${this.handleRadioGroupChange}
                >
                  <cds-radio-button
                    id="radio-4"
                    value="standard"
                  >
                    Replication factor: 1
                  </cds-radio-button>
                  <cds-radio-button
                    id="radio-5"
                    value="default-selected"
                  >
                    Replication factor: 2
                  </cds-radio-button>
                  <cds-radio-button
                    id="radio-6"
                    value="disabled"
                  >
                    Replication factor: 3
                  </cds-radio-button>
                </cds-radio-button-group>
              </cds-column>
            </cds-grid>
          </create-full-page-step>
        </create-full-page>
      </div>
    `;
  }

  static styles = styles;
}

export default CreateFullPageWithSections;

