/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, PropertyValues, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { SignalWatcher } from '@lit-labs/signals';
import styles from './step-full-page.scss?lit';
import { StepInstance } from '../step-flow-signal';
import '@carbon/web-components/es/components/progress-indicator/index.js';
import '@carbon/web-components/es/components/stack/index.js';
import '@carbon/web-components/es/components/code-snippet/index.js';
import '@carbon/web-components/es/components/button/index.js';
import '@carbon/web-components/es/components/grid/index';
import '../step-group';
import {
  registerFocusableContainers,
  trapFocus,
} from '../../manageFocusTrap/manageFocusTrap';

interface FormStateType {
  email?: string;
  city?: string;
  state?: string;
}

@customElement('step-full-page')
export class StepFullPage extends SignalWatcher(LitElement) {
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

  private _trapFocusAPI: { cleanup: () => void } | null = null;

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

  disconnectedCallback(): void {
    this._trapFocusAPI?.cleanup();
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    registerFocusableContainers(
      this.shadowRoot?.querySelector('step-full-page')
    );
  }

  updated(changedProps: Map<string | number | symbol, unknown>) {
    if (changedProps.has('_open')) {
      const isOpen = this._open;
      if (isOpen) {
        // `focusableContainers` holds the containers where we can query DOM elements.
        // Our strategy here is to let child/slotted components register their containers,
        // which are then passed to `trapFocus`. This allows the utility to query elements
        // directly without being blocked by shadow DOM boundaries.

        this._trapFocusAPI = trapFocus();
      }
    }
  }

  render() {
    const { formState, totalSteps, currentStep } = this._stepInfo.data;

    return html` <div class=${'step-full-page-with-util'} ?open=${this._open}>
      <!-- slotted influencer -->
      <div class="create-influencer" slot="influencer">
        <cds-progress-indicator
          vertical
          class=${`custom-step-util__dummy-content-block`}
        >
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
      <cds-layer level="1" class="create-full-page-layer">
        <div class="create-full-page-wrapper">
          <div class="upper-step-content">
            <cds-grid class="sb-grid">
              <cds-column lg="8" sm="4">
                <div class="create-full-page-header">
                  <!-- slotted header label -->
                  <!-- <span slot="label">Optional label for context</span> -->

                  <!-- slotted header title -->
                  <h2>Step ${currentStep + 1}</h2>
                  <p class="create-full-page-subtitle">
                    Optional subtitle to display on a step
                  </p>

                  <!-- slotted header description -->
                  <p class="create-full-page-description">
                    Optional description to display on a step
                  </p>
                </div>
              </cds-column>
            </cds-grid>

            <!-- default slotted content -->
            <step-group>
              <cds-grid class="sb-grid">
                <cds-column lg="8" sm="4">
                  ${currentStep + 1 === 1
                    ? html`<div>
                        <cds-stack gap="6" orientation="horizontal">
                          <cds-text-input
                            label="Email"
                            id="tearsheet-story-text-input-a"
                            value=${this._email}
                            @input="${this._handleEmailInput}"
                          ></cds-text-input>
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
                            @input="${this._handleCityInput}"
                          ></cds-text-input>
                          <cds-text-input
                            label="State"
                            id="tearsheet-story-text-input-state"
                            value=${this._state}
                            @input="${this._handleStateInput}"
                          ></cds-text-input>
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
                          tooltip-content="Copy to clipboard"
                        >
                          ${JSON.stringify(formState, null, 2)}
                        </cds-code-snippet>
                        <!-- //cspell: enable -->
                      </div>`
                    : nothing}
                </cds-column>
              </cds-grid>
            </step-group>
          </div>
          <div class="create-full-page-actions">
            <cds-button
              slot="actions"
              kind=${'ghost'}
              class="create-full-page-action__cancel"
              @click=${this._handleCancelButton}
            >
              Cancel
            </cds-button>
            <cds-button
              slot="actions"
              kind=${'secondary'}
              @click=${this._handleBackButton}
            >
              Back
            </cds-button>
            <cds-button slot="actions" @click=${this._handleNextButton}>
              ${currentStep + 1 < totalSteps ? 'Next' : 'Submit'}
            </cds-button>
          </div>
        </div>
      </cds-layer>
    </div>`;
  }
  static styles = styles;
}

declare global {
  interface HTMLElementTagNameMap {
    'step-full-page': StepFullPage;
  }
}
