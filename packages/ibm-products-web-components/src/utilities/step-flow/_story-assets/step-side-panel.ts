/**
 * @license
 *
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '../../../components/side-panel/index.js';
import '@carbon/web-components/es/components/text-input/index.js';
import '@carbon/web-components/es/components/button/index.js';
import '@carbon/web-components/es/components/progress-indicator/index.js';
import { StepInstance } from '../step-flow-signal.js';
import { SignalWatcher } from '@lit-labs/signals';
import '../step-group.js';
import styles from './step-side-panel.scss?lit';

const blockClass = 'c4p--step-side-panel';

interface FormStateType {
  email?: string;
  city?: string;
  state?: string;
}

@customElement('step-side-panel')
export class StepSidePanel extends SignalWatcher(LitElement) {
  @state()
  open: boolean = true;

  @state()
  private _email: string = '';

  @state()
  private _city: string = '';

  @state()
  private _state: string = '';

  private _openHandler() {
    this.open = !this.open;
  }

  private _handleCancelButton() {
    this._openHandler();
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
      this._openHandler();
      this._stepInfo.reset();
      return;
    }
    return this._stepInfo.handleNext();
  }

  private _handleEmailInput(e) {
    const savedFormState = structuredClone(
      this._stepInfo.data.formState
    ) as FormStateType;
    savedFormState.email = e.target.value;
    this._stepInfo.updateFormState = savedFormState;
  }

  private _handleCityInput(e) {
    const savedFormState = structuredClone(
      this._stepInfo.data.formState
    ) as FormStateType;
    savedFormState.city = e.target.value;
    this._stepInfo.updateFormState = savedFormState;
  }

  private _handleStateInput(e) {
    const savedFormState = structuredClone(
      this._stepInfo.data.formState
    ) as FormStateType;
    savedFormState.state = e.target.value;
    this._stepInfo.updateFormState = savedFormState;
  }

  private _stepInfo = new StepInstance();

  connectedCallback(): void {
    super.connectedCallback();
    this._stepInfo.updateTotalStepCount = 3;
  }

  render() {
    const { formState, totalSteps, currentStep } = this._stepInfo.data;

    return html`
      <div>
        <cds-button @click=${this._openHandler}>Create partitions</cds-button>
        <c4p-side-panel
          @c4p-side-panel-closed=${this._openHandler}
          class="${blockClass}"
          ?animate-title=${false}
          include-overlay
          ?open=${this.open}
          size="md"
          title="Create partitions"
        >
          <div slot="subtitle">
            Specify the details of the partitions you're creating
          </div>
          <div slot="below-title">
            <cds-progress-indicator class="progress-indicator">
              <cds-progress-step
                label="First step"
                state=${currentStep + 1 === 1 ? 'current' : 'complete'}
              ></cds-progress-step>
              <cds-progress-step
                label="Second step"
                state=${currentStep + 1 === 2
                  ? 'current'
                  : currentStep + 1 < 2
                    ? 'incomplete'
                    : 'complete'}
              ></cds-progress-step>
              <cds-progress-step
                label="Third step"
                state=${currentStep + 1 === 3
                  ? 'current'
                  : currentStep + 1 < 3
                    ? 'incomplete'
                    : 'complete'}
              ></cds-progress-step>
            </cds-progress-indicator>
          </div>
          <h3
            class="${blockClass}__form-title-text ${blockClass}__content-text"
          >
            Core configuration
          </h3>
          <p
            class="${blockClass}__form-description-text ${blockClass}__content-text"
          >
            We recommend you fill out and evaluate these details at a minimum
            before deploying your topic.
          </p>
          <step-group>
            ${currentStep + 1 === 1
              ? html` <cds-text-input
                  label="Email"
                  id="tearsheet-story-text-input-a"
                  value=${this._email}
                  @input="${this._handleEmailInput}"
                ></cds-text-input>`
              : nothing}
            ${currentStep + 1 === 2
              ? html` <cds-text-input
                  label="City"
                  id="tearsheet-story-text-input-city"
                  value=${this._city}
                  @input="${this._handleCityInput}"
                ></cds-text-input>`
              : nothing}
            ${currentStep + 1 === 2
              ? html` <cds-text-input
                  label="State"
                  id="tearsheet-story-text-input-state"
                  value=${this._state}
                  @input="${this._handleStateInput}"
                ></cds-text-input>`
              : nothing}
            ${currentStep + 1 === 3
              ? html`<div>
                  <!-- //cspell: disable -->
                  <cds-code-snippet
                    type="multi"
                    copy-text=""
                    maxcollapsednumberofrows="15"
                    maxexpandednumberofrows=""
                    mincollapsednumberofrows="3"
                    minexpandednumberofrows=""
                    show-less-text="Show less"
                    show-more-text="Show more"
                    feedback=""
                    feedback-timeout="0"
                    tooltip-content="Copy to clipboard"
                  >
                    ${JSON.stringify(formState, null, 2)}
                  </cds-code-snippet>
                  <!-- //cspell: enable -->
                </div>`
              : nothing}
          </step-group>
          <cds-button
            slot="actions"
            kind="ghost"
            @click=${this._handleCancelButton}
            >Cancel</cds-button
          >
          <cds-button
            slot="actions"
            kind="secondary"
            @click=${this._handleBackButton}
            >Back</cds-button
          >
          <cds-button slot="actions" @click=${this._handleNextButton}>
            ${currentStep + 1 < totalSteps ? 'Next' : 'Submit'}
          </cds-button>
        </c4p-side-panel>
      </div>
    `;
  }
  static styles = styles;
}

declare global {
  interface HTMLElementTagNameMap {
    'step-side-panel': StepSidePanel;
  }
}
