/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { act } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button, TextInput } from '@carbon/react';

import { StepGroup, useStepContext, StepProvider } from '.';

const Step1 = () => {
  const { setFormState, formState } = useStepContext();
  const { email } = formState || {};
  return (
    <div>
      <h4>Step 1</h4>
      <TextInput
        id="email"
        onChange={(e) => {
          setFormState((prev) => ({
            ...prev,
            email: e.target.value,
          }));
        }}
        labelText="Email"
        value={email ?? ''}
      />
    </div>
  );
};

const Step2 = () => {
  return <div>Step 2 content</div>;
};

const Step3 = () => {
  return <div>Step 3 content</div>;
};

const StepComponent = ({ children, invalidUse }) => {
  if (invalidUse) {
    return (
      <>
        <StepGroup>test</StepGroup>
        <StepProvider>{children}</StepProvider>
      </>
    );
  }
  return <StepProvider>{children}</StepProvider>;
};

// Headless utility component to render step actions
const StepActions = ({ buttonRenderer }) => {
  const state = useStepContext();
  return buttonRenderer(state);
};

describe('StepFlow', () => {
  it('renders a component with step group', async () => {
    render(
      <StepComponent>
        <StepGroup>
          <Step1 />
          <Step2 />
        </StepGroup>
        <StepActions
          buttonRenderer={({ currentStep }) => (
            <>
              <Button kind={'ghost'} disabled={currentStep === 1}>
                Cancel
              </Button>
              <Button>Submit</Button>
            </>
          )}
        />
      </StepComponent>
    );
    const cancelButton = screen.getByRole('button', {
      name: /Cancel/i,
    });
    const submitButton = screen.getByRole('button', {
      name: /Submit/i,
    });
    expect(cancelButton).toHaveClass(
      `cds--btn`,
      `cds--btn--ghost`,
      `cds--btn--disabled`
    );
    expect(submitButton).toHaveClass(`cds--btn`, `cds--btn--primary`);
  });

  it('updates formState from custom hook', async () => {
    const user = userEvent.setup();
    let tempFormState;
    render(
      <StepComponent>
        <StepGroup>
          <Step1 />
          <Step2 />
        </StepGroup>
        <StepActions
          buttonRenderer={({ currentStep, formState }) => {
            tempFormState = formState;
            return (
              <>
                <Button kind={'ghost'} disabled={currentStep === 1}>
                  Cancel
                </Button>
                <Button>Submit</Button>
              </>
            );
          }}
        />
      </StepComponent>
    );
    const step1TextInput = screen.getByLabelText('Email');
    await act(() => user.type(step1TextInput, 'Pizza'));
    expect(step1TextInput).toHaveValue('Pizza');
    expect(tempFormState).toEqual({ email: 'Pizza' });
  });
  it('should use 1 as the default step if there are no steps', () => {
    let tempCurrentStep;
    render(
      <StepComponent>
        <StepGroup></StepGroup>
        <StepActions
          buttonRenderer={({ currentStep }) => {
            tempCurrentStep = currentStep;
            return (
              <>
                <Button kind={'ghost'} disabled={currentStep === 1}>
                  Cancel
                </Button>
                <Button>Submit</Button>
              </>
            );
          }}
        />
      </StepComponent>
    );
    expect(tempCurrentStep).toBe(1);
  });
  it('should throw error and not render anything without step state', () => {
    expect(() =>
      render(
        <>
          <StepComponent invalidUse></StepComponent>
          <StepGroup></StepGroup>
        </>
      )
    ).toThrow('Context hook used outside of Step provider');
  });
  it('should proceed to the next step, previous step, and skip steps', async () => {
    render(
      <StepComponent>
        <StepGroup>
          <Step1 />
          <Step2 />
          <Step3 />
        </StepGroup>
        <StepActions
          buttonRenderer={({
            currentStep,
            totalSteps,
            handleNext,
            handlePrevious,
            handleGoToStep,
          }) => (
            <>
              {/* Only rendering current step here in order to verify it is updating */}
              <span>Current step: {currentStep}</span>
              <Button
                kind={'ghost'}
                disabled={currentStep === 1}
                onClick={() => {
                  if (currentStep !== 1) {
                    handlePrevious();
                  }
                }}>
                Back
              </Button>
              <Button onClick={() => handleGoToStep(3)}>Skip</Button>
              <Button
                onClick={() => {
                  if (currentStep !== totalSteps) {
                    handleNext();
                  }
                }}>
                {currentStep === totalSteps ? 'Submit' : 'Next'}
              </Button>
            </>
          )}
        />
      </StepComponent>
    );
    const nextButton = screen.getByRole('button', {
      name: /Next/i,
    });
    await userEvent.click(nextButton);
    expect(screen.getByText('Current step: 2')).toBeInTheDocument();
    const prevButton = screen.getByRole('button', {
      name: /Back/i,
    });
    await userEvent.click(prevButton);
    expect(screen.getByText('Current step: 1')).toBeInTheDocument();
    const skipButton = screen.getByRole('button', {
      name: /Skip/i,
    });
    await userEvent.click(skipButton);
    expect(screen.getByText('Current step: 3')).toBeInTheDocument();
  });
});
