/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { ReactNode, RefObject, useEffect, useState } from 'react';
import {
  StepGroup,
  StepContextType,
  useStepContext,
} from '@carbon/utilities-react';
import { Tearsheet } from '../Tearsheet';
import {
  Button,
  CodeSnippet,
  Heading,
  ProgressIndicator,
  ProgressStep,
  Section,
  TextInput,
} from '@carbon/react';
import { breakpoints } from '@carbon/layout';
import { useMatchMedia } from '../../../../global/js/hooks/useMatchMedia';

interface Props {
  children?: ReactNode;
  influencer?: ((a: StepContextType) => ReactNode) | null;
  open?: boolean;
  onClose?: () => void;
  title?: ReactNode;
  hasCloseIcon?: boolean;
  closeIconDescription?: string;
  selectorPrimaryFocus?: string;
  setOpen?: (open: boolean) => void;
  progressIndicator?: 'vertical' | 'horizontal';
  launcherButtonRef?: RefObject<HTMLButtonElement | null>;
}

export const TearsheetWithSteps = ({
  children,
  open,
  setOpen,
  onClose,
  influencer,
  title,
  hasCloseIcon,
  closeIconDescription = 'Close',
  selectorPrimaryFocus,
  progressIndicator = 'vertical',
  launcherButtonRef,
  ...rest
}: Props) => {
  const {
    totalSteps,
    currentStep,
    handleNext,
    handlePrevious,
    handleGoToStep,
  } = useStepContext();

  const smMediaQuery = `(max-width: ${breakpoints.md.width})`;
  const isSm = useMatchMedia(smMediaQuery);
  const buttonSize = isSm ? 'xl' : '2xl';

  // State for submission status message (Issue 25)
  const [submissionStatus, setSubmissionStatus] = useState('');

  return (
    <Tearsheet
      open={open}
      variant={'wide'}
      onClose={() => setOpen?.(false)}
      launcherButtonRef={launcherButtonRef}
    >
      <Tearsheet.Header>
        <Tearsheet.HeaderContent
          label="Customer data"
          title="Title of the tearsheet "
          description="This is a description for the tearsheet, providing an opportunity to describe the flow over a couple of lines in the header of the tearsheet."
          headerActions={
            <Tearsheet.HeaderActions
              menuButtonProps={{ label: 'Actions', kind: 'tertiary' }}
            >
              <Tearsheet.HeaderActionItem overflowItemLabel="Action 1">
                <Button kind="tertiary" size="sm">
                  Action 1
                </Button>
              </Tearsheet.HeaderActionItem>
              <Tearsheet.HeaderActionItem overflowItemLabel="Action 2">
                <Button kind="tertiary" size="sm">
                  Action 2
                </Button>
              </Tearsheet.HeaderActionItem>
              <Tearsheet.HeaderActionItem overflowItemLabel="Action 3">
                <Button kind="tertiary" size="sm">
                  Action 3
                </Button>
              </Tearsheet.HeaderActionItem>
            </Tearsheet.HeaderActions>
          }
        ></Tearsheet.HeaderContent>
        {progressIndicator !== 'vertical' && (
          <ProgressIndicator>
            <ProgressStep
              complete={currentStep > 1}
              current={currentStep === 1}
              label="Step 1 - Personal Information"
              secondaryLabel="Enter your email"
              aria-label="Step 1 of 3: Personal Information - Enter your email"
            />
            <ProgressStep
              complete={currentStep > 2}
              current={currentStep === 2}
              label="Step 2 - Location Details"
              secondaryLabel="Enter city and state"
              disabled={currentStep < 2}
              aria-disabled={currentStep < 2}
              aria-label={`Step 2 of 3: Location Details - Enter city and state${currentStep < 2 ? ' (Not available)' : ''}`}
            />
            <ProgressStep
              current={currentStep === 3}
              label="Step 3 - Review and Submit"
              secondaryLabel="Review your information"
              complete={currentStep > 3}
              disabled={currentStep < 3}
              aria-disabled={currentStep < 3}
              aria-label={`Step 3 of 3: Review and Submit - Review your information${currentStep < 3 ? ' (Not available)' : ''}`}
            />
          </ProgressIndicator>
        )}
      </Tearsheet.Header>
      {progressIndicator === 'vertical' && (
        <Tearsheet.Influencer>
          <ProgressIndicator vertical>
            <ProgressStep
              complete={currentStep > 1}
              current={currentStep === 1}
              label="Step 1 - Personal Information"
              secondaryLabel="Enter your email"
              aria-label="Step 1 of 3: Personal Information - Enter your email"
            />
            <ProgressStep
              complete={currentStep > 2}
              current={currentStep === 2}
              label="Step 2 - Location Details"
              secondaryLabel="Enter city and state"
              disabled={currentStep < 2}
              aria-disabled={currentStep < 2}
              aria-label={`Step 2 of 3: Location Details - Enter city and state${currentStep < 2 ? ' (Not available)' : ''}`}
            />
            <ProgressStep
              current={currentStep === 3}
              label="Step 3 - Review and Submit"
              secondaryLabel="Review your information"
              complete={currentStep > 3}
              disabled={currentStep < 3}
              aria-disabled={currentStep < 3}
              aria-label={`Step 3 of 3: Review and Submit - Review your information${currentStep < 3 ? ' (Not available)' : ''}`}
            />
          </ProgressIndicator>
        </Tearsheet.Influencer>
      )}
      <Tearsheet.Body>
        <Tearsheet.MainContent>
          {/* Status message announcement for submission (Issue 25) */}
          {submissionStatus && (
            <div
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className="submission-status-message"
              style={{
                position: 'absolute',
                left: '-10000px',
                width: '1px',
                height: '1px',
                overflow: 'hidden',
              }}
            >
              {submissionStatus}
            </div>
          )}
          <StepGroup>
            <Step1 />
            <Step2 />
            <Step3 />
            {/* {introExample && selectedFlow === 'plus' && <PlusOnly />} */}
          </StepGroup>
        </Tearsheet.MainContent>
      </Tearsheet.Body>
      <Tearsheet.Footer
        actions={[
          {
            kind: 'ghost',
            label: 'Cancel',
            onClick: () => {
              setOpen?.(false);
            },
          },
          {
            kind: 'secondary',
            label: 'Back',
            onClick: () => {
              handlePrevious();
            },
            disabled: currentStep === 1,
          },
          {
            kind: 'primary',
            label: currentStep === totalSteps ? 'Submit' : 'Next',
            onClick: () => {
              if (currentStep === totalSteps) {
                // Issue 25: Announce submission status
                setSubmissionStatus(
                  'Form submitted successfully. Your information has been saved.'
                );

                // Close after a brief delay to allow announcement
                setTimeout(() => {
                  setOpen?.(false);
                  handleGoToStep(1);
                  setSubmissionStatus('');
                }, 1000);
              } else {
                handleNext();
              }
            },
          },
        ]}
        buttonSize={buttonSize}
      />
    </Tearsheet>
  );
};
const useStepFocus = (stepPrimaryFocus: string) => {
  useEffect(() => {
    const stepFocusElement = document?.querySelector(
      stepPrimaryFocus
    ) as HTMLElement;
    stepFocusElement?.focus();
  }, [stepPrimaryFocus]);
};
function Step1() {
  const { setFormState, formState } = useStepContext();
  const { email } = formState ?? {};
  useStepFocus('#email');

  // Email validation and suggestion logic
  const emailValue = String(email ?? '');
  const isInvalidEmail = emailValue && !emailValue.includes('@');
  const emailSuggestion =
    isInvalidEmail && emailValue.includes('gmail')
      ? `Did you mean ${emailValue}@gmail.com?`
      : '';

  return (
    <Section className="step-container" aria-labelledby="step1-heading">
      <h3 id="step1-heading" className="step-heading">
        Step 1 - Personal Information
      </h3>
      <TextInput
        id="email"
        onChange={(e) => {
          setFormState?.((prev: object) => ({
            ...prev,
            email: e.target.value,
          }));
        }}
        labelText="Email"
        value={emailValue}
        invalid={isInvalidEmail}
        invalidText={emailSuggestion || 'Please enter a valid email address'}
        aria-describedby={emailSuggestion ? 'email-suggestion' : undefined}
        autoComplete="off"
      />
      {emailSuggestion && (
        <div
          id="email-suggestion"
          className="email-suggestion"
          role="status"
          aria-live="polite"
        >
          {emailSuggestion}
        </div>
      )}
    </Section>
  );
}

