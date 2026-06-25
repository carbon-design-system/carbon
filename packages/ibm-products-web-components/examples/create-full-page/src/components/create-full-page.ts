/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element';
import '@carbon/web-components/es/components/button/index.js';
import '@carbon/web-components/es/components/inline-loading/index.js';
import '@carbon/web-components/es/components/modal/index.js';
import '@carbon/ibm-products-web-components/es/components/page-header/index.js';
import type { StepData } from './create-influencer';
import type { ActionButton } from '@carbon/ibm-products-web-components/es/components/action-set/index.js';
import '@carbon/ibm-products-web-components/es/components/action-set/index.js';
import styles from './create-full-page.scss?lit';

const blockClass = 'create-full-page-pattern';

/**
 * CreateFullPage component for web components
 */
@customElement('create-full-page')
export class CreateFullPage extends LitElement {
  /**
   * Page title
   */
  @property({ type: String })
  title = '';

  /**
   * Secondary title (for influencer)
   */
  @property({ type: String, attribute: 'secondary-title' })
  secondaryTitle = '';

  /**
   * Breadcrumbs array
   */
  @property({ type: Array })
  breadcrumbs: any[] = [];

  /**
   * Breadcrumbs overflow aria label
   */
  @property({ type: String, attribute: 'breadcrumbs-overflow-aria-label' })
  breadcrumbsOverflowAriaLabel = 'Open and close additional breadcrumb item list.';

  /**
   * Breadcrumb overflow tooltip alignment
   */
  @property({ type: String, attribute: 'breadcrumb-overflow-tooltip-align' })
  breadcrumbOverflowTooltipAlign = 'bottom';

  /**
   * Maximum visible breadcrumbs
   */
  @property({ type: Number, attribute: 'max-visible-breadcrumbs' })
  maxVisibleBreadcrumbs?: number;

  /**
   * Whether to show trailing slash in breadcrumbs
   */
  @property({ type: Boolean, attribute: 'no-trailing-slash' })
  noTrailingSlash = true;

  /**
   * Cancel button text
   */
  @property({ type: String, attribute: 'cancel-button-text' })
  cancelButtonText = 'Cancel';

  /**
   * Submit button text
   */
  @property({ type: String, attribute: 'submit-button-text' })
  submitButtonText = 'Submit';

  /**
   * Next button text
   */
  @property({ type: String, attribute: 'next-button-text' })
  nextButtonText = 'Next';

  /**
   * Back button text
   */
  @property({ type: String, attribute: 'back-button-text' })
  backButtonText = 'Back';

  /**
   * Modal title
   */
  @property({ type: String, attribute: 'modal-title' })
  modalTitle = 'Are you sure?';

  /**
   * Modal description
   */
  @property({ type: String, attribute: 'modal-description' })
  modalDescription = 'All unsaved changes will be lost.';

  /**
   * Modal danger button text
   */
  @property({ type: String, attribute: 'modal-danger-button-text' })
  modalDangerButtonText = 'Discard changes';

  /**
   * Modal secondary button text
   */
  @property({ type: String, attribute: 'modal-secondary-button-text' })
  modalSecondaryButtonText = 'Continue editing';

  /**
   * Callback when close is requested
   */
  @property({ attribute: false })
  onClose?: () => void;

  /**
   * Callback when submit is requested
   */
  @property({ attribute: false })
  onRequestSubmit?: (formState: any) => void | Promise<void>;

  /**
   * Callback when influencer step is clicked
   */
  @property({ attribute: false })
  onClickInfluencerStep?: (step: number) => void;

  @state()
  private currentStep = 1;

  @state()
  private totalSteps = 0;

  @state()
  private formState: any = {};

  @state()
  private isSubmitting = false;

  @state()
  private modalIsOpen = false;

  @state()
  private stepData: StepData[] = [];


  connectedCallback() {
    super.connectedCallback();
    this.extractStepData();
  }

  extractStepData() {
    const steps = Array.from(
      this.querySelectorAll('create-full-page-step')
    ) as any[];
    this.totalSteps = steps.length;
    this.stepData = steps.map((step) => ({
      title: step.getAttribute('title') || step.title,
      secondaryLabel: step.getAttribute('secondary-label') || step.secondaryLabel,
      shouldIncludeStep: true,
      disableSubmit: step.hasAttribute('disable-submit') || step.disableSubmit,
      invalid: step.hasAttribute('invalid') || step.invalid,
    }));
  }

  private async handleSubmit(e: Event) {
    e.preventDefault();
    if (this.currentStep === this.totalSteps) {
      this.isSubmitting = true;
      try {
        await this.onRequestSubmit?.(this.formState);
      } finally {
        this.isSubmitting = false;
      }
    } else {
      const currentStepElement = this.getCurrentStepElement();
      if (currentStepElement?.onNext) {
        this.isSubmitting = true;
        try {
          await currentStepElement.onNext();
          this.handleNext();
        } catch (error) {
          console.error('Step validation failed:', error);
        } finally {
          this.isSubmitting = false;
        }
      } else {
        this.handleNext();
      }
    }
  }

  private getCurrentStepElement() {
    const steps = Array.from(this.querySelectorAll('create-full-page-step'));
    return steps[this.currentStep - 1] as any;
  }

