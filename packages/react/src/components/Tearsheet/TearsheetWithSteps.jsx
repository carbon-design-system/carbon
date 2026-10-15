/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import {
  StepGroup,
  StepProvider,
  useStepContext,
} from '@carbon/utilities-react';
import { Tearsheet } from '.';
import Button from '../Button';
import CodeSnippet from '../CodeSnippet';
import { ProgressIndicator, ProgressStep } from '../ProgressIndicator';
import { Section } from '../Heading';
import TextInput from '../TextInput';
import { RightPanelClose } from '@carbon/icons-react';
import { breakpoints } from '@carbon/layout';
import { useMatchMedia } from '../../internal/useMatchMedia';

// ─── Step helpers ────────────────────────────────────────────────────────────

function useStepFocus(selector) {
  useEffect(() => {
    const el = document?.querySelector(selector);
    el?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

function Step1() {
  const { setFormState, formState } = useStepContext();
  const email = String(formState?.email ?? '');
  const isInvalidEmail = email && !email.includes('@');
  const emailSuggestion =
    isInvalidEmail && email.includes('gmail')
      ? `Did you mean ${email}@gmail.com?`
      : '';
  useStepFocus('#email');

  return (
    <Section className="step-container" aria-labelledby="step1-heading">
      <h3 id="step1-heading" className="step-heading">
        Step 1 - Personal Information
      </h3>
      <TextInput
        id="email"
        labelText="Email"
        value={email}
        invalid={!!isInvalidEmail}
        invalidText={emailSuggestion || 'Please enter a valid email address'}
        aria-describedby={emailSuggestion ? 'email-suggestion' : undefined}
        autoComplete="off"
        onChange={(e) =>
          setFormState?.((prev) => ({ ...prev, email: e.target.value }))
        }
      />
      {emailSuggestion && (
        <div
          id="email-suggestion"
          className="email-suggestion"
          role="status"
          aria-live="polite">
          {emailSuggestion}
        </div>
      )}
    </Section>
  );
}

function Step2() {
  const { setFormState, formState } = useStepContext();
  const city = String(formState?.city ?? '');
  const state = String(formState?.state ?? '');
  const isInvalidCity = city && city.length < 2;
  const isInvalidState = state && state.length < 2;
  useStepFocus('#city');

  return (
    <Section className="step-container" aria-labelledby="step2-heading">
      <h3 id="step2-heading" className="step-heading">
        Step 2 - Location Details
      </h3>
      <div className="step-form-items">
        <TextInput
          id="city"
          labelText="City"
          value={city}
          invalid={!!isInvalidCity}
          invalidText="City name must be at least 2 characters"
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, city: e.target.value }))
          }
        />
        <TextInput
          id="state"
          labelText="State"
          value={state}
          invalid={!!isInvalidState}
          invalidText="State name must be at least 2 characters"
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, state: e.target.value }))
          }
        />
      </div>
    </Section>
  );
}

function Step3() {
  const { formState } = useStepContext();
  const containerRef = useRef(null);
  const [copyStatus, setCopyStatus] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const copyButton = containerRef.current?.querySelector(
        'button[aria-label*="Copy"], button.cds--copy-btn, button.cds--snippet-button'
      );
      if (copyButton) {
        copyButton.focus();
        const handleCopy = () => {
          setCopyStatus('Code copied to clipboard successfully');
          setTimeout(() => setCopyStatus(''), 3000);
        };
        copyButton.addEventListener('click', handleCopy);
        return () => copyButton.removeEventListener('click', handleCopy);
      }
    }, 150);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <Section className="step-container" aria-labelledby="step3-heading">
      <h3 id="step3-heading" className="step-heading">
        Step 3 - Review and Submit
      </h3>
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
          }}>
          {copyStatus}
        </div>
      )}
      <div ref={containerRef}>
        <p id="form-state-label">Review your submitted information:</p>
        <CodeSnippet
          type="multi"
          aria-label="Copy form state to clipboard"
          aria-describedby="form-state-label">
          {JSON.stringify(formState, null, 2)}
        </CodeSnippet>
      </div>
    </Section>
  );
}

// ─── TearsheetWithSteps ──────────────────────────────────────────────────────

