/**
 * @license
 *
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { signal } from '@lit-labs/signals';

interface CoachmarkDetailsType {
  open?: boolean;
  floating?: boolean;
}

export const coachmarkDetailsSignal = signal<CoachmarkDetailsType>({
  open: false,
  floating: false,
});

export const resetCoachmarkDetailsSignal = () => {
  coachmarkDetailsSignal.set({
    open: false,
    floating: false,
  });
};
export const updateCoachmarkDetailsSignal = ({ name, detail }) => {
  // Fetch current value once
  const currentValue = coachmarkDetailsSignal.get();
  // Only set if value really changes
  if (currentValue[name] !== detail) {
    const newValue = { ...currentValue, [name]: detail };
    coachmarkDetailsSignal.set(newValue);
  }
};