  private handleNext() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
      this.showCurrentStep();
    }
  }

  private handlePrevious() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.showCurrentStep();
    }
  }

  private handleGoToStep(step: number) {
    if (step >= 1 && step <= this.totalSteps) {
      this.currentStep = step;
      this.showCurrentStep();
    }
  }

  private showCurrentStep() {
    const steps = Array.from(this.querySelectorAll('create-full-page-step'));
    steps.forEach((step, index) => {
      (step as HTMLElement).style.display =
        index === this.currentStep - 1 ? 'block' : 'none';
    });
    this.requestUpdate();
  }

  private handleCancel() {
    this.modalIsOpen = true;
  }

  private handleModalClose() {
    this.modalIsOpen = false;
  }

  private handleModalConfirm() {
    this.onClose?.();
    this.handleGoToStep(1);
    this.formState = {};
    this.modalIsOpen = false;
  }

  private get isNextDisabled() {
    // Get the current step element directly from Light DOM
    const steps = Array.from(this.querySelectorAll('create-full-page-step')) as any[];
    const currentStepElement = steps[this.currentStep - 1];
    
    if (!currentStepElement) {
      return false;
    }
    
    // Check both the property and attribute for disableSubmit
    const disableSubmit = currentStepElement.disableSubmit ||
                         currentStepElement.hasAttribute('disable-submit');   
    return Boolean(disableSubmit);
  }

  private get actions(): ActionButton[] {
    return [
      {
        key: 'cancel',
        label: this.cancelButtonText,
        kind: 'ghost',       
        onClick: () => this.handleCancel(),
      },
      {
        key: 'back',
        label: this.backButtonText,
        kind: 'secondary',
        onClick: () => this.handlePrevious(),
        disabled: this.currentStep === 1,
      },
      {
        key: 'next',
        label:
          this.currentStep === this.totalSteps
            ? this.submitButtonText
            : this.nextButtonText,
        kind: 'primary',
        onClick: (e) => this.handleSubmit(e),
        loading: this.isSubmitting,
        disabled: this.isNextDisabled,
      },
    ];
  }

  firstUpdated() {
    this.moveStepsToForm();
    this.showCurrentStep();
  }

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);
  }

  private moveStepsToForm() {
    // Since we disabled shadow DOM, we need to manually move slotted steps into the form
    const steps = Array.from(this.querySelectorAll('create-full-page-step[slot="steps"]'));
    const form = this.querySelector(`.${blockClass}__form`);
    
    if (form && steps.length > 0) {
      steps.forEach(step => {
        form.appendChild(step);
      });
    }
  }

  render() {
    return html`
      <div class="${blockClass}">
        ${this.title || this.breadcrumbs.length > 0
          ? html`
              <c4p-page-header class="${blockClass}__header">
                <c4p-page-header-breadcrumb>
                  <c4p-page-header-breadcrumbs-set
                    .breadcrumbsData="${(this.breadcrumbs || []).map((item) => ({
                      text: item.label,
                      href: item.href || '#',
                    }))}"
                     title="page title"
                  ></c4p-page-header-breadcrumbs-set>
                </c4p-page-header-breadcrumb>
                <c4p-page-header-content title="${this.title}">
                </c4p-page-header-content>
              </c4p-page-header>
            `
          : ''}

        <div class="${blockClass}__influencer-and-body-container">
          <div class="${blockClass}__influencer">
            <create-influencer
              .stepData="${this.stepData}"
              current-step="${this.currentStep}"
              title="${this.secondaryTitle}"
              .onClickStep="${this.onClickInfluencerStep}"
            ></create-influencer>
          </div>

          <div class="${blockClass}__body">
            <div class="${blockClass}__main">
              <div class="${blockClass}__content">
                <form
                  class="${blockClass}__form"
                  aria-label="${this.title}"
                  @submit="${this.handleSubmit}"
                >
                  <slot name="steps"></slot>
                </form>
              </div>
              <div class="${blockClass}__buttons">
                <c4p-action-set size="xl">
                  <cds-button
                    kind="ghost"
                    size="2xl"
                    @click="${this.handleCancel}"
                  >
                    ${this.cancelButtonText}
                  </cds-button>
                  <cds-button
                    kind="secondary"
                    size="2xl"
                    ?disabled="${this.currentStep === 1 || this.isSubmitting}"
                    @click="${this.handlePrevious}"
                  >
                    ${this.backButtonText}
                  </cds-button>
                  ${this.isSubmitting
                    ? html`
                        <cds-button kind="primary" size="2xl" disabled>
                          ${this.currentStep === this.totalSteps
                            ? this.submitButtonText
                            : this.nextButtonText}
                          <cds-inline-loading
                            slot="icon"
                            aria-live="off"
                          ></cds-inline-loading>
                        </cds-button>
                      `
                    : html`
                        <cds-button
                          kind="primary"
                          size="2xl"
                          ?disabled="${this.isNextDisabled}"
                          @click="${this.handleSubmit}"
                        >
                          ${this.currentStep === this.totalSteps
                            ? this.submitButtonText
                            : this.nextButtonText}
                        </cds-button>
                      `}
                </c4p-action-set>
              </div>
            </div>
          </div>
  
          ${this.modalIsOpen
            ? html`
                <cds-modal
                  class="${blockClass}__modal"
                  size="sm"
                  ?open="${this.modalIsOpen}"
                  @cds-modal-closed="${this.handleModalClose}"
                >
                  <cds-modal-header>
                    <cds-modal-heading>${this.modalTitle}</cds-modal-heading>
                  </cds-modal-header>
                  <cds-modal-body>
                    <p>${this.modalDescription}</p>
                  </cds-modal-body>
                  <cds-modal-footer>
                    <cds-modal-footer-button
                      kind="secondary"
                      @click="${this.handleModalClose}"
                    >
                      ${this.modalSecondaryButtonText}
                    </cds-modal-footer-button>
                    <cds-modal-footer-button
                      kind="danger"
                      @click="${this.handleModalConfirm}"
                    >
                      ${this.modalDangerButtonText}
                    </cds-modal-footer-button>
                  </cds-modal-footer>
                </cds-modal>
              `
            : ''}
        </div>
      </div>
    `;
  }

  static styles = styles;
}
