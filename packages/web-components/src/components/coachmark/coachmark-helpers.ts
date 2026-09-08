/**
 * Copyright IBM Corp. 2026, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { prefix } from '../../globals/settings';
import { coachmarkDetailsSignal } from './coachmark-context';

export const handleClick = () => {
  const coachmark = document.querySelector(`${prefix}-coachmark`);
  coachmark?.toggleAttribute('open');
};

export const handleDone = () => {
  const coachmark = document.querySelector(`${prefix}-coachmark`);
  coachmark?.removeAttribute('open');
};

export const handleCoachmarkOpened = () => {
  const details = coachmarkDetailsSignal.get();

  setTimeout(() => {
    if (details.floating) {
      // Focus on drag handle for floating coachmark
      const header = document.querySelector(`${prefix}-coachmark-header`);
      const dragHandle = header?.shadowRoot?.querySelector(
        `.${prefix}--coachmark-header-drag-handle`
      ) as HTMLElement;
      dragHandle?.focus();
    } else {
      // Focus on done button for non-floating coachmark
      const doneButton = document.querySelector(
        '.coachmark-body cds-button'
      ) as HTMLElement;
      doneButton?.focus();
    }
  }, 100);
};
