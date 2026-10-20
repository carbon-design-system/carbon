/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { state } from 'lit/decorators.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import {
  CreateTearsheetBase,
  blockClass,
  type TearsheetStepKey,
} from './components/create-tearsheet-base';

/**
 * CreateTearsheetMultiStep - A multi-step create tearsheet pattern example.
 *
 * @element create-tearsheet-multi-step
 */
@customElement(`create-tearsheet-multi-step`)
class CreateTearsheetMultiStep extends CreateTearsheetBase {
  @state()
  private shouldReject = false;

  @state()
  private hasSubmitError = false;

  @state()
  private shouldIncludeAdditionalStep = false;

  protected override getVisibleSteps(): TearsheetStepKey[] {
    const steps: TearsheetStepKey[] = ['topic-information'];

    if (this.shouldIncludeAdditionalStep) {
      steps.push('standard-conditional');
    }

    steps.push('location', 'partitions', 'message-retention');

    return steps;
  }

  protected override getStepLabels() {
    const labels = [
      { label: 'Topic information', secondaryLabel: '' },
      { label: 'Location', secondaryLabel: '' },
      { label: 'Partitions', secondaryLabel: '' },
      { label: 'Message retention', secondaryLabel: '' },
    ];

    if (this.shouldIncludeAdditionalStep) {
      labels.splice(1, 0, {
        label: 'Dynamic step',
        secondaryLabel: '',
      });
    }

    return labels;
  }

  protected override get submitDelay() {
    return 1000;
  }

  protected override resetVariantState() {
    this.shouldReject = false;
    this.hasSubmitError = false;
    this.shouldIncludeAdditionalStep = false;
  }

