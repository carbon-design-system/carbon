/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createContext, RefObject } from 'react';
import { NewPopoverAlignment } from '../Popover';

interface CoachmarkContextType {
  onClose?: () => void;
  open?: boolean;
  setOpen: (value: boolean) => void;
  align?: NewPopoverAlignment;
  launcherButtonRef?: RefObject<HTMLElement | null>;
  position: { x: number; y: number };
  contentRef: HTMLElement | null;
  setContentRef: (value: HTMLElement | null) => void;
  floating?: boolean;
  selectorPrimaryFocus?: string;
}

export const CoachmarkContext = createContext<CoachmarkContextType>({
  open: false,
  setOpen: () => {},
  align: 'bottom',
  position: { x: 0, y: 0 },
  contentRef: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setContentRef: (_value: HTMLElement | null) => {},
  floating: false,
});

// blockClass is used by sub-components to build BEM selectors.
// The prefix is always 'cds' at module-init time; components that need
// a dynamic prefix call usePrefix() themselves.
export const blockClass = `cds--coachmark`;
