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
 * Container for steps. The children are filtered for only truthy values (via Children.toArray)
 * and only the current step is returned from this component based on the `currentStep` value
 * from `useStepContext`.
 */
export const StepGroup = ({ children }: StepGroupProps) => {
  const { setTotalSteps, currentStep } = useStepContext();

  const childrenArray = React.Children.toArray(children);

  // set total step count
  useEffect(() => {
    setTotalSteps(childrenArray.length);
  }, [childrenArray.length, setTotalSteps]);

  const currentStepComponent = childrenArray[currentStep - 1];

  // return only the current step
  return currentStepComponent;
};
