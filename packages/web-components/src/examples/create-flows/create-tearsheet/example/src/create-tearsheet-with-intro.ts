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
 * CreateTearsheetWithIntro - A multi-step create tearsheet with intro step.
 *
 * @element create-tearsheet-with-intro
 */
@customElement(`create-tearsheet-with-intro`)
class CreateTearsheetWithIntro extends CreateTearsheetBase {
  @state()
  private shouldReject = false;

  @state()
  private hasSubmitError = false;

  @state()
  private selectedCategory = 'standard';

  connectedCallback() {
    super.connectedCallback();
    this.classList.add(`${blockClass}--with-intro`);
  }

  protected override get triggerLabel() {
    return 'CreateTearsheet';
  }

  protected override resetVariantState() {
    this.shouldReject = false;
    this.hasSubmitError = false;
    this.selectedCategory = 'standard';
  }

  private getCategoryConditionalStep(): TearsheetStepKey | null {
    if (this.selectedCategory === 'plus') {
      return 'plus-conditional';
    }

    if (this.selectedCategory === 'standard') {
      return 'standard-conditional';
    }

    return null;
  }

  protected override getVisibleSteps(): TearsheetStepKey[] {
    const conditionalStep = this.getCategoryConditionalStep();

    return [
      'intro',
      ...(conditionalStep ? [conditionalStep] : []),
      'topic-name',
      'partitions',
      'message-retention',
    ];
  }

  protected override getStepLabels() {
    const conditionalStep = this.getCategoryConditionalStep();

    return [
      ...(conditionalStep === 'plus-conditional'
        ? [
            {
              label: 'Conditional step',
              secondaryLabel: 'Plus category only',
            },
          ]
        : []),
      ...(conditionalStep === 'standard-conditional'
        ? [
            {
              label: 'Standard step only',
              secondaryLabel: 'Standard category only',
            },
          ]
        : []),
      { label: 'Topic name', secondaryLabel: 'Name your topic' },
      { label: 'Partitions', secondaryLabel: 'Configure partitions' },
      {
        label: 'Message retention',
        secondaryLabel: 'Set retention policy',
      },
    ];
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
      this.getCurrentStepKey() === 'topic-name' &&
      this.shouldReject &&
      this.formData.topicName.trim()
    ) {
      this.hasSubmitError = true;
      return true;
    }