function TearsheetWithStepsInner({
  open,
  setOpen,
  progressIndicator = 'vertical',
  launcherButtonRef,
  decorator,
  variant = 'wide',
  hideCloseButton,
  disableHeaderCollapse,
  closeIconDescription = 'Close',
  verticalGap,
  keepMounted,
}) {
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

  const [influencerPanelOpen, setInfluencerPanelOpen] = useState(false);
  const influencerPanelTriggerRef = useRef(null);
  const [submissionStatus, setSubmissionStatus] = useState('');

  const progressSteps = (
    <>
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
        aria-label={`Step 2 of 3: Location Details - Enter city and state${
          currentStep < 2 ? ' (Not available)' : ''
        }`}
      />
      <ProgressStep
        current={currentStep === 3}
        label="Step 3 - Review and Submit"
        secondaryLabel="Review your information"
        complete={currentStep > 3}
        disabled={currentStep < 3}
        aria-disabled={currentStep < 3}
        aria-label={`Step 3 of 3: Review and Submit - Review your information${
          currentStep < 3 ? ' (Not available)' : ''
        }`}
      />
    </>
  );

  return (
    <Tearsheet
      open={open}
      variant={variant}
      decorator={decorator}
      onClose={() => {
        handleGoToStep(1);
        setOpen?.(false);
      }}
      launcherButtonRef={launcherButtonRef}
      verticalGap={verticalGap}
      keepMounted={keepMounted}>
      <Tearsheet.Header
        hideCloseButton={hideCloseButton}
        disableHeaderCollapse={disableHeaderCollapse}
        closeIconDescription={closeIconDescription}>
        <Tearsheet.HeaderContent
          label="Customer data"
          title="Title of the tearsheet"
          description="This is a description for the tearsheet, providing an opportunity to describe the flow over a couple of lines in the header of the tearsheet."
          headerActions={
            <Tearsheet.HeaderActions
              menuButtonProps={{ label: 'Actions', kind: 'tertiary' }}>
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
        />
        {progressIndicator !== 'vertical' && (
          <ProgressIndicator>{progressSteps}</ProgressIndicator>
        )}
      </Tearsheet.Header>

      {progressIndicator === 'vertical' && (
        <Tearsheet.Influencer
          influencerPanelOpen={influencerPanelOpen}
          onInfluencerPanelClose={() => setInfluencerPanelOpen(false)}
          influencerPanelTriggerRef={influencerPanelTriggerRef}>
          <ProgressIndicator vertical>{progressSteps}</ProgressIndicator>
        </Tearsheet.Influencer>
      )}

      <Tearsheet.Body>
        <Tearsheet.MainContent>
          {progressIndicator === 'vertical' && (
            <div className="influencerPanelTrigger">
              <Button
                ref={influencerPanelTriggerRef}
                kind="ghost"
                label="Open influencer panel"
                renderIcon={() => <RightPanelClose />}
                aria-expanded={influencerPanelOpen}
                aria-controls="influencer-panel"
                onClick={() => setInfluencerPanelOpen(true)}
              />
            </div>
          )}
          {submissionStatus && (
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
              }}>
              {submissionStatus}
            </div>
          )}
          <StepGroup>
            <Step1 />
            <Step2 />
            <Step3 />
          </StepGroup>
        </Tearsheet.MainContent>
      </Tearsheet.Body>

      <Tearsheet.Footer
        actions={[
          {
            kind: 'ghost',
            label: 'Cancel',
            onClick: () => {
              handleGoToStep(1);
              setOpen?.(false);
            },
          },
          {
            kind: 'secondary',
            label: 'Back',
            disabled: currentStep === 1,
            onClick: () => handlePrevious(),
          },
          {
            kind: 'primary',
            label: currentStep === totalSteps ? 'Submit' : 'Next',
            onClick: () => {
              if (currentStep === totalSteps) {
                setSubmissionStatus(
                  'Form submitted successfully. Your information has been saved.'
                );
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
}

/**
 * TearsheetWithSteps — wraps StepProvider around TearsheetWithStepsInner so
 * consumers don't need to manage step state themselves.
 */
export function TearsheetWithSteps(props) {
  return (
    <StepProvider>
      <TearsheetWithStepsInner {...props} />
    </StepProvider>
  );
}
