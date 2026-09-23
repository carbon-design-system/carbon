/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { SignalWatcher } from '@lit-labs/signals';
import styles from '../story-styles.scss?lit';
import { StepInstance } from '../step-flow-signal';
import '../../../components/progress-indicator/index';
import '../../../components/stack/index';
import '../../../components/code-snippet/index';
import '../step-group';
import '../../../components/tearsheet/index';

interface FormStateType extends Record<string, unknown> {
  email?: string;
  city?: string;
  state?: string;
}

@customElement('step-tearsheet')
export class StepTearsheet extends SignalWatcher(LitElement) {
  @property({ type: Boolean })
  narrow: boolean = false;

  @state()
  private _open: boolean = false;

  @state()
  private _email: string = '';

  @state()
  private _city: string = '';

  @state()
  private _state: string = '';

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
      this._open = false;
      this._stepInfo.reset();
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

  private _stepInfo = new StepInstance();

  connectedCallback(): void {
    super.connectedCallback();
    this._stepInfo.updateTotalStepCount = 3;
  }

  protected override firstUpdated(): void {}

  render() {
    const { formState, totalSteps, currentStep } = this._stepInfo.data;

    return html`
      <cds-button type="button" size="md" @click="${this._onButtonClick}">
        Start create flow
      </cds-button>

      <cds-tearsheet
        class="step-tearsheet-with-util"
        selector-primary-focus="#tearsheet-story-text-input-a"
        ?open=${this._open}
        variant=${this.narrow ? 'narrow' : 'wide'}
        prevent-close-on-click-outside
        @cds-tearsheet-closed=${this._handleCancelButton}>
        <cds-tearsheet-header>
          <cds-tearsheet-header-content title="Create tearsheet title">
            <span slot="label">Optional label for context</span>
            <span slot="description">
              This is a description for the tearsheet, providing an opportunity
              to describe the flow over a couple of lines in the header of the
              tearsheet.
            </span>
          </cds-tearsheet-header-content>
        </cds-tearsheet-header>

        <cds-tearsheet-influencer>
          <cds-progress-indicator
            vertical
            class="custom-step-util__dummy-content-block">
            <cds-progress-step
              label="First step"
              state=${currentStep + 1 === 1
                ? 'current'
                : 'complete'}></cds-progress-step>
            <cds-progress-step
              label="Second step"
              state=${currentStep + 1 === 2
                ? 'current'
                : currentStep + 1 < 2
                  ? 'incomplete'
                  : 'complete'}></cds-progress-step>
            <cds-progress-step
              label="Third step"
              state=${currentStep + 1 === 3
                ? 'current'
                : currentStep + 1 < 3
                  ? 'incomplete'
                  : 'complete'}></cds-progress-step>
          </cds-progress-indicator>
        </cds-tearsheet-influencer>

        <cds-tearsheet-body>
          <step-group slot="main-content">
            ${currentStep + 1 === 1
              ? html`<div>
                  <cds-stack gap="6" orientation="horizontal">
                    <cds-text-input
                      label="Email"
                      id="tearsheet-story-text-input-a"
                      value=${this._email}
                      @input="${this._handleEmailInput}"></cds-text-input>
                  </cds-stack>
                </div>`
              : nothing}
            ${currentStep + 1 === 2
              ? html`<div>
                  <cds-stack gap="6" orientation="horizontal">
                    <cds-text-input
                      label="City"
                      id="tearsheet-story-text-input-city"
                      value=${this._city}
                      @input="${this._handleCityInput}"></cds-text-input>
                    <cds-text-input
                      label="State"
                      id="tearsheet-story-text-input-state"
                      value=${this._state}
                      @input="${this._handleStateInput}"></cds-text-input>
                  </cds-stack>
                </div>`
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
                    tooltip-content="Copy to clipboard">
                    ${JSON.stringify(formState, null, 2)}
                  </cds-code-snippet>
                  <!-- //cspell: enable -->
                </div>`
              : nothing}
          </step-group>
        </cds-tearsheet-body>

        <cds-tearsheet-footer
          .actions="${[
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
              label: currentStep + 1 < totalSteps ? 'Next' : 'Submit',
              onClick: () => this._handleNextButton(),
            },
          ]}"></cds-tearsheet-footer>
      </cds-tearsheet>
    `;
  }

  static styles = styles;
}

declare global {
  interface HTMLElementTagNameMap {
    'step-tearsheet': StepTearsheet;
  }
}