  protected override handleBack = async () => {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.hasSubmitError = false;
      await this.updateComplete;
      this.focusCurrentStepElement();
    }
  };

  protected override handleVariantNext() {
    if (
      this.getCurrentStepKey() === 'topic-information' &&
      this.shouldReject &&
      this.formData.topicName.trim()
    ) {
      this.hasSubmitError = true;
      return true;
    }

    this.hasSubmitError = false;
    return false;
  }

  protected override isNextDisabledForStep(stepKey: TearsheetStepKey) {
    switch (stepKey) {
      case 'topic-information':
        return !this.formData.topicName.trim();
      case 'location':
        return !this.formData.location.trim();
      case 'partitions':
        return this.formData.partitions < 1 || this.formData.replicas < 1;
      case 'message-retention':
        return !this.formData.messageRetention;
      default:
        return false;
    }
  }

  private handleToggleError = (evt: CustomEvent) => {
    this.shouldReject = evt.detail.toggled;
  };

  private handleIncludeAdditionalStep = (evt: CustomEvent) => {
    const shouldIncludeAdditionalStep = evt.detail.checked;
    const currentStepKey = this.getCurrentStepKey();

    this.shouldIncludeAdditionalStep = shouldIncludeAdditionalStep;

    if (!shouldIncludeAdditionalStep && currentStepKey === 'standard-conditional') {
      this.currentStep = 0;
    }
  };

  private handleTopicNameInput = (evt: Event) => {
    this.handleInputChange('topicName')(evt);
    const target = evt.target as HTMLInputElement;

    if (target.value.length) {
      this.hasSubmitError = false;
    }
  };

  protected override focusCurrentStepElement() {
    requestAnimationFrame(() => {
      const currentStepKey = this.getCurrentStepKey();
      let focusTarget: HTMLElement | null = null;

      switch (currentStepKey) {
        case 'topic-information':
          focusTarget = this.renderRoot.querySelector(
            `.${blockClass}__body cds-text-input`
          ) as HTMLElement | null;
          break;
        case 'location':
          focusTarget = this.renderRoot.querySelector(
            `.${blockClass}__body cds-text-input`
          ) as HTMLElement | null;
          break;
        case 'partitions':
          focusTarget = this.renderRoot.querySelector(
            `.${blockClass}__body cds-number-input`
          ) as HTMLElement | null;
          break;
        case 'message-retention':
          focusTarget = this.renderRoot.querySelector(
            `.${blockClass}__body cds-radio-button-group cds-radio-button`
          ) as HTMLElement | null;
          break;
        default:
          return;
      }

      focusTarget?.focus();
    });
  }

  protected override renderStep(stepKey: TearsheetStepKey) {
    switch (stepKey) {
      case 'topic-information':
        return html`
          <create-tearsheet-step
            title="Topic name"
            subtitle="This is the unique name used to recognize your topic"
            fieldset-legend-text="Topic information"
            has-fieldset
          >
            <div slot="description">
              It will also be used by your producers and consumers as part of
              the connection information, so make it something easy to
              recognize.
              <cds-link href="#">Learn more.</cds-link>
            </div>
                <cds-text-input
                  class="${blockClass}__topic-input"
                  label="Topic name"
                  placeholder="Enter topic name"
                  value=${this.formData.topicName}
                  @input=${this.handleTopicNameInput}
                  ?invalid=${this.hasSubmitError && !this.formData.topicName.trim()}
                  invalid-text="This is a required field"
                  required
                ></cds-text-input>
                <cds-text-input
                  class="${blockClass}__topic-input"
                  label="Topic description (optional)"
                  placeholder="Enter topic description"
                  value=${this.formData.topicDescription}
                  @input=${this.handleInputChange('topicDescription')}
                ></cds-text-input>
                <cds-text-input
                  class="${blockClass}__topic-input"
                  label="Topic version (optional)"
                  placeholder="Enter topic version"
                  value=${this.formData.topicVersion}
                  @input=${this.handleInputChange('topicVersion')}
                ></cds-text-input>
                  ${this.hasSubmitError
                    ? html`
                        <cds-inline-notification
                          kind="error"
                          title="Error"
                          subtitle="Resolve errors to continue"
                          hide-close-button
                        ></cds-inline-notification>
                      `
                    : html``}
                  <cds-toggle
                    class="${blockClass}__error--toggle"
                    size="sm"
                    label-text="Simulate error"
                    ?checked=${this.shouldReject}
                    @cds-toggle-changed=${this.handleToggleError}
                  ></cds-toggle>
                  <cds-checkbox
                    label-text="Include additional step"
                    ?checked=${this.shouldIncludeAdditionalStep}
                    @cds-checkbox-changed=${this.handleIncludeAdditionalStep}
                  ></cds-checkbox>
            
           
            </create-tearsheet-step>
          `;
      case 'location':
        return html`
          <create-tearsheet-step
            title="Location"
            subtitle="Provide additional configuration for this topic"
            fieldset-legend-text="Location information"
            has-fieldset
          >
            <cds-text-input
              label="Location"
              placeholder="Enter location"
              value=${this.formData.location}
              @input=${this.handleInputChange('location')}
            ></cds-text-input>
          </create-tearsheet-step>
        `;
      case 'standard-conditional':
        return html`
          <create-tearsheet-step
            title="Dynamic step"
            subtitle="Dynamic step subtitle"
            description="This is an example showing how to include a dynamic step into the CreateTearsheet"
          >
            dynamic step content
          </create-tearsheet-step>
        `;
      case 'partitions':
        return html`
          <create-tearsheet-step
            title="Partitions"
            subtitle="One or more partitions make up a topic. A partition is an ordered list of messages."
            description="Partitions are distributed across the brokers in order to increase the scalability of your topic. You can also use them to distribute messages across the members of a consumer group."
            fieldset-legend-text="Partition information"
            has-fieldset
          >
                <cds-number-input
                  label="Partitions"
                  helper-text="1 partition is sufficient for getting started but production systems often have more."
                  value=${this.formData.partitions}
                  min="1"
                  max="100"
                  @input=${this.handleInputChange('partitions')}
                ></cds-number-input>
          </create-tearsheet-step>
        `;
      case 'message-retention':
        return html`
          <create-tearsheet-step
            title="Message retention"
            subtitle="This is how long messages are retained before they are deleted."
            description="If your messages are not read by a consumer within this time, they will be missed."
            fieldset-legend-text="Message retention scheduling"
            has-fieldset
          >
                <cds-radio-button-group
                  legend-text="Message retention"
                  name="message-retention"
                  value=${this.formData.messageRetention}
                  orientation="vertical"
                  @cds-radio-button-group-changed=${(e: CustomEvent) => {
                    this.formData = {
                      ...this.formData,
                      messageRetention: e.detail.value,
                    };
                  }}
                >
                  <cds-radio-button
                    label-text="A day"
                    value="one-day"
                  ></cds-radio-button>
                  <cds-radio-button
                    label-text="A week"
                    value="one-week"
                  ></cds-radio-button>
                  <cds-radio-button
                    label-text="A month"
                    value="one-month"
                  ></cds-radio-button>
                </cds-radio-button-group>
          </create-tearsheet-step>
        `;
      default:
        return html``;
    }
  }
}

export default CreateTearsheetMultiStep;


