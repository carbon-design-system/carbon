/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { SignalWatcher } from '@lit-labs/signals';
import { prefix } from '../../../globals/settings';
import { iconLoader } from '@carbon/web-components/es/globals/internal/icon-loader.js';
import RightPanelClose32 from '@carbon/icons/es/right-panel--close/32';
import '@carbon/web-components/es/components/progress-indicator/index.js';
import '@carbon/web-components/es/components/text-input/index.js';
import '@carbon/web-components/es/components/button/index.js';
import '../../../utilities/step-flow/index.js';
import '../index.js';
import styles from './_storybook-styles.scss?lit';
import { StepInstance } from '../../../utilities/step-flow/step-flow-signal';
import type { ActionButton } from '../../action-set/action-set';

interface FormStateType {
  email?: string;
  city?: string;
  state?: string;
}

@customElement('step-tearsheet-preview')
export class StepTearsheetNext extends SignalWatcher(LitElement) {
  @property({ type: Boolean })
  horizontal = false;

  @state()
  private _open: boolean = false;

  private _stepInfo = new StepInstance();

  connectedCallback(): void {
    super.connectedCallback();
    this._stepInfo.updateTotalStepCount = 3;
  }

  private _onButtonClick() {
    this._open = true;
  }

  private _handleCancelButton() {
    this._open = false;
    this._stepInfo.reset();
  }

  private _handleBackButton() {
    const { currentStep } = this._stepInfo.data;
    if (currentStep === 0) {
      return;
    }
    return this._stepInfo.handlePrevious();
  }

  private _handleNextButton() {
    const { currentStep, totalSteps } = this._stepInfo.data;
    if (currentStep + 1 === totalSteps) {
      console.log('Form submitted:', this._stepInfo.data.formState);
      this._handleCancelButton();
      return;
    }
    return this._stepInfo.handleNext();
  }

  private _handleEmailInput(e: Event) {
    const savedFormState = structuredClone(
      this._stepInfo.data.formState
    ) as FormStateType;
    savedFormState.email = (e.target as HTMLInputElement).value;
    this._stepInfo.updateFormState = savedFormState;
  }

  private _handleCityInput(e: Event) {
    const savedFormState = structuredClone(
      this._stepInfo.data.formState
    ) as FormStateType;
    savedFormState.city = (e.target as HTMLInputElement).value;
    this._stepInfo.updateFormState = savedFormState;
  }

  private _handleStateInput(e: Event) {
    const savedFormState = structuredClone(
      this._stepInfo.data.formState
    ) as FormStateType;
    savedFormState.state = (e.target as HTMLInputElement).value;
    this._stepInfo.updateFormState = savedFormState;
  }

  private _toggleInfluencerPanel() {
    const influencer = this.shadowRoot?.querySelector(
      `${prefix}-tearsheet-influencer`
    );
    if (influencer) {
      influencer.toggleAttribute('influencer-panel-open');
    }
  }

  private _getStepContent() {
    const { formState, currentStep } = this._stepInfo.data;
    const typedFormState = formState as FormStateType;

    switch (currentStep) {
      case 0:
        return html`
          <div>
            <cds-text-input
              label="Email"
              id="step-email-input"
              value=${typedFormState.email || ''}
              @input="${this._handleEmailInput}"
            ></cds-text-input>
          </div>
        `;
      case 1:
        return html`
          <div style="display: flex; gap: 1rem;">
            <cds-text-input
              label="City"
              id="step-city-input"
              value=${typedFormState.city || ''}
              @input="${this._handleCityInput}"
            ></cds-text-input>
            <cds-text-input
              label="State"
              id="step-state-input"
              value=${typedFormState.state || ''}
              @input="${this._handleStateInput}"
            ></cds-text-input>
          </div>
        `;
      case 2:
        return html`
          <div>
            <h4>Review your information</h4>
            <pre>${JSON.stringify(formState, null, 2)}</pre>
          </div>
        `;
      default:
        return nothing;
    }
  }

  private _getProgressStepState(stepIndex: number) {
    const { currentStep } = this._stepInfo.data;
    if (stepIndex < currentStep) {
      return 'complete';
    }
    if (stepIndex === currentStep) {
      return 'current';
    }
    return 'incomplete';
  }

  private _getActions(): ActionButton[] {
    const { currentStep } = this._stepInfo.data;

    return [
      {
        kind: 'ghost',
        label: 'Cancel',
        onClick: () => this._handleCancelButton(),
      },
      {
        kind: 'secondary',
        label: 'Back',
        disabled: currentStep === 0,
        onClick: () => this._handleBackButton(),
      },
      {
        kind: 'primary',
        label:
          currentStep < this._stepInfo.data.totalSteps - 1 ? 'Next' : 'Submit',
        onClick: () => this._handleNextButton(),
      },
    ];
  }

  render() {
    return html`
      <cds-button type="button" size="md" @click="${this._onButtonClick}">
        Start create flow
      </cds-button>

      <c4p-preview-tearsheet
        ?open=${this._open}
        variant="wide"
        prevent-close-on-click-outside
      >
        <c4p-tearsheet-header ?hideCloseButton="${false}">
          <c4p-tearsheet-header-content title="Create tearsheet title">
            <label slot="label">Optional label for context</label>
            <span slot="description">
              This is a description for the tearsheet, providing an opportunity
              to describe the flow over a couple of lines in the header of the
              tearsheet.
            </span>
          </c4p-tearsheet-header-content>
          ${this.horizontal
            ? html`<cds-progress-indicator>
                <cds-progress-step
                  label="First step"
                  state=${this._getProgressStepState(0)}
                ></cds-progress-step>
                <cds-progress-step
                  label="Second step"
                  state=${this._getProgressStepState(1)}
                ></cds-progress-step>
                <cds-progress-step
                  label="Third step"
                  state=${this._getProgressStepState(2)}
                ></cds-progress-step>
              </cds-progress-indicator>`
            : nothing}
        </c4p-tearsheet-header>

        <!-- Influencer with Progress Indicator -->
        ${!this.horizontal
          ? html` <c4p-tearsheet-influencer>
              <cds-progress-indicator vertical>
                <cds-progress-step
                  label="First step"
                  state=${this._getProgressStepState(0)}
                ></cds-progress-step>
                <cds-progress-step
                  label="Second step"
                  state=${this._getProgressStepState(1)}
                ></cds-progress-step>
                <cds-progress-step
                  label="Third step"
                  state=${this._getProgressStepState(2)}
                ></cds-progress-step>
              </cds-progress-indicator>
            </c4p-tearsheet-influencer>`
          : nothing}

        <c4p-tearsheet-body>
          <div slot="main-content">
            <!-- Button to open influencer panel on small screens -->
            <div class="influencerPanelTrigger">
              <cds-button
                kind="ghost"
                tooltip-text="Open Influencer"
                tooltip-position="right"
                @click="${this._toggleInfluencerPanel}"
              >
                ${iconLoader(RightPanelClose32, { slot: 'icon' })}
              </cds-button>
            </div>

            <!-- Step Content -->
            ${this._getStepContent()}
          </div>
        </c4p-tearsheet-body>

        <c4p-tearsheet-footer .actions="${this._getActions()}">
        </c4p-tearsheet-footer>
      </c4p-preview-tearsheet>
    `;
  }
  static styles = styles; // Define your component's styles here
}

declare global {
  interface HTMLElementTagNameMap {
    'step-tearsheet-preview': StepTearsheetNext;
  }
}