function Step2() {
  const { setFormState, formState } = useStepContext();
  const { city, state } = formState || {};
  useStepFocus('#city');

  // City validation and suggestion logic
  const cityValue = String(city ?? '');
  const isInvalidCity = cityValue && cityValue.length < 2;
  const citySuggestion = isInvalidCity
    ? 'City name must be at least 2 characters'
    : '';

  // State validation and suggestion logic
  const stateValue = String(state ?? '');
  const isInvalidState = stateValue && stateValue.length < 2;
  const stateSuggestion = isInvalidState
    ? 'State name must be at least 2 characters'
    : '';

  return (
    <Section className="step-container" aria-labelledby="step2-heading">
      <h3 id="step2-heading" className="step-heading">
        Step 2 - Location Details
      </h3>
      <div className="step-form-items">
        <TextInput
          id="city"
          onChange={(e) => {
            setFormState((prev: object) => ({
              ...prev,
              city: e.target.value,
            }));
          }}
          labelText="City"
          value={cityValue}
          invalid={isInvalidCity}
          invalidText={citySuggestion}
          aria-describedby={citySuggestion ? 'city-suggestion' : undefined}
        />
        {citySuggestion && (
          <div
            id="city-suggestion"
            className="field-suggestion"
            role="status"
            aria-live="polite"
          >
            {citySuggestion}
          </div>
        )}
        <TextInput
          id="state"
          onChange={(e) => {
            setFormState((prev: object) => ({
              ...prev,
              state: e.target.value,
            }));
          }}
          labelText="State"
          value={stateValue}
          invalid={isInvalidState}
          invalidText={stateSuggestion}
          aria-describedby={stateSuggestion ? 'state-suggestion' : undefined}
        />
        {stateSuggestion && (
          <div
            id="state-suggestion"
            className="field-suggestion"
            role="status"
            aria-live="polite"
          >
            {stateSuggestion}
          </div>
        )}
      </div>
    </Section>
  );
}

