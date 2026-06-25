/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createContext, RefObject } from 'react';
import { pkg } from '../../../../settings';
import { NewPopoverAlignment } from '@carbon/react';

interface CoachmarkContextType {
  onClose?: () => void;
  open?: boolean;
  setOpen: (value: boolean) => void;
  align?: NewPopoverAlignment;
  triggerRef: RefObject<HTMLElement | null>;
  position: { x: number; y: number };
  contentRef: HTMLElement | null;
  setContentRef: (value: any) => void;
  floating?: boolean;
  selectorPrimaryFocus?: string;
}

export const CoachmarkContext = createContext<CoachmarkContextType>({
  open: false,
  setOpen: () => {},
  align: 'bottom',
  triggerRef: { current: null },
  position: { x: 0, y: 0 },
  contentRef: null,
  setContentRef: (value: boolean) => {},
  floating: false,
});

export const blockClass = `${pkg.prefix}--coachmark__next`;
