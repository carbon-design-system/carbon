/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect } from '@open-wc/testing';
import { StepInstance } from '@carbon/web-components/es/utilities/step-flow/step-flow-signal.js';

describe('step flow', () => {
  it('should initialise and return default signal state', () => {
    const { totalSteps, formState, currentStep } = new StepInstance().data;
    expect(totalSteps).to.equal(0);
    expect(currentStep).to.equal(0);
    expect(formState).to.deep.equal({});
  });

  it('should update total steps', () => {
    const myStepInstance = new StepInstance();
    myStepInstance.updateTotalStepCount = 100;
    expect(myStepInstance.data.totalSteps).to.equal(100);
  });

  it('should increment the current step', () => {
    const myStepInstance = new StepInstance();
    myStepInstance.updateTotalStepCount = 100;
    myStepInstance.handleNext();
    expect(myStepInstance.data.currentStep).to.equal(1);
    myStepInstance.handleNext();
    expect(myStepInstance.data.currentStep).to.equal(2);
  });

  it('should decrement the current step', () => {
    const myStepInstance = new StepInstance();
    myStepInstance.updateTotalStepCount = 100;
    myStepInstance.handleNext();
    myStepInstance.handleNext();
    myStepInstance.handlePrevious();
    expect(myStepInstance.data.currentStep).to.equal(1);
  });

  it('should update form state', () => {
    const exampleEmail = 'example@example.com';
    const myStepInstance = new StepInstance();
    const savedFormState = structuredClone(myStepInstance.data.formState);
    savedFormState.email = exampleEmail;
    myStepInstance.updateFormState = savedFormState;
    expect(myStepInstance.data.formState.email).to.equal(exampleEmail);
  });

  it('should jump to a step', () => {
    const myStepInstance = new StepInstance();
    myStepInstance.updateTotalStepCount = 100;
    myStepInstance.handleGoToStep = 25;
    expect(myStepInstance.data.currentStep).to.equal(25);
  });

  it('should reset to default state', () => {
    const myStepInstance = new StepInstance();
    myStepInstance.updateTotalStepCount = 100;
    myStepInstance.handleGoToStep = 25;
    myStepInstance.reset();
    expect(myStepInstance.data.currentStep).to.equal(0);
    expect(myStepInstance.data.formState).to.deep.equal({});
  });

  it('should remain on last step when handleNext is called from the last step', () => {
    const myStepInstance = new StepInstance();
    myStepInstance.updateTotalStepCount = 2;
    myStepInstance.handleNext();
    myStepInstance.handleNext();
    myStepInstance.handleNext();
    expect(myStepInstance.data.currentStep).to.equal(2);
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
    expect(myStepInstance.data.currentStep).to.equal(0);
  });
});
