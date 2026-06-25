/**
 * @license
 *
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { signal } from '@lit-labs/signals';
import { disableButtonConfigType } from './interstitial-screen';

interface InterstitialDetailsType {
  isFullScreen: boolean;
  open: boolean;
  currentStep: number;
  stepDetails: { stepTitle: string; id: string | number }[];
  carouselAPI?: any;
  disableActions: disableButtonConfigType;
}
export const interstitialDetailsSignal = signal<InterstitialDetailsType>({
  isFullScreen: false,
  open: false,
  currentStep: 0,
  stepDetails: [],
  disableActions: {},
});
export const resetInterstitialDetailsSignal = () => {
  interstitialDetailsSignal.set({
    isFullScreen: false,
    open: false,
    currentStep: 0,
    stepDetails: [],
    disableActions: {},
  });
};
export const updateInterstitialDetailsSignal = ({ name, detail }) => {
  if (name === 'stepDetails') {
    interstitialDetailsSignal.set({
      ...interstitialDetailsSignal.get(),
      stepDetails: [...interstitialDetailsSignal.get().stepDetails, detail],
    });
  } else if (name === 'isFullScreen') {
    interstitialDetailsSignal.set({
      ...interstitialDetailsSignal.get(),
      isFullScreen: detail,
    });
  } else if (name === 'open') {
    interstitialDetailsSignal.set({
      ...interstitialDetailsSignal.get(),
      open: detail,
    });
  } else if (name === 'currentStep') {
    interstitialDetailsSignal.set({
      ...interstitialDetailsSignal.get(),
      currentStep: detail,
    });
  } else if (name === 'disableActions') {
    interstitialDetailsSignal.set({
      ...interstitialDetailsSignal.get(),
      disableActions: detail,
    });
  }
};
