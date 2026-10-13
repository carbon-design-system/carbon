/**
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { iconLoader } from '../../../globals/internal/icon-loader';
import RightPanelClose32 from '@carbon/icons/es/right-panel--close/32';

import '../../../components/progress-indicator/index';
import '../../../components/text-input/index';
import '../../../components/button/index';
import styles from './_storybook-styles.scss?lit';
import '../index';
import type { ActionButton } from '../../action-set/index.js';

interface FormStateType {
  email?: string;
  city?: string;
  state?: string;
}

interface StepState {
  currentStep: number;
  totalSteps: number;
  formState: FormStateType;
}

@customElement('step-tearsheet-preview')
export class StepTearsheetNext extends LitElement {
  @property({ type: Boolean })
  declare horizontal: boolean;

  @state()
  private declare _open: boolean;

  @state()
  private _stepState: StepState = {
    currentStep: 0,
    totalSteps: 3,
    formState: {},
  };

  constructor() {
    super();
    this.horizontal = false;
    this._open = false;
  }

  private _onButtonClick() {
    this._open = true;
  }

  private _handleCancelButton() {
    this._open = false;
    this._stepState = { currentStep: 0, totalSteps: 3, formState: {} };
  }

  private _handleBackButton() {
    const { currentStep } = this._stepState;
    if (currentStep === 0) {
      return;
    }
    this._stepState = { ...this._stepState, currentStep: currentStep - 1 };
  }

  private _handleNextButton() {
    const { currentStep, totalSteps } = this._stepState;
    if (currentStep + 1 === totalSteps) {
      this._handleCancelButton();
      return;
    }
    this._stepState = { ...this._stepState, currentStep: currentStep + 1 };
  }

  private _handleEmailInput(e: Event) {
    this._stepState = {
      ...this._stepState,
      formState: {
        ...this._stepState.formState,
        email: (e.target as HTMLInputElement).value,
      },
    };
  }

  private _handleCityInput(e: Event) {
    this._stepState = {
      ...this._stepState,
      formState: {
        ...this._stepState.formState,
        city: (e.target as HTMLInputElement).value,
      },
    };
  }

  private _handleStateInput(e: Event) {
    this._stepState = {
      ...this._stepState,
      formState: {
        ...this._stepState.formState,
        state: (e.target as HTMLInputElement).value,
      },
    };
  }

  private _toggleInfluencerPanel() {
    const influencer = this.shadowRoot?.querySelector(
      `cds-tearsheet-influencer`
    );
    if (influencer) {
      influencer.toggleAttribute('influencer-panel-open');
    }
  }

  private _getStepContent() {
    const { formState, currentStep } = this._stepState;
    const typedFormState = formState as FormStateType;

    switch (currentStep) {
      case 0:
        return html`
          <div>
            <cds-text-input
              label="Email"
              id="step-email-input"
              value=${typedFormState.email || ''}
              @input="${this._handleEmailInput}"></cds-text-input>
          </div>
        `;
      case 1:
        return html`
          <div style="display: flex; gap: 1rem;">
            <cds-text-input
              label="City"
              id="step-city-input"
              value=${typedFormState.city || ''}
              @input="${this._handleCityInput}"></cds-text-input>
            <cds-text-input
              label="State"
              id="step-state-input"
              value=${typedFormState.state || ''}
              @input="${this._handleStateInput}"></cds-text-input>
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
    const { currentStep } = this._stepState;
    if (stepIndex < currentStep) {
      return 'complete';
    }
    if (stepIndex === currentStep) {
      return 'current';
    }
    return 'incomplete';
  }

  private _getActions(): ActionButton[] {
    const { currentStep, totalSteps } = this._stepState;

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
        label: currentStep < totalSteps - 1 ? 'Next' : 'Submit',
        onClick: () => this._handleNextButton(),
      },
    ];
  }

  render() {
    return html`
      <cds-button type="button" size="md" @click="${this._onButtonClick}">
        Start create flow
      </cds-button>

      <cds-tearsheet
        ?open=${this._open}
        variant="wide"
        prevent-close-on-click-outside>
        <cds-tearsheet-header ?hideCloseButton="${false}">
          <cds-tearsheet-header-content title="Create tearsheet title">
            <label slot="label">Optional label for context</label>
            <span slot="description">
              This is a description for the tearsheet, providing an opportunity
              to describe the flow over a couple of lines in the header of the
              tearsheet.
            </span>
          </cds-tearsheet-header-content>
          ${this.horizontal
            ? html`<cds-progress-indicator>
                <cds-progress-step
                  label="First step"
                  state=${this._getProgressStepState(0)}></cds-progress-step>
                <cds-progress-step
                  label="Second step"
                  state=${this._getProgressStepState(1)}></cds-progress-step>
                <cds-progress-step
                  label="Third step"
                  state=${this._getProgressStepState(2)}></cds-progress-step>
              </cds-progress-indicator>`
            : nothing}
        </cds-tearsheet-header>

        <!-- Influencer with Progress Indicator -->
        ${!this.horizontal
          ? html` <cds-tearsheet-influencer>
              <cds-progress-indicator vertical>
                <cds-progress-step
                  label="First step"
                  state=${this._getProgressStepState(0)}></cds-progress-step>
                <cds-progress-step
                  label="Second step"
                  state=${this._getProgressStepState(1)}></cds-progress-step>
                <cds-progress-step
                  label="Third step"
                  state=${this._getProgressStepState(2)}></cds-progress-step>
              </cds-progress-indicator>
            </cds-tearsheet-influencer>`
          : nothing}

        <cds-tearsheet-body>
          <div slot="main-content">
            <!-- Button to open influencer panel on small screens -->
            <div class="influencerPanelTrigger">
              <cds-button
                kind="ghost"
                tooltip-text="Open Influencer"
                tooltip-position="right"
                @click="${this._toggleInfluencerPanel}">
                ${iconLoader(RightPanelClose32, { slot: 'icon' })}
              </cds-button>
            </div>

            <!-- Step Content -->
            ${this._getStepContent()}
          </div>
        </cds-tearsheet-body>

        <cds-tearsheet-footer .actions="${this._getActions()}">
        </cds-tearsheet-footer>
      </cds-tearsheet>
    `;
  }
  static styles = styles;
}

declare global {
  interface HTMLElementTagNameMap {
    'step-tearsheet-preview': StepTearsheetNext;
  }
}