function Step3() {
  // Example showing how to get step state via hook
  const { formState } = useStepContext();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [copyStatus, setCopyStatus] = useState('');

  // Focus management: Move focus to first interactive element when step loads
  useEffect(() => {
    // Small delay to ensure DOM is ready and step transition is complete
    const timeoutId = setTimeout(() => {
      // Find the copy button within the CodeSnippet component
      const copyButton = containerRef.current?.querySelector(
        'button[aria-label*="Copy"], button.cds--copy-btn, button.cds--snippet-button'
      ) as HTMLButtonElement;

      if (copyButton) {
        copyButton.focus();

        // Issue 24: Add event listener for better copy feedback
        const handleCopy = () => {
          setCopyStatus('Code copied to clipboard successfully');
          setTimeout(() => setCopyStatus(''), 3000);
        };

        copyButton.addEventListener('click', handleCopy);

        return () => {
          copyButton.removeEventListener('click', handleCopy);
        };
      }
    }, 150);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <Section className="step-container" aria-labelledby="step3-heading">
      <h3 id="step3-heading" className="step-heading">
        Step 3 - Review and Submit
      </h3>
      {/* Issue 24: Copy status announcement */}
      {copyStatus && (
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          style={{
            position: 'absolute',
            left: '-10000px',
            width: '1px',
            height: '1px',
            overflow: 'hidden',
          }}
        >
          {copyStatus}
        </div>
      )}
      {/* Issue 23: Remove tabIndex to prevent focus on non-interactive content */}
      <div ref={containerRef}>
        <p id="form-state-label">Review your submitted information:</p>
        <CodeSnippet
          type="multi"
          aria-label="Copy form state to clipboard"
          aria-describedby="form-state-label"
        >
          {JSON.stringify(formState, null, 2)}
        </CodeSnippet>
      </div>
    </Section>
  );
}
