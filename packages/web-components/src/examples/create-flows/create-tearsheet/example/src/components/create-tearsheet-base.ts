/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html, nothing, type TemplateResult } from 'lit';
import { keyed } from 'lit/directives/keyed.js';
import { state } from 'lit/decorators.js';
import HostListenerMixin from '@carbon/web-components/es/globals/mixins/host-listener.js';
import { iconLoader } from '@carbon/web-components/es/globals/internal/icon-loader.js';
import ArrowRight16 from '@carbon/icons/es/arrow--right/16';
import '@carbon/ibm-products-web-components/es/components/tearsheet-preview/index.js';
import './create-tearsheet-step';
import '@carbon/web-components/es/components/button/index.js';
import '@carbon/web-components/es/components/text-input/index.js';
import '@carbon/web-components/es/components/textarea/index.js';
import '@carbon/web-components/es/components/number-input/index.js';
import '@carbon/web-components/es/components/progress-indicator/index.js';
import '@carbon/web-components/es/components/radio-button/index.js';
import '@carbon/web-components/es/components/tile/index.js';
import '@carbon/web-components/es/components/toggle/index.js';
import '@carbon/web-components/es/components/stack/index.js';
import '@carbon/web-components/es/components/checkbox/index.js';
import '@carbon/web-components/es/components/notification/index.js';
import '@carbon/web-components/es/components/inline-loading/index.js';
import styles from '../create-tearsheet.scss?lit';

export const blockClass = `c4p--create-tearsheet`;

export type TearsheetStepKey =
  | 'intro'
  | 'standard-conditional'
  | 'plus-conditional'
  | 'topic-information'
  | 'topic-name'
  | 'location'
  | 'partitions'
  | 'message-retention';

export type TearsheetStepLabel = {
  label: string;
  secondaryLabel: string;
};

export type TearsheetFormData = {
  topicName: string;
  topicDescription: string;
  topicVersion: string;
  location: string;
  partitions: number;
  replicas: number;
  retentionTime: number;
  messageRetention: string;
};

export const defaultFormData = (): TearsheetFormData => ({
  topicName: '',
  topicDescription: '',
  topicVersion: '',
  location: '',
  partitions: 1,
  replicas: 1,
  retentionTime: 1,
  messageRetention: 'one-day',
});

export class CreateTearsheetBase extends HostListenerMixin(LitElement) {
  @state()
  protected open = false;

  @state()
  protected currentStep = 0;

  @state()
  protected isSubmitting = false;

  @state()
  protected influencerPanelOpen = false;

  @state()
  protected formData: TearsheetFormData = defaultFormData();

  protected get triggerLabel() {
    return 'CreateTearsheet';
  }

  protected get tearsheetTitle() {
    return 'Create topic';
  }

  protected get tearsheetDescription() {
    return 'Specify details for the new topic you want to create';
  }

  protected get tearsheetLabel() {
    return '';
  }

  protected get submitButtonText() {
    return 'Create';
  }

  protected get nextButtonText() {
    return 'Next';
  }

  protected get backButtonText() {
    return 'Back';
  }

  protected get cancelButtonText() {
    return 'Cancel';
  }

  protected get submitDelay() {
    return 750;
  }

  protected get showInfluencerOnIntroStep() {
    return false;
  }

  protected getVisibleSteps(): TearsheetStepKey[] {
    return [];
  }

  protected getStepLabels(): TearsheetStepLabel[] {
    return [];
  }

  protected getCurrentStepKey() {
    return this.getVisibleSteps()[this.currentStep];
  }

  protected resetVariantState() {}

  protected handleVariantNext(): boolean | Promise<boolean> {
    return false;
  }

  protected handleVariantSubmit() {}

  protected isStepInvalid(_stepKey: TearsheetStepKey, _stepIndex: number) {
    return false;
  }

  protected isNextDisabledForStep(_stepKey: TearsheetStepKey) {
    return false;
  }

  protected renderStep(
    _stepKey: TearsheetStepKey
  ): TemplateResult | typeof nothing {
    return nothing;
  }

  protected focusCurrentStepElement() {}

  protected handleOpen = async () => {
    this.currentStep = 0;
    this.isSubmitting = false;
    this.formData = defaultFormData();
    this.resetVariantState();
    this.open = true;
    await this.updateComplete;
    this.focusCurrentStepElement();
  };

  protected handleClose = () => {
    this.open = false;
  };

  protected resetTearsheetState = () => {
    this.currentStep = 0;
    this.isSubmitting = false;
    this.formData = defaultFormData();
    this.resetVariantState();
  };

  protected handleCancel = (event?: Event) => {
    event?.preventDefault();
    event?.stopPropagation();
    this.handleClose();
    this.resetTearsheetState();
  };

  protected handleBack = async () => {
    if (this.currentStep > 0) {
      this.currentStep--;
      await this.updateComplete;
      this.focusCurrentStepElement();
    }
  };

  protected async handleNext() {
    const shouldBlock = await this.handleVariantNext();

    if (shouldBlock) {
      return;
    }

    if (this.currentStep < this.getVisibleSteps().length - 1) {
      this.currentStep++;
      await this.updateComplete;
      this.focusCurrentStepElement();
    }
  }

