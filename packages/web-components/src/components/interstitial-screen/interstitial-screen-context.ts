/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { createContext } from '@lit/context';
import { disableButtonConfigType } from './interstitial-screen';

export interface InterstitialState {
  isFullScreen: boolean;
  open: boolean;
  currentStep: number;
  stepDetails: { stepTitle: string; id: string | number }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  carouselAPI?: any;
  disableActions: disableButtonConfigType;
}

export const defaultInterstitialState: InterstitialState = {
  isFullScreen: false,
  open: false,
  currentStep: 0,
  stepDetails: [],
  disableActions: {},
};

export interface InterstitialContextValue {
  state: InterstitialState;
  setState: (patch: Partial<InterstitialState>) => void;
}

export const interstitialContext = createContext<InterstitialContextValue>(
  Symbol('interstitial-context')
);
