/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { describe, expect, it } from 'vitest';
import { StepInstance } from './step-flow-signal';

describe('step flow', () => {
  it('should initial and return default signal state', () => {
    const { totalSteps, formState, currentStep } = new StepInstance().data;
    expect(totalSteps).toEqual(0);
    expect(currentStep).toEqual(0);
    expect(formState).toEqual({});
  });
  it('should update total steps', () => {
    const myStepInstance = new StepInstance();
    myStepInstance.updateTotalStepCount = 100;
    expect(myStepInstance.data.totalSteps).toEqual(100);
  });
  it('should increment the current step', async () => {
    const myStepInstance = new StepInstance();
    myStepInstance.updateTotalStepCount = 100;
    myStepInstance.handleNext();
    expect(myStepInstance.data.currentStep).toEqual(1);
    myStepInstance.handleNext();
    expect(myStepInstance.data.currentStep).toEqual(2);
  });
  it('should decrement the current step', () => {
    const myStepInstance = new StepInstance();
    myStepInstance.updateTotalStepCount = 100;
    myStepInstance.handleNext();
    myStepInstance.handleNext();
    myStepInstance.handlePrevious();
    expect(myStepInstance.data.currentStep).toEqual(1);
  });
  it('should update form state', () => {
    interface FormStateType {
      email?: string;
    }
    const exampleEmail = 'example@example.com';
    const myStepInstance = new StepInstance();
    const savedFormState = structuredClone(
      myStepInstance.data.formState
    ) as FormStateType;
    savedFormState.email = exampleEmail;
    myStepInstance.updateFormState = savedFormState;
    expect((myStepInstance.data.formState as FormStateType).email).toEqual(
      exampleEmail
    );
  });
  it('should jump to a step', () => {
    const myStepInstance = new StepInstance();
    myStepInstance.updateTotalStepCount = 100;
    myStepInstance.handleGoToStep = 25;
    expect(myStepInstance.data.currentStep).toEqual(25);
  });
  it('should reset to default state', () => {
    const myStepInstance = new StepInstance();
    myStepInstance.updateTotalStepCount = 100;
    myStepInstance.handleGoToStep = 25;
    myStepInstance.reset();
    expect(myStepInstance.data.currentStep).toEqual(0);
    expect(myStepInstance.data.formState).toEqual({});
  });
  it('should remain on last step when handleNext is called from the last step', () => {
    const myStepInstance = new StepInstance();
    myStepInstance.updateTotalStepCount = 2;
    myStepInstance.handleNext();
    myStepInstance.handleNext();
    myStepInstance.handleNext();
    expect(myStepInstance.data.currentStep).toEqual(2);
  });
  it('should remain on first step when handlePrevious is called from the first step', () => {
    const myStepInstance = new StepInstance();
    myStepInstance.updateTotalStepCount = 10;
    myStepInstance.handleNext();
    myStepInstance.handleNext();
    myStepInstance.handleNext();
    myStepInstance.handlePrevious();
    myStepInstance.handlePrevious();
    myStepInstance.handlePrevious();
    myStepInstance.handlePrevious();
    expect(myStepInstance.data.currentStep).toEqual(0);
  });
});
