/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { ReactNode, useRef, useState, useEffect } from 'react';
import cx from 'classnames';
import {
  ComposedModal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@carbon/react';
import { Copy } from '@carbon/react/icons';
import '../index.scss';

export interface CustomStep {
  title: string;
  content: ReactNode;
  valid?: boolean;
}

export interface GenerateAnAPIKeyProps {
  open: boolean;
  onRequestClose: () => void;
  onRequestSubmit: () => void;
  modalHeading?: string;
  modalLabel?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  primaryButtonDisabled?: boolean;
  loadingStatus?: 'inactive' | 'active' | 'finished';
  loadingDescription?: string;
  onLoadingSuccess?: () => void;
  children?: ReactNode;
  apiKeyLoaded?: boolean;
  copyIconDescription?: string;
  onCopy?: (apiKey?: string) => void;
  apiKey?: string;
  customSteps?: CustomStep[];
  nextStepButtonText?: string;
  previousStepButtonText?: string;
  className?: string;
}

export const GenerateAnAPIKey = ({
  open,
  onRequestClose,
  onRequestSubmit,
  modalHeading,
  modalLabel,
  primaryButtonText = 'Generate API key',
  secondaryButtonText = 'Close',
  primaryButtonDisabled = false,
  loadingStatus = 'inactive',
  loadingDescription = 'Loading',
  onLoadingSuccess,
  children,
  apiKeyLoaded = false,
  copyIconDescription = 'Copy to clipboard',
  onCopy,
  apiKey,
  customSteps = [],
  nextStepButtonText = 'Next',
  previousStepButtonText = 'Previous',
  className,
}: GenerateAnAPIKeyProps) => {
  const copyRef = useRef<HTMLButtonElement>(null);
  const [copyError, setCopyError] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const blockClass = `apikey-modal-pattern`;

  const hasSteps = Boolean(customSteps.length);
  const hasNextStep = hasSteps && currentStep < customSteps.length - 1;
  const hasPreviousStep = hasSteps && currentStep !== 0;

  useEffect(() => {
    if (!open) {
      setCurrentStep(0);
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (hasNextStep) {
      setCurrentStep(currentStep + 1);
    } else if (apiKeyLoaded) {
      // Handle copy functionality
      if (onCopy) {
        onCopy(apiKey);
      } else if (apiKey) {
        try {
          await navigator.clipboard.writeText(apiKey);
        } catch (error) {
          console.error(error);
          setCopyError(true);
        }
      }
    } else {
      onRequestSubmit();
    }
  };

  const handleBack = () => {
    if (hasPreviousStep && !apiKeyLoaded) {
      setCurrentStep(currentStep - 1);
    } else {
      onRequestClose();
    }
  };

  const getTitle = () => {
    if (hasSteps && !apiKeyLoaded) {
      return customSteps[currentStep]?.title;
    }
    return modalHeading;
  };

  const getPrimaryButtonText = () => {
    if (hasNextStep) {
      return nextStepButtonText;
    }
    if (apiKeyLoaded) {
      return copyIconDescription || 'Copy';
    }
    return primaryButtonText;
  };

  const getSecondaryButtonText = () => {
    if (hasPreviousStep && !apiKeyLoaded) {
      return previousStepButtonText;
    }
    return secondaryButtonText;
  };

  const isPrimaryButtonDisabled = () => {
    if (primaryButtonDisabled) {
      return true;
    }
    if (hasSteps && 'valid' in (customSteps?.[currentStep] || {})) {
      return !customSteps[currentStep]?.valid;
    }
    return false;
  };

  return (
    <ComposedModal
      open={open}
      onClose={onRequestClose}
      size="sm"
      preventCloseOnClickOutside
      className={cx(blockClass, className)}
    >
      <ModalHeader
        className={`${blockClass}__header`}
        title={getTitle()}
        label={modalLabel}
      />
      <ModalBody className={`${blockClass}__body-container`}>
        {hasSteps && !apiKeyLoaded
          ? customSteps[currentStep]?.content
          : children}
      </ModalBody>
      <ModalFooter className={`${blockClass}__footer`}>
        <Button type="button" kind="secondary" onClick={handleBack}>
          {getSecondaryButtonText()}
        </Button>
        {apiKeyLoaded ? (
          <Button
            ref={copyRef}
            renderIcon={Copy as any}
            iconDescription={copyIconDescription}
            type="submit"
            kind="primary"
            onClick={handleSubmit}
            disabled={isPrimaryButtonDisabled()}
          >
            {getPrimaryButtonText()}
          </Button>
        ) : (
          <Button
            type="submit"
            kind="primary"
            onClick={handleSubmit}
            disabled={isPrimaryButtonDisabled()}
          >
            {getPrimaryButtonText()}
          </Button>
        )}
      </ModalFooter>
    </ComposedModal>
  );
};

GenerateAnAPIKey.displayName = 'GenerateAnAPIKey';
