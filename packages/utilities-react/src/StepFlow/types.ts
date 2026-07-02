/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Dispatch, SetStateAction } from 'react';

/**
 * This interface should be extended by the consumer to match their own unique
 * use case given the fields within their own stepped experience.
 */
interface formStateType {
  [key: string]: unknown;
}

export interface StepContextType {
  formState: formStateType;
  setFormState: Dispatch<SetStateAction<formStateType>>;
  totalSteps: number;
  setTotalSteps: Dispatch<SetStateAction<number>>;
  currentStep: number;
  handleGoToStep: (step: number) => void;
  handleNext: () => void;
  handlePrevious: () => void;
}
