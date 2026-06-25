/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createContext, ReactNode, RefObject } from 'react';
import { pkg } from '../../settings';

export type ActionType = 'close' | 'start' | 'skip' | 'back' | 'next';

export type disableButtonConfigType = {
  skip?: boolean;
  back?: boolean;
  next?: boolean;
  start?: boolean;
};
export interface InterstitialScreenContextType {
  bodyChildrenData?: ReactNode;
  setBodyChildrenData?: (value: ReactNode) => void;
  isFullScreen?: boolean;
  handleClose?: (value: ActionType) => void;
  progStep: number;
  setProgStep?: (value: number) => void;
  bodyScrollRef?: RefObject<HTMLDivElement | null>;
  handleGotoStep?: (value: number) => void;
  stepCount: number;
  setStepCount?: (value: number) => void;
  disableButtonConfig?: disableButtonConfigType;
  setDisableButtonConfig?: (value: disableButtonConfigType) => void;
}

// The block part of our conventional BEM class names (blockClass__E--M).
export const blockClass = `${pkg.prefix}--interstitial-screen`;

export const InterstitialScreenContext =
  createContext<InterstitialScreenContextType>({ progStep: 0, stepCount: 0 });
