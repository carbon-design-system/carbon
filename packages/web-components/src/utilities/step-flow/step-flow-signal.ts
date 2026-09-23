/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { signal } from '@lit-labs/signals';

// This type should be extended by the consumer to match
// their own unique use case given the fields within their
// own stepped experience
type formStateType = Record<string, unknown>;

export class StepInstance {
  #data = signal({
    totalSteps: 0,
    formState: {},
    currentStep: 0,
  });

  get data() {
    return this.#data.get();
  }

  set handleGoToStep(value: number) {
    this.#data.set({
      ...this.#data.get(),
      currentStep: value,
    });
  }

  set updateTotalStepCount(value: number) {
    this.#data.set({
      ...this.#data.get(),
      totalSteps: value,
    });
  }

  set updateFormState(newFormValue: formStateType) {
    this.#data.set({
      ...this.#data.get(),
      formState: newFormValue,
    });
  }

  handleNext() {
    const currentStep = this.#data.get().currentStep + 1;
    const totalSteps = this.#data.get().totalSteps;
    this.#data.set({
      ...this.#data.get(),
      currentStep: currentStep < totalSteps ? currentStep : totalSteps,
    });
  }

  handlePrevious() {
    const currentStep = this.#data.get().currentStep;
    this.#data.set({
      ...this.#data.get(),
      currentStep: currentStep > 0 ? currentStep - 1 : 0,
    });
  }

  reset() {
    this.#data.set({
      ...this.#data.get(),
      formState: {},
      currentStep: 0,
    });
  }
}
