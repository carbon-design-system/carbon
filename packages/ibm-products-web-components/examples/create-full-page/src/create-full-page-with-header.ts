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
import '@carbon/web-components/es/components/checkbox/index.js';
import '@carbon/web-components/es/components/toggle/index.js';
import '@carbon/web-components/es/components/radio-button/index.js';
import '@carbon/web-components/es/components/notification/index.js';
import '@carbon/web-components/es/components/link/index.js';
import '@carbon/web-components/es/components/modal/index.js';
import '@carbon/web-components/es/components/tooltip/index.js';
import './components/index.js';
import '@carbon/web-components/es/components/grid/index.js';
import styles from './styles.scss?lit';

const storyClass = 'create-full-page-stories';

/**
 * CreateFullPageWithHeader - Example with breadcrumbs but without Carbon UI Shell.
 *
 * @element create-full-page-with-header
 */
@customElement(`create-full-page-with-header`)
class CreateFullPageWithHeader extends HostListenerMixin(LitElement) {
  @state()
  private textInput = '';

  @state()
  private isInvalid = false;

  @state()
  private hasSubmitError = false;

  @state()
  private shouldReject = false;

  @state()
  private shouldIncludeAdditionalStep = false;

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

  private handleCheckboxChange = (evt: CustomEvent) => {
    this.shouldIncludeAdditionalStep = evt.detail.checked;
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
    // Listen for slot changes to re-setup handlers when content changes
    const slot = this.shadowRoot?.querySelector('slot[name="steps"]') as HTMLSlotElement;
    if (slot) {
      slot.addEventListener('slotchange', () => this.setupHandlers());
    }
  }

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);
    
    // Re-setup handlers when dynamic content changes
    if (changedProperties.has('shouldIncludeAdditionalStep')) {
      // Use setTimeout to ensure DOM is updated
      setTimeout(() => {
        this.setupHandlers();
        
        // Tell create-full-page to re-extract step data and update visibility
        const createFullPage = this.shadowRoot?.querySelector('create-full-page') as any;
        if (createFullPage) {
          if (createFullPage.extractStepData) {
            createFullPage.extractStepData();
          }
          if (createFullPage.showCurrentStep) {
            createFullPage.showCurrentStep();
          }
          createFullPage.requestUpdate();
        }
      }, 0);
    }
    
    // When textInput changes, trigger re-render of create-full-page to update button state
    if (changedProperties.has('textInput')) {
      const createFullPage = this.shadowRoot?.querySelector('create-full-page') as any;
      if (createFullPage) {
        // Force the create-full-page component to re-render and re-evaluate isNextDisabled
        createFullPage.requestUpdate();
      }
    }
  }

  private setupHandlers() {
    // Get the create-full-page element from Shadow DOM
    const createFullPage = this.shadowRoot?.querySelector('create-full-page');    
    if (createFullPage) {
      (createFullPage as any).onRequestSubmit = this.handleRequestSubmit;
      (createFullPage as any).onClose = this.handleClose;
      
      // The steps are rendered in our template and slotted into create-full-page
      // We need to wait for them to be rendered, then query from the create-full-page's light DOM
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
        <div class="${storyClass}__content-container">
          <create-full-page
            title="Page title"
            secondary-title="Create topic"
            next-button-text="Next"
            back-button-text="Back"
            cancel-button-text="Cancel"
            submit-button-text="Create"
            modal-title="Are you sure you want to cancel?"
            modal-description="If you cancel, the information you have entered won't be saved."
            modal-danger-button-text="Cancel partition"
            modal-secondary-button-text="Return to form"
            .breadcrumbs=${[
              { key: '0', label: 'Breadcrumb 1', href: '/', title: 'home page' },
              { key: '1', label: 'Breadcrumb 2', href: '/' },
              { key: '2', label: 'Breadcrumb 3', href: '/' },
              { key: '3', label: 'Breadcrumb 4', isCurrentPage: true },
            ]}
            max-visible-breadcrumbs="3"
            breadcrumb-overflow-tooltip-align="right"
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

                  <div>
                    <cds-toggle
                      id="simulated-error-toggle"
                      label-text="Simulate error"
                      hideLabel
                      size="sm"
                      @cds-toggle-changed=${this.handleToggleChange}
                    >
                    </cds-toggle>
                  </div>
                  
                  <div class="form-field-wrapper">
                    <cds-checkbox
                      id="include-additional-step-checkbox"
                      label-text="Include additional step"
                      ?checked=${this.shouldIncludeAdditionalStep}
                      @cds-checkbox-changed=${this.handleCheckboxChange}
                    >
                    </cds-checkbox>
                  </div>
                </cds-column>
              </cds-grid>
            </create-full-page-step>

            ${this.shouldIncludeAdditionalStep
              ? html`
                  <create-full-page-step
                    slot="steps"
                    title="Dynamic step"
                    description="Example dynamic step"
                  >
                    <div></div>
                  </create-full-page-step>
                `
              : nothing}

            <create-full-page-step
              slot="steps"
              title="Empty"
              secondary-label="Optional"
              description="Empty step for demonstration purposes"
            >
              <div></div>
            </create-full-page-step>

            <create-full-page-step
              slot="steps"
              title="Core configuration"
              description="Here is an example description for the 'Core configuration' step."
              secondary-label="Optional"
            >
              <cds-grid>
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
            </create-full-page-step>

            <create-full-page-step
              slot="steps"
              title="Message retention"
              subtitle="This is how many copies of a topic will be made for high availability"
              description="The partitions of each topic can be replicated across a configurable number of brokers"
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
                      id="radio-1"
                      value="standard"
                    >
                      Replication factor: 1
                    </cds-radio-button>
                    <cds-radio-button
                      id="radio-2"
                      value="default-selected"
                    >
                      Replication factor: 2
                    </cds-radio-button>
                    <cds-radio-button
                      id="radio-3"
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
      </div>
    `;
  }

  static styles = styles;
}

export default CreateFullPageWithHeader;