  protected async handleSubmit(event?: Event) {
    event?.preventDefault();
    event?.stopPropagation();
    this.isSubmitting = true;
    await new Promise((resolve) => setTimeout(resolve, this.submitDelay));
    this.handleVariantSubmit();
    this.handleClose();
    this.resetTearsheetState();
  }

  protected handleInputChange =
    (field: keyof TearsheetFormData) => (evt: Event) => {
      const target = evt.target as HTMLInputElement | HTMLTextAreaElement;
      const currentValue = this.formData[field];
      const nextValue =
        typeof currentValue === 'number' ? Number(target.value) : target.value;

      this.formData = {
        ...this.formData,
        [field]: Number.isNaN(nextValue) ? 0 : nextValue,
      };
    };

  protected handleToggleInfluencer = () => {
    this.influencerPanelOpen = !this.influencerPanelOpen;
  };

  protected handleInfluencerPanelClose = () => {
    this.influencerPanelOpen = false;
  };

  protected renderProgressIndicator() {
    const visibleSteps = this.getVisibleSteps();
    const currentStepKey = this.getCurrentStepKey();

    if (!this.showInfluencerOnIntroStep && currentStepKey === 'intro') {
      return nothing;
    }

    const progressSteps = visibleSteps.filter(
      (step): step is Exclude<TearsheetStepKey, 'intro'> => step !== 'intro'
    );
    const stepLabels = this.getStepLabels();
    const progressStep =
      currentStepKey === 'intro' ? -1 : progressSteps.indexOf(currentStepKey);

    // Use step count as a key to force complete re-render when steps change
    const stepCountKey = stepLabels.length;

    return keyed(
      stepCountKey,
      html`
        <cds-progress-indicator vertical class="${blockClass}__progress" current-index="${progressStep}">
          ${stepLabels.map(
            (step, index) => html`
              <cds-progress-step
                label="${step.label}"
                description="${step.secondaryLabel}"
                ?complete=${index < progressStep}
                ?current=${index === progressStep}
                ?invalid=${this.isStepInvalid(progressSteps[index], index)}
              ></cds-progress-step>
            `
          )}
        </cds-progress-indicator>
      `
    );
  }

  render() {
    const visibleSteps = this.getVisibleSteps();
    const isLastStep = this.currentStep === visibleSteps.length - 1;
    const currentStepKey = this.getCurrentStepKey();
    const showInfluencer =
      this.showInfluencerOnIntroStep || currentStepKey !== 'intro';
    const launcherLabel = this.open
      ? `Close ${this.triggerLabel}`
      : `Open ${this.triggerLabel}`;

    return html`
      <cds-button kind="primary" class="${blockClass}__launcher" @click=${this.handleOpen}>
        ${launcherLabel}
      </cds-button>
      ${this.open
        ? html`
            <c4p-preview-tearsheet
              class="${blockClass}"
              open
              variant="wide"
              prevent-close-on-click-outside
              @c4p-preview-tearsheet-closed=${this.resetTearsheetState}
            >
              <c4p-tearsheet-header>
                <c4p-tearsheet-header-content title="${this.tearsheetTitle}">
                  ${this.tearsheetLabel
                    ? html`<label slot="label">${this.tearsheetLabel}</label>`
                    : nothing}
                  <div slot="description" style="margin-top: 8px;">
                    ${this.tearsheetDescription}
                  </div>
                </c4p-tearsheet-header-content>
              </c4p-tearsheet-header>

              ${showInfluencer
                ? html`
                    <c4p-tearsheet-influencer
                      ?influencer-panel-open=${this.influencerPanelOpen}
                      @cds-tearsheet-influencer-closed=${this.handleInfluencerPanelClose}
                    >
                      <div class="${blockClass}__influencer">
                        ${this.renderProgressIndicator()}
                      </div>
                    </c4p-tearsheet-influencer>
                  `
                : nothing}

              <c4p-tearsheet-body>
                <div slot="main-content" class="${blockClass}__body">
                  <cds-button
                    size="sm"
                    kind="ghost"
                    class="${blockClass}__show-influencer"
                    @click=${this.handleToggleInfluencer}
                  >
                    Show Influencer
                    ${iconLoader(ArrowRight16, { slot: 'icon' })}
                  </cds-button>
                  ${keyed(currentStepKey, this.renderStep(currentStepKey))}
                </div>
              </c4p-tearsheet-body>

              <c4p-tearsheet-footer
                variant="wide"
                .actions=${[
                  {
                    kind: 'ghost',
                    label: this.cancelButtonText,
                    onClick: this.handleCancel,
                  },
                  {
                    kind: 'secondary',
                    label: this.backButtonText,
                    onClick: this.handleBack,
                    disabled: this.currentStep === 0 || this.isSubmitting,
                  },
                  {
                    kind: 'primary',
                    label: this.isSubmitting
                      ? html`${isLastStep ? this.submitButtonText : this.nextButtonText} <cds-inline-loading></cds-inline-loading>`
                      : isLastStep ? this.submitButtonText : this.nextButtonText,
                    onClick: () =>
                      isLastStep
                        ? this.handleSubmit()
                        : this.handleNext(),
                    disabled:
                      this.isSubmitting ||
                      this.isNextDisabledForStep(currentStepKey),
                  },
                ]}
              >
              </c4p-tearsheet-footer>
            </c4p-preview-tearsheet>
          `
        : nothing}
    `;
  }

  static styles = styles;
}


