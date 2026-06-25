/**
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useCallback, useEffect } from 'react';

export const useCreateComponentStepChange = ({
  firstIncludedStep,
  lastIncludedStep,
  stepData,
  onPrevious,
  onNext,
  isSubmitDisabled,
  setCurrentStep,
  setIsSubmitting,
  setLoadingPrevious = null,
  loadingPrevious = false,
  onClose,
  onRequestSubmit,
  componentName,
  currentStep,
  backButtonText,
  cancelButtonText,
  submitButtonText,
  nextButtonText,
  isSubmitting,
  secondaryButtonDisabled = false,
  componentBlockClass,
  setCreateComponentActions,
  setModalIsOpen,
  experimentalSecondarySubmit,
  experimentalSecondarySubmitText,
}) => {
  const continueToNextStep = useCallback(() => {
    setIsSubmitting(false);
    setCurrentStep((prev) => {
      // Find next included step to render
      // There will always be a next step otherwise we will
      // have reach the onSubmit
      do {
        prev++;
      } while (!stepData[prev - 1]?.shouldIncludeStep);
      return prev;
    });
  }, [setCurrentStep, setIsSubmitting, stepData]);

  const moveToPreviousStep = useCallback(() => {
    if (componentName !== 'CreateFullPage') {
      setLoadingPrevious(false);
    }
    setCurrentStep((prev) => {
      // Find previous included step to render
      // There will always be a previous step otherwise we will
      // have disabled the back button since we have reached the first visible step
      do {
        prev--;
      } while (!stepData[prev - 1]?.shouldIncludeStep);
      return prev;
    });
  }, [setCurrentStep, stepData, setLoadingPrevious, componentName]);

  // useEffect to handle multi step logic
  useEffect(() => {
    const onUnmount = () => {
      if (componentName !== 'CreateFullPage') {
        setCurrentStep(1);
      }
      setIsSubmitting(false);
      onClose();
    };
    const handleOnRequestSubmit = async () => {
      // check if onRequestSubmit returns a promise
      try {
        const options = await onRequestSubmit();
        // if onRequestSubmit returns an object with the preventClose property, then check if
        if (!options?.preventClose) {
          onUnmount();
        }
      } catch (error) {
        setIsSubmitting(false);
        console.warn(`${componentName} submit error: ${error}`);
      }
    };
    const handlePrevious = async () => {
      setLoadingPrevious?.(true);
      if (typeof onPrevious === 'function') {
        try {
          await onPrevious();
          moveToPreviousStep();
        } catch (error) {
          console.warn(`${componentName} onBack error: ${error}`);
        }
      } else {
        moveToPreviousStep();
      }
    };
    const handleNext = async () => {
      setIsSubmitting(true);
      if (typeof onNext === 'function') {
        try {
          await onNext();
          continueToNextStep();
        } catch (error) {
          setIsSubmitting(false);
          console.warn(`${componentName} onNext error: ${error}`);
        }
      } else {
        continueToNextStep();
      }
    };
    const handleSubmit = async () => {
      setIsSubmitting(true);
      // last step should have onNext as well
      if (typeof onNext === 'function') {
        try {
          await onNext();
          await handleOnRequestSubmit();
        } catch (error) {
          setIsSubmitting(false);
          console.warn(`${componentName} onNext error: ${error}`);
        }
      } else {
        await handleOnRequestSubmit();
      }
    };
    const handleExperimentalSecondarySubmit = () => {
      if (typeof experimentalSecondarySubmit?.onClick === 'function') {
        experimentalSecondarySubmit.onClick();
      }
    };
    if (stepData?.length > 0) {
      const buttons = [];
      if (stepData?.length > 1) {
        buttons.push({
          key: 'create-action-button-back',
          label: backButtonText,
          onClick: handlePrevious,
          kind: 'secondary',
          disabled:
            currentStep === firstIncludedStep || secondaryButtonDisabled,
          loading: loadingPrevious,
        });
      }
      buttons.push({
        key: 'create-action-button-cancel',
        label: cancelButtonText,
        onClick:
          componentName === 'CreateFullPage'
            ? () => setModalIsOpen(true)
            : onUnmount,
        kind: 'ghost',
      });
      if (
        experimentalSecondarySubmitText &&
        !experimentalSecondarySubmit?.hideSecondarySubmit
      ) {
        buttons.push({
          key: 'create-action-button-experimentalSecondarySubmit',
          label: experimentalSecondarySubmitText,
          onClick: handleExperimentalSecondarySubmit,
          kind: 'secondary',
          disabled: experimentalSecondarySubmit?.disabled,
        });
      }
      buttons.push({
        key: 'create-action-button-submit',
        label:
          currentStep < lastIncludedStep ? nextButtonText : submitButtonText,
        onClick: currentStep < lastIncludedStep ? handleNext : handleSubmit,
        disabled: isSubmitDisabled,
        kind: 'primary',
        loading: isSubmitting,
        className: `${componentBlockClass}__create-button`,
      });

      setCreateComponentActions(buttons);
    }
  }, [
    firstIncludedStep,
    lastIncludedStep,
    stepData,
    onNext,
    isSubmitDisabled,
    backButtonText,
    cancelButtonText,
    currentStep,
    onClose,
    nextButtonText,
    submitButtonText,
    onRequestSubmit,
    isSubmitting,
    secondaryButtonDisabled,
    componentBlockClass,
    componentName,
    continueToNextStep,
    setCurrentStep,
    setCreateComponentActions,
    setIsSubmitting,
    setModalIsOpen,
    moveToPreviousStep,
    onPrevious,
    setLoadingPrevious,
    loadingPrevious,
    experimentalSecondarySubmit,
    experimentalSecondarySubmitText,
  ]);
};
