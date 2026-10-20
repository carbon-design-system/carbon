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
 * CreateTearsheetStepInErrorState - A create tearsheet example with step errors.
 *
 * @element create-tearsheet-step-in-error-state
 */
@customElement(`create-tearsheet-step-in-error-state`)
class CreateTearsheetStepInErrorState extends CreateTearsheetBase {
  @state()
  private stepOneInvalid = true;

  @state()
  private stepTwoInvalid = false;

  protected override get triggerLabel() {
    return 'CreateTearsheet';
  }

  protected override getVisibleSteps(): TearsheetStepKey[] {
    return ['topic-name', 'partitions'];
  }

  protected override getStepLabels() {
    return [
      { label: 'Topic name', secondaryLabel: 'Required field validation' },
      { label: 'Partitions', secondaryLabel: 'Numeric validation' },
    ];
  }

  protected override resetVariantState() {
    this.stepOneInvalid = true;
    this.stepTwoInvalid = false;
  }

  protected override isStepInvalid(stepKey: TearsheetStepKey) {
    if (stepKey === 'topic-name') {
      return this.stepOneInvalid;
    }

    if (stepKey === 'partitions') {
      return this.stepTwoInvalid;
    }

    return false;
  }

  protected override isNextDisabledForStep(stepKey: TearsheetStepKey) {
    if (stepKey === 'topic-name') {
      return this.stepOneInvalid;
    }

    if (stepKey === 'partitions') {
      return this.stepTwoInvalid;
    }

    return false;
  }

  protected override handleVariantSubmit() {
    console.log('Form submitted with data:', {
      topicName: this.formData.topicName,
      topicDescription: this.formData.topicDescription,
      partitions: this.formData.partitions,
    });
  }

  private handleTopicNameChange = (evt: Event) => {
    this.handleInputChange('topicName')(evt);
    const target = evt.target as HTMLInputElement;
    this.stepOneInvalid = !target.value.trim();
  };

  private handleTopicDescriptionChange = (evt: Event) => {
    this.handleInputChange('topicDescription')(evt);
  };

  private handlePartitionsChange = (evt: Event) => {
    this.handleInputChange('partitions')(evt);
    const target = evt.target as HTMLInputElement;
    const value = Number(target.value);
    this.stepTwoInvalid = Number.isNaN(value) || value < 1 || value > 100;
  };

  protected override focusCurrentStepElement() {
    requestAnimationFrame(() => {
      const currentStepKey = this.getCurrentStepKey();
      let selector = '';

      switch (currentStepKey) {
        case 'topic-name':
          selector = 'cds-text-input';
          break;
        case 'partitions':
          selector = 'cds-number-input';
          break;
        default:
          return;
      }

      const focusTarget = this.renderRoot.querySelector(
        `.${blockClass}__body ${selector}`
      ) as HTMLElement | null;

      focusTarget?.focus();
    });
  }

  protected override renderStep(stepKey: TearsheetStepKey) {
    switch (stepKey) {
      case 'topic-name':
        return html`
          <create-tearsheet-step
            title="Topic name"
            description="This is the unique name used to recognize your topic"
            has-fieldset
            fieldset-legend-text="Topic information"
          >
            <cds-stack gap="5">
              <cds-text-input
                label="Topic name"
                placeholder="Enter topic name"
                value=${this.formData.topicName}
                @input=${this.handleTopicNameChange}
                ?invalid=${this.stepOneInvalid}
                invalid-text="This is a required field"
                required
              ></cds-text-input>
              <cds-text-input
                label="Topic description (optional)"
                placeholder="Enter topic description"
                value=${this.formData.topicDescription}
                @input=${this.handleTopicDescriptionChange}
              ></cds-text-input>
            </cds-stack>
          </create-tearsheet-step>
        `;
      case 'partitions':
        return html`
          <create-tearsheet-step
            title="Partitions"
            subtitle="One or more partitions make up a topic. A partition is an ordered list of messages."
            description="Partitions are distributed across the brokers in order to increase the scalability of your topic. You can also use them to distribute messages across the members of a consumer group."
            has-fieldset
            fieldset-legend-text="Partition information"
          >
            <cds-stack gap="5">
              <cds-number-input
                label="Partitions"
                helper-text="1 partition is sufficient for getting started but, production systems often have more."
                value=${this.formData.partitions}
                min="1"
                max="100"
                ?invalid=${this.stepTwoInvalid}
                invalid-text="Max partitions is 100, min is 1"
                @input=${this.handlePartitionsChange}
              ></cds-number-input>
            </cds-stack>
          </create-tearsheet-step>
        `;
      default:
        return html``;
    }
  }
}

export default CreateTearsheetStepInErrorState;

