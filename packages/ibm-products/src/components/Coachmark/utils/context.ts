/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { PopoverAlignment } from '@carbon/react';
import { ButtonProps } from '@carbon/react';
import { createContext, useContext } from 'react';

export interface CoachmarkContextType {
  buttonProps: ButtonProps<React.ElementType>;
  closeButtonProps: {
    onClick: () => void;
  };
  targetRect?: DOMRect;
  targetOffset?: {
    x: number;
    y: number;
  };
  align?: PopoverAlignment;
  positionTune?: {
    x: number;
    y: number;
  };
  isOpen: boolean;
  closeIconDescription?: string;
}

export const CoachmarkContext = createContext<CoachmarkContextType | null>(
  null
);

export const useCoachmark = () => {
  return useContext(CoachmarkContext);
};