    this.hasSubmitError = false;
    return false;
  }

  protected override handleVariantSubmit() {
    console.log('Form submitted with data:', {
      category: this.selectedCategory,
      ...this.formData,
    });
  }

  protected override isNextDisabledForStep(stepKey: TearsheetStepKey) {
    if (stepKey === 'topic-name') {
      return !this.formData.topicName.trim();
    }

    return false;
  }

  private handleCategoryChange = async (nextCategory: string) => {
    if (this.selectedCategory === nextCategory) {
      return;
    }

    this.selectedCategory = nextCategory;
    this.currentStep = 0;
    this.hasSubmitError = false;
    await this.updateComplete;
  };

  private handleToggleError = (evt: CustomEvent) => {
    this.shouldReject = evt.detail.toggled;
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
        case 'intro':
          focusTarget = this.renderRoot.querySelector(
            `.${blockClass}__body cds-radio-tile`
          ) as HTMLElement | null;
          break;
        case 'topic-name':
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
      case 'intro':
        return html`
          <create-tearsheet-step
            title="Select a category"
            description="This is the category of item you will create"
            intro-layout
          >
            <fieldset class="${blockClass}__category-fieldset">
              <legend class="${blockClass}__category-legend">Categories</legend>
              <cds-tile-group
                class="${blockClass}__category-group"
                fieldset-class-name="${blockClass}__category-group-fieldset"
                legend="Categories"
                value-selected=${this.selectedCategory}
              >
                <div class="${blockClass}__category-tile-wrapper">
                <cds-radio-tile
                  value="standard"
                  class="${blockClass}__category-tile"
                  ?checked=${this.selectedCategory === 'standard'}
                  @click=${() => this.handleCategoryChange('standard')}
                >
                  <div class="${blockClass}__tile-content">
                    <img
                      class="${blockClass}__tile-icon"
                      src=${new URL('./assets/no-data-illustration.svg', import.meta.url).href}
                      alt=""
                    />
                    <h4>Standard</h4>
                  </div>
                </cds-radio-tile>
                <cds-radio-tile
                  value="premium"
                  class="${blockClass}__category-tile"
                  ?checked=${this.selectedCategory === 'premium'}
                  @click=${() => this.handleCategoryChange('premium')}
                >
                  <div class="${blockClass}__tile-content">
                    <img
                      class="${blockClass}__tile-icon"
                      src=${new URL('./assets/no-data-illustration.svg', import.meta.url).href}
                      alt=""
                    />
                    <h4>Premium</h4>
                  </div>
                </cds-radio-tile>
                <cds-radio-tile
                  value="plus"
                  class="${blockClass}__category-tile"
                  ?checked=${this.selectedCategory === 'plus'}
                  @click=${() => this.handleCategoryChange('plus')}
                >
                  <div class="${blockClass}__tile-content">
                    <img
                      class="${blockClass}__tile-icon"
                      src=${new URL('./assets/no-data-illustration.svg', import.meta.url).href}
                      alt=""
                    />
                    <h4>Plus</h4>
                  </div>
                </cds-radio-tile>
                </div>
              </cds-tile-group>
            </fieldset>
          </create-tearsheet-step>
        `;
      case 'plus-conditional':
        if (this.selectedCategory !== 'plus') {
          return html``;
        }

        return html`
          <create-tearsheet-step title="Conditional step">
            <p>This step will only show for plus create flows.</p>
          </create-tearsheet-step>
        `;
      case 'standard-conditional':
        if (this.selectedCategory !== 'standard') {
          return html``;
        }

        return html`
          <create-tearsheet-step title="Standard step only">
            <p>This step will only show for standard create flows.</p>
          </create-tearsheet-step>
        `;
      case 'topic-name':
        return html`
          <create-tearsheet-step
            title="Topic name"
            description="This is the unique name used to recognize your topic"
          >
            <cds-stack gap="5">
              <cds-text-input
                label="Topic name"
                placeholder="Enter topic name"
                value=${this.formData.topicName}
                @input=${this.handleTopicNameInput}
                ?invalid=${this.hasSubmitError && !this.formData.topicName.trim()}
                invalid-text="This is a required field"
                required
              ></cds-text-input>
              <cds-text-input
                label="Topic description (optional)"
                placeholder="Enter topic description"
                value=${this.formData.topicDescription}
                @input=${this.handleInputChange('topicDescription')}
              ></cds-text-input>
              <cds-text-input
                label="Topic version (optional)"
                placeholder="Enter topic version"
                value=${this.formData.topicVersion}
                @input=${this.handleInputChange('topicVersion')}
              ></cds-text-input>
              ${this.hasSubmitError
                ? html`
                    <div class="${blockClass}__inline-error" role="alert">
                      Resolve errors to continue
                    </div>
                  `
                : ''}
              <cds-toggle
                label-text="Simulate error"
                size="sm"
                ?checked=${this.shouldReject}
                @cds-toggle-changed=${this.handleToggleError}
              ></cds-toggle>
            </cds-stack>
          </create-tearsheet-step>
        `;
      case 'partitions':
        return html`
          <create-tearsheet-step
            title="Partitions"
            description="One or more partitions make up a topic. A partition is an ordered list of messages."
          >
            <cds-stack gap="5">
              <cds-number-input
                label="Partitions"
                helper-text="1 partition is sufficient for getting started but production systems often have more."
                value=${this.formData.partitions}
                min="1"
                max="100"
                @input=${this.handleInputChange('partitions')}
              ></cds-number-input>
            </cds-stack>
          </create-tearsheet-step>
        `;
      case 'message-retention':
        return html`
          <create-tearsheet-step
            title="Message retention"
            description="This is how long messages are retained before they are deleted."
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

export default CreateTearsheetWithIntro;
