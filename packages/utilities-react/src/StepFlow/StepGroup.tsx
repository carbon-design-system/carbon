/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect } from 'react';
import { useStepContext } from '.';

interface StepGroupProps {
  children: React.ReactElement;
}

/**
 * Container for steps, each child represents a step
 */
export const StepGroup: React.FC<StepGroupProps> = ({ children }) => {
  const stepState = useStepContext();

  const childrenArray = React.Children.toArray(children);
  const cleanedChildren = childrenArray?.filter(Boolean);
  const childrenCount = React.Children.count(cleanedChildren);

  // set number of steps, based on num of children passed in
  useEffect(() => {
    const { setTotalSteps } = stepState;
    setTotalSteps(childrenCount);
  }, [childrenCount, stepState]);

  // get currently selected step
  const { currentStep } = stepState;
  const currentStepComponent =
    React.Children.toArray(cleanedChildren)[currentStep - 1];

  // and just return that one single current step
  return currentStepComponent;
};
