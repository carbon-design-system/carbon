/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { createContext } from '@lit/context';

export interface CoachmarkState {
  open: boolean;
  floating: boolean;
  isDragging: boolean;
}

export const defaultCoachmarkState: CoachmarkState = {
  open: false,
  floating: false,
  isDragging: false,
};

export interface CoachmarkContextValue {
  state: CoachmarkState;
  setState: (patch: Partial<CoachmarkState>) => void;
}

export const coachmarkContext = createContext<CoachmarkContextValue>(
  Symbol('coachmark-context')
);
