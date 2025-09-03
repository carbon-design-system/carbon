/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect } from 'react';
import { useStepContext } from '.';

interface StepGroupProps {
  children: React.ReactNode;
}

/**
 * Container for steps, each child represents a step
 */
export const StepGroup = ({ children }: StepGroupProps) => {
  const { setTotalSteps, currentStep } = useStepContext();

  const childrenArray = React.Children.toArray(children);
  const cleanedChildren = childrenArray.filter(Boolean);
  const childrenCount = React.Children.count(cleanedChildren);

  // set total step count
  useEffect(() => {
    setTotalSteps(childrenCount);
  }, [childrenCount, setTotalSteps]);

  const currentStepComponent =
    React.Children.toArray(cleanedChildren)[currentStep - 1];

  // return only the current step
  return currentStepComponent;
};
