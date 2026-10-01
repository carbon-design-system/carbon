/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ReactiveController, ReactiveControllerHost } from 'lit';

// This type should be extended by the consumer to match
// their own unique use case given the fields within their
// own stepped experience
type formStateType = Record<string, unknown>;

/**
 * StepInstance — a ReactiveController that holds multi-step flow state.
 *
 * Usage:
 *   private _stepInfo = new StepInstance();
 *   connectedCallback() {
 *     super.connectedCallback();
 *     this.addController(this._stepInfo);
 *     this._stepInfo.updateTotalStepCount = 3;
 *   }
 *
 * When any mutation method is called, the host element automatically
 * re-renders via requestUpdate() — no SignalWatcher mixin needed.
 */
export class StepInstance implements ReactiveController {
  private _host: ReactiveControllerHost;

  #totalSteps = 0;
  #currentStep = 0;
  #formState: formStateType = {};

  constructor(host: ReactiveControllerHost) {
    this._host = host;
    host.addController(this);
  }

  // ReactiveController lifecycle hooks
  hostConnected() {}
  hostDisconnected() {}

  get data() {
    return {
      totalSteps: this.#totalSteps,
      currentStep: this.#currentStep,
      formState: this.#formState,
    };
  }

  set handleGoToStep(value: number) {
    this.#currentStep = value;
    this._host?.requestUpdate();
  }

  set updateTotalStepCount(value: number) {
    this.#totalSteps = value;
    this._host?.requestUpdate();
  }

  set updateFormState(newFormValue: formStateType) {
    this.#formState = newFormValue;
    this._host?.requestUpdate();
  }

  handleNext() {
    const next = this.#currentStep + 1;
    this.#currentStep = next < this.#totalSteps ? next : this.#totalSteps;
    this._host?.requestUpdate();
  }

  handlePrevious() {
    this.#currentStep = this.#currentStep > 0 ? this.#currentStep - 1 : 0;
    this._host?.requestUpdate();
  }

  reset() {
    this.#currentStep = 0;
    this.#formState = {};
    this._host?.requestUpdate();
  }
}
