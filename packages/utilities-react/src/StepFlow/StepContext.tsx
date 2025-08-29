/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useContext, createContext, ReactNode, useState } from 'react';
import { StepContextType } from './types';

const StepContext = createContext<StepContextType | undefined>(undefined);

interface StepProviderProps {
  children?: ReactNode;
}

export const StepProvider: React.FC<StepProviderProps> = ({ children }) => {
  const [totalSteps, setTotalSteps] = useState<number>();
  const [currentStep, setCurrentStep] = useState(1);
  const [formState, setFormState] = useState({});

  const context: StepContextType = {
    formState,
    setFormState,
    totalSteps,
    setTotalSteps,
    currentStep,
    handleGoToStep: (step) => setCurrentStep(step),
    handleNext: () => setCurrentStep((step) => step + 1),
    handlePrevious: () => setCurrentStep((step) => step - 1),
  };

  return (
    <StepContext.Provider value={context}>{children}</StepContext.Provider>
  );
};

export const useStepContext = (): StepContextType => {
  const context = useContext<StepContextType | undefined>(StepContext);

  if (context === undefined) {
    throw new Error('Context hook used outside of Step provider');
  }
  return context;
};
