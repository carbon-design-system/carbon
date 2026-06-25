/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ReactNode } from 'react';
import { StepState, useStepContext } from '..';

export interface StepActionsProps {
  buttonRenderer: (stepData: StepState) => ReactNode;
  className?: string;
}

/**
 * This is an alternative approach to creating your own component and using the `useStepContext` hook.
 * @example <StepActions buttonRenderer={(stepData) => <><Button /><Button /><Button /></>}/>
 *
 * In the example above, you can see how to retrieve the step data in order to update your buttons
 * (disabled states, changing text, ie Next to Submit, etc.).
 */
export const StepActions = ({ buttonRenderer }: StepActionsProps) => {
  const data = useStepContext();
  return buttonRenderer(data);
};

StepActions.displayName = 'StepActions';
